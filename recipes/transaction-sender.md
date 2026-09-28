# Workflow: Transaction Sender

## Goal

Submit a signed Solana transaction through Helius with explicit lifecycle handling.

## Steps

1. Validate source/destination/asset/amount.
2. Build transaction.
3. Obtain a fresh blockhash.
4. Simulate when appropriate.
5. Call `getPriorityFeeEstimate`.
6. Apply the application's fee policy.
7. Obtain explicit user authorization if user funds are involved.
8. Sign outside the LLM.
9. Submit through Sender when latency-sensitive.
10. Persist signature.
11. Observe transaction status.
12. Confirm at the required commitment.
13. Reconcile final state.

## Rules

- Never put private keys in prompts.
- Never ask the LLM to generate a seed phrase.
- Never use floating-point token amounts.
- Never call submission success finality.
- Rebuild on expired blockhash instead of blindly retrying an old signed transaction.

## Acceptance tests

- Amount is exact in base units.
- Simulation errors are surfaced.
- Signature is persisted.
- Confirmation timeout is handled.
- Final state is reconciled.
