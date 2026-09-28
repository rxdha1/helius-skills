# Workflow: Wallet Analyzer

## Goal

Build a read-only wallet analysis endpoint or CLI.

## Select

- DAS for assets.
- `getTransfersByAddress` for parsed transfer history.
- `getTransactionsForAddress` for full transaction history.
- Parsed Events when decoded instruction semantics are needed.

## Steps

1. Validate the Solana public key.
2. Fetch DAS `getAssetsByOwner`.
3. Fetch transfer history if requested.
4. Fetch transaction history only when full transaction activity is required.
5. Normalize raw provider responses into an internal model.
6. Cache stable metadata.
7. Never expose the Helius API key.
8. Return read-only results.

## Output model

```ts
type WalletReport = {
  address: string;
  assets: Asset[];
  transfers?: Transfer[];
  transactions?: TransactionSummary[];
};
```

## Acceptance tests

- Invalid address returns 400.
- Empty wallet returns a valid empty result.
- Pagination works.
- Provider failures become controlled application errors.
- API key never appears in response/logs.
