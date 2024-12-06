import { SPL_SYSTEM_PROGRAM_ID, SPL_ASSOCIATED_TOKEN_PROGRAM_ID } from "@metaplex-foundation/mpl-toolbox";
import { none, OptionOrNullable, PublicKey, Umi, publicKey } from "@metaplex-foundation/umi";
import { fromWeb3JsPublicKey, toWeb3JsPublicKey } from "@metaplex-foundation/umi-web3js-adapters";

import { publicKey as publicKeySerializer, string } from '@metaplex-foundation/umi/serializers';

import { CreateLockPoolInstructionDataArgs, createLockPool } from "../generated";
import { PumpScienceSDK } from "./pump-science";
import { createProgram, derivePoolAddressWithConfig, getOrCreateATAInstruction, getAssociatedTokenAccount, wrapSOLInstruction, deriveLockEscrowPda, deriveMintMetadata, findEvtAuthorityPda, findVault } from "../utils";
import { Connection, PublicKey as pubkey, ComputeBudgetProgram, TransactionInstruction, Transaction , Keypair} from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, NATIVE_MINT } from '@solana/spl-token';
import VaultImpl, { getVaultPdas } from '@mercurial-finance/vault-sdk';
import { PROGRAM_ID, SEEDS, METAPLEX_PROGRAM } from "../constants";

export class CreateLockPoolSDK {
    PumpScience: PumpScienceSDK;
    umi: Umi;

    constructor(sdk: PumpScienceSDK) {
        this.PumpScience = sdk;
        this.umi = sdk.umi;
    }

