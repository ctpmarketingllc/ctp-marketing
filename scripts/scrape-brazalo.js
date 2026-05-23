// scripts/scrape-brazalo.js
// Brazalo Custom Lures is on Shopify. Each catalog category maps to a
// single Brazalo product whose variants encode "Color / Size". Variant
// images are referenced via image.variant_ids (each image is linked to
// the 1-2 variants it depicts).

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.resolve(__dirname, '..');
const IMG_DIR = path.join(ROOT, 'images', 'brazalo');
const MANIFEST_PATH = path.join(__dirname, 'brz-image-manifest.json');
const PRODUCTS_URL = 'https://brazalocustomlures.com/products.json?limit=250';

// Catalog category -> vendor product matchers. `titleRe` selects the
// Shopify product whose variants will be scraped. For categories that
// span multiple Shopify products (football_jigs covers FTBL and FLOJ),
// `skuPrefix` further partitions catalog SKUs.
const CATEGORY_SOURCES = [
  { cat: 'swim_jigs',          titleRe: /^Brazalo Custom Lures Swim Jigs(?! Finesse)/ },
  { cat: 'football_jigs',      titleRe: /Football Jigs/i,                          skuPrefix: 'BRZ-FTBL' },
  { cat: 'football_jigs',      titleRe: /Football Jigs/i,                          skuPrefix: 'BRZ-FBTL' }, // CSV typo, same product
  { cat: 'football_jigs',      titleRe: /Flat Out Jigs/i,                          skuPrefix: 'BRZ-FLOJ' },
  { cat: 'finesse_swim_jigs',  titleRe: /Brazalo Custom Lures Finesse Swim Jigs/i },
  { cat: 'jigs_501',           titleRe: /Brazalo Custom Lures 501 Jig/i },
  { cat: 'power_finesse_jigs', titleRe: /Power Finesse Jigs/i },
  { cat: 'b_ned',              titleRe: /B-Ned Rig/i },
  { cat: 'tko_ffs_head',       titleRe: /T\.K\.O\. FFS Head – Forward Facing/i },
  { cat: 'skirted_tko_ffs',    titleRe: /Skirted T\.K\.O\. FFS/i },
];

function colorKey(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]/g, ''); }
function sizeKey(s)  { return String(s || '').match(/[\d.]+(?:\/[\d.]+)?/)?.[0]?.replace(/[.\/]/g, '') || ''; }

// Catalog color spellings that the vendor uses differently.
const COLOR_ALIASES = {
  'GP Shad':        'gpshad',
  'GP Purple':      'gppurple',
  'Green Pumpkin Orange': 'greenpumpkinorange',
  'PB&J':           'pbj',
  'Black n Blue':   'blacknblue',
  'Black N Blue':   'blacknblue',
  // Catalog spelling -> vendor's normalized form
  'Cajun Junebug':  'cajunjunebug',
};

function normColor(c) {
  if (COLOR_ALIASES[c]) return COLOR_ALIASES[c];
  return colorKey(c);
}

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(get(res.headers.location));
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function downloadFile(url, dest) {
  fs.writeFileSync(dest, await get(url));
}

// Index a Shopify product's images by variant_id and capture a hero/main URL.
function indexImages(product) {
  const byVariant = {};
  let main = null;
  for (const img of product.images || []) {
    if (!main) main = img.src;
    for (const vid of img.variant_ids || []) {
      if (!byVariant[vid]) byVariant[vid] = img.src;
    }
  }
  return { byVariant, main: main || product.image?.src || null };
}

