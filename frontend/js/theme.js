/**
 * theme.js — runtime theme switching.
 * Mutates CSS custom properties on :root so every colour reference
 * (var(--bg) etc.) updates instantly across the whole page.
 */

const THEMES = {
  NAVY: {
    label: 'NAVY',
    '--bg':                 '#080b14',
    '--panel-bg':           '#0c0f1c',
    '--border':             '#181c30',
    '--header-bg':          '#05070f',
    '--text':               '#c4cce6',
    '--muted':              '#434970',
    '--green':              '#38b890',
    '--red':                '#d44040',
    '--amber':              '#c49930',
    '--blue':               '#3b7fd4',
    '--panel-hover-border': '#2e3250',
  },
  EMBER: {
    label: 'EMBER',
    '--bg':                 '#1a1815',
    '--panel-bg':           '#1e1c18',
    '--border':             '#2b2820',
    '--header-bg':          '#141210',
    '--text':               '#e2d5bc',
    '--muted':              '#7a6f5e',
    '--green':              '#5c9e5c',
    '--red':                '#c44a3a',
    '--amber':              '#c49a2a',
    '--blue':               '#7a9e9e',
    '--panel-hover-border': '#3a3530',
  },
  FOREST: {
    label: 'FOREST',
    '--bg':                 '#060f0a',
    '--panel-bg':           '#091410',
    '--border':             '#102418',
    '--header-bg':          '#040a06',
    '--text':               '#b8d4c2',
    '--muted':              '#3a5a46',
    '--green':              '#4abc7a',
    '--red':                '#d44a3a',
    '--amber':              '#c4992a',
    '--blue':               '#3a8fa0',
    '--panel-hover-border': '#1a3828',
  },
  VIOLET: {
    label: 'VIOLET',
    '--bg':                 '#0b080f',
    '--panel-bg':           '#110d18',
    '--border':             '#1e1628',
    '--header-bg':          '#07050a',
    '--text':               '#ccc0e0',
    '--muted':              '#5a4870',
    '--green':              '#6ab890',
    '--red':                '#d44060',
    '--amber':              '#c49930',
    '--blue':               '#8060d4',
    '--panel-hover-border': '#2e2040',
  },
};

const THEME_ORDER = ['NAVY', 'EMBER', 'FOREST', 'VIOLET'];
let currentThemeIdx = 0;

/** Read saved theme from localStorage and apply it (no animation on load). */
function loadTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const idx   = THEME_ORDER.indexOf(saved);
  currentThemeIdx = idx >= 0 ? idx : 0;
  applyTheme(false);
}

/** Write all CSS variables for the current theme onto :root. */
function applyTheme(animate = true) {
  const key   = THEME_ORDER[currentThemeIdx];
  const theme = THEMES[key];
  const root  = document.documentElement;

  Object.entries(theme).forEach(([prop, value]) => {
    if (prop !== 'label') root.style.setProperty(prop, value);
  });

  localStorage.setItem(THEME_KEY, key);

  if (animate) {
    const btn = document.getElementById('theme-btn');
    btn.textContent = `${CITY.toUpperCase()} ⬡`;
    btn.classList.add('flash');
    setTimeout(() => btn.classList.remove('flash'), 500);
  }
}

/** Advance to the next theme in the cycle. Called by the header button. */
function cycleTheme() {
  currentThemeIdx = (currentThemeIdx + 1) % THEME_ORDER.length;
  applyTheme(true);
}
