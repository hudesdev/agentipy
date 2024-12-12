//! This code was AUTOGENERATED using the kinobi library.
//! Please DO NOT EDIT THIS FILE, instead use visitors
//! to add features, then rerun kinobi to update it.
//!
//! [https://github.com/metaplex-foundation/kinobi]
//!

#[cfg(feature = "anchor")]
use anchor_lang::prelude::{AnchorDeserialize, AnchorSerialize};
#[cfg(not(feature = "anchor"))]
use borsh::{BorshDeserialize, BorshSerialize};

/// Accounts.
pub struct LockPool {
    pub global: solana_program::pubkey::Pubkey,

    pub vault: solana_program::pubkey::Pubkey,

    pub pool: solana_program::pubkey::Pubkey,

    pub lp_mint: solana_program::pubkey::Pubkey,

    pub a_vault_lp: solana_program::pubkey::Pubkey,

    pub b_vault_lp: solana_program::pubkey::Pubkey,

    pub token_b_mint: solana_program::pubkey::Pubkey,

    pub a_vault: solana_program::pubkey::Pubkey,

    pub b_vault: solana_program::pubkey::Pubkey,

    pub a_vault_lp_mint: solana_program::pubkey::Pubkey,

    pub b_vault_lp_mint: solana_program::pubkey::Pubkey,

    pub payer_pool_lp: solana_program::pubkey::Pubkey,

    pub payer: solana_program::pubkey::Pubkey,

    pub token_program: solana_program::pubkey::Pubkey,

    pub associated_token_program: solana_program::pubkey::Pubkey,

    pub system_program: solana_program::pubkey::Pubkey,
    /// CHECK lock escrow
    pub lock_escrow: solana_program::pubkey::Pubkey,

    pub escrow_vault: solana_program::pubkey::Pubkey,

    pub meteora_program: solana_program::pubkey::Pubkey,

    pub event_authority: solana_program::pubkey::Pubkey,
}

impl LockPool {
    pub fn instruction(&self) -> solana_program::instruction::Instruction {
        self.instruction_with_remaining_accounts(&[])
    }
    #[allow(clippy::vec_init_then_push)]
    pub fn instruction_with_remaining_accounts(
        &self,
        remaining_accounts: &[solana_program::instruction::AccountMeta],
    ) -> solana_program::instruction::Instruction {
        let mut accounts = Vec::with_capacity(20 + remaining_accounts.len());
        accounts.push(solana_program::instruction::AccountMeta::new(
            self.global,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.vault, false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            self.pool, false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            self.lp_mint,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            self.a_vault_lp,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            self.b_vault_lp,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.token_b_mint,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            self.a_vault,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            self.b_vault,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            self.a_vault_lp_mint,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            self.b_vault_lp_mint,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            self.payer_pool_lp,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            self.payer, true,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.token_program,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.associated_token_program,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.system_program,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            self.lock_escrow,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            self.escrow_vault,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            self.meteora_program,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.event_authority,
            false,
        ));
        accounts.extend_from_slice(remaining_accounts);
        let data = LockPoolInstructionData::new().try_to_vec().unwrap();

        solana_program::instruction::Instruction {
            program_id: crate::PUMP_SCIENCE_ID,
            accounts,
            data,
        }
    }
}

#[cfg_attr(not(feature = "anchor"), derive(BorshSerialize, BorshDeserialize))]
#[cfg_attr(feature = "anchor", derive(AnchorSerialize, AnchorDeserialize))]
pub struct LockPoolInstructionData {
    discriminator: [u8; 8],
}

impl LockPoolInstructionData {
    pub fn new() -> Self {
        Self {
            discriminator: [154, 202, 217, 175, 178, 161, 30, 152],
        }
    }
}

