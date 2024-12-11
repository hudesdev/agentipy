use anchor_lang::prelude::*;
use crate::{
    state::{global::*, whitelist::*},
    errors::ContractError,
};

#[derive(Accounts)]
#[instruction(new_creator: Pubkey)]
pub struct AddWl<'info> {
    #[account(
        mut,
        seeds = [Global::SEED_PREFIX.as_bytes()],
        constraint = global.initialized == true @ ContractError::NotInitialized,
        bump,
    )]
    global: Box<Account<'info, Global>>,

    #[account(
        init,
        payer = admin,
        space = 8 + 32,
        seeds = [Whitelist::SEED_PREFIX.as_bytes(), new_creator.key().as_ref()],
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

impl AddWl<'_> {
    pub fn handler(ctx: Context<AddWl>, new_creator: Pubkey) -> Result<()> {
        let whitelist = &mut ctx.accounts.whitelist;
        whitelist.creator = new_creator.key();
        Ok(())
    }
}
