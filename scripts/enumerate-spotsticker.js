// scripts/enumerate-spotsticker.js
// Walks /shop/page/N/ pages until empty, prints all unique /shop/<slug>/ product URLs.

const https = require('https');

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
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    }).on('error', reject);
  });
}

(async () => {
  const seen = new Set();
  for (let page = 1; page <= 20; page++) {
    const url = page === 1 ? 'https://spotsticker.com/shop/' : `https://spotsticker.com/shop/page/${page}/`;
    let html;
    try { html = await get(url); } catch (e) { console.error(`page ${page}: ${e.message}`); break; }
    if (!html) { console.log(`page ${page}: 404, stopping`); break; }
    const re = /href="https:\/\/spotsticker\.com\/shop\/([^/"?]+)\/"/g;
    const before = seen.size;
    for (const m of html.matchAll(re)) seen.add(m[1]);
    console.log(`page ${page}: ${seen.size - before} new (${seen.size} total)`);
    if (seen.size === before) break;
  }
  console.log('\nAll product slugs:');
  [...seen].sort().forEach(s => console.log('  ' + s));
})();
