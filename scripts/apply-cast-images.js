// scripts/apply-cast-images.js
// Cast catalog is inlined in order.html. Match each SKU's (cat, size, color)
// against the manifest. Manifest keys are derived from image filenames, so
// matching is via "filename contains color".

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const HTML_PATH = path.join(ROOT, 'order.html');
const MANIFEST_PATH = path.join(__dirname, 'cast-image-manifest.json');

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));

// Catalog color -> normalized substring expected in vendor image filename.
// Vendor sometimes has a spelling drift ("Spiced Pumpkin" vs "Spiked Pumpkin").
const COLOR_ALIASES = {
  'Spiced Pumpkin': 'spikedpumpkin',  // vendor spelling
};

function colorKey(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
}

function sizeKey(s) {
  const m = String(s).match(/[\d.]+/);
  return m ? m[0].replace(/\./g, '') : '';
}

function imageForSku(cat, color, size) {
  const skSize = sizeKey(size);
  const target = COLOR_ALIASES[color] || colorKey(color);

  // Try the matching size bucket first.
  const sizeBucket = manifest[cat]?.byColorBySize?.[skSize];
  if (sizeBucket) {
    for (const [ck, imgPath] of Object.entries(sizeBucket)) {
      if (ck === '_main') continue;
      if (ck.includes(target)) return imgPath;
    }
    if (sizeBucket._main) return sizeBucket._main;
  }

  // Fallback: any size bucket's _main in the same category. Useful when the
  // catalog `size` field doesn't map cleanly (e.g., X12 uses LB weights but
  // we keyed buckets by yardage).
  const buckets = manifest[cat]?.byColorBySize || {};
  for (const b of Object.values(buckets)) if (b._main) return b._main;
  return null;
}

let src = fs.readFileSync(HTML_PATH, 'utf8');
const start = src.indexOf('const castCatalog = {');
const end = src.indexOf('};', start);
if (start < 0 || end < 0) { console.error('castCatalog block not found'); process.exit(1); }

const before = src.slice(0, start);
const block = src.slice(start, end + 2);
const after = src.slice(end + 2);

let currentCat = null, exact = 0, fallback = 0, missing = 0;
const newBlock = block.split(/\r?\n/).map(line => {
  const catMatch = line.match(/^\s+([a-z0-9]+):\s*\[/);
  if (catMatch) { currentCat = catMatch[1]; return line; }

  const skuMatch = line.match(/^(\s*\{ sku:'(CFC-[^']+)',[^}]*?)(\s*\}\s*,?)\s*$/);
  if (!skuMatch || !currentCat) return line;
  const [, body, sku, tail] = skuMatch;

  const colorMatch = body.match(/color:'([^']+)'/);
  const sizeMatch = body.match(/size:'([^']+)'/);
  const stripped = body.replace(/,\s*image:'[^']*'/, '');
  if (!colorMatch || !sizeMatch) return stripped + tail;

  const img = imageForSku(currentCat, colorMatch[1], sizeMatch[1]);
  if (!img) { missing++; return stripped + tail; }

  const sizeBucket = manifest[currentCat]?.byColorBySize?.[sizeKey(sizeMatch[1])];
  if (img === sizeBucket?._main) fallback++; else exact++;

  return `${stripped}, image:'${img}'${tail}`;
}).join('\n');

fs.writeFileSync(HTML_PATH, before + newBlock + after);
console.log(`Updated: ${exact} exact, ${fallback} fallbacks, ${missing} missing.`);
