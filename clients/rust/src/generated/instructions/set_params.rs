//! This code was AUTOGENERATED using the kinobi library.
//! Please DO NOT EDIT THIS FILE, instead use visitors
//! to add features, then rerun kinobi to update it.
//!
//! [https://github.com/metaplex-foundation/kinobi]
//!

use crate::generated::types::GlobalSettingsInput;
#[cfg(feature = "anchor")]
use anchor_lang::prelude::{AnchorDeserialize, AnchorSerialize};
#[cfg(not(feature = "anchor"))]
use borsh::{BorshDeserialize, BorshSerialize};

/// Accounts.
pub struct SetParams {
      
              
          pub authority: solana_program::pubkey::Pubkey,
          
              
          pub global: solana_program::pubkey::Pubkey,
          
              
          pub new_authority: Option<solana_program::pubkey::Pubkey>,
          
              
          pub new_withdraw_authority: Option<solana_program::pubkey::Pubkey>,
          
              
          pub system_program: solana_program::pubkey::Pubkey,
          
              
          pub event_authority: solana_program::pubkey::Pubkey,
          
              
          pub program: solana_program::pubkey::Pubkey,
      }

impl SetParams {
  pub fn instruction(&self, args: SetParamsInstructionArgs) -> solana_program::instruction::Instruction {
    self.instruction_with_remaining_accounts(args, &[])
  }
  #[allow(clippy::vec_init_then_push)]
  pub fn instruction_with_remaining_accounts(&self, args: SetParamsInstructionArgs, remaining_accounts: &[solana_program::instruction::AccountMeta]) -> solana_program::instruction::Instruction {
    let mut accounts = Vec::with_capacity(7 + remaining_accounts.len());
                            accounts.push(solana_program::instruction::AccountMeta::new(
            self.authority,
            true
          ));
                                          accounts.push(solana_program::instruction::AccountMeta::new(
            self.global,
            false
          ));
                                                      if let Some(new_authority) = self.new_authority {
              accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                new_authority,
                false,
              ));
            } else {
              accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                crate::PUMP_SCIENCE_ID,
                false,
              ));
            }
                                                                if let Some(new_withdraw_authority) = self.new_withdraw_authority {
              accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                new_withdraw_authority,
                false,
              ));
            } else {
              accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                crate::PUMP_SCIENCE_ID,
                false,
              ));
            }
                                                    accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.system_program,
            false
          ));
                                          accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.event_authority,
            false
          ));
                                          accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.program,
            false
          ));
                      accounts.extend_from_slice(remaining_accounts);
    let mut data = SetParamsInstructionData::new().try_to_vec().unwrap();
          let mut args = args.try_to_vec().unwrap();
      data.append(&mut args);
    
    solana_program::instruction::Instruction {
      program_id: crate::PUMP_SCIENCE_ID,
      accounts,
      data,
    }
  }
}

#[cfg_attr(not(feature = "anchor"), derive(BorshSerialize, BorshDeserialize))]
#[cfg_attr(feature = "anchor", derive(AnchorSerialize, AnchorDeserialize))]
pub struct SetParamsInstructionData {
            discriminator: [u8; 8],
            }

impl SetParamsInstructionData {
  pub fn new() -> Self {
    Self {
                        discriminator: [27, 234, 178, 52, 147, 2, 187, 141],
                                }
  }
}

#[cfg_attr(not(feature = "anchor"), derive(BorshSerialize, BorshDeserialize))]
#[cfg_attr(feature = "anchor", derive(AnchorSerialize, AnchorDeserialize))]
#[cfg_attr(feature = "serde", derive(serde::Serialize, serde::Deserialize))]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct SetParamsInstructionArgs {
                  pub params: GlobalSettingsInput,
      }


