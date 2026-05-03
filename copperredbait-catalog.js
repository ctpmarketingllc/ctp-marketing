// ── Copper Red Baits, LLC catalog ─────────────────────────────
// Source: Product Catalog / Order Form — Effective 1.4.26
// 120 SKUs across 6 product lines (Hard Baits + Frogs)
// Note: Dealer cost only — no MSRP on source sheet
// SKU format: CB-[UPC]
const copperredCatalog = {

  // ═══════════════════════════════════
  // HARD BAITS
  // ═══════════════════════════════════

  jonah_jerkbait: [ // Jonah 1:17 — Rattling Jerk Bait (12 SKUs)
    { sku:'CB-725488474050', upc:'725488474050', desc:'Jonah 1:17 Jerk Bait — Clown',            color:'Clown',            detail:'Rattling Jerk Bait', wholesale:7.00, image:'images/copperred/jonah-jerkbait/clown.jpg' },
    { sku:'CB-725488473121', upc:'725488473121', desc:'Jonah 1:17 Jerk Bait — Emerald',           color:'Emerald',           detail:'Rattling Jerk Bait', wholesale:7.00, image:'images/copperred/jonah-jerkbait/clown.jpg' },
    { sku:'CB-725488474036', upc:'725488474036', desc:'Jonah 1:17 Jerk Bait — Matte Blue',        color:'Matte Blue',        detail:'Rattling Jerk Bait', wholesale:7.00, image:'images/copperred/jonah-jerkbait/matte-blue.jpg' },
    { sku:'CB-725488474043', upc:'725488474043', desc:'Jonah 1:17 Jerk Bait — Ozark Shad',        color:'Ozark Shad',        detail:'Rattling Jerk Bait', wholesale:7.00, image:'images/copperred/jonah-jerkbait/ozark-shad.jpg' },
    { sku:'CB-725488473138', upc:'725488473138', desc:'Jonah 1:17 Jerk Bait — Pearl',             color:'Pearl',             detail:'Rattling Jerk Bait', wholesale:7.00, image:'images/copperred/jonah-jerkbait/pearl.jpg' },
    { sku:'CB-725488474012', upc:'725488474012', desc:'Jonah 1:17 Jerk Bait — Perch',             color:'Perch',             detail:'Rattling Jerk Bait', wholesale:7.00, image:'images/copperred/jonah-jerkbait/perch.jpg' },
    { sku:'CB-725488473145', upc:'725488473145', desc:'Jonah 1:17 Jerk Bait — Pro-Blue',          color:'Pro-Blue',          detail:'Rattling Jerk Bait', wholesale:7.00, image:'images/copperred/jonah-jerkbait/pro-blue.jpg' },
    { sku:'CB-725488473152', upc:'725488473152', desc:'Jonah 1:17 Jerk Bait — Pro-Blue Chrome',   color:'Pro-Blue Chrome',   detail:'Rattling Jerk Bait', wholesale:7.00, image:'images/copperred/jonah-jerkbait/pro-blue-chrome.jpg' },
    { sku:'CB-725488473169', upc:'725488473169', desc:'Jonah 1:17 Jerk Bait — Pro-Olive',         color:'Pro-Olive',         detail:'Rattling Jerk Bait', wholesale:7.00, image:'images/copperred/jonah-jerkbait/pro-olive.jpg' },
    { sku:'CB-725488473176', upc:'725488473176', desc:'Jonah 1:17 Jerk Bait — Purple Chartreuse', color:'Purple Chartreuse', detail:'Rattling Jerk Bait', wholesale:7.00, image:'images/copperred/jonah-jerkbait/purple-chartreuse.jpg' },
    { sku:'CB-725488474067', upc:'725488474067', desc:'Jonah 1:17 Jerk Bait — Shiner',            color:'Shiner',            detail:'Rattling Jerk Bait', wholesale:7.00, image:'images/copperred/jonah-jerkbait/shiner.jpg' },
    { sku:'CB-725488474029', upc:'725488474029', desc:'Jonah 1:17 Jerk Bait — Wasaki',            color:'Wasaki',            detail:'Rattling Jerk Bait', wholesale:7.00, image:'images/copperred/jonah-jerkbait/wasaki.jpg' },
  ],

  snatchin_shad_half_rattling: [ // Snatchin Shad 1/2 oz — Rattling (10 SKUs)
    { sku:'CB-725488473480', upc:'725488473480', desc:'Snatchin Shad 1/2 oz Rattling — Bone',            color:'Bone',            detail:'1/2 oz Rattling Lipless Crank', wholesale:7.50, image:'images/copperred/snatchin-shad-half-rattling/bone.jpg' },
    { sku:'CB-725488473527', upc:'725488473527', desc:'Snatchin Shad 1/2 oz Rattling — Chili Chartreuse',color:'Chili Chartreuse', detail:'1/2 oz Rattling Lipless Crank', wholesale:7.50, image:'images/copperred/snatchin-shad-half-rattling/chili-chartreuse.jpg' },
    { sku:'CB-725488473435', upc:'725488473435', desc:'Snatchin Shad 1/2 oz Rattling — Chrome & Black',  color:'Chrome & Black',  detail:'1/2 oz Rattling Lipless Crank', wholesale:7.50, image:'images/copperred/snatchin-shad-half-rattling/chrome-amp-black.jpg' },
    { sku:'CB-725488473497', upc:'725488473497', desc:'Snatchin Shad 1/2 oz Rattling — Gold Chrome',     color:'Gold Chrome',     detail:'1/2 oz Rattling Lipless Crank', wholesale:7.50, image:'images/copperred/snatchin-shad-half-rattling/gold-chrome.jpg' },
    { sku:'CB-725488473466', upc:'725488473466', desc:'Snatchin Shad 1/2 oz Rattling — Oxbow',           color:'Oxbow',           detail:'1/2 oz Rattling Lipless Crank', wholesale:7.50, image:'images/copperred/snatchin-shad-half-rattling/oxbow.jpg' },
    { sku:'CB-725488473503', upc:'725488473503', desc:'Snatchin Shad 1/2 oz Rattling — Pro-Olive',       color:'Pro-Olive',       detail:'1/2 oz Rattling Lipless Crank', wholesale:7.50, image:'images/copperred/snatchin-shad-half-rattling/pro-olive.jpg' },
    { sku:'CB-725488473473', upc:'725488473473', desc:'Snatchin Shad 1/2 oz Rattling — Rayburn Red',     color:'Rayburn Red',     detail:'1/2 oz Rattling Lipless Crank', wholesale:7.50, image:'images/copperred/snatchin-shad-half-rattling/rayburn-red.jpg' },
    { sku:'CB-725488473442', upc:'725488473442', desc:'Snatchin Shad 1/2 oz Rattling — Royal Purple',    color:'Royal Purple',    detail:'1/2 oz Rattling Lipless Crank', wholesale:7.50, image:'images/copperred/snatchin-shad-half-rattling/royal-purple.jpg' },
    { sku:'CB-725488473459', upc:'725488473459', desc:'Snatchin Shad 1/2 oz Rattling — Royal Red',       color:'Royal Red',       detail:'1/2 oz Rattling Lipless Crank', wholesale:7.50, image:'images/copperred/snatchin-shad-half-rattling/royal-red.jpg' },
    { sku:'CB-725488473510', upc:'725488473510', desc:'Snatchin Shad 1/2 oz Rattling — Sexy Chrome',     color:'Sexy Chrome',     detail:'1/2 oz Rattling Lipless Crank', wholesale:7.50, image:'images/copperred/snatchin-shad-half-rattling/sexy-chrome.jpg' },
  ],

  snatchin_shad_half_silent: [ // Snatchin Shad 1/2 oz — Silent (10 SKUs)
    { sku:'CB-725488473619', upc:'725488473619', desc:'Snatchin Shad 1/2 oz Silent — Bluegill',    color:'Bluegill',    detail:'1/2 oz Silent Lipless Crank', wholesale:7.50, image:'images/copperred/snatchin-shad-half-silent/bluegill.jpg' },
    { sku:'CB-725488473558', upc:'725488473558', desc:'Snatchin Shad 1/2 oz Silent — Clear Shad',  color:'Clear Shad',  detail:'1/2 oz Silent Lipless Crank', wholesale:7.50, image:'images/copperred/snatchin-shad-half-silent/clear-shad.jpg' },
    { sku:'CB-725488473626', upc:'725488473626', desc:'Snatchin Shad 1/2 oz Silent — Ghost Shad',  color:'Ghost Shad',  detail:'1/2 oz Silent Lipless Crank', wholesale:7.50, image:'images/copperred/snatchin-shad-half-silent/ghost-shad.jpg' },
    { sku:'CB-725488473602', upc:'725488473602', desc:'Snatchin Shad 1/2 oz Silent — Gizzard',     color:'Gizzard',     detail:'1/2 oz Silent Lipless Crank', wholesale:7.50, image:'images/copperred/snatchin-shad-half-silent/gizzard.jpg' },
    { sku:'CB-725488473572', upc:'725488473572', desc:'Snatchin Shad 1/2 oz Silent — Gold Dust',   color:'Gold Dust',   detail:'1/2 oz Silent Lipless Crank', wholesale:7.50, image:'images/copperred/snatchin-shad-half-silent/gold-dust.jpg' },
    { sku:'CB-725488473541', upc:'725488473541', desc:'Snatchin Shad 1/2 oz Silent — Green Halo',  color:'Green Halo',  detail:'1/2 oz Silent Lipless Crank', wholesale:7.50, image:'images/copperred/snatchin-shad-half-silent/green-halo.jpg' },
    { sku:'CB-725488473589', upc:'725488473589', desc:'Snatchin Shad 1/2 oz Silent — Pro-Olive',   color:'Pro-Olive',   detail:'1/2 oz Silent Lipless Crank', wholesale:7.50, image:'images/copperred/snatchin-shad-half-silent/pro-olive.jpg' },
    { sku:'CB-725488473565', upc:'725488473565', desc:'Snatchin Shad 1/2 oz Silent — Rayburn Red', color:'Rayburn Red', detail:'1/2 oz Silent Lipless Crank', wholesale:7.50, image:'images/copperred/snatchin-shad-half-silent/rayburn-red.jpg' },
    { sku:'CB-725488473596', upc:'725488473596', desc:'Snatchin Shad 1/2 oz Silent — Threadfin',   color:'Threadfin',   detail:'1/2 oz Silent Lipless Crank', wholesale:7.50, image:'images/copperred/snatchin-shad-half-silent/threadfin.jpg' },
    { sku:'CB-725488473534', upc:'725488473534', desc:'Snatchin Shad 1/2 oz Silent — Veil',        color:'Veil',        detail:'1/2 oz Silent Lipless Crank', wholesale:7.50, image:'images/copperred/snatchin-shad-half-silent/veil.jpg' },
  ],

  snatchin_shad_threequarter: [ // Snatchin Shad 3/4 oz — Rattling + Silent (6 SKUs)
    { sku:'CB-704001947820', upc:'704001947820', desc:'Snatchin Shad 3/4 oz Rattling — Chrome & Black', color:'Chrome & Black', detail:'3/4 oz Rattling Lipless Crank', wholesale:7.50, image:'images/copperred/snatchin-shad-half-rattling/chrome-amp-black.jpg' },
    { sku:'CB-704001947844', upc:'704001947844', desc:'Snatchin Shad 3/4 oz Rattling — Rayburn Red',    color:'Rayburn Red',    detail:'3/4 oz Rattling Lipless Crank', wholesale:7.50, image:'images/copperred/snatchin-shad-half-rattling/rayburn-red.jpg' },
    { sku:'CB-704001947837', upc:'704001947837', desc:'Snatchin Shad 3/4 oz Rattling — Royal Purple',   color:'Royal Purple',   detail:'3/4 oz Rattling Lipless Crank', wholesale:7.50, image:'images/copperred/snatchin-shad-half-rattling/royal-purple.jpg' },
    { sku:'CB-725488474111', upc:'725488474111', desc:'Snatchin Shad 3/4 oz Silent — Clear Shad',       color:'Clear Shad',     detail:'3/4 oz Silent Lipless Crank',   wholesale:7.50, image:'images/copperred/snatchin-shad-half-silent/clear-shad.jpg' },
    { sku:'CB-704001947806', upc:'704001947806', desc:'Snatchin Shad 3/4 oz Silent — Gizzard',          color:'Gizzard',        detail:'3/4 oz Silent Lipless Crank',   wholesale:7.50, image:'images/copperred/snatchin-shad-half-silent/gizzard.jpg' },
    { sku:'CB-704001947813', upc:'704001947813', desc:'Snatchin Shad 3/4 oz Silent — Veil',             color:'Veil',           detail:'3/4 oz Silent Lipless Crank',   wholesale:7.50, image:'images/copperred/snatchin-shad-half-silent/veil.jpg' },
  ],

  the_shank: [ // The Shank — 1.9" Blade Bait (6 SKUs)
    { sku:'CB-704001947790', upc:'704001947790', desc:'The Shank Blade Bait — Cold Steel',       color:'Cold Steel',       detail:'1.9" Blade Bait', wholesale:4.50, image:'images/copperred/the-shank/cold-steel.jpg' },
    { sku:'CB-704001947943', upc:'704001947943', desc:'The Shank Blade Bait — Sexy Foil',        color:'Sexy Foil',        detail:'1.9" Blade Bait', wholesale:4.50, image:'images/copperred/the-shank/sexy-foil.jpg' },
    { sku:'CB-704001947950', upc:'704001947950', desc:'The Shank Blade Bait — Chartreuse Shad',  color:'Chartreuse Shad',  detail:'1.9" Blade Bait', wholesale:4.50, image:'images/copperred/the-shank/cold-steel.jpg' },
    { sku:'CB-704001947967', upc:'704001947967', desc:'The Shank Blade Bait — Killer Gill',      color:'Killer Gill',      detail:'1.9" Blade Bait', wholesale:4.50, image:'images/copperred/the-shank/cold-steel.jpg' },
    { sku:'CB-704001947974', upc:'704001947974', desc:'The Shank Blade Bait — Purple Foil',      color:'Purple Foil',      detail:'1.9" Blade Bait', wholesale:4.50, image:'images/copperred/the-shank/purple-foil.jpg' },
    { sku:'CB-704001947981', upc:'704001947981', desc:'The Shank Blade Bait — Naked',            color:'Naked',            detail:'1.9" Blade Bait', wholesale:4.50, image:'images/copperred/the-shank/naked.jpg' },
  ],

  // ═══════════════════════════════════
  // FROGS
  // ═══════════════════════════════════

  loud_mouth: [ // Loud Mouth — Poppin Frog (16 SKUs)
    { sku:'CB-725488473183', upc:'725488473183', desc:'Loud Mouth Poppin Frog — Bone',          color:'Bone',          detail:'Poppin Frog', wholesale:7.00, image:'images/copperred/loud-mouth/bone.jpg' },
    { sku:'CB-725488473190', upc:'725488473190', desc:'Loud Mouth Poppin Frog — Bubblegum',     color:'Bubblegum',     detail:'Poppin Frog', wholesale:7.00, image:'images/copperred/loud-mouth/bubblegum.jpg' },
    { sku:'CB-725488473206', upc:'725488473206', desc:'Loud Mouth Poppin Frog — Dirty Rat',     color:'Dirty Rat',     detail:'Poppin Frog', wholesale:7.00, image:'images/copperred/loud-mouth/dirty-rat.jpg' },
    { sku:'CB-725488473213', upc:'725488473213', desc:'Loud Mouth Poppin Frog — Folding Money', color:'Folding Money', detail:'Poppin Frog', wholesale:7.00, image:'images/copperred/loud-mouth/folding-money.jpg' },
    { sku:'CB-725488473220', upc:'725488473220', desc:'Loud Mouth Poppin Frog — Golden Nugget', color:'Golden Nugget', detail:'Poppin Frog', wholesale:7.00, image:'images/copperred/loud-mouth/golden-nugget.jpg' },
    { sku:'CB-704001947912', upc:'704001947912', desc:'Loud Mouth Poppin Frog — June Bug',      color:'June Bug',      detail:'Poppin Frog', wholesale:7.00, image:'images/copperred/loud-mouth/junebug.jpg' },
    { sku:'CB-725488474104', upc:'725488474104', desc:'Loud Mouth Poppin Frog — Killer Gill',   color:'Killer Gill',   detail:'Poppin Frog', wholesale:7.00, image:'images/copperred/loud-mouth/bone.jpg' },
    { sku:'CB-725488473237', upc:'725488473237', desc:'Loud Mouth Poppin Frog — Leopard Frog',  color:'Leopard Frog',  detail:'Poppin Frog', wholesale:7.00, image:'images/copperred/loud-mouth/leopard-frog.jpg' },
    { sku:'CB-725488473244', upc:'725488473244', desc:'Loud Mouth Poppin Frog — Magma',         color:'Magma',         detail:'Poppin Frog', wholesale:7.00, image:'images/copperred/loud-mouth/magma.jpg' },
    { sku:'CB-725488473251', upc:'725488473251', desc:'Loud Mouth Poppin Frog — Midnight',      color:'Midnight',      detail:'Poppin Frog', wholesale:7.00, image:'images/copperred/loud-mouth/midnight.jpg' },
    { sku:'CB-704001947905', upc:'704001947905', desc:'Loud Mouth Poppin Frog — Natural Gill',  color:'Natural Gill',  detail:'Poppin Frog', wholesale:7.00, image:'images/copperred/loud-mouth/natural-gill.jpg' },
    { sku:'CB-725488473268', upc:'725488473268', desc:'Loud Mouth Poppin Frog — Purple Shad',   color:'Purple Shad',   detail:'Poppin Frog', wholesale:7.00, image:'images/copperred/loud-mouth/purple-shad.jpg' },
    { sku:'CB-725488473275', upc:'725488473275', desc:'Loud Mouth Poppin Frog — Salt-n-Pepper', color:'Salt-n-Pepper', detail:'Poppin Frog', wholesale:7.00, image:'images/copperred/loud-mouth/salt-n-pepper.jpg' },
    { sku:'CB-725488473282', upc:'725488473282', desc:'Loud Mouth Poppin Frog — Spicy Meatball',color:'Spicy Meatball', detail:'Poppin Frog', wholesale:7.00, image:'images/copperred/loud-mouth/spicy-meatball.jpg' },
    { sku:'CB-725488473299', upc:'725488473299', desc:'Loud Mouth Poppin Frog — Stranded Shad', color:'Stranded Shad', detail:'Poppin Frog', wholesale:7.00, image:'images/copperred/loud-mouth/stranded-shad.jpg' },
    { sku:'CB-725488473305', upc:'725488473305', desc:'Loud Mouth Poppin Frog — Whiteout',      color:'Whiteout',      detail:'Poppin Frog', wholesale:7.00, image:'images/copperred/loud-mouth/whiteout.jpg' },
  ],

  ripple_frog: [ // Ripple Frog — 2" Frog (16 SKUs)
    { sku:'CB-725488474074', upc:'725488474074', desc:'Ripple Frog 2" — Bone',          color:'Bone',          detail:'2" Frog', wholesale:7.00, image:'images/copperred/ripple-frog/bubblegum.jpg' },
    { sku:'CB-725488473312', upc:'725488473312', desc:'Ripple Frog 2" — Bubblegum',     color:'Bubblegum',     detail:'2" Frog', wholesale:7.00, image:'images/copperred/ripple-frog/bubblegum.jpg' },
    { sku:'CB-725488473329', upc:'725488473329', desc:'Ripple Frog 2" — Cantaloupe',    color:'Cantaloupe',    detail:'2" Frog', wholesale:7.00, image:'images/copperred/ripple-frog/cantaloupe.jpg' },
    { sku:'CB-725488473336', upc:'725488473336', desc:'Ripple Frog 2" — Dirty Rat',     color:'Dirty Rat',     detail:'2" Frog', wholesale:7.00, image:'images/copperred/ripple-frog/dirty-rat.jpg' },
    { sku:'CB-725488473343', upc:'725488473343', desc:'Ripple Frog 2" — Golden Nugget', color:'Golden Nugget', detail:'2" Frog', wholesale:7.00, image:'images/copperred/ripple-frog/golden-nugget.jpg' },
    { sku:'CB-725488474081', upc:'725488474081', desc:'Ripple Frog 2" — Killer Gill',   color:'Killer Gill',   detail:'2" Frog', wholesale:7.00, image:'images/copperred/ripple-frog/bubblegum.jpg' },
    { sku:'CB-725488473350', upc:'725488473350', desc:'Ripple Frog 2" — Leopard Frog',  color:'Leopard Frog',  detail:'2" Frog', wholesale:7.00, image:'images/copperred/ripple-frog/leopard-frog.jpg' },
    { sku:'CB-725488473367', upc:'725488473367', desc:'Ripple Frog 2" — Magma',         color:'Magma',         detail:'2" Frog', wholesale:7.00, image:'images/copperred/ripple-frog/magma.jpg' },
    { sku:'CB-725488473374', upc:'725488473374', desc:'Ripple Frog 2" — Midnight',      color:'Midnight',      detail:'2" Frog', wholesale:7.00, image:'images/copperred/ripple-frog/midnight.jpg' },
    { sku:'CB-704001947929', upc:'704001947929', desc:'Ripple Frog 2" — Natural Gill',  color:'Natural Gill',  detail:'2" Frog', wholesale:7.00, image:'images/copperred/ripple-frog/bubblegum.jpg' },
    { sku:'CB-725488473381', upc:'725488473381', desc:'Ripple Frog 2" — Purple Shad',   color:'Purple Shad',   detail:'2" Frog', wholesale:7.00, image:'images/copperred/ripple-frog/purple-shad.jpg' },
    { sku:'CB-725488474098', upc:'725488474098', desc:'Ripple Frog 2" — Salt-n-Pepper', color:'Salt-n-Pepper', detail:'2" Frog', wholesale:7.00, image:'images/copperred/ripple-frog/salt-n-pepper.jpg' },
    { sku:'CB-725488473398', upc:'725488473398', desc:'Ripple Frog 2" — Smoke',         color:'Smoke',         detail:'2" Frog', wholesale:7.00, image:'images/copperred/ripple-frog/smoke.jpg' },
    { sku:'CB-725488473404', upc:'725488473404', desc:'Ripple Frog 2" — Spicy Meatball',color:'Spicy Meatball', detail:'2" Frog', wholesale:7.00, image:'images/copperred/ripple-frog/spicy-meatball.jpg' },
    { sku:'CB-725488473411', upc:'725488473411', desc:'Ripple Frog 2" — Stranded Shad', color:'Stranded Shad', detail:'2" Frog', wholesale:7.00, image:'images/copperred/ripple-frog/stranded-shad.jpg' },
    { sku:'CB-725488473428', upc:'725488473428', desc:'Ripple Frog 2" — Whiteout',      color:'Whiteout',      detail:'2" Frog', wholesale:7.00, image:'images/copperred/ripple-frog/whiteout.jpg' },
  ],

  tsunami_frog: [ // Tsunami Frog — 3.5" Frog (15 SKUs)
    { sku:'CB-725488473633', upc:'725488473633', desc:'Tsunami Frog 3.5" — Bubblegum',     color:'Bubblegum',     detail:'3.5" Frog', wholesale:9.00, image:'images/copperred/tsunami-frog/bubblegum.jpg' },
    { sku:'CB-725488473640', upc:'725488473640', desc:'Tsunami Frog 3.5" — Bullfrog',      color:'Bullfrog',      detail:'3.5" Frog', wholesale:9.00, image:'images/copperred/tsunami-frog/bullfrog.jpg' },
    { sku:'CB-725488473657', upc:'725488473657', desc:'Tsunami Frog 3.5" — Cantaloupe',    color:'Cantaloupe',    detail:'3.5" Frog', wholesale:9.00, image:'images/copperred/tsunami-frog/cantaloupe.jpg' },
    { sku:'CB-725488473664', upc:'725488473664', desc:'Tsunami Frog 3.5" — Dirty Rat',     color:'Dirty Rat',     detail:'3.5" Frog', wholesale:9.00, image:'images/copperred/tsunami-frog/dirty-rat.jpg' },
    { sku:'CB-725488473671', upc:'725488473671', desc:'Tsunami Frog 3.5" — Golden Nugget', color:'Golden Nugget', detail:'3.5" Frog', wholesale:9.00, image:'images/copperred/tsunami-frog/golden-nugget.jpg' },
    { sku:'CB-725488473688', upc:'725488473688', desc:'Tsunami Frog 3.5" — Leopard Frog',  color:'Leopard Frog',  detail:'3.5" Frog', wholesale:9.00, image:'images/copperred/tsunami-frog/leopard-frog.jpg' },
    { sku:'CB-725488473695', upc:'725488473695', desc:'Tsunami Frog 3.5" — Magma',         color:'Magma',         detail:'3.5" Frog', wholesale:9.00, image:'images/copperred/tsunami-frog/magma.jpg' },
    { sku:'CB-725488473701', upc:'725488473701', desc:'Tsunami Frog 3.5" — Midnight',      color:'Midnight',      detail:'3.5" Frog', wholesale:9.00, image:'images/copperred/tsunami-frog/midnight.jpg' },
    { sku:'CB-704001947936', upc:'704001947936', desc:'Tsunami Frog 3.5" — Natural Gill',  color:'Natural Gill',  detail:'3.5" Frog', wholesale:9.00, image:'images/copperred/tsunami-frog/natural-gill.jpg' },
    { sku:'CB-725488473718', upc:'725488473718', desc:'Tsunami Frog 3.5" — Purple Shad',   color:'Purple Shad',   detail:'3.5" Frog', wholesale:9.00, image:'images/copperred/tsunami-frog/purple-shad.jpg' },
    { sku:'CB-725488473725', upc:'725488473725', desc:'Tsunami Frog 3.5" — Salt-n-Pepper', color:'Salt-n-Pepper', detail:'3.5" Frog', wholesale:9.00, image:'images/copperred/tsunami-frog/salt-n-pepper.jpg' },
    { sku:'CB-725488473732', upc:'725488473732', desc:'Tsunami Frog 3.5" — Sexy Shad',     color:'Sexy Shad',     detail:'3.5" Frog', wholesale:9.00, image:'images/copperred/tsunami-frog/sexy-shad.jpg' },
    { sku:'CB-725488473749', upc:'725488473749', desc:'Tsunami Frog 3.5" — Spicy Meatball',color:'Spicy Meatball', detail:'3.5" Frog', wholesale:9.00, image:'images/copperred/tsunami-frog/spicy-meatball.jpg' },
    { sku:'CB-725488473756', upc:'725488473756', desc:'Tsunami Frog 3.5" — Stranded Shad', color:'Stranded Shad', detail:'3.5" Frog', wholesale:9.00, image:'images/copperred/tsunami-frog/stranded-shad.jpg' },
    { sku:'CB-725488473763', upc:'725488473763', desc:'Tsunami Frog 3.5" — Whiteout',      color:'Whiteout',      detail:'3.5" Frog', wholesale:9.00, image:'images/copperred/tsunami-frog/whiteout.jpg' },
  ],

  wave_frog: [ // Wave Frog — 2.5" Frog (29 SKUs)
    { sku:'CB-725488473770', upc:'725488473770', desc:'Wave Frog 2.5" — Bone',            color:'Bone',            detail:'2.5" Frog', wholesale:7.00, image:'images/copperred/wave-frog/bone.jpg' },
    { sku:'CB-725488473787', upc:'725488473787', desc:'Wave Frog 2.5" — Bubblegum',       color:'Bubblegum',       detail:'2.5" Frog', wholesale:7.00, image:'images/copperred/wave-frog/bubblegum.jpg' },
    { sku:'CB-725488473794', upc:'725488473794', desc:'Wave Frog 2.5" — Bullfrog',        color:'Bullfrog',        detail:'2.5" Frog', wholesale:7.00, image:'images/copperred/wave-frog/bullfrog.jpg' },
    { sku:'CB-725488473800', upc:'725488473800', desc:'Wave Frog 2.5" — Cantaloupe',      color:'Cantaloupe',      detail:'2.5" Frog', wholesale:7.00, image:'images/copperred/wave-frog/cantaloupe.jpg' },
    { sku:'CB-725488473817', upc:'725488473817', desc:'Wave Frog 2.5" — Desert Storm',    color:'Desert Storm',    detail:'2.5" Frog', wholesale:7.00, image:'images/copperred/wave-frog/desert-storm.jpg' },
    { sku:'CB-725488473824', upc:'725488473824', desc:'Wave Frog 2.5" — Dirty Rat',       color:'Dirty Rat',       detail:'2.5" Frog', wholesale:7.00, image:'images/copperred/wave-frog/dirty-rat.jpg' },
    { sku:'CB-704001947882', upc:'704001947882', desc:'Wave Frog 2.5" — Duckling',        color:'Duckling',        detail:'2.5" Frog', wholesale:7.00, image:'images/copperred/wave-frog/bone.jpg' },
    { sku:'CB-725488473831', upc:'725488473831', desc:'Wave Frog 2.5" — Folding Money',   color:'Folding Money',   detail:'2.5" Frog', wholesale:7.00, image:'images/copperred/wave-frog/folding-money.jpg' },
    { sku:'CB-725488473848', upc:'725488473848', desc:'Wave Frog 2.5" — Frozen Tomato',   color:'Frozen Tomato',   detail:'2.5" Frog', wholesale:7.00, image:'images/copperred/wave-frog/frozen-tomato.jpg' },
    { sku:'CB-725488473855', upc:'725488473855', desc:'Wave Frog 2.5" — Golden Nugget',   color:'Golden Nugget',   detail:'2.5" Frog', wholesale:7.00, image:'images/copperred/wave-frog/golden-nugget.jpg' },
    { sku:'CB-704001947868', upc:'704001947868', desc:'Wave Frog 2.5" — Junebug',         color:'Junebug',         detail:'2.5" Frog', wholesale:7.00, image:'images/copperred/wave-frog/bone.jpg' },
    { sku:'CB-725488473862', upc:'725488473862', desc:'Wave Frog 2.5" — Killer Gill',     color:'Killer Gill',     detail:'2.5" Frog', wholesale:7.00, image:'images/copperred/wave-frog/killer-gill.jpg' },
    { sku:'CB-725488473879', upc:'725488473879', desc:'Wave Frog 2.5" — Leopard Frog',    color:'Leopard Frog',    detail:'2.5" Frog', wholesale:7.00, image:'images/copperred/wave-frog/leopard-frog.jpg' },
    { sku:'CB-725488473886', upc:'725488473886', desc:'Wave Frog 2.5" — Magma',           color:'Magma',           detail:'2.5" Frog', wholesale:7.00, image:'images/copperred/wave-frog/magma.jpg' },
    { sku:'CB-704001947875', upc:'704001947875', desc:'Wave Frog 2.5" — Meteor',          color:'Meteor',          detail:'2.5" Frog', wholesale:7.00, image:'images/copperred/wave-frog/meteor.jpg' },
    { sku:'CB-725488473893', upc:'725488473893', desc:'Wave Frog 2.5" — Midnight',        color:'Midnight',        detail:'2.5" Frog', wholesale:7.00, image:'images/copperred/wave-frog/midnight.jpg' },
    { sku:'CB-704001947899', upc:'704001947899', desc:'Wave Frog 2.5" — Nannerhead',      color:'Nannerhead',      detail:'2.5" Frog', wholesale:7.00, image:'images/copperred/wave-frog/bone.jpg' },
    { sku:'CB-704001947851', upc:'704001947851', desc:'Wave Frog 2.5" — Natural Gill',    color:'Natural Gill',    detail:'2.5" Frog', wholesale:7.00, image:'images/copperred/wave-frog/bone.jpg' },
    { sku:'CB-725488473909', upc:'725488473909', desc:'Wave Frog 2.5" — Papa Smurf',      color:'Papa Smurf',      detail:'2.5" Frog', wholesale:7.00, image:'images/copperred/wave-frog/papa-smurf.jpg' },
    { sku:'CB-725488473916', upc:'725488473916', desc:'Wave Frog 2.5" — Purple Mat Shad', color:'Purple Mat Shad', detail:'2.5" Frog', wholesale:7.00, image:'images/copperred/wave-frog/purple-mat-shad.jpg' },
    { sku:'CB-725488473923', upc:'725488473923', desc:'Wave Frog 2.5" — Purple Shad',     color:'Purple Shad',     detail:'2.5" Frog', wholesale:7.00, image:'images/copperred/wave-frog/purple-shad.jpg' },
    { sku:'CB-725488473930', upc:'725488473930', desc:'Wave Frog 2.5" — Rayburn Red',     color:'Rayburn Red',     detail:'2.5" Frog', wholesale:7.00, image:'images/copperred/wave-frog/rayburn-red.jpg' },
    { sku:'CB-725488473947', upc:'725488473947', desc:'Wave Frog 2.5" — Salt-n-Pepper',   color:'Salt-n-Pepper',   detail:'2.5" Frog', wholesale:7.00, image:'images/copperred/wave-frog/salt-n-pepper.jpg' },
    { sku:'CB-725488473954', upc:'725488473954', desc:'Wave Frog 2.5" — Sexy Shad',       color:'Sexy Shad',       detail:'2.5" Frog', wholesale:7.00, image:'images/copperred/wave-frog/sexy-shad.jpg' },
    { sku:'CB-725488473961', upc:'725488473961', desc:'Wave Frog 2.5" — Smoke',           color:'Smoke',           detail:'2.5" Frog', wholesale:7.00, image:'images/copperred/wave-frog/smoke.jpg' },
    { sku:'CB-725488473978', upc:'725488473978', desc:'Wave Frog 2.5" — Sparrow',         color:'Sparrow',         detail:'2.5" Frog', wholesale:7.00, image:'images/copperred/wave-frog/sparrow.jpg' },
    { sku:'CB-725488473985', upc:'725488473985', desc:'Wave Frog 2.5" — Spicy Meatball',  color:'Spicy Meatball',  detail:'2.5" Frog', wholesale:7.00, image:'images/copperred/wave-frog/spicy-meatball.jpg' },
    { sku:'CB-725488473992', upc:'725488473992', desc:'Wave Frog 2.5" — Stranded Shad',   color:'Stranded Shad',   detail:'2.5" Frog', wholesale:7.00, image:'images/copperred/wave-frog/stranded-shad.jpg' },
    { sku:'CB-725488474005', upc:'725488474005', desc:'Wave Frog 2.5" — Whiteout',        color:'Whiteout',        detail:'2.5" Frog', wholesale:7.00, image:'images/copperred/wave-frog/whiteout.jpg' },
  ],

};

