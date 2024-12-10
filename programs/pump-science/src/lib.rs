use anchor_lang::prelude::*;
pub mod errors;
pub mod events;
pub mod instructions;
pub mod state;
pub mod util;
pub mod constants;
use instructions::{
    create_bonding_curve::*, initialize::*, set_params::*, swap::*, create_pool::*, lock_pool::*, whitelist::*
};
use state::bonding_curve::CreateBondingCurveParams;
use state::global::*;
use state::whitelist::*;
declare_id!("46EymXtUWmsPZ9xZH5VtK5uVWR45P7j4UCdYyDdVbYof");

#[program]
pub mod pump_science {

    use super::*;

    pub fn initialize(ctx: Context<Initialize>, params: GlobalSettingsInput) -> Result<()> {
        Initialize::handler(ctx, params)
    }
    pub fn set_params(ctx: Context<SetParams>, params: GlobalSettingsInput) -> Result<()> {
        SetParams::handler(ctx, params)
    }

    pub fn create_pool(ctx: Context<InitializePoolWithConfig>, token_a_amount: u64, token_b_amount: u64) -> Result<()> {
        instructions::initialize_pool_with_config(ctx, token_a_amount, token_b_amount)
    }

    pub fn lock_pool(ctx: Context<LockPool>, token_a_amount: u64, token_b_amount: u64) -> Result<()> {
        instructions::lock_pool(ctx, token_a_amount, token_b_amount)
    }

    pub fn update_wl(ctx: Context<UpdaetWl>, params: WlParams) -> Result<()> {
        UpdaetWl::handler(ctx, params)
    }

    #[access_control(ctx.accounts.validate(&params))]
    pub fn create_bonding_curve(
        ctx: Context<CreateBondingCurve>,
        params: CreateBondingCurveParams,
    ) -> Result<()> {
        CreateBondingCurve::handler(ctx, params)
    }

    #[access_control(ctx.accounts.validate(&params))]
    pub fn swap(ctx: Context<Swap>, params: SwapParams) -> Result<()> {
        Swap::handler(ctx, params)
    }

}
