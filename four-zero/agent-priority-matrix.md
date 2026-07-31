# Agent Priority Matrix

| Activity | Time Cost (1–5) | Value of Outcome (1–5) | Priority Score | Notes |
|---|---|---|---|---|
| AI strategy-research system (discover, test, improve, validate Freqtrade strategies) | 5 | 5 | 25 | Highest stated impact — core product value and financial upside |
| AI-powered trading tools (market analysis, trade management, auto-trading) | 5 | 5 | 25 | High impact but requires strict human approval controls and risk limits |
| Running backtests, hyperopt, walk-forward, Monte Carlo, robustness checks | 5 | 4 | 20 | Extremely time-consuming and repetitive — closely linked to strategy research |
| Writing detailed prompts and phased instructions for coding assistants | 4 | 4 | 16 | High leverage — better prompts improve output across all agent work |
| Testing, debugging, and improving apps without breaking existing features | 4 | 3 | 12 | Important for reliability but reactive/maintenance in nature |
| Reviewing results and deciding what to fix, reject, approve, or build next | 3 | 4 | 12 | Agent can summarise and assist — but final decisions stay human |
| Researching AI models, tools, APIs, frameworks, and local infrastructure | 3 | 3 | 9 | Valuable but indirect; informs decisions rather than driving outcomes |
| Organizing phases, checklists, testing gates, and learning technical concepts | 3 | 3 | 9 | Important for structure but not a direct value driver |

---

**Ranked by priority score — highest to lowest:**
1. AI strategy-research system — Score: 25
2. AI-powered trading tools — Score: 25 *(ranked second due to higher resistance to full autonomy)*
3. Running backtests and robustness checks — Score: 20
4. Writing prompts and phased instructions — Score: 16
5. Testing and debugging apps — Score: 12
6. Reviewing results and deciding next steps — Score: 12
7. Researching tools and infrastructure — Score: 9
8. Organizing phases and learning — Score: 9

---

**My First Agent: AI Strategy-Research System**

Why this one: This is the activity Mohs identified as having the biggest financial, strategic, and quality-of-life impact — it turns a slow, manual, and uncertain testing process into a structured, evidence-based system. It sits at the core of the product he is building, and a capable agent here would save real money by rejecting weak strategies early while systematically improving the ones worth pursuing. Unlike the trading execution agent, there is no strong resistance to delegating this work, making it the safest and highest-value place to start.

What success looks like: The agent can take a Freqtrade strategy, run it through backtesting, hyperoptimization, walk-forward analysis, and robustness checks, clearly explain why it passed or failed, and recommend concrete improvements — without requiring Mohs to manually run each step or interpret raw numbers.

---

**Note:** This is Day 3 output from the Zero One Systems curriculum. Built on top of agent-context-seed.md.
