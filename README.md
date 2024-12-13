# Pump fun smart contract fork

A solana token launch smart contract forking pump.fun & integrating meteora migration.

## Core Features

### Bonding Curve Price Logic

The protocol implements a constant product linear bonding curve (x * y = k) and ensures price discovery and continuous liquidity for the token.
When the bonding curve accumulates 85 SOL total remaining token migrated to meteora.

### Dynamic Fee Structure

Fees are calculated using a piecewise linear function based on user participation slots:
All fees are directed to the protocol's multisig wallet

## Administrative Roles

Two authoities:
- Global authority
- Migration authority

### Whitelist Future
- Can set whitelist check allocation config on global settings.
- Add whitelist creating pda per user in WL & delete pda account when need remove ( Global authority check ). 

### Admin
- Can modify protocol parameters
- Manages fee settings
- Controls whitelist status

### Transaction

- Creating Global PDA. https://solscan.io/tx/5YmZqVgFcKk11uUVTBZvtMCnbbfthM4QpYHvvWdRNqXhmeyFmE85H5XeQF9pAX6M8DApqn1PeyCH9mYhdCsEkvce?cluster=devnet
- Added WL. Create WL PDA. https://solscan.io/tx/3R4fXk3VYXUAAFEXhVoR52g8ZPnjeZcuEhkCPSiBKJQGbjgDW9dBNE7REsz3KwYPV582HzUZ9Qv7SwgnDxgoTXHU?cluster=devnet
- Create Bonding Curve. https://solscan.io/tx/22cFFDRgLnBpce97FhSE9srHcopkmDG3WpiwbgpwAj6VReu8cLMaZv3vnEvXMBr48XrCLGQ2xAzdUKBxKdfHFx2i?cluster=devnet
- Migrate meteora. https://solscan.io/tx/5F1R9WBYgDXyATWjyyrCJKL2wudjK4WNom6KL4H2LQjcabfLR3agoaifiQWwMEWpmR47bKozJSn1esLCWmyMaRHe?cluster=devnet
