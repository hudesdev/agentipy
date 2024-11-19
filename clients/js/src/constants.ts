import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import BN from "bn.js";
import { none, some, } from "@metaplex-foundation/umi";
import { CreateBondingCurveInstructionArgs, ProgramStatus, AllocationDataArgs, AllocationDataParamsArgs } from "./generated";


export const TOKEN_DECIMALS = 6;
export const INIT_ALLOCATIONS_PCS: AllocationDataParamsArgs = {
    creator: some(1000),
    cex: some(1000),
    launchBrandkit: some(1000),
    lifetimeBrandkit: some(1000),
    platform: some(1000),
    presale: none(),
    poolReserve: some(5000),
}

export const DECIMALS_MULTIPLIER = 10 ** TOKEN_DECIMALS;
export const TOKEN_SUPPLY_AMOUNT = 2_000 * 1_000_000;
export const VIRTUAL_TOKEN_MULTIPLIER_BPS = 730// +7.3%
export const DEFAULT_TOKEN_SUPPLY = TOKEN_SUPPLY_AMOUNT * DECIMALS_MULTIPLIER;
export const POOL_INITIAL_TOKEN_SUPPLY = DEFAULT_TOKEN_SUPPLY * Number(INIT_ALLOCATIONS_PCS.poolReserve) / 100;

export const SIMPLE_DEFAULT_BONDING_CURVE_PRESET: CreateBondingCurveInstructionArgs = {
    name: "simpleBondingCurve",
    symbol: "SBC",
    uri: "https://www.simpleBondingCurve.com",
    vestingTerms: none(),
    startTime: none(),
    tokenTotalSupply: DEFAULT_TOKEN_SUPPLY,

    solLaunchThreshold: 300 * LAMPORTS_PER_SOL,

    // THESE WILL BE REMOVED FROM PARAMS
    virtualTokenMultiplierBps: VIRTUAL_TOKEN_MULTIPLIER_BPS,
    virtualSolReserves: 30 * LAMPORTS_PER_SOL,

    allocation: INIT_ALLOCATIONS_PCS,

}

export const INIT_DEFAULTS = {
    tradeFeeBps: 100,
    launchFeeLamports: 0.5 * LAMPORTS_PER_SOL,
    createdMintDecimals: TOKEN_DECIMALS,

    status: ProgramStatus.Running,
}

export const INIT_DEFAULTS_ANCHOR = {
    tradeFeeBps: 100,
    launchFeeLamports: new BN(0.5 * LAMPORTS_PER_SOL),
    createdMintDecimals: TOKEN_DECIMALS,

    status: ProgramStatus.Running,
}
