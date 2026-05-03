// scripts/scrape-lanier.js
// Lanier's wholesale catalog (in our order portal) uses retailer-only color/SKU
// names that DO NOT appear on lanierbaits.com's public Shopify catalog. We can't
// match per-color, so this script picks one representative image per catalog
// category from the closest matching vendor product_type and applies it to all
// SKUs in that category. Retailers see a category-level visual stand-in.

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.resolve(__dirname, '..');
const IMG_DIR = path.join(ROOT, 'images', 'lanier');
const MANIFEST_PATH = path.join(__dirname, 'lb-image-manifest.json');
const PRODUCTS_URL = 'https://lanierbaits.com/products.json?limit=250';

// catalog category -> vendor selector. The script grabs the first matching
// vendor product and uses image[0] for the whole category. Use `productType`
// for an exact match on Shopify product_type, or `titleMatch` for a regex
// against the title (some catalog categories don't map to a clean type).
const CATEGORY_MAP = {
  finesse_worm: { productType: 'Finesse Worm',          titleMatch: /4"/ },
  jerk_shad:    { productType: 'Sowbelly' },                                  // closest paddle-shad analog
  hover_shad:   { productType: 'Sowbelly' },                                  // similar
  swim_minnow:  { productType: 'Boogie Worm' },                               // small shad-ish swim profile
  hooch_craw:   { productType: 'Rattling Hybrid Craw' },
  shakey_ned:   { productType: 'Nedbait' },
  ball_jig:     { productType: 'Jig Head' },
  damiki:       { productType: 'Jig Head', titleMatch: /(big eye|finesse)/i },
  dropshot:     { productType: 'Tungsten' },
  eliminator:   { productType: 'Jig Head' },
  hooks:        { titleMatch: /hook/i },
  swivels:      { titleMatch: /swivel/i },
  spoons:       { productType: 'Jig', titleMatch: /spoon/i },                 // no spoon type — falls back to first jig
  shad_spin:    { productType: 'Jig' },                                       // umbrella for spinning lures
  hard_swimmer: { productType: 'Swimbaits' },                                 // WakeWalker LT
};

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

function pickRepresentative(products, sel) {
  for (const p of products) {
    if (sel.productType && p.product_type !== sel.productType) continue;
    if (sel.titleMatch && !sel.titleMatch.test(p.title)) continue;
    if (p.images?.[0]?.src) return p;
  }
  // Fallback: ignore titleMatch if nothing found.
  for (const p of products) {
    if (sel.productType && p.product_type !== sel.productType) continue;
    if (p.images?.[0]?.src) return p;
  }
  return null;
}

async function main() {
  fs.mkdirSync(IMG_DIR, { recursive: true });
  console.log('Fetching products.json …');
  const j = JSON.parse((await get(PRODUCTS_URL)).toString('utf8'));
  console.log(`Vendor products: ${j.products.length}`);

  const manifest = {};
  let totalBytes = 0, downloaded = 0, missing = [];

  for (const [cat, sel] of Object.entries(CATEGORY_MAP)) {
    const product = pickRepresentative(j.products, sel);
    if (!product) {
      missing.push(cat);
      continue;
    }
    // Shopify CDN supports ?width= for resizing. Strip existing query and add ours.
    const baseUrl = product.images[0].src.split('?')[0];
    const url = baseUrl + '?width=600';
    const filename = `${cat.replace(/_/g, '-')}.jpg`;
    const relPath = `images/lanier/${filename}`;
    const dest = path.join(IMG_DIR, filename);
    if (!fs.existsSync(dest)) {
      try {
        await downloadFile(url, dest);
        const sz = fs.statSync(dest).size;
        totalBytes += sz;
        downloaded++;
      } catch (e) {
        console.error(`  ${cat}: download err ${e.message}`);
        missing.push(cat);
        continue;
      }
    }
    manifest[cat] = {
      vendorTitle: product.title,
      vendorType: product.product_type,
      image: relPath,
    };
    console.log(`  ${cat.padEnd(15)} -> ${product.title}`);
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`\nDone. ${downloaded} new images, ${(totalBytes/1024/1024).toFixed(2)} MB.`);
  if (missing.length) console.log(`Missing: ${missing.join(', ')}`);
}

main().catch(e => { console.error(e); process.exit(1); });
