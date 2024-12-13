use anchor_lang::prelude::*;
use anchor_spl::token::spl_token::instruction::AuthorityType;
use anchor_spl::token::{self, FreezeAccount, Mint, ThawAccount, Token, TokenAccount};

use crate::state::{bonding_curve::BondingCurve, global::*};

// #[derive(Accounts)]
pub struct BondingCurveLockerCtx<'info> {
    pub bonding_curve_bump: u8,
    // #[account()]
    pub mint: Box<Account<'info, Mint>>,
    pub bonding_curve: Box<Account<'info, BondingCurve>>,
    pub bonding_curve_token_account: Box<Account<'info, TokenAccount>>,
    pub token_program: Program<'info, Token>,
    pub global: Box<Account<'info, Global>>,
}
impl BondingCurveLockerCtx<'_> {
    fn get_signer<'a>(&self) -> [&[u8]; 3] {
        let signer: [&[u8]; 3] =
            BondingCurve::get_signer(&self.bonding_curve_bump, self.mint.to_account_info().key);
        signer
    }
    pub fn lock_ata<'a>(&self) -> Result<()> {
        let signer = self.get_signer();
        let signer_seeds: &[&[&[u8]]; 1] = &[&signer[..]];

        let accs = FreezeAccount {
            account: self.bonding_curve_token_account.to_account_info(),
            mint: self.mint.to_account_info(),
            authority: self.bonding_curve.to_account_info(),
        };
        token::freeze_account(CpiContext::new_with_signer(
            self.token_program.to_account_info(),
            accs,
            signer_seeds,
        ))?;
        msg!("BondingCurveLockerCtx::lock_ata complete");

        Ok(())
    }
    pub fn unlock_ata<'a>(&self) -> Result<()> {
        let signer = self.get_signer();
        let signer_seeds: &[&[&[u8]]; 1] = &[&signer[..]];

        let accs = ThawAccount {
            account: self.bonding_curve_token_account.to_account_info(),
            mint: self.mint.to_account_info(),
            authority: self.bonding_curve.to_account_info(),
        };
        token::thaw_account(CpiContext::new_with_signer(
            self.token_program.to_account_info(),
            accs,
            signer_seeds,
        ))?;
        msg!("BondingCurveLockerCtx::unlock_ata complete");

        Ok(())
    }

    pub fn revoke_mint_authority(&self) -> Result<()> {
        let mint_info = self.mint.to_account_info();
        let mint_authority_info = self.bonding_curve.to_account_info();
        let signer = self.get_signer();
        let signer_seeds: &[&[&[u8]]; 1] = &[&signer[..]];

        //remove mint_authority
        token::set_authority(
            CpiContext::new_with_signer(
                self.token_program.to_account_info(),
                token::SetAuthority {
                    current_authority: mint_authority_info.clone(),
                    account_or_mint: mint_info.clone(),
                },
                signer_seeds,
            ),
            AuthorityType::MintTokens,
            None,
        )?;
        msg!("CreateBondingCurve::revoke_mint_authority: done");

        Ok(())
    }

    pub fn revoke_freeze_authority(&self) -> Result<()> {
        let mint_info = self.mint.to_account_info();
        let mint_authority_info = self.bonding_curve.to_account_info();
        let signer = self.get_signer();
        let signer_seeds: &[&[&[u8]]; 1] = &[&signer[..]];

        // revoke freeze authority
        token::set_authority(
            CpiContext::new_with_signer(
                self.token_program.to_account_info(),
                token::SetAuthority {
                    current_authority: mint_authority_info.clone(),
                    account_or_mint: mint_info.clone(),
                },
                signer_seeds,
            ),
            AuthorityType::FreezeAccount,
            None,
        )?;

        msg!("CreateBondingCurve::revoke_freeze_authority: done");

        Ok(())
    }
}

pub trait IntoBondingCurveLockerCtx<'info> {
    fn into_bonding_curve_locker_ctx(&self, bonding_curve_bump: u8)
        -> BondingCurveLockerCtx<'info>;
}