/// Instruction builder for `SetParams`.
///
/// ### Accounts:
///
                      ///   0. `[writable, signer]` authority
                ///   1. `[writable]` global
                ///   2. `[optional]` new_authority
                ///   3. `[optional]` new_withdraw_authority
                ///   4. `[optional]` system_program (default to `11111111111111111111111111111111`)
          ///   5. `[]` event_authority
          ///   6. `[]` program
#[derive(Default)]
pub struct SetParamsBuilder {
            authority: Option<solana_program::pubkey::Pubkey>,
                global: Option<solana_program::pubkey::Pubkey>,
                new_authority: Option<solana_program::pubkey::Pubkey>,
                new_withdraw_authority: Option<solana_program::pubkey::Pubkey>,
                system_program: Option<solana_program::pubkey::Pubkey>,
                event_authority: Option<solana_program::pubkey::Pubkey>,
                program: Option<solana_program::pubkey::Pubkey>,
                        params: Option<GlobalSettingsInput>,
        __remaining_accounts: Vec<solana_program::instruction::AccountMeta>,
}

impl SetParamsBuilder {
  pub fn new() -> Self {
    Self::default()
  }
            #[inline(always)]
    pub fn authority(&mut self, authority: solana_program::pubkey::Pubkey) -> &mut Self {
                        self.authority = Some(authority);
                    self
    }
            #[inline(always)]
    pub fn global(&mut self, global: solana_program::pubkey::Pubkey) -> &mut Self {
                        self.global = Some(global);
                    self
    }
            /// `[optional account]`
#[inline(always)]
    pub fn new_authority(&mut self, new_authority: Option<solana_program::pubkey::Pubkey>) -> &mut Self {
                        self.new_authority = new_authority;
                    self
    }
            /// `[optional account]`
#[inline(always)]
    pub fn new_withdraw_authority(&mut self, new_withdraw_authority: Option<solana_program::pubkey::Pubkey>) -> &mut Self {
                        self.new_withdraw_authority = new_withdraw_authority;
                    self
    }
            /// `[optional account, default to '11111111111111111111111111111111']`
#[inline(always)]
    pub fn system_program(&mut self, system_program: solana_program::pubkey::Pubkey) -> &mut Self {
                        self.system_program = Some(system_program);
                    self
    }
            #[inline(always)]
    pub fn event_authority(&mut self, event_authority: solana_program::pubkey::Pubkey) -> &mut Self {
                        self.event_authority = Some(event_authority);
                    self
    }
            #[inline(always)]
    pub fn program(&mut self, program: solana_program::pubkey::Pubkey) -> &mut Self {
                        self.program = Some(program);
                    self
    }
                    #[inline(always)]
      pub fn params(&mut self, params: GlobalSettingsInput) -> &mut Self {
        self.params = Some(params);
        self
      }
        /// Add an aditional account to the instruction.
  #[inline(always)]
  pub fn add_remaining_account(&mut self, account: solana_program::instruction::AccountMeta) -> &mut Self {
    self.__remaining_accounts.push(account);
    self
  }
  /// Add additional accounts to the instruction.
  #[inline(always)]
  pub fn add_remaining_accounts(&mut self, accounts: &[solana_program::instruction::AccountMeta]) -> &mut Self {
    self.__remaining_accounts.extend_from_slice(accounts);
    self
  }
  #[allow(clippy::clone_on_copy)]
  pub fn instruction(&self) -> solana_program::instruction::Instruction {
    let accounts = SetParams {
                              authority: self.authority.expect("authority is not set"),
                                        global: self.global.expect("global is not set"),
                                        new_authority: self.new_authority,
                                        new_withdraw_authority: self.new_withdraw_authority,
                                        system_program: self.system_program.unwrap_or(solana_program::pubkey!("11111111111111111111111111111111")),
                                        event_authority: self.event_authority.expect("event_authority is not set"),
                                        program: self.program.expect("program is not set"),
                      };
          let args = SetParamsInstructionArgs {
                                                              params: self.params.clone().expect("params is not set"),
                                    };
    
    accounts.instruction_with_remaining_accounts(args, &self.__remaining_accounts)
  }
}

  /// `set_params` CPI accounts.
  pub struct SetParamsCpiAccounts<'a, 'b> {
          
                    
              pub authority: &'b solana_program::account_info::AccountInfo<'a>,
                
                    
              pub global: &'b solana_program::account_info::AccountInfo<'a>,
                
                    
              pub new_authority: Option<&'b solana_program::account_info::AccountInfo<'a>>,
                
                    
              pub new_withdraw_authority: Option<&'b solana_program::account_info::AccountInfo<'a>>,
                
                    
              pub system_program: &'b solana_program::account_info::AccountInfo<'a>,
                
                    
              pub event_authority: &'b solana_program::account_info::AccountInfo<'a>,
                
                    
              pub program: &'b solana_program::account_info::AccountInfo<'a>,
            }

