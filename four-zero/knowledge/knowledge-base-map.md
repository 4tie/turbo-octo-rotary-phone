# Knowledge Base Map

*Built on: July 31, 2026*
*For agent: AI Strategy Research Agent*

---

## Knowledge Base 1: Project Architecture and Pipeline

**What it covers:** The complete structure of the AI strategy-research platform: its stages, responsibilities, data flow, interfaces, and the boundaries between the application, Freqtrade, AI models, and automation tools. It should explain what each stage is expected to produce, how stages connect, and which parts are authoritative so the agent does not invent duplicate systems or redesign the project without context.

**Update frequency:** When things change

**Priority:** High

**File path:** `~/four-zero/knowledge/project-architecture-and-pipeline.md`

## Knowledge Base 2: Strategy Evaluation and Risk Policy

**What it covers:** The rules used to accept, reject, promote, or stop work on a trading strategy. It should define the required metrics and gates, including trade count, expectancy, profit factor, drawdown, realistic fees and slippage, out-of-sample testing, walk-forward analysis, robustness checks, multi-pair validation, and the limits that must be respected before live trading or claims of profitability.

**Update frequency:** Monthly or when rules change

**Priority:** High

**File path:** `~/four-zero/knowledge/strategy-evaluation-and-risk-policy.md`

## Knowledge Base 3: Data, Markets, and Runtime Configuration

**What it covers:** The exchanges, pairs, timeframes, datasets, download rules, configuration values, model providers, hardware limits, and runtime assumptions used by the platform. It should distinguish current settings from defaults and record missing or unsuitable data so the agent does not recommend tests that cannot run correctly in the actual environment.

**Update frequency:** Weekly or when things change

**Priority:** High

**File path:** `~/four-zero/knowledge/data-markets-and-runtime.md`

## Knowledge Base 4: Project State, Decisions, and Experiment History

**What it covers:** The current phase of the project, what is completed, tested, blocked, rejected, or still planned, along with important architectural and product decisions. It should also record meaningful strategy experiments, backtest outcomes, failed approaches, stopping decisions, and the evidence behind them so the agent does not repeat old work or treat an abandoned direction as current.

**Update frequency:** Daily during active work; otherwise weekly

**Priority:** High

**File path:** `~/four-zero/knowledge/project-state-and-decisions.md`

## Knowledge Base 5: Users, Stakeholders, and Operating Environment

**What it covers:** The intended users, the problem the product is meant to solve, commercial assumptions, and the people, platforms, and tools that affect how work is performed. It should include the solo-business constraint, the absence of a fixed adviser or development team, the roles of GitHub, local AI models, coding agents, Binance, Freqtrade, and other services, plus any future collaborators, customers, or specialists as they appear.

**Update frequency:** Monthly or when things change

**Priority:** Medium

**File path:** `~/four-zero/knowledge/users-stakeholders-and-environment.md`

---

## Build order

1. **Project Architecture and Pipeline** — the agent must first understand what the system is, how its stages connect, and where its responsibilities begin and end.
2. **Strategy Evaluation and Risk Policy** — once the structure is clear, the agent needs the rules that determine whether its research is useful, invalid, or unsafe.
3. **Data, Markets, and Runtime Configuration** — this makes recommendations executable in the real environment rather than technically correct but unusable in practice.
4. **Project State, Decisions, and Experiment History** — this prevents repeated work, conflicting recommendations, and loss of important decisions as the project changes.
5. **Users, Stakeholders, and Operating Environment** — this connects the technical system to the actual product, business constraints, tools, and people around it.

This order moves from the stable core of the system to its validation rules, then to the real operating environment, current state, and wider product context.

## What changes when these exist

With all five context files, the agent can reason from the real project instead of responding from generic software or trading knowledge. It can recommend the next useful action, interpret results under the correct rules, avoid repeating rejected work, notice when data or settings make a test invalid, and explain when specialist review or explicit approval is required.