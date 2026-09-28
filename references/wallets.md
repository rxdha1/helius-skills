# Helius Wallet API and WaaS

## Wallet API

Use Wallet API for read-only wallet-oriented REST data:

- balances
- history
- transfers
- identity
- funding source

It is not a signing service.

## WaaS

Use Helius Wallet-as-a-Service when the application needs embedded non-custodial wallets.

Current docs describe:

- `helius-wallet-kit`
- React integration
- passkey/email authentication
- Turnkey-secured keys
- client-side signing
- paid-plan availability
- per-signature billing

Do not confuse WaaS with Wallet API.

## Security

Never:

- expose private keys to an LLM
- log seed phrases
- store signing secrets in ordinary logs
- place wallet secrets in frontend source
- put Helius API keys into public client bundles

Treat wallet creation and signing as privileged operations.

## Portfolio data

For complete asset inventory, use DAS.

Do not assume Wallet API balances are a complete NFT portfolio.

Current docs note that Wallet API balance responses have pagination and NFT-display limitations and may expose estimated prices rather than real-time market prices.

Use DAS when the application needs complete asset inventory and metadata.

## Transaction signing flow

```text
embedded wallet
  ↓
build transaction
  ↓
user authorization
  ↓
client-side signing
  ↓
Sender / RPC
  ↓
confirmation
```

Do not allow an AI agent to silently sign value-bearing transactions.

## Authorization UX

Before signing, clearly expose:

- asset
- amount
- source
- destination
- network
- relevant fees
- intended action

Require an explicit authorization boundary appropriate to the application.
