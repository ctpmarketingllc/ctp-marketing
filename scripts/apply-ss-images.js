// scripts/apply-ss-images.js
// Read ss-image-manifest.json and add/update an `image` field on each SKU
// in spotsticker-catalog.js by matching (size, color) tuples.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CATALOG_PATH = path.join(ROOT, 'spotsticker-catalog.js');
const MANIFEST_PATH = path.join(__dirname, 'ss-image-manifest.json');

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));

// Convert any size form ("1/8 oz", "18-oz", "1/8oz", "5\"", "4.5\"") to a comparable key.
// Strip everything except digits and decimal points.
function sizeKey(s) {
  if (!s) return '';
  return String(s).toLowerCase().replace(/[^\d.]/g, '');
}

function colorKey(s) {
  if (!s) return '';
  return String(s).toLowerCase().replace(/[^\w]+/g, '').trim();
}

// "Unpainted" / "Lead" in catalog matches null (no color attribute) on vendor side.
const NULL_COLOR_VALUES = new Set(['unpainted', 'lead', '']);

function colorsMatch(catColor, varColor) {
  const a = colorKey(catColor);
  const b = colorKey(varColor);
  if (a === b) return true;
  if (NULL_COLOR_VALUES.has(a) && NULL_COLOR_VALUES.has(b)) return true;
  if (NULL_COLOR_VALUES.has(a) && !varColor) return true;
  if (!catColor && NULL_COLOR_VALUES.has(b)) return true;
  return false;
}

function imageForSku(cat, sku) {
  const m = manifest[cat];
  if (!m) return null;
  const targetSize = sizeKey(sku.size);
  const targetColor = sku.color;
  // Best match: exact size+color; fallback: same color; fallback: same size; else _main.
  let exact = null, colorOnly = null, sizeOnly = null;
  for (const v of m.variants || []) {
    const vSize = sizeKey(v.size);
    const cm = colorsMatch(targetColor, v.color);
    const sm = (vSize && targetSize && vSize === targetSize) || (!vSize && !targetSize);
    if (cm && sm) { exact = v; break; }
    if (cm && !colorOnly) colorOnly = v;
    if (sm && !sizeOnly) sizeOnly = v;
  }
  return (exact || colorOnly || sizeOnly)?.image || m._main || null;
}

const src = fs.readFileSync(CATALOG_PATH, 'utf8');
const lines = src.split(/\r?\n/);

let currentCat = null;
let exact = 0, partial = 0, mainFallback = 0, noMatch = 0;
const noMatchSamples = [];

const out = lines.map(line => {
  const catMatch = line.match(/^  ([a-z_0-9]+): \[/);
  if (catMatch) { currentCat = catMatch[1]; return line; }

  // SKU line: `    { sku:'SS-...', desc:'...', size:'...', color:'...', pack:'...', retail:..., wholesale:... },`
  const skuMatch = line.match(/^(\s*\{ sku:'([^']+)',.*?)(\s*\}\s*,?)\s*$/);
  if (!skuMatch || !currentCat) return line;
  const [, body, sku, tail] = skuMatch;

  const sizeMatch  = body.match(/size:'([^']+)'/);
  const colorMatch = body.match(/color:'([^']+)'/);

  const skuObj = {
    sku,
    size: sizeMatch?.[1],
    color: colorMatch?.[1],
  };

  // Strip any pre-existing image field
  const stripped = body.replace(/,\s*image:'[^']*'/, '');
  const img = imageForSku(currentCat, skuObj);
  if (!img) {
    noMatch++;
    noMatchSamples.push(`${currentCat}/${sku}: size=${skuObj.size} color=${skuObj.color}`);
    return stripped + tail;
  }

  if (img === manifest[currentCat]?._main) mainFallback++;
  else exact++;
  return `${stripped}, image:'${img}'${tail}`;
}).join('\n');

fs.writeFileSync(CATALOG_PATH, out);
console.log(`Updated: ${exact} variant matches, ${mainFallback} _main fallbacks, ${noMatch} unmatched.`);
if (noMatchSamples.length) {
  console.log('\nUnmatched (' + noMatchSamples.length + '):');
  const byCat = {};
  for (const s of noMatchSamples) {
    const cat = s.split('/')[0];
    (byCat[cat] = byCat[cat] || []).push(s);
  }
  for (const [cat, items] of Object.entries(byCat)) {
    console.log(`  ${cat} (${items.length}):`);
    items.slice(0, 5).forEach(s => console.log('    ' + s.replace(cat + '/', '')));
    if (items.length > 5) console.log(`    … ${items.length - 5} more`);
  }
}
