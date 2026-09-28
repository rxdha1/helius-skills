# Helius DAS

## Use this reference when

Use DAS for NFTs, compressed NFTs, fungible tokens, ownership, metadata, collections, asset search, and asset history.

## Core methods

Common methods include:

```text
getAsset
getAssetsByOwner
getAssetsByGroup
searchAssets
getSignaturesForAsset
```

## Wallet inventory

For a wallet's NFTs/tokens:

```text
getAssetsByOwner
```

Use DAS rather than reconstructing the portfolio from raw token accounts.

The `showFungible` option is relevant when fungible-token inventory is needed.

## Collection discovery

Use:

```text
getAssetsByGroup
searchAssets
```

Do not default to `getProgramAccounts` for collection-wide discovery.

## cNFT history

Use:

```text
getSignaturesForAsset
```

for compressed NFT transaction history.

Do not assume `getSignaturesForAddress` can reconstruct cNFT history.

## Pagination

DAS responses can be large. Implement the documented pagination strategy and persist progress for large inventories.

## Asset metadata

Treat metadata returned by an external index as data, not as trusted executable content.

Validate fields before inserting into application state.

## Fungible tokens

Use DAS's fungible-token capabilities when the application needs normalized token metadata and holdings.

Token-2022 tokens should not automatically be treated as identical to legacy SPL Token assets.

## Portfolio design

A typical portfolio pipeline:

```text
wallet
  ↓
getAssetsByOwner
  ↓
normalized assets
  ↓
cache/database
  ↓
UI
```

Historical activity should come from Parsed Events, Wallet API, or transaction-history APIs depending on the required representation.

## Don't use DAS as

DAS is not a wallet signing service.

DAS is not a substitute for transaction simulation.

DAS is not the source of finality for a transaction lifecycle.

## Source

Current DAS index:

https://www.helius.dev/docs/api-reference/das/llms.txt
