use crate::errors::ContractError;
use crate::state::bonding_curve::locker::BondingCurveLockerCtx;
use crate::state::bonding_curve::*;
use crate::util::bps_mul;
use crate::Global;
use anchor_lang::prelude::*;
use std::fmt::{self};
use structs::BondingCurve;

impl BondingCurve {
    pub const SEED_PREFIX: &'static str = "bonding-curve";

    pub fn calculate_fee(&self, amount: u64) -> Result<u64> {
        let start_time = self.start_time;
        msg!("start time =====:{}", start_time);
        let clock = Clock::get()?;

        let time_now = clock.unix_timestamp;
        let mut sol_fee: u64 = 0;
        if (time_now - start_time) < 150 * 400 {
            sol_fee = bps_mul(99, amount, 10_000).unwrap();
        } else if (time_now - start_time) > 150 * 400 && (time_now - start_time) < 250 * 400 {
            sol_fee = (21626 - 83 * 190) * 100_000;
        } else if (time_now - start_time) > 250 * 400 {
            sol_fee = bps_mul(1, amount, 10_000).unwrap();
        }
        Ok(sol_fee)
    }

    pub fn get_signer<'a>(bump: &'a u8, mint: &'a Pubkey) -> [&'a [u8]; 3] {
        [
            Self::SEED_PREFIX.as_bytes(),
            mint.as_ref(),
            std::slice::from_ref(bump),
        ]
    }

    pub fn update_from_params(
        &mut self,
        mint: Pubkey,
        creator: Pubkey,
        global_config: &Global,
        params: &CreateBondingCurveParams,
        clock: &Clock,
        bump: u8,
    ) -> &mut Self {
        let start_time = if let Some(start_time) = params.start_time {
            start_time
        } else {
            clock.unix_timestamp
        };
        let creator = creator;
        let complete = false;
        self.clone_from(&BondingCurve {
            mint,
            creator,
            virtual_token_reserves: global_config.initial_virtual_token_reserves,
            virtual_sol_reserves: global_config.initial_virtual_sol_reserves,
            initial_virtual_token_reserves: global_config.initial_virtual_token_reserves,
            real_sol_reserves: 0,
            real_token_reserves: global_config.initial_real_token_reserves,
            token_total_supply: global_config.token_total_supply,
            start_time,
            complete,
            bump,
        });
        self
    }

    pub fn get_buy_price(&self, tokens: u64) -> Option<u64> {
        msg!("get_buy_price: tokens: {}", tokens);
        if tokens == 0 || tokens > self.virtual_token_reserves as u64 {
            return None;
        }

        let product_of_reserves =
            (self.virtual_sol_reserves as u128).checked_mul(self.virtual_token_reserves as u128)?;
        msg!(
            "get_buy_price: product_of_reserves: {}",
            product_of_reserves
        );

        let new_virtual_token_reserves =
            (self.virtual_token_reserves as u128).checked_sub(tokens as u128)?;
        msg!(
            "get_buy_price: new_virtual_token_reserves: {}",
            new_virtual_token_reserves
        );

        let new_virtual_sol_reserves = product_of_reserves
            .checked_div(new_virtual_token_reserves)?
            .checked_add(1)?;
        msg!(
            "get_buy_price: new_virtual_sol_reserves: {}",
            new_virtual_sol_reserves
        );

        let amount_needed =
            new_virtual_sol_reserves.checked_sub(self.virtual_sol_reserves as u128)?;
        msg!("get_buy_price: amount_needed: {}", amount_needed);

        amount_needed.try_into().ok()
    }

    pub fn apply_buy(&mut self, sol_amount: u64) -> Option<BuyResult> {
        msg!("ApplyBuy: sol_amount: {}", sol_amount);

        let final_token_amount = self.get_tokens_for_buy_sol(sol_amount)?;
        msg!("ApplyBuy: final_token_amount: {}", final_token_amount);
        let new_virtual_token_reserves =
            (self.virtual_token_reserves as u128).checked_sub(final_token_amount as u128)?;
        msg!(
            "ApplyBuy: new_virtual_token_reserves: {}",
            new_virtual_token_reserves
        );
        let new_real_token_reserves =
            (self.real_token_reserves as u128).checked_sub(final_token_amount as u128)?;
        msg!(
            "ApplyBuy: new_real_token_reserves: {}",
            new_real_token_reserves
        );

        let new_virtual_sol_reserves =
            (self.virtual_sol_reserves as u128).checked_add(sol_amount as u128)?;
        msg!(
            "ApplyBuy: new_virtual_sol_reserves: {}",
            new_virtual_sol_reserves
        );
        let new_real_sol_reserves =
            (self.real_sol_reserves as u128).checked_add(sol_amount as u128)?;
        msg!("ApplyBuy: new_real_sol_reserves: {}", new_real_sol_reserves);
        self.virtual_token_reserves = new_virtual_token_reserves.try_into().ok()?;
        msg!(
            "ApplyBuy: updated virtual_token_reserves: {}",
            self.virtual_token_reserves
        );
        self.real_token_reserves = new_real_token_reserves.try_into().ok()?;
        msg!(
            "ApplyBuy: updated real_token_reserves: {}",
            self.real_token_reserves
        );
        self.virtual_sol_reserves = new_virtual_sol_reserves.try_into().ok()?;
        msg!(
            "ApplyBuy: updated virtual_sol_reserves: {}",
            self.virtual_sol_reserves
        );
        self.real_sol_reserves = new_real_sol_reserves.try_into().ok()?;
        msg!(
            "ApplyBuy: updated real_sol_reserves: {}",
            self.real_sol_reserves
        );
        self.msg();
        Some(BuyResult {
            token_amount: final_token_amount,
            sol_amount,
        })
    }

    pub fn get_sell_price(&self, tokens: u64) -> Option<u64> {
        msg!("get_sell_price: tokens: {}", tokens);
        if tokens == 0 || tokens > self.virtual_token_reserves as u64 {
            return None;
        }

        let scaling_factor = self.initial_virtual_token_reserves as u128;
        msg!("get_sell_price: scaling_factor: {}", scaling_factor);

        let scaled_tokens = (tokens as u128).checked_mul(scaling_factor)?;
        msg!("get_sell_price: scaled_tokens: {}", scaled_tokens);
        let token_sell_proportion =
            scaled_tokens.checked_div(self.virtual_token_reserves as u128)?;
        msg!(
            "get_sell_price: token_sell_proportion: {}",
            token_sell_proportion
        );
        let sol_received = ((self.virtual_sol_reserves as u128)
            .checked_mul(token_sell_proportion)?)
        .checked_div(scaling_factor)?;
        msg!("get_sell_price: sol_received: {}", sol_received);
        let recv = <u128 as std::convert::TryInto<u64>>::try_into(sol_received)
            .ok()?
            .min(self.real_sol_reserves);

        msg!("get_sell_price: recv: {}", recv);
        Some(recv)
    }

    pub fn apply_sell(&mut self, token_amount: u64) -> Option<SellResult> {
        msg!("apply_sell: token_amount: {}", token_amount);
        let new_virtual_token_reserves =
            (self.virtual_token_reserves as u128).checked_add(token_amount as u128)?;
        msg!(
            "apply_sell: new_virtual_token_reserves: {}",
            new_virtual_token_reserves
        );
        let new_real_token_reserves =
            (self.real_token_reserves as u128).checked_add(token_amount as u128)?;
        msg!(
            "apply_sell: new_real_token_reserves: {}",
            new_real_token_reserves
        );

        let sol_amount = self.get_sell_price(token_amount)?;
        msg!("apply_sell: sol_amount: {}", sol_amount);

        let new_virtual_sol_reserves =
            (self.virtual_sol_reserves as u128).checked_sub(sol_amount as u128)?;
        msg!(
            "apply_sell: new_virtual_sol_reserves: {}",
            new_virtual_sol_reserves
        );
        let new_real_sol_reserves = self.real_sol_reserves.checked_sub(sol_amount)?;
        msg!(
            "apply_sell: new_real_sol_reserves: {}",
            new_real_sol_reserves
        );

        self.virtual_token_reserves = new_virtual_token_reserves.try_into().ok()?;
        msg!(
            "apply_sell: updated virtual_token_reserves: {}",
            self.virtual_token_reserves
        );
        self.real_token_reserves = new_real_token_reserves.try_into().ok()?;
        msg!(
            "apply_sell: updated real_token_reserves: {}",
            self.real_token_reserves
        );
        self.virtual_sol_reserves = new_virtual_sol_reserves.try_into().ok()?;
        msg!(
            "apply_sell: updated virtual_sol_reserves: {}",
            self.virtual_sol_reserves
        );
        self.real_sol_reserves = new_real_sol_reserves.try_into().ok()?;
        msg!(
            "apply_sell: updated real_sol_reserves: {}",
            self.real_sol_reserves
        );
        self.msg();
        Some(SellResult {
            token_amount,
            sol_amount,
        })
    }

    pub fn get_tokens_for_buy_sol(&self, sol_amount: u64) -> Option<u64> {
        msg!("GetTokensForBuySol: sol_amount: {}", sol_amount);
        if sol_amount == 0 {
            return None;
        }
        msg!("GetTokensForBuySol: sol_amount: {}", sol_amount);

        let product_of_reserves =
            (self.virtual_sol_reserves as u128).checked_mul(self.virtual_token_reserves as u128)?;
        msg!(
            "GetTokensForBuySol: product_of_reserves: {}",
            product_of_reserves
        );
        let new_virtual_sol_reserves =
            (self.virtual_sol_reserves as u128).checked_add(sol_amount as u128)?;
        msg!(
            "GetTokensForBuySol: new_virtual_sol_reserves: {}",
            new_virtual_sol_reserves
        );
        let new_virtual_token_reserves = product_of_reserves
            .checked_div(new_virtual_sol_reserves)?
            .checked_add(1)?;
        msg!(
            "GetTokensForBuySol: new_virtual_token_reserves: {}",
            new_virtual_token_reserves
        );
        let tokens_received =
            (self.virtual_token_reserves as u128).checked_sub(new_virtual_token_reserves)?;
        msg!("GetTokensForBuySol: tokens_received: {}", tokens_received);
        Some(
            <u128 as std::convert::TryInto<u64>>::try_into(tokens_received)
                .ok()?
                .min(self.real_token_reserves),
        )
    }

    pub fn get_tokens_for_sell_sol(&self, sol_amount: u64) -> Option<u64> {
        msg!("GetTokensForSellSol: sol_amount: {}", sol_amount);
        if sol_amount == 0 || sol_amount > self.real_sol_reserves {
            msg!("GetTokensForSellSol: sol_amount is invalid");
            return None;
        }

        let scaling_factor = self.initial_virtual_token_reserves as u128;

        let scaled_sol = (sol_amount as u128).checked_mul(scaling_factor)?;
        msg!("GetTokensForSellSol: scaled_sol: {}", scaled_sol);
        let sol_sell_proportion = scaled_sol.checked_div(self.virtual_sol_reserves as u128)?;
        msg!(
            "GetTokensForSellSol: sol_sell_proportion: {}",
            sol_sell_proportion
        );
        let tokens_received = ((self.virtual_token_reserves as u128)
            .checked_mul(sol_sell_proportion)?)
        .checked_div(scaling_factor)?;
        msg!("GetTokensForSellSol: tokens_received: {}", tokens_received);

        tokens_received.try_into().ok()
    }

    pub fn is_started(&self, clock: &Clock) -> bool {
        let now = clock.unix_timestamp;
        now >= self.start_time
    }

    pub fn msg(&self) -> () {
        msg!("{:#?}", self);
    }

    pub fn invariant<'info>(ctx: &mut BondingCurveLockerCtx<'info>) -> Result<()> {
        let bonding_curve = &mut ctx.bonding_curve;
        let tkn_account = &mut ctx.bonding_curve_token_account;
        if tkn_account.owner != bonding_curve.key() {
            msg!("Invariant failed: invalid token acc supplied");
            return Err(ContractError::BondingCurveInvariant.into());
        }
        tkn_account.reload()?;

        let lamports = bonding_curve.get_lamports();
        let tkn_balance = tkn_account.amount;

        let rent_exemption_balance: u64 =
            Rent::get()?.minimum_balance(8 + BondingCurve::INIT_SPACE as usize);
        let bonding_curve_pool_lamports: u64 = lamports - rent_exemption_balance;

        // Ensure real sol reserves are equal to bonding curve pool lamports
        if bonding_curve_pool_lamports != bonding_curve.real_sol_reserves {
            msg!(
                "real_sol_r:{}, bonding_lamps:{}",
                bonding_curve.real_sol_reserves,
                bonding_curve_pool_lamports
            );
            msg!("Invariant failed: real_sol_reserves != bonding_curve_pool_lamports");
            return Err(ContractError::BondingCurveInvariant.into());
        }

        // Ensure the virtual reserves are always positive
        if bonding_curve.virtual_sol_reserves <= 0 {
            msg!("Invariant failed: virtual_sol_reserves <= 0");
            return Err(ContractError::BondingCurveInvariant.into());
        }
        if bonding_curve.virtual_token_reserves <= 0 {
            msg!("Invariant failed: virtual_token_reserves <= 0");
            return Err(ContractError::BondingCurveInvariant.into());
        }

        // Ensure the token total supply is consistent with the reserves
        if bonding_curve.real_token_reserves != tkn_balance {
            msg!("Invariant failed: real_token_reserves != tkn_balance");
            msg!("real_token_reserves: {}", bonding_curve.real_token_reserves);
            msg!("tkn_balance: {}", tkn_balance);
            return Err(ContractError::BondingCurveInvariant.into());
        }

        // Ensure the bonding curve is complete only if real token reserves are zero
        if bonding_curve.complete && bonding_curve.real_token_reserves != 0 {
            msg!("Invariant failed: bonding curve marked as complete but real_token_reserves != 0");
            return Err(ContractError::BondingCurveInvariant.into());
        }

        if !bonding_curve.complete && !tkn_account.is_frozen() {
            msg!("Active BondingCurve TokenAccount must always be frozen at the end");
            return Err(ContractError::BondingCurveInvariant.into());
        }
        Ok(())
    }
}

impl fmt::Display for BondingCurve {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(
            f,
            "BondingCurve {{ creator: {:?}, initial_virtual_token_reserves: {:?}, virtual_sol_reserves: {:?}, virtual_token_reserves: {:?}, real_sol_reserves: {:?}, real_token_reserves: {:?}, token_total_supply: {:?}, start_time: {:?}, complete: {:?} }}",
            self.creator,
            self.initial_virtual_token_reserves,
            self.virtual_sol_reserves,
            self.virtual_token_reserves,
            self.real_sol_reserves,
            self.real_token_reserves,
            self.token_total_supply,
            self.start_time,
            self.complete
        )
    }
}
