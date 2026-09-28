# Helius ZK Compression

## Use this reference when

Use ZK Compression for compressed accounts and token state where the application's scale or storage economics justify the architecture.

## Concepts

ZK Compression uses zero-knowledge proofs and compressed state to reduce on-chain storage costs.

It is useful for:

- large account sets
- compressed token state
- large distributions
- high-scale application state

## Do not confuse

Compressed state is not the same thing as:

- an ordinary Solana account
- a cNFT
- a cheaper RPC request

The application must use the correct compression programs, proofs, SDKs, and lifecycle.

## cNFT vs ZK Compression

cNFTs are a specific compressed asset model.

ZK Compression is a broader compressed-state technology.

Do not use the terms interchangeably.

## Application design

Keep normal and compressed state explicit:

```text
ordinary account state
        |
        +---- normal RPC / DAS

compressed state
        |
        +---- ZK Compression APIs / Photon
```

## Cost model

Compression can materially reduce state-storage costs, but application complexity increases.

Choose it because the application's state requirements justify it, not simply because it is available.
