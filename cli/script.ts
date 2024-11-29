import { Program, web3 } from '@project-serum/anchor';
import * as anchor from '@project-serum/anchor';
import fs from 'fs';
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet';
import { PUMPSCIENCE, SEEDS, METAPLEX_PROGRAM } from './constants';
import { Connection, ComputeBudgetProgram, Transaction, PublicKey, SYSVAR_RENT_PUBKEY, SystemProgram, TransactionInstruction, TransactionMessage, VersionedTransaction } from '@solana/web3.js';
import VaultImpl, { getVaultPdas } from '@mercurial-finance/vault-sdk';
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, NATIVE_MINT } from '@solana/spl-token';
import { BN } from "bn.js";
import {
    getAssociatedTokenAccount
} from './util';
import AmmImpl, { PROGRAM_ID } from '@mercurial-finance/dynamic-amm-sdk';
import { IDL } from '../target/types/pump_science';
import { vault, derivePoolAddressWithConfig, createProgram, getOrCreateATAInstruction, deriveMintMetadata, wrapSOLInstruction, deriveLockEscrowPda } from './util'

let solConnection: web3.Connection = null;
let program: Program = null;
let provider: anchor.Provider = null;
let constractProvider: anchor.Provider = null;
let payer: NodeWallet = null;
const connection = new Connection("https://devnet.helius-rpc.com/?api-key=926da061-472b-438a-bbb1-f289333c4126");

// Address of the deployed program.
let programId = new anchor.web3.PublicKey(PUMPSCIENCE);

/**
 * Set cluster, provider, program
 * If rpc != null use rpc, otherwise use cluster param
 * @param cluster - cluster ex. mainnet-beta, devnet ...
 * @param keypair - wallet keypair
 * @param rpc - rpc
 */
export const setClusterConfig = async (
    cluster: web3.Cluster,
    keypair: string, rpc?: string
) => {

    if (!rpc) {
        solConnection = new web3.Connection(web3.clusterApiUrl(cluster));
    } else {
        solConnection = new web3.Connection(rpc);
    }

    const walletKeypair = web3.Keypair.fromSecretKey(
        Uint8Array.from(JSON.parse(fs.readFileSync(keypair, 'utf-8'))),
        { skipValidation: true });

    const wallet = new NodeWallet(walletKeypair);

    // Configure the client to use the local cluster.
    anchor.setProvider(new anchor.AnchorProvider(
        solConnection,
        wallet,
        { skipPreflight: true, commitment: 'confirmed' }));
    payer = wallet;

    provider = anchor.getProvider();
    constractProvider = new anchor.AnchorProvider(
        connection,
        wallet,
        { skipPreflight: true, commitment: 'confirmed' }
    )

    // Generate the program client from IDL.
    program = new anchor.Program(IDL as anchor.Idl, programId);
}

