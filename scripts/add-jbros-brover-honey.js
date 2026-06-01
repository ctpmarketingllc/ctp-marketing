// scripts/add-jbros-brover-honey.js
// Add two new J Bros categories (4.25" Brover + 7.3" Honey Dipper) sourced
// from the 2026 wholesale price list image. Downloads per-color images from
// the vendor's WooCommerce product variations and writes new entries into
// jbros-catalog.js. Idempotent — safe to re-run.

const fs = require('fs');
const path = require('path');
const https = require('https');
const os = require('os');

const ROOT = path.resolve(__dirname, '..');
const IMG_DIR = path.join(ROOT, 'images', 'jbros');
const CATALOG_PATH = path.join(ROOT, 'jbros-catalog.js');
const MANIFEST_PATH = path.join(__dirname, 'jb-image-manifest.json');

const NEW_CATEGORIES = [
  {
    key: 'brover',
    label: '4.25" Brover Beaver Bait',
    headerLabel: 'Brover 4.25"',
    parent: 15524,
    pack: '5',
    items: [
      { sku: 'JB-BROVER-BB', color: 'Black/Blue',     imgKey: 'black-blue', wholesale: 3.87 },
      { sku: 'JB-BROVER-WR', color: 'Watermelon Red', imgKey: 'watermelon-red', wholesale: 3.87 },
      { sku: 'JB-BROVER-GP', color: 'Green Pumpkin',  imgKey: 'gp',  wholesale: 3.87 },
      { sku: 'JB-BROVER-JB', color: 'June Bug',       imgKey: 'june-bug',  wholesale: 3.87 },
    ],
  },
  {
    key: 'honey_dipper',
    label: '7.3" Honey Dipper',
    headerLabel: 'Honey Dipper 7.3"',
    parent: 15436,
    pack: '8',
    items: [
      { sku: 'JB-HONEY-BB',  color: 'Black Blue',          imgKey: 'black-blue',         wholesale: 4.49 },
      { sku: 'JB-HONEY-GP',  color: 'Green Pumpkin',       imgKey: 'honey-dipper-1',     wholesale: 4.49 },
      { sku: 'JB-HONEY-GPP', color: 'Green Pumpkin Purple', imgKey: 'gp-purple',          wholesale: 4.49 },
      { sku: 'JB-HONEY-JB',  color: 'June Bug',            imgKey: 'june-bug',           wholesale: 4.49 },
      { sku: 'JB-HONEY-MD',  color: 'Morning Dawn',        imgKey: 'morning-dawn',       wholesale: 5.17 },
      { sku: 'JB-HONEY-MO',  color: 'Motor Oil',           imgKey: 'motor-oil',          wholesale: 4.49 },
      { sku: 'JB-HONEY-RB',  color: 'Red Bug',             imgKey: 'red-bug',            wholesale: 4.49 },
      { sku: 'JB-HONEY-SS',  color: 'Silver Shad',         imgKey: 'silver-shad',        wholesale: 5.17 },
      { sku: 'JB-HONEY-WR',  color: 'Watermelon Red',      imgKey: 'watermelon-red',     wholesale: 4.49 },
    ],
  },
];

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(get(res.headers.location));
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}
async function downloadFile(url, dest) {
  fs.writeFileSync(dest, await get(url));
}
function loadJson(name) {
  return JSON.parse(fs.readFileSync(path.join(os.tmpdir(), name), 'utf8').replace(/^﻿/, ''));
}

