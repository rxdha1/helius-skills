# Helius Streaming

## Delivery models

| Requirement | Product |
|---|---|
| HTTP callback | Webhooks |
| Decoded transaction WebSocket | Parsed Streams |
| Browser/UI WSS | LaserStream WebSocket |
| Backend gRPC + replay | LaserStream gRPC |
| Earliest pre-shred signal | Preconfirmations |
| Pre-execution decoded transaction | preprocessedSubscribe |
| Raw shreds | Shred Delivery |

## LaserStream WebSocket

Helius's WebSocket layer is powered by LaserStream infrastructure.

Use it for:

- account subscriptions
- transaction subscriptions
- browser/UI updates
- low-latency WSS integrations

Standard Solana WebSocket methods are available. Helius extensions include enhanced transaction/account subscriptions.

Mainnet standard endpoint:

```text
wss://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY
```

Gatekeeper endpoint:

```text
wss://beta.helius-rpc.com/?api-key=YOUR_API_KEY
```

The Gatekeeper host also serves Parsed Streams and pre-execution WebSocket products.

## Parsed Streams

Use Parsed Streams when you want decoded transactions pushed over WebSocket with server-side filtering.

Filters can target:

- programs
- instruction names
- accounts
- named account roles

This is preferable to subscribing to a firehose and decoding/filtering everything in application memory.

Current Helius docs describe Parsed Streams as generally available on all plans, including Free, with usage metered per delivered event. Verify current billing before deployment.

## LaserStream gRPC

Use LaserStream gRPC for:

- backend indexers
- high-volume streaming
- historical replay
- multi-node failover
- account/transaction/block/slot streams

It is wire-compatible with Yellowstone gRPC.

It supports historical replay, currently documented up to 48 hours.

Do not use WSS when the application specifically requires gRPC replay semantics.

## Replay architecture

```text
checkpoint
   ↓
historical replay
   ↓
deduplicate
   ↓
live stream
   ↓
database
```

Persist:

- slot
- signature
- processing checkpoint
- application state

## WebSocket reliability

Implement:

```text
connect
subscribe
receive
disconnect
reconnect
resubscribe
reconcile
```

Never assume a socket remains alive forever.

## Backpressure

For high-volume streams:

```text
stream
 ↓
bounded queue
 ↓
workers
 ↓
database
```

Do not allow an unbounded in-memory event queue.

## Streaming vs polling

Prefer streaming for real-time data.

Use polling when:

- changes are infrequent
- no suitable stream exists
- real-time behavior is unnecessary
- operational simplicity is more valuable than latency

## Source

Current Helius streaming index:

https://www.helius.dev/docs/data-streaming.md
