// scripts/scrape-jbros.js
// J Bros Lures uses WooCommerce. Parent products live at
// /wp-json/wc/store/products and variations at /products?type=variation&parent=ID.
// Variations expose per-color images with the color in the filename, e.g.
// "jbros-lures-trifinity-worm-red-bug.jpg". We match catalog SKUs to variation
// images by normalizing the catalog `color` field and looking for it as a
// substring of the variation image filename.

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.resolve(__dirname, '..');
const IMG_DIR = path.join(ROOT, 'images', 'jbros');
const MANIFEST_PATH = path.join(__dirname, 'jb-image-manifest.json');

// Catalog category -> vendor parent product (matched by title regex).
// Falls back to a "use this parent's image as a generic stand-in" relationship
// for catalog categories the vendor doesn't list publicly.
const CATEGORY_MAP = {
  trifinity_6:         { titleRe: /^6"? Trifinity Worm$/i },
  bfw_10:              { titleRe: /^10"? Trifinity Big Freaking Worm$/i },
  sentinel_tube_4:     { titleRe: /^4"? Sentinel$/i },
  sentinel_tube_2_875: { titleRe: /^4"? Sentinel$/i, note: 'no 2.875" vendor page, using 4" image' },
  stick_bait_5:        { titleRe: /^5"? Fatty Stick Bait$/i },
  skinny_stick:        { titleRe: /^5"? Skinny Stick$/i },
  ned_double_trouble:  { titleRe: /^3"? Double Trouble$/i },
  ned_ball_point:      { titleRe: /^3"? Double Trouble$/i, note: 'no Ball Point vendor page, using Double Trouble image' },
  grub_2:              { titleRe: /^2"? Grub$/i },
  grub_3:              { titleRe: /^3"? Grub$/i },
  glider_3:            { titleRe: /^3"? Glider$/i },
  glider_55:           { titleRe: /^5\.5"? Glider$/i },
  haymaker:            { titleRe: /^6\.5"? Haymaker$/i },
  jester_3:            { titleRe: /^3"? Jester$/i },
  jester_425:          { titleRe: /^4\.25"? Jester$/i },
  patriot:             { titleRe: /^3"? Double Trouble$/i, note: 'no Patriot vendor page, using Double Trouble image' },
  leech:               { titleRe: /^4"? Ditch Lobster$/i, note: 'no Leech vendor page, using Ditch Lobster image' },
  ditch_lobster:       { titleRe: /^4"? Ditch Lobster$/i },
};

function decodeEntities(s) {
  return String(s || '')
    .replace(/&#8243;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"');
}

function colorKey(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]/g, ''); }

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

async function getJSON(url) {
  const buf = await get(url);
  return JSON.parse(buf.toString('utf8').replace(/^﻿/, ''));
}

async function downloadFile(url, dest) {
  fs.writeFileSync(dest, await get(url));
}

async function main() {
  fs.mkdirSync(IMG_DIR, { recursive: true });

  console.log('Fetching parent products …');
  const allParents = [];
  for (let p = 1; p <= 10; p++) {
    const page = await getJSON(`https://www.jbroslures.com/wp-json/wc/store/products?per_page=100&page=${p}`);
    if (!page.length) break;
    allParents.push(...page);
  }
  console.log(`Vendor parents: ${allParents.length}`);

  // Pre-fetch variations for each unique parent we care about.
  const parentByCat = {};
  for (const [cat, conf] of Object.entries(CATEGORY_MAP)) {
    const parent = allParents.find(p => conf.titleRe.test(decodeEntities(p.name)));
    if (!parent) { console.log(`  MISSING parent for ${cat}: ${conf.titleRe}`); continue; }
    parentByCat[cat] = parent;
  }
  const uniqueParentIds = [...new Set(Object.values(parentByCat).map(p => p.id))];
  console.log(`Fetching variations for ${uniqueParentIds.length} unique parents …`);
  const variationsById = {};
  for (const pid of uniqueParentIds) {
    const vars = await getJSON(`https://www.jbroslures.com/wp-json/wc/store/products?type=variation&parent=${pid}&per_page=100`);
    variationsById[pid] = vars;
  }

  // Load catalog (parsed earlier — file has plain SKU rows we can regex).
  const catalogSrc = fs.readFileSync(path.join(ROOT, 'jbros-catalog.js'), 'utf8');
  const catalog = [];
  let currentCat = null;
  for (const line of catalogSrc.split(/\r?\n/)) {
    const c = line.match(/^\s*([a-z_0-9]+):\s*\[/);
    if (c) { currentCat = c[1]; continue; }
    // Allow escaped double-quotes inside JSON-stringified desc/color values
    // (e.g. `BFW 10\" Trifinity ...`, `4.25\"`).
    const m = line.match(/sku:'(JB-[^']+)', upc:'([^']*)', desc:("(?:[^"\\]|\\.)*"|'[^']*'), color:("(?:[^"\\]|\\.)*"|'[^']*')/);
    if (m && currentCat) {
      const color = m[4].startsWith('"') ? JSON.parse(m[4]) : m[4].slice(1, -1);
      catalog.push({ sku: m[1], upc: m[2], cat: currentCat, color });
    }
  }
  console.log(`Catalog SKUs: ${catalog.length}`);

  const manifest = {};
  let totalBytes = 0, exact = 0, fallback = 0, missing = 0;

  for (const item of catalog) {
    const parent = parentByCat[item.cat];
    if (!parent) { missing++; continue; }
    const vars = variationsById[parent.id] || [];
    const ck = colorKey(item.color);

    // Find a variation whose image filename contains the color key.
    let varImg = null;
    for (const v of vars) {
      const img = v.images?.[0]?.src;
      if (!img) continue;
      const file = img.split('/').pop().split('?')[0].replace(/\.(jpe?g|png|webp)$/i, '');
      if (colorKey(file).includes(ck)) { varImg = img; break; }
    }
    // Fallback: parent's first image.
    if (!varImg) varImg = parent.images?.[0]?.src;
    if (!varImg) { missing++; continue; }

    // WP pre-generates -600x600 thumbnails for theme images. Try that first.
    const baseUrl = varImg.split('?')[0];
    const url = baseUrl.replace(/(\.[a-z]{3,4})$/i, '-600x600$1');
    const lineDir = item.cat.replace(/_/g, '-');
    const dirAbs = path.join(IMG_DIR, lineDir);
    fs.mkdirSync(dirAbs, { recursive: true });
    const filename = `${item.upc}.jpg`;
    const relPath = `images/jbros/${lineDir}/${filename}`;
    const dest = path.join(dirAbs, filename);
    if (!fs.existsSync(dest)) {
      // -600x600 isn't always pre-generated; fall back to original on 404.
      let tried = url;
      try {
        await downloadFile(tried, dest);
      } catch (e) {
        tried = baseUrl;
        try { await downloadFile(tried, dest); }
        catch (e2) { console.error(`  ${item.sku}: ${e2.message}`); missing++; continue; }
      }
      totalBytes += fs.statSync(dest).size;
    }
    manifest[item.sku] = { image: relPath, color: item.color, fromVariant: !!vars.find(v => v.images?.[0]?.src === varImg) };
    if (varImg !== parent.images?.[0]?.src) exact++; else fallback++;
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`\nMatched: ${exact} variant, ${fallback} parent fallbacks, ${missing} missing.`);
  console.log(`Total bytes: ${(totalBytes/1024/1024).toFixed(2)} MB`);
}

main().catch(e => { console.error(e); process.exit(1); });
