// scripts/scrape-queen-tackle.js
// Scrape Queen Tackle product pages for color->image mappings, download images,
// and write a manifest so the catalog can be updated.
//
// Usage: node scripts/scrape-queen-tackle.js
//
// Output:
//   images/queen-tackle/<line>/<color-slug>.jpg  (one per unique color, namespaced per product line)
//   images/queen-tackle/<line>/_main.jpg         (single-image products)
//   scripts/qt-image-manifest.json               (catalog_key -> {color -> rel_path, _main: rel_path})

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.resolve(__dirname, '..');
const IMG_DIR = path.join(ROOT, 'images', 'queen-tackle');
const MANIFEST_PATH = path.join(__dirname, 'qt-image-manifest.json');

// Catalog category key -> array of vendor product page slugs.
// Multiple slugs when one catalog category covers multiple vendor pages
// (e.g., porcupine_balls covers Baby 8 + Deadcenter 15).
const SLUGS = {
  porcupine_balls:            ['baby-8-porcupine-balls', 'deadcenter-15'],
  ghost_jig_heads:            ['ghost-finesse-jig-head'],
  ls_rollin_strollin:         ['ls-tungsten-rollin-strollin-jig-heads'],
  line_throughs_nail_weights: ['line-throughs-tungsten-nail-weights'],
  ls_underspins:              ['ls-tungsten-undoerspin'],
  ls_jigging_spoons:          ['ls-tungsten-scoping-spoon'],
  finesse_peanut_jigs:        ['tungsten-finesse-football-peanut-jigs'],
  flipping_jigs:              ['catamount-candy'],
  swim_jigs:                  ['silver-falcon-swim-jig'],
  football_jigs:              ['kjs-magic-1'],
  hammerhead_jigs:            ['hammerhead-jig'],
  ping_jigs:                  ['ls-tungsten-ping-jigs-2-per-pack'],
  switch_blades:              ['switch-blade'],
  switch_blade_jig:           ['switchblade-tungsten-bladed-jig'],
  worm_weights:               ['tungsten-worm-weight'],
  swingheads:                 ['football-swinghead'],
  shakeyheads:                ['tungsten-shakey-head', 'hammer-shake'],
  // Note: punch_skirts has no dedicated catalog page; we use the Blue Racer page as a
  // generic representative image for all punch-skirt color/size SKUs.
  punch_skirts:               ['blue-racer-punchskirt'],
  flipping_weights:           ['tungsten-flippin-weight'],
  dropshot_weights:           ['royal-tungsten-dropshot'],
};

const BASE = 'https://www.queentackle.com/product-page/';
const RENDER_QS = '/v1/fit/w_600,h_600,q_90/file.jpg';

function slugify(s) {
  return s.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(get(res.headers.location));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
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

function extractWarmup(html) {
  const re = /<script[^>]+id="wix-warmup-data"[^>]*>([\s\S]*?)<\/script>/;
  const m = html.match(re);
  if (!m) return null;
  try { return JSON.parse(m[1]); } catch { return null; }
}

function findProduct(warmup) {
  const apps = warmup?.appsWarmupData?.['1380b703-ce81-ff05-f115-39571d94dfcd'];
  if (!apps) return null;
  for (const v of Object.values(apps)) {
    if (v?.catalog?.product) return v.catalog.product;
  }
  return null;
}

function colorOption(product) {
  return (product.options || []).find(o => /color/i.test(o.title || ''));
}

function buildRenderUrl(mediaUrl) {
  // mediaUrl is like "c045fe_xxx~mv2.jpeg"
  return `https://static.wixstatic.com/media/${mediaUrl}${RENDER_QS}`;
}

async function scrapeSlug(slug) {
  const url = BASE + slug;
  const html = (await get(url)).toString('utf8');
  const warmup = extractWarmup(html);
  if (!warmup) throw new Error('no warmup data');
  const product = findProduct(warmup);
  if (!product) throw new Error('no product in warmup');

  const opt = colorOption(product);
  const result = { slug, name: product.name, colors: [], main: null };

  if (opt && opt.selections) {
    for (const sel of opt.selections) {
      const media = sel.linkedMediaItems?.[0];
      if (!media?.url) continue;
      result.colors.push({
        value: sel.value,
        mediaId: media.url,
        renderUrl: buildRenderUrl(media.url),
      });
    }
  }
  // Always capture the product hero image as a generic fallback for SKUs
  // whose color isn't represented in the vendor's variant list.
  if (product.media?.[0]?.url) {
    result.main = {
      mediaId: product.media[0].url,
      renderUrl: buildRenderUrl(product.media[0].url),
    };
  }
  return result;
}

async function main() {
  fs.mkdirSync(IMG_DIR, { recursive: true });
  const manifest = {};
  const downloaded = new Set();
  let totalBytes = 0;

  for (const [cat, slugs] of Object.entries(SLUGS)) {
    const lineDir = cat.replace(/_/g, '-');
    const lineDirAbs = path.join(IMG_DIR, lineDir);
    fs.mkdirSync(lineDirAbs, { recursive: true });
    manifest[cat] = { _slugs: slugs };
    for (const slug of slugs) {
      process.stdout.write(`[${cat}] ${slug} … `);
      try {
        const res = await scrapeSlug(slug);
        // Always download the hero image as the generic fallback (_main).
        if (res.main && !manifest[cat]._main) {
          const filename = '_main.jpg';
          const relPath = `images/queen-tackle/${lineDir}/${filename}`;
          const dest = path.join(lineDirAbs, filename);
          manifest[cat]._main = relPath;
          if (!fs.existsSync(dest)) {
            const bytes = await downloadFile(res.main.renderUrl, dest);
            totalBytes += bytes;
            downloaded.add(relPath);
          }
        }
        if (res.colors.length) {
          for (const c of res.colors) {
            const filename = `${slugify(c.value)}.jpg`;
            const relPath = `images/queen-tackle/${lineDir}/${filename}`;
            const dest = path.join(lineDirAbs, filename);
            manifest[cat][c.value] = relPath;
            const key = relPath;
            if (!downloaded.has(key) && !fs.existsSync(dest)) {
              const bytes = await downloadFile(c.renderUrl, dest);
              totalBytes += bytes;
              downloaded.add(key);
              process.stdout.write('.');
            }
          }
          process.stdout.write(` ${res.colors.length} colors + main\n`);
        } else if (res.main) {
          process.stdout.write(` main image only\n`);
        } else {
          process.stdout.write(` no images found\n`);
        }
      } catch (e) {
        process.stdout.write(` ERROR: ${e.message}\n`);
        manifest[cat]._error = e.message;
      }
    }
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`\nDone. ${downloaded.size} new images, ${(totalBytes/1024/1024).toFixed(2)} MB.`);
  console.log(`Manifest: ${path.relative(ROOT, MANIFEST_PATH)}`);
}

main().catch(e => { console.error(e); process.exit(1); });
