# Workflow: Live Program Monitor with Parsed Streams

## Goal

Monitor decoded instructions from a Solana program in real time.

## Steps

1. Identify program address.
2. Call `describeProgram`.
3. Read exact instruction names and account roles.
4. Build `parsedTransactionSubscribe` filters.
5. Subscribe through the current Parsed Streams endpoint.
6. Include CPI only if required.
7. Decide whether failed transactions should be included.
8. Validate and dedupe notifications.
9. Persist checkpoints/recent signatures.
10. Reconnect and reconcile after disconnect.

## Example filter shape

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "parsedTransactionSubscribe",
  "params": [
    {
      "programs": ["PROGRAM_ID"],
      "instructionNames": ["KNOWN_INSTRUCTION"],
      "includeCpi": true,
      "includeFailed": false
    }
  ]
}
```

## Critical rule

Do not guess instruction names. Use `describeProgram`.

## Acceptance tests

- Known instruction matches.
- Unknown instruction produces no false positives.
- Reconnect succeeds.
- Duplicate signature does not create duplicate business state.