// ── Copper Red Baits render function ─────────────────────────
// Note: No MSRP on dealer sheet — retail column shows "—"
function renderCopperredRows(cat, tbodyId) {
  const tbody = document.getElementById(tbodyId);
  copperredCatalog[cat].forEach(p => {
    const tr = document.createElement('tr');
    const imgCell = p.image
      ? `<img src="${p.image}" alt="${p.desc.replace(/"/g,'&quot;')}" class="product-thumb" loading="lazy">`
      : '<span class="product-thumb-placeholder">—</span>';
    tr.innerHTML = `
      <td style="text-align:center">
        <input class="qty-input" type="number" min="0" step="1"
          data-sku="${p.sku}" data-wholesale="${p.wholesale}"
          data-product="${p.desc.replace(/"/g, '&quot;')}"
          data-color="${p.color}" data-retail="0"
          placeholder="0" autocomplete="off">
      </td>
      <td class="product-thumb-cell">${imgCell}</td>
      <td class="sku">${p.upc}</td>
      <td class="bold">${p.desc}</td>
      <td style="color:var(--muted);font-size:12px">${p.detail}</td>
      <td class="right">$${p.wholesale.toFixed(2)}</td>
      <td class="right" style="color:var(--muted)">—</td>
      <td class="right"><span class="line-total" id="lt-${p.sku.replace(/[^a-zA-Z0-9]/g,'_')}">—</span></td>
    `;
    tbody.appendChild(tr);
  });
}

