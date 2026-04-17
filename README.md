# NS3DW Glossary Module — Drop-In Package

**What this is:** a self-contained glossary system that lives inside your dashboard. Click any marked acronym → slide-out panel opens → definition shown. Or navigate to the full Glossary page in the sidebar for searching/filtering all terms.

---

## Files in this package

| File | Purpose |
|------|---------|
| `glossary.json` | The single source of truth. 133 terms, 8 categories, 34 with source URLs. Edit this file to add/change terms. |
| `glossary.js` | The glossary engine. Loads the JSON, handles panel, full-page view, highlight animation, click wiring. |
| `glossary.css` | Styles matching your dark green/orange/yellow theme. |
| `ns3dw-dashboard-INTEGRATED.html` | Your dashboard, updated with a new "Glossary" sidebar item, view container, script/style loaders, and 4–5 example `linkTerm()` wirings so the feature is visible on first load. |

---

## How to deploy

1. Commit all four files to the root of your `ns3dw-dashboard` GitHub repo (replacing the existing dashboard HTML).
2. Push. If you're using GitHub Pages / Cloudflare Pages, it'll redeploy automatically.
3. Open the dashboard. You should see:
   - A new **📖 Glossary** item at the bottom of the sidebar.
   - The word "FRG" in the FRG Orders KPI is now clickable (yellow dashed underline).
   - The "Drop PDF, image, or CSV" caption in the Purchases drop zone has two clickable terms.

---

## How to use `linkTerm()` going forward

Anywhere you build HTML in JavaScript, wrap an acronym in `Glossary.linkTerm()`:

```javascript
// Before
html = `<td>Your ${order.Status} API call failed</td>`;

// After
html = `<td>Your ${order.Status} ${Glossary.linkTerm('API')} call failed</td>`;
```

The `linkTerm()` function:
- Returns HTML wrapping the term in a `.gl-term` span
- Looks up the term case-insensitively against the term name AND any aliases
- If the term is NOT in `glossary.json`, it renders with a red `(?)` so you know to add it

You can also override the display text:

```javascript
Glossary.linkTerm('API', 'application interface')
// → Underlined "application interface" that opens to the API definition
```

---

## How to add a new term

Open `glossary.json` and add an entry to the `terms` array:

```json
{
  "term": "VPS",
  "expansion": "Virtual Private Server",
  "category": "infra",
  "definition": "A chunk of a physical server rented out to you...",
  "sources": [
    { "label": "DigitalOcean docs", "url": "https://docs.digitalocean.com" }
  ]
}
```

**Fields:**
- `term` (required) — the canonical name shown in the UI
- `expansion` (optional) — what the acronym stands for, shown in italics
- `aliases` (optional) — array of other names that should resolve to this entry
- `category` (required) — one of: `printing`, `web`, `business`, `data`, `infra`, `security`, `personal`, `tools`
- `definition` (required) — plain-English explanation
- `sources` (optional) — array of `{ label, url }` pairs, shown behind the (i) icon

Alphabetical ordering in the JSON file doesn't matter — the UI sorts and groups by letter automatically.

---

## How the pieces talk to each other

```
┌─────────────┐         ┌──────────────┐        ┌────────────────┐
│ glossary    │ fetched │ glossary.js  │ renders│ slide-out      │
│ .json       │◄────────┤ (engine)     │───────►│ panel + full   │
│ (data)      │         │              │        │ page view      │
└─────────────┘         └──────┬───────┘        └────────────────┘
                               │ provides
                               ▼
                        Glossary.linkTerm(name)
                               │
                               ▼
                   <span class="gl-term"> in dashboard HTML
                               │
                               ▼
                        click → opens panel
```

- Dashboard calls `Glossary.linkTerm('XYZ')` anywhere it wants a clickable acronym
- Panel listens globally for clicks on `.gl-term` elements
- Full-page view listens for the `glossary:open-full-page` custom event (fired from the panel's footer button)
- All state (current filter, current search) lives in the engine, not in the dashboard

---

## Adding more `linkTerm()` wirings

Open `ns3dw-dashboard-INTEGRATED.html` and find the script block near the bottom labeled `Wire up a small number of example linkTerm() usages`. Extend the `wireGlossaryExamples()` function with additional targeted selectors:

```javascript
// Example: make every "KPI" in a header clickable
document.querySelectorAll('h3.section-title').forEach(el => {
  if (el.dataset.glWired) return;
  if (el.textContent.includes('KPI')) {
    el.innerHTML = el.textContent.replace(/KPI/g, Glossary.linkTerm('KPI'));
    el.dataset.glWired = '1';
  }
});
```

The `dataset.glWired` marker prevents double-wiring when views re-render.

---

## Keyboard / accessibility

- **Esc** closes the panel
- **Enter / Space** on a focused `.gl-term` opens the panel (same as click)
- Each `.gl-term` is `tabindex="0"` and `role="button"`
- Every (i) sources button has `aria-label` describing what it does

---

## Troubleshooting

**Nothing happens when I click a marked term.**
Check the browser console. The most likely culprit: `glossary.json` isn't being served (wrong path, 404). The engine falls back silently to an empty glossary — so every term will render with the red `(?)` marker.

**I added a term to glossary.json but the (?) is still there.**
Hard reload (Ctrl+Shift+R / Cmd+Shift+R). Browsers aggressively cache JSON files.

**The slide-out panel looks wrong against my theme.**
Edit the `:root` block at the top of `glossary.css`. The colors are all CSS variables — you can re-theme without touching the logic.

**I moved glossary.json to a subfolder.**
Change the fetch URL:
```javascript
Glossary.load('/path/to/glossary.json');
```

---

## Future: moving this into your own backend

Right now `glossary.json` is served as a static file alongside your dashboard. When you eventually run your own server (VPS / Node / Postgres), you have two options:

1. **Keep it static** — simplest. The glossary is reference data, it doesn't change often, and a static JSON file is trivially fast.
2. **Move it to the database** — if you want multiple people contributing terms, or an admin UI for editing. At that point, swap `Glossary.load('glossary.json')` for `Glossary.load('/api/glossary')` and build an admin page.

No rush — static is fine until you have a reason to change.
