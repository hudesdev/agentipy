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
          "name": "newMigrationAuthority",
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
      "name": "createPool",
      "accounts": [
        {
          "name": "global",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bondingCurve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "migrationVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lpMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "aVaultLp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bVaultLp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenBMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "aVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "aTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "aVaultLpMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bVaultLpMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payerTokenA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payerTokenB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payerPoolLp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "protocolTokenAFee",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "protocolTokenBFee",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mintMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bondingCurveTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vaultProgram",
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
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "meteoraProgram",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "lockPool",
      "accounts": [
        {
          "name": "global",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lpMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "aVaultLp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bVaultLp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenBMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "aVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "aVaultLpMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bVaultLpMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payerPoolLp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
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
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lockEscrow",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK lock escrow"
          ]
        },
        {
          "name": "escrowVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "meteoraProgram",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "addWl",
      "accounts": [
        {
          "name": "global",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whitelist",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newCreator",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "removeWl",
      "accounts": [
        {
          "name": "global",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whitelist",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
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
          "name": "whitelist",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
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
          "name": "feeReceiver",
          "isMut": true,
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
            "name": "initialVirtualTokenReserves",
            "type": "u64"
          },
          {
            "name": "virtualSolReserves",
            "type": "u64"
          },
          {
            "name": "virtualTokenReserves",
            "type": "u64"
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
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "complete",
            "type": "bool"
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
            "name": "migrationAuthority",
            "type": "publicKey"
          },
          {
            "name": "migrateFeeAmount",
            "type": "u64"
          },
          {
            "name": "feeReceiver",
            "type": "publicKey"
          },
          {
            "name": "initialVirtualTokenReserves",
            "type": "u64"
          },
          {
            "name": "initialVirtualSolReserves",
            "type": "u64"
          },
          {
            "name": "initialRealTokenReserves",
            "type": "u64"
          },
          {
            "name": "tokenTotalSupply",
            "type": "u64"
          },
          {
            "name": "mintDecimals",
            "type": "u8"
          },
          {
            "name": "meteoraConfig",
            "type": "publicKey"
          },
          {
            "name": "whitelistEnabled",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "whitelist",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "publicKey"
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
            "name": "migrationAuthority",
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
            "name": "initialVirtualTokenReserves",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "initialVirtualSolReserves",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "initialRealTokenReserves",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "tokenTotalSupply",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "mintDecimals",
            "type": {
              "option": "u8"
            }
          },
          {
            "name": "migrateFeeAmount",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "feeReceiver",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "status",
            "type": {
              "option": {
                "defined": "ProgramStatus"
              }
            }
          },
          {
            "name": "whitelistEnabled",
            "type": {
              "option": "bool"
            }
          },
          {
            "name": "meteoraConfig",
            "type": {
              "option": "publicKey"
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
          "name": "migrationAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "status",
          "type": {
            "defined": "ProgramStatus"
          },
          "index": false
        },
        {
          "name": "initialVirtualTokenReserves",
          "type": "u64",
          "index": false
        },
        {
          "name": "initialVirtualSolReserves",
          "type": "u64",
          "index": false
        },
        {
          "name": "initialRealTokenReserves",
          "type": "u64",
          "index": false
        },
        {
          "name": "tokenTotalSupply",
          "type": "u64",
          "index": false
        },
        {
          "name": "mintDecimals",
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
          "type": "u64",
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
          "name": "withdrawTime",
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
          "type": "u64",
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
          "type": "u64",
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
      "name": "InsufficientUserSOL",
      "msg": "Insufficient user SOL"
    },
    {
      "code": 6010,
      "name": "SlippageExceeded",
      "msg": "Slippage Exceeded"
    },
    {
      "code": 6011,
      "name": "MinSwap",
      "msg": "Swap exactInAmount is 0"
    },
    {
      "code": 6012,
      "name": "BuyFailed",
      "msg": "Buy Failed"
    },
    {
      "code": 6013,
      "name": "SellFailed",
      "msg": "Sell Failed"
    },
    {
      "code": 6014,
      "name": "BondingCurveInvariant",
      "msg": "Bonding Curve Invariant Failed"
    },
    {
      "code": 6015,
      "name": "CurveNotStarted",
      "msg": "Curve Not Started"
    },
    {
      "code": 6016,
      "name": "InvalidStartTime",
      "msg": "Start time is in the past"
    },
    {
      "code": 6017,
      "name": "WlInitializeFailed",
      "msg": "Whitelist is already initialized"
    },
    {
      "code": 6018,
      "name": "WlNotInitializeFailed",
      "msg": "Whitelist is not initialized"
    },
    {
      "code": 6019,
      "name": "AddFailed",
      "msg": "This creator already in whitelist"
    },
    {
      "code": 6020,
      "name": "RemoveFailed",
      "msg": "This creator is not in whitelist"
    },
    {
      "code": 6021,
      "name": "WlNotInitialized",
      "msg": "The WL account is not initialized"
    },
    {
      "code": 6022,
      "name": "NotWhiteList",
      "msg": "This creator is not in whitelist"
    },
    {
      "code": 6023,
      "name": "NotCompleted",
      "msg": "Bonding curve is not completed"
    },
    {
      "code": 6024,
      "name": "NotBondingCurveMint",
      "msg": "This token is not a bonding curve token"
    },
    {
      "code": 6025,
      "name": "NotSOL",
      "msg": "Not quote mint"
    },
    {
      "code": 6026,
      "name": "InvalidConfig",
      "msg": "Not equel config"
    },
    {
      "code": 6027,
      "name": "ArithmeticError",
      "msg": "Arithmetic Error"
    },
    {
      "code": 6028,
      "name": "InvalidFeeReceiver",
      "msg": "Invalid Fee Receiver"
    },
    {
      "code": 6029,
      "name": "InvalidMigrationAuthority",
      "msg": "Invalid Migration Authority"
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
          "name": "newMigrationAuthority",
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
      "name": "createPool",
      "accounts": [
        {
          "name": "global",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bondingCurve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "migrationVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lpMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "aVaultLp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bVaultLp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenBMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "aVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "aTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "aVaultLpMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bVaultLpMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payerTokenA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payerTokenB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payerPoolLp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "protocolTokenAFee",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "protocolTokenBFee",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mintMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bondingCurveTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vaultProgram",
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
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "meteoraProgram",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "lockPool",
      "accounts": [
        {
          "name": "global",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lpMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "aVaultLp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bVaultLp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenBMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "aVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "aVaultLpMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bVaultLpMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payerPoolLp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
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
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lockEscrow",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK lock escrow"
          ]
        },
        {
          "name": "escrowVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "meteoraProgram",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "addWl",
      "accounts": [
        {
          "name": "global",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whitelist",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newCreator",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "removeWl",
      "accounts": [
        {
          "name": "global",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whitelist",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
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
          "name": "whitelist",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
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
          "name": "feeReceiver",
          "isMut": true,
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
            "name": "initialVirtualTokenReserves",
            "type": "u64"
          },
          {
            "name": "virtualSolReserves",
            "type": "u64"
          },
          {
            "name": "virtualTokenReserves",
            "type": "u64"
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
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "complete",
            "type": "bool"
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
            "name": "migrationAuthority",
            "type": "publicKey"
          },
          {
            "name": "migrateFeeAmount",
            "type": "u64"
          },
          {
            "name": "feeReceiver",
            "type": "publicKey"
          },
          {
            "name": "initialVirtualTokenReserves",
            "type": "u64"
          },
          {
            "name": "initialVirtualSolReserves",
            "type": "u64"
          },
          {
            "name": "initialRealTokenReserves",
            "type": "u64"
          },
          {
            "name": "tokenTotalSupply",
            "type": "u64"
          },
          {
            "name": "mintDecimals",
            "type": "u8"
          },
          {
            "name": "meteoraConfig",
            "type": "publicKey"
          },
          {
            "name": "whitelistEnabled",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "whitelist",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "publicKey"
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
            "name": "migrationAuthority",
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
            "name": "initialVirtualTokenReserves",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "initialVirtualSolReserves",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "initialRealTokenReserves",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "tokenTotalSupply",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "mintDecimals",
            "type": {
              "option": "u8"
            }
          },
          {
            "name": "migrateFeeAmount",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "feeReceiver",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "status",
            "type": {
              "option": {
                "defined": "ProgramStatus"
              }
            }
          },
          {
            "name": "whitelistEnabled",
            "type": {
              "option": "bool"
            }
          },
          {
            "name": "meteoraConfig",
            "type": {
              "option": "publicKey"
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
          "name": "migrationAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "status",
          "type": {
            "defined": "ProgramStatus"
          },
          "index": false
        },
        {
          "name": "initialVirtualTokenReserves",
          "type": "u64",
          "index": false
        },
        {
          "name": "initialVirtualSolReserves",
          "type": "u64",
          "index": false
        },
        {
          "name": "initialRealTokenReserves",
          "type": "u64",
          "index": false
        },
        {
          "name": "tokenTotalSupply",
          "type": "u64",
          "index": false
        },
        {
          "name": "mintDecimals",
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
          "type": "u64",
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
          "name": "withdrawTime",
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
          "type": "u64",
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
          "type": "u64",
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
      "name": "InsufficientUserSOL",
      "msg": "Insufficient user SOL"
    },
    {
      "code": 6010,
      "name": "SlippageExceeded",
      "msg": "Slippage Exceeded"
    },
    {
      "code": 6011,
      "name": "MinSwap",
      "msg": "Swap exactInAmount is 0"
    },
    {
      "code": 6012,
      "name": "BuyFailed",
      "msg": "Buy Failed"
    },
    {
      "code": 6013,
      "name": "SellFailed",
      "msg": "Sell Failed"
    },
    {
      "code": 6014,
      "name": "BondingCurveInvariant",
      "msg": "Bonding Curve Invariant Failed"
    },
    {
      "code": 6015,
      "name": "CurveNotStarted",
      "msg": "Curve Not Started"
    },
    {
      "code": 6016,
      "name": "InvalidStartTime",
      "msg": "Start time is in the past"
    },
    {
      "code": 6017,
      "name": "WlInitializeFailed",
      "msg": "Whitelist is already initialized"
    },
    {
      "code": 6018,
      "name": "WlNotInitializeFailed",
      "msg": "Whitelist is not initialized"
    },
    {
      "code": 6019,
      "name": "AddFailed",
      "msg": "This creator already in whitelist"
    },
    {
      "code": 6020,
      "name": "RemoveFailed",
      "msg": "This creator is not in whitelist"
    },
    {
      "code": 6021,
      "name": "WlNotInitialized",
      "msg": "The WL account is not initialized"
    },
    {
      "code": 6022,
      "name": "NotWhiteList",
      "msg": "This creator is not in whitelist"
    },
    {
      "code": 6023,
      "name": "NotCompleted",
      "msg": "Bonding curve is not completed"
    },
    {
      "code": 6024,
      "name": "NotBondingCurveMint",
      "msg": "This token is not a bonding curve token"
    },
    {
      "code": 6025,
      "name": "NotSOL",
      "msg": "Not quote mint"
    },
    {
      "code": 6026,
      "name": "InvalidConfig",
      "msg": "Not equel config"
    },
    {
      "code": 6027,
      "name": "ArithmeticError",
      "msg": "Arithmetic Error"
    },
    {
      "code": 6028,
      "name": "InvalidFeeReceiver",
      "msg": "Invalid Fee Receiver"
    },
    {
      "code": 6029,
      "name": "InvalidMigrationAuthority",
      "msg": "Invalid Migration Authority"
    }
  ]
};
