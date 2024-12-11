use anchor_lang::prelude::*;

use crate::ProgramStatus;

#[event]
pub struct GlobalUpdateEvent {
    pub global_authority: Pubkey,
    pub migration_authority: Pubkey,
    pub status: ProgramStatus,
    pub initial_virtual_token_reserves: u64,
    pub initial_virtual_sol_reserves: u64,
    pub initial_real_token_reserves: u64,
    pub token_total_supply: u64,
    pub mint_decimals: u8,
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
    pub virtual_token_reserves: u64,
    pub real_sol_reserves: u64,
    pub real_token_reserves: u64,
    pub token_total_supply: u64,
}

#[event]
pub struct WithdrawEvent {
    pub withdraw_authority: Pubkey,
    pub mint: Pubkey,
    pub fee_vault: Pubkey,

    pub withdrawn: u64,
    pub total_withdrawn: u64,

    pub withdraw_time: i64,
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
    pub virtual_token_reserves: u64,
    pub real_sol_reserves: u64,
    pub real_token_reserves: u64,
}

#[event]
pub struct CompleteEvent {
    pub user: Pubkey,
    pub mint: Pubkey,
    pub virtual_sol_reserves: u64,
    pub virtual_token_reserves: u64,
    pub real_sol_reserves: u64,
    pub real_token_reserves: u64,
    pub timestamp: i64,
}

pub trait IntoEvent<T: anchor_lang::Event> {
    fn into_event(&self) -> T;
}
