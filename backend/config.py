"""
Server-side configuration for 4TIE OS.
"""

# ── Server ────────────────────────────────────────────────────────────────────
PORT         = 5000
FRONTEND_DIR = "frontend"   # path relative to project root

# ── HTTP request headers used when fetching external data ────────────────────
FETCH_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (X11; Linux x86_64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0 Safari/537.36"
    ),
    "Accept": "*/*",
}

# ── News RSS sources (tried in order; first success wins) ────────────────────
RSS_FEEDS = [
    ("Cointelegraph", "https://cointelegraph.com/rss"),
    ("Bitcoin.com",   "https://news.bitcoin.com/feed/"),
    ("Decrypt",       "https://decrypt.co/feed"),
]

# Maximum articles returned per news request
NEWS_MAX_ARTICLES = 8
