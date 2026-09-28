# Helius Latency and Pre-Execution Products

## Use this reference when

Use this file for low-latency transaction observation, preconfirmations, preprocessed transactions, Shred Delivery, and latency-sensitive architecture.

## Lifecycle distinction

Earlier observation does not mean stronger finality.

A useful ordering is:

```text
Preconfirmations
    ↓
Raw shreds
    ↓
preprocessedSubscribe
    ↓
processed
    ↓
confirmed
    ↓
finalized
```

The exact signal semantics differ between products.

## Preconfirmations

`preconfSubscribe` provides transactions before they are collected into entries and shredded.

Current Helius docs describe two sources:

- Helius preconfirmations: leader executes the transaction and the message includes execution status.
- Jito BAM preconfirmations: validator commits to executing before execution; messages have different status semantics.

The same signature can arrive from both sources.

Therefore:

**Deduplicate signatures and understand source semantics.**

Preconfirmations require Professional or higher according to the current docs and are metered per message.

## Transaction bytes

Preconfirmation transaction bytes are Solana wire-format transactions and can include legacy, v0, or v1 transactions.

Use a v1-aware decoder where required.

Do not assume arbitrary old binary decoding libraries can parse all versions.

## preprocessedSubscribe

`preprocessedSubscribe` delivers decoded pre-execution transactions before normal `processed` commitment.

Current docs describe it as:

- public beta
- available on paid plans
- served from `wss://beta.helius-rpc.com`
- metered per delivered message

Use it when the application needs earlier decoded transaction data without dropping all the way to raw shreds.

## Shred Delivery

Shred Delivery provides raw Solana shreds over UDP.

Use only for highly specialized low-latency systems.

It is not appropriate for ordinary:

- wallets
- NFT apps
- portfolio trackers
- dashboards

Current documentation lists self-serve pricing per IP; verify current pricing before deployment.

## Choosing

```text
Need earliest transaction signal?
  → Preconfirmations

Need raw packets?
  → Shred Delivery

Need decoded pre-execution data?
  → preprocessedSubscribe

Need processed streaming with replay/failover?
  → LaserStream gRPC
```

Never claim that an early signal is finalized blockchain state.
