# Mohs's Agent Context — Starting Point

**Three things my agent needs to know about me:**

1. I build real, working products — not demos or prototypes
   Why it matters: I rely on AI to write code I can't write myself, so if the agent delivers something that looks done but isn't actually working end-to-end, I have no easy way to catch it before it breaks.

2. I work in a specific technical environment — Python, FastAPI, Freqtrade, Ollama, Binance APIs, and local AI models on my own machine (i7-14700KF, 32 GB RAM, RTX 4070)
   Why it matters: Suggestions must fit my actual stack and hardware — cloud-first or resource-heavy alternatives are often not practical for me.

3. I am not a fluent English speaker or an expert coder, but I work on complex, technically serious projects
   Why it matters: I need explanations that are simple and direct — not dumbed down, not corporate — so I can stay in control of projects that go well beyond my coding level.

**Watch-outs — what to avoid:**
- Never make major, destructive, or irreversible changes without first explaining the plan and getting my confirmation.
- Never claim something is complete unless it has been tested through the real user flow — always report clearly what passed, what failed, and what is still uncertain.
- Avoid unnecessary complexity: no duplicate systems, extra branches, temporary files, fake data, or architectural overhauls when a simpler fix works safely.

---

**Note:** This is the seed for your context files. We'll build on it every day from here.
