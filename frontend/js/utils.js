/**
 * utils.js — pure helper functions shared across modules.
 * No side-effects; no DOM access; no module state.
 */

/** Zero-pad a number to 2 digits. */
function pad(n) {
  return String(n).padStart(2, '0');
}

/** Escape HTML special characters to prevent XSS. */
function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Format a price for display (handles micro, small, and large values). */
function formatPrice(p) {
  const n = parseFloat(p);
  if (isNaN(n)) return '—';
  if (n >= 10000) return '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
  if (n >= 1)     return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  if (n >= 0.001) return '$' + n.toFixed(5);
  return '$' + n.toFixed(8);
}

/** Format a volume figure (K / M / B suffix). */
function formatVol(v) {
  const n = parseFloat(v);
  if (isNaN(n)) return '—';
  if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
  return n.toFixed(0);
}

/** Convert a Binance symbol to a human-readable pair (e.g. BTCUSDT → BTC/USDT). */
function displayTicker(sym) {
  if (sym.endsWith('USDT')) return sym.replace('USDT', '') + '/USDT';
  if (sym.endsWith('BTC'))  return sym.replace('BTC',  '') + '/BTC';
  return sym;
}

/** Return a human-readable "N ago" string from a Unix timestamp. */
function timeAgo(ts) {
  const diff = Math.floor(Date.now() / 1000 - ts);
  if (diff < 3600)  return Math.floor(diff / 60)   + 'm ago';
  if (diff < 86400) return Math.floor(diff / 3600)  + 'h ago';
  return Math.floor(diff / 86400) + 'd ago';
}

/** Shorten a news source name for compact display. */
function shortenSource(s) {
  return (s || '').replace(/\.(com|io|net|org|co\.uk)$/i, '').toUpperCase().slice(0, 20);
}

/** Return the day-of-year (1–366) for a given Date. */
function getDayOfYear(d) {
  const start = new Date(d.getFullYear(), 0, 0);
  const diff  = d - start + ((start.getTimezoneOffset() - d.getTimezoneOffset()) * 60000);
  return Math.floor(diff / 86400000);
}

/** Return the ISO week number for a given Date. */
function getWeekNum(d) {
  const onejan = new Date(d.getFullYear(), 0, 1);
  return Math.ceil((((d - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

/** Return the appropriate time-of-day greeting prefix. */
function getGreeting(hour) {
  if (hour >= 5  && hour <= 11) return 'Good morning, ';
  if (hour >= 12 && hour <= 17) return 'Good afternoon, ';
  return 'Good evening, ';
}
