import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { none, publicKey } from "@metaplex-foundation/umi";
import { CreateBondingCurveInstructionArgs, ProgramStatus } from "./generated";
import {
    PublicKey,
} from "@solana/web3.js";

export const TOKEN_DECIMALS = 9;
export const MIGRATION_VAULT = new PublicKey("3bM4hewuZFZgNXvLWwaktXMa8YHgxsnnhaRfzxJV944P")
export const DECIMALS_MULTIPLIER = 10 ** TOKEN_DECIMALS;
export const TOKEN_SUPPLY_AMOUNT = 2_000 * 1_000_000;
export const VIRTUAL_TOKEN_MULTIPLIER_BPS = 730// +7.3%
export const DEFAULT_TOKEN_SUPPLY = TOKEN_SUPPLY_AMOUNT * DECIMALS_MULTIPLIER;
export const tokenMetadataProgramId = publicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
export const SIMPLE_DEFAULT_BONDING_CURVE_PRESET: CreateBondingCurveInstructionArgs = {
    name: "simpleBondingCurve",
    symbol: "SBC",
    uri: "https://www.simpleBondingCurve.com",
    startTime: none(),
}

export const INIT_DEFAULTS = {
    initialVirtualTokenReserves: 1_073_000_000_000_000, 
    initialVirtualSolReserves: 30 * LAMPORTS_PER_SOL, 
    initialRealTokenReserves: 793_100_000_000_000, 
    tokenTotalSupply: 1_000_100_000_000_000, 
    mintDecimals: TOKEN_DECIMALS,
    status: ProgramStatus.Running,
    migrateFeeAmount: 500,
    feeReceiver: publicKey("3bM4hewuZFZgNXvLWwaktXMa8YHgxsnnhaRfzxJV944P"),
    whitelistEnabled: true,
    meteoraConfig: publicKey("21PjsfQVgrn56jSypUT5qXwwSjwKWvuoBCKbVZrgTLz4")
}

export const PROGRAM_ID = 'Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB';
export const PUMPSCIENCE = new PublicKey("4HNtUwX2P8z275jK3R6x7KoFqPx3bQWjXxhWtAFCiuvW");
export const METAPLEX_PROGRAM = 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s';
export const VAULT_SEED = "fee-vault";
export const GLOBAL_VAULT_SEED = "fee-vault"
export const WL_SEED = "wl-seed"

export const SEEDS = Object.freeze({
    APY: 'apy',
    FEE: 'fee',
    LP_MINT: 'lp_mint',
    LOCK_ESCROW: 'lock_escrow',
});