/// Instruction builder for `LockPool`.
///
/// ### Accounts:
///
///   0. `[writable]` global
///   1. `[]` vault
///   2. `[writable]` pool
///   3. `[writable]` lp_mint
///   4. `[writable]` a_vault_lp
///   5. `[writable]` b_vault_lp
///   6. `[]` token_b_mint
///   7. `[writable]` a_vault
///   8. `[writable]` b_vault
///   9. `[writable]` a_vault_lp_mint
///   10. `[writable]` b_vault_lp_mint
///   11. `[writable]` payer_pool_lp
///   12. `[writable, signer]` payer
///   13. `[optional]` token_program (default to `TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA`)
///   14. `[]` associated_token_program
///   15. `[optional]` system_program (default to `11111111111111111111111111111111`)
///   16. `[writable]` lock_escrow
///   17. `[writable]` escrow_vault
///   18. `[writable]` meteora_program
///   19. `[]` event_authority
#[derive(Default)]
pub struct LockPoolBuilder {
    global: Option<solana_program::pubkey::Pubkey>,
    vault: Option<solana_program::pubkey::Pubkey>,
    pool: Option<solana_program::pubkey::Pubkey>,
    lp_mint: Option<solana_program::pubkey::Pubkey>,
    a_vault_lp: Option<solana_program::pubkey::Pubkey>,
    b_vault_lp: Option<solana_program::pubkey::Pubkey>,
    token_b_mint: Option<solana_program::pubkey::Pubkey>,
    a_vault: Option<solana_program::pubkey::Pubkey>,
    b_vault: Option<solana_program::pubkey::Pubkey>,
    a_vault_lp_mint: Option<solana_program::pubkey::Pubkey>,
    b_vault_lp_mint: Option<solana_program::pubkey::Pubkey>,
    payer_pool_lp: Option<solana_program::pubkey::Pubkey>,
    payer: Option<solana_program::pubkey::Pubkey>,
    token_program: Option<solana_program::pubkey::Pubkey>,
    associated_token_program: Option<solana_program::pubkey::Pubkey>,
    system_program: Option<solana_program::pubkey::Pubkey>,
    lock_escrow: Option<solana_program::pubkey::Pubkey>,
    escrow_vault: Option<solana_program::pubkey::Pubkey>,
    meteora_program: Option<solana_program::pubkey::Pubkey>,
    event_authority: Option<solana_program::pubkey::Pubkey>,
    __remaining_accounts: Vec<solana_program::instruction::AccountMeta>,
}

