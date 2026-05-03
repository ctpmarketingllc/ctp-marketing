// scripts/apply-fm-images.js
// FeatherMoon catalog is inlined in order.html. Insert/replace `image:'...'`
// on each SKU line by SKU lookup against fm-image-manifest.json.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const HTML_PATH = path.join(ROOT, 'order.html');
const MANIFEST_PATH = path.join(__dirname, 'fm-image-manifest.json');

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));

let src = fs.readFileSync(HTML_PATH, 'utf8');
let updated = 0, missing = 0;

src = src.replace(/(\{ sku:'(FM-[^']+)',[^}]*?)(\s*\})/g, (full, body, sku, tail) => {
  const stripped = body.replace(/,\s*image:'[^']*'/, '');
  const entry = manifest[sku];
  if (!entry) { missing++; return stripped + tail; }
  updated++;
  return `${stripped}, image:'${entry.image}'${tail}`;
});

fs.writeFileSync(HTML_PATH, src);
console.log(`Updated: ${updated} SKUs. Missing: ${missing}.`);
