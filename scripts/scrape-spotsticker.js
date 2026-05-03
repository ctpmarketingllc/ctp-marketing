// scripts/scrape-spotsticker.js
// Scrape SpotSticker WooCommerce product pages, extracting variant data and
// per-variant image URLs. Output: per-category manifest of {size|color -> image path}.
//
// Usage: node scripts/scrape-spotsticker.js
//
// SpotSticker organizes products in two patterns:
//   1. One page per product line — color is a variant attribute (e.g. wide-gap-jig-heads-standard).
//      The page exposes attributes like {color, size}.
//   2. One page per color — color is implied by the page (e.g. black-hand-tied-casting-jigs).
//      Variants only differ by size.
// The config below names each page and tags it with its implicit color (if any).

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.resolve(__dirname, '..');
const IMG_DIR = path.join(ROOT, 'images', 'spotsticker');
const MANIFEST_PATH = path.join(__dirname, 'ss-image-manifest.json');

// `pages`: array of { slug, color? } for each catalog category.
// `color` is set when the page itself represents a single color (multi-page categories).
const CONFIG = {
  wide_gap:           { pages: [{ slug: 'wide-gap-jig-heads-standard' }] },
  long_shank:         { pages: [{ slug: 'long-shank-jig-heads-standard' }] },
  magnum:             { pages: [{ slug: 'magnum-jig-heads-standard' }] },
  pro_ball:           { pages: [
    { slug: 'green-jig-heads-pro-series-ball-head-2', color: 'Green Pumpkin' },
    { slug: 'black-jig-heads-pro-series-ball-head-2', color: 'Black' },
  ] },
  pro_football:       { pages: [
    { slug: 'black-jig-heads-pro-series-football-head', color: 'Black' },
  ] },
  football_ewg:       { pages: [
    { slug: 'black-jig-heads-football-ewg-head', color: 'Black' },
  ] },
  screwball_shaky:    { pages: [{ slug: 'pro-series-screwball-shaky' }] },
  crawler_heads:      { pages: [
    { slug: 'green-pumpkin-crawler-heads', color: 'Green Pumpkin' },
  ] },
  dropshot_cylinder:  { pages: [{ slug: 'finesse-dropshot-weights-cylinder' }] },
  dropshot_teardrop:  { pages: [{ slug: 'finesse-dropshot-weights-teardrop' }] },
  underspins:         { pages: [
    { slug: 'albino-underspins',         color: 'Albino' },
    { slug: 'ark-shiner-underspins',     color: 'Ark Shiner' },
    { slug: 'white-underspins',          color: 'White' },
    { slug: 'pearl-white-pearl-underspin', color: 'White (Painted)' },
  ] },
  football_swimbait:  { pages: [{ slug: 'football-swimbait-head' }] },
  screwlock_swimbait: { pages: [{ slug: 'screwlock-swimbait-heads' }] },
  twin_tail_grub:     { pages: [{ slug: '5-twin-tail-grub' }] },
  finesse_stick:      { pages: [{ slug: '6-finesse-stick' }] },
  dropshot_worm_6:    { pages: [{ slug: 'drop-shot-worms' }] },
  dropshot_worm_45:   { pages: [{ slug: 'drop-shot-worms' }] },
  swimbait_38:        { pages: [{ slug: '3-8-soft-swimbait' }] },
  swimbait_33:        { pages: [{ slug: '3-swimbait' }] },
  casting_jigs:       { pages: [
    { slug: 'black-hand-tied-casting-jigs',           color: 'Black' },
    { slug: 'brown-hand-tied-casting-jigs',           color: 'Brown' },
    { slug: 'brownolive-hand-tied-casting-jigs',      color: 'Brown/Olive' },
    { slug: 'brownmelon-hand-tied-casting-jigs',      color: 'Brown/Melon' },
    { slug: 'brownorange-hand-tied-casting-jigs',     color: 'Brown/Orange' },
    { slug: 'brownpurple-casting-jig',                color: 'Brown/Purple' },
    { slug: 'green-craw-hand-tied-casting-jigs',      color: 'Green Craw' },
    { slug: 'georgia-craw-hand-tied-casting-jigs',    color: 'Georgia Craw' },
    { slug: 'chartreuse-craw-hand-tied-casting-jigs', color: 'Chartreuse Craw' },
    { slug: 'green-pumpkin-craw',                     color: 'Green Pumpkin Craw' },
    { slug: 'rootbeer-hand-tied-casting-jigs',        color: 'Rootbeer' },
    { slug: 'cinnamon-pepper-hand-tied-casting-jigs', color: 'Cinnamon Pepper' },
    { slug: 'dark-smoke-hand-tied-casting-jigs',      color: 'Dark Smoke' },
    { slug: 'pbj-hand-tied-casting-jigs',             color: 'PB&J' },
    { slug: 'black-pumpkin-hand-tied-casting-jig',    color: 'Black Pumpkin' },
    { slug: 'spot-c-ducer-hand-tied-casting-jig',     color: 'Spot C Ducer' },
    { slug: 'black-blue-reptile-hand-tied-casting-jig',  color: 'Reptile - Black/Blue' },
    { slug: 'brown-orange-reptile-hand-tied-casting-jig', color: 'Reptile - Brown/Orange' },
    { slug: 'brown-black-reptile-hand-tied-casting-jig',  color: 'Reptile - Brown/Black' },
    { slug: 'green-pearl-casting-jig-swim-jig',       color: 'Green Pearl' },
  ] },
  football_jigs:      { pages: [
    { slug: 'green-craw-blue-hand-tied-football-jig',   color: 'Green Craw' },
    { slug: 'georgia-craw-hand-tied-football-jig',      color: 'Georgia Craw' },
    { slug: 'green-pumpkin-craw-hand-tied-football-jig', color: 'Green Pumpkin Craw' },
    { slug: 'pbj-hand-tied-football-jig',                color: 'PB&J' },
    { slug: 'black-pumpkin-hand-tied-football-jig',      color: 'Black Pumpkin' },
    { slug: 'black-blue-reptile-hand-tied-football-jig', color: 'Reptile - Black/Blue' },
    { slug: 'brown-orange-reptile-hand-tied-football-jig', color: 'Reptile - Brown/Orange' },
  ] },
};

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode === 404) return resolve(null);
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
  if (!buf) throw new Error(`empty response`);
  fs.writeFileSync(dest, buf);
  return buf.length;
}

