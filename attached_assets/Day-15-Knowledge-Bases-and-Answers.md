# Day 15 — What Are Knowledge Bases?

## Objective

Identify the five dedicated knowledge bases needed by the AI Strategy Research Agent, prioritise them, define their purpose and update frequency, and save the resulting map to `~/four-zero/knowledge/knowledge-base-map.md`.

## Questions and answers

### 1. What does the committed agent need to know about the user's world?

The committed agent is the **AI Strategy Research Agent**. It needs to know:

- The platform structure and its stages.
- The rules for accepting and rejecting strategies.
- The data, markets, and runtime settings.
- The current project state and previous decisions.

### 2. What context was missing when AI previously gave an answer that did not fit the user's situation?

The user did not recall a specific example. No story or missing context was invented. The map instead derives the likely missing context from the actual project: architecture, validation rules, runtime constraints, and current project decisions.

### 3. What context changes frequently?

Derived from the active project:

- Current project phase and implementation status.
- Completed, blocked, tested, and rejected work.
- Experiment and backtest results.
- Available datasets, pairs, timeframes, and runtime settings.
- Model, dependency, exchange, and tool configuration.

### 4. What context is stable but deep?

Derived from the established project design:

- Platform architecture and pipeline responsibilities.
- Strategy validation methodology and risk policy.
- Product purpose, target problem, and business constraints.
- Boundaries for AI autonomy, live trading, and irreversible actions.

### 5. Who or what must the agent know about in the environment?

There is no fixed group of advisers, collaborators, or clients at present. The agent should understand the operating environment and update it as relationships appear, including GitHub, Freqtrade, Binance, local AI models, coding agents, the user's Windows workstation, future users, customers, collaborators, and relevant specialists.

## Result

Five knowledge bases were selected:

1. Project Architecture and Pipeline.
2. Strategy Evaluation and Risk Policy.
3. Data, Markets, and Runtime Configuration.
4. Project State, Decisions, and Experiment History.
5. Users, Stakeholders, and Operating Environment.

The final map is saved in `four-zero/knowledge/knowledge-base-map.md`.