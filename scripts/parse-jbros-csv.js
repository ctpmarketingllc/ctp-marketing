// scripts/parse-jbros-csv.js
// Parse J Bros Lures dealer price sheet CSV into jbros-catalog.js.
// CSV layout: single header row, then SKU rows with UPC + Product Description,
// blank rows between product groups. Each description embeds product line, size,
// color, and pack quantity ("... Quantity 8" or "... Qty 8").

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CSV_PATH = path.join(ROOT, 'J Bros Lures Dealer Price Sheet 2026.csv');
const OUT_PATH = path.join(ROOT, 'jbros-catalog.js');

// Product-line PREFIXES the description must startWith (case-insensitive).
// Order matters: longer/more specific prefixes first so they win when a
// shorter prefix would also match (e.g. "Grub 3 Inch" before bare "Grub").
const LINES = [
  { prefix: 'BFW 10" Trifinity',           key: 'bfw_10',                label: 'BFW 10" Trifinity Worm' },
  { prefix: 'Trifinity 6 Inch Plastic Worm', key: 'trifinity_6',         label: 'Trifinity 6" Plastic Worm' },
  { prefix: 'Sentinel Tube 4 Inch',        key: 'sentinel_tube_4',       label: 'Sentinel Tube 4"' },
  { prefix: 'Sentinel Tube 2.875"',        key: 'sentinel_tube_2_875',   label: 'Sentinel Tube 2.875"' },
  { prefix: 'Jester 4.25"',                key: 'jester_425',            label: 'Jester 4.25"' },
  { prefix: 'Jester 3 inch',               key: 'jester_3',              label: 'Jester 3"' },
  { prefix: 'Glider 5.5 Inch',             key: 'glider_55',             label: 'Glider 5.5"' },
  { prefix: 'Glider 3 inch',               key: 'glider_3',              label: 'Glider 3"' },
  { prefix: 'Haymaker 6.5 inch',           key: 'haymaker',              label: 'Haymaker 6.5"' },
  { prefix: 'Skinny Stick',                key: 'skinny_stick',          label: 'Skinny Stick' },
  { prefix: 'Stick Bait aka 5 inch Fatty', key: 'stick_bait_5',          label: 'Stick Bait 5"' },
  { prefix: 'Grub 3 Inch',                 key: 'grub_3',                label: 'Grub 3"' },
  { prefix: 'Grub 2 inch',                 key: 'grub_2',                label: 'Grub 2"' },
  { prefix: 'NED Double Trouble 3 inch',   key: 'ned_double_trouble',    label: 'NED Double Trouble 3"' },
  { prefix: 'NED Ball Point 3 inch',       key: 'ned_ball_point',        label: 'NED Ball Point 3"' },
  { prefix: 'Patriot 4 inch',              key: 'patriot',               label: 'Patriot 4"' },
  { prefix: 'Leech 4.25"',                 key: 'leech',                 label: 'Leech 4.25"' },
  { prefix: 'Ditch Lobster 4"',            key: 'ditch_lobster',         label: 'Ditch Lobster 4"' },
];

function parseLine(line) {
  const out = [];
  let cur = '', inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') { if (inQ && line[i+1] === '"') { cur += '"'; i++; } else inQ = !inQ; }
    else if (c === ',' && !inQ) { out.push(cur); cur = ''; }
    else cur += c;
  }
  out.push(cur);
  return out;
}

function parseDollar(s) {
  const n = parseFloat(String(s || '').replace(/[$,\s]/g, ''));
  return isNaN(n) ? 0 : n;
}

function classifyAndSplit(desc) {
  const hit = LINES.find(l => desc.toLowerCase().startsWith(l.prefix.toLowerCase()));
  if (!hit) return null;
  let rest = desc.slice(hit.prefix.length).trim();
  // Strip trailing "Quantity N" / "Qty N"
  const qm = rest.match(/^(.*?)\s+(Quantity|Qty)\s+(\d+)\s*$/i);
  let color = rest, pack = '';
  if (qm) { color = qm[1].trim(); pack = qm[3]; }
  return { key: hit.key, label: hit.label, color, pack };
}

const lines = fs.readFileSync(CSV_PATH, 'utf8').split(/\r?\n/);

const catalog = {};
const order = [];
let totalSkus = 0;

