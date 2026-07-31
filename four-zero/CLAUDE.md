# Legacy Compatibility Notice

The canonical cross-tool instruction file is the repository-root `AGENTS.md`.

Use `AGENTS.md` with:

- Hermes Agent
- OpenCode
- OpenAI Codex

The shared context remains under `four-zero/`:

- `four-zero/soul.md`
- `four-zero/knowledge/life-context.md`
- `four-zero/knowledge/business-context.md`
- `four-zero/knowledge/knowledge-base-map.md`
- `four-zero/memory/`
- `four-zero/api-keys-needed.md`

API keys are stored at `~/.api-keys.env`. Load this file only when authentication is required, and never print or commit secret values.

This file is retained only because it was created during the curriculum. It is not required for the supported Hermes, OpenCode, Ollama, or Codex workflow.
