---
name: helius
description: Production Solana development with Helius. Selects the correct Helius API, loads focused references, and executes repeatable agent workflows for RPC, DAS, Parsed Events/Streams, Webhooks, LaserStream, Sender, Priority Fees, Wallet API, WaaS, ZK Compression, and low-latency data.
---

# Helius Skill v2

## Mission

Build production Solana systems with Helius using the smallest correct abstraction.

This skill is deliberately workflow-oriented. When a task matches a recipe in `recipes/`, load that recipe and follow it. When the task does not match a recipe, use the product chooser and focused references.

## Current product map

| Task | Product |
|---|---|
| Standard RPC | Helius RPC |
| Asset/NFT/cNFT/token inventory | DAS |
| Full transaction history/backfill | `getTransactionsForAddress` |
| Transfer history | `getTransfersByAddress` |
| Decode signatures/history | Parsed Events |
| Real-time decoded transactions | Parsed Streams |
| HTTP event delivery | Webhooks |
| WSS | LaserStream WebSockets |
| Backend gRPC streaming/replay | LaserStream |
| Fast transaction delivery | Sender |
| Priority fee | `getPriorityFeeEstimate` |
| Read-only wallet data | Wallet API |
| Embedded wallet/signing | WaaS |
| Compressed state | ZK Compression |
| Earliest transaction signal | Preconfirmations |
| Pre-execution decoded data | `preprocessedSubscribe` |
| Raw shreds | Shred Delivery |

Current Helius docs state that Parsed Events and Parsed Streams are open beta and available on paid plans. The Parsed Streams endpoint currently documented is `wss://fs-beta.helius-rpc.com/?api-key=...`. Always verify current availability and billing before deployment. citeturn0search0turn0search3

All Helius WebSocket services are powered by LaserStream infrastructure. citeturn0search2

## Agent execution contract

For every task:

1. Classify the task.
2. Select the narrowest Helius product.
3. Load only the relevant reference.
4. Load the matching recipe if one exists.
5. Inspect the repository before editing.
6. Check environment variables without printing secrets.
7. Implement the smallest production-safe change.
8. Validate inputs and external responses.
9. Add retries/idempotency/checkpoints appropriate to the workflow.
10. Run tests/typechecks/lint/build when available.
11. Report exactly what changed, what was verified, and what remains environment-dependent.

Never invent an Helius endpoint, SDK method, request field, response field, plan requirement, or fee.

If uncertain, consult current Helius documentation before coding.

## Security contract

Never:

- print `HELIUS_API_KEY`
- print webhook secrets
- expose private keys or seed phrases
- ask the model to handle raw private keys
- commit `.env` files
- sign value-bearing transactions without an explicit authorization boundary
- treat a webhook as trusted without authentication
- treat transaction submission as confirmation

## Money/transaction contract

For transactions:

```text
build
→ validate
→ simulate where appropriate
→ estimate priority fee
→ sign
→ submit
→ observe
→ confirm
→ reconcile
```

Use integer base units. Never use floating point for SOL/token amounts.

## Real-time contract

Prefer event-driven architecture:

```text
historical backfill
→ checkpoint
→ live stream
→ dedupe
→ database
```

For HTTP push:

```text
authenticate
→ validate
→ dedupe
→ enqueue
→ acknowledge
→ process
```

For streams:

```text
connect
→ subscribe
→ consume
→ checkpoint
→ reconnect
→ replay/reconcile
```

## Product-selection rules

### Asset inventory

Use DAS `getAssetsByOwner`.

### Transfer history

Use `getTransfersByAddress` when only parsed SOL/token transfers are required. Use `getTransactionsForAddress` for full transaction payloads or non-transfer activity. citeturn0search10

### Decoded historical transactions

Use Parsed Events.

### Decoded live transactions

Use Parsed Streams.

Parsed Streams filters are instruction-aware. Use `describeProgram` to discover valid instruction names and account roles instead of guessing them. citeturn0search0

### Raw real-time firehose

Use LaserStream when the application needs client-side control, very high throughput, replay, or low-latency processed transaction data.

### HTTP notifications

Use Webhooks. Helius documents at-least-once delivery/retries, so consumers must be idempotent. citeturn0search1

### Transaction delivery

Use Sender for latency-sensitive submission. Sender is not a signing service.

### Wallet signing

Use WaaS for embedded non-custodial wallets. Wallet API is read-only wallet data.

## Reference loading

Load only what is needed:

- `references/rpc-and-history.md`
- `references/das.md`
- `references/parsed-events.md`
- `references/streaming.md`
- `references/webhooks.md`
- `references/sender-and-fees.md`
- `references/wallets.md`
- `references/zk-compression.md`
- `references/latency-and-preexecution.md`
- `references/security-and-agent-patterns.md`

## Workflow recipes

### Read-only workflows

- `recipes/wallet-analyzer.md`
- `recipes/token-holder-report.md`
- `recipes/transaction-explainer.md`
- `recipes/portfolio-indexer.md`

### Event-driven workflows

- `recipes/webhook-consumer.md`
- `recipes/live-program-monitor.md`
- `recipes/streaming-indexer.md`

### Transaction workflows

- `recipes/transaction-sender.md`
- `recipes/trading-data-pipeline.md`

### Platform workflows

- `recipes/helius-mcp-agent.md`
- `recipes/helius-integration-bootstrap.md`

## Executable helper scripts

Scripts are intentionally small and safe:

- `scripts/check-env.mjs` — verifies required variable names exist without printing values.
- `scripts/helius-rpc.mjs` — generic JSON-RPC caller for local testing.
- `scripts/parse-signature.mjs` — calls Parsed Events for one signature.
- `scripts/get-assets.mjs` — calls DAS `getAssetsByOwner`.
- `scripts/get-transfers.mjs` — calls `getTransfersByAddress`.
- `scripts/priority-fee.mjs` — calls `getPriorityFeeEstimate`.
- `scripts/webhook-signature-test.mjs` — validates webhook receiver logic locally.

Do not use helper scripts as a substitute for proper application architecture.

## Validation checklist

Before declaring a Helius integration complete:

- [ ] Correct product selected.
- [ ] Current endpoint/method verified.
- [ ] API key is server-side.
- [ ] No secrets printed.
- [ ] External responses validated.
- [ ] Pagination implemented where needed.
- [ ] Idempotency implemented for push/stream workflows.
- [ ] Reconnect/replay behavior implemented for long-running streams.
- [ ] Transaction lifecycle tracked separately from submission.
- [ ] Integer base units used for amounts.
- [ ] Devnet/integration tests used where practical.
- [ ] Tests/typecheck/lint/build pass where available.
- [ ] Current Helius pricing/plan constraints checked if relevant.

## Official agent tooling

Helius currently provides an MCP server with 60+ Solana operations and an official Skills offering. The Helius MCP exposes RPC/DAS, Sender, webhooks, WebSockets, staking, ZK Compression, Wallet API, raw Solana RPC, and auth-related namespaces. citeturn0search7turn0search8

This skill complements those tools by giving the agent:

- product selection
- deterministic workflow sequencing
- security boundaries
- architecture patterns
- repository implementation rules
- validation criteria

Do not duplicate MCP capabilities inside application code merely because MCP exposes them.

## Source of truth

Primary documentation:

https://www.helius.dev/docs/llms.txt

Agent documentation:

https://www.helius.dev/agents

When this skill conflicts with current Helius documentation, current official documentation wins.