impl LockPoolBuilder {
    pub fn new() -> Self {
        Self::default()
    }
    #[inline(always)]
    pub fn global(&mut self, global: solana_program::pubkey::Pubkey) -> &mut Self {
        self.global = Some(global);
        self
    }
    #[inline(always)]
    pub fn vault(&mut self, vault: solana_program::pubkey::Pubkey) -> &mut Self {
        self.vault = Some(vault);
        self
    }
    #[inline(always)]
    pub fn pool(&mut self, pool: solana_program::pubkey::Pubkey) -> &mut Self {
        self.pool = Some(pool);
        self
    }
    #[inline(always)]
    pub fn lp_mint(&mut self, lp_mint: solana_program::pubkey::Pubkey) -> &mut Self {
        self.lp_mint = Some(lp_mint);
        self
    }
    #[inline(always)]
    pub fn a_vault_lp(&mut self, a_vault_lp: solana_program::pubkey::Pubkey) -> &mut Self {
        self.a_vault_lp = Some(a_vault_lp);
        self
    }
    #[inline(always)]
    pub fn b_vault_lp(&mut self, b_vault_lp: solana_program::pubkey::Pubkey) -> &mut Self {
        self.b_vault_lp = Some(b_vault_lp);
        self
    }
    #[inline(always)]
    pub fn token_b_mint(&mut self, token_b_mint: solana_program::pubkey::Pubkey) -> &mut Self {
        self.token_b_mint = Some(token_b_mint);
        self
    }
    #[inline(always)]
    pub fn a_vault(&mut self, a_vault: solana_program::pubkey::Pubkey) -> &mut Self {
        self.a_vault = Some(a_vault);
        self
    }
    #[inline(always)]
    pub fn b_vault(&mut self, b_vault: solana_program::pubkey::Pubkey) -> &mut Self {
        self.b_vault = Some(b_vault);
        self
    }
    #[inline(always)]
    pub fn a_vault_lp_mint(
        &mut self,
        a_vault_lp_mint: solana_program::pubkey::Pubkey,
    ) -> &mut Self {
        self.a_vault_lp_mint = Some(a_vault_lp_mint);
        self
    }
    #[inline(always)]
    pub fn b_vault_lp_mint(
        &mut self,
        b_vault_lp_mint: solana_program::pubkey::Pubkey,
    ) -> &mut Self {
        self.b_vault_lp_mint = Some(b_vault_lp_mint);
        self
    }
    #[inline(always)]
    pub fn payer_pool_lp(&mut self, payer_pool_lp: solana_program::pubkey::Pubkey) -> &mut Self {
        self.payer_pool_lp = Some(payer_pool_lp);
        self
    }
    #[inline(always)]
    pub fn payer(&mut self, payer: solana_program::pubkey::Pubkey) -> &mut Self {
        self.payer = Some(payer);
        self
    }
    /// `[optional account, default to 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA']`
    #[inline(always)]
    pub fn token_program(&mut self, token_program: solana_program::pubkey::Pubkey) -> &mut Self {
        self.token_program = Some(token_program);
        self
    }
    #[inline(always)]
    pub fn associated_token_program(
        &mut self,
        associated_token_program: solana_program::pubkey::Pubkey,
    ) -> &mut Self {
        self.associated_token_program = Some(associated_token_program);
        self
    }
    /// `[optional account, default to '11111111111111111111111111111111']`
    #[inline(always)]
    pub fn system_program(&mut self, system_program: solana_program::pubkey::Pubkey) -> &mut Self {
        self.system_program = Some(system_program);
        self
    }
    /// CHECK lock escrow
    #[inline(always)]
    pub fn lock_escrow(&mut self, lock_escrow: solana_program::pubkey::Pubkey) -> &mut Self {
        self.lock_escrow = Some(lock_escrow);
        self
    }
    #[inline(always)]
    pub fn escrow_vault(&mut self, escrow_vault: solana_program::pubkey::Pubkey) -> &mut Self {
        self.escrow_vault = Some(escrow_vault);
        self
    }
    #[inline(always)]
    pub fn meteora_program(
        &mut self,
        meteora_program: solana_program::pubkey::Pubkey,
    ) -> &mut Self {
        self.meteora_program = Some(meteora_program);
        self
    }
    #[inline(always)]
    pub fn event_authority(
        &mut self,
        event_authority: solana_program::pubkey::Pubkey,
    ) -> &mut Self {
        self.event_authority = Some(event_authority);
        self
    }
    /// Add an aditional account to the instruction.
    #[inline(always)]
    pub fn add_remaining_account(
        &mut self,
        account: solana_program::instruction::AccountMeta,
    ) -> &mut Self {
        self.__remaining_accounts.push(account);
        self
    }
    /// Add additional accounts to the instruction.
    #[inline(always)]
    pub fn add_remaining_accounts(
        &mut self,
        accounts: &[solana_program::instruction::AccountMeta],
    ) -> &mut Self {
        self.__remaining_accounts.extend_from_slice(accounts);
        self
    }
    #[allow(clippy::clone_on_copy)]
    pub fn instruction(&self) -> solana_program::instruction::Instruction {
        let accounts = LockPool {
            global: self.global.expect("global is not set"),
            vault: self.vault.expect("vault is not set"),
            pool: self.pool.expect("pool is not set"),
            lp_mint: self.lp_mint.expect("lp_mint is not set"),
            a_vault_lp: self.a_vault_lp.expect("a_vault_lp is not set"),
            b_vault_lp: self.b_vault_lp.expect("b_vault_lp is not set"),
            token_b_mint: self.token_b_mint.expect("token_b_mint is not set"),
            a_vault: self.a_vault.expect("a_vault is not set"),
            b_vault: self.b_vault.expect("b_vault is not set"),
            a_vault_lp_mint: self.a_vault_lp_mint.expect("a_vault_lp_mint is not set"),
            b_vault_lp_mint: self.b_vault_lp_mint.expect("b_vault_lp_mint is not set"),
            payer_pool_lp: self.payer_pool_lp.expect("payer_pool_lp is not set"),
            payer: self.payer.expect("payer is not set"),
            token_program: self.token_program.unwrap_or(solana_program::pubkey!(
                "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
            )),
            associated_token_program: self
                .associated_token_program
                .expect("associated_token_program is not set"),
            system_program: self
                .system_program
                .unwrap_or(solana_program::pubkey!("11111111111111111111111111111111")),
            lock_escrow: self.lock_escrow.expect("lock_escrow is not set"),
            escrow_vault: self.escrow_vault.expect("escrow_vault is not set"),
            meteora_program: self.meteora_program.expect("meteora_program is not set"),
            event_authority: self.event_authority.expect("event_authority is not set"),
        };

        accounts.instruction_with_remaining_accounts(&self.__remaining_accounts)
    }
}

