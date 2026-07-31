# API Keys Needed

## Agent Summary

The **4tieQuant Research Agent** researches and tests trading strategies and analyses cryptocurrency markets. It retrieves public market and historical candle data from Binance, runs strategy backtests and optimisation through the local Freqtrade environment, uses a local Ollama model as its default reasoning provider, and can send summaries or alerts to Discord. Optional free cloud fallbacks may be configured through Gemini Developer API or Groq, but the basic version does not require a paid cloud AI provider. It does not need email or calendar access, does not publish publicly, and must not place live trades or change account state as part of its current scope.

## Services Required

| Service | What it's used for | Free tier available (yes/no) |
|---|---|---|
| Binance Market Data API | Retrieves public prices, candles, symbols, volume, and other market data for analysis and backtesting. Public market-data endpoints do not require an API key; a Binance key is needed only for private account data or trading, which are outside the current agent scope. | Yes |
| Discord API / Bot | Receives commands and sends research summaries, test results, warnings, and status updates to selected Discord channels. Requires a Discord bot token and the application's identifiers and permissions. | Yes |
| Ollama Local API | Default AI provider. Runs local models that interpret strategy results, explain failures, compare experiments, and propose the next safe research action. Local access does not require an API key. | Yes |
| Freqtrade REST API / Local Runtime | Starts or monitors approved local research runs, retrieves backtest and optimisation results, and reads run status. This is a local service rather than an external paid API; it uses locally configured credentials if its REST API is enabled. | Yes |
| Gemini Developer API | Optional free cloud fallback when the local model is unavailable or a second opinion is useful. Requires a Gemini API key and is subject to free-tier limits and data-handling terms. | Yes |
| Groq API | Optional free cloud fallback for fast inference on supported open models. Requires a Groq API key and is subject to free-plan rate limits. | Yes |
| OpenAI API | Optional paid fallback only when a validated requirement cannot be met locally or by the free providers. ChatGPT Plus is a separate product and cannot be used as an OpenAI API key or API balance. | No guaranteed free tier |

## Keys Already In Hand

- **Discord:** Bot credentials are reported as already available. Never store the bot token in GitHub, source code, screenshots, chat logs, or committed configuration files.
- **Binance:** API credentials are reported as already available. For the current analysis-only agent, use public endpoints where possible. If a key is used, it should be a separate read-only key with trading and withdrawal permissions disabled and appropriate IP restrictions where supported.
- **Ollama:** No key is required for the local API.
- **Freqtrade:** No external provider key is required for local backtesting or dry-run research. Local API credentials must still be generated and protected if the REST API is enabled.
- **Gemini, Groq, and OpenAI:** No keys confirmed yet. These remain optional.

## Acquisition Priority

1. **Configure Ollama locally** — this is the default and fully local AI provider. No API key is required.
2. **Verify the Discord bot credentials already in hand** — confirm the bot token, application ID, server installation, channel IDs, and minimum required permissions. Rotate the token immediately if it has ever been pasted into chat, committed, or exposed.
3. **Use Binance public market data first** — no key is required for ordinary market analysis and historical candle downloads. Keep the existing Binance credentials unused unless private read-only account data becomes necessary.
4. **Create local Freqtrade API credentials when required** — configure a strong username, password, JWT secret, and WebSocket token only if the agent communicates with Freqtrade through its REST API. Keep the service private.
5. **Acquire one optional free fallback key** — Gemini is the recommended first cloud fallback; Groq is a useful fast alternative. Do not configure both until there is a real need.
6. **Add an OpenAI API key only when justified** — ChatGPT Plus cannot replace an API key. OpenAI API billing is separate and should remain optional to control cost.
