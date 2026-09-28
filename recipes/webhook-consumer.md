# Workflow: Production Helius Webhook Consumer

## Goal

Build a secure, idempotent Helius webhook receiver.

## Architecture

```text
Helius
 ↓
POST /api/webhooks/helius
 ↓
auth
 ↓
schema validation
 ↓
dedupe
 ↓
queue
 ↓
2xx
 ↓
worker
 ↓
database
```

## Steps

1. Create/configure the webhook with an auth secret.
2. Verify `Authorization` exactly.
3. Parse the event array.
4. Validate event schema.
5. Derive an idempotency key.
6. Insert/dedupe atomically.
7. Enqueue processing.
8. Return 2xx quickly.
9. Process business logic asynchronously.
10. Record failures for retry/dead-letter handling.

## Security

Never log the authorization secret or API key.

## Acceptance tests

- Missing auth → 401.
- Wrong auth → 401.
- Duplicate delivery → one business effect.
- Malformed payload → controlled 4xx.
- Worker failure does not cause data loss.