/// `lock_pool` CPI accounts.
pub struct LockPoolCpiAccounts<'a, 'b> {
    pub global: &'b solana_program::account_info::AccountInfo<'a>,

    pub vault: &'b solana_program::account_info::AccountInfo<'a>,

    pub pool: &'b solana_program::account_info::AccountInfo<'a>,

    pub lp_mint: &'b solana_program::account_info::AccountInfo<'a>,

    pub a_vault_lp: &'b solana_program::account_info::AccountInfo<'a>,

    pub b_vault_lp: &'b solana_program::account_info::AccountInfo<'a>,

    pub token_b_mint: &'b solana_program::account_info::AccountInfo<'a>,

    pub a_vault: &'b solana_program::account_info::AccountInfo<'a>,

    pub b_vault: &'b solana_program::account_info::AccountInfo<'a>,

    pub a_vault_lp_mint: &'b solana_program::account_info::AccountInfo<'a>,

    pub b_vault_lp_mint: &'b solana_program::account_info::AccountInfo<'a>,

    pub payer_pool_lp: &'b solana_program::account_info::AccountInfo<'a>,

    pub payer: &'b solana_program::account_info::AccountInfo<'a>,

    pub token_program: &'b solana_program::account_info::AccountInfo<'a>,

    pub associated_token_program: &'b solana_program::account_info::AccountInfo<'a>,

    pub system_program: &'b solana_program::account_info::AccountInfo<'a>,
    /// CHECK lock escrow
    pub lock_escrow: &'b solana_program::account_info::AccountInfo<'a>,

    pub escrow_vault: &'b solana_program::account_info::AccountInfo<'a>,

    pub meteora_program: &'b solana_program::account_info::AccountInfo<'a>,

    pub event_authority: &'b solana_program::account_info::AccountInfo<'a>,
}

/// `lock_pool` CPI instruction.
pub struct LockPoolCpi<'a, 'b> {
    /// The program to invoke.
    pub __program: &'b solana_program::account_info::AccountInfo<'a>,

    pub global: &'b solana_program::account_info::AccountInfo<'a>,

    pub vault: &'b solana_program::account_info::AccountInfo<'a>,

    pub pool: &'b solana_program::account_info::AccountInfo<'a>,

    pub lp_mint: &'b solana_program::account_info::AccountInfo<'a>,

    pub a_vault_lp: &'b solana_program::account_info::AccountInfo<'a>,

    pub b_vault_lp: &'b solana_program::account_info::AccountInfo<'a>,

    pub token_b_mint: &'b solana_program::account_info::AccountInfo<'a>,

    pub a_vault: &'b solana_program::account_info::AccountInfo<'a>,

    pub b_vault: &'b solana_program::account_info::AccountInfo<'a>,

