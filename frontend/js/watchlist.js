/**
 * watchlist.js — Crypto Watchlist panel + Binance Pair Browser modal.
 * Polls Binance REST API every 15 s for the user's tracked symbols.
 * Favourites are persisted in localStorage.
 */

// ── State ─────────────────────────────────────────────────────────────────────
let favorites         = [];
let allPairs          = [];   // full USDT pair list cached from Binance
let pairsLoaded       = false;
let wlInterval        = null;
let lastWatchlistData = [];

// ── Favourites persistence ────────────────────────────────────────────────────
function loadFavs() {
  try   { favorites = JSON.parse(localStorage.getItem(FAV_KEY)) || []; }
  catch { favorites = []; }
}

function saveFavs() {
  localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
}

function toggleFav(symbol) {
  favorites = favorites.includes(symbol)
    ? favorites.filter(f => f !== symbol)
    : [...favorites, symbol];
  saveFavs();
  renderWatchlist(lastWatchlistData);
  renderModalList();
}

function isFav(symbol) {
  return BASE_SYMBOLS.includes(symbol) || favorites.includes(symbol);
}

// ── Symbol list ───────────────────────────────────────────────────────────────
function getWatchlistSymbols() {
  const extra = favorites.filter(f => !BASE_SYMBOLS.includes(f));
  return [...BASE_SYMBOLS, ...extra];
}

// ── Watchlist rendering ───────────────────────────────────────────────────────
function renderWatchlist(data) {
  lastWatchlistData   = data || [];
  const symbols   = getWatchlistSymbols();
  const container = document.getElementById('watchlist-rows');

  if (!data || !data.length) {
    container.innerHTML =
      `<div class="loading-row"><span style="color:var(--amber)">●</span>&nbsp;NO DATA — RETRYING…</div>`;
    return;
  }

  // Build lookup map by symbol
  const map = Object.fromEntries(data.map(d => [d.symbol, d]));

  container.innerHTML = symbols.map(sym => {
    const d    = map[sym];
    const isB  = BASE_SYMBOLS.includes(sym);
    const fav  = favorites.includes(sym);

    let priceStr  = '—';
    let changeStr = '—';
    let changeCls = 'neu';
    let volStr    = '—';

    if (d) {
      priceStr  = formatPrice(d.lastPrice);
      const chg = parseFloat(d.priceChangePercent);
      changeStr = (chg >= 0 ? '+' : '') + chg.toFixed(2) + '%';
      changeCls = chg > 0 ? 'pos' : chg < 0 ? 'neg' : 'neu';
      volStr    = formatVol(parseFloat(d.quoteVolume));
    }

    const favIcon  = (isB || fav) ? '★' : '☆';
    const favCls   = (isB || fav) ? 'active' : '';
    const favClick = isB ? '' : `onclick="toggleFav('${sym}')"`;
    const favTitle = isB ? 'Default pair' : (fav ? 'Remove from watchlist' : 'Add to watchlist');

    return `
      <div class="crypto-row">
        <span class="cr-ticker">${displayTicker(sym)}</span>
        <span class="cr-price">${priceStr}</span>
        <span class="cr-change ${changeCls}">${changeStr}</span>
        <span class="cr-vol">${volStr}</span>
        <span class="cr-fav ${favCls}" ${favClick} title="${favTitle}">${favIcon}</span>
      </div>`;
  }).join('');

  // Timestamp
  const rz = new Date(new Date().toLocaleString('en-US', { timeZone: TZ }));
  document.getElementById('watchlist-refresh').textContent =
    `UPDATED ${pad(rz.getHours())}:${pad(rz.getMinutes())}:${pad(rz.getSeconds())}`;
}

// ── Binance API fetch ─────────────────────────────────────────────────────────
async function fetchWatchlist() {
  const symbols = getWatchlistSymbols();
  const param   = encodeURIComponent(JSON.stringify(symbols));
  try {
    const resp = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbols=${param}`);
    if (!resp.ok) throw new Error(resp.status);
    renderWatchlist(await resp.json());
    _setWlStatus('green', 'LIVE · BINANCE');
  } catch (e) {
    _setWlStatus('amber', 'RETRYING…');
    renderWatchlist([]);
  }
}

function _setWlStatus(color, label) {
  document.getElementById('wl-status-dot').className    = `status-dot dot-${color}`;
  document.getElementById('wl-status-label').textContent = label;
}

function startWatchlistPolling() {
  clearInterval(wlInterval);
  fetchWatchlist();
  wlInterval = setInterval(fetchWatchlist, 15000);
}

// ── Pair browser modal ────────────────────────────────────────────────────────
function openModal() {
  document.getElementById('modal-overlay').classList.add('open');
  document.getElementById('modal-search').focus();
  if (!pairsLoaded) _fetchAllPairs();
  else renderModalList();
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.getElementById('modal-search').value = '';
}

async function _fetchAllPairs() {
  document.getElementById('modal-load-state').textContent = 'LOADING ALL PAIRS…';
  try {
    const resp = await fetch('https://api.binance.com/api/v3/ticker/24hr');
    if (!resp.ok) throw new Error(resp.status);
    const data = await resp.json();
    allPairs    = data
      .filter(d => d.symbol.endsWith('USDT'))
      .sort((a, b) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume));
    pairsLoaded = true;
    document.getElementById('modal-load-state').textContent =
      `${allPairs.length} USDT PAIRS LOADED`;
    renderModalList();
  } catch (e) {
    document.getElementById('modal-load-state').textContent = 'FAILED TO LOAD — RETRY';
    document.getElementById('modal-pairs-list').innerHTML =
      `<div class="loading-row" style="padding:20px 0;color:var(--amber)">● API ERROR</div>`;
  }
}

/** Re-render the modal list, filtered by the search input. */
function filterPairs() { renderModalList(); }

function renderModalList() {
  const q    = (document.getElementById('modal-search').value || '').trim().toUpperCase();
  const list = q
    ? allPairs.filter(d => d.symbol.includes(q) || displayTicker(d.symbol).includes(q))
    : allPairs;

  const container = document.getElementById('modal-pairs-list');

  if (!list.length) {
    container.innerHTML =
      `<div class="loading-row" style="padding:16px 0;color:var(--muted)">NO PAIRS MATCH "${q}"</div>`;
    return;
  }

  let html = list.slice(0, 200).map(d => {
    const sym  = d.symbol;
    const chg  = parseFloat(d.priceChangePercent);
    const chgS = (chg >= 0 ? '+' : '') + chg.toFixed(2) + '%';
    const fav  = isFav(sym);
    return `
      <div class="modal-pair-row">
        <span class="mp-sym">${displayTicker(sym)}</span>
        <span class="mp-price">${formatPrice(d.lastPrice)}</span>
        <span class="mp-chg ${chg > 0 ? 'pos' : chg < 0 ? 'neg' : 'neu'}">${chgS}</span>
        <span class="mp-vol">${formatVol(parseFloat(d.quoteVolume))}</span>
        <span class="mp-fav ${fav ? 'active' : ''}" onclick="modalToggleFav('${sym}')">${fav ? '★' : '☆'}</span>
      </div>`;
  }).join('');

  if (list.length > 200) {
    html += `<div class="loading-row" style="padding:10px 0;color:var(--muted)">
               + ${list.length - 200} more — refine your search
             </div>`;
  }
  container.innerHTML = html;
}

function modalToggleFav(symbol) {
  if (BASE_SYMBOLS.includes(symbol)) return; // default pairs are always shown
  toggleFav(symbol);
  startWatchlistPolling(); // restart poll with updated symbol list
}