    async initialize_pool_with_config(params: CreateLockPoolInstructionDataArgs, connection: Connection, keypair: Keypair) {

        const { ammProgram, vaultProgram } = createProgram(connection, undefined);
        const eventAuthority = findEvtAuthorityPda(this.umi)[0];
        const tokenAMint = publicKey("So11111111111111111111111111111111111111112");
        const tokenBMint = publicKey('BN3gXVnQiBeLARcMTcNeCUsxWpKjCDGpFiTmwLkRoHt1');
        const config = publicKey('21PjsfQVgrn56jSypUT5qXwwSjwKWvuoBCKbVZrgTLz4');
        
        const poolPubkey = derivePoolAddressWithConfig(this.umi, tokenAMint, tokenBMint, config, this.PumpScience.programId);
        
        const [
            { vaultPda: aVault, tokenVaultPda: aTokenVault, lpMintPda: aLpMintPda },
            { vaultPda: bVault, tokenVaultPda: bTokenVault, lpMintPda: bLpMintPda },
        ] = [getVaultPdas(NATIVE_MINT, vaultProgram.programId), getVaultPdas(new pubkey(tokenBMint.toString()), vaultProgram.programId)];

        console.log("aVault======>", aVault);
        console.log("bVault======>", bVault);
        console.log("aTokenVault======>", aTokenVault);
        console.log("bTokenVault======>", bTokenVault);
        console.log("aLpMintPda======>", aLpMintPda);
        console.log("bLpMintPda======>", bLpMintPda);
        
        let aVaultLpMint = aLpMintPda;
        let bVaultLpMint = bLpMintPda;
        let preInstructions: Array<TransactionInstruction> = [];
        
        const [aVaultAccount, bVaultAccount] = await Promise.all([
            vaultProgram.account.vault.fetchNullable(aVault),
            vaultProgram.account.vault.fetchNullable(bVault),
        ]);
        
        console.log("here--------");
        if (!aVaultAccount) {
            const createVaultAIx = await VaultImpl.createPermissionlessVaultInstruction(connection, new pubkey(this.umi.identity.publicKey), new pubkey(tokenAMint));
            createVaultAIx && preInstructions.push(createVaultAIx);

        } else {
            aVaultLpMint = aVaultAccount.lpMint; // Old vault doesn't have lp mint pda
        }
        if (!bVaultAccount) {
            const createVaultBIx = await VaultImpl.createPermissionlessVaultInstruction(connection, new pubkey(this.umi.identity.publicKey), new pubkey(tokenBMint));
            createVaultBIx && preInstructions.push(createVaultBIx);

        } else {
            bVaultLpMint = bVaultAccount.lpMint; // Old vault doesn't have lp mint pda
        }

        const [lpMint] = this.umi.eddsa.findPda(
            this.PumpScience.programId,
            [string({ size: 'variable' }).serialize(SEEDS.LP_MINT), publicKeySerializer().serialize(poolPubkey)],
        );
        const [[aVaultLp], [bVaultLp]] = [
            this.umi.eddsa.findPda(this.PumpScience.programId, [publicKeySerializer().serialize(publicKey(aVault.toBase58())), publicKeySerializer().serialize(poolPubkey)]),
            this.umi.eddsa.findPda(this.PumpScience.programId, [publicKeySerializer().serialize(publicKey(bVault.toBase58())), publicKeySerializer().serialize(poolPubkey)]),
        ];

        const [payerTokenA, payerTokenB] = await Promise.all([
            getOrCreateATAInstruction(tokenAMint, this.umi.identity.publicKey, this.umi),
            getOrCreateATAInstruction(tokenBMint, this.umi.identity.publicKey, this.umi),
        ]);

        const [[protocolTokenAFee], [protocolTokenBFee]] = [
            this.umi.eddsa.findPda(
                this.PumpScience.programId,
                [string({ size: 'variable' }).serialize(SEEDS.FEE), publicKeySerializer().serialize(tokenAMint), publicKeySerializer().serialize(poolPubkey)],
            ),
            this.umi.eddsa.findPda(
                this.PumpScience.programId,
                [string({ size: 'variable' }).serialize(SEEDS.FEE), publicKeySerializer().serialize(tokenBMint), publicKeySerializer().serialize(poolPubkey)],
            ),
        ];

        const payerPoolLp = getAssociatedTokenAccount(lpMint, this.umi, this.umi.identity.publicKey);

        if (NATIVE_MINT.equals(new pubkey(tokenAMint))) {
            await wrapSOLInstruction(this.umi, payerTokenA, BigInt(params.tokenAAmount.toString()));
        }

        if (NATIVE_MINT.equals(new pubkey(tokenBMint))) {
            await wrapSOLInstruction(this.umi, payerTokenB, BigInt(params.tokenBAmount.toString()));
        }

        const setComputeUnitLimitIx = ComputeBudgetProgram.setComputeUnitLimit({
            units: 20_000_000,
        });
        const latestBlockHash = await ammProgram.provider.connection.getLatestBlockhash(
            ammProgram.provider.connection.commitment,
        );

        if (preInstructions.length) {
            const preInstructionTx = new Transaction({
                feePayer: new pubkey(this.umi.identity.publicKey),
                ...latestBlockHash,
            }).add(...preInstructions);

            preInstructionTx.sign(keypair);
            const preInxSim = await connection.simulateTransaction(preInstructionTx)

            const txHash = await ammProgram.provider.sendAndConfirm!(preInstructionTx, [], {
                commitment: "finalized",
            });
        }

        const [mintMetadata, _mintMetadataBump] = deriveMintMetadata(lpMint, this.umi);
        const [lockEscrowPK] = deriveLockEscrowPda(poolPubkey, this.umi.programs.get("pumpScience").publicKey, this.umi);
        const escrowAta = await getOrCreateATAInstruction(lpMint, lockEscrowPK, this.umi);
        console.log("poolPubkey====", poolPubkey);

        const txBuilder = createLockPool(this.PumpScience.umi, {
            // global: this.PumpScience.globalPda[0],
            // authority: this.umi.identity,
            vault: findVault(this.umi, this.umi.programs.get("pumpScience").publicKey),
            pool: poolPubkey,
            config,
            lpMint,
            aVaultLp,
            bVaultLp,
            tokenAMint,
            tokenBMint,
            aVault: publicKey(aVault.toBase58()),
            bVault: publicKey(bVault.toBase58()),
            aTokenVault: publicKey(aTokenVault.toBase58()),
            bTokenVault: publicKey(bTokenVault.toBase58()),
            aVaultLpMint: publicKey(aVaultLpMint.toBase58()),
            bVaultLpMint: publicKey(bVaultLpMint.toBase58()),
            payerTokenA,
            payerTokenB,
            payerPoolLp,
            protocolTokenAFee,
            protocolTokenBFee,
            payer: this.umi.identity,
            mintMetadata,
            // rent?: PublicKey | Pd,
            metadataProgram: publicKey(METAPLEX_PROGRAM),
            vaultProgram: publicKey(vaultProgram.programId),
            // tokenProgram?: PublicKey | Pd,
            associatedTokenProgram: SPL_ASSOCIATED_TOKEN_PROGRAM_ID,
            // systemProgram?: PublicKey | Pd,
            /** CHECK */
            lockEscrow: lockEscrowPK,
            sourceTokens: payerPoolLp,
            escrowVault: escrowAta,
            meteoraProgram: publicKey(PROGRAM_ID),
            // eventAuthority,
            ...params,
            systemProgram: SPL_SYSTEM_PROGRAM_ID,
            ...this.PumpScience.evtAuthAccs,
        });
        return txBuilder;
    }
}
