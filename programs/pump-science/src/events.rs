use anchor_lang::prelude::*;

#[event]
pub struct GlobalUpdateEvent {
    pub global_authority: Pubkey,
    pub withdraw_authority: Pubkey,
    pub trade_fee_bps: u64,
    pub launch_fee_lamports: u64,
    pub created_mint_decimals: u8,
}

#[event]
pub struct CreateEvent {
    pub mint: Pubkey,
    pub creator: Pubkey,
    pub name: String,
    pub symbol: String,
    pub uri: String,
    pub start_time: i64,
    pub virtual_sol_reserves: u64,
    pub virtual_token_reserves: u128,
    pub real_sol_reserves: u64,
    pub real_token_reserves: u64,
    pub token_total_supply: u64,
    pub sol_launch_threshold: u64,
}

#[event]
pub struct WithdrawEvent {
    pub withdraw_authority: Pubkey,
    pub mint: Pubkey,
    pub fee_vault: Pubkey,

    pub withdrawn: u64,
    pub total_withdrawn: u64,

    pub previous_withdraw_time: i64,
    pub new_withdraw_time: i64,
}

#[event]
pub struct TradeEvent {
    pub mint: Pubkey,
    pub sol_amount: u64,
    pub token_amount: u64,
    pub fee_lamports: u64,
    pub is_buy: bool,
    pub user: Pubkey,
    pub timestamp: i64,
    pub virtual_sol_reserves: u64,
    pub virtual_token_reserves: u128,
    pub real_sol_reserves: u64,
    pub real_token_reserves: u64,
}

#[event]
pub struct CompleteEvent {
    pub user: Pubkey,
    pub mint: Pubkey,
    pub virtual_sol_reserves: u64,
    pub virtual_token_reserves: u128,
    pub real_sol_reserves: u64,
    pub real_token_reserves: u64,
    pub timestamp: i64,
}

pub trait IntoEvent<T: anchor_lang::Event> {
    fn into_event(&self) -> T;
}
