# Helius Security and Agent Patterns

## Secrets

Never expose:

- HELIUS_API_KEY
- webhook secrets
- seed phrases
- private keys
- wallet signing secrets

Keep server credentials in environment/secret management.

## Webhook security

Always verify the configured authorization header.

Then:

```text
authenticate
validate schema
dedupe
enqueue
acknowledge
```

## AI transaction safety

An AI agent should not silently authorize value-bearing transactions.

Before a transaction is signed, establish:

- source wallet
- destination
- asset
- amount
- network
- fees
- intended action
- user authorization

Simulation is useful but not a guarantee of later success.

## Input validation

Treat:

- webhook JSON
- RPC responses
- indexed metadata
- token metadata
- user-supplied addresses

as external input.

Use runtime validation for important boundaries.

## Solana address validation

In TypeScript:

```ts
import { PublicKey } from "@solana/web3.js";

const pubkey = new PublicKey(address);
```

Reject invalid addresses rather than silently transforming them.

## Amount safety

Use integer base units.

Examples:

```text
lamports
microlamports
token base units
```

Avoid floating point for financial values.

## Idempotency

Every stream/webhook consumer should have a deduplication strategy.

Possible keys:

```text
signature
signature + event type
signature + instruction index
provider event identifier
```

Use the strongest key appropriate to the event model.

## Observability

Log:

- operation
- endpoint
- latency
- status
- signature
- slot
- processing duration

Do not log secrets.

## Reliability

Handle:

- 429
- 5xx
- timeouts
- disconnects
- replay
- duplicate events
- stale blockhashes
- failed transactions

Use exponential backoff for retryable errors.

## Devnet

Use devnet for integration testing when practical.

Maintain explicit network configuration:

```bash
HELIUS_NETWORK=devnet
```

Never silently fall back from devnet to mainnet.

## Agent workflow

```text
user requirement
      ↓
classify capability
      ↓
select Helius product
      ↓
check current docs
      ↓
design lifecycle
      ↓
implement
      ↓
validate inputs
      ↓
test failure modes
      ↓
observe production
```

## Don't overbuild

Do not choose:

- Shred Delivery because it is fast
- gRPC because it is powerful
- Dedicated Nodes because the app is important
- ZK Compression because it is novel

Choose infrastructure based on measurable requirements.
