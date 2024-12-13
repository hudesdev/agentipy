use anchor_lang::prelude::*;
use crate::{
    state::{global::*, whitelist::*},
    errors::ContractError,
};

#[derive(Accounts)]
pub struct RemoveWl<'info> {
    #[account(
        mut,
        seeds = [Global::SEED_PREFIX.as_bytes()],
        constraint = global.initialized == true @ ContractError::NotInitialized,
        bump,
    )]
    global: Box<Account<'info, Global>>,

    #[account(
        mut,
        close = admin,
        seeds = [Whitelist::SEED_PREFIX.as_bytes(), whitelist.creator.key().as_ref()],
        bump
    )]
    pub whitelist: Account<'info, Whitelist>,

    #[account(
        mut, 
        constraint = admin.key() == global.global_authority.key() @ ContractError::InvalidGlobalAuthority
    )]
    pub admin: Signer<'info>,
    pub system_program: Program<'info, System>,
}
