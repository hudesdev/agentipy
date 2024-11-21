use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token};

use crate::state::fee_vault::FeeVault;
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
        constraint = global.initialized == true @ ContractError::NotInitialized,
        bump,
    )]
    global: Box<Account<'info, Global>>,

    #[account(
        seeds = [FeeVault::SEED_PREFIX.as_bytes()],
        bump,
    )]
    fee_vault: Box<Account<'info, FeeVault>>,

    #[account()]
    mint: Box<Account<'info, Mint>>,

    system_program: Program<'info, System>,

    token_program: Program<'info, Token>,
    clock: Sysvar<'info, Clock>,
}

impl WithdrawFees<'_> {
    pub fn handler(ctx: Context<WithdrawFees>) -> Result<()> {
        let fee_vault = &mut ctx.accounts.fee_vault;
        let current_lamports = fee_vault.get_lamports(); // Get lamports first
        let total_fees_claimed = fee_vault.total_fees_claimed;

        let authority = &ctx.accounts.authority;

        // Find the fee recipient that matches the signer
        let recipient = fee_vault
            .fee_recipients
            .iter_mut()
            .find(|r| r.owner == authority.key())
            .ok_or(ContractError::InvalidWithdrawAuthority)?;

        let vault_size = 8 + FeeVault::INIT_SPACE as usize;
        let min_balance = Rent::get()?.minimum_balance(vault_size);
        let total_available = current_lamports - min_balance;

        // Calculate total fees generated since last claim
        let new_total_fees = total_available + total_fees_claimed;
        let unclaimed_fees = new_total_fees - recipient.total_claimed;

        // Calculate this recipient's share
        let recipient_share = (unclaimed_fees as u128 * recipient.share_bps as u128 / 10000) as u64;
        require_gt!(recipient_share, 0, ContractError::NoFeesToWithdraw);

        // Update claimed amounts
        recipient.total_claimed += recipient_share;
        fee_vault.total_fees_claimed += recipient_share;

        // Transfer lamports
        fee_vault.sub_lamports(recipient_share)?;
        authority.add_lamports(recipient_share)?;

        emit_cpi!(WithdrawEvent {
            withdraw_authority: authority.key(),
            mint: ctx.accounts.mint.key(),
            fee_vault: fee_vault.key(),
            withdrawn: recipient_share,
            total_withdrawn: fee_vault.total_fees_claimed,
            withdraw_time: Clock::get()?.unix_timestamp,
        });

        Ok(())
    }
}
