use crate::{
    events::{GlobalUpdateEvent, IntoEvent},
    util::bps_mul,
};
use anchor_lang::prelude::*;
#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct GlobalAuthorityInput {
    pub global_authority: Option<Pubkey>,
    pub withdraw_authority: Option<Pubkey>,
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

    pub global_authority: Pubkey,
    pub withdraw_authority: Pubkey,

    pub trade_fee_bps: u64,
    pub launch_fee_lamports: u64,

    pub created_mint_decimals: u8,
}
#[derive(AnchorSerialize, AnchorDeserialize, Debug, Clone)]
pub struct GlobalSettingsInput {
    pub trade_fee_bps: Option<u64>,
    pub created_mint_decimals: Option<u8>,
    pub launch_fee_lamports: Option<u64>,

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
        bps_mul(self.trade_fee_bps, amount).unwrap()
    }

    pub fn update_settings(&mut self, params: GlobalSettingsInput) {
        if let Some(trade_fee_bps) = params.trade_fee_bps {
            self.trade_fee_bps = trade_fee_bps;
        }
        if let Some(launch_fee_lamports) = params.launch_fee_lamports {
            self.launch_fee_lamports = launch_fee_lamports;
        }
        if let Some(created_mint_decimals) = params.created_mint_decimals {
            self.created_mint_decimals = created_mint_decimals;
        }
        if let Some(status) = params.status {
            self.status = status;
        }
    }

    pub fn update_authority(&mut self, params: GlobalAuthorityInput) {
        if let Some(global_authority) = params.global_authority {
            self.global_authority = global_authority;
        }
        if let Some(withdraw_authority) = params.withdraw_authority {
            self.withdraw_authority = withdraw_authority;
        }
    }
}

impl IntoEvent<GlobalUpdateEvent> for Global {
    fn into_event(&self) -> GlobalUpdateEvent {
        GlobalUpdateEvent {
            global_authority: self.global_authority,
            withdraw_authority: self.withdraw_authority,

            launch_fee_lamports: self.launch_fee_lamports,
            trade_fee_bps: self.trade_fee_bps,
            created_mint_decimals: self.created_mint_decimals,
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
            withdraw_authority: Pubkey::default(),
            trade_fee_bps: 0,
            launch_fee_lamports: 1000,
            created_mint_decimals: 0,
        };

        fixture.trade_fee_bps = 100;
        assert_eq!(fixture.calculate_fee(100), 1); //1% fee

        fixture.trade_fee_bps = 1000;
        assert_eq!(fixture.calculate_fee(100), 10); //10% fee

        fixture.trade_fee_bps = 5000;
        assert_eq!(fixture.calculate_fee(100), 50); //50% fee

        fixture.trade_fee_bps = 50000;
        assert_eq!(fixture.calculate_fee(100), 500); //500% fee

        fixture.trade_fee_bps = 50;
        assert_eq!(fixture.calculate_fee(100), 0); //0.5% fee

        fixture.trade_fee_bps = 50;
        assert_eq!(fixture.calculate_fee(1000), 5); //0.5% fee

        fixture.trade_fee_bps = 0;
        assert_eq!(fixture.calculate_fee(100), 0); //0% fee
    }
}
