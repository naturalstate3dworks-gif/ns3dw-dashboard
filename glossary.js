/**
 * NS3DW Glossary Module
 * ---------------------
 * Single source of truth: glossary.json
 *
 * Public API:
 *   Glossary.load()                   → loads glossary.json, returns promise
 *   Glossary.linkTerm(termName, text) → returns HTML for an auto-linked acronym
 *                                       (use in marked-up spots, not everywhere)
 *   Glossary.openPanel(termName?)     → opens the slide-out panel; if term given, scrolls/highlights it
 *   Glossary.closePanel()             → closes the slide-out panel
 *   Glossary.renderFullPage(container)→ renders the full searchable glossary page inside a container
 *   Glossary.search(query)            → filters terms, returns matching array
 *
 * Anthony's rule: every term shown in the UI must be defined in glossary.json.
 * If you see a (?) icon, that means the term wasn't found — add it to the JSON.
 */
const Glossary = (function() {
  'use strict';

  let glossary = null;          // full JSON
  let termLookup = new Map();   // lowercase term/alias → canonical term entry

  // ---------- LOADING ----------
  async function load(url = 'glossary.json') {
    if (glossary) return glossary;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Glossary fetch failed: ${res.status}`);
      glossary = await res.json();
      buildLookup();
      return glossary;
    } catch (err) {
      console.error('[Glossary] load failed:', err);
      glossary = { version: 'fallback', categories: {}, terms: [] };
      return glossary;
    }
  }

  function buildLookup() {
    termLookup.clear();
    for (const entry of glossary.terms) {
      termLookup.set(entry.term.toLowerCase(), entry);
      if (entry.aliases) {
        for (const alias of entry.aliases) {
          termLookup.set(alias.toLowerCase(), entry);
        }
      }
    }
  }

  function findTerm(name) {
    if (!name) return null;
    return termLookup.get(name.toLowerCase()) || null;
  }

  // ---------- INLINE LINKING ----------
  /**
   * Wrap a term name in a clickable span. Use this in specific places you mark
   * in the HTML — NOT an auto-scanner. Safer and more controlled.
   *
   * Usage:
   *   innerHTML = `Your ${Glossary.linkTerm('API')} connection is healthy.`
   *   → "Your <span class='gl-term'>API</span> connection is healthy."
   */
  function linkTerm(name, displayText) {
    const entry = findTerm(name);
    const display = displayText || name;
    if (!entry) {
      // Term not in glossary — show (?) so we know to add it
      console.warn(`[Glossary] unknown term: "${name}"`);
      return `<span class="gl-term gl-term-missing" title="Term not in glossary — add it to glossary.json">${escapeHtml(display)} <sup>?</sup></span>`;
    }
    return `<span class="gl-term" data-gl-term="${escapeHtml(entry.term)}" role="button" tabindex="0" title="Click for definition">${escapeHtml(display)}</span>`;
  }

  // ---------- SLIDE-OUT PANEL ----------
  function ensurePanel() {
    if (document.getElementById('gl-panel')) return;
    const panel = document.createElement('aside');
    panel.id = 'gl-panel';
    panel.className = 'gl-panel';
    panel.innerHTML = `
      <header class="gl-panel-header">
        <div class="gl-panel-title">
          <span class="gl-panel-icon">📖</span>
          <span>Glossary</span>
        </div>
        <button class="gl-panel-close" aria-label="Close glossary" onclick="Glossary.closePanel()">×</button>
      </header>
      <div class="gl-panel-search">
        <input type="text" id="gl-panel-search-input" placeholder="Search terms..." oninput="Glossary._onPanelSearch(this.value)" />
      </div>
      <div class="gl-panel-body" id="gl-panel-body"></div>
      <footer class="gl-panel-footer">
        <button class="gl-btn-full" onclick="Glossary.openFullPage()">Open full glossary →</button>
      </footer>
    `;
    document.body.appendChild(panel);

    // Backdrop
    const backdrop = document.createElement('div');
    backdrop.id = 'gl-backdrop';
    backdrop.className = 'gl-backdrop';
    backdrop.onclick = closePanel;
    document.body.appendChild(backdrop);

    // ESC key closes
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && panel.classList.contains('gl-panel-open')) closePanel();
    });

    // Click handler for auto-linked terms anywhere in the dashboard
    document.addEventListener('click', e => {
      const el = e.target.closest('.gl-term[data-gl-term]');
      if (el) {
        e.preventDefault();
        openPanel(el.dataset.glTerm);
      }
    });

    // Keyboard handler for auto-linked terms (Enter/Space)
    document.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const el = e.target.closest && e.target.closest('.gl-term[data-gl-term]');
      if (el) {
        e.preventDefault();
        openPanel(el.dataset.glTerm);
      }
    });
  }

  function openPanel(termName) {
    ensurePanel();
    const panel = document.getElementById('gl-panel');
    const backdrop = document.getElementById('gl-backdrop');
    panel.classList.add('gl-panel-open');
    backdrop.classList.add('gl-backdrop-open');
    renderPanelBody(termName);
    // Focus search after animation
    setTimeout(() => {
      const searchInput = document.getElementById('gl-panel-search-input');
      if (searchInput && !termName) searchInput.focus();
    }, 280);
  }

  function closePanel() {
    const panel = document.getElementById('gl-panel');
    const backdrop = document.getElementById('gl-backdrop');
    if (panel) panel.classList.remove('gl-panel-open');
    if (backdrop) backdrop.classList.remove('gl-backdrop-open');
  }

  function renderPanelBody(termName) {
    const body = document.getElementById('gl-panel-body');
    if (!body) return;
    const entry = termName ? findTerm(termName) : null;

    if (entry) {
      // Show single term, highlighted
      body.innerHTML = renderEntryHtml(entry, { highlighted: true });
      // Highlight animation
      setTimeout(() => {
        const card = body.querySelector('.gl-entry');
        if (card) {
          card.classList.add('gl-entry-highlight');
          setTimeout(() => card.classList.remove('gl-entry-highlight'), 2400);
        }
      }, 50);
    } else {
      // Show full alphabetized list
      renderPanelList('');
    }
  }

  function renderPanelList(query) {
    const body = document.getElementById('gl-panel-body');
    if (!body) return;
    const filtered = search(query);
    if (filtered.length === 0) {
      body.innerHTML = `<div class="gl-empty">No terms match "${escapeHtml(query)}".</div>`;
      return;
    }
    const grouped = groupByFirstLetter(filtered);
    let html = '';
    for (const letter of Object.keys(grouped).sort()) {
      html += `<h3 class="gl-letter">${letter}</h3>`;
      for (const entry of grouped[letter]) {
        html += renderEntryHtml(entry);
      }
    }
    body.innerHTML = html;
  }

  function _onPanelSearch(query) {
    renderPanelList(query);
  }

  // ---------- FULL-PAGE VIEW ----------
  function openFullPage() {
    // Emits a custom event the dashboard can listen for to switch to the glossary view
    closePanel();
    const evt = new CustomEvent('glossary:open-full-page');
    document.dispatchEvent(evt);
  }

  /**
   * Render the full glossary page inside the given container element.
   * Called by the dashboard when the Glossary nav item is activated.
   */
  function renderFullPage(container, initialTermName) {
    if (!glossary) {
      container.innerHTML = '<div class="gl-empty">Glossary loading…</div>';
      return;
    }
    const cats = glossary.categories || {};
    container.innerHTML = `
      <div class="gl-fullpage">
        <div class="gl-fullpage-header">
          <h2>Glossary</h2>
          <p class="gl-subtitle">Every acronym and technical term used across NS3DW. Click any term in the dashboard to jump here.</p>
          <div class="gl-fullpage-controls">
            <input type="text" id="gl-fullpage-search" class="gl-search-input" placeholder="Search ${glossary.terms.length} terms..." />
            <div class="gl-filters" id="gl-filters">
              <button class="gl-chip gl-chip-active" data-cat="">All (${glossary.terms.length})</button>
              ${Object.entries(cats).map(([key, label]) => {
                const n = glossary.terms.filter(t => t.category === key).length;
                return `<button class="gl-chip" data-cat="${key}">${label} (${n})</button>`;
              }).join('')}
            </div>
          </div>
        </div>
        <div class="gl-fullpage-body" id="gl-fullpage-body"></div>
      </div>
    `;
    const searchInput = container.querySelector('#gl-fullpage-search');
    const filters = container.querySelector('#gl-filters');
    const body = container.querySelector('#gl-fullpage-body');
    let activeCat = '';
    let activeQuery = '';

    function rerender() {
      const filtered = search(activeQuery, activeCat);
      if (filtered.length === 0) {
        body.innerHTML = `<div class="gl-empty">No terms match your filter.</div>`;
        return;
      }
      const grouped = groupByFirstLetter(filtered);
      let html = '';
      for (const letter of Object.keys(grouped).sort()) {
        html += `<h3 class="gl-letter" id="gl-letter-${letter}">${letter}</h3>`;
        for (const entry of grouped[letter]) {
          html += renderEntryHtml(entry);
        }
      }
      body.innerHTML = html;
    }

    searchInput.addEventListener('input', e => {
      activeQuery = e.target.value;
      rerender();
    });

    filters.addEventListener('click', e => {
      const btn = e.target.closest('.gl-chip');
      if (!btn) return;
      filters.querySelectorAll('.gl-chip').forEach(b => b.classList.remove('gl-chip-active'));
      btn.classList.add('gl-chip-active');
      activeCat = btn.dataset.cat;
      rerender();
    });

    rerender();

    // If opened with a specific term, scroll and highlight
    if (initialTermName) {
      const entry = findTerm(initialTermName);
      if (entry) {
        setTimeout(() => {
          const el = document.getElementById('gl-entry-' + entryId(entry));
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.classList.add('gl-entry-highlight');
            setTimeout(() => el.classList.remove('gl-entry-highlight'), 2400);
          }
        }, 100);
      }
    }
  }

  // ---------- SEARCH ----------
  function search(query, categoryFilter) {
    if (!glossary) return [];
    const q = (query || '').trim().toLowerCase();
    return glossary.terms.filter(entry => {
      if (categoryFilter && entry.category !== categoryFilter) return false;
      if (!q) return true;
      if (entry.term.toLowerCase().includes(q)) return true;
      if (entry.expansion && entry.expansion.toLowerCase().includes(q)) return true;
      if (entry.definition.toLowerCase().includes(q)) return true;
      if (entry.aliases && entry.aliases.some(a => a.toLowerCase().includes(q))) return true;
      return false;
    }).sort((a, b) => a.term.localeCompare(b.term));
  }

  function groupByFirstLetter(terms) {
    const out = {};
    for (const entry of terms) {
      const letter = entry.term[0].toUpperCase().replace(/[^A-Z]/, '#');
      if (!out[letter]) out[letter] = [];
      out[letter].push(entry);
    }
    for (const k of Object.keys(out)) {
      out[k].sort((a, b) => a.term.localeCompare(b.term));
    }
    return out;
  }

  // ---------- RENDERING ENTRIES ----------
  function entryId(entry) {
    return entry.term.toLowerCase().replace(/[^a-z0-9]/g, '-');
  }

  function renderEntryHtml(entry) {
    const id = 'gl-entry-' + entryId(entry);
    const catLabel = (glossary.categories && glossary.categories[entry.category]) || entry.category;
    const hasSources = entry.sources && entry.sources.length > 0;
    const aliasesHtml = entry.aliases && entry.aliases.length
      ? `<span class="gl-aliases">aka ${entry.aliases.map(a => `<code>${escapeHtml(a)}</code>`).join(', ')}</span>`
      : '';
    const expansionHtml = entry.expansion
      ? `<span class="gl-expansion">(${escapeHtml(entry.expansion)})</span>`
      : '';
    const sourcesBtn = hasSources
      ? `<button class="gl-sources-btn" data-entry="${entryId(entry)}" title="Show sources" aria-label="Show sources for ${escapeHtml(entry.term)}">ⓘ</button>`
      : '';
    const sourcesList = hasSources
      ? `<div class="gl-sources" id="gl-sources-${entryId(entry)}" hidden>
          <strong>Sources:</strong>
          <ul>${entry.sources.map(s => `<li><a href="${escapeHtml(s.url)}" target="_blank" rel="noopener">${escapeHtml(s.label)}</a></li>`).join('')}</ul>
        </div>`
      : '';
    return `
      <article class="gl-entry" id="${id}">
        <header class="gl-entry-header">
          <h4 class="gl-entry-term">
            ${escapeHtml(entry.term)}
            ${expansionHtml}
            ${sourcesBtn}
          </h4>
          <span class="gl-cat-badge gl-cat-${entry.category}">${escapeHtml(catLabel)}</span>
        </header>
        ${aliasesHtml}
        <p class="gl-def">${escapeHtml(entry.definition)}</p>
        ${sourcesList}
      </article>
    `;
  }

  // Delegated click for (i) source buttons (slide-out + full page)
  document.addEventListener('click', e => {
    const btn = e.target.closest('.gl-sources-btn');
    if (!btn) return;
    const id = btn.dataset.entry;
    const list = document.getElementById('gl-sources-' + id);
    if (list) {
      list.hidden = !list.hidden;
      btn.classList.toggle('gl-sources-btn-active', !list.hidden);
    }
  });

  // ---------- UTILS ----------
  function escapeHtml(s) {
    if (s == null) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ---------- PUBLIC API ----------
  return {
    load,
    linkTerm,
    openPanel,
    closePanel,
    openFullPage,
    renderFullPage,
    search,
    findTerm,
    _onPanelSearch,
    get data() { return glossary; }
  };
})();

// Auto-load on DOM ready if glossary.json is in the same directory
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Glossary.load());
} else {
  Glossary.load();
}
