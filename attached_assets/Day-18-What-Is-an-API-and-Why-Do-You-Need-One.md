# Day 18 — What Is an API and Why Do You Need One?

## Original prompt

You are helping me complete Day 18 of the Zero One Systems curriculum.
Your job today is to help me identify every external service and API my agent will need in order to function.

When we're done, I will have a clear list of API keys I need to acquire, saved to `~/four-zero/api-keys-needed.md`.

## Answers

1. **What the agent does:** It researches and tests trading strategies and analyses cryptocurrency markets.
2. **Information it needs:** Public price, candle, symbol, volume, and historical market data; local strategy definitions, Freqtrade data, backtest and optimisation results; and an AI model that can interpret those results.
3. **Email, calendar, and messaging:** It does not need email or calendar access. It uses Discord for commands, summaries, warnings, and status updates.
4. **External actions:** It may send messages to Discord and trigger approved local Freqtrade research tasks. It does not place live trades, transfer money, publish publicly, or change private Binance account state in its current scope.
5. **Keys already available:** Discord and Binance credentials are reported as available. Secret values were not shared and must not be stored in the repository.

## Result

The final API map is saved at `four-zero/api-keys-needed.md`.
