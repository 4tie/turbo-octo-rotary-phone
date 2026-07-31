"""
News service — fetches and parses crypto news from RSS feeds.
"""

import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime

from backend.config import FETCH_HEADERS, RSS_FEEDS, NEWS_MAX_ARTICLES


def _parse_timestamp(pub_date: str) -> int:
    """Convert an RFC-2822 pubDate string to a UTC Unix timestamp."""
    try:
        return int(parsedate_to_datetime(pub_date).timestamp())
    except Exception:
        return int(datetime.now(timezone.utc).timestamp())


def fetch_rss(url: str, source_name: str) -> list[dict]:
    """
    Fetch a single RSS feed and return a list of article dicts.
    Raises on network / parse errors — callers should catch.
    """
    req = urllib.request.Request(url, headers=FETCH_HEADERS)
    with urllib.request.urlopen(req, timeout=10) as response:
        raw = response.read()

    root  = ET.fromstring(raw)
    items = root.findall(".//item")

    articles = []
    for item in items:
        title = (item.findtext("title") or "").strip()
        link  = (item.findtext("link")  or "").strip()
        pub   = (item.findtext("pubDate") or "").strip()

        if title and link:
            articles.append({
                "title":        title,
                "url":          link,
                "source":       source_name,
                "published_on": _parse_timestamp(pub) if pub else int(datetime.now(timezone.utc).timestamp()),
            })

    return articles


def build_news() -> list[dict]:
    """
    Aggregate articles from all configured RSS feeds.
    Returns up to NEWS_MAX_ARTICLES items, sorted newest-first,
    de-duplicated by the first 40 characters of the title.
    """
    all_articles: list[dict] = []

    for source_name, url in RSS_FEEDS:
        try:
            batch = fetch_rss(url, source_name)
            all_articles.extend(batch)
            if len(all_articles) >= NEWS_MAX_ARTICLES:
                break
        except Exception as exc:
            print(f"[news] {source_name} failed: {exc}", flush=True)

    # Sort newest-first
    all_articles.sort(key=lambda a: a["published_on"], reverse=True)

    # De-duplicate
    seen: set[str] = set()
    output: list[dict] = []
    for article in all_articles:
        key = article["title"][:40].lower()
        if key not in seen:
            seen.add(key)
            output.append(article)
        if len(output) >= NEWS_MAX_ARTICLES:
            break

    return output
