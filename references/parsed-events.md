# Helius Parsed Events

## Use this reference when

Use Parsed Events for decoded transaction signatures and decoded address history.

## Product status

Parsed Events is the successor to Enhanced Transactions.

Enhanced Transactions is legacy/maintenance mode. Do not start new integrations with Enhanced Transactions unless maintaining an existing application.

## What Parsed Events provides

The current parser uses Helius's IDL catalog and can provide:

- named accounts
- named instruction arguments
- decoded instructions
- inner/CPI instructions
- plain-language summaries
- SOL transfers
- SPL transfers
- Token-2022 transfers
- fee/fee payer data
- decoded custom program errors when metadata exists

Programs outside the catalog can fall back to raw instruction/account data.

## REST

Base:

```text
https://mainnet.helius-rpc.com
```

Transactions:

```text
POST /v1/parsed-events/transactions
```

History:

```text
POST /v1/parsed-events/transaction-history
```

Authentication uses the API key query parameter.

## When to use it

Use Parsed Events for:

- explaining a transaction
- protocol analytics
- decoded wallet history
- historical instruction analysis
- extracting transfer semantics

Do not use it simply to retrieve a raw transaction when standard RPC is sufficient.

## Parsed Events vs Parsed Streams

They share the same decoded model.

Use:

```text
Parsed Events
```

for on-demand REST/GraphQL lookup.

Use:

```text
Parsed Streams
```

for matching decoded transactions pushed over WebSocket.

This allows a useful architecture:

```text
prototype:
Parsed Events

production live pipeline:
Parsed Streams
```

without changing the application's decoded event model.

## Current billing

As of the current Helius docs:

- Parsed Events is generally available on all plans, including Free.
- It is metered at 10 credits/request.
- Credit metering began September 24, 2026.
- Helius notes transition handling for projects that used it before metering began.

Always re-check current billing documentation before making cost assumptions.

## Migration

Do not assume Parsed Events response fields are drop-in compatible with Enhanced Transactions.

If migrating, use the official migration guide and update application logic to the Parsed Events model.