for (const line of lines) {
  const cols = parseLine(line);
  if (cols[0] !== '081011028') continue; // only product rows
  const upc  = (cols[2] || '').trim();
  const desc = (cols[4] || '').trim();
  const cost = parseDollar(cols[6]);
  if (!desc || !upc) continue;

  const c = classifyAndSplit(desc);
  if (!c) { console.error('UNCATEGORIZED:', desc); continue; }

  if (!catalog[c.key]) { catalog[c.key] = []; order.push({ key: c.key, label: c.label }); }
  catalog[c.key].push({
    sku: `JB-${upc}`,
    upc,
    desc,
    color: c.color,
    pack: c.pack,
    wholesale: cost,
  });
  totalSkus++;
}

function emit() {
  const parts = [];
  for (const cat of order) {
    parts.push(`  ${cat.key}: [`);
    for (const item of catalog[cat.key]) {
      const fields = [
        `sku:'${item.sku}'`,
        `upc:'${item.upc}'`,
        `desc:${JSON.stringify(item.desc)}`,
        `color:${JSON.stringify(item.color)}`,
        `pack:'${item.pack}'`,
        `wholesale:${item.wholesale}`,
      ].join(', ');
      parts.push(`    { ${fields} },`);
    }
    parts.push(`  ],`);
  }
  return parts.join('\n');
}

const out = `// ── J Bro's Lures catalog ────────────────────────────────────
// Source: J Bros Lures Dealer Price Sheet 2026 CSV
// Vendor: J Bro's Lures | 5672 Glena St, Louisville OH 44641 | 330-488-4026 | larry@jbroslures.com
// ${totalSkus} SKUs across ${order.length} product lines (35% off retail)
const jbrosCatalog = {
${emit()}
};

const jbrosCategories = [
${order.map(c => `  { key:'${c.key}', label:${JSON.stringify(c.label)} },`).join('\n')}
];

function renderJbrosRows(cat, tbodyId) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody || !jbrosCatalog[cat]) return;
  jbrosCatalog[cat].forEach(p => {
    const tr = document.createElement('tr');
    const imgCell = p.image
      ? \`<img src="\${p.image}" alt="\${p.desc.replace(/"/g,'&quot;')}" class="product-thumb" loading="lazy">\`
      : '<span class="product-thumb-placeholder">—</span>';
    tr.innerHTML = \`
      <td style="text-align:center">
        <input class="qty-input" type="number" min="0" step="1"
          data-sku="\${p.sku}" data-wholesale="\${p.wholesale}"
          data-product="\${p.desc.replace(/"/g, '&quot;')}" data-upc="\${p.upc}"
          data-color="\${p.color}" data-retail="0"
          placeholder="0" autocomplete="off">
      </td>
      <td class="product-thumb-cell">\${imgCell}</td>
      <td class="sku">\${p.upc}</td>
      <td class="bold">\${p.color}</td>
      <td style="text-align:center;color:var(--muted)">\${p.pack ? p.pack + 'pk' : '—'}</td>
      <td class="right">\$\${p.wholesale.toFixed(2)}</td>
      <td class="right"><span class="line-total" id="lt-\${p.sku.replace(/[^a-zA-Z0-9]/g,'_')}">—</span></td>
    \`;
    tbody.appendChild(tr);
  });
}

function renderAllJbrosSections() {
  const container = document.getElementById('jbros-sections');
  jbrosCategories.forEach(({ key, label }) => {
    const tbodyId = 'jb-' + key + '-rows';
    const count = jbrosCatalog[key] ? jbrosCatalog[key].length : 0;
    const div = document.createElement('div');
    div.className = 'product-section';
    div.innerHTML = \`
      <div class="category-header">
        <span class="category-name">\${label}</span>
        <span class="category-desc">\${count} SKUs</span>
      </div>
      <table>
        <thead><tr>
          <th class="center">Qty</th><th class="center">Image</th><th>UPC</th><th>Color</th>
          <th class="center">Pack</th><th class="right">Cost</th><th class="right">Line Total</th>
        </tr></thead>
        <tbody id="\${tbodyId}"></tbody>
      </table>\`;
    container.appendChild(div);
    renderJbrosRows(key, tbodyId);
  });
}
`;

fs.writeFileSync(OUT_PATH, out);
console.log(`Wrote ${OUT_PATH}`);
console.log(`${totalSkus} SKUs, ${order.length} categories:`);
order.forEach(c => console.log(`  ${c.key.padEnd(22)} ${catalog[c.key].length.toString().padStart(3)} SKUs (${c.label})`));