export const migrate = async (add: PublicKey) => {
    const { ammProgram, vaultProgram } = createProgram(provider.connection, null);
    const eventAuthority = PublicKey.findProgramAddressSync([Buffer.from("__event_authority")], new PublicKey(PROGRAM_ID))[0];

    const tokenAMint = NATIVE_MINT;
    const tokenBMint = new PublicKey('BN3gXVnQiBeLARcMTcNeCUsxWpKjCDGpFiTmwLkRoHt1');
    const config = new PublicKey('21PjsfQVgrn56jSypUT5qXwwSjwKWvuoBCKbVZrgTLz4');
    let tokenAAmount = new BN(0.01 * 1000000000);
    let tokenBAmount = new BN(10 * 1000000000);

    const poolPubkey = derivePoolAddressWithConfig(tokenAMint, tokenBMint, config, ammProgram.programId);

    const [
        { vaultPda: aVault, tokenVaultPda: aTokenVault, lpMintPda: aLpMintPda },
        { vaultPda: bVault, tokenVaultPda: bTokenVault, lpMintPda: bLpMintPda },
    ] = [getVaultPdas(tokenAMint, vaultProgram.programId), getVaultPdas(tokenBMint, vaultProgram.programId)];

    let aVaultLpMint = aLpMintPda;
    let bVaultLpMint = bLpMintPda;
    let preInstructions: Array<TransactionInstruction> = [];

    const [aVaultAccount, bVaultAccount] = await Promise.all([
        vaultProgram.account.vault.fetchNullable(aVault),
        vaultProgram.account.vault.fetchNullable(bVault),
    ]);

    if (!aVaultAccount) {
        const createVaultAIx = await VaultImpl.createPermissionlessVaultInstruction(provider.connection, payer.publicKey, tokenAMint);
        createVaultAIx && preInstructions.push(createVaultAIx);

    } else {
        aVaultLpMint = aVaultAccount.lpMint; // Old vault doesn't have lp mint pda
    }
    if (!bVaultAccount) {
        const createVaultBIx = await VaultImpl.createPermissionlessVaultInstruction(provider.connection, payer.publicKey, tokenBMint);
        createVaultBIx && preInstructions.push(createVaultBIx);

    } else {
        bVaultLpMint = bVaultAccount.lpMint; // Old vault doesn't have lp mint pda
    }

    const [lpMint] = PublicKey.findProgramAddressSync(
        [Buffer.from(SEEDS.LP_MINT), poolPubkey.toBuffer()],
        ammProgram.programId,
    );
    const [[aVaultLp], [bVaultLp]] = [
        PublicKey.findProgramAddressSync([aVault.toBuffer(), poolPubkey.toBuffer()], ammProgram.programId),
        PublicKey.findProgramAddressSync([bVault.toBuffer(), poolPubkey.toBuffer()], ammProgram.programId),
    ];

    const [[payerTokenA, createPayerTokenAIx], [payerTokenB, createPayerTokenBIx]] = await Promise.all([
        getOrCreateATAInstruction(tokenAMint, payer.publicKey, provider.connection),
        getOrCreateATAInstruction(tokenBMint, payer.publicKey, provider.connection),
    ]);

    createPayerTokenAIx && preInstructions.push(createPayerTokenAIx);
    createPayerTokenBIx && preInstructions.push(createPayerTokenBIx);

    const [[protocolTokenAFee], [protocolTokenBFee]] = [
        PublicKey.findProgramAddressSync(
            [Buffer.from(SEEDS.FEE), tokenAMint.toBuffer(), poolPubkey.toBuffer()],
            ammProgram.programId,
        ),
        PublicKey.findProgramAddressSync(
            [Buffer.from(SEEDS.FEE), tokenBMint.toBuffer(), poolPubkey.toBuffer()],
            ammProgram.programId,
        ),
    ];

    const payerPoolLp = getAssociatedTokenAccount(lpMint, payer.publicKey);

    if (tokenAMint.equals(NATIVE_MINT)) {
        preInstructions = preInstructions.concat(wrapSOLInstruction(payer.publicKey, payerTokenA, BigInt(tokenAAmount.toString())));
    }

    if (tokenBMint.equals(NATIVE_MINT)) {
        preInstructions = preInstructions.concat(
            wrapSOLInstruction(
                payer.publicKey,
                payerTokenB,
                BigInt(tokenBAmount.add(new BN(0)).toString()),
            ),
        );
    }
    const setComputeUnitLimitIx = ComputeBudgetProgram.setComputeUnitLimit({
        units: 20_000_000,
    });
    const latestBlockHash = await ammProgram.provider.connection.getLatestBlockhash(
        ammProgram.provider.connection.commitment,
    );

    if (preInstructions.length) {
        const preInstructionTx = new Transaction({
            feePayer: payer.publicKey,
            ...latestBlockHash,
        }).add(...preInstructions);

        preInstructionTx.sign(payer.payer);
        const preInxSim = await solConnection.simulateTransaction(preInstructionTx)

        const txHash = await provider.sendAndConfirm(preInstructionTx, [], {
            commitment: "finalized",
        });
    }

    const [mintMetadata, _mintMetadataBump] = deriveMintMetadata(lpMint);
    const [lockEscrowPK] = deriveLockEscrowPda(poolPubkey, payer.publicKey, ammProgram.programId);
    const [escrowAta, createEscrowAtaIx] = await getOrCreateATAInstruction(lpMint, lockEscrowPK, connection, payer.publicKey);

    const tx = await program.methods
        .createLockPool(tokenAAmount, tokenBAmount)
        .accounts({
            vault,
            pool: poolPubkey,
            config,
            lpMint,
            tokenAMint,
            tokenBMint,
            aVault,
            bVault,
            aTokenVault,
            bTokenVault,
            aVaultLp,
            bVaultLp,
            aVaultLpMint,
            bVaultLpMint,
            payerTokenA,
            payerTokenB,
            payerPoolLp,
            protocolTokenAFee,
            protocolTokenBFee,
            payer: payer.publicKey,
            rent: SYSVAR_RENT_PUBKEY,
            metadataProgram: METAPLEX_PROGRAM,
            vaultProgram: vaultProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
            mintMetadata,
            lockEscrow: lockEscrowPK,
            escrowVault: escrowAta,
            sourceTokens: payerPoolLp,
            meteoraProgram: PROGRAM_ID,
            eventAuthority,
        })
        .transaction();

    const creatTx = new web3.Transaction({
        feePayer: payer.publicKey,
        ...latestBlockHash,
    }).add(setComputeUnitLimitIx).add(tx)

    const createTxMsg = new TransactionMessage({
        payerKey: payer.publicKey,
        recentBlockhash: latestBlockHash.blockhash,
        instructions: creatTx.instructions
    }).compileToV0Message();

    const createVTx = new VersionedTransaction(createTxMsg);
    createVTx.sign([payer.payer])

    const sim = await constractProvider.connection.simulateTransaction(createVTx,{sigVerify:true})

    console.log('sim', sim)
    const id = await constractProvider.connection.sendTransaction(createVTx)
    console.log('id', id)
    const confirm = await constractProvider.connection.confirmTransaction(id)
    console.log('confirm', confirm)
    
    return id;
}