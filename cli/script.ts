import { Program, web3 } from '@project-serum/anchor';
import * as anchor from '@project-serum/anchor';
import fs from 'fs';
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet';
import { PUMPSCIENCE, SEEDS, METAPLEX_PROGRAM, INIT_DEFAULTS, GLOBAL_VAULT_SEED, MIGRATION_VAULT, SIMPLE_DEFAULT_BONDING_CURVE_PRESET } from './constants';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { web3JsRpc } from '@metaplex-foundation/umi-rpc-web3js';
import { fromWeb3JsKeypair } from '@metaplex-foundation/umi-web3js-adapters';
import { PumpScienceSDK } from '../clients/js/src';
import { keypairIdentity, publicKey, transactionBuilder, TransactionBuilder, Umi } from '@metaplex-foundation/umi';
import { setComputeUnitLimit } from '@metaplex-foundation/mpl-toolbox';
import { Connection, ComputeBudgetProgram, Transaction, PublicKey, SYSVAR_RENT_PUBKEY, SystemProgram, TransactionInstruction, TransactionMessage, VersionedTransaction, LAMPORTS_PER_SOL, SYSVAR_CLOCK_PUBKEY, AddressLookupTableProgram, Keypair as Web3JsKeypair } from '@solana/web3.js';
import VaultImpl, { getVaultPdas } from '@mercurial-finance/vault-sdk';
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, NATIVE_MINT, createMint } from '@solana/spl-token';
import { BN } from "bn.js";
import {
    getAssociatedTokenAccount
} from './util';
import AmmImpl, { PROGRAM_ID } from '@mercurial-finance/dynamic-amm-sdk';
import { IDL } from '../target/types/pump_science';
import { vault, derivePoolAddressWithConfig, createProgram, getOrCreateATAInstruction, deriveMintMetadata, wrapSOLInstruction, deriveLockEscrowPda, getSolPriceInUSD } from './util'

let solConnection: web3.Connection = null;
let program: Program = null;
let provider: anchor.Provider = null;
let contractProvider: anchor.Provider = null;
let payer: NodeWallet = null;
let umi: Umi;

const simpleMintKp = Web3JsKeypair.generate();
const connection = new Connection("rpc");

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
    contractProvider = new anchor.AnchorProvider(
        connection,
        wallet,
        { skipPreflight: true, commitment: 'confirmed' }
    )
    const rpcUrl = "rpc"
    umi = createUmi(rpcUrl).use(web3JsRpc(provider.connection));
    // Generate the program client from IDL.
    program = new anchor.Program(IDL as anchor.Idl, programId);
}

export const global = async () => {

    const global = PublicKey.findProgramAddressSync([Buffer.from("global")], PUMPSCIENCE)[0];
    const eventAuthority = PublicKey.findProgramAddressSync([Buffer.from("__event_authority")], PUMPSCIENCE)[0];
    const solPrice = await getSolPriceInUSD();
    console.log("global", global.toBase58());

    INIT_DEFAULTS.migrateFeeAmount = new BN(Number(INIT_DEFAULTS.migrateFeeAmount) / solPrice * LAMPORTS_PER_SOL);

    const tx = await program.methods.initialize(INIT_DEFAULTS).accounts({
        global,
        eventAuthority,
        systemProgram: SystemProgram.programId,
        program: programId
    }).transaction();

    const latestBlockHash = await provider.connection.getLatestBlockhash(
        provider.connection.commitment,
    );
    const creatTx = new web3.Transaction({
        feePayer: payer.publicKey,
        ...latestBlockHash,
    }).add(tx)

    creatTx.sign(payer.payer);

    const preInxSim = await solConnection.simulateTransaction(creatTx)

    const txHash = await provider.sendAndConfirm(creatTx, [], {
        commitment: "finalized",
    });

    return txHash;
}