async function main() {
  fs.mkdirSync(IMG_DIR, { recursive: true });
  console.log('Fetching products.json …');
  const j = JSON.parse((await get(PRODUCTS_URL)).toString('utf8'));

  // Pre-index each catalog source.
  const sources = [];
  for (const s of CATEGORY_SOURCES) {
    const product = j.products.find(p => s.titleRe.test(p.title));
    if (!product) { console.log(`MISSING vendor product for ${s.cat}: ${s.titleRe}`); continue; }
    const idx = indexImages(product);
    // Build variant lookup by (colorKey, sizeKey).
    const variants = product.variants.map(v => {
      // Split only on the FIRST " / " — the size half can contain "/" too (e.g. "3/8 oz").
      const title = v.title || '';
      const idx = title.indexOf(' / ');
      const colorRaw = idx >= 0 ? title.slice(0, idx) : title;
      const sizeRaw  = idx >= 0 ? title.slice(idx + 3) : '';
      return { id: v.id, colorKey: colorKey(colorRaw), sizeKey: sizeKey(sizeRaw), title };
    });
    sources.push({ ...s, product, variants, imageByVariant: idx.byVariant, mainImage: idx.main });
    console.log(`  ${s.cat}${s.skuPrefix ? ' ['+s.skuPrefix+']' : ''} -> ${product.title} (${variants.length} variants)`);
  }

  // Load brazalo-catalog.js — we won't `require` it (it references browser globals).
  // Just regex out each SKU's cat/color/size from the source.
  const catalogSrc = fs.readFileSync(path.join(ROOT, 'brazalo-catalog.js'), 'utf8');
  const skuRe = /\{ sku:'([^']+)', model:'([^']+)', upc:'([^']*)', desc:.*?, size:'([^']*)', color:(?:"([^"]*)"|'([^']*)').*?\}/g;

  // Determine the catalog category each SKU belongs to.
  // We need the section the SKU appears in — parse line-by-line.
  const catalog = [];
  let currentCat = null;
  for (const line of catalogSrc.split(/\r?\n/)) {
    const catMatch = line.match(/^\s*([a-z_0-9]+):\s*\[/);
    if (catMatch && /^(swim_jigs|football_jigs|finesse_swim_jigs|jigs_501|power_finesse_jigs|smallie_ballz|b_ned|tko_ffs_head|skirted_tko_ffs)$/.test(catMatch[1])) {
      currentCat = catMatch[1]; continue;
    }
    const m = line.match(/\{ sku:'([^']+)', model:'([^']+)', upc:'[^']*', desc:.*?, size:'([^']*)', color:("[^"]*"|'[^']*')/);
    if (m && currentCat) {
      const sku = m[1], model = m[2], size = m[3], color = m[4].slice(1, -1);
      catalog.push({ sku, model, cat: currentCat, color, size });
    }
  }
  console.log(`\nCatalog SKUs read: ${catalog.length}`);

  const manifest = {};
  const downloaded = new Set();
  let totalBytes = 0;
  let exact = 0, fallback = 0, missing = 0;

  for (const item of catalog) {
    // Pick source by cat + optional sku prefix.
    const src = sources.find(s => s.cat === item.cat && (!s.skuPrefix || item.sku.startsWith(s.skuPrefix)));
    if (!src) { missing++; continue; }

    const ck = normColor(item.color);
    const sk = sizeKey(item.size);
    // Look for a variant matching both color and size; allow color-only fallback.
    const exactV = src.variants.find(v => v.colorKey === ck && v.sizeKey === sk);
    const colorV = exactV || src.variants.find(v => v.colorKey === ck);
    const variant = colorV;

    let imgSrc = variant ? src.imageByVariant[variant.id] : null;
    if (!imgSrc) imgSrc = src.mainImage;
    if (!imgSrc) { missing++; continue; }

    // Strip Shopify CDN size suffix and add ?width=600.
    const baseUrl = imgSrc.split('?')[0];
    const url = baseUrl + '?width=600';
    const lineDir = item.cat.replace(/_/g, '-');
    const lineDirAbs = path.join(IMG_DIR, lineDir);
    fs.mkdirSync(lineDirAbs, { recursive: true });
    const filename = `${item.sku.replace('BRZ-', '').toLowerCase()}.jpg`;
    const relPath = `images/brazalo/${lineDir}/${filename}`;
    const dest = path.join(lineDirAbs, filename);
    if (!fs.existsSync(dest)) {
      try {
        await downloadFile(url, dest);
        totalBytes += fs.statSync(dest).size;
        downloaded.add(relPath);
      } catch (e) { console.error(`  ${item.sku}: ${e.message}`); missing++; continue; }
    }
    manifest[item.sku] = { image: relPath, color: item.color, size: item.size };
    if (exactV) exact++; else fallback++;
  }

  // For smallie_ballz (no vendor product), reuse the swim_jigs main image.
  const fallbackMain = sources.find(s => s.cat === 'swim_jigs')?.mainImage;
  if (fallbackMain) {
    for (const item of catalog) {
      if (manifest[item.sku]) continue;
      if (item.cat !== 'smallie_ballz') continue;
      const baseUrl = fallbackMain.split('?')[0];
      const url = baseUrl + '?width=600';
      const lineDirAbs = path.join(IMG_DIR, 'smallie-ballz');
      fs.mkdirSync(lineDirAbs, { recursive: true });
      const filename = '_main.jpg';
      const relPath = 'images/brazalo/smallie-ballz/_main.jpg';
      const dest = path.join(lineDirAbs, filename);
      if (!fs.existsSync(dest)) {
        try { await downloadFile(url, dest); totalBytes += fs.statSync(dest).size; downloaded.add(relPath); } catch {}
      }
      manifest[item.sku] = { image: relPath, color: item.color, size: item.size, isFallback: true };
      missing--; fallback++;
    }
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`\nMatched: ${exact} exact, ${fallback} fallbacks, ${missing} missing.`);
  console.log(`Downloaded ${downloaded.size} images, ${(totalBytes/1024/1024).toFixed(2)} MB.`);
}

main().catch(e => { console.error(e); process.exit(1); });
