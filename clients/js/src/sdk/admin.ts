import { SPL_SYSTEM_PROGRAM_ID } from "@metaplex-foundation/mpl-toolbox";
import { none, OptionOrNullable, PublicKey, Umi } from "@metaplex-foundation/umi";
import { GlobalSettingsInputArgs, ProgramStatus } from "../..";
import { setParams, SetParamsInstructionAccounts } from '../generated/instructions/setParams';
import { initialize, } from '../generated/instructions/initialize';
import { PumpScienceSDK } from "./pump fun";

export type SetParamsInput = Partial<GlobalSettingsInputArgs> & Partial<SetParamsInstructionAccounts>;

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

    setParams(params: SetParamsInput) {
        const { newAuthority, ...ixParams } = params;
        let status: OptionOrNullable<ProgramStatus>;
        if (ixParams.status !== undefined) {
            status = ixParams.status;
        } else {
            status = none();
        }
        
        const parsedParams: GlobalSettingsInputArgs = {
            status,
            initialVirtualTokenReserves: null,
            initialVirtualSolReserves: null,
            initialRealTokenReserves: null,
            tokenTotalSupply: null,
            feeReceiver: null,
            mintDecimals: null,
            migrateFeeAmount: ixParams.migrateFeeAmount === undefined ? null : ixParams.migrateFeeAmount as OptionOrNullable<number | bigint>,
            whitelistEnabled: ixParams.whitelistEnabled === undefined ? null : ixParams.whitelistEnabled as OptionOrNullable<boolean>,
            meteoraConfig: ixParams.whitelistEnabled === undefined ? null : ixParams.whitelistEnabled as OptionOrNullable<PublicKey>
        };
        
        const txBuilder = setParams(this.PumpScience.umi, {
            global: this.PumpScience.globalPda[0],
            authority: this.umi.identity,
            params: parsedParams,
            newAuthority,
            ...this.PumpScience.evtAuthAccs,
        });
        return txBuilder;
    }
}
