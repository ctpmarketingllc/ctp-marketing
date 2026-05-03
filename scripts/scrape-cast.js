// scripts/scrape-cast.js
// Cast Fishing Co is on Shopify. Each FRESHWATER product is one (lure model, size)
// pair with per-color variants and per-color images named like
// `PRODIGY_3_CARBON.jpg`. We match catalog SKUs to vendor images by parsing the
// color out of the image filename.

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.resolve(__dirname, '..');
const IMG_DIR = path.join(ROOT, 'images', 'cast');
const MANIFEST_PATH = path.join(__dirname, 'cast-image-manifest.json');
const PRODUCTS_URL = 'https://castfishing.co/products.json?limit=250';

// Catalog (cat, sizeKey) -> vendor product title.
// sizeKey is the digits-only form of the catalog `size` field
// ("3" / 8 Pack" -> "3", "5.4" / 6 Pack" -> "54").
const PRODUCT_MAP = {
  'prodigy:3':   { vendor: 'Prodigy 3"' },
  'prodigy:41':  { vendor: 'Prodigy 4.1"' },
  'echo:275':    { vendor: 'Echo 2.75"' },
  'echo:35':     { vendor: 'Echo 3.5"' },
  'echo:54':     { vendor: 'Echo 7.2"', note: 'no vendor 5.4" — using 7.2" image' },
  'echo:72':     { vendor: 'Echo 7.2"' },
  'nova:45':     { vendor: 'Nova 4.5"' },
  'x12:330':     { vendor: 'X12 Casting Braid (330yd Bulk Spool)' },
  'x12:440':     { vendor: 'X12 Casting Braid (330yd Bulk Spool)' },
  'bfs:150':     { vendor: 'BFS Performance Braid (150yd)' },
};

// Color name normalizer for filename matching.
function colorKey(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
}

// First digits-only group from a string. "5.4" / 6 Pack" -> "54".
function sizeKey(s) {
  const m = String(s).match(/[\d.]+/);
  return m ? m[0].replace(/\./g, '') : '';
}

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(get(res.headers.location));
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function downloadFile(url, dest) {
  fs.writeFileSync(dest, await get(url));
}

async function main() {
  fs.mkdirSync(IMG_DIR, { recursive: true });
  console.log('Fetching products.json …');
  const j = JSON.parse((await get(PRODUCTS_URL)).toString('utf8'));
  console.log(`Vendor products: ${j.products.length}`);

  // index by title for fast lookup
  const byTitle = {};
  for (const p of j.products) byTitle[p.title] = p;

  // manifest[cat] = { _main: rel, byColor: { 'colorkey': rel } }
  const manifest = {};
  let downloadedCount = 0, totalBytes = 0;

  for (const [key, conf] of Object.entries(PRODUCT_MAP)) {
    const [cat, sk] = key.split(':');
    const vendor = byTitle[conf.vendor];
    if (!vendor) {
      console.log(`  ${key}: vendor product "${conf.vendor}" NOT FOUND`);
      continue;
    }
    manifest[cat] ||= { byColorBySize: {} };
    manifest[cat].byColorBySize[sk] ||= {};

    const dirRel = `images/cast/${cat}`;
    fs.mkdirSync(path.join(ROOT, dirRel), { recursive: true });

    // Index vendor images by colorKey extracted from filename.
    const imageByColor = {};
    let mainImage = null;
    for (const img of vendor.images || []) {
      const file = img.src.split('/').pop().split('?')[0];
      if (!mainImage) mainImage = { src: img.src, file };
      // strip product prefix (PRODIGY_3, ECHO_2.75, etc.) and extension
      const base = file.replace(/\.(jpg|jpeg|png|webp)$/i, '');
      // try keys like CARBON, OZARK, BLUEBACKHERRING
      const ck = colorKey(base);
      // store the deepest match — colors usually appear at the end of filename
      // we'll resolve at apply-time by checking includes(colorKey).
      imageByColor[ck] = { src: img.src, file };
    }

    // Pick a main image for the (cat, size).
    if (mainImage) {
      const filename = `${cat}-${sk}-main.jpg`;
      const relPath = `${dirRel}/${filename}`;
      const dest = path.join(ROOT, relPath);
      const url = mainImage.src.split('?')[0] + '?width=600';
      if (!fs.existsSync(dest)) {
        try {
          await downloadFile(url, dest);
          totalBytes += fs.statSync(dest).size;
          downloadedCount++;
        } catch (e) { console.error(`  ${key}: main download err ${e.message}`); }
      }
      manifest[cat].byColorBySize[sk]._main = relPath;
    }

    // Download every image for this product, keyed by the filename's colorKey.
    for (const img of vendor.images || []) {
      const file = img.src.split('/').pop().split('?')[0];
      const ck = colorKey(file.replace(/\.(jpg|jpeg|png|webp)$/i, ''));
      const filename = `${cat}-${sk}-${ck}.jpg`;
      const relPath = `${dirRel}/${filename}`;
      const dest = path.join(ROOT, relPath);
      const url = img.src.split('?')[0] + '?width=600';
      if (!fs.existsSync(dest)) {
        try {
          await downloadFile(url, dest);
          totalBytes += fs.statSync(dest).size;
          downloadedCount++;
        } catch (e) { console.error(`  ${key} ${ck}: download err ${e.message}`); continue; }
      }
      manifest[cat].byColorBySize[sk][ck] = relPath;
    }

    console.log(`  ${key.padEnd(13)} -> ${conf.vendor} (${vendor.images?.length || 0} images)${conf.note ? ' [' + conf.note + ']' : ''}`);
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`\nDone. ${downloadedCount} new images, ${(totalBytes/1024/1024).toFixed(2)} MB.`);
}

main().catch(e => { console.error(e); process.exit(1); });