/// `set_params` CPI instruction.
pub struct SetParamsCpi<'a, 'b> {
  /// The program to invoke.
  pub __program: &'b solana_program::account_info::AccountInfo<'a>,
      
              
          pub authority: &'b solana_program::account_info::AccountInfo<'a>,
          
              
          pub global: &'b solana_program::account_info::AccountInfo<'a>,
          
              
          pub new_authority: Option<&'b solana_program::account_info::AccountInfo<'a>>,
          
              
          pub new_withdraw_authority: Option<&'b solana_program::account_info::AccountInfo<'a>>,
          
              
          pub system_program: &'b solana_program::account_info::AccountInfo<'a>,
          
              
          pub event_authority: &'b solana_program::account_info::AccountInfo<'a>,
          
              
          pub program: &'b solana_program::account_info::AccountInfo<'a>,
            /// The arguments for the instruction.
    pub __args: SetParamsInstructionArgs,
  }

impl<'a, 'b> SetParamsCpi<'a, 'b> {
  pub fn new(
    program: &'b solana_program::account_info::AccountInfo<'a>,
          accounts: SetParamsCpiAccounts<'a, 'b>,
              args: SetParamsInstructionArgs,
      ) -> Self {
    Self {
      __program: program,
              authority: accounts.authority,
              global: accounts.global,
              new_authority: accounts.new_authority,
              new_withdraw_authority: accounts.new_withdraw_authority,
              system_program: accounts.system_program,
              event_authority: accounts.event_authority,
              program: accounts.program,
                    __args: args,
          }
  }
  #[inline(always)]
  pub fn invoke(&self) -> solana_program::entrypoint::ProgramResult {
    self.invoke_signed_with_remaining_accounts(&[], &[])
  }
  #[inline(always)]
  pub fn invoke_with_remaining_accounts(&self, remaining_accounts: &[(&'b solana_program::account_info::AccountInfo<'a>, bool, bool)]) -> solana_program::entrypoint::ProgramResult {
    self.invoke_signed_with_remaining_accounts(&[], remaining_accounts)
  }
  #[inline(always)]
  pub fn invoke_signed(&self, signers_seeds: &[&[&[u8]]]) -> solana_program::entrypoint::ProgramResult {
    self.invoke_signed_with_remaining_accounts(signers_seeds, &[])
  }
  #[allow(clippy::clone_on_copy)]
  #[allow(clippy::vec_init_then_push)]
  pub fn invoke_signed_with_remaining_accounts(
    &self,
    signers_seeds: &[&[&[u8]]],
    remaining_accounts: &[(&'b solana_program::account_info::AccountInfo<'a>, bool, bool)]
  ) -> solana_program::entrypoint::ProgramResult {
    let mut accounts = Vec::with_capacity(7 + remaining_accounts.len());
                            accounts.push(solana_program::instruction::AccountMeta::new(
            *self.authority.key,
            true
          ));
                                          accounts.push(solana_program::instruction::AccountMeta::new(
            *self.global.key,
            false
          ));
                                          if let Some(new_authority) = self.new_authority {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
              *new_authority.key,
              false,
            ));
          } else {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
              crate::PUMP_SCIENCE_ID,
              false,
            ));
          }
                                          if let Some(new_withdraw_authority) = self.new_withdraw_authority {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
              *new_withdraw_authority.key,
              false,
            ));
          } else {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
              crate::PUMP_SCIENCE_ID,
              false,
            ));
          }
                                          accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.system_program.key,
            false
          ));
                                          accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.event_authority.key,
            false
          ));
                                          accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.program.key,
            false
          ));
                      remaining_accounts.iter().for_each(|remaining_account| {
      accounts.push(solana_program::instruction::AccountMeta {
          pubkey: *remaining_account.0.key,
          is_signer: remaining_account.1,
          is_writable: remaining_account.2,
      })
    });
    let mut data = SetParamsInstructionData::new().try_to_vec().unwrap();
          let mut args = self.__args.try_to_vec().unwrap();
      data.append(&mut args);
    
    let instruction = solana_program::instruction::Instruction {
      program_id: crate::PUMP_SCIENCE_ID,
      accounts,
      data,
    };
    let mut account_infos = Vec::with_capacity(7 + 1 + remaining_accounts.len());
    account_infos.push(self.__program.clone());
                  account_infos.push(self.authority.clone());
                        account_infos.push(self.global.clone());
                        if let Some(new_authority) = self.new_authority {
          account_infos.push(new_authority.clone());
        }
                        if let Some(new_withdraw_authority) = self.new_withdraw_authority {
          account_infos.push(new_withdraw_authority.clone());
        }
                        account_infos.push(self.system_program.clone());
                        account_infos.push(self.event_authority.clone());
                        account_infos.push(self.program.clone());
              remaining_accounts.iter().for_each(|remaining_account| account_infos.push(remaining_account.0.clone()));

    if signers_seeds.is_empty() {
      solana_program::program::invoke(&instruction, &account_infos)
    } else {
      solana_program::program::invoke_signed(&instruction, &account_infos, signers_seeds)
    }
  }
}

