// scripts/verify-qt-links.js
// Sanity check: every `image:'...'` ref in queen-tackle-catalog-new.js points to an
// existing file on disk. Exits non-zero on any miss.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const src = fs.readFileSync(path.join(ROOT, 'queen-tackle-catalog-new.js'), 'utf8');

const re = /image:'([^']+)'/g;
const refs = [...new Set([...src.matchAll(re)].map(m => m[1]))];
const missing = refs.filter(r => !fs.existsSync(path.join(ROOT, r)));

console.log(`${refs.length} unique image refs, ${missing.length} missing.`);
if (missing.length) {
  console.log('\nMissing:');
  missing.forEach(r => console.log('  ' + r));
  process.exit(1);
}
