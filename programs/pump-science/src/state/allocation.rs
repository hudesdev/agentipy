use anchor_lang::prelude::*;
use anchor_lang::{AnchorDeserialize, AnchorSerialize, InitSpace};

use crate::util::BASIS_POINTS_DIVISOR;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, InitSpace, Debug, PartialEq)]
pub struct AllocationDataParams {
    // BASIS POINTS
    pub creator: Option<u64>,
    pub cex: Option<u64>,
    pub launch_brandkit: Option<u64>,
    pub lifetime_brandkit: Option<u64>,
    pub platform: Option<u64>,
    pub presale: Option<u64>,
    pub pool_reserve: Option<u64>,
}
impl Default for AllocationDataParams {
    fn default() -> Self {
        Self {
            creator: None,
            cex: None,
            launch_brandkit: None,
            lifetime_brandkit: None,
            platform: None,
            presale: None,
            pool_reserve: None,
        }
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, InitSpace, Debug, PartialEq)]

pub struct AllocationData {
    // BASIS POINTS
    pub creator: u64,
    pub cex: u64,
    pub launch_brandkit: u64,
    pub lifetime_brandkit: u64,
    pub platform: u64,
    pub presale: u64,
    pub pool_reserve: u64,
}

impl From<AllocationDataParams> for AllocationData {
    fn from(params: AllocationDataParams) -> Self {
        let default = Self::default();
        Self {
            creator: params.creator.unwrap_or(default.creator),
            cex: params.cex.unwrap_or(default.cex),
            launch_brandkit: params.launch_brandkit.unwrap_or(default.launch_brandkit),
            lifetime_brandkit: params
                .lifetime_brandkit
                .unwrap_or(default.lifetime_brandkit),
            platform: params.platform.unwrap_or(default.platform),
            presale: params.presale.unwrap_or(default.presale),
            pool_reserve: params.pool_reserve.unwrap_or(default.pool_reserve),
        }
    }
}

impl Default for AllocationData {
    fn default() -> Self {
        Self {
            creator: 1000,
            cex: 1000,
            launch_brandkit: 1000,
            lifetime_brandkit: 1000,
            platform: 1000,
            presale: 0u64,
            pool_reserve: 5000,
        }
    }
}
impl AllocationData {
    pub fn is_valid(&self) -> bool {
        let sum_is_right = self.creator
            + self.cex
            + self.launch_brandkit
            + self.lifetime_brandkit
            + self.platform
            + self.presale
            + self.pool_reserve
            == BASIS_POINTS_DIVISOR;
        sum_is_right && self.pool_reserve > 0
    }
}
