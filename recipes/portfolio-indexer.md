# Workflow: Portfolio Indexer

## Goal

Maintain a database of wallet assets and activity.

## Architecture

```text
DAS
 ↓
initial asset snapshot
 ↓
database
 ↑
webhook / stream updates
```

## Steps

1. Backfill initial wallet assets using DAS.
2. Store asset identifiers and raw metadata.
3. Start incremental event processing.
4. Deduplicate by stable event identity.
5. Reconcile asset ownership after important state changes.
6. Periodically perform a consistency sweep.
7. Never treat an event stream as the database itself.

## Acceptance tests

- Restart does not duplicate records.
- Missed events can be reconciled.
- Metadata updates do not corrupt ownership state.
- Compressed and ordinary assets are handled distinctly.
