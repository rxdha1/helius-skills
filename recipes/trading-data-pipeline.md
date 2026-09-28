# Workflow: Trading Data Pipeline

## Goal

Build a low-latency Solana market/event pipeline.

## Select the least complex source that satisfies latency requirements

```text
Need decoded confirmed events
→ Parsed Streams

Need processed raw firehose
→ LaserStream

Need earlier pre-execution visibility
→ preprocessedSubscribe / preconfirmations

Need raw shreds
→ Shred Delivery
```

## Architecture

```text
Helius stream
   ↓
filter
   ↓
bounded queue
   ↓
decoder
   ↓
strategy/data service
   ↓
database/cache
```

Transaction submission is a separate pipeline:

```text
strategy
 ↓
transaction builder
 ↓
priority fee
 ↓
sign
 ↓
Sender
 ↓
confirmation
```

## Rules

Do not choose raw shreds merely because they are faster.

Do not infer finality from pre-execution data.

Measure end-to-end latency rather than optimizing a single component.
