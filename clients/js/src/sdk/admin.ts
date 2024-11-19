import { SPL_SYSTEM_PROGRAM_ID } from "@metaplex-foundation/mpl-toolbox";
import { none, OptionOrNullable, PublicKey, Umi } from "@metaplex-foundation/umi";
import { fromWeb3JsPublicKey } from "@metaplex-foundation/umi-web3js-adapters";
import { SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";
import { findPlatformVaultPda, GlobalSettingsInputArgs, ProgramStatus, withdrawFees } from "../generated";
import { setParams, SetParamsInstructionAccounts } from '../generated/instructions/setParams';
import { initialize, } from '../generated/instructions/initialize';
import { PumpScienceSDK } from "./pump-science";

export type SetParamsInput = Partial<GlobalSettingsInputArgs> & Partial<Pick<SetParamsInstructionAccounts, "newWithdrawAuthority" | "newAuthority">>;
export class AdminSDK {
    PumpScience: PumpScienceSDK;

    umi: Umi;

    constructor(sdk: PumpScienceSDK) {
        this.PumpScience = sdk;
        this.umi = sdk.umi;
    }

    initialize(params: GlobalSettingsInputArgs) {
        const txBuilder = initialize(this.PumpScience.umi, {
            global: this.PumpScience.globalPda[0],
            authority: this.umi.identity,
            params,
            systemProgram: SPL_SYSTEM_PROGRAM_ID,
            ...this.PumpScience.evtAuthAccs,
        });
        return txBuilder;
    }

    withdrawFees(mint: PublicKey) {
        const txBuilder = withdrawFees(this.PumpScience.umi, {
            global: this.PumpScience.globalPda[0],
            authority: this.umi.identity,
            mint,
            platformVault: findPlatformVaultPda(this.PumpScience.umi, { mint })[0],
            clock: fromWeb3JsPublicKey(SYSVAR_CLOCK_PUBKEY),
            ...this.PumpScience.evtAuthAccs,
        });
        return txBuilder;
    }

    setParams(params: SetParamsInput) {
        const { newWithdrawAuthority, newAuthority, ...ixParams } = params;
        let status: OptionOrNullable<ProgramStatus>;
        if (ixParams.status !== undefined) {
            status = ixParams.status;
        } else {
            status = none();
        }
        const parsedParams: GlobalSettingsInputArgs = {
            status,
            launchFeeLamports: ixParams?.launchFeeLamports || none(),
            tradeFeeBps: ixParams?.tradeFeeBps || none(),
            createdMintDecimals: ixParams?.createdMintDecimals || none(),
        };
        const txBuilder = setParams(this.PumpScience.umi, {
            global: this.PumpScience.globalPda[0],
            authority: this.umi.identity,
            params: parsedParams,
            newWithdrawAuthority,
            newAuthority,
            ...this.PumpScience.evtAuthAccs,
        });
        return txBuilder;
    }
}
