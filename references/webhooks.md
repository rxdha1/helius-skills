# Helius Webhooks

## Use this reference when

Use Helius Webhooks for HTTP POST callbacks triggered by on-chain activity.

## Good use cases

- wallet alerts
- payment notifications
- NFT sales/listings
- token transfers
- staking events
- backend automation

## Receiver pattern

```text
HTTP POST
  ↓
authenticate
  ↓
validate
  ↓
deduplicate
  ↓
enqueue
  ↓
return 2xx
```

Do not perform long-running business logic before acknowledging the webhook.

## Authentication

Configure an authorization secret when creating the webhook.

Verify:

```http
Authorization: <configured-secret>
```

before accepting the payload.

Never trust a webhook solely because it came from the internet.

## Delivery

Helius retries failed deliveries with exponential backoff.

Therefore:

**Webhook consumers must be idempotent.**

A simple dedupe key may be:

```text
signature + event type
```

Use a stronger application-specific key when the event model requires it.

## Enhanced vs raw

Helius supports parsed/enhanced webhook event types and raw transaction notifications.

For new decoded real-time WebSocket use cases, consider Parsed Streams.

For simple HTTP push, Webhooks remain appropriate.

## Scale

Helius documents support for monitoring large numbers of accounts per webhook. Verify the current documented limit before hard-coding a capacity assumption.

## Local testing

Expose a local receiver through a secure development tunnel and use devnet activity where possible.

Never expose production webhook secrets in a public repository.

## Example

```ts
export async function POST(request: Request) {
  const auth = request.headers.get("authorization");

  if (auth !== process.env.WEBHOOK_AUTH_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  const events = await request.json();

  // Validate, dedupe, enqueue.

  return Response.json({ received: true });
}
```
