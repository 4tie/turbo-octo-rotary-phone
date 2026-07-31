/**
 * clock.js — live clock and greeting section.
 * tickClock() is called every second from main.js.
 */

const WEEKDAYS = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
const MONTHS   = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

/** Update all time-sensitive DOM nodes to reflect the current Riyadh time. */
function tickClock() {
  // Convert wall-clock time to the user's timezone
  const rzStr = new Date().toLocaleString('en-US', { timeZone: TZ });
  const rz    = new Date(rzStr);
  const h = rz.getHours(), m = rz.getMinutes(), s = rz.getSeconds();

  // Live clock
  document.getElementById('live-clock').textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
  document.getElementById('clock-meta').textContent  =
    `SYNCED ${pad(h)}:${pad(m)} · ${TZ_LABEL} · ${CITY.toUpperCase()}`;

  // Greeting
  document.getElementById('g-prefix').textContent = getGreeting(h);

  // Date metadata row
  const wd  = WEEKDAYS[rz.getDay()];
  const dd  = pad(rz.getDate());
  const mon = MONTHS[rz.getMonth()];
  const yr  = rz.getFullYear();
  document.getElementById('greeting-date').textContent =
    `${wd}, ${dd} ${mon} ${yr} · DAY ${getDayOfYear(rz)} / 365 · WK ${getWeekNum(rz)}`;
}
