import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import BN from "bn.js";
import { none, some, publicKey } from "@metaplex-foundation/umi";
import { CreateBondingCurveInstructionArgs, ProgramStatus } from "./generated";
import {
    PublicKey,
} from "@solana/web3.js";

export const TOKEN_DECIMALS = 9;
// export const INIT_ALLOCATIONS_PCS: AllocationDataParamsArgs = {
//     creator: some(1000),
//     cex: some(1000),
//     launchBrandkit: some(1000),
//     lifetimeBrandkit: some(1000),
//     platform: some(1000),
//     presale: none(),
//     poolReserve: some(5000),
// }
export const MIGRATION_VAULT = new PublicKey("3bM4hewuZFZgNXvLWwaktXMa8YHgxsnnhaRfzxJV944P")
export const DECIMALS_MULTIPLIER = 10 ** TOKEN_DECIMALS;
export const TOKEN_SUPPLY_AMOUNT = 2_000 * 1_000_000;
export const VIRTUAL_TOKEN_MULTIPLIER_BPS = 730// +7.3%
export const DEFAULT_TOKEN_SUPPLY = TOKEN_SUPPLY_AMOUNT * DECIMALS_MULTIPLIER;
// export const POOL_INITIAL_TOKEN_SUPPLY = DEFAULT_TOKEN_SUPPLY * Number(INIT_ALLOCATIONS_PCS.poolReserve) / 100;
export const tokenMetadataProgramId = publicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
export const SIMPLE_DEFAULT_BONDING_CURVE_PRESET: CreateBondingCurveInstructionArgs = {
    name: "simpleBondingCurve",
    symbol: "SBC",
    uri: "https://www.simpleBondingCurve.com",
    // vestingTerms: none(),
    startTime: none(),
    // tokenTotalSupply: DEFAULT_TOKEN_SUPPLY,

    // solLaunchThreshold: 300 * LAMPORTS_PER_SOL,

    // THESE WILL BE REMOVED FROM PARAMS
    // virtualTokenMultiplierBps: VIRTUAL_TOKEN_MULTIPLIER_BPS,
    // virtualSolReserves: 30 * LAMPORTS_PER_SOL,

    // allocation: INIT_ALLOCATIONS_PCS,

}

export const INIT_DEFAULTS = {
    feeRecipient: null, 
    initialVirtualTokenReserves: 1_073_000_000_000_000, 
    initialVirtualSolReserves: 30 * LAMPORTS_PER_SOL, 
    initialRealTokenReserves: 793_100_000_000_000, 
    tokenTotalSupply: 1_000_100_000_000_000, 
    feeBps: 100, 
    mintDecimals: TOKEN_DECIMALS,
    feeRecipients: null,
    status: ProgramStatus.Running,
    migrateFeeAmount: 500,
    feeReceiver: null
}

export const INIT_DEFAULTS_ANCHOR = {
    // tradeFeeBps: 100,
    // launchFeeLamports: new BN(0.5 * LAMPORTS_PER_SOL),
    // createdMintDecimals: TOKEN_DECIMALS,

    // status: ProgramStatus.Running,
    feeRecipient: null, 
    initialVirtualTokenReserves: 1_073_000_000_000_000, 
    initialVirtualSolReserves: 30 * LAMPORTS_PER_SOL, 
    initialRealTokenReserves: 793_100_000_000_000, 
    tokenTotalSupply: 1_000_100_000_000_000, 
    feeBps: 100, 
    mintDecimals: TOKEN_DECIMALS,
    feeRecipients: [],
    status: ProgramStatus.Running
}

export const PROGRAM_ID = 'Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB';
export const PUMPSCIENCE = new PublicKey("HrxD6G1BXH4Sc1mhNxegse5rh1ZjMcetxWTGM5DfRAhZ");
export const VAULT_SEED = "fee-vault";
export const GLOBAL_VAULT_SEED = "fee-vault"
export const METAPLEX_PROGRAM = 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s';

export const SEEDS = Object.freeze({
    APY: 'apy',
    FEE: 'fee',
    LP_MINT: 'lp_mint',
    LOCK_ESCROW: 'lock_escrow',
});