export const migrate = async () => {
    const { ammProgram, vaultProgram } = createProgram(provider.connection, null);
    const eventAuthority = PublicKey.findProgramAddressSync([Buffer.from("__event_authority")], new PublicKey(PROGRAM_ID))[0];

    const global = PublicKey.findProgramAddressSync([Buffer.from("global")], PUMPSCIENCE)[0];

    const tokenAMint = NATIVE_MINT;
    const tokenBMint = new PublicKey("6RZXWLH175ki5wuG4wBGcgjpLcXwQm2jQyCFvpDijxp1");
    
    const config = new PublicKey('21PjsfQVgrn56jSypUT5qXwwSjwKWvuoBCKbVZrgTLz4');
    const bondingCurve = PublicKey.findProgramAddressSync([Buffer.from("bonding-curve"), tokenBMint.toBuffer()], PUMPSCIENCE)[0];
    
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

    const setComputeUnitLimitIx = ComputeBudgetProgram.setComputeUnitLimit({
        units: 20_000_000,
    });
    let latestBlockHash = await provider.connection.getLatestBlockhash(
        provider.connection.commitment,
    );
    console.log("mint111 ===>>>", tokenBMint.toBase58());

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
    console.log("mint ===>>>", tokenBMint.toBase58());

    const [mintMetadata, _mintMetadataBump] = deriveMintMetadata(lpMint);
    const [tokenBMetadata, _tokenBMetadataBump] = deriveMintMetadata(lpMint);
    const [lockEscrowPK] = deriveLockEscrowPda(poolPubkey, payer.publicKey, ammProgram.programId);
    const [escrowAta, createEscrowAtaIx] = await getOrCreateATAInstruction(lpMint, lockEscrowPK, connection, payer.publicKey);
    const [bondingCurveTokenAccount, bondingCurveTokenAccountIx] = await getOrCreateATAInstruction(tokenBMint, bondingCurve, connection, payer.publicKey);
    console.log("bonding curve:", bondingCurveTokenAccount.toBase58());
    const migrationVault = MIGRATION_VAULT;
    const txLockPool = await program.methods
        .lockPool()
        .accounts({
            global,
            vault,
            pool: poolPubkey,
            lpMint,
            aVaultLp,
            bVaultLp,
            tokenBMint,
            aVault,
            bVault,
            aVaultLpMint,
            bVaultLpMint,
            payerPoolLp,
            payer: payer.publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
            lockEscrow: lockEscrowPK,
            escrowVault: escrowAta,
            meteoraProgram: PROGRAM_ID,
            eventAuthority
        })
        .transaction();
    const txCreatePool = await program.methods
        .createPool()
        .accounts({
            global,
            bondingCurve,
            migrationVault,
            pool: poolPubkey,
            config,
            lpMint,
            aVaultLp,
            bVaultLp,
            tokenAMint,
            tokenBMint,
            aVault,
            bVault,
            aTokenVault,
            bTokenVault,
            aVaultLpMint,
            bVaultLpMint,
            payerTokenA,
            payerTokenB,
            payerPoolLp,
            protocolTokenAFee,
            protocolTokenBFee,
            payer: payer.publicKey,
            mintMetadata,
            bondingCurveTokenAccount,
            rent: SYSVAR_RENT_PUBKEY,
            metadataProgram: METAPLEX_PROGRAM,
            vaultProgram: vaultProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
            meteoraProgram: PROGRAM_ID,
        })
        .transaction();

    /// create meteora pool /////
    const creatTx = new web3.Transaction({
        feePayer: payer.publicKey,
        ...latestBlockHash,
    }).add(setComputeUnitLimitIx).add(txCreatePool)

    const slot = await provider.connection.getSlot()

    const [lookupTableInst, lookupTableAddress] =
        AddressLookupTableProgram.createLookupTable({
            authority: payer.publicKey,
            payer: payer.publicKey,
            recentSlot: slot - 200,
        });

    const addresses = [
        global,
        bondingCurve,
        migrationVault,
        poolPubkey,
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
        payer.publicKey,
        mintMetadata,
        SYSVAR_RENT_PUBKEY,
        METAPLEX_PROGRAM,
        vaultProgram.programId,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID,
        SystemProgram.programId,
        new PublicKey(PROGRAM_ID),
    ]

    const addAddressesInstruction1 = AddressLookupTableProgram.extendLookupTable({
        payer: payer.publicKey,
        authority: payer.publicKey,
        lookupTable: lookupTableAddress,
        addresses: addresses.slice(0, 30)
    });

    latestBlockHash = await provider.connection.getLatestBlockhash(
        provider.connection.commitment,
    );

    const lutMsg1 = new TransactionMessage({
        payerKey: payer.publicKey,
        recentBlockhash: latestBlockHash.blockhash,
        instructions: [lookupTableInst, addAddressesInstruction1]
    }).compileToV0Message();

    const lutVTx1 = new VersionedTransaction(lutMsg1);
    lutVTx1.sign([payer.payer])

    const lutId1 = await provider.connection.sendTransaction(lutVTx1)
    const lutConfirm1 = await provider.connection.confirmTransaction(lutId1, 'finalized')
    await sleep(2000);
    const lookupTableAccount = await provider.connection.getAddressLookupTable(lookupTableAddress, { commitment: 'finalized' })

    const createTxMsg = new TransactionMessage({
        payerKey: payer.publicKey,
        recentBlockhash: latestBlockHash.blockhash,
        instructions: creatTx.instructions
    }).compileToV0Message([lookupTableAccount.value]);

    const createVTx = new VersionedTransaction(createTxMsg);
    createVTx.sign([payer.payer])

    const sim = await provider.connection.simulateTransaction(createVTx, { sigVerify: true })

    console.log('sim', sim)
    const id = await provider.connection.sendTransaction(createVTx)
    console.log('id', id)
    const confirm = await provider.connection.confirmTransaction(id)
    console.log('confirm', confirm)

    //// lock pool /////
    const lockPoolTxMsg = new TransactionMessage({
        payerKey: payer.publicKey,
        recentBlockhash: latestBlockHash.blockhash,
        instructions: txLockPool.instructions
        // }).compileToV0Message();
    }).compileToV0Message([lookupTableAccount.value]);

    const lockPoolVTx = new VersionedTransaction(lockPoolTxMsg);
    lockPoolVTx.sign([payer.payer])

    const lockPoolSim = await provider.connection.simulateTransaction(lockPoolVTx, { sigVerify: true })

    console.log('lockPoolSim', lockPoolSim)
    const lockPoolId = await provider.connection.sendTransaction(lockPoolVTx)
    console.log('lockPoolId', lockPoolId)
    const lockPoolConfirm = await provider.connection.confirmTransaction(lockPoolId)
    console.log('lockPoolConfirm', lockPoolConfirm)

    return lockPoolId;
}

