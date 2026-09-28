# Workflow: Helius MCP Agent

## Goal

Configure an AI coding/operations agent to use Helius structured tools instead of guessing shell commands.

## Official MCP

Helius documents:

```bash
npx helius-mcp@latest
```

For Codex:

```bash
codex mcp add helius -- npx helius-mcp@latest
```

Use the current official Helius MCP instructions when configuring the environment.

## Agent policy

Use structured Helius tools for:

- balances
- DAS assets
- transactions
- parsing
- webhooks
- WebSockets
- Sender
- priority fees
- wallet data

Use the skill recipes to decide sequencing and safety.

## Safety

MCP tool availability does not remove the need for authorization.

Before sending value:

```text
inspect
→ explain
→ authorize
→ sign
→ send
```

Never silently turn a read-only request into a transaction.

## Acceptance tests

- Agent can query read-only data.
- Agent does not print API keys.
- Transaction tools require explicit authorization.
- Agent selects the appropriate Helius product rather than generic RPC by default.
