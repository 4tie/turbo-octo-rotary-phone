/**
 * news.js — Crypto News feed + Fear & Greed Index.
 * News is fetched via the server-side /api/news proxy to avoid CORS.
 * Fear & Greed comes from the public Alternative.me API (CORS-open).
 */

// ── Crypto News ───────────────────────────────────────────────────────────────
async function fetchNews() {
  try {
    const resp     = await fetch('/api/news');
    if (!resp.ok)  throw new Error(resp.status);
    const json     = await resp.json();
    const articles = (json.articles || []).slice(0, 6);

    if (!articles.length) throw new Error('empty response');

    document.getElementById('news-feed').innerHTML = articles.map(a => {
      const src  = shortenSource(a.source);
      const ago  = timeAgo(a.published_on);
      const href = (a.url || '#').replace(/'/g, '%27');
      return `
        <div class="news-card" onclick="window.open('${href}', '_blank')">
          <div class="nc-headline">${escHtml(a.title)}</div>
          <div class="nc-meta">${src} &nbsp;·&nbsp; ${ago}</div>
        </div>`;
    }).join('');

    document.getElementById('news-status-dot').className    = 'status-dot dot-green';
    document.getElementById('news-status-label').textContent = 'LAST 6';
  } catch (e) {
    document.getElementById('news-feed').innerHTML =
      `<div class="loading-row">
         <span style="color:var(--amber)">●</span>&nbsp;HEADLINES UNAVAILABLE
       </div>`;
    document.getElementById('news-status-dot').className    = 'status-dot dot-amber';
    document.getElementById('news-status-label').textContent = 'OFFLINE';
  }
}

// ── Fear & Greed Index ────────────────────────────────────────────────────────
async function fetchFearGreed() {
  try {
    const resp  = await fetch('https://api.alternative.me/fng/?limit=1');
    if (!resp.ok) throw new Error(resp.status);
    const json  = await resp.json();
    const entry = json.data[0];
    const val   = parseInt(entry.value, 10);

    document.getElementById('fg-value').textContent = val;
    document.getElementById('fg-label').textContent = entry.value_classification.toUpperCase();

    // Meter fill
    document.getElementById('fg-fill').style.width = val + '%';
    let fillColor = 'var(--green)';
    if      (val < 25) fillColor = 'var(--red)';
    else if (val < 45) fillColor = '#c47a30';
    else if (val < 55) fillColor = 'var(--amber)';
    document.getElementById('fg-fill').style.background = fillColor;

    // Next update countdown
    const secs = parseInt(entry.time_until_update || 0, 10);
    document.getElementById('fg-update').textContent = secs > 0
      ? `UPDATES IN ${Math.floor(secs / 3600)}h ${Math.floor((secs % 3600) / 60)}m`
      : 'UPDATED TODAY';

    document.getElementById('fg-status-dot').className = 'status-dot dot-green';
  } catch (e) {
    document.getElementById('fg-label').textContent    = 'UNAVAILABLE';
    document.getElementById('fg-status-dot').className = 'status-dot dot-amber';
  }
}
