//! This code was AUTOGENERATED using the kinobi library.
//! Please DO NOT EDIT THIS FILE, instead use visitors
//! to add features, then rerun kinobi to update it.
//!
//! [https://github.com/metaplex-foundation/kinobi]
//!

use crate::generated::types::ProgramStatus;
use solana_program::pubkey::Pubkey;
#[cfg(feature = "anchor")]
use anchor_lang::prelude::{AnchorDeserialize, AnchorSerialize};
#[cfg(not(feature = "anchor"))]
use borsh::{BorshDeserialize, BorshSerialize};


#[cfg_attr(feature = "serde", derive(serde::Serialize, serde::Deserialize))]
#[cfg_attr(not(feature = "anchor"), derive(BorshSerialize, BorshDeserialize))]
#[cfg_attr(feature = "anchor", derive(AnchorSerialize, AnchorDeserialize))]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Global {
pub discriminator: [u8; 8],
pub status: ProgramStatus,
pub initialized: bool,
#[cfg_attr(feature = "serde", serde(with = "serde_with::As::<serde_with::DisplayFromStr>"))]
pub global_authority: Pubkey,
#[cfg_attr(feature = "serde", serde(with = "serde_with::As::<serde_with::DisplayFromStr>"))]
pub withdraw_authority: Pubkey,
pub trade_fee_bps: u64,
pub launch_fee_lamports: u64,
pub created_mint_decimals: u8,
}


impl Global {
      pub const LEN: usize = 91;
  
          /// Prefix values used to generate a PDA for this account.
    ///
    /// Values are positional and appear in the following order:
    ///
                  ///   0. `Global::PREFIX`
                            pub const PREFIX: &'static [u8] = "global".as_bytes();
      
      pub fn create_pda(
            bump: u8,
    ) -> Result<solana_program::pubkey::Pubkey, solana_program::pubkey::PubkeyError> {
      solana_program::pubkey::Pubkey::create_program_address(
        &[
                                    "global".as_bytes(),
                                &[bump],
        ],
        &crate::PUMP_SCIENCE_ID,
      )
    }

    pub fn find_pda(
        ) -> (solana_program::pubkey::Pubkey, u8) {
      solana_program::pubkey::Pubkey::find_program_address(
        &[
                                    "global".as_bytes(),
                              ],
        &crate::PUMP_SCIENCE_ID,
      )
    }
  
  #[inline(always)]
  pub fn from_bytes(data: &[u8]) -> Result<Self, std::io::Error> {
    let mut data = data;
    Self::deserialize(&mut data)
  }
}

impl<'a> TryFrom<&solana_program::account_info::AccountInfo<'a>> for Global {
  type Error = std::io::Error;

  fn try_from(account_info: &solana_program::account_info::AccountInfo<'a>) -> Result<Self, Self::Error> {
      let mut data: &[u8] = &(*account_info.data).borrow();
      Self::deserialize(&mut data)
  }
}

