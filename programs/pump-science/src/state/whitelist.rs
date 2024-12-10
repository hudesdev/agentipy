use anchor_lang::prelude::*;
use crate::errors::ContractError;

#[account]
#[derive(InitSpace, Debug, Default)]
pub struct Whitelist {
    pub initialized: bool,
    #[max_len(5)]
    pub creators: Vec<Pubkey>,
}

impl Whitelist {
    pub const SEED_PREFIX: &'static str = "wl-seed";

    pub fn update_wl(&mut self, param: WlParams) -> Result<()> {
        // let creators = &mut self.creators;
        
        if param.add_wl {
            require!(
                !self.creators.contains(&param.creator),
                ContractError::AddFailed
            );

            self.creators.push(param.creator.key());
        } else {
            require!(
                self.creators.contains(&param.creator),
                ContractError::RemoveFailed
            );

            if let Some(pos) = self.creators.iter().position(|x| *x == param.creator) {
                self.creators.remove(pos);
            }
        }

        Ok(())
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, InitSpace, Debug)]
pub struct WlParams {
    pub add_wl: bool,
    pub creator: Pubkey,
}