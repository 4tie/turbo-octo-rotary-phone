# Universal Agent Usage

The canonical project instruction file is the repository-root `AGENTS.md`. Hermes Agent, OpenCode, and OpenAI Codex should all be launched from the repository root so they receive the same project rules. Ollama is a local model server that can power Hermes or OpenCode; it is not the project agent by itself.

## One-time setup

From PowerShell in the repository root:

```powershell
powershell -ExecutionPolicy Bypass -File .\four-zero\scripts\sync-hermes-context.ps1
```

This copies the canonical `four-zero/soul.md` into `~/.hermes/SOUL.md`. Run it again whenever `soul.md` changes.

## Hermes Agent

1. Start Ollama first when using a local model:

```powershell
ollama serve
```

2. Configure Hermes interactively:

```powershell
hermes model
```

For local Ollama, select the custom/self-hosted endpoint and use:

- Base URL: `http://localhost:11434/v1`
- API key: leave empty
- Model: the exact name returned by `ollama list`

Hermes requires a large context window for tool-based agent work. Configure the Ollama model and Hermes to use matching context settings before relying on this mode.

Alternatively, select the OpenAI Codex provider in `hermes model` and authenticate through ChatGPT OAuth.

3. Launch Hermes from the repository root so it reads `AGENTS.md`:

```powershell
hermes
```

## OpenCode

Launch from the repository root:

```powershell
opencode
```

The root `AGENTS.md` is loaded automatically, while `opencode.json` loads the shared context files.

Available provider paths:

- Run `/connect`, select OpenAI, and authenticate with ChatGPT Plus or Pro.
- Configure local Ollama by copying `four-zero/tooling/opencode-ollama.example.json` over `opencode.json`, then replace `YOUR_MODEL_NAME` with the exact name from `ollama list`.

After connecting, run `/models` and select the desired model.

## OpenAI Codex

Launch Codex from the repository root:

```powershell
codex
```

Codex reads the root `AGENTS.md` automatically. Sign in using the supported ChatGPT account flow when prompted.

Suggested first prompt:

```text
Read AGENTS.md and the required context files. Do not modify anything yet. Report the project purpose, current priority, latest blocker, proposed next action, and whether approval is required.
```

## Ollama

Ollama hosts the local model used by another agent runtime:

```powershell
ollama list
ollama serve
```

Use Hermes or OpenCode for file access, terminal commands, tools, memory, and project instructions. The standalone Ollama application does not automatically load `AGENTS.md`, inspect the repository, execute Freqtrade, or write session memory.

## End-of-session memory

When meaningful work is completed, ask the active agent:

```text
Write a concise dated session summary under four-zero/memory/. Include what changed, decisions, tests or evidence, blockers, and the next action. Do not include secrets.
```
