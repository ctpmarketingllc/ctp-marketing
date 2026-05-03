// scripts/scrape-copperred.js
// Walk Copper Red Baits sitemap, fetch each product page, extract og:title + og:image,
// download the image (resized via Square's ?width param), output manifest.

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.resolve(__dirname, '..');
const IMG_DIR = path.join(ROOT, 'images', 'copperred');
const MANIFEST_PATH = path.join(__dirname, 'cr-image-manifest.json');
const SITEMAP_URL = 'https://copper-red-baits-llc.square.site/sitemap.xml';
const FETCH_DELAY_MS = 400;
const IMAGE_WIDTH = 600;

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
  if (!buf) throw new Error('empty');
  fs.writeFileSync(dest, buf);
  return buf.length;
}

function slugify(s) {
  return s.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

// Map of product-line keyword (case-insensitive substring of og:title)
// to {category_key, image_subdir}.
// Vendor pages don't differentiate 1/2oz vs 3/4oz Snatchin Shad in titles —
// both sizes share visual artwork per color. The applier will reuse half-oz
// images for 3/4oz SKUs by matching the (color, rattling|silent) tuple.
const LINE_KEYWORDS = [
  { match: /snatchin\s+shad.*silen/i,                   cat: 'snatchin_shad_half_silent' },
  { match: /snatchin\s+shad.*rattl/i,                   cat: 'snatchin_shad_half_rattling' },
  { match: /jonah/i,                                    cat: 'jonah_jerkbait' },
  { match: /shank/i,                                    cat: 'the_shank' },
  { match: /loud\s+mouth/i,                             cat: 'loud_mouth' },
  { match: /ripple\s+frog/i,                            cat: 'ripple_frog' },
  { match: /tsunami\s+frog/i,                           cat: 'tsunami_frog' },
  { match: /wave\s+frog/i,                              cat: 'wave_frog' },
];

function categorizeTitle(title) {
  for (const { match, cat } of LINE_KEYWORDS) if (match.test(title)) return cat;
  return null;
}

// Pull "(Color)" out of "Jonah 1:17 (Clown) | Copper Red Baits LLC".
function extractColor(title) {
  const m = title.match(/\(([^)]+)\)/);
  return m ? m[1].trim() : null;
}

async function main() {
  fs.mkdirSync(IMG_DIR, { recursive: true });

  // 1. Pull sitemap, list product URLs.
  console.log('Fetching sitemap …');
  const xml = (await get(SITEMAP_URL)).toString('utf8');
  const allUrls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  const productUrls = allUrls.filter(u => /\/product\//.test(u) && !/dri-fit-hoodie/.test(u));
  // Deduplicate by stem: prefer non-"-tackle-store" version.
  const stemMap = new Map();
  for (const url of productUrls) {
    const slug = url.match(/\/product\/([^/]+)\//)?.[1] || url;
    const stem = slug.replace(/-tackle-store$/, '');
    if (!stemMap.has(stem) || !/-tackle-store$/.test(slug)) stemMap.set(stem, url);
  }
  const uniqueUrls = [...stemMap.values()];
  console.log(`Sitemap: ${productUrls.length} product URLs, ${uniqueUrls.length} after dedup.`);

  // 2. Fetch each product, extract og:title + og:image.
  const manifest = {};
  const downloaded = new Set();
  let totalBytes = 0, errors = 0;

  for (let i = 0; i < uniqueUrls.length; i++) {
    const url = uniqueUrls[i];
    process.stdout.write(`[${i + 1}/${uniqueUrls.length}] `);
    try {
      const html = (await get(url)).toString('utf8');
      const titleMatch = html.match(/<meta property="og:title" content="([^"]+)"/);
      const imageMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
      if (!titleMatch || !imageMatch) {
        process.stdout.write(`SKIP: missing meta\n`);
        await sleep(FETCH_DELAY_MS);
        continue;
      }
      let title = titleMatch[1].replace(/\s*\|\s*Copper Red Baits LLC\s*$/, '').trim();
      const color = extractColor(title);
      const cat = categorizeTitle(title);

      if (!cat) {
        process.stdout.write(`SKIP: ${title} (no category)\n`);
        await sleep(FETCH_DELAY_MS);
        continue;
      }

      // Square CDN ignores `width` alone; requires BOTH width AND height.
      const imgUrl = imageMatch[1] + (imageMatch[1].includes('?') ? '&' : '?') + `width=${IMAGE_WIDTH}&height=${IMAGE_WIDTH}`;
      const lineDir = cat.replace(/_/g, '-');
      const lineDirAbs = path.join(IMG_DIR, lineDir);
      fs.mkdirSync(lineDirAbs, { recursive: true });

      const filename = `${slugify(color || 'main')}.jpg`;
      const relPath = `images/copperred/${lineDir}/${filename}`;
      const dest = path.join(lineDirAbs, filename);
      if (!downloaded.has(relPath) && !fs.existsSync(dest)) {
        try {
          const bytes = await downloadFile(imgUrl, dest);
          totalBytes += bytes;
          downloaded.add(relPath);
        } catch (e) {
          process.stdout.write(`(img err: ${e.message}) `);
        }
      }
      manifest[cat] ||= { variants: [] };
      manifest[cat].variants.push({ title, color, image: relPath });
      process.stdout.write(`${title}\n`);
    } catch (e) {
      errors++;
      process.stdout.write(`ERR: ${e.message}\n`);
    }
    await sleep(FETCH_DELAY_MS);
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`\nDone. ${downloaded.size} images, ${(totalBytes/1024/1024).toFixed(2)} MB. ${errors} errors.`);
  console.log(`Manifest: ${path.relative(ROOT, MANIFEST_PATH)}`);
  // Per-category counts
  for (const [cat, m] of Object.entries(manifest)) {
    console.log(`  ${cat}: ${m.variants.length} variants`);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
