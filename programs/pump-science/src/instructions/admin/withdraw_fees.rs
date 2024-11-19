use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token};

use crate::state::vaults::PlatformVault;
use crate::{errors::ContractError, events::WithdrawEvent};

use crate::state::global::*;

#[event_cpi]
#[derive(Accounts)]
pub struct WithdrawFees<'info> {
    #[account(mut)]
    authority: Signer<'info>,

    #[account(
        // mut,
        seeds = [Global::SEED_PREFIX.as_bytes()],
        constraint = global.withdraw_authority == *authority.key @ ContractError::InvalidWithdrawAuthority,
        constraint = global.initialized == true @ ContractError::NotInitialized,
        bump,
    )]
    global: Box<Account<'info, Global>>,

    #[account()]
    mint: Box<Account<'info, Mint>>,

    #[account(
        mut,
        seeds = [PlatformVault::SEED_PREFIX.as_bytes(), mint.to_account_info().key.as_ref()],
        bump,
    )]
    platform_vault: Box<Account<'info, PlatformVault>>,

    system_program: Program<'info, System>,

    token_program: Program<'info, Token>,
    clock: Sysvar<'info, Clock>,
}

impl WithdrawFees<'_> {
    pub fn handler(ctx: Context<WithdrawFees>) -> Result<()> {
        // transer sol to withdraw authority from fee_vault account

        let clock = Clock::get()?;
        let from = &mut ctx.accounts.platform_vault;
        let to = &ctx.accounts.authority;
        let vault_size = 8 + PlatformVault::INIT_SPACE as usize;
        msg!("vault_size: {}", vault_size);
        let min_balance = Rent::get()?.minimum_balance(vault_size);

        let amount = from.get_lamports() - min_balance;

        msg!("min_balance:{}, amount:{}", min_balance, amount);
        require_gt!(amount, 0, ContractError::NoFeesToWithdraw);

        // sender is PDA, can use lamport utilities
        from.sub_lamports(amount)?;
        to.add_lamports(amount)?;

        let prev_withdraw_time = from.last_fee_withdrawal;
        from.last_fee_withdrawal = clock.unix_timestamp;
        from.fees_withdrawn += amount;

        emit_cpi!(WithdrawEvent {
            withdraw_authority: ctx.accounts.authority.key(),
            mint: ctx.accounts.mint.key(),
            fee_vault: from.key(),

            withdrawn: amount,
            total_withdrawn: from.fees_withdrawn,

            previous_withdraw_time: prev_withdraw_time,
            new_withdraw_time: from.last_fee_withdrawal,
        });

        Ok(())
    }
}
