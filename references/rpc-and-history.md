# Helius RPC and Historical Data

## Use this reference when

Use this file for standard RPC, address history, transfer history, account queries, transaction versions, pagination, and indexing.

## Main endpoints

Mainnet:

```text
https://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY
```

Devnet:

```text
https://devnet.helius-rpc.com/?api-key=YOUR_API_KEY
```

Gatekeeper mainnet:

```text
https://beta.helius-rpc.com/?api-key=YOUR_API_KEY
```

## Standard RPC

Use standard Solana JSON-RPC for low-level operations such as:

- getAccountInfo
- getBalance
- getBlock
- getLatestBlockhash
- getMultipleAccounts
- getProgramAccounts
- getSignatureStatuses
- getSlot
- getTokenAccountBalance
- getTokenAccountsByOwner
- sendTransaction
- simulateTransaction

Use a higher-level Helius API when it already provides the required indexed representation.

## getTransactionsForAddress

Prefer `getTransactionsForAddress` for filtered, paginated transaction history and backfill.

Important:

- It can provide full transaction details when requested.
- Token-account activity can be filtered with `filters.tokenAccounts`.
- `balanceChanged` is useful for balance-changing ATA activity.
- Do not fetch every signature and then fetch every transaction unless there is a specific reason.

Use pagination and persist checkpoints for large jobs.

## getTransfersByAddress

Use when only SOL/token transfer records are needed.

Do not use full transaction-history retrieval when transfer-level data is sufficient.

## Wallet API vs RPC history

Wallet API is wallet-centric REST data.

`getTransactionsForAddress` is better suited to filtered transaction backfill and lower-level historical indexing.

## Token accounts

Raw token-account RPC is appropriate when raw account state is actually required.

For portfolio inventory and metadata, prefer DAS.

## Transaction versions

Solana supports versioned transactions. When fetching transactions, configure `maxSupportedTransactionVersion` appropriately for the client.

Current Helius documentation also documents transaction v1 support. Do not assume every client/library version understands every transaction version.

## Pagination pattern

```ts
let cursor: string | undefined;

do {
  const page = await fetchPage(cursor);
  await persist(page.items);
  cursor = page.cursor;
} while (cursor);
```

Never treat one page as a complete wallet history.

## Indexing pattern

```text
historical API
    ↓
backfill
    ↓
database
    ↑
live stream
```

Deduplicate the overlap between backfill and live streaming.

## Common mistakes

- Using `getSignaturesForAddress` for large indexed backfills.
- Treating a single response as complete history.
- Using raw token accounts for NFT inventory.
- Forgetting transaction version support.
- Re-running backfills without a checkpoint.
- Assuming compressed assets can be queried like ordinary accounts.
