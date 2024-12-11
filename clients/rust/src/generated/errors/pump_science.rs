//! This code was AUTOGENERATED using the kinobi library.
//! Please DO NOT EDIT THIS FILE, instead use visitors
//! to add features, then rerun kinobi to update it.
//!
//! [https://github.com/metaplex-foundation/kinobi]
//!

use num_derive::FromPrimitive;
use thiserror::Error;

#[derive(Clone, Debug, Eq, Error, FromPrimitive, PartialEq)]
pub enum PumpScienceError {
    /// 6000 (0x1770) - Invalid Global Authority
    #[error("Invalid Global Authority")]
    InvalidGlobalAuthority,
    /// 6001 (0x1771) - Invalid Withdraw Authority
    #[error("Invalid Withdraw Authority")]
    InvalidWithdrawAuthority,
    /// 6002 (0x1772) - Invalid Argument
    #[error("Invalid Argument")]
    InvalidArgument,
    /// 6003 (0x1773) - Global Already Initialized
    #[error("Global Already Initialized")]
    AlreadyInitialized,
    /// 6004 (0x1774) - Global Not Initialized
    #[error("Global Not Initialized")]
    NotInitialized,
    /// 6005 (0x1775) - Not in Running State
    #[error("Not in Running State")]
    ProgramNotRunning,
    /// 6006 (0x1776) - Bonding Curve Complete
    #[error("Bonding Curve Complete")]
    BondingCurveComplete,
    /// 6007 (0x1777) - Bonding Curve Not Complete
    #[error("Bonding Curve Not Complete")]
    BondingCurveNotComplete,
    /// 6008 (0x1778) - Insufficient User Tokens
    #[error("Insufficient User Tokens")]
    InsufficientUserTokens,
    /// 6009 (0x1779) - Insufficient user SOL
    #[error("Insufficient user SOL")]
    InsufficientUserSOL,
    /// 6010 (0x177A) - Slippage Exceeded
    #[error("Slippage Exceeded")]
    SlippageExceeded,
    /// 6011 (0x177B) - Swap exactInAmount is 0
    #[error("Swap exactInAmount is 0")]
    MinSwap,
    /// 6012 (0x177C) - Buy Failed
    #[error("Buy Failed")]
    BuyFailed,
    /// 6013 (0x177D) - Sell Failed
    #[error("Sell Failed")]
    SellFailed,
    /// 6014 (0x177E) - Bonding Curve Invariant Failed
    #[error("Bonding Curve Invariant Failed")]
    BondingCurveInvariant,
    /// 6015 (0x177F) - Curve Not Started
    #[error("Curve Not Started")]
    CurveNotStarted,
    /// 6016 (0x1780) - Start time is in the past
    #[error("Start time is in the past")]
    InvalidStartTime,
    /// 6017 (0x1781) - Whitelist is already initialized
    #[error("Whitelist is already initialized")]
    WlInitializeFailed,
    /// 6018 (0x1782) - Whitelist is not initialized
    #[error("Whitelist is not initialized")]
    WlNotInitializeFailed,
    /// 6019 (0x1783) - This creator already in whitelist
    #[error("This creator already in whitelist")]
    AddFailed,
    /// 6020 (0x1784) - This creator is not in whitelist
    #[error("This creator is not in whitelist")]
    RemoveFailed,
    /// 6021 (0x1785) - The WL account is not initialized
    #[error("The WL account is not initialized")]
    WlNotInitialized,
    /// 6022 (0x1786) - This creator is not in whitelist
    #[error("This creator is not in whitelist")]
    NotWhiteList,
    /// 6023 (0x1787) - Bonding curve is not completed
    #[error("Bonding curve is not completed")]
    NotCompleted,
    /// 6024 (0x1788) - This token is not a bonding curve token
    #[error("This token is not a bonding curve token")]
    NotBondingCurveMint,
    /// 6025 (0x1789) - Not quote mint
    #[error("Not quote mint")]
    NotSOL,
    /// 6026 (0x178A) - Not equel config
    #[error("Not equel config")]
    InvalidConfig,
    /// 6027 (0x178B) - Arithmetic Error
    #[error("Arithmetic Error")]
    ArithmeticError,
    /// 6028 (0x178C) - Invalid Fee Receiver
    #[error("Invalid Fee Receiver")]
    InvalidFeeReceiver,
}

impl solana_program::program_error::PrintProgramError for PumpScienceError {
    fn print<E>(&self) {
        solana_program::msg!(&self.to_string());
    }
}
