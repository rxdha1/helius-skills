# Workflow: Transaction Explainer

## Goal

Turn a Solana signature into a human-readable explanation.

## Steps

1. Validate signature format.
2. Call Parsed Events.
3. Inspect transaction summary.
4. Inspect decoded instructions.
5. Include SOL/SPL/Token-2022 transfers.
6. Include fee and fee payer.
7. Include decoded errors when available.
8. Fall back to raw instruction/account data for unsupported programs.
9. Clearly distinguish observed facts from inferred explanations.

## Important

Do not invent protocol names, token symbols, or instruction meanings.

If the parser falls back to raw data, say so.

## Acceptance tests

- Known swap decodes.
- Failed transaction is represented as failed.
- Unknown program does not cause fabricated semantics.
- Fees and transfers are preserved.
