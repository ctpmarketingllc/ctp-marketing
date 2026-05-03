// scripts/apply-cr-images.js
// Read cr-image-manifest.json and add an `image` field to each SKU in
// copperredbait-catalog.js.
//
// Matching: each catalog SKU has explicit `color` field. Find the manifest
// variant in the same category whose color matches.
//
// Special cases:
//   - snatchin_shad_threequarter has no dedicated vendor pages; the catalog
//     desc encodes "Rattling" or "Silent", which routes to the matching
//     half-oz manifest entry (same color, same image).
//   - If no color match in category, fall back to the category's first
//     variant image as a generic _main.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CATALOG_PATH = path.join(ROOT, 'copperredbait-catalog.js');
const MANIFEST_PATH = path.join(__dirname, 'cr-image-manifest.json');

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));

function colorKey(s) {
  if (!s) return '';
  return String(s).toLowerCase()
    .replace(/&amp;/g, '&')
    .replace(/&#039;/g, "'")
    .replace(/[^a-z0-9]+/g, '');
}

function findVariant(cat, color) {
  const m = manifest[cat];
  if (!m) return null;
  const ck = colorKey(color);
  return m.variants.find(v => colorKey(v.color) === ck);
}

function imageForSku(cat, desc, color) {
  // Special case: snatchin_shad_threequarter routes to half-oz silent or rattling
  // by inspecting the desc.
  if (cat === 'snatchin_shad_threequarter') {
    if (/silent/i.test(desc)) {
      const v = findVariant('snatchin_shad_half_silent', color);
      if (v) return v.image;
    }
    if (/rattl/i.test(desc)) {
      const v = findVariant('snatchin_shad_half_rattling', color);
      if (v) return v.image;
    }
  }
  // Standard color match within the category.
  const v = findVariant(cat, color);
  if (v) return v.image;
  // Fallback: first variant in category as a generic main image.
  return manifest[cat]?.variants?.[0]?.image || null;
}

const src = fs.readFileSync(CATALOG_PATH, 'utf8');
const lines = src.split(/\r?\n/);

let currentCat = null;
let exact = 0, fallback = 0, noMatch = 0;
const noMatchSamples = [];

const out = lines.map(line => {
  const catMatch = line.match(/^  ([a-z_0-9]+): \[/);
  if (catMatch) { currentCat = catMatch[1]; return line; }

  const skuMatch = line.match(/^(\s*\{ sku:'([^']+)',.*?)(\s*\}\s*,?)\s*$/);
  if (!skuMatch || !currentCat) return line;
  const [, body, sku, tail] = skuMatch;

  const descMatch = body.match(/desc:'((?:[^'\\]|\\.)*)'/);
  const colorMatch = body.match(/color:'((?:[^'\\]|\\.)*)'/);
  const desc = descMatch?.[1].replace(/\\'/g, "'").replace(/\\"/g, '"');
  const color = colorMatch?.[1].replace(/\\'/g, "'").replace(/\\"/g, '"');

  const stripped = body.replace(/,\s*image:'[^']*'/, '');

  if (!color) return stripped + tail;

  const img = imageForSku(currentCat, desc, color);
  if (!img) {
    noMatch++;
    noMatchSamples.push(`${currentCat}/${sku}: color=${color}`);
    return stripped + tail;
  }

  // Was it an exact color match in the category?
  const exactV = findVariant(currentCat, color);
  if (exactV && exactV.image === img) exact++;
  else fallback++;

  return `${stripped}, image:'${img}'${tail}`;
}).join('\n');

fs.writeFileSync(CATALOG_PATH, out);
console.log(`Updated: ${exact} color matches, ${fallback} fallbacks, ${noMatch} unmatched.`);
if (noMatchSamples.length) {
  console.log('\nUnmatched:');
  noMatchSamples.forEach(s => console.log('  ' + s));
}
