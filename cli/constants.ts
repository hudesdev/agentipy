import {
    PublicKey,
    LAMPORTS_PER_SOL
} from "@solana/web3.js";
import { BN } from "bn.js";

export const PUMPSCIENCE = new PublicKey("Fmktp2VXcDorWkAyzZAEG5X859mxKMV8XCcayKgZVwBo");
export const PROGRAM_ID = 'Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB';
export const VAULT_SEED = "";
export const GLOBAL_VAULT_SEED = "";
export const METAPLEX_PROGRAM = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
export const MIGRATION_VAULT = new PublicKey("3bM4hewuZFZgNXvLWwaktXMa8YHgxsnnhaRfzxJV944P")

export const SEEDS = Object.freeze({
    APY: 'apy',
    FEE: 'fee',
    LP_MINT: 'lp_mint',
    LOCK_ESCROW: 'lock_escrow',
});
export enum ProgramStatus { Running, SwapOnly, SwapOnlyNoLaunch, Paused };
export const TOKEN_DECIMALS = 9;
export const INIT_DEFAULTS = {
    initialVirtualTokenReserves: new BN(1073000000000000), 
    initialVirtualSolReserves: new BN(30 * LAMPORTS_PER_SOL), 
    initialRealTokenReserves: new BN(793100000000000), 
    tokenTotalSupply: new BN(1000100000000000), 
    mintDecimals: TOKEN_DECIMALS,
    feeReceiver: MIGRATION_VAULT,
    status: null,
    migrateFeeAmount: new BN(500),
    whitelistEnabled: true,
    meteoraConfig: new PublicKey("21PjsfQVgrn56jSypUT5qXwwSjwKWvuoBCKbVZrgTLz4")
}
export const SIMPLE_DEFAULT_BONDING_CURVE_PRESET = {
    name: "simpleBondingCurve" + Math.floor(Math.random()* 100).toString(),
    symbol: "SBC",
    uri: "https://www.simpleBondingCurve.com",
    startTime: null,
}