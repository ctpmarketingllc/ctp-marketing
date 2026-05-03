// scripts/apply-qt-images.js
// Read qt-image-manifest.json and add/update an `image` field on each SKU
// in queen-tackle-catalog-new.js.
//
// Matching strategy: for each SKU, take its category and try to match its
// `desc` against every color key in manifest[category]. Best match wins
// (most tokens matched). Fallback: manifest[category]._main if present.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CATALOG_PATH = path.join(ROOT, 'queen-tackle-catalog-new.js');
const MANIFEST_PATH = path.join(__dirname, 'qt-image-manifest.json');

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));

function norm(s) {
  return s.toLowerCase().replace(/['",]/g, '').replace(/\s+/g, ' ').trim();
}

// Manual aliases: catalog desc fragment -> manifest color key.
// Vendor renamed/typo'd some colors after the catalog SKU sheet was finalized.
const ALIASES = {
  flipping_jigs:  { 'cat jelly': 'Wildcat Jelly', 'tequila blue': 'Tequila Blue Bear', 'tequilla blue': 'Tequila Blue Bear' },
  football_jigs:  { 'cat jelly': 'Wildcat Jelly', 'tequila blue': 'Tequila Blue Bear', 'tequilla blue': 'Tequila Blue Bear' },
  hammerhead_jigs: { 'green pumpkin green': 'Greenpumkin Green', 'greenpumpkin green': 'Greenpumkin Green' },
  worm_weights:    { 'greenpumpkin': 'Greenpumkin', 'black/ blue flake': 'Black with blue fleck', 'black/blue flake': 'Black with blue fleck' },
};

// Category-level _main fallback: if cat has no _main, borrow from another visually-similar
// category. Used for catalog categories the vendor doesn't have a dedicated product page for.
const CATEGORY_FALLBACKS = {
  barrell_weights: 'flipping_weights',
};

function bestColorMatch(cat, desc) {
  // Strip parentheticals — they describe the color's appearance, not the color's name.
  // e.g., "KJ's Camo (Greenpumpkin & Brown)" -> the color name is "KJ's Camo".
  const stripped = desc.replace(/\([^)]*\)/g, ' ');
  const dn = norm(stripped);
  const dnNoSpace = dn.replace(/\s+/g, '');

  // 1. Manual alias check first (highest priority).
  if (ALIASES[cat]) {
    for (const [needle, target] of Object.entries(ALIASES[cat])) {
      if (dn.includes(needle) && manifest[cat][target]) return target;
    }
  }

  const colors = Object.keys(manifest[cat] || {}).filter(k => !k.startsWith('_'));
  let best = null, bestScore = 0;
  for (const c of colors) {
    const cn = norm(c);
    const cnNoSpace = cn.replace(/\s+/g, '');
    let score = 0;

    if (dn.includes(cn)) {
      score = cnNoSpace.length * 3;
    } else if (dnNoSpace.includes(cnNoSpace)) {
      // Handles "Greenpumpkin" vs "Green Pumpkin" spacing differences.
      score = cnNoSpace.length * 2;
    } else {
      // Token-level match: all tokens (any order), or >=66% of tokens.
      const tokens = cn.split(' ').filter(t => t.length > 2);
      if (tokens.length) {
        const matched = tokens.filter(t => dn.includes(t));
        if (matched.length === tokens.length) {
          score = tokens.join('').length;
        } else if (matched.length / tokens.length >= 0.66) {
          score = matched.join('').length;
        }
      }
    }
    if (score > bestScore) { bestScore = score; best = c; }
  }
  return best;
}

function imageForSku(cat, desc) {
  const color = bestColorMatch(cat, desc);
  if (color) return manifest[cat][color];
  if (manifest[cat] && manifest[cat]._main) return manifest[cat]._main;
  const fallbackCat = CATEGORY_FALLBACKS[cat];
  if (fallbackCat && manifest[fallbackCat]?._main) return manifest[fallbackCat]._main;
  return null;
}

const src = fs.readFileSync(CATALOG_PATH, 'utf8');
const lines = src.split(/\r?\n/);

let currentCat = null;
let updated = 0, mainFallback = 0, noMatch = 0;
const noMatchSamples = [];

const out = lines.map(line => {
  const catMatch = line.match(/^  ([a-z_]+): \[/);
  if (catMatch) { currentCat = catMatch[1]; return line; }

  // SKU line shape: `    { sku:'QT-...', ..., retail:11.99 },` — note space before }, no comma.
  const skuMatch = line.match(/^(\s*\{ sku:'([^']+)',.*?)(\s*\}\s*,?)\s*$/);
  if (!skuMatch || !currentCat) return line;

  const [, body, sku, tail] = skuMatch;
  const descMatch = body.match(/desc:'((?:[^'\\]|\\.)*)'/);
  if (!descMatch) return line;
  // unescape
  const desc = descMatch[1].replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\\\/g, '\\');

  const img = imageForSku(currentCat, desc);
  // Strip any pre-existing image field
  const stripped = body.replace(/,\s*image:'[^']*'/, '');

  if (!img) {
    noMatch++;
    noMatchSamples.push(`${currentCat}/${sku}: ${desc.slice(0,60)}`);
    return stripped + tail;
  }

  if (img === manifest[currentCat]?._main) mainFallback++;
  else if (CATEGORY_FALLBACKS[currentCat] && img === manifest[CATEGORY_FALLBACKS[currentCat]]?._main) mainFallback++;
  else updated++;

  return `${stripped}, image:'${img}'${tail}`;
}).join('\n');

fs.writeFileSync(CATALOG_PATH, out);
console.log(`Updated: ${updated} color matches, ${mainFallback} _main fallbacks, ${noMatch} unmatched.`);
if (noMatchSamples.length) {
  console.log('\nUnmatched (' + noMatchSamples.length + '):');
  // Group by category
  const byCat = {};
  for (const s of noMatchSamples) {
    const cat = s.split('/')[0];
    (byCat[cat] = byCat[cat] || []).push(s);
  }
  for (const [cat, items] of Object.entries(byCat)) {
    console.log(`  ${cat} (${items.length}):`);
    items.forEach(s => console.log('    ' + s.replace(cat + '/', '')));
  }
}
