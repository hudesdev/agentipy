import { PumpScience } from "../target/types/pump_science";

export const IDL: PumpScience = {
    "address": "4HFA7dU4Gh9szc3ZF9HTtD6V43TdhsaFtasxzSUWRrAS",
    "metadata": {
        "name": "pumpScience",
        "version": "0.1.0",
        "spec": "0.1.0",
        "description": "Created with Anchor"
    },
    "instructions": [
        {
        "name": "createBondingCurve",
        "discriminator": [
            94,
            139,
            158,
            50,
            69,
            95,
            8,
            45
        ],
        "accounts": [
            {
            "name": "mint",
            "writable": true,
            "signer": true
            },
            {
            "name": "creator",
            "writable": true,
            "signer": true
            },
            {
            "name": "bondingCurve",
            "writable": true,
            "pda": {
                "seeds": [
                {
                    "kind": "const",
                    "value": [
                    98,
                    111,
                    110,
                    100,
                    105,
                    110,
                    103,
                    45,
                    99,
                    117,
                    114,
                    118,
                    101
                    ]
                },
                {
                    "kind": "account",
                    "path": "mint"
                }
                ]
            }
            },
            {
            "name": "bondingCurveTokenAccount",
            "writable": true,
            "pda": {
                "seeds": [
                {
                    "kind": "account",
                    "path": "bondingCurve"
                },
                {
                    "kind": "const",
                    "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                    ]
                },
                {
                    "kind": "account",
                    "path": "mint"
                }
                ],
                "program": {
                "kind": "const",
                "value": [
                    140,
                    151,
                    37,
                    143,
                    78,
                    36,
                    137,
                    241,
                    187,
                    61,
                    16,
                    41,
                    20,
                    142,
                    13,
                    131,
                    11,
                    90,
                    19,
                    153,
                    218,
                    255,
                    16,
                    132,
                    4,
                    142,
                    123,
                    216,
                    219,
                    233,
                    248,
                    89
                ]
                }
            }
            },
            {
            "name": "global",
            "pda": {
                "seeds": [
                {
                    "kind": "const",
                    "value": [
                    103,
                    108,
                    111,
                    98,
                    97,
                    108
                    ]
                }
                ]
            }
            },
            {
            "name": "metadata",
            "writable": true,
            "pda": {
                "seeds": [
                {
                    "kind": "const",
                    "value": [
                    109,
                    101,
                    116,
                    97,
                    100,
                    97,
                    116,
                    97
                    ]
                },
                {
                    "kind": "account",
                    "path": "tokenMetadataProgram"
                },
                {
                    "kind": "account",
                    "path": "mint"
                }
                ],
                "program": {
                "kind": "account",
                "path": "tokenMetadataProgram"
                }
            }
            },
            {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
            },
            {
            "name": "tokenProgram",
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
            },
            {
            "name": "associatedTokenProgram",
            "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
            },
            {
            "name": "tokenMetadataProgram",
            "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
            },
            {
            "name": "rent",
            "address": "SysvarRent111111111111111111111111111111111"
            },
            {
            "name": "clock",
            "address": "SysvarC1ock11111111111111111111111111111111"
            },
            {
            "name": "eventAuthority",
            "pda": {
                "seeds": [
                {
                    "kind": "const",
                    "value": [
                    95,
                    95,
                    101,
                    118,
                    101,
                    110,
                    116,
                    95,
                    97,
                    117,
                    116,
                    104,
                    111,
                    114,
                    105,
                    116,
                    121
                    ]
                }
                ]
            }
            },
            {
            "name": "program"
            }
        ],
        "args": [
            {
            "name": "params",
            "type": {
                "defined": {
                "name": "createBondingCurveParams"
                }
            }
            }
        ]
        },
        {
        "name": "createPool",
        "discriminator": [
            233,
            146,
            209,
            142,
            207,
            104,
            64,
            188
        ],
        "accounts": [
            {
            "name": "vault",
            "pda": {
                "seeds": [
                {
                    "kind": "const",
                    "value": [
                    118,
                    97,
                    117,
                    108,
                    116,
                    45,
                    97,
                    117,
                    116,
                    104,
                    111,
                    114,
                    105,
                    116,
                    121
                    ]
                }
                ]
            }
            },
            {
            "name": "pool",
            "writable": true
            },
            {
            "name": "config",
            "writable": true
            },
            {
            "name": "lpMint",
            "writable": true
            },
            {
            "name": "tokenAMint",
            "writable": true
            },
            {
            "name": "tokenBMint",
            "writable": true
            },
            {
            "name": "aVault",
            "writable": true
            },
            {
            "name": "bVault",
            "writable": true
            },
            {
            "name": "aTokenVault",
            "writable": true
            },
            {
            "name": "bTokenVault",
            "writable": true
            },
            {
            "name": "aVaultLpMint",
            "writable": true
            },
            {
            "name": "bVaultLpMint",
            "writable": true
            },
            {
            "name": "payerTokenA",
            "writable": true
            },
            {
            "name": "payerTokenB",
            "writable": true
            },
            {
            "name": "payerPoolLp",
            "writable": true
            },
            {
            "name": "protocolTokenAFee",
            "writable": true
            },
            {
            "name": "protocolTokenBFee",
            "writable": true
            },
            {
            "name": "payer",
            "writable": true,
            "signer": true
            },
            {
            "name": "rent"
            },
            {
            "name": "metadataProgram"
            },
            {
            "name": "vaultProgram"
            },
            {
            "name": "tokenProgram"
            },
            {
            "name": "associatedTokenProgram"
            },
            {
            "name": "systemProgram"
            }
        ],
        "args": [
            {
            "name": "tokenAAmount",
            "type": "u64"
            },
            {
            "name": "tokenBAmount",
            "type": "u64"
            }
        ]
        },
        {
        "name": "initialize",
        "discriminator": [
            175,
            175,
            109,
            31,
            13,
            152,
            155,
            237
        ],
        "accounts": [
            {
            "name": "authority",
            "writable": true,
            "signer": true
            },
            {
            "name": "global",
            "writable": true,
            "pda": {
                "seeds": [
                {
                    "kind": "const",
                    "value": [
                    103,
                    108,
                    111,
                    98,
                    97,
                    108
                    ]
                }
                ]
            }
            },
            {
            "name": "feeVault",
            "writable": true,
            "pda": {
                "seeds": [
                {
                    "kind": "const",
                    "value": [
                    102,
                    101,
                    101,
                    45,
                    118,
                    97,
                    117,
                    108,
                    116
                    ]
                }
                ]
            }
            },
            {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
            },
            {
            "name": "eventAuthority",
            "pda": {
                "seeds": [
                {
                    "kind": "const",
                    "value": [
                    95,
                    95,
                    101,
                    118,
                    101,
                    110,
                    116,
                    95,
                    97,
                    117,
                    116,
                    104,
                    111,
                    114,
                    105,
                    116,
                    121
                    ]
                }
                ]
            }
            },
            {
            "name": "program"
            }
        ],
        "args": [
            {
            "name": "params",
            "type": {
                "defined": {
                "name": "globalSettingsInput"
                }
            }
            }
        ]
        },
        {
        "name": "setParams",
        "discriminator": [
            27,
            234,
            178,
            52,
            147,
            2,
            187,
            141
        ],
        "accounts": [
            {
            "name": "authority",
            "writable": true,
            "signer": true
            },
            {
            "name": "global",
            "writable": true,
            "pda": {
                "seeds": [
                {
                    "kind": "const",
                    "value": [
                    103,
                    108,
                    111,
                    98,
                    97,
                    108
                    ]
                }
                ]
            }
            },
            {
            "name": "feeVault",
            "writable": true,
            "pda": {
                "seeds": [
                {
                    "kind": "const",
                    "value": [
                    102,
                    101,
                    101,
                    45,
                    118,
                    97,
                    117,
                    108,
                    116
                    ]
                }
                ]
            }
            },
            {
            "name": "newAuthority",
            "optional": true
            },
            {
            "name": "newMigrationAuthority",
            "optional": true
            },
            {
            "name": "newWithdrawAuthority",
            "optional": true
            },
            {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
            },
            {
            "name": "eventAuthority",
            "pda": {
                "seeds": [
                {
                    "kind": "const",
                    "value": [
                    95,
                    95,
                    101,
                    118,
                    101,
                    110,
                    116,
                    95,
                    97,
                    117,
                    116,
                    104,
                    111,
                    114,
                    105,
                    116,
                    121
                    ]
                }
                ]
            }
            },
            {
            "name": "program"
            }
        ],
        "args": [
            {
            "name": "params",
            "type": {
                "defined": {
                "name": "globalSettingsInput"
                }
            }
            }
        ]
        },
        {
        "name": "swap",
        "discriminator": [
            248,
            198,
            158,
            145,
            225,
            117,
            135,
            200
        ],
        "accounts": [
            {
            "name": "user",
            "writable": true,
            "signer": true
            },
            {
            "name": "global",
            "pda": {
                "seeds": [
                {
                    "kind": "const",
                    "value": [
                    103,
                    108,
                    111,
                    98,
                    97,
                    108
                    ]
                }
                ]
            }
            },
            {
            "name": "mint"
            },
            {
            "name": "bondingCurve",
            "writable": true,
            "pda": {
                "seeds": [
                {
                    "kind": "const",
                    "value": [
                    98,
                    111,
                    110,
                    100,
                    105,
                    110,
                    103,
                    45,
                    99,
                    117,
                    114,
                    118,
                    101
                    ]
                },
                {
                    "kind": "account",
                    "path": "mint"
                }
                ]
            }
            },
            {
            "name": "bondingCurveTokenAccount",
            "writable": true,
            "pda": {
                "seeds": [
                {
                    "kind": "account",
                    "path": "bondingCurve"
                },
                {
                    "kind": "const",
                    "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                    ]
                },
                {
                    "kind": "account",
                    "path": "mint"
                }
                ],
                "program": {
                "kind": "const",
                "value": [
                    140,
                    151,
                    37,
                    143,
                    78,
                    36,
                    137,
                    241,
                    187,
                    61,
                    16,
                    41,
                    20,
                    142,
                    13,
                    131,
                    11,
                    90,
                    19,
                    153,
                    218,
                    255,
                    16,
                    132,
                    4,
                    142,
                    123,
                    216,
                    219,
                    233,
                    248,
                    89
                ]
                }
            }
            },
            {
            "name": "feeVault",
            "writable": true,
            "pda": {
                "seeds": [
                {
                    "kind": "const",
                    "value": [
                    102,
                    101,
                    101,
                    45,
                    118,
                    97,
                    117,
                    108,
                    116
                    ]
                },
                {
                    "kind": "account",
                    "path": "mint"
                }
                ]
            }
            },
            {
            "name": "userTokenAccount",
            "writable": true,
            "pda": {
                "seeds": [
                {
                    "kind": "account",
                    "path": "user"
                },
                {
                    "kind": "const",
                    "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                    ]
                },
                {
                    "kind": "account",
                    "path": "mint"
                }
                ],
                "program": {
                "kind": "const",
                "value": [
                    140,
                    151,
                    37,
                    143,
                    78,
                    36,
                    137,
                    241,
                    187,
                    61,
                    16,
                    41,
                    20,
                    142,
                    13,
                    131,
                    11,
                    90,
                    19,
                    153,
                    218,
                    255,
                    16,
                    132,
                    4,
                    142,
                    123,
                    216,
                    219,
                    233,
                    248,
                    89
                ]
                }
            }
            },
            {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
            },
            {
            "name": "tokenProgram",
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
            },
            {
            "name": "associatedTokenProgram",
            "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
            },
            {
            "name": "clock",
            "address": "SysvarC1ock11111111111111111111111111111111"
            },
            {
            "name": "eventAuthority",
            "pda": {
                "seeds": [
                {
                    "kind": "const",
                    "value": [
                    95,
                    95,
                    101,
                    118,
                    101,
                    110,
                    116,
                    95,
                    97,
                    117,
                    116,
                    104,
                    111,
                    114,
                    105,
                    116,
                    121
                    ]
                }
                ]
            }
            },
            {
            "name": "program"
            }
        ],
        "args": [
            {
            "name": "params",
            "type": {
                "defined": {
                "name": "swapParams"
                }
            }
            }
        ]
        },
        {
        "name": "withdrawFees",
        "discriminator": [
            198,
            212,
            171,
            109,
            144,
            215,
            174,
            89
        ],
        "accounts": [
            {
            "name": "authority",
            "writable": true,
            "signer": true
            },
            {
            "name": "global",
            "pda": {
                "seeds": [
                {
                    "kind": "const",
                    "value": [
                    103,
                    108,
                    111,
                    98,
                    97,
                    108
                    ]
                }
                ]
            }
            },
            {
            "name": "feeVault",
            "pda": {
                "seeds": [
                {
                    "kind": "const",
                    "value": [
                    102,
                    101,
                    101,
                    45,
                    118,
                    97,
                    117,
                    108,
                    116
                    ]
                }
                ]
            }
            },
            {
            "name": "mint"
            },
            {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
            },
            {
            "name": "tokenProgram",
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
            },
            {
            "name": "clock",
            "address": "SysvarC1ock11111111111111111111111111111111"
            },
            {
            "name": "eventAuthority",
            "pda": {
                "seeds": [
                {
                    "kind": "const",
                    "value": [
                    95,
                    95,
                    101,
                    118,
                    101,
                    110,
                    116,
                    95,
                    97,
                    117,
                    116,
                    104,
                    111,
                    114,
                    105,
                    116,
                    121
                    ]
                }
                ]
            }
            },
            {
            "name": "program"
            }
        ],
        "args": []
        }
    ],
    "accounts": [
        {
        "name": "bondingCurve",
        "discriminator": [
            23,
            183,
            248,
            55,
            96,
            216,
            172,
            96
        ]
        },
        {
        "name": "feeVault",
        "discriminator": [
            192,
            178,
            69,
            232,
            58,
            149,
            157,
            132
        ]
        },
        {
        "name": "global",
        "discriminator": [
            167,
            232,
            232,
            177,
            200,
            108,
            114,
            127
        ]
        }
    ],
    "events": [
        {
        "name": "completeEvent",
        "discriminator": [
            95,
            114,
            97,
            156,
            212,
            46,
            152,
            8
        ]
        },
        {
        "name": "createEvent",
        "discriminator": [
            27,
            114,
            169,
            77,
            222,
            235,
            99,
            118
        ]
        },
        {
        "name": "globalUpdateEvent",
        "discriminator": [
            153,
            69,
            19,
            7,
            115,
            232,
            248,
            248
        ]
        },
        {
        "name": "tradeEvent",
        "discriminator": [
            189,
            219,
            127,
            211,
            78,
            230,
            97,
            238
        ]
        },
        {
        "name": "withdrawEvent",
        "discriminator": [
            22,
            9,
            133,
            26,
            160,
            44,
            71,
            192
        ]
        }
    ],
    "errors": [
        {
        "code": 6000,
        "name": "invalidGlobalAuthority",
        "msg": "Invalid Global Authority"
        },
        {
        "code": 6001,
        "name": "invalidWithdrawAuthority",
        "msg": "Invalid Withdraw Authority"
        },
        {
        "code": 6002,
        "name": "invalidArgument",
        "msg": "Invalid Argument"
        },
        {
        "code": 6003,
        "name": "alreadyInitialized",
        "msg": "Global Already Initialized"
        },
        {
        "code": 6004,
        "name": "notInitialized",
        "msg": "Global Not Initialized"
        },
        {
        "code": 6005,
        "name": "programNotRunning",
        "msg": "Not in Running State"
        },
        {
        "code": 6006,
        "name": "bondingCurveComplete",
        "msg": "Bonding Curve Complete"
        },
        {
        "code": 6007,
        "name": "bondingCurveNotComplete",
        "msg": "Bonding Curve Not Complete"
        },
        {
        "code": 6008,
        "name": "insufficientUserTokens",
        "msg": "Insufficient User Tokens"
        },
        {
        "code": 6009,
        "name": "insufficientCurveTokens",
        "msg": "Insufficient Curve Tokens"
        },
        {
        "code": 6010,
        "name": "insufficientUserSol",
        "msg": "Insufficient user SOL"
        },
        {
        "code": 6011,
        "name": "slippageExceeded",
        "msg": "Slippage Exceeded"
        },
        {
        "code": 6012,
        "name": "minSwap",
        "msg": "Swap exactInAmount is 0"
        },
        {
        "code": 6013,
        "name": "buyFailed",
        "msg": "Buy Failed"
        },
        {
        "code": 6014,
        "name": "sellFailed",
        "msg": "Sell Failed"
        },
        {
        "code": 6015,
        "name": "bondingCurveInvariant",
        "msg": "Bonding Curve Invariant Failed"
        },
        {
        "code": 6016,
        "name": "curveNotStarted",
        "msg": "Curve Not Started"
        },
        {
        "code": 6017,
        "name": "invalidAllocation",
        "msg": "Invalid Allocation Data supplied, basis points must add up to 10000"
        },
        {
        "code": 6018,
        "name": "invalidStartTime",
        "msg": "Start time is in the past"
        },
        {
        "code": 6019,
        "name": "solLaunchThresholdTooHigh",
        "msg": "SOL Launch threshold not attainable even if all tokens are sold"
        },
        {
        "code": 6020,
        "name": "noMaxAttainableSol",
        "msg": "Cannot compute max_attainable_sol"
        },
        {
        "code": 6021,
        "name": "invalidCreatorAuthority",
        "msg": "Invalid Creator Authority"
        },
        {
        "code": 6022,
        "name": "cliffNotReached",
        "msg": "Cliff not yet reached"
        },
        {
        "code": 6023,
        "name": "vestingPeriodNotOver",
        "msg": "Vesting period not yet over"
        },
        {
        "code": 6024,
        "name": "noFeesToWithdraw",
        "msg": "Not enough fees to withdraw"
        }
    ],
    "types": [
        {
        "name": "bondingCurve",
        "type": {
            "kind": "struct",
            "fields": [
            {
                "name": "mint",
                "type": "pubkey"
            },
            {
                "name": "creator",
                "type": "pubkey"
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
        "name": "completeEvent",
        "type": {
            "kind": "struct",
            "fields": [
            {
                "name": "user",
                "type": "pubkey"
            },
            {
                "name": "mint",
                "type": "pubkey"
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
                "name": "timestamp",
                "type": "i64"
            }
            ]
        }
        },
        {
        "name": "createBondingCurveParams",
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
        "name": "createEvent",
        "type": {
            "kind": "struct",
            "fields": [
            {
                "name": "mint",
                "type": "pubkey"
            },
            {
                "name": "creator",
                "type": "pubkey"
            },
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
                "type": "i64"
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
            }
            ]
        }
        },
        {
        "name": "feeRecipient",
        "type": {
            "kind": "struct",
            "fields": [
            {
                "name": "owner",
                "type": "pubkey"
            },
            {
                "name": "shareBps",
                "type": "u16"
            },
            {
                "name": "totalClaimed",
                "type": "u64"
            }
            ]
        }
        },
        {
        "name": "feeVault",
        "type": {
            "kind": "struct",
            "fields": [
            {
                "name": "totalFeesClaimed",
                "type": "u64"
            },
            {
                "name": "feeRecipients",
                "type": {
                "vec": {
                    "defined": {
                    "name": "feeRecipient"
                    }
                }
                }
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
                "defined": {
                    "name": "programStatus"
                }
                }
            },
            {
                "name": "initialized",
                "type": "bool"
            },
            {
                "name": "globalAuthority",
                "type": "pubkey"
            },
            {
                "name": "migrationAuthority",
                "type": "pubkey"
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
                "name": "feeBps",
                "type": "u64"
            },
            {
                "name": "mintDecimals",
                "type": "u8"
            }
            ]
        }
        },
        {
        "name": "globalSettingsInput",
        "type": {
            "kind": "struct",
            "fields": [
            {
                "name": "feeRecipient",
                "type": {
                "option": "pubkey"
                }
            },
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
                "name": "feeBps",
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
                "name": "feeRecipients",
                "type": {
                "option": {
                    "vec": {
                    "defined": {
                        "name": "feeRecipient"
                    }
                    }
                }
                }
            },
            {
                "name": "status",
                "type": {
                "option": {
                    "defined": {
                    "name": "programStatus"
                    }
                }
                }
            }
            ]
        }
        },
        {
        "name": "globalUpdateEvent",
        "type": {
            "kind": "struct",
            "fields": [
            {
                "name": "globalAuthority",
                "type": "pubkey"
            },
            {
                "name": "migrationAuthority",
                "type": "pubkey"
            },
            {
                "name": "status",
                "type": {
                "defined": {
                    "name": "programStatus"
                }
                }
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
                "name": "feeBps",
                "type": "u64"
            },
            {
                "name": "mintDecimals",
                "type": "u8"
            }
            ]
        }
        },
        {
        "name": "programStatus",
        "type": {
            "kind": "enum",
            "variants": [
            {
                "name": "running"
            },
            {
                "name": "swapOnly"
            },
            {
                "name": "swapOnlyNoLaunch"
            },
            {
                "name": "paused"
            }
            ]
        }
        },
        {
        "name": "swapParams",
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
        "name": "tradeEvent",
        "type": {
            "kind": "struct",
            "fields": [
            {
                "name": "mint",
                "type": "pubkey"
            },
            {
                "name": "solAmount",
                "type": "u64"
            },
            {
                "name": "tokenAmount",
                "type": "u64"
            },
            {
                "name": "feeLamports",
                "type": "u64"
            },
            {
                "name": "isBuy",
                "type": "bool"
            },
            {
                "name": "user",
                "type": "pubkey"
            },
            {
                "name": "timestamp",
                "type": "i64"
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
            }
            ]
        }
        },
        {
        "name": "withdrawEvent",
        "type": {
            "kind": "struct",
            "fields": [
            {
                "name": "withdrawAuthority",
                "type": "pubkey"
            },
            {
                "name": "mint",
                "type": "pubkey"
            },
            {
                "name": "feeVault",
                "type": "pubkey"
            },
            {
                "name": "withdrawn",
                "type": "u64"
            },
            {
                "name": "totalWithdrawn",
                "type": "u64"
            },
            {
                "name": "withdrawTime",
                "type": "i64"
            }
            ]
        }
        }
    ]
};