/// Instruction builder for `SetParams` via CPI.
///
/// ### Accounts:
///
                      ///   0. `[writable, signer]` authority
                ///   1. `[writable]` global
                ///   2. `[optional]` new_authority
                ///   3. `[optional]` new_withdraw_authority
          ///   4. `[]` system_program
          ///   5. `[]` event_authority
          ///   6. `[]` program
pub struct SetParamsCpiBuilder<'a, 'b> {
  instruction: Box<SetParamsCpiBuilderInstruction<'a, 'b>>,
}

impl<'a, 'b> SetParamsCpiBuilder<'a, 'b> {
  pub fn new(program: &'b solana_program::account_info::AccountInfo<'a>) -> Self {
    let instruction = Box::new(SetParamsCpiBuilderInstruction {
      __program: program,
              authority: None,
              global: None,
              new_authority: None,
              new_withdraw_authority: None,
              system_program: None,
              event_authority: None,
              program: None,
                                            params: None,
                    __remaining_accounts: Vec::new(),
    });
    Self { instruction }
  }
      #[inline(always)]
    pub fn authority(&mut self, authority: &'b solana_program::account_info::AccountInfo<'a>) -> &mut Self {
                        self.instruction.authority = Some(authority);
                    self
    }
      #[inline(always)]
    pub fn global(&mut self, global: &'b solana_program::account_info::AccountInfo<'a>) -> &mut Self {
                        self.instruction.global = Some(global);
                    self
    }
      /// `[optional account]`
#[inline(always)]
    pub fn new_authority(&mut self, new_authority: Option<&'b solana_program::account_info::AccountInfo<'a>>) -> &mut Self {
                        self.instruction.new_authority = new_authority;
                    self
    }
      /// `[optional account]`
#[inline(always)]
    pub fn new_withdraw_authority(&mut self, new_withdraw_authority: Option<&'b solana_program::account_info::AccountInfo<'a>>) -> &mut Self {
                        self.instruction.new_withdraw_authority = new_withdraw_authority;
                    self
    }
      #[inline(always)]
    pub fn system_program(&mut self, system_program: &'b solana_program::account_info::AccountInfo<'a>) -> &mut Self {
                        self.instruction.system_program = Some(system_program);
                    self
    }
      #[inline(always)]
    pub fn event_authority(&mut self, event_authority: &'b solana_program::account_info::AccountInfo<'a>) -> &mut Self {
                        self.instruction.event_authority = Some(event_authority);
                    self
    }
      #[inline(always)]
    pub fn program(&mut self, program: &'b solana_program::account_info::AccountInfo<'a>) -> &mut Self {
                        self.instruction.program = Some(program);
                    self
    }
                    #[inline(always)]
      pub fn params(&mut self, params: GlobalSettingsInput) -> &mut Self {
        self.instruction.params = Some(params);
        self
      }
        /// Add an additional account to the instruction.
  #[inline(always)]
  pub fn add_remaining_account(&mut self, account: &'b solana_program::account_info::AccountInfo<'a>, is_writable: bool, is_signer: bool) -> &mut Self {
    self.instruction.__remaining_accounts.push((account, is_writable, is_signer));
    self
  }
  /// Add additional accounts to the instruction.
  ///
  /// Each account is represented by a tuple of the `AccountInfo`, a `bool` indicating whether the account is writable or not,
  /// and a `bool` indicating whether the account is a signer or not.
  #[inline(always)]
  pub fn add_remaining_accounts(&mut self, accounts: &[(&'b solana_program::account_info::AccountInfo<'a>, bool, bool)]) -> &mut Self {
    self.instruction.__remaining_accounts.extend_from_slice(accounts);
    self
  }
  #[inline(always)]
  pub fn invoke(&self) -> solana_program::entrypoint::ProgramResult {
    self.invoke_signed(&[])
  }
  #[allow(clippy::clone_on_copy)]
  #[allow(clippy::vec_init_then_push)]
  pub fn invoke_signed(&self, signers_seeds: &[&[&[u8]]]) -> solana_program::entrypoint::ProgramResult {
          let args = SetParamsInstructionArgs {
                                                              params: self.instruction.params.clone().expect("params is not set"),
                                    };
        let instruction = SetParamsCpi {
        __program: self.instruction.__program,
                  
          authority: self.instruction.authority.expect("authority is not set"),
                  
          global: self.instruction.global.expect("global is not set"),
                  
          new_authority: self.instruction.new_authority,
                  
          new_withdraw_authority: self.instruction.new_withdraw_authority,
                  
          system_program: self.instruction.system_program.expect("system_program is not set"),
                  
          event_authority: self.instruction.event_authority.expect("event_authority is not set"),
                  
          program: self.instruction.program.expect("program is not set"),
                          __args: args,
            };
    instruction.invoke_signed_with_remaining_accounts(signers_seeds, &self.instruction.__remaining_accounts)
  }
}

struct SetParamsCpiBuilderInstruction<'a, 'b> {
  __program: &'b solana_program::account_info::AccountInfo<'a>,
            authority: Option<&'b solana_program::account_info::AccountInfo<'a>>,
                global: Option<&'b solana_program::account_info::AccountInfo<'a>>,
                new_authority: Option<&'b solana_program::account_info::AccountInfo<'a>>,
                new_withdraw_authority: Option<&'b solana_program::account_info::AccountInfo<'a>>,
                system_program: Option<&'b solana_program::account_info::AccountInfo<'a>>,
                event_authority: Option<&'b solana_program::account_info::AccountInfo<'a>>,
                program: Option<&'b solana_program::account_info::AccountInfo<'a>>,
                        params: Option<GlobalSettingsInput>,
        /// Additional instruction accounts `(AccountInfo, is_writable, is_signer)`.
  __remaining_accounts: Vec<(&'b solana_program::account_info::AccountInfo<'a>, bool, bool)>,
}

