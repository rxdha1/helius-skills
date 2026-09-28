# Workflow: Token Holder Report

## Goal

Generate a token holder/balance report without scraping the chain unnecessarily.

## Steps

1. Validate mint address.
2. Determine whether the token uses legacy SPL or Token-2022 where relevant.
3. Use the appropriate Helius token/DAS indexed data.
4. Paginate all holder data.
5. Store raw integer amounts.
6. Resolve decimals only for presentation.
7. Cache token metadata.
8. Produce CSV/JSON/report output.

## Rules

Never use floating point for token balances.

Do not assume 6 or 9 decimals.

Do not claim holder completeness unless pagination and provider limits were handled.

## Acceptance tests

- Invalid mint rejected.
- Decimal conversion is exact.
- Large integer balances survive round trips.
- Pagination is complete.
- Duplicate holders are reconciled.
