# Pump Science Bonding Curve Protocol

A Solana protocol implementing an advanced bonding curve mechanism for fundraising and sustainable project funding. This protocol enables compound submitters to launch their own token ($DRUG) with dynamic fee structures and automated liquidity management.

## Core Features

### Bonding Curve Mechanism

The protocol implements a constant product bonding curve (x * y = k) with the following initial parameters:

- Initial Virtual Token Reserves: 1,073,000,000,000,000
- Initial Virtual SOL Reserves: 30,000,000,000
- Initial Real Token Reserves: 793,100,000,000,000
- Total Token Supply: 1,000,000,000,000,000

The bonding curve ensures price discovery and continuous liquidity for the token.

### Dynamic Fee Structure

Fees are calculated using a piecewise linear function based on user participation slots:

1. Early Phase (t < 150):
   - Fixed 99% fee
2. Transition Phase (150 ≤ t ≤ 250):
   - Linear decrease: F(t) = -0.0083 * t + 2.1626
3. Mature Phase (t > 250):
   - Fixed 1% fee

All fees are directed to the protocol's multisig wallet: `3bM4hewuZFZgNXvLWwaktXMa8YHgxsnnhaRfzxJV944P`

### Automated Liquidity Management

When the bonding curve accumulates 85 SOL:
1. X SOL is sent to the protocol multisig
2. Remaining SOL is used to seed a Meteora constant product liquidity pool
3. LP tokens are locked with claim authority assigned to the protocol multisig

## Administrative Roles

### Curve Creator
- Can initialize new bonding curves
- Sets initial parameters and optional whitelist
- Configures launch timing and initial purchases

### Admin
- Can modify protocol parameters
- Manages fee settings
- Controls whitelist status

### Fee Recipients
- Protocol Multisig (`3bM4hewuZFZgNXvLWwaktXMa8YHgxsnnhaRfzxJV944P`)
  - Receives trading fees
  - Has authority over locked LP tokens
  - Receives swapped USDC from liquidity migrations

## Creating a Bonding Curve

To create a new bonding curve:

1. Initialize curve parameters
2. Optional: Enable whitelist
3. Set launch timing
4. Configure initial purchases
