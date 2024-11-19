import { createSplAssociatedTokenProgram, createSplTokenProgram } from "@metaplex-foundation/mpl-toolbox";
import { keypairIdentity, TransactionBuilder } from "@metaplex-foundation/umi";
import { closePoolManager, closeTokenManager, createSoldIssuanceProgram, findPoolManagerPda, findTokenManagerPda } from "../../../clients/js/src";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";

async function closeSystem() {

    const umi = createUmi("https://devnet.helius-rpc.com/?api-key=56803f30-bafe-4730-a3f8-e73ba3304372");
    umi.programs.add(createSplAssociatedTokenProgram());
    umi.programs.add(createSplTokenProgram());
    umi.programs.add(createSoldIssuanceProgram())
    const keypair = umi.eddsa.createKeypairFromSecretKey(
        Uint8Array.from(require("../../../../../../keys/parity.json"))
    );

    umi.use(keypairIdentity(keypair))

    const tokenManagerPda = findTokenManagerPda(umi);
    const poolManagerPda = findPoolManagerPda(umi);

    let tx = new TransactionBuilder();

    tx = tx.add(closeTokenManager(umi, {
        tokenManager: tokenManagerPda,
        owner: umi.identity,
    })).add(closePoolManager(umi, {
        poolManager: poolManagerPda,
        owner: umi.identity,
    }));

    await tx.sendAndConfirm(umi);
}

closeSystem().catch(console.error);