(async () => {
  // 1. For each parent, read cached variation data and build an imgKey -> src map.
  const newEntries = [];
  for (const cat of NEW_CATEGORIES) {
    const variants = loadJson(`jb-vars-${cat.parent}.json`);
    const byKey = {};
    for (const v of variants) {
      const src = v.images?.[0]?.src;
      if (!src) continue;
      const file = src.split('/').pop().split('?')[0].replace(/\.(jpe?g|png|webp)$/i, '').toLowerCase();
      // Allow looser key match — strip "-1", "-2" suffixes and trailing dashes.
      const base = file.replace(/-\d+$/, '');
      byKey[file] = src;
      byKey[base] = src;
      // Also index by "7.3-honey-dipper-silver-shad" style keys without prefix.
      const tail = base.replace(/^7\.?3-?honey-?dipper-?/, '');
      if (tail !== base) byKey[tail] = src;
    }

    const lineDir = cat.key.replace(/_/g, '-');
    fs.mkdirSync(path.join(IMG_DIR, lineDir), { recursive: true });

    for (const item of cat.items) {
      const src = byKey[item.imgKey] || byKey[item.imgKey.replace(/-/g, '')];
      if (!src) { console.error(`  MISSING vendor image for ${item.sku} (key=${item.imgKey})`); continue; }
      // Prefer the WP -600x600 size if available; fall back to original.
      const baseUrl = src.split('?')[0];
      const sizedUrl = baseUrl.replace(/(\.[a-z]{3,4})$/i, '-600x600$1');
      const filename = `${item.sku.replace('JB-', '').toLowerCase()}.jpg`;
      const relPath = `images/jbros/${lineDir}/${filename}`;
      const dest = path.join(IMG_DIR, lineDir, filename);
      if (!fs.existsSync(dest)) {
        try { await downloadFile(sizedUrl, dest); }
        catch (e) {
          try { await downloadFile(baseUrl, dest); }
          catch (e2) { console.error(`  download err ${item.sku}: ${e2.message}`); continue; }
        }
      }
      newEntries.push({
        cat: cat.key,
        item: {
          sku: item.sku,
          upc: '',
          desc: `${cat.headerLabel} ${item.color} Quantity ${cat.pack}`,
          color: item.color,
          pack: cat.pack,
          wholesale: item.wholesale,
          image: relPath,
        },
      });
    }
  }
  console.log(`Prepared ${newEntries.length} new SKU entries.`);

  // 2. Update the manifest.
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  for (const { item } of newEntries) {
    manifest[item.sku] = { image: item.image, color: item.color };
  }
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

  // 3. Patch jbros-catalog.js: insert new category blocks before the closing `};`
  // of jbrosCatalog, and add corresponding entries to jbrosCategories.
  let src = fs.readFileSync(CATALOG_PATH, 'utf8');
  if (src.includes('JB-BROVER-BB')) {
    console.log('Catalog already has new categories — skipping insert.');
    return;
  }

  // Build the new category blocks.
  const blocks = NEW_CATEGORIES.map(cat => {
    const lines = newEntries
      .filter(e => e.cat === cat.key)
      .map(e => {
        const p = e.item;
        return `    { sku:'${p.sku}', upc:'', desc:${JSON.stringify(p.desc)}, color:${JSON.stringify(p.color)}, pack:'${p.pack}', wholesale:${p.wholesale}, image:'${p.image}' },`;
      });
    return `  ${cat.key}: [\n${lines.join('\n')}\n  ],`;
  }).join('\n');

  // Insert the new category blocks before the closing `};` of `jbrosCatalog`.
  const catalogClose = src.indexOf('};\n\nconst jbrosCategories');
  if (catalogClose < 0) { console.error('cannot locate catalog block close'); process.exit(1); }
  src = src.slice(0, catalogClose) + blocks + '\n' + src.slice(catalogClose);

  // Append entries to jbrosCategories array.
  const categoriesAdditions = NEW_CATEGORIES.map(c => `  { key:'${c.key}', label:${JSON.stringify(c.label)} },`).join('\n');
  src = src.replace(
    /const jbrosCategories = \[\n([\s\S]*?)\n\];/,
    (full, body) => `const jbrosCategories = [\n${body}\n${categoriesAdditions}\n];`
  );

  fs.writeFileSync(CATALOG_PATH, src);
  console.log(`Patched ${path.relative(ROOT, CATALOG_PATH)} with 2 new categories (${newEntries.length} SKUs).`);
})().catch(e => { console.error(e); process.exit(1); });