function decodeAttr(s) {
  return s.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&#039;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

function extractVariations(html) {
  const m = html.match(/data-product_variations="([^"]+)"/);
  if (!m) return null;
  try { return JSON.parse(decodeAttr(m[1])); } catch { return null; }
}

// Pull product hero image — try multiple fallbacks since some SpotSticker pages
// lack og:image and have no Yoast/structured-data block.
function extractHeroImage(html) {
  const og = html.match(/<meta property="og:image" content="([^"]+)"/);
  if (og) return og[1];
  const gallery = html.match(/woocommerce-product-gallery__wrapper[\s\S]*?<img[^>]+src="([^"]+)"/);
  if (gallery) {
    // Replace any sizing suffix with -400x400 to keep file size in check.
    const withSize = gallery[1].replace(/-\d+x\d+(\.[a-z]{3,4})$/, '-400x400$1');
    return /-\d+x\d+\.[a-z]{3,4}$/.test(withSize) ? withSize : gallery[1];
  }
  return null;
}

function slugify(s) {
  return s.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

// Normalize size strings: "1/8oz" -> "1/8 oz", "3/8 OZ" -> "3/8 oz".
function normSize(s) {
  if (!s) return '';
  return String(s).toLowerCase().replace(/\s+/g, ' ').replace(/(\d)oz/, '$1 oz').trim();
}

function getColorFromAttrs(attrs) {
  for (const [k, v] of Object.entries(attrs || {})) {
    if (/color|colour|colorway/i.test(k)) return v;
  }
  return null;
}

function getSizeFromAttrs(attrs) {
  for (const [k, v] of Object.entries(attrs || {})) {
    if (/^attribute_size$/i.test(k) || /size|weight/i.test(k)) return v;
  }
  return null;
}

function getPackFromAttrs(attrs) {
  for (const [k, v] of Object.entries(attrs || {})) {
    if (/pack|quantity/i.test(k)) return v;
  }
  return null;
}

async function scrapePage(slug, implicitColor) {
  const url = `https://spotsticker.com/shop/${slug}/`;
  const html = (await get(url))?.toString('utf8');
  if (!html) throw new Error('404');
  const variants = extractVariations(html);
  const hero = extractHeroImage(html);
  const items = [];
  if (variants && variants.length) {
    for (const v of variants) {
      const color = getColorFromAttrs(v.attributes) || implicitColor || null;
      const size = normSize(getSizeFromAttrs(v.attributes));
      const pack = getPackFromAttrs(v.attributes);
      // Prefer the WooCommerce-rendered 400x400 (`src`) over the original (`full_src`).
      // Table thumb is 56px and lightbox caps at 800px — 400px is plenty and saves ~5x disk.
      const src = v.image?.src || v.image?.full_src || v.image?.url;
      items.push({ color, size, pack, image: src, sku: v.sku || null });
    }
  } else if (hero) {
    // Single-variant product (no variations). Use hero.
    items.push({ color: implicitColor, size: null, pack: null, image: hero, sku: null });
  }
  return { items, hero };
}

async function main() {
  fs.mkdirSync(IMG_DIR, { recursive: true });
  const manifest = {};
  const downloaded = new Set();
  let totalBytes = 0;

  for (const [cat, conf] of Object.entries(CONFIG)) {
    const lineDir = cat.replace(/_/g, '-');
    const lineDirAbs = path.join(IMG_DIR, lineDir);
    fs.mkdirSync(lineDirAbs, { recursive: true });
    manifest[cat] = { _slugs: conf.pages.map(p => p.slug), variants: [] };

    for (const page of conf.pages) {
      process.stdout.write(`[${cat}] ${page.slug}${page.color ? ` (${page.color})` : ''} … `);
      try {
        const { items, hero } = await scrapePage(page.slug, page.color);
        // First page's hero becomes the category fallback.
        if (hero && !manifest[cat]._main) {
          const filename = '_main.jpg';
          const relPath = `images/spotsticker/${lineDir}/${filename}`;
          const dest = path.join(lineDirAbs, filename);
          if (!fs.existsSync(dest)) {
            const bytes = await downloadFile(hero, dest);
            totalBytes += bytes;
            downloaded.add(relPath);
          }
          manifest[cat]._main = relPath;
        }
        for (const item of items) {
          if (!item.image) continue;
          // Filename: per-page (color) + size, to keep variants from colliding across pages.
          const colorPart = item.color ? slugify(item.color) : 'main';
          const sizePart = item.size ? slugify(item.size) : '';
          const filename = sizePart ? `${colorPart}-${sizePart}.jpg` : `${colorPart}.jpg`;
          const relPath = `images/spotsticker/${lineDir}/${filename}`;
          const dest = path.join(lineDirAbs, filename);
          if (!downloaded.has(relPath) && !fs.existsSync(dest)) {
            try {
              const bytes = await downloadFile(item.image, dest);
              totalBytes += bytes;
              downloaded.add(relPath);
              process.stdout.write('.');
            } catch (e) {
              process.stdout.write('!');
            }
          }
          manifest[cat].variants.push({
            color: item.color,
            size: item.size,
            pack: item.pack,
            image: relPath,
          });
        }
        process.stdout.write(` ${items.length} variants\n`);
      } catch (e) {
        process.stdout.write(` ERROR: ${e.message}\n`);
      }
    }
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`\nDone. ${downloaded.size} new images, ${(totalBytes/1024/1024).toFixed(2)} MB.`);
  console.log(`Manifest: ${path.relative(ROOT, MANIFEST_PATH)}`);
}

main().catch(e => { console.error(e); process.exit(1); });
