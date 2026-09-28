# Helius Skills

A workflow-oriented agent skill for building production Solana applications with [Helius](https://www.helius.dev/). It helps an AI coding agent choose the right Helius product, load focused technical references, and follow repeatable implementation recipes.

The package covers Helius RPC and transaction history, DAS, Parsed Events and Streams, Webhooks, LaserStream, Sender and priority fees, Wallet API and WaaS, ZK Compression, pre-execution data, and related security practices.

Built with [Operate Center](https://operate.center) and [The Operator agentic framework](https://bonkcomputer.tech).

## What is included

- `SKILL.md` — product selection, agent execution and security contracts, and validation checklist.
- `recipes/` — practical workflows for wallet analysis, transaction explanations, indexing, streaming, webhooks, transaction sending, and agent integrations.
- `references/` — focused product and architecture notes.
- `scripts/` — small Node.js helpers for checking environment variable names, calling Helius APIs, parsing signatures, and testing webhook signatures.
- `workflow-index.md` — a quick map from common tasks to recipes.
- `manifest.json` — package version and inventory of the included files.

## Install in `.agents/skills`

From the root of the project where you want your agent to use the skill, clone the repository into the skill directory:

```bash
git clone --depth 1 https://github.com/rxdha1/helius-skills.git .agents/skills/helius
```

The expected layout is:

```text
.agents/
└── skills/
    └── helius/
        ├── SKILL.md
        ├── manifest.json
        ├── workflow-index.md
        ├── recipes/
        ├── references/
        └── scripts/
```

Keep the package together. `SKILL.md` links to files in `recipes/` and `references/`, so installing only the root file will leave the skill incomplete. If you already have a checkout, update it with:

```bash
git -C .agents/skills/helius pull --ff-only
```

You can also download the repository as a ZIP from GitHub and extract the complete repository contents into `.agents/skills/helius`. Confirm that `SKILL.md` is directly inside that directory, not nested one level deeper in another `helius-skills` directory.

`.agents/skills` is a convenient project-local location for agents that support it. Agent discovery and installation paths differ: if your agent does not read `.agents/skills`, ask it to install the package in its documented project-level or user-level skills directory, preserving the same folder structure.

## Ask your agent to install it

Paste this prompt into Operator, Hermes, OpenClaw, a CLI coding agent, or another agent that can access GitHub and write files in your project:

```text
Install the Helius Skills package from https://github.com/rxdha1/helius-skills into this project.

First check how this agent discovers project-local skills and use its supported location. Prefer .agents/skills/helius when supported. Do not assume that every agent uses the same directory. Download the repository's complete contents from its default branch, preserving the directory structure; do not install only README.md or SKILL.md. The root SKILL.md must end up at the installed skill directory, alongside manifest.json, workflow-index.md, recipes/, references/, and scripts/.

Use git clone or GitHub's repository/archive and raw-file endpoints as available. Do not guess the default branch or file URLs: inspect the repository and its manifest at https://github.com/rxdha1/helius-skills first. If the destination already exists, inspect it and update without deleting unrelated user files. Do not print, request, or modify API keys or other secrets.

When finished, report the installation path, how this agent will discover/use the skill, and whether every file listed in manifest.json was installed.
```

## Use the skill

After installation, ask your agent for a Helius or Solana integration task. It should read `SKILL.md`, classify the task, then load the relevant recipe and reference instead of pulling every document into context. For example:

- “Use the Helius skill to build a wallet token inventory report.”
- “Use the Helius skill to design an idempotent webhook consumer.”
- “Use the Helius skill to explain this transaction signature.”
- “Use the Helius skill to evaluate a low-latency transaction pipeline.”

The skill provides guidance and helper scripts; it does not provide an API key or replace current Helius documentation. Configure `HELIUS_API_KEY` in your local environment when needed, keep it server-side, and never paste it into chat or commit it to source control. Check current Helius docs, plan limits, and pricing before deploying an integration.

## Requirements

- Git for the clone/update commands.
- Node.js for the included `.mjs` helper scripts.
- A Helius API key for calls that require authenticated Helius access.

## Support the developer

If this project is useful to you, donations are appreciated:

**Solana wallet:** `7tWQfQMhkifHTyNnWC6adnczXKvyf9gjmyYXSB4Pww1k`

Please verify the address and network in your wallet before sending. Donations are voluntary and are not required to use the project.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for the full text.
