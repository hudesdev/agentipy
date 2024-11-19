use anchor_lang::error_code;

#[error_code]
pub enum ContractError {
    #[msg("Invalid Global Authority")]
    InvalidGlobalAuthority,
    #[msg("Invalid Withdraw Authority")]
    InvalidWithdrawAuthority,
    #[msg("Invalid Argument")]
    InvalidArgument,

    #[msg("Global Already Initialized")]
    AlreadyInitialized,
    #[msg("Global Not Initialized")]
    NotInitialized,

    #[msg("Not in Running State")]
    ProgramNotRunning,

    #[msg("Bonding Curve Complete")]
    BondingCurveComplete,
    #[msg("Bonding Curve Not Complete")]
    BondingCurveNotComplete,

    #[msg("Insufficient User Tokens")]
    InsufficientUserTokens,
    #[msg("Insufficient Curve Tokens")]
    InsufficientCurveTokens,

    #[msg("Insufficient user SOL")]
    InsufficientUserSOL,

    #[msg("Slippage Exceeded")]
    SlippageExceeded,

    #[msg("Swap exactInAmount is 0")]
    MinSwap,

    #[msg("Buy Failed")]
    BuyFailed,
    #[msg("Sell Failed")]
    SellFailed,

    #[msg("Bonding Curve Invariant Failed")]
    BondingCurveInvariant,

    #[msg("Curve Not Started")]
    CurveNotStarted,

    #[msg("Invalid Allocation Data supplied, basis points must add up to 10000")]
    InvalidAllocation,

    #[msg("Start time is in the past")]
    InvalidStartTime,

    #[msg("SOL Launch threshold not attainable even if all tokens are sold")]
    SOLLaunchThresholdTooHigh,
    #[msg("Cannot compute max_attainable_sol")]
    NoMaxAttainableSOL,

    #[msg("Invalid Creator Authority")]
    InvalidCreatorAuthority,

    #[msg("Cliff not yet reached")]
    CliffNotReached,

    #[msg("Vesting period not yet over")]
    VestingPeriodNotOver,

    #[msg("Not enough fees to withdraw")]
    NoFeesToWithdraw,
}
