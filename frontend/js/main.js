/**
 * main.js — application bootstrap and global event wiring.
 * Loaded last; all other modules are already in scope.
 */

// ── Overlay / modal helpers ───────────────────────────────────────────────────
/**
 * Close whichever modal the user clicked the dark backdrop of.
 * Each overlay's onclick passes its own id so we can dispatch correctly.
 */
function handleOverlayClick(event, overlayId) {
  if (event.target.id !== overlayId) return;
  if (overlayId === 'modal-overlay')      closeModal();
  if (overlayId === 'prio-modal-overlay') closePrioModal();
  if (overlayId === 'add-prio-overlay')   closeAddPrio();
}

// ── Global keyboard shortcuts ─────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    closePrioModal();
    closeAddPrio();
  }
  // Enter to save in priority modals (not textarea)
  if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
    if (document.getElementById('prio-modal-overlay').classList.contains('open')) savePrioDetail();
    if (document.getElementById('add-prio-overlay').classList.contains('open'))   saveAddPrio();
  }
});

// ── Header helpers ────────────────────────────────────────────────────────────
function updateHeaderSync() {
  const rz = new Date(new Date().toLocaleString('en-US', { timeZone: TZ }));
  document.getElementById('hb-sync').textContent =
    `◌ REFRESH \u00a0 SYNCED ${pad(rz.getHours())}:${pad(rz.getMinutes())}`;
}

/** Manual refresh button — re-fetches all live data immediately. */
function refreshAll() {
  fetchWatchlist();
  fetchFearGreed();
  fetchNews();
  updateHeaderSync();

  // Brief visual flash on the sync label
  const el = document.getElementById('hb-sync');
  el.style.color = 'var(--text)';
  setTimeout(() => { el.style.color = ''; }, 600);
}

// ── Bootstrap ─────────────────────────────────────────────────────────────────
(function init() {
  // Theme (reads localStorage, applies CSS vars — must be first)
  loadTheme();

  // Persistent state
  loadFavs();
  loadPriorities();

  // Initial renders
  renderPriorityQueue();

  // Clock — tick immediately, then every second
  tickClock();
  setInterval(tickClock, 1000);

  // Live data — fetch immediately, then on schedule
  startWatchlistPolling();          // polls every 15 s internally
  fetchFearGreed();
  fetchNews();

  setInterval(fetchNews,        5 * 60 * 1000);   // every 5 min
  setInterval(fetchFearGreed,  10 * 60 * 1000);   // every 10 min
  setInterval(updateHeaderSync,      60 * 1000);   // every 1 min

  updateHeaderSync();
})();