    pub a_vault_lp_mint: &'b solana_program::account_info::AccountInfo<'a>,

    pub b_vault_lp_mint: &'b solana_program::account_info::AccountInfo<'a>,

    pub payer_pool_lp: &'b solana_program::account_info::AccountInfo<'a>,

    pub payer: &'b solana_program::account_info::AccountInfo<'a>,

    pub token_program: &'b solana_program::account_info::AccountInfo<'a>,

    pub associated_token_program: &'b solana_program::account_info::AccountInfo<'a>,

    pub system_program: &'b solana_program::account_info::AccountInfo<'a>,
    /// CHECK lock escrow
    pub lock_escrow: &'b solana_program::account_info::AccountInfo<'a>,

    pub escrow_vault: &'b solana_program::account_info::AccountInfo<'a>,

    pub meteora_program: &'b solana_program::account_info::AccountInfo<'a>,

    pub event_authority: &'b solana_program::account_info::AccountInfo<'a>,
}

impl<'a, 'b> LockPoolCpi<'a, 'b> {
    pub fn new(
        program: &'b solana_program::account_info::AccountInfo<'a>,
        accounts: LockPoolCpiAccounts<'a, 'b>,
    ) -> Self {
        Self {
            __program: program,
            global: accounts.global,
            vault: accounts.vault,
            pool: accounts.pool,
            lp_mint: accounts.lp_mint,
            a_vault_lp: accounts.a_vault_lp,
            b_vault_lp: accounts.b_vault_lp,
            token_b_mint: accounts.token_b_mint,
            a_vault: accounts.a_vault,
            b_vault: accounts.b_vault,
            a_vault_lp_mint: accounts.a_vault_lp_mint,
            b_vault_lp_mint: accounts.b_vault_lp_mint,
            payer_pool_lp: accounts.payer_pool_lp,
            payer: accounts.payer,
            token_program: accounts.token_program,
            associated_token_program: accounts.associated_token_program,
            system_program: accounts.system_program,
            lock_escrow: accounts.lock_escrow,
            escrow_vault: accounts.escrow_vault,
            meteora_program: accounts.meteora_program,
            event_authority: accounts.event_authority,
        }
    }
    #[inline(always)]
    pub fn invoke(&self) -> solana_program::entrypoint::ProgramResult {
        self.invoke_signed_with_remaining_accounts(&[], &[])
    }
    #[inline(always)]
    pub fn invoke_with_remaining_accounts(
        &self,
        remaining_accounts: &[(
            &'b solana_program::account_info::AccountInfo<'a>,
            bool,
            bool,
        )],
    ) -> solana_program::entrypoint::ProgramResult {
        self.invoke_signed_with_remaining_accounts(&[], remaining_accounts)
    }
    #[inline(always)]
    pub fn invoke_signed(
        &self,
        signers_seeds: &[&[&[u8]]],
    ) -> solana_program::entrypoint::ProgramResult {
        self.invoke_signed_with_remaining_accounts(signers_seeds, &[])
    }
    #[allow(clippy::clone_on_copy)]
    #[allow(clippy::vec_init_then_push)]
    pub fn invoke_signed_with_remaining_accounts(
        &self,
        signers_seeds: &[&[&[u8]]],
        remaining_accounts: &[(
            &'b solana_program::account_info::AccountInfo<'a>,
            bool,
            bool,
        )],
    ) -> solana_program::entrypoint::ProgramResult {
        let mut accounts = Vec::with_capacity(20 + remaining_accounts.len());
        accounts.push(solana_program::instruction::AccountMeta::new(
            *self.global.key,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.vault.key,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            *self.pool.key,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            *self.lp_mint.key,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            *self.a_vault_lp.key,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            *self.b_vault_lp.key,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.token_b_mint.key,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            *self.a_vault.key,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            *self.b_vault.key,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            *self.a_vault_lp_mint.key,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            *self.b_vault_lp_mint.key,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            *self.payer_pool_lp.key,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            *self.payer.key,
            true,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.token_program.key,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.associated_token_program.key,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.system_program.key,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            *self.lock_escrow.key,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            *self.escrow_vault.key,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            *self.meteora_program.key,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.event_authority.key,
            false,
        ));
        remaining_accounts.iter().for_each(|remaining_account| {
            accounts.push(solana_program::instruction::AccountMeta {
                pubkey: *remaining_account.0.key,
                is_signer: remaining_account.1,
                is_writable: remaining_account.2,
            })
        });
        let data = LockPoolInstructionData::new().try_to_vec().unwrap();

        let instruction = solana_program::instruction::Instruction {
            program_id: crate::PUMP_SCIENCE_ID,
            accounts,
            data,
        };
        let mut account_infos = Vec::with_capacity(20 + 1 + remaining_accounts.len());
        account_infos.push(self.__program.clone());
        account_infos.push(self.global.clone());
        account_infos.push(self.vault.clone());
        account_infos.push(self.pool.clone());
        account_infos.push(self.lp_mint.clone());
        account_infos.push(self.a_vault_lp.clone());
        account_infos.push(self.b_vault_lp.clone());
        account_infos.push(self.token_b_mint.clone());
        account_infos.push(self.a_vault.clone());
        account_infos.push(self.b_vault.clone());
        account_infos.push(self.a_vault_lp_mint.clone());
        account_infos.push(self.b_vault_lp_mint.clone());
        account_infos.push(self.payer_pool_lp.clone());
        account_infos.push(self.payer.clone());
        account_infos.push(self.token_program.clone());
        account_infos.push(self.associated_token_program.clone());
        account_infos.push(self.system_program.clone());
        account_infos.push(self.lock_escrow.clone());
        account_infos.push(self.escrow_vault.clone());
        account_infos.push(self.meteora_program.clone());
        account_infos.push(self.event_authority.clone());
        remaining_accounts
            .iter()
            .for_each(|remaining_account| account_infos.push(remaining_account.0.clone()));

        if signers_seeds.is_empty() {
            solana_program::program::invoke(&instruction, &account_infos)
        } else {
            solana_program::program::invoke_signed(&instruction, &account_infos, signers_seeds)
        }
    }
}

