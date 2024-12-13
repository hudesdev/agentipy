use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace, Debug, Default)]
pub struct Whitelist {
    pub creator: Pubkey,
}

impl Whitelist {
    pub const SEED_PREFIX: &'static str = "wl-seed";
}