// ── Category metadata ────────────────────────────────────────
const copperredCategories = [
  { key:'jonah_jerkbait',              label:'Jonah 1:17 — Rattling Jerk Bait',  group:'Hard Baits' },
  { key:'snatchin_shad_half_rattling', label:'Snatchin Shad 1/2 oz — Rattling',  group:'Hard Baits' },
  { key:'snatchin_shad_half_silent',   label:'Snatchin Shad 1/2 oz — Silent',    group:'Hard Baits' },
  { key:'snatchin_shad_threequarter',  label:'Snatchin Shad 3/4 oz',             group:'Hard Baits' },
  { key:'the_shank',                   label:'The Shank — 1.9" Blade Bait',      group:'Hard Baits' },
  { key:'loud_mouth',                  label:'Loud Mouth — Poppin Frog',          group:'Frogs' },
  { key:'ripple_frog',                 label:'Ripple Frog — 2"',                  group:'Frogs' },
  { key:'tsunami_frog',                label:'Tsunami Frog — 3.5"',              group:'Frogs' },
  { key:'wave_frog',                   label:'Wave Frog — 2.5"',                 group:'Frogs' },
];

// ── Dynamic section builder ──────────────────────────────────
function renderAllCopperredSections() {
  const container = document.getElementById('copperred-sections');
  let lastGroup = '';
  copperredCategories.forEach(cat => {
    if (cat.group !== lastGroup) {
      lastGroup = cat.group;
      const groupLabel = document.createElement('div');
      groupLabel.className = 'section-label';
      groupLabel.textContent = cat.group;
      container.appendChild(groupLabel);
    }
    const tbodyId = 'cb-' + cat.key + '-rows';
    const skuCount = copperredCatalog[cat.key].length;
    const section = document.createElement('div');
    section.className = 'product-section';
    section.innerHTML = `
      <div class="category-header">
        <span class="category-name">${cat.label}</span>
        <span class="category-desc">${skuCount} SKUs</span>
      </div>
      <table><thead><tr>
        <th class="center">Qty</th><th class="center">Image</th><th>UPC</th><th>Description</th><th>Detail</th>
        <th class="right">Wholesale</th><th class="right">Retail</th>
        <th class="right">Line Total</th>
      </tr></thead><tbody id="${tbodyId}"></tbody></table>
    `;
    container.appendChild(section);
    renderCopperredRows(cat.key, tbodyId);
  });
}
