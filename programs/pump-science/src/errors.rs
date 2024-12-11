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

    #[msg("Start time is in the past")]
    InvalidStartTime,

    #[msg("Whitelist is already initialized")]
    WlInitializeFailed,

    #[msg("Whitelist is not initialized")]
    WlNotInitializeFailed,

    #[msg("This creator already in whitelist")]
    AddFailed,

    #[msg("This creator is not in whitelist")]
    RemoveFailed,

    #[msg("The WL account is not initialized")]
    WlNotInitialized,

    #[msg("This creator is not in whitelist")]
    NotWhiteList,

    #[msg("Bonding curve is not completed")]
    NotCompleted,

    #[msg("This token is not a bonding curve token")]
    NotBondingCurveMint,

    #[msg("Not quote mint")]
    NotSOL,

    #[msg("Not equel config")]
    InvalidConfig,

    #[msg("Arithmetic Error")]
    ArithmeticError,

    #[msg("Invalid Fee Receiver")]
    InvalidFeeReceiver,

    #[msg("Invalid Migration Authority")]
    InvalidMigrationAuthority,
}
