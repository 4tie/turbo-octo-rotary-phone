# Day 19 — The .env File: Storing Secrets Safely

## Decisions and answers

- Agent name: **4tieQuant Research Agent**
- Existing services with credentials: **Discord** and **Binance**
- Secret values were intentionally not shared or committed.
- Default AI provider: **Ollama local API** — no API key required.
- Optional free fallbacks: **Gemini Developer API** and **Groq API**.
- Optional paid fallback: **OpenAI API**. A ChatGPT Plus subscription is separate and cannot be used as an API key or API balance.
- No existing `CLAUDE.md` file was found in the repository, so a new stub was created at `four-zero/CLAUDE.md`.

---

### File 1: `~/.api-keys.env`

```env
# API Keys — central store for all agent credentials
# Never commit this file to git
# Reference in CLAUDE.md: "API keys are stored at ~/.api-keys.env"

AGENT_NAME="4tieQuant Research Agent"

# Default local AI provider — no API key required
AI_PROVIDER=ollama
OLLAMA_BASE_URL=http://127.0.0.1:11434
OLLAMA_MODEL=PLACEHOLDER_LOCAL_MODEL

# Discord — replace manually
DISCORD_BOT_TOKEN=PLACEHOLDER
DISCORD_APPLICATION_ID=PLACEHOLDER
DISCORD_GUILD_ID=PLACEHOLDER
DISCORD_MAIN_CHANNEL_ID=PLACEHOLDER

# Binance — optional for private read-only data
BINANCE_API_KEY=PLACEHOLDER
BINANCE_API_SECRET=PLACEHOLDER

# Local Freqtrade REST API — only when enabled
FREQTRADE_API_USERNAME=PLACEHOLDER
FREQTRADE_API_PASSWORD=PLACEHOLDER
FREQTRADE_JWT_SECRET=PLACEHOLDER
FREQTRADE_WS_TOKEN=PLACEHOLDER

# Optional free cloud fallbacks
GEMINI_API_KEY=PLACEHOLDER_OPTIONAL_FREE
GROQ_API_KEY=PLACEHOLDER_OPTIONAL_FREE

# Optional paid fallback — ChatGPT Plus cannot be used as this key
OPENAI_API_KEY=PLACEHOLDER_OPTIONAL_PAID
```

A safe committed template was created at `four-zero/.api-keys.env.example`. The real `~/.api-keys.env` must stay only on the local machine.

---

### File 2: Addition to `CLAUDE.md`

```text
API keys are stored at ~/.api-keys.env. Load this file when any tool or service requires authentication.
```

The repository stub was created at `four-zero/CLAUDE.md` and also records the local-first provider policy and secret-handling rules.

---

### Instructions

1. Create or open the local file:

   ```bash
   nano ~/.api-keys.env
   ```

2. Paste the File 1 contents, replace only the placeholders you actually use, then save with `Ctrl+X`, `Y`, and `Enter`.

3. Restrict file permissions on Linux, WSL, or Replit:

   ```bash
   chmod 600 ~/.api-keys.env
   ```

4. Verify it exists:

   ```bash
   ls -la ~/.api-keys.env
   ```

5. Never copy the real file into the repository. The root `.gitignore` now blocks `.api-keys.env` and ordinary `.env` secret files while allowing `.env.example` templates.
