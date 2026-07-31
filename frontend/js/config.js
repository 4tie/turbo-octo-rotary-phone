/**
 * config.js — application-wide constants.
 * Loaded first; all other modules depend on these.
 */

const USER_NAME    = '4tie';
const CITY         = 'Riyadh';
const TZ           = 'Asia/Riyadh';
const TZ_LABEL     = 'UTC+3';

// Binance pairs always shown in the watchlist
const BASE_SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT'];

// localStorage keys
const FAV_KEY   = 'ztie_fav_pairs_v2';
const PQ_KEY    = 'ztie_priorities_v1';
const THEME_KEY = 'ztie_theme_v1';
