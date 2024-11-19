export type PumpScience = {
  "version": "0.1.0",
  "name": "pump_science",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "global",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "GlobalSettingsInput"
          }
        }
      ]
    },
    {
      "name": "setParams",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "global",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newAuthority",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "newWithdrawAuthority",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "GlobalSettingsInput"
          }
        }
      ]
    },
    {
      "name": "createBondingCurve",
      "accounts": [
        {
          "name": "mint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "creatorVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creatorVaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleVaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "brandAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "brandVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "brandVaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "platformVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "platformVaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bondingCurve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bondingCurveTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "global",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "CreateBondingCurveParams"
          }
        }
      ]
    },
    {
      "name": "swap",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "global",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bondingCurve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bondingCurveTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "platformVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SwapParams"
          }
        }
      ]
    },
    {
      "name": "claimCreatorVesting",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "creatorVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creatorVaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bondingCurve",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "global",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "withdrawFees",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "global",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "platformVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "bondingCurve",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "platformAuthority",
            "type": "publicKey"
          },
          {
            "name": "brandAuthority",
            "type": "publicKey"
          },
          {
            "name": "virtualTokenMultiplierBps",
            "type": "u64"
          },
          {
            "name": "virtualSolReserves",
            "type": "u64"
          },
          {
            "name": "virtualTokenReserves",
            "type": "u128"
          },
          {
            "name": "initialVirtualTokenReserves",
            "type": "u128"
          },
          {
            "name": "realSolReserves",
            "type": "u64"
          },
          {
            "name": "realTokenReserves",
            "type": "u64"
          },
          {
            "name": "tokenTotalSupply",
            "type": "u64"
          },
          {
            "name": "creatorVestedSupply",
            "type": "u64"
          },
          {
            "name": "presaleSupply",
            "type": "u64"
          },
          {
            "name": "bondingSupply",
            "type": "u64"
          },
          {
            "name": "cexSupply",
            "type": "u64"
          },
          {
            "name": "launchBrandkitSupply",
            "type": "u64"
          },
          {
            "name": "lifetimeBrandkitSupply",
            "type": "u64"
          },
          {
            "name": "platformSupply",
            "type": "u64"
          },
          {
            "name": "solLaunchThreshold",
            "type": "u64"
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "complete",
            "type": "bool"
          },
          {
            "name": "vestingTerms",
            "type": {
              "defined": "VestingTerms"
            }
          },
          {
            "name": "allocation",
            "type": {
              "defined": "AllocationData"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "global",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "status",
            "type": {
              "defined": "ProgramStatus"
            }
          },
          {
            "name": "initialized",
            "type": "bool"
          },
          {
            "name": "globalAuthority",
            "type": "publicKey"
          },
          {
            "name": "withdrawAuthority",
            "type": "publicKey"
          },
          {
            "name": "tradeFeeBps",
            "type": "u64"
          },
          {
            "name": "launchFeeLamports",
            "type": "u64"
          },
          {
            "name": "createdMintDecimals",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "creatorVault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "initialVestedSupply",
            "type": "u64"
          },
          {
            "name": "lastDistribution",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "presaleVault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "initialVestedSupply",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "platformVault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "initialVestedSupply",
            "type": "u64"
          },
          {
            "name": "lastDistribution",
            "type": "i64"
          },
          {
            "name": "lastFeeWithdrawal",
            "type": "i64"
          },
          {
            "name": "feesWithdrawn",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "brandVault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "launchBrandkitSupply",
            "type": "u64"
          },
          {
            "name": "lifetimeBrandkitSupply",
            "type": "u64"
          },
          {
            "name": "initialVestedSupply",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "SwapParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "baseIn",
            "type": "bool"
          },
          {
            "name": "exactInAmount",
            "type": "u64"
          },
          {
            "name": "minOutAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "AllocationDataParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "cex",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "launchBrandkit",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "lifetimeBrandkit",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "platform",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "presale",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "poolReserve",
            "type": {
              "option": "u64"
            }
          }
        ]
      }
    },
    {
      "name": "AllocationData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "u64"
          },
          {
            "name": "cex",
            "type": "u64"
          },
          {
            "name": "launchBrandkit",
            "type": "u64"
          },
          {
            "name": "lifetimeBrandkit",
            "type": "u64"
          },
          {
            "name": "platform",
            "type": "u64"
          },
          {
            "name": "presale",
            "type": "u64"
          },
          {
            "name": "poolReserve",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "VestingTerms",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "cliff",
            "type": "i64"
          },
          {
            "name": "duration",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "CreateBondingCurveParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "startTime",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "tokenTotalSupply",
            "type": "u64"
          },
          {
            "name": "solLaunchThreshold",
            "type": "u64"
          },
          {
            "name": "virtualTokenMultiplierBps",
            "type": "u64"
          },
          {
            "name": "virtualSolReserves",
            "type": "u64"
          },
          {
            "name": "allocation",
            "type": {
              "defined": "AllocationDataParams"
            }
          },
          {
            "name": "vestingTerms",
            "type": {
              "option": {
                "defined": "VestingTerms"
              }
            }
          }
        ]
      }
    },
    {
      "name": "GlobalAuthorityInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "globalAuthority",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "withdrawAuthority",
            "type": {
              "option": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "GlobalSettingsInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tradeFeeBps",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "createdMintDecimals",
            "type": {
              "option": "u8"
            }
          },
          {
            "name": "launchFeeLamports",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "status",
            "type": {
              "option": {
                "defined": "ProgramStatus"
              }
            }
          }
        ]
      }
    },
    {
      "name": "ProgramStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Running"
          },
          {
            "name": "SwapOnly"
          },
          {
            "name": "SwapOnlyNoLaunch"
          },
          {
            "name": "Paused"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "GlobalUpdateEvent",
      "fields": [
        {
          "name": "globalAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "withdrawAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "tradeFeeBps",
          "type": "u64",
          "index": false
        },
        {
          "name": "launchFeeLamports",
          "type": "u64",
          "index": false
        },
        {
          "name": "createdMintDecimals",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "CreateEvent",
      "fields": [
        {
          "name": "mint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "creator",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "name",
          "type": "string",
          "index": false
        },
        {
          "name": "symbol",
          "type": "string",
          "index": false
        },
        {
          "name": "uri",
          "type": "string",
          "index": false
        },
        {
          "name": "startTime",
          "type": "i64",
          "index": false
        },
        {
          "name": "virtualSolReserves",
          "type": "u64",
          "index": false
        },
        {
          "name": "virtualTokenReserves",
          "type": "u128",
          "index": false
        },
        {
          "name": "realSolReserves",
          "type": "u64",
          "index": false
        },
        {
          "name": "realTokenReserves",
          "type": "u64",
          "index": false
        },
        {
          "name": "tokenTotalSupply",
          "type": "u64",
          "index": false
        },
        {
          "name": "solLaunchThreshold",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "WithdrawEvent",
      "fields": [
        {
          "name": "withdrawAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "mint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "feeVault",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "withdrawn",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalWithdrawn",
          "type": "u64",
          "index": false
        },
        {
          "name": "previousWithdrawTime",
          "type": "i64",
          "index": false
        },
        {
          "name": "newWithdrawTime",
          "type": "i64",
          "index": false
        }
      ]
    },
    {
      "name": "TradeEvent",
      "fields": [
        {
          "name": "mint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "solAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "tokenAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "feeLamports",
          "type": "u64",
          "index": false
        },
        {
          "name": "isBuy",
          "type": "bool",
          "index": false
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "timestamp",
          "type": "i64",
          "index": false
        },
        {
          "name": "virtualSolReserves",
          "type": "u64",
          "index": false
        },
        {
          "name": "virtualTokenReserves",
          "type": "u128",
          "index": false
        },
        {
          "name": "realSolReserves",
          "type": "u64",
          "index": false
        },
        {
          "name": "realTokenReserves",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "CompleteEvent",
      "fields": [
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "mint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "virtualSolReserves",
          "type": "u64",
          "index": false
        },
        {
          "name": "virtualTokenReserves",
          "type": "u128",
          "index": false
        },
        {
          "name": "realSolReserves",
          "type": "u64",
          "index": false
        },
        {
          "name": "realTokenReserves",
          "type": "u64",
          "index": false
        },
        {
          "name": "timestamp",
          "type": "i64",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidGlobalAuthority",
      "msg": "Invalid Global Authority"
    },
    {
      "code": 6001,
      "name": "InvalidWithdrawAuthority",
      "msg": "Invalid Withdraw Authority"
    },
    {
      "code": 6002,
      "name": "InvalidArgument",
      "msg": "Invalid Argument"
    },
    {
      "code": 6003,
      "name": "AlreadyInitialized",
      "msg": "Global Already Initialized"
    },
    {
      "code": 6004,
      "name": "NotInitialized",
      "msg": "Global Not Initialized"
    },
    {
      "code": 6005,
      "name": "ProgramNotRunning",
      "msg": "Not in Running State"
    },
    {
      "code": 6006,
      "name": "BondingCurveComplete",
      "msg": "Bonding Curve Complete"
    },
    {
      "code": 6007,
      "name": "BondingCurveNotComplete",
      "msg": "Bonding Curve Not Complete"
    },
    {
      "code": 6008,
      "name": "InsufficientUserTokens",
      "msg": "Insufficient User Tokens"
    },
    {
      "code": 6009,
      "name": "InsufficientCurveTokens",
      "msg": "Insufficient Curve Tokens"
    },
    {
      "code": 6010,
      "name": "InsufficientUserSOL",
      "msg": "Insufficient user SOL"
    },
    {
      "code": 6011,
      "name": "SlippageExceeded",
      "msg": "Slippage Exceeded"
    },
    {
      "code": 6012,
      "name": "MinSwap",
      "msg": "Swap exactInAmount is 0"
    },
    {
      "code": 6013,
      "name": "BuyFailed",
      "msg": "Buy Failed"
    },
    {
      "code": 6014,
      "name": "SellFailed",
      "msg": "Sell Failed"
    },
    {
      "code": 6015,
      "name": "BondingCurveInvariant",
      "msg": "Bonding Curve Invariant Failed"
    },
    {
      "code": 6016,
      "name": "CurveNotStarted",
      "msg": "Curve Not Started"
    },
    {
      "code": 6017,
      "name": "InvalidAllocation",
      "msg": "Invalid Allocation Data supplied, basis points must add up to 10000"
    },
    {
      "code": 6018,
      "name": "InvalidStartTime",
      "msg": "Start time is in the past"
    },
    {
      "code": 6019,
      "name": "SOLLaunchThresholdTooHigh",
      "msg": "SOL Launch threshold not attainable even if all tokens are sold"
    },
    {
      "code": 6020,
      "name": "NoMaxAttainableSOL",
      "msg": "Cannot compute max_attainable_sol"
    },
    {
      "code": 6021,
      "name": "InvalidCreatorAuthority",
      "msg": "Invalid Creator Authority"
    },
    {
      "code": 6022,
      "name": "CliffNotReached",
      "msg": "Cliff not yet reached"
    },
    {
      "code": 6023,
      "name": "VestingPeriodNotOver",
      "msg": "Vesting period not yet over"
    },
    {
      "code": 6024,
      "name": "NoFeesToWithdraw",
      "msg": "Not enough fees to withdraw"
    }
  ]
};

export const IDL: PumpScience = {
  "version": "0.1.0",
  "name": "pump_science",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "global",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "GlobalSettingsInput"
          }
        }
      ]
    },
    {
      "name": "setParams",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "global",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newAuthority",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "newWithdrawAuthority",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "GlobalSettingsInput"
          }
        }
      ]
    },
    {
      "name": "createBondingCurve",
      "accounts": [
        {
          "name": "mint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "creatorVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creatorVaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleVaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "brandAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "brandVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "brandVaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "platformVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "platformVaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bondingCurve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bondingCurveTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "global",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "CreateBondingCurveParams"
          }
        }
      ]
    },
    {
      "name": "swap",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "global",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bondingCurve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bondingCurveTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "platformVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SwapParams"
          }
        }
      ]
    },
    {
      "name": "claimCreatorVesting",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "creatorVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creatorVaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bondingCurve",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "global",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "withdrawFees",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "global",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "platformVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "bondingCurve",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "platformAuthority",
            "type": "publicKey"
          },
          {
            "name": "brandAuthority",
            "type": "publicKey"
          },
          {
            "name": "virtualTokenMultiplierBps",
            "type": "u64"
          },
          {
            "name": "virtualSolReserves",
            "type": "u64"
          },
          {
            "name": "virtualTokenReserves",
            "type": "u128"
          },
          {
            "name": "initialVirtualTokenReserves",
            "type": "u128"
          },
          {
            "name": "realSolReserves",
            "type": "u64"
          },
          {
            "name": "realTokenReserves",
            "type": "u64"
          },
          {
            "name": "tokenTotalSupply",
            "type": "u64"
          },
          {
            "name": "creatorVestedSupply",
            "type": "u64"
          },
          {
            "name": "presaleSupply",
            "type": "u64"
          },
          {
            "name": "bondingSupply",
            "type": "u64"
          },
          {
            "name": "cexSupply",
            "type": "u64"
          },
          {
            "name": "launchBrandkitSupply",
            "type": "u64"
          },
          {
            "name": "lifetimeBrandkitSupply",
            "type": "u64"
          },
          {
            "name": "platformSupply",
            "type": "u64"
          },
          {
            "name": "solLaunchThreshold",
            "type": "u64"
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "complete",
            "type": "bool"
          },
          {
            "name": "vestingTerms",
            "type": {
              "defined": "VestingTerms"
            }
          },
          {
            "name": "allocation",
            "type": {
              "defined": "AllocationData"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "global",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "status",
            "type": {
              "defined": "ProgramStatus"
            }
          },
          {
            "name": "initialized",
            "type": "bool"
          },
          {
            "name": "globalAuthority",
            "type": "publicKey"
          },
          {
            "name": "withdrawAuthority",
            "type": "publicKey"
          },
          {
            "name": "tradeFeeBps",
            "type": "u64"
          },
          {
            "name": "launchFeeLamports",
            "type": "u64"
          },
          {
            "name": "createdMintDecimals",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "creatorVault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "initialVestedSupply",
            "type": "u64"
          },
          {
            "name": "lastDistribution",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "presaleVault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "initialVestedSupply",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "platformVault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "initialVestedSupply",
            "type": "u64"
          },
          {
            "name": "lastDistribution",
            "type": "i64"
          },
          {
            "name": "lastFeeWithdrawal",
            "type": "i64"
          },
          {
            "name": "feesWithdrawn",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "brandVault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "launchBrandkitSupply",
            "type": "u64"
          },
          {
            "name": "lifetimeBrandkitSupply",
            "type": "u64"
          },
          {
            "name": "initialVestedSupply",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "SwapParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "baseIn",
            "type": "bool"
          },
          {
            "name": "exactInAmount",
            "type": "u64"
          },
          {
            "name": "minOutAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "AllocationDataParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "cex",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "launchBrandkit",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "lifetimeBrandkit",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "platform",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "presale",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "poolReserve",
            "type": {
              "option": "u64"
            }
          }
        ]
      }
    },
    {
      "name": "AllocationData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "u64"
          },
          {
            "name": "cex",
            "type": "u64"
          },
          {
            "name": "launchBrandkit",
            "type": "u64"
          },
          {
            "name": "lifetimeBrandkit",
            "type": "u64"
          },
          {
            "name": "platform",
            "type": "u64"
          },
          {
            "name": "presale",
            "type": "u64"
          },
          {
            "name": "poolReserve",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "VestingTerms",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "cliff",
            "type": "i64"
          },
          {
            "name": "duration",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "CreateBondingCurveParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "startTime",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "tokenTotalSupply",
            "type": "u64"
          },
          {
            "name": "solLaunchThreshold",
            "type": "u64"
          },
          {
            "name": "virtualTokenMultiplierBps",
            "type": "u64"
          },
          {
            "name": "virtualSolReserves",
            "type": "u64"
          },
          {
            "name": "allocation",
            "type": {
              "defined": "AllocationDataParams"
            }
          },
          {
            "name": "vestingTerms",
            "type": {
              "option": {
                "defined": "VestingTerms"
              }
            }
          }
        ]
      }
    },
    {
      "name": "GlobalAuthorityInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "globalAuthority",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "withdrawAuthority",
            "type": {
              "option": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "GlobalSettingsInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tradeFeeBps",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "createdMintDecimals",
            "type": {
              "option": "u8"
            }
          },
          {
            "name": "launchFeeLamports",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "status",
            "type": {
              "option": {
                "defined": "ProgramStatus"
              }
            }
          }
        ]
      }
    },
    {
      "name": "ProgramStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Running"
          },
          {
            "name": "SwapOnly"
          },
          {
            "name": "SwapOnlyNoLaunch"
          },
          {
            "name": "Paused"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "GlobalUpdateEvent",
      "fields": [
        {
          "name": "globalAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "withdrawAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "tradeFeeBps",
          "type": "u64",
          "index": false
        },
        {
          "name": "launchFeeLamports",
          "type": "u64",
          "index": false
        },
        {
          "name": "createdMintDecimals",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "CreateEvent",
      "fields": [
        {
          "name": "mint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "creator",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "name",
          "type": "string",
          "index": false
        },
        {
          "name": "symbol",
          "type": "string",
          "index": false
        },
        {
          "name": "uri",
          "type": "string",
          "index": false
        },
        {
          "name": "startTime",
          "type": "i64",
          "index": false
        },
        {
          "name": "virtualSolReserves",
          "type": "u64",
          "index": false
        },
        {
          "name": "virtualTokenReserves",
          "type": "u128",
          "index": false
        },
        {
          "name": "realSolReserves",
          "type": "u64",
          "index": false
        },
        {
          "name": "realTokenReserves",
          "type": "u64",
          "index": false
        },
        {
          "name": "tokenTotalSupply",
          "type": "u64",
          "index": false
        },
        {
          "name": "solLaunchThreshold",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "WithdrawEvent",
      "fields": [
        {
          "name": "withdrawAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "mint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "feeVault",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "withdrawn",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalWithdrawn",
          "type": "u64",
          "index": false
        },
        {
          "name": "previousWithdrawTime",
          "type": "i64",
          "index": false
        },
        {
          "name": "newWithdrawTime",
          "type": "i64",
          "index": false
        }
      ]
    },
    {
      "name": "TradeEvent",
      "fields": [
        {
          "name": "mint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "solAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "tokenAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "feeLamports",
          "type": "u64",
          "index": false
        },
        {
          "name": "isBuy",
          "type": "bool",
          "index": false
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "timestamp",
          "type": "i64",
          "index": false
        },
        {
          "name": "virtualSolReserves",
          "type": "u64",
          "index": false
        },
        {
          "name": "virtualTokenReserves",
          "type": "u128",
          "index": false
        },
        {
          "name": "realSolReserves",
          "type": "u64",
          "index": false
        },
        {
          "name": "realTokenReserves",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "CompleteEvent",
      "fields": [
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "mint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "virtualSolReserves",
          "type": "u64",
          "index": false
        },
        {
          "name": "virtualTokenReserves",
          "type": "u128",
          "index": false
        },
        {
          "name": "realSolReserves",
          "type": "u64",
          "index": false
        },
        {
          "name": "realTokenReserves",
          "type": "u64",
          "index": false
        },
        {
          "name": "timestamp",
          "type": "i64",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidGlobalAuthority",
      "msg": "Invalid Global Authority"
    },
    {
      "code": 6001,
      "name": "InvalidWithdrawAuthority",
      "msg": "Invalid Withdraw Authority"
    },
    {
      "code": 6002,
      "name": "InvalidArgument",
      "msg": "Invalid Argument"
    },
    {
      "code": 6003,
      "name": "AlreadyInitialized",
      "msg": "Global Already Initialized"
    },
    {
      "code": 6004,
      "name": "NotInitialized",
      "msg": "Global Not Initialized"
    },
    {
      "code": 6005,
      "name": "ProgramNotRunning",
      "msg": "Not in Running State"
    },
    {
      "code": 6006,
      "name": "BondingCurveComplete",
      "msg": "Bonding Curve Complete"
    },
    {
      "code": 6007,
      "name": "BondingCurveNotComplete",
      "msg": "Bonding Curve Not Complete"
    },
    {
      "code": 6008,
      "name": "InsufficientUserTokens",
      "msg": "Insufficient User Tokens"
    },
    {
      "code": 6009,
      "name": "InsufficientCurveTokens",
      "msg": "Insufficient Curve Tokens"
    },
    {
      "code": 6010,
      "name": "InsufficientUserSOL",
      "msg": "Insufficient user SOL"
    },
    {
      "code": 6011,
      "name": "SlippageExceeded",
      "msg": "Slippage Exceeded"
    },
    {
      "code": 6012,
      "name": "MinSwap",
      "msg": "Swap exactInAmount is 0"
    },
    {
      "code": 6013,
      "name": "BuyFailed",
      "msg": "Buy Failed"
    },
    {
      "code": 6014,
      "name": "SellFailed",
      "msg": "Sell Failed"
    },
    {
      "code": 6015,
      "name": "BondingCurveInvariant",
      "msg": "Bonding Curve Invariant Failed"
    },
    {
      "code": 6016,
      "name": "CurveNotStarted",
      "msg": "Curve Not Started"
    },
    {
      "code": 6017,
      "name": "InvalidAllocation",
      "msg": "Invalid Allocation Data supplied, basis points must add up to 10000"
    },
    {
      "code": 6018,
      "name": "InvalidStartTime",
      "msg": "Start time is in the past"
    },
    {
      "code": 6019,
      "name": "SOLLaunchThresholdTooHigh",
      "msg": "SOL Launch threshold not attainable even if all tokens are sold"
    },
    {
      "code": 6020,
      "name": "NoMaxAttainableSOL",
      "msg": "Cannot compute max_attainable_sol"
    },
    {
      "code": 6021,
      "name": "InvalidCreatorAuthority",
      "msg": "Invalid Creator Authority"
    },
    {
      "code": 6022,
      "name": "CliffNotReached",
      "msg": "Cliff not yet reached"
    },
    {
      "code": 6023,
      "name": "VestingPeriodNotOver",
      "msg": "Vesting period not yet over"
    },
    {
      "code": 6024,
      "name": "NoFeesToWithdraw",
      "msg": "Not enough fees to withdraw"
    }
  ]
};