/// Instruction builder for `LockPool` via CPI.
///
/// ### Accounts:
///
///   0. `[writable]` global
///   1. `[]` vault
///   2. `[writable]` pool
///   3. `[writable]` lp_mint
///   4. `[writable]` a_vault_lp
///   5. `[writable]` b_vault_lp
///   6. `[]` token_b_mint
///   7. `[writable]` a_vault
///   8. `[writable]` b_vault
///   9. `[writable]` a_vault_lp_mint
///   10. `[writable]` b_vault_lp_mint
///   11. `[writable]` payer_pool_lp
///   12. `[writable, signer]` payer
///   13. `[]` token_program
///   14. `[]` associated_token_program
///   15. `[]` system_program
///   16. `[writable]` lock_escrow
///   17. `[writable]` escrow_vault
///   18. `[writable]` meteora_program
///   19. `[]` event_authority
pub struct LockPoolCpiBuilder<'a, 'b> {
    instruction: Box<LockPoolCpiBuilderInstruction<'a, 'b>>,
}

impl<'a, 'b> LockPoolCpiBuilder<'a, 'b> {
    pub fn new(program: &'b solana_program::account_info::AccountInfo<'a>) -> Self {
        let instruction = Box::new(LockPoolCpiBuilderInstruction {
            __program: program,
            global: None,
            vault: None,
            pool: None,
            lp_mint: None,
            a_vault_lp: None,
            b_vault_lp: None,
            token_b_mint: None,
            a_vault: None,
            b_vault: None,
            a_vault_lp_mint: None,
            b_vault_lp_mint: None,
            payer_pool_lp: None,
            payer: None,
            token_program: None,
            associated_token_program: None,
            system_program: None,
            lock_escrow: None,
            escrow_vault: None,
            meteora_program: None,
            event_authority: None,
            __remaining_accounts: Vec::new(),
        });
        Self { instruction }
    }
    #[inline(always)]
    pub fn global(
        &mut self,
        global: &'b solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.global = Some(global);
        self
    }
    #[inline(always)]
    pub fn vault(&mut self, vault: &'b solana_program::account_info::AccountInfo<'a>) -> &mut Self {
        self.instruction.vault = Some(vault);
        self
    }
    #[inline(always)]
    pub fn pool(&mut self, pool: &'b solana_program::account_info::AccountInfo<'a>) -> &mut Self {
        self.instruction.pool = Some(pool);
        self
    }
    #[inline(always)]
    pub fn lp_mint(
        &mut self,
        lp_mint: &'b solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.lp_mint = Some(lp_mint);
        self
    }
    #[inline(always)]
    pub fn a_vault_lp(
        &mut self,
        a_vault_lp: &'b solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.a_vault_lp = Some(a_vault_lp);
        self
    }
    #[inline(always)]
    pub fn b_vault_lp(
        &mut self,
        b_vault_lp: &'b solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.b_vault_lp = Some(b_vault_lp);
        self
    }
    #[inline(always)]
    pub fn token_b_mint(
        &mut self,
        token_b_mint: &'b solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.token_b_mint = Some(token_b_mint);
        self
    }
    #[inline(always)]
    pub fn a_vault(
        &mut self,
        a_vault: &'b solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.a_vault = Some(a_vault);
        self
    }
    #[inline(always)]
    pub fn b_vault(
        &mut self,
        b_vault: &'b solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.b_vault = Some(b_vault);
        self
    }
    #[inline(always)]
    pub fn a_vault_lp_mint(
        &mut self,
        a_vault_lp_mint: &'b solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.a_vault_lp_mint = Some(a_vault_lp_mint);
        self
    }
    #[inline(always)]
    pub fn b_vault_lp_mint(
        &mut self,
        b_vault_lp_mint: &'b solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.b_vault_lp_mint = Some(b_vault_lp_mint);
        self
    }
    #[inline(always)]
    pub fn payer_pool_lp(
        &mut self,
        payer_pool_lp: &'b solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.payer_pool_lp = Some(payer_pool_lp);
        self
    }
    #[inline(always)]
    pub fn payer(&mut self, payer: &'b solana_program::account_info::AccountInfo<'a>) -> &mut Self {
        self.instruction.payer = Some(payer);
        self
    }
    #[inline(always)]
    pub fn token_program(
        &mut self,
        token_program: &'b solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.token_program = Some(token_program);
        self
    }
    #[inline(always)]
    pub fn associated_token_program(
        &mut self,
        associated_token_program: &'b solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.associated_token_program = Some(associated_token_program);
        self
    }
    #[inline(always)]
    pub fn system_program(
        &mut self,
        system_program: &'b solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.system_program = Some(system_program);
        self
    }
    /// CHECK lock escrow
    #[inline(always)]
    pub fn lock_escrow(
        &mut self,
        lock_escrow: &'b solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.lock_escrow = Some(lock_escrow);
        self
    }
    #[inline(always)]
    pub fn escrow_vault(
        &mut self,
        escrow_vault: &'b solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.escrow_vault = Some(escrow_vault);
        self
    }
    #[inline(always)]
    pub fn meteora_program(
        &mut self,
        meteora_program: &'b solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.meteora_program = Some(meteora_program);
        self
    }
    #[inline(always)]
    pub fn event_authority(
        &mut self,
        event_authority: &'b solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.event_authority = Some(event_authority);
        self
    }
    /// Add an additional account to the instruction.
    #[inline(always)]
    pub fn add_remaining_account(
        &mut self,
        account: &'b solana_program::account_info::AccountInfo<'a>,
        is_writable: bool,
        is_signer: bool,
    ) -> &mut Self {
        self.instruction
            .__remaining_accounts
            .push((account, is_writable, is_signer));
        self
    }
    /// Add additional accounts to the instruction.
    ///
    /// Each account is represented by a tuple of the `AccountInfo`, a `bool` indicating whether the account is writable or not,
    /// and a `bool` indicating whether the account is a signer or not.
    #[inline(always)]
    pub fn add_remaining_accounts(
        &mut self,
        accounts: &[(
            &'b solana_program::account_info::AccountInfo<'a>,
            bool,
            bool,
        )],
    ) -> &mut Self {
        self.instruction
            .__remaining_accounts
            .extend_from_slice(accounts);
        self
    }
    #[inline(always)]
    pub fn invoke(&self) -> solana_program::entrypoint::ProgramResult {
        self.invoke_signed(&[])
    }
    #[allow(clippy::clone_on_copy)]
    #[allow(clippy::vec_init_then_push)]
    pub fn invoke_signed(
        &self,
        signers_seeds: &[&[&[u8]]],
    ) -> solana_program::entrypoint::ProgramResult {
        let instruction = LockPoolCpi {
            __program: self.instruction.__program,

            global: self.instruction.global.expect("global is not set"),

            vault: self.instruction.vault.expect("vault is not set"),

            pool: self.instruction.pool.expect("pool is not set"),

            lp_mint: self.instruction.lp_mint.expect("lp_mint is not set"),

            a_vault_lp: self.instruction.a_vault_lp.expect("a_vault_lp is not set"),

            b_vault_lp: self.instruction.b_vault_lp.expect("b_vault_lp is not set"),

            token_b_mint: self
                .instruction
                .token_b_mint
                .expect("token_b_mint is not set"),

            a_vault: self.instruction.a_vault.expect("a_vault is not set"),

            b_vault: self.instruction.b_vault.expect("b_vault is not set"),

            a_vault_lp_mint: self
                .instruction
                .a_vault_lp_mint
                .expect("a_vault_lp_mint is not set"),

            b_vault_lp_mint: self
                .instruction
                .b_vault_lp_mint
                .expect("b_vault_lp_mint is not set"),

            payer_pool_lp: self
                .instruction
                .payer_pool_lp
                .expect("payer_pool_lp is not set"),

            payer: self.instruction.payer.expect("payer is not set"),

            token_program: self
                .instruction
                .token_program
                .expect("token_program is not set"),

            associated_token_program: self
                .instruction
                .associated_token_program
                .expect("associated_token_program is not set"),

            system_program: self
                .instruction
                .system_program
                .expect("system_program is not set"),

            lock_escrow: self
                .instruction
                .lock_escrow
                .expect("lock_escrow is not set"),

            escrow_vault: self
                .instruction
                .escrow_vault
                .expect("escrow_vault is not set"),

            meteora_program: self
                .instruction
                .meteora_program
                .expect("meteora_program is not set"),

            event_authority: self
                .instruction
                .event_authority
                .expect("event_authority is not set"),
        };
        instruction.invoke_signed_with_remaining_accounts(
            signers_seeds,
            &self.instruction.__remaining_accounts,
        )
    }
}

struct LockPoolCpiBuilderInstruction<'a, 'b> {
    __program: &'b solana_program::account_info::AccountInfo<'a>,
    global: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    vault: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    pool: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    lp_mint: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    a_vault_lp: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    b_vault_lp: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    token_b_mint: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    a_vault: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    b_vault: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    a_vault_lp_mint: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    b_vault_lp_mint: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    payer_pool_lp: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    payer: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    token_program: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    associated_token_program: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    system_program: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    lock_escrow: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    escrow_vault: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    meteora_program: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    event_authority: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    /// Additional instruction accounts `(AccountInfo, is_writable, is_signer)`.
    __remaining_accounts: Vec<(
        &'b solana_program::account_info::AccountInfo<'a>,
        bool,
        bool,
    )>,
}
