use anchor_lang::prelude::*;
use anchor_lang::solana_program::{instruction::Instruction, program::invoke_signed};

#[derive(Accounts)]
pub struct InitializePoolWithConfig<'info> {
    #[account(mut)]
    /// CHECK: Pool account (PDA address)
    pub pool: UncheckedAccount<'info>,

    #[account(mut)]
    /// CHECK: Configuration account
    pub config: UncheckedAccount<'info>,

    #[account(mut)]
    /// CHECK: LP token mint of the pool
    pub lp_mint: UncheckedAccount<'info>,

    #[account(mut)]
    /// CHECK: Token A mint
    pub token_a_mint: UncheckedAccount<'info>,
    #[account(mut)]
    /// CHECK: Token B mint
    pub token_b_mint: UncheckedAccount<'info>,

    #[account(mut)]
    /// CHECK: Vault accounts for token A
    pub a_vault: UncheckedAccount<'info>,
    #[account(mut)]
    /// CHECK: Vault accounts for token B
    pub b_vault: UncheckedAccount<'info>,

    #[account(mut)]
    /// CHECK: Vault LP accounts and mints
    pub a_token_vault: UncheckedAccount<'info>,
    #[account(mut)]
    /// CHECK: Vault LP accounts and mints for token B
    pub b_token_vault: UncheckedAccount<'info>,
    #[account(mut)]
    /// CHECK: Vault LP accounts and mints for token A
    pub a_vault_lp_mint: UncheckedAccount<'info>,
    #[account(mut)]
    /// CHECK: Vault LP accounts and mints for token B
    pub b_vault_lp_mint: UncheckedAccount<'info>,

    #[account(mut)]
    /// CHECK: Accounts to bootstrap the pool with initial liquidity
    pub payer_token_a: UncheckedAccount<'info>,
    #[account(mut)]
    /// CHECK: Accounts to bootstrap the pool with initial liquidity
    pub payer_token_b: UncheckedAccount<'info>,
    #[account(mut)]
    /// CHECK: Accounts to bootstrap the pool with initial liquidity
    pub payer_pool_lp: UncheckedAccount<'info>,

    #[account(mut)]
    /// CHECK: Protocol fee token accounts
    pub protocol_token_a_fee: UncheckedAccount<'info>,
    #[account(mut)]
    /// CHECK: Protocol fee token accounts
    pub protocol_token_b_fee: UncheckedAccount<'info>,

    #[account(mut)]
    /// CHECK: Admin account
    pub payer: Signer<'info>,

    /// CHECK: Additional program accounts
    pub rent: UncheckedAccount<'info>,
    /// CHECK: Metadata program account
    pub metadata_program: UncheckedAccount<'info>,
    /// CHECK: Vault program account
    pub vault_program: UncheckedAccount<'info>,
    /// CHECK: Token program account
    pub token_program: UncheckedAccount<'info>,
    /// CHECK: Associated token program account
    pub associated_token_program: UncheckedAccount<'info>,
    /// CHECK: System program account
    pub system_program: UncheckedAccount<'info>,

    /// CHECK: Meteora AMM program account
    pub meteora_program: UncheckedAccount<'info>,
}

pub fn initialize_pool_with_config(
    ctx: Context<InitializePoolWithConfig>,
    token_a_amount: u64,
    token_b_amount: u64,
) -> Result<()> {
    let accounts = vec![
        AccountMeta::new(ctx.accounts.pool.key(), false),
        AccountMeta::new(ctx.accounts.config.key(), false),
        AccountMeta::new(ctx.accounts.lp_mint.key(), false),
        AccountMeta::new(ctx.accounts.token_a_mint.key(), false),
        AccountMeta::new(ctx.accounts.token_b_mint.key(), false),
        AccountMeta::new(ctx.accounts.a_vault.key(), false),
        AccountMeta::new(ctx.accounts.b_vault.key(), false),
        AccountMeta::new(ctx.accounts.a_token_vault.key(), false),
        AccountMeta::new(ctx.accounts.b_token_vault.key(), false),
        AccountMeta::new(ctx.accounts.a_vault_lp_mint.key(), false),
        AccountMeta::new(ctx.accounts.b_vault_lp_mint.key(), false),
        AccountMeta::new(ctx.accounts.payer_token_a.key(), false),
        AccountMeta::new(ctx.accounts.payer_token_b.key(), false),
        AccountMeta::new(ctx.accounts.payer_pool_lp.key(), false),
        AccountMeta::new(ctx.accounts.protocol_token_a_fee.key(), false),
        AccountMeta::new(ctx.accounts.protocol_token_b_fee.key(), false),
        AccountMeta::new(ctx.accounts.payer.key(), true),
        AccountMeta::new_readonly(ctx.accounts.rent.key(), false),
        AccountMeta::new_readonly(ctx.accounts.metadata_program.key(), false),
        AccountMeta::new_readonly(ctx.accounts.vault_program.key(), false),
        AccountMeta::new_readonly(ctx.accounts.token_program.key(), false),
        AccountMeta::new_readonly(ctx.accounts.associated_token_program.key(), false),
        AccountMeta::new_readonly(ctx.accounts.system_program.key(), false),
    ];

    let data = meteora_instruction_data(
        "initializePermissionlessConstantProductPoolWithConfig",
        token_a_amount,
        token_b_amount,
    );

    let instruction = Instruction {
        program_id: ctx.accounts.meteora_program.key(),
        accounts,
        data,
    };

    invoke_signed(
        &instruction,
        &[
            ctx.accounts.pool.to_account_info(),
            ctx.accounts.config.to_account_info(),
            ctx.accounts.lp_mint.to_account_info(),
            ctx.accounts.token_a_mint.to_account_info(),
            ctx.accounts.token_b_mint.to_account_info(),
            ctx.accounts.a_vault.to_account_info(),
            ctx.accounts.b_vault.to_account_info(),
            ctx.accounts.a_token_vault.to_account_info(),
            ctx.accounts.b_token_vault.to_account_info(),
            ctx.accounts.a_vault_lp_mint.to_account_info(),
            ctx.accounts.b_vault_lp_mint.to_account_info(),
            ctx.accounts.payer_token_a.to_account_info(),
            ctx.accounts.payer_token_b.to_account_info(),
            ctx.accounts.payer_pool_lp.to_account_info(),
            ctx.accounts.protocol_token_a_fee.to_account_info(),
            ctx.accounts.protocol_token_b_fee.to_account_info(),
            ctx.accounts.payer.to_account_info(),
            ctx.accounts.rent.to_account_info(),
            ctx.accounts.metadata_program.to_account_info(),
            ctx.accounts.vault_program.to_account_info(),
            ctx.accounts.token_program.to_account_info(),
            ctx.accounts.associated_token_program.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
        ],
        &[], // Replace with signer seeds if necessary
    )?;

    Ok(())
}

/// Helper to construct instruction data
fn meteora_instruction_data(
    instruction_name: &str,
    token_a_amount: u64,
    token_b_amount: u64,
) -> Vec<u8> {
    let mut data = vec![];
    match instruction_name {
        "initializePermissionlessConstantProductPoolWithConfig" => {
            data.extend_from_slice(&[0]); // Add the discriminator for the instruction
            data.extend_from_slice(&token_a_amount.to_le_bytes());
            data.extend_from_slice(&token_b_amount.to_le_bytes());
        }
        _ => (),
    }
    data
}