export const createBondingCurve = async () => {

    const web3Keypair = Web3JsKeypair.fromSecretKey(Uint8Array.from(require("../pump_key.json")))
    const masterKp = fromWeb3JsKeypair(
        web3Keypair
    );
    const curveSdk = new PumpScienceSDK(
        // creator signer
        umi.use(keypairIdentity(masterKp))
    ).getCurveSDK(publicKey(simpleMintKp.publicKey.toBase58()));

    const txBuilder = curveSdk.createBondingCurve(
        SIMPLE_DEFAULT_BONDING_CURVE_PRESET,
        fromWeb3JsKeypair(simpleMintKp)
    );

    const sig = await processTransaction(umi, txBuilder);
    console.log("successfully created!!!!");
    
    // const bondingCurveData = await curveSdk.fetchData();
    // console.log("bondingCurveData", bondingCurveData);
}

export const addWl = async () => {
    const web3Keypair = Web3JsKeypair.fromSecretKey(Uint8Array.from(require("../pump_key.json")))
    const masterKp = fromWeb3JsKeypair(
        web3Keypair
    );
    const creator = masterKp;
    const wlSdk = new PumpScienceSDK(
        // creator signer
        umi.use(keypairIdentity(masterKp))
    ).getWlSDK(publicKey(creator.publicKey));

    const txBuilder = wlSdk.addWl();

    await processTransaction(umi, txBuilder);
    console.log("Added whitelist!");
}

async function processTransaction(umi, txBuilder: TransactionBuilder) {
    let txWithBudget = await transactionBuilder().add(
        setComputeUnitLimit(umi, { units: 6_000_000 })
    );

    const fullBuilder = txBuilder.prepend(txWithBudget);

    return await fullBuilder.sendAndConfirm(umi);
}

function sleep(ms: number): Promise<void> { 
    return new Promise(resolve => setTimeout(resolve, ms)); 
} 