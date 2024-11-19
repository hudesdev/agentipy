use anchor_lang::prelude::*;
#[account]
#[derive(InitSpace, Debug, Default)]
pub struct CreatorVault {
    pub initial_vested_supply: u64,
    pub last_distribution: i64,
}
impl CreatorVault {
    pub const SEED_PREFIX: &'static str = "creator-vault";

    pub fn get_signer<'a>(bump: &'a u8, mint: &'a Pubkey) -> [&'a [u8]; 3] {
        [
            Self::SEED_PREFIX.as_bytes(),
            mint.as_ref(),
            std::slice::from_ref(bump),
        ]
    }
}

#[account]
#[derive(InitSpace, Debug, Default)]
pub struct PresaleVault {
    pub initial_vested_supply: u64,
}
impl PresaleVault {
    pub const SEED_PREFIX: &'static str = "presale-vault";

    pub fn get_signer<'a>(bump: &'a u8, mint: &'a Pubkey) -> [&'a [u8]; 3] {
        [
            Self::SEED_PREFIX.as_bytes(),
            mint.as_ref(),
            std::slice::from_ref(bump),
        ]
    }
}

#[account]
#[derive(InitSpace, Debug, Default)]
pub struct PlatformVault {
    pub initial_vested_supply: u64,
    pub last_distribution: i64,
    pub last_fee_withdrawal: i64,
    pub fees_withdrawn: u64,
}
impl PlatformVault {
    pub const SEED_PREFIX: &'static str = "platform-vault";

    pub fn get_signer<'a>(bump: &'a u8, mint: &'a Pubkey) -> [&'a [u8]; 3] {
        [
            Self::SEED_PREFIX.as_bytes(),
            mint.as_ref(),
            std::slice::from_ref(bump),
        ]
    }
}

#[account]
#[derive(InitSpace, Debug, Default)]
pub struct BrandVault {
    pub launch_brandkit_supply: u64,
    pub lifetime_brandkit_supply: u64,
    pub initial_vested_supply: u64,
}
impl BrandVault {
    pub const SEED_PREFIX: &'static str = "brand-vault";

    pub fn get_signer<'a>(bump: &'a u8, mint: &'a Pubkey) -> [&'a [u8]; 3] {
        [
            Self::SEED_PREFIX.as_bytes(),
            mint.as_ref(),
            std::slice::from_ref(bump),
        ]
    }
}
