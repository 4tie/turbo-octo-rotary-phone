/**
 * priorities.js — Priority Queue panel.
 * Manages the list state in localStorage and renders it into #priority-list.
 * Handles the detail-edit modal and the add-new modal.
 */

// ── Default data ──────────────────────────────────────────────────────────────
const DEFAULT_PRIORITIES = [
  {
    id:      1000,
    text:    'Finish building strategy for trading',
    tag:     'STRATEGY',
    notes:   '',
    done:    false,
    created: Date.now() - 86400000 * 2,
  },
  {
    id:      1001,
    text:    'Backtest and validate edge',
    tag:     'RESEARCH',
    notes:   '',
    done:    false,
    created: Date.now() - 86400000,
  },
  {
    id:      1002,
    text:    'Define risk & position sizing rules',
    tag:     'RISK',
    notes:   '',
    done:    false,
    created: Date.now(),
  },
];

// ── Module state ──────────────────────────────────────────────────────────────
let priorities    = [];
let editingPrioId = null;
let editingStatus = 'active';

// ── Persistence ───────────────────────────────────────────────────────────────
function loadPriorities() {
  try {
    const saved = localStorage.getItem(PQ_KEY);
    priorities  = saved
      ? JSON.parse(saved)
      : JSON.parse(JSON.stringify(DEFAULT_PRIORITIES));
  } catch {
    priorities = JSON.parse(JSON.stringify(DEFAULT_PRIORITIES));
  }
}

function savePriorities() {
  localStorage.setItem(PQ_KEY, JSON.stringify(priorities));
}

// ── Rendering ─────────────────────────────────────────────────────────────────
function renderPriorityQueue() {
  const container = document.getElementById('priority-list');

  // Active items newest-first, then done items newest-first
  const active = priorities.filter(p => !p.done).sort((a, b) => b.created - a.created);
  const done   = priorities.filter(p =>  p.done).sort((a, b) => b.created - a.created);
  const sorted = [...active, ...done];

  // Update panel header counter
  document.getElementById('pq-count').textContent = `${active.length} ACTIVE`;
  document.getElementById('pq-dot').className =
    active.length > 0 ? 'status-dot dot-green' : 'status-dot dot-muted';

  if (!sorted.length) {
    container.innerHTML = `<div class="pq-empty">NO ITEMS — CLICK ⊕ ADD TO BEGIN</div>`;
    return;
  }

  container.innerHTML = sorted.map(p => {
    const checkedCls = p.done ? 'checked' : '';
    const doneCls    = p.done ? 'done'    : '';
    const checkIcon  = p.done ? '✓'       : '';

    return `
      <div class="priority-row ${doneCls}" data-id="${p.id}">
        <button class="p-check-btn ${checkedCls}"
                onclick="togglePrioDone(event, ${p.id})"
                title="${p.done ? 'Mark active' : 'Mark done'}">${checkIcon}</button>
        <div class="p-body" onclick="openPrioDetail(${p.id})">
          <span class="p-text">${escHtml(p.text)}</span>
          <span class="p-tag">${escHtml(p.tag)}</span>
        </div>
        <span class="p-chevron" onclick="openPrioDetail(${p.id})">›</span>
      </div>`;
  }).join('');
}

// ── Checkbox toggle ───────────────────────────────────────────────────────────
function togglePrioDone(event, id) {
  event.stopPropagation();
  const p = priorities.find(x => x.id === id);
  if (!p) return;
  p.done = !p.done;
  savePriorities();
  renderPriorityQueue();
}

// ── Detail / edit modal ───────────────────────────────────────────────────────
function openPrioDetail(id) {
  const p = priorities.find(x => x.id === id);
  if (!p) return;

  editingPrioId = id;
  editingStatus = p.done ? 'done' : 'active';

  document.getElementById('prio-modal-title').textContent = `// PRIORITY · ${p.tag}`;
  document.getElementById('pm-text').value  = p.text;
  document.getElementById('pm-tag').value   = p.tag;
  document.getElementById('pm-notes').value = p.notes || '';

  const dateStr = new Date(p.created).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
  document.getElementById('pm-created').textContent = `CREATED ${dateStr.toUpperCase()}`;

  _updateStatusButtons(editingStatus);
  document.getElementById('prio-modal-overlay').classList.add('open');
  document.getElementById('pm-text').focus();
}

function closePrioModal() {
  document.getElementById('prio-modal-overlay').classList.remove('open');
  editingPrioId = null;
}

function setPrioStatus(status) {
  editingStatus = status;
  _updateStatusButtons(status);
}

function _updateStatusButtons(status) {
  document.getElementById('pm-btn-active').className =
    'pm-status-btn' + (status === 'active' ? ' active-state' : '');
  document.getElementById('pm-btn-done').className =
    'pm-status-btn' + (status === 'done'   ? ' done-state'   : '');
}

function savePrioDetail() {
  const p = priorities.find(x => x.id === editingPrioId);
  if (!p) return;

  const text = document.getElementById('pm-text').value.trim();
  if (!text) { document.getElementById('pm-text').focus(); return; }

  p.text  = text;
  p.tag   = document.getElementById('pm-tag').value;
  p.notes = document.getElementById('pm-notes').value.trim();
  p.done  = editingStatus === 'done';

  savePriorities();
  renderPriorityQueue();
  closePrioModal();
}

function deletePrioFromModal() {
  if (!editingPrioId) return;
  priorities = priorities.filter(x => x.id !== editingPrioId);
  savePriorities();
  renderPriorityQueue();
  closePrioModal();
}

// ── Add-new modal ─────────────────────────────────────────────────────────────
function openAddPrio() {
  document.getElementById('add-pm-text').value  = '';
  document.getElementById('add-pm-tag').value   = 'STRATEGY';
  document.getElementById('add-pm-notes').value = '';
  document.getElementById('add-prio-overlay').classList.add('open');
  document.getElementById('add-pm-text').focus();
}

function closeAddPrio() {
  document.getElementById('add-prio-overlay').classList.remove('open');
}

function saveAddPrio() {
  const text = document.getElementById('add-pm-text').value.trim();
  if (!text) { document.getElementById('add-pm-text').focus(); return; }

  priorities.unshift({
    id:      Date.now(),
    text,
    tag:     document.getElementById('add-pm-tag').value,
    notes:   document.getElementById('add-pm-notes').value.trim(),
    done:    false,
    created: Date.now(),
  });

  savePriorities();
  renderPriorityQueue();
  closeAddPrio();
}
