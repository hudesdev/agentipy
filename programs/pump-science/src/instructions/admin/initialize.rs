use crate::{
    errors::ContractError, events::*, state::{global::*, whitelist::*}
};
use anchor_lang::prelude::*;

#[event_cpi]
#[derive(Accounts)]
#[instruction(params: GlobalSettingsInput)]
pub struct Initialize<'info> {
    #[account(mut)]
    authority: Signer<'info>,

    #[account(
        init,
        space = 8 + Global::INIT_SPACE,
        seeds = [Global::SEED_PREFIX.as_bytes()],
        constraint = global.initialized != true @ ContractError::AlreadyInitialized,
        bump,
        payer = authority,
    )]
    global: Box<Account<'info, Global>>,

    #[account(
        init,
        space = 8 + Whitelist::INIT_SPACE,
        seeds = [Whitelist::SEED_PREFIX.as_bytes()],
        constraint = whitelist.initialized != true @ ContractError::WlInitializeFailed,
        bump,
        payer = authority,
    )]
    whitelist: Box<Account<'info, Whitelist>>,

    system_program: Program<'info, System>,
}

impl Initialize<'_> {
    pub fn handler(ctx: Context<Initialize>, params: GlobalSettingsInput) -> Result<()> {
        let global = &mut ctx.accounts.global;
        let wl = &mut ctx.accounts.whitelist;
        global.update_authority(GlobalAuthorityInput {
            global_authority: Some(ctx.accounts.authority.key()),
            migration_authority: Some(ctx.accounts.authority.key()),
        });
        global.update_settings(params.clone());

        require_gt!(global.mint_decimals, 0, ContractError::InvalidArgument);

        global.status = ProgramStatus::Running;
        global.initialized = true;
        wl.initialized = true;
        emit_cpi!(global.into_event());
        Ok(())
    }
}
