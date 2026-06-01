// scripts/parse-brazalo-csv.js
// Parse the Brazalo wholesaler CSV into brazalo-catalog.js.
// Detects category headers (lines with a category name in col 2 and no SKU)
// and emits one entry per SKU row.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CSV_PATH = path.join(ROOT, '2026 Brazalo Wholesaler List and Pricing.xlsb.csv');
const OUT_PATH = path.join(ROOT, 'brazalo-catalog.js');

// Map of CSV section heading -> catalog key + display label.
// Headings encountered in col 2 but not in this map are skipped (placeholders).
const SECTIONS = {
  'Swim Jigs':                            { key: 'swim_jigs',          label: 'Swim Jigs' },
  'Football Jigs':                        { key: 'football_jigs',      label: 'Football Jigs' },
  'Finesse Swim Jigs (1/4 oz 3/0 hook, 3/8 oz 4/0 hook)': { key: 'finesse_swim_jigs', label: 'Finesse Swim Jigs' },
  '501 Jigs':                             { key: 'jigs_501',           label: '501 Jigs' },
  'Power Finesse Jigs':                   { key: 'power_finesse_jigs', label: 'Power Finesse Jigs' },
  'New Products (Available Jan 2025)':    { key: 'smallie_ballz',      label: 'Smallie Ballz' },
  'B-Ned Ned Rig':                        { key: 'b_ned',              label: 'B-Ned Ned Rig' },
  'TKO FFS Head':                         { key: 'tko_ffs_head',       label: 'TKO FFS Head' },
  'Skirted TKO FFS Head':                 { key: 'skirted_tko_ffs',    label: 'Skirted TKO FFS Head' },
  'Pro Elite Bushwhacker':                { key: 'pro_elite_bushwhacker', label: 'Pro Elite Bushwhacker' },
  '"Schlapper" Pro Bushwhacker':          { key: 'schlapper_bushwhacker', label: 'Schlapper Pro Bushwhacker' },
  '"OG" Bushwhacker':                     { key: 'og_bushwhacker',     label: 'OG Bushwhacker' },
  'Pro Buzzbait (non clacking traditional buzzbait)': { key: 'pro_buzzbait', label: 'Pro Buzzbait' },
  'Wee-Whackers':                         { key: 'wee_whackers',       label: 'Wee-Whackers' },
  'Bufo Buzz (non-clacker)':              { key: 'bufo_buzz',          label: 'Bufo Buzz' },
  'M1 Pro Buzzbait Pro Elite Head':       { key: 'm1_pro_buzzbait',    label: 'M1 Pro Buzzbait' },
  'Strutters':                            { key: 'strutters',          label: 'Strutters' },
  'Salty Head':                           { key: 'salty_head',         label: 'Salty Head' },
};

function parseDollar(s) {
  if (!s) return 0;
  const cleaned = String(s).replace(/[$,\s]/g, '');
  const n = parseFloat(cleaned);
  return isNaN(n) ? 0 : n;
}

// Parse a single CSV line into fields, respecting quoted strings.
function parseLine(line) {
  const out = [];
  let cur = '', inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQ && line[i+1] === '"') { cur += '"'; i++; }
      else inQ = !inQ;
    } else if (c === ',' && !inQ) {
      out.push(cur); cur = '';
    } else cur += c;
  }
  out.push(cur);
  return out.map(s => s.trim());
}

// Try to break a product description like "3/8 oz Green Pumpkin Swim Jig"
// into size, color, and product line. The trailing product type word(s) come
// from the section context, and size is always the leading fraction+oz.
function splitDesc(desc, sectionLabel) {
  const sizeMatch = desc.match(/^(\d+\/?\d*\s+oz)\s+/i);
  const size = sizeMatch ? sizeMatch[1] : '';
  let rest = sizeMatch ? desc.slice(sizeMatch[0].length) : desc;
  // strip pack qualifier like "5pk"
  const packMatch = rest.match(/\s+(\d+pk)\s*$/i);
  const pack = packMatch ? packMatch[1] : '';
  if (packMatch) rest = rest.slice(0, -packMatch[0].length);
  // strip product-type tail (best-effort — match common suffixes case-insensitively)
  const tailRe = /\s+(swim jig|football jig|finesse swim jig|finesse jig|501 jig|shakey head|smallie ballz|ned rig|tko ffs head|flat out jig|skirted tko ffs head)$/i;
  rest = rest.replace(tailRe, '');
  return { size, color: rest.trim(), pack };
}

const raw = fs.readFileSync(CSV_PATH, 'utf8');
const lines = raw.split(/\r?\n/);

let currentSection = null;
const catalog = {};
const categoriesOrder = [];

