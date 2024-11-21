use crate::{
    events::{GlobalUpdateEvent, IntoEvent},
    util::bps_mul,
};
use anchor_lang::prelude::*;

use super::fee_vault::FeeRecipient;
#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct GlobalAuthorityInput {
    pub global_authority: Option<Pubkey>,
    pub migration_authority: Option<Pubkey>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, InitSpace, Debug, PartialEq)]
pub enum ProgramStatus {
    Running,
    SwapOnly,
    SwapOnlyNoLaunch,
    Paused,
}

#[account]
#[derive(InitSpace, Debug)]
pub struct Global {
    pub status: ProgramStatus,
    pub initialized: bool,

    pub global_authority: Pubkey,    // can update settings
    pub migration_authority: Pubkey, // can migrate

    pub initial_virtual_token_reserves: u64,
    pub initial_virtual_sol_reserves: u64,
    pub initial_real_token_reserves: u64,
    pub token_total_supply: u64,
    pub fee_bps: u64,
    pub mint_decimals: u8,
}

impl Default for Global {
    fn default() -> Self {
        Self {
            status: ProgramStatus::Running,
            initialized: true,
            global_authority: Pubkey::default(),
            migration_authority: Pubkey::default(),
            // Pump.fun initial values
            initial_virtual_token_reserves: 1073000000000000,
            initial_virtual_sol_reserves: 30000000000,
            initial_real_token_reserves: 793100000000000,
            token_total_supply: 1000000000000000,
            fee_bps: 100, // 1%
            mint_decimals: 6,
        }
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, Debug, Clone)]
pub struct GlobalSettingsInput {
    pub fee_recipient: Option<Pubkey>,
    pub initial_virtual_token_reserves: Option<u64>,
    pub initial_virtual_sol_reserves: Option<u64>,
    pub initial_real_token_reserves: Option<u64>,
    pub token_total_supply: Option<u64>,
    pub fee_bps: Option<u64>,
    pub mint_decimals: Option<u8>,

    pub fee_recipients: Option<Vec<FeeRecipient>>,

    pub status: Option<ProgramStatus>,
}

impl Global {
    pub const SEED_PREFIX: &'static str = "global";

    pub fn get_signer<'a>(bump: &'a u8) -> [&'a [u8]; 2] {
        let prefix_bytes = Self::SEED_PREFIX.as_bytes();
        let bump_slice: &'a [u8] = std::slice::from_ref(bump);
        [prefix_bytes, bump_slice]
    }

    pub fn calculate_fee(&self, amount: u64) -> u64 {
        bps_mul(self.fee_bps, amount).unwrap()
    }

    pub fn update_settings(&mut self, params: GlobalSettingsInput) {
        if let Some(fee_bps) = params.fee_bps {
            self.fee_bps = fee_bps;
        }
        if let Some(mint_decimals) = params.mint_decimals {
            self.mint_decimals = mint_decimals;
        }
        if let Some(status) = params.status {
            self.status = status;
        }
        if let Some(initial_virtual_token_reserves) = params.initial_virtual_token_reserves {
            self.initial_virtual_token_reserves = initial_virtual_token_reserves;
        }
        if let Some(initial_virtual_sol_reserves) = params.initial_virtual_sol_reserves {
            self.initial_virtual_sol_reserves = initial_virtual_sol_reserves;
        }
        if let Some(initial_real_token_reserves) = params.initial_real_token_reserves {
            self.initial_real_token_reserves = initial_real_token_reserves;
        }
        if let Some(token_total_supply) = params.token_total_supply {
            self.token_total_supply = token_total_supply;
        }
    }

    pub fn update_authority(&mut self, params: GlobalAuthorityInput) {
        if let Some(global_authority) = params.global_authority {
            self.global_authority = global_authority;
        }
        if let Some(migration_authority) = params.migration_authority {
            self.migration_authority = migration_authority;
        }
    }
}

impl IntoEvent<GlobalUpdateEvent> for Global {
    fn into_event(&self) -> GlobalUpdateEvent {
        GlobalUpdateEvent {
            global_authority: self.global_authority,
            migration_authority: self.migration_authority,
            status: self.status,
            initial_virtual_token_reserves: self.initial_virtual_token_reserves,
            initial_virtual_sol_reserves: self.initial_virtual_sol_reserves,
            initial_real_token_reserves: self.initial_real_token_reserves,
            token_total_supply: self.token_total_supply,
            fee_bps: self.fee_bps,
            mint_decimals: self.mint_decimals,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_calculate_fee() {
        let mut fixture = Global {
            status: ProgramStatus::Running,
            initialized: true,
            global_authority: Pubkey::default(),
            migration_authority: Pubkey::default(),
            fee_bps: 0,
            mint_decimals: 0,
            initial_virtual_token_reserves: 0,
            initial_virtual_sol_reserves: 0,
            initial_real_token_reserves: 0,
            token_total_supply: 0,
        };

        fixture.fee_bps = 100;
        assert_eq!(fixture.calculate_fee(100), 1); //1% fee

        fixture.fee_bps = 1000;
        assert_eq!(fixture.calculate_fee(100), 10); //10% fee

        fixture.fee_bps = 5000;
        assert_eq!(fixture.calculate_fee(100), 50); //50% fee

        fixture.fee_bps = 50000;
        assert_eq!(fixture.calculate_fee(100), 500); //500% fee

        fixture.fee_bps = 50;
        assert_eq!(fixture.calculate_fee(100), 0); //0.5% fee

        fixture.fee_bps = 50;
        assert_eq!(fixture.calculate_fee(1000), 5); //0.5% fee

        fixture.fee_bps = 0;
        assert_eq!(fixture.calculate_fee(100), 0); //0% fee
    }
}
