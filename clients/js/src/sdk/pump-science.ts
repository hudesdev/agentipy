import { Pda, Program, PublicKey, Umi } from "@metaplex-foundation/umi";
import { Keypair } from "@solana/web3.js";
import { createSplAssociatedTokenProgram, createSplTokenProgram } from '@metaplex-foundation/mpl-toolbox';
import { PUMP_SCIENCE_PROGRAM_ID, createPumpScienceProgram, fetchGlobal, findGlobalPda } from "../generated";
import { findEvtAuthorityPda, findWLPda } from "../utils";
import { AdminSDK } from "./admin";
import { CurveSDK } from "./curve";
import { WlSDK } from "./whitelist";

export class PumpScienceSDK {
    umi: Umi;

    programId: PublicKey;

    program: Program;

    globalPda: Pda;

    evtAuthPda: Pda;

    whitelistPda: Pda;
    evtAuthAccs: {
        eventAuthority: PublicKey,
        program: PublicKey
    }

    constructor(umi: Umi, keypair?: Keypair) {
        const pumpScienceProgram = createPumpScienceProgram();
        this.programId = PUMP_SCIENCE_PROGRAM_ID;
        this.program = pumpScienceProgram;
        umi.programs.add(createSplAssociatedTokenProgram());
        umi.programs.add(createSplTokenProgram());
        umi.programs.add(pumpScienceProgram);
        this.umi = umi
        this.globalPda = findGlobalPda(this.umi);
        this.whitelistPda = findWLPda(this.umi);
        this.evtAuthPda = findEvtAuthorityPda(this.umi);
        this.evtAuthAccs = {
            eventAuthority: this.evtAuthPda[0],
            program: PUMP_SCIENCE_PROGRAM_ID,
        };
    }

    async fetchGlobalData () {
        return fetchGlobal(this.umi, this.globalPda);
    }

    getAdminSDK() {
        return new AdminSDK(this);
    }

    getCurveSDK(mint: PublicKey) {
        return new CurveSDK(this, mint);
    }

    getWlSDK() {
        return new WlSDK(this);
    }
}
