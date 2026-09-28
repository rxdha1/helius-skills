# Helius Skill v2 Workflow Index

## Read-only

| Workflow | Primary Helius capability |
|---|---|
| Wallet Analyzer | DAS + transfers/history |
| Token Holder Report | DAS/token indexed data |
| Transaction Explainer | Parsed Events |
| Portfolio Indexer | DAS + events/streams |

## Real-time

| Workflow | Primary capability |
|---|---|
| Webhook Consumer | Webhooks |
| Live Program Monitor | Parsed Streams |
| Streaming Indexer | LaserStream |

## Transactions

| Workflow | Primary capability |
|---|---|
| Transaction Sender | Sender + Priority Fees |
| Trading Data Pipeline | LaserStream / pre-execution stack |

## Agent platform

| Workflow | Primary capability |
|---|---|
| Helius MCP Agent | Helius MCP |
| Integration Bootstrap | Helius SDK/RPC |

## Workflow selection rule

If a user's request maps to one of these workflows, load the corresponding recipe before coding.

If multiple workflows apply, compose them in this order:

```text
bootstrap
→ read/index
→ real-time
→ transaction
→ reconciliation
```

Do not execute value-bearing transaction workflows as a side effect of a read-only workflow.
