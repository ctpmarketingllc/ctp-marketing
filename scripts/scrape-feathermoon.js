// scripts/scrape-feathermoon.js
// FeatherMoon is on Squarespace, which conveniently exposes a JSON view at
// /shop?format=json-pretty. Build a slug -> {title, image} map, download
// per-SKU images using the manual catalog SKU -> vendor slug mapping below.

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.resolve(__dirname, '..');
const IMG_DIR = path.join(ROOT, 'images', 'feathermoon');
const MANIFEST_PATH = path.join(__dirname, 'fm-image-manifest.json');
const SHOP_JSON_URL = 'https://www.feathermoonoutdoors.com/shop?format=json-pretty';

// Catalog SKU -> vendor product slug. Some catalog SKUs don't have a clean
// 1:1 with a vendor product (e.g. "Laminate Pot" — vendor sells various pot
// calls but no single matching title), so we leave those null and fall back
// to a generic image at apply time.
const SKU_MAP = {
  'FM-MOUTHCALL-1':  'feathermoon-smack-talker-mouth-call-new-for-2025',
  'FM-MOUTHCALL-3':  'hunter-series-3-pack',
  'FM-WALNUTSLATE':  'walnut-pot-call',
  'FM-NEWLAMINATE':  null,                       // no vendor match — uses generic
  'FM-LAMINATE':     null,                       // no vendor match — uses generic
  'FM-CHERRYPOT':    'palm-t723h',               // "Cherry Pot Call"
  'FM-CHERRYFLIP':   'the-game-changer',
  'FM-CAMOFLIP':     null,                       // no vendor match — uses generic
  'FM-GRUNTCALL':    'pencil-plant-6r8kh',       // "Grunt Call"
  'FM-WALNUTFLIP':   'walnut-pot-call',
  'FM-PREDCALL':     'rabbit-distress-call',
  'FM-CONDSTONES':   '3-in-1-conditioning-stone',
  'FM-CROWCALL':     'snake-jlw7h',              // "Crow Call"
  'FM-BLEATCAN':     'lily-kejg9',               // "Hot Spot Bleat Can"
  'FM-OWLHOOTER':    'owl-hooter',
};

// Fallback image source for SKUs without a direct match (a representative
// pot-call vendor product, since most unmapped SKUs are pot calls).
const GENERIC_FALLBACK_SLUG = 'walnut-pot-call';

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
  const buf = await get(url);
  fs.writeFileSync(dest, buf);
  return buf.length;
}

async function main() {
  fs.mkdirSync(IMG_DIR, { recursive: true });

  console.log('Fetching Squarespace shop JSON …');
  const json = JSON.parse((await get(SHOP_JSON_URL)).toString('utf8'));
  const slugMap = {};
  for (const item of json.items || []) {
    if (item.urlId && item.assetUrl) {
      slugMap[item.urlId] = { title: item.title, assetUrl: item.assetUrl };
    }
  }
  console.log(`Vendor products indexed: ${Object.keys(slugMap).length}`);

  const manifest = {};
  let totalBytes = 0, downloaded = 0, missingSlugs = [];

  for (const [sku, slug] of Object.entries(SKU_MAP)) {
    const targetSlug = slug || GENERIC_FALLBACK_SLUG;
    const product = slugMap[targetSlug];
    if (!product) {
      missingSlugs.push(`${sku} -> ${targetSlug}`);
      continue;
    }
    // Squarespace CDN: append ?format=600w for a 600px-wide rendition.
    const url = product.assetUrl + (product.assetUrl.includes('?') ? '&' : '?') + 'format=600w';
    const filename = `${sku.replace('FM-', '').toLowerCase()}.jpg`;
    const relPath = `images/feathermoon/${filename}`;
    const dest = path.join(IMG_DIR, filename);
    if (!fs.existsSync(dest)) {
      try {
        const bytes = await downloadFile(url, dest);
        totalBytes += bytes;
        downloaded++;
      } catch (e) {
        console.error(`  ${sku}: download err ${e.message}`);
      }
    }
    manifest[sku] = {
      title: product.title,
      slug: targetSlug,
      isFallback: !slug,
      image: relPath,
    };
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`\nDone. ${downloaded} new images, ${(totalBytes/1024/1024).toFixed(2)} MB.`);
  console.log(`Manifest: ${path.relative(ROOT, MANIFEST_PATH)}`);
  if (missingSlugs.length) {
    console.log(`\nUnresolved slugs:`);
    missingSlugs.forEach(m => console.log('  ' + m));
  }
}

main().catch(e => { console.error(e); process.exit(1); });
