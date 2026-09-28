# Workflow: Helius Integration Bootstrap

## Goal

Add Helius to an existing TypeScript/Node/Next.js repository safely.

## Steps

1. Inspect package manager and framework.
2. Inspect existing Solana dependencies.
3. Check for existing Helius integration.
4. Add the smallest required dependency.
5. Add `HELIUS_API_KEY` to server-side environment configuration.
6. Add a typed Helius client wrapper.
7. Add a health check that does not leak secrets.
8. Add one integration test.
9. Run typecheck/lint/test/build.
10. Document required environment variables.

## Do not

- overwrite an existing Solana client without reason
- introduce duplicate RPC clients
- expose API keys to browser code
- hard-code mainnet when the repository supports multiple networks
- commit `.env`

## Suggested structure

```text
src/
  lib/
    helius/
      client.ts
      rpc.ts
      errors.ts
      types.ts
```

## Acceptance tests

- Missing API key fails clearly.
- API key is never printed.
- Mainnet/devnet is explicit.
- Existing application tests still pass.