for (const line of lines) {
  if (!line.trim() || line.startsWith(',,,,,,')) continue;
  const cols = parseLine(line);
  // Col 1 = Model #, Col 2 = Description, Col 3 = Per Unit (wholesale),
  // Col 5 = MAP, Col 6 = MSRP (retail), Col 7 = UPC.
  // A section heading has empty col 1 and a recognized phrase in col 2.
  const modelCol = cols[1] || '';
  const descCol = cols[2] || '';
  if (!modelCol.trim() && descCol && SECTIONS[descCol]) {
    currentSection = SECTIONS[descCol];
    if (!catalog[currentSection.key]) {
      catalog[currentSection.key] = [];
      categoriesOrder.push(currentSection);
    }
    continue;
  }
  // Skip rows without a description or that look like totals.
  if (!descCol || /total/i.test(modelCol)) continue;
  // Smallie Ballz rows have no Model # — synthesize one from the running index.
  let sku = modelCol;
  if (!sku && currentSection?.key === 'smallie_ballz') {
    const idx = (catalog['smallie_ballz']?.length || 0) + 1;
    sku = `SMB-${String(idx).padStart(2,'0')}`;
  }
  if (!sku) continue;
  if (!currentSection) continue;

  const wholesale = parseDollar(cols[3]);
  const map = parseDollar(cols[5]);
  const retail = parseDollar(cols[6]);
  const upc = (cols[7] || '').trim();
  const { size, color, pack } = splitDesc(descCol, currentSection.label);

  catalog[currentSection.key].push({
    sku: `BRZ-${sku}`,
    model: sku,
    upc,
    desc: descCol,
    size,
    color,
    pack,
    wholesale,
    map,
    retail,
  });
}

// Emit a JS file matching the style of the other vendor catalogs.
function emitObj(obj) {
  const parts = [];
  for (const cat of Object.keys(catalog)) {
    parts.push(`  ${cat}: [`);
    for (const item of catalog[cat]) {
      const fields = [
        `sku:'${item.sku}'`,
        `model:'${item.model}'`,
        `upc:'${item.upc}'`,
        `desc:${JSON.stringify(item.desc)}`,
        `size:'${item.size}'`,
        `color:${JSON.stringify(item.color)}`,
        `pack:'${item.pack}'`,
        `wholesale:${item.wholesale}`,
        `map:${item.map}`,
        `retail:${item.retail}`,
      ].join(', ');
      parts.push(`    { ${fields} },`);
    }
    parts.push(`  ],`);
  }
  return parts.join('\n');
}

const totalSkus = Object.values(catalog).reduce((n, arr) => n + arr.length, 0);

const out = `// ── Brazalo Custom Lures catalog ─────────────────────────────
// Source: 2026 Brazalo Wholesaler List and Pricing CSV
// Vendor: Brazalo Custom Lures | 407 Calloway Ave, Sherwood AR 72120 | (501) 681-6130
// ${totalSkus} SKUs across ${categoriesOrder.length} product lines
// Send POs to: brazalo.customlures@gmail.com
const brazaloCatalog = {
${emitObj(catalog)}
};

const brazaloCategories = [
${categoriesOrder.map(c => `  { key:'${c.key}', label:${JSON.stringify(c.label)} },`).join('\n')}
];

function renderBrazaloRows(cat, tbodyId) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody || !brazaloCatalog[cat]) return;
  brazaloCatalog[cat].forEach(p => {
    const tr = document.createElement('tr');
    const imgCell = p.image
      ? \`<img src="\${p.image}" alt="\${p.desc.replace(/"/g,'&quot;')}" class="product-thumb" loading="lazy">\`
      : '<span class="product-thumb-placeholder">—</span>';
    tr.innerHTML = \`
      <td style="text-align:center">
        <input class="qty-input" type="number" min="0" step="1"
          data-sku="\${p.sku}" data-wholesale="\${p.wholesale}"
          data-product="\${p.desc.replace(/"/g, '&quot;')}" data-upc="\${p.upc}"
          data-color="\${p.color}" data-size="\${p.size}" data-retail="\${p.retail}"
          placeholder="0" autocomplete="off">
      </td>
      <td class="product-thumb-cell">\${imgCell}</td>
      <td class="sku">\${p.model}</td>
      <td class="bold">\${p.desc}</td>
      <td class="right">\$\${p.wholesale.toFixed(2)}</td>
      <td class="right" style="color:var(--muted)">\$\${p.retail.toFixed(2)}</td>
      <td class="right"><span class="line-total" id="lt-\${p.sku.replace(/[^a-zA-Z0-9]/g,'_')}">—</span></td>
    \`;
    tbody.appendChild(tr);
  });
}

function renderAllBrazaloSections() {
  const container = document.getElementById('brazalo-sections');
  brazaloCategories.forEach(({ key, label }) => {
    const tbodyId = 'brz-' + key + '-rows';
    const count = brazaloCatalog[key] ? brazaloCatalog[key].length : 0;
    const div = document.createElement('div');
    div.className = 'product-section';
    div.innerHTML = \`
      <div class="category-header">
        <span class="category-name">\${label}</span>
        <span class="category-desc">\${count} SKUs</span>
      </div>
      <table>
        <thead><tr>
          <th class="center">Qty</th><th class="center">Image</th><th>SKU</th><th>Description</th>
          <th class="right">Wholesale</th><th class="right">MSRP</th><th class="right">Line Total</th>
        </tr></thead>
        <tbody id="\${tbodyId}"></tbody>
      </table>\`;
    container.appendChild(div);
    renderBrazaloRows(key, tbodyId);
  });
}
`;

fs.writeFileSync(OUT_PATH, out);
console.log(`Wrote ${OUT_PATH}`);
console.log(`Total SKUs: ${totalSkus} across ${categoriesOrder.length} categories.`);
categoriesOrder.forEach(c => console.log(`  ${c.key.padEnd(20)} ${(catalog[c.key].length).toString().padStart(3)} SKUs (${c.label})`));
