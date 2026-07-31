# API Keys Needed

## Agent Summary

The AI Strategy Research Agent researches and tests trading strategies and analyses cryptocurrency markets. It retrieves public market and historical candle data from Binance, runs strategy backtests and optimisation through the local Freqtrade environment, uses a local Ollama model to interpret results and recommend the next research step, and can send summaries or alerts to Discord. It does not need email or calendar access, does not publish publicly, and must not place live trades or change account state as part of its current scope.

## Services Required

| Service | What it's used for | Free tier available (yes/no) |
|---|---|---|
| Binance Market Data API | Retrieves public prices, candles, symbols, volume, and other market data for analysis and backtesting. Public market-data endpoints do not require an API key; a Binance key is needed only for private account data or trading, which are outside the current agent scope. | Yes |
| Discord API / Bot | Receives commands and sends research summaries, test results, warnings, and status updates to the selected Discord server or channels. Requires a Discord bot token and the application's identifiers and permissions. | Yes |
| Ollama Local API | Runs the local AI model that interprets strategy results, explains failures, compares experiments, and proposes the next safe research action. Local access does not require an API key. | Yes |
| Freqtrade REST API / Local Runtime | Starts or monitors approved local research runs, retrieves backtest and optimisation results, and reads run status. This is a local service rather than an external paid API; it uses locally configured credentials, JWT secrets, or WebSocket tokens if its REST API is enabled. | Yes |

## Keys Already In Hand

- **Discord:** Bot credentials are reported as already available. Never store the bot token in GitHub, source code, screenshots, chat logs, or committed configuration files.
- **Binance:** API credentials are reported as already available. For the current analysis-only agent, use public endpoints where possible. If a key is used, it should be a separate read-only key with trading and withdrawal permissions disabled and appropriate IP restrictions where supported.
- **Ollama:** No key is required for the local API.
- **Freqtrade:** No external provider key is required for local backtesting or dry-run research. Local API credentials must still be generated and protected if the REST API is enabled.

## Acquisition Priority

1. **Verify the Discord bot credentials already in hand** — confirm the bot token, application ID, server installation, channel IDs, and minimum required permissions. Rotate the token immediately if it has ever been pasted into chat, committed, or exposed.
2. **Verify the Binance access mode** — prefer public unauthenticated market data for research. If private account data is genuinely required later, create a separate read-only API key; do not enable trading or withdrawals for this agent.
3. **Configure Ollama locally** — no API key is needed. Confirm the selected local model is installed and reachable through the local API.
4. **Create local Freqtrade API credentials** — configure a strong username, password, JWT secret, and WebSocket token only if the agent needs to communicate with Freqtrade through its REST API. Keep the service private and do not expose it directly to the public internet.
5. **Optional cloud AI key only if needed later** — OpenAI, Ollama Cloud, or another hosted model key is not required for the basic local version. Acquire one only if a validated requirement cannot be met by the local model and the cost and privacy trade-offs are accepted.
