use anchor_lang::prelude::*;

#[derive(Debug, Clone)]
pub struct BuyResult {
    pub token_amount: u64,
    pub sol_amount: u64,
}

#[derive(Debug, Clone)]
pub struct SellResult {
    pub token_amount: u64,
    pub sol_amount: u64,
}

#[account]
#[derive(InitSpace, Debug, Default)]
pub struct BondingCurve {
    pub mint: Pubkey,

    pub creator: Pubkey,

    // using u128 to avoid overflow
    pub initial_virtual_token_reserves: u64,

    pub virtual_sol_reserves: u64,
    pub virtual_token_reserves: u64,

    pub real_sol_reserves: u64,
    pub real_token_reserves: u64,

    pub token_total_supply: u64,
    // pub sol_launch_threshold: u64,
    pub start_time: i64,
    pub complete: bool,

    pub bump: u8,
}
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct CreateBondingCurveParams {
    pub name: String,
    pub symbol: String,
    pub uri: String,
    pub start_time: Option<i64>,
}