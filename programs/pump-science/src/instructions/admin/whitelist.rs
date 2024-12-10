use crate::{
    errors::ContractError,
    state::{global::*, whitelist::*},
};
use anchor_lang::prelude::*;

#[event_cpi]
#[derive(Accounts)]
#[instruction(params: WlParams)]
pub struct UpdaetWl<'info> {
    #[account(mut)]
    authority: Signer<'info>,

    #[account(
        seeds = [Global::SEED_PREFIX.as_bytes()],
        constraint = global.initialized == true @ ContractError::NotInitialized,
        bump,
    )]
    global: Box<Account<'info, Global>>,

    #[account(
        mut,
        seeds = [Whitelist::SEED_PREFIX.as_bytes()],
        constraint = whitelist.initialized == true @ ContractError::WlNotInitializeFailed,
        bump,
    )]
    whitelist: Box<Account<'info, Whitelist>>,

    system_program: Program<'info, System>,
}

impl UpdaetWl<'_> {
    pub fn handler(ctx: Context<UpdaetWl>, params: WlParams) -> Result<()> {
        let whitelist = &mut ctx.accounts.whitelist;
        let _= whitelist.update_wl(params);
        
        Ok(())
    }
}
