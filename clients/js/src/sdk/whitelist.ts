import { PublicKey, Umi } from "@metaplex-foundation/umi";
import { UpdateWlInstructionDataArgs, 
    updateWl, 
    fetchWhitelist
} from "../generated";
import { PumpScienceSDK } from "./pump-science";

export class WlSDK {
    PumpScience: PumpScienceSDK;
    umi: Umi;

    fetchWlData() {
        return fetchWhitelist(this.umi, this.PumpScience.whitelistPda[0]);
    }

    updateWl(parmas: UpdateWlInstructionDataArgs) {
        return updateWl(this.umi, {
            global: this.PumpScience.globalPda[0],
            authority: this.umi.identity,
            ...parmas,
            ...this.PumpScience.evtAuthAccs,
            whitelist: this.PumpScience.whitelistPda[0]
        });
    }

    constructor(sdk: PumpScienceSDK) {
        this.PumpScience = sdk;
        this.umi = sdk.umi;
    }
}