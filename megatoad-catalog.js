// megatoad-catalog.js
// Vendor: MegaToad Outdoors Inc. (MegaToadOutdoors.com) — 2026 Retail Pricing
// REP: Chris Howell | (580) 799-0987 | megatoad@megatoadoutdoors.com
// 5 SKUs — Deer Feeders & Accessories. Ships FOB Oklahoma.
//
// Pricing note (FF = Freight Free):
//   `ff`        = per-unit FF Price when the retailer orders at least the `moq`
//                 (FF MOQ) quantity of that SKU — shipping is INCLUDED at this tier.
//   `wholesale` = "Single Unit FOB OK" price for orders below the FF MOQ — the
//                 retailer pays shipping on top of this.
//   `map`       = Minimum Advertised Price (floor any retailer may sell/advertise at).
//   `retail`    = MSRP (suggested retail price).
const megatoadCatalog = [
  { sku:'MTO-M1UBM',    upc:'199284911611', desc:'MegaToad M1 Broadcast Module',      moq:16, wholesale:119.99, ff:135.99, map:169.99, retail:199.99, image:'' },
  { sku:'MTO-55M1UBM',  upc:'199284755789', desc:'MegaToad 55M1 Full Feeder Assembly', moq:4,  wholesale:299.99, ff:349.99, map:424.99, retail:499.99, image:'' },
  { sku:'MTO-55BBLK',   upc:'199284856646', desc:'MegaToad Barrel Band and Leg Kit',   moq:12, wholesale:89.99,  ff:99.99,  map:127.49, retail:149.99, image:'' },
  { sku:'MTO-55BB',     upc:'199284220560', desc:'MegaToad Barrel Band',               moq:24, wholesale:35.99,  ff:39.99,  map:49.99,  retail:59.99,  image:'' },
  { sku:'MM-M1SP12',    upc:'199284325166', desc:'MegaToad M1 12V Solar Panel',        moq:24, wholesale:29.99,  ff:32.99,  map:42.49,  retail:49.99,  image:'' },
];
