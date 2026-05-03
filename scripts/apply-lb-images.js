// scripts/apply-lb-images.js
// Lanier catalog is inlined in order.html. For each SKU, set image to the
// category-level representative image from the manifest.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const HTML_PATH = path.join(ROOT, 'order.html');
const MANIFEST_PATH = path.join(__dirname, 'lb-image-manifest.json');

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));

let src = fs.readFileSync(HTML_PATH, 'utf8');

// We only want to touch the lanierCatalog block. Find it and operate on a slice.
const lanierStart = src.indexOf('const lanierCatalog = {');
const lanierEnd = src.indexOf('};', lanierStart);
if (lanierStart < 0 || lanierEnd < 0) {
  console.error('Could not locate lanierCatalog block.');
  process.exit(1);
}

const before = src.slice(0, lanierStart);
const block = src.slice(lanierStart, lanierEnd + 2);
const after = src.slice(lanierEnd + 2);

let currentCat = null;
let updated = 0, missing = 0;

const newBlock = block.split(/\r?\n/).map(line => {
  const catMatch = line.match(/^\s+([a-z_]+):\s*\[/);
  if (catMatch) { currentCat = catMatch[1]; return line; }

  const skuMatch = line.match(/^(\s*\{ sku:'(LB-[^']+)',[^}]*?)(\s*\}\s*,?)\s*$/);
  if (!skuMatch || !currentCat) return line;
  const [, body, sku, tail] = skuMatch;
  const stripped = body.replace(/,\s*image:'[^']*'/, '');

  const entry = manifest[currentCat];
  if (!entry) { missing++; return stripped + tail; }
  updated++;
  return `${stripped}, image:'${entry.image}'${tail}`;
}).join('\n');

fs.writeFileSync(HTML_PATH, before + newBlock + after);
console.log(`Updated: ${updated} SKUs. Missing: ${missing}.`);
