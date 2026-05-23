// scripts/apply-jb-images.js
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CATALOG_PATH = path.join(ROOT, 'jbros-catalog.js');
const MANIFEST_PATH = path.join(__dirname, 'jb-image-manifest.json');

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
let src = fs.readFileSync(CATALOG_PATH, 'utf8');
let updated = 0, missing = 0;

src = src.replace(/(\{ sku:'(JB-[^']+)',[^}]*?)(\s*\},?)/g, (full, body, sku, tail) => {
  const stripped = body.replace(/,\s*image:'[^']*'/, '');
  const entry = manifest[sku];
  if (!entry) { missing++; return stripped + tail; }
  updated++;
  return `${stripped}, image:'${entry.image}'${tail}`;
});

fs.writeFileSync(CATALOG_PATH, src);
console.log(`Updated: ${updated} SKUs. Missing: ${missing}.`);
