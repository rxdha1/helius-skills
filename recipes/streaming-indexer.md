# Workflow: LaserStream Indexer

## Goal

Build a durable backend indexer using LaserStream.

## Architecture

```text
historical backfill
       ↓
database ← checkpoint
       ↑
LaserStream
       ↑
live stream
```

## Steps

1. Define exact entities to index.
2. Backfill the required historical range.
3. Persist the backfill checkpoint.
4. Start LaserStream from the overlap boundary.
5. Deduplicate overlapping events.
6. Persist each event transactionally with its checkpoint.
7. Monitor consumer lag.
8. Reconnect on stream failure.
9. Use replay to recover missed data.
10. Run periodic reconciliation.

## Backfill

Use `getTransactionsForAddress` for address/program transaction history where appropriate.

Do not fetch the entire Solana firehose if the application needs only a subset.

## Acceptance tests

- Process restart resumes from checkpoint.
- Duplicate events are harmless.
- Disconnect/replay closes gaps.
- Backfill/live overlap does not duplicate data.
- Database state can be rebuilt from raw events.
