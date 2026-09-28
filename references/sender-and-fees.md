# Helius Sender and Priority Fees

## Use this reference when

Use it for transaction submission, Sender, priority-fee estimation, MEV-aware routing, and transaction landing.

## Transaction lifecycle

```text
build
 → simulate
 → estimate fee
 → sign
 → submit
 → observe
 → confirm
 → reconcile
```

Submission does not mean confirmation.

## Sender

Sender accepts the same `sendTransaction` request shape as standard RPC but is designed for lower-latency transaction delivery.

Current Sender products include:

### Sender Max

Routes across multiple transaction-delivery pathways.

The current Helius docs describe:

- Helius
- Jito
- Harmonic
- Rakurai
- and other pathways

Sender Max also supports transactions and bundles.

### Sender SWQOS-only

Routes through the cost-optimized SWQOS path.

Tip requirements differ between Sender products. Do not hard-code values from memory; check the current Sender docs.

## Priority Fee API

Use:

```text
getPriorityFeeEstimate
```

for Helius priority-fee estimation.

Do not automatically replace it with:

```text
getRecentPrioritizationFees
```

plus an arbitrary heuristic.

Priority fees should reflect the transaction and desired landing behavior.

## MEV Protect

MEV Protect is opt-in routing using:

```text
mev-protect=true
```

It can be used with supported send methods.

Do not describe it as a guarantee against all MEV or all sandwich/front-running behavior.

## Signing

Sender does not mean Helius should possess the user's private key.

Keep:

```text
build
sign
send
```

as separate security boundaries.

The LLM should never receive a seed phrase or private key.

## Transaction amount safety

Use integers:

```ts
const lamports = 1000000n;
```

Do not use JavaScript floating-point arithmetic for token amounts.

## Failed transactions

A send response is not enough.

Track the signature and observe the resulting transaction status.

Handle:

- expired blockhash
- simulation failure
- account changes
- dropped transactions
- insufficient funds
- compute-budget errors
- program errors
