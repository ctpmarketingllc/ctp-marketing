// ── SpotSticker Baits catalog ─────────────────────────────────
// Source: 2025 SpotSticker Baits Dealer Sheet (Last Update: January 14, 2024)
// Contact: Ryan Coleman | ryan@lanierspots.com | 770-356-4136
// 217 SKUs across 18 product lines
const spotstickerCatalog = {

  // ── STANDARD JIG HEADS (Unpainted) ──

  wide_gap: [
    { sku:'SS-WG10805', desc:'Wide Gap Jig Head — 1/8 oz', size:'1/8 oz', color:'Unpainted', pack:'5 Pack', retail:4.79, wholesale:2.89, image:'images/spotsticker/wide-gap/main-18-oz.jpg' },
    { sku:'SS-WG31605', desc:'Wide Gap Jig Head — 3/16 oz', size:'3/16 oz', color:'Unpainted', pack:'5 Pack', retail:4.79, wholesale:2.89, image:'images/spotsticker/wide-gap/main-316.jpg' },
    { sku:'SS-WG10405', desc:'Wide Gap Jig Head — 1/4 oz', size:'1/4 oz', color:'Unpainted', pack:'5 Pack', retail:4.79, wholesale:2.89, image:'images/spotsticker/wide-gap/main-14-oz.jpg' },
    { sku:'SS-WG10825', desc:'Wide Gap Jig Head — 1/8 oz', size:'1/8 oz', color:'Unpainted', pack:'25 Pack', retail:15.49, wholesale:10.79, image:'images/spotsticker/wide-gap/main-18-oz.jpg' },
    { sku:'SS-WG31625', desc:'Wide Gap Jig Head — 3/16 oz', size:'3/16 oz', color:'Unpainted', pack:'25 Pack', retail:15.49, wholesale:10.79, image:'images/spotsticker/wide-gap/main-316.jpg' },
    { sku:'SS-WG10425', desc:'Wide Gap Jig Head — 1/4 oz', size:'1/4 oz', color:'Unpainted', pack:'25 Pack', retail:15.49, wholesale:10.79, image:'images/spotsticker/wide-gap/main-14-oz.jpg' },
  ],

  long_shank: [
    { sku:'SS-LS11605', desc:'Long Shank Jig Head — 1/16 oz', size:'1/16 oz', color:'Unpainted', pack:'5 Pack', retail:4.79, wholesale:2.89, image:'images/spotsticker/long-shank/main-116-oz.jpg' },
    { sku:'SS-LS10805', desc:'Long Shank Jig Head — 1/8 oz', size:'1/8 oz', color:'Unpainted', pack:'5 Pack', retail:4.79, wholesale:2.89, image:'images/spotsticker/long-shank/main-18-oz.jpg' },
    { sku:'SS-LS31605', desc:'Long Shank Jig Head — 3/16 oz', size:'3/16 oz', color:'Unpainted', pack:'5 Pack', retail:4.79, wholesale:2.89, image:'images/spotsticker/long-shank/main-316-oz.jpg' },
    { sku:'SS-LS10405', desc:'Long Shank Jig Head — 1/4 oz', size:'1/4 oz', color:'Unpainted', pack:'5 Pack', retail:4.79, wholesale:2.89, image:'images/spotsticker/long-shank/main-14-oz.jpg' },
    { sku:'SS-LS11625', desc:'Long Shank Jig Head — 1/16 oz', size:'1/16 oz', color:'Unpainted', pack:'25 Pack', retail:15.49, wholesale:10.79, image:'images/spotsticker/long-shank/main-116-oz.jpg' },
    { sku:'SS-LS10825', desc:'Long Shank Jig Head — 1/8 oz', size:'1/8 oz', color:'Unpainted', pack:'25 Pack', retail:15.49, wholesale:10.79, image:'images/spotsticker/long-shank/main-18-oz.jpg' },
    { sku:'SS-LS31625', desc:'Long Shank Jig Head — 3/16 oz', size:'3/16 oz', color:'Unpainted', pack:'25 Pack', retail:15.49, wholesale:10.79, image:'images/spotsticker/long-shank/main-316-oz.jpg' },
    { sku:'SS-LS10425', desc:'Long Shank Jig Head — 1/4 oz', size:'1/4 oz', color:'Unpainted', pack:'25 Pack', retail:15.49, wholesale:10.79, image:'images/spotsticker/long-shank/main-14-oz.jpg' },
  ],

  magnum: [
    { sku:'SS-MG10805', desc:'Magnum Jig Head — 1/8 oz', size:'1/8 oz', color:'Unpainted', pack:'5 Pack', retail:4.79, wholesale:2.89, image:'images/spotsticker/magnum/main-18-oz.jpg' },
    { sku:'SS-MG31605', desc:'Magnum Jig Head — 3/16 oz', size:'3/16 oz', color:'Unpainted', pack:'5 Pack', retail:4.79, wholesale:2.89, image:'images/spotsticker/magnum/main-316-oz.jpg' },
    { sku:'SS-MG10405', desc:'Magnum Jig Head — 1/4 oz', size:'1/4 oz', color:'Unpainted', pack:'5 Pack', retail:4.79, wholesale:2.89, image:'images/spotsticker/magnum/main-14-oz.jpg' },
    { sku:'SS-MG10825', desc:'Magnum Jig Head — 1/8 oz', size:'1/8 oz', color:'Unpainted', pack:'25 Pack', retail:15.49, wholesale:10.79, image:'images/spotsticker/magnum/main-18-oz.jpg' },
    { sku:'SS-MG31625', desc:'Magnum Jig Head — 3/16 oz', size:'3/16 oz', color:'Unpainted', pack:'25 Pack', retail:15.49, wholesale:10.79, image:'images/spotsticker/magnum/main-316-oz.jpg' },
    { sku:'SS-MG10425', desc:'Magnum Jig Head — 1/4 oz', size:'1/4 oz', color:'Unpainted', pack:'25 Pack', retail:15.49, wholesale:10.79, image:'images/spotsticker/magnum/main-14-oz.jpg' },
  ],

  // ── PRO SERIES JIG HEADS (Painted) ──

  pro_ball: [
    { sku:'SS-PS10805-GRN', desc:'Pro Series Ball Head — 1/8 oz — Green Pumpkin', size:'1/8 oz', color:'Green Pumpkin', pack:'5 Pack', retail:5.99, wholesale:4.19, image:'images/spotsticker/pro-ball/green-pumpkin-18-oz.jpg' },
    { sku:'SS-PS31605-GRN', desc:'Pro Series Ball Head — 3/16 oz — Green Pumpkin', size:'3/16 oz', color:'Green Pumpkin', pack:'5 Pack', retail:5.99, wholesale:4.19, image:'images/spotsticker/pro-ball/green-pumpkin-316-oz.jpg' },
    { sku:'SS-PS10405-GRN', desc:'Pro Series Ball Head — 1/4 oz — Green Pumpkin', size:'1/4 oz', color:'Green Pumpkin', pack:'5 Pack', retail:5.99, wholesale:4.19, image:'images/spotsticker/pro-ball/green-pumpkin-14-oz.jpg' },
    { sku:'SS-PS10805-BLK', desc:'Pro Series Ball Head — 1/8 oz — Black', size:'1/8 oz', color:'Black', pack:'5 Pack', retail:5.99, wholesale:4.19, image:'images/spotsticker/pro-ball/black-18-oz.jpg' },
    { sku:'SS-PS31605-BLK', desc:'Pro Series Ball Head — 3/16 oz — Black', size:'3/16 oz', color:'Black', pack:'5 Pack', retail:5.99, wholesale:4.19, image:'images/spotsticker/pro-ball/black-316-oz.jpg' },
    { sku:'SS-PS10405-BLK', desc:'Pro Series Ball Head — 1/4 oz — Black', size:'1/4 oz', color:'Black', pack:'5 Pack', retail:5.99, wholesale:4.19, image:'images/spotsticker/pro-ball/black-14-oz.jpg' },
    { sku:'SS-PS10825-GRN', desc:'Pro Series Ball Head — 1/8 oz — Green Pumpkin', size:'1/8 oz', color:'Green Pumpkin', pack:'25 Pack', retail:21.99, wholesale:14.99, image:'images/spotsticker/pro-ball/green-pumpkin-18-oz.jpg' },
    { sku:'SS-PS31625-GRN', desc:'Pro Series Ball Head — 3/16 oz — Green Pumpkin', size:'3/16 oz', color:'Green Pumpkin', pack:'25 Pack', retail:21.99, wholesale:14.99, image:'images/spotsticker/pro-ball/green-pumpkin-316-oz.jpg' },
    { sku:'SS-PS10425-GRN', desc:'Pro Series Ball Head — 1/4 oz — Green Pumpkin', size:'1/4 oz', color:'Green Pumpkin', pack:'25 Pack', retail:21.99, wholesale:14.99, image:'images/spotsticker/pro-ball/green-pumpkin-14-oz.jpg' },
    { sku:'SS-PS10825-BLK', desc:'Pro Series Ball Head — 1/8 oz — Black', size:'1/8 oz', color:'Black', pack:'25 Pack', retail:21.99, wholesale:14.99, image:'images/spotsticker/pro-ball/black-18-oz.jpg' },
    { sku:'SS-PS31625-BLK', desc:'Pro Series Ball Head — 3/16 oz — Black', size:'3/16 oz', color:'Black', pack:'25 Pack', retail:21.99, wholesale:14.99, image:'images/spotsticker/pro-ball/black-316-oz.jpg' },
    { sku:'SS-PS10425-BLK', desc:'Pro Series Ball Head — 1/4 oz — Black', size:'1/4 oz', color:'Black', pack:'25 Pack', retail:21.99, wholesale:14.99, image:'images/spotsticker/pro-ball/black-14-oz.jpg' },
  ],

  pro_football: [
    { sku:'SS-FH10804-GRN', desc:'Pro Series Football Head — 1/8 oz — Green Pumpkin', size:'1/8 oz', color:'Green Pumpkin', pack:'4 Pack', retail:5.99, wholesale:4.19, image:'images/spotsticker/pro-football/green-pumpkin-18-oz.jpg' },
    { sku:'SS-FH31604-GRN', desc:'Pro Series Football Head — 3/16 oz — Green Pumpkin', size:'3/16 oz', color:'Green Pumpkin', pack:'4 Pack', retail:5.99, wholesale:4.19, image:'images/spotsticker/pro-football/green-pumpkin-316-oz.jpg' },
    { sku:'SS-FH10404-GRN', desc:'Pro Series Football Head — 1/4 oz — Green Pumpkin', size:'1/4 oz', color:'Green Pumpkin', pack:'4 Pack', retail:5.99, wholesale:4.19, image:'images/spotsticker/pro-football/green-pumpkin-14-oz.jpg' },
    { sku:'SS-FH30804-GRN', desc:'Pro Series Football Head — 3/8 oz — Green Pumpkin', size:'3/8 oz', color:'Green Pumpkin', pack:'4 Pack', retail:5.99, wholesale:4.19, image:'images/spotsticker/pro-football/green-pumpkin-38-oz.jpg' },
    { sku:'SS-FH10804-BLK', desc:'Pro Series Football Head — 1/8 oz — Black', size:'1/8 oz', color:'Black', pack:'4 Pack', retail:5.99, wholesale:4.19, image:'images/spotsticker/pro-football/black-18-oz.jpg' },
    { sku:'SS-FH31604-BLK', desc:'Pro Series Football Head — 3/16 oz — Black', size:'3/16 oz', color:'Black', pack:'4 Pack', retail:5.99, wholesale:4.19, image:'images/spotsticker/pro-football/black-316-oz.jpg' },
    { sku:'SS-FH10404-BLK', desc:'Pro Series Football Head — 1/4 oz — Black', size:'1/4 oz', color:'Black', pack:'4 Pack', retail:5.99, wholesale:4.19, image:'images/spotsticker/pro-football/black-14-oz.jpg' },
    { sku:'SS-FH30804-BLK', desc:'Pro Series Football Head — 3/8 oz — Black', size:'3/8 oz', color:'Black', pack:'4 Pack', retail:5.99, wholesale:4.19, image:'images/spotsticker/pro-football/black-38-oz.jpg' },
  ],

  football_ewg: [
    { sku:'SS-FG10804-GRN', desc:'Football EWG Head — 1/8 oz — Green Pumpkin', size:'1/8 oz', color:'Green Pumpkin', pack:'4 Pack', retail:5.99, wholesale:4.29, image:'images/spotsticker/football-ewg/green-pumpkin-18-oz.jpg' },
    { sku:'SS-FG31604-GRN', desc:'Football EWG Head — 3/16 oz — Green Pumpkin', size:'3/16 oz', color:'Green Pumpkin', pack:'4 Pack', retail:5.99, wholesale:4.29, image:'images/spotsticker/football-ewg/green-pumpkin-316-oz.jpg' },
    { sku:'SS-FG10404-GRN', desc:'Football EWG Head — 1/4 oz — Green Pumpkin', size:'1/4 oz', color:'Green Pumpkin', pack:'4 Pack', retail:5.99, wholesale:4.29, image:'images/spotsticker/football-ewg/green-pumpkin-14-oz.jpg' },
    { sku:'SS-FG10804-BLK', desc:'Football EWG Head — 1/8 oz — Black', size:'1/8 oz', color:'Black', pack:'4 Pack', retail:5.99, wholesale:4.29, image:'images/spotsticker/football-ewg/black-18-oz.jpg' },
    { sku:'SS-FG31604-BLK', desc:'Football EWG Head — 3/16 oz — Black', size:'3/16 oz', color:'Black', pack:'4 Pack', retail:5.99, wholesale:4.29, image:'images/spotsticker/football-ewg/black-316-oz.jpg' },
    { sku:'SS-FG10404-BLK', desc:'Football EWG Head — 1/4 oz — Black', size:'1/4 oz', color:'Black', pack:'4 Pack', retail:5.99, wholesale:4.29, image:'images/spotsticker/football-ewg/black-14-oz.jpg' },
  ],

  screwball_shaky: [
    { sku:'SS-SS10804-GRN', desc:'Screwball Shaky Head — 1/8 oz — Green Pumpkin', size:'1/8 oz', color:'Green Pumpkin', pack:'4 Pack', retail:5.99, wholesale:4.19, image:'images/spotsticker/screwball-shaky/green-pumpkin-18-oz.jpg' },
    { sku:'SS-SS31604-GRN', desc:'Screwball Shaky Head — 3/16 oz — Green Pumpkin', size:'3/16 oz', color:'Green Pumpkin', pack:'4 Pack', retail:5.99, wholesale:4.19, image:'images/spotsticker/screwball-shaky/green-pumpkin-316-oz.jpg' },
    { sku:'SS-SS10404-GRN', desc:'Screwball Shaky Head — 1/4 oz — Green Pumpkin', size:'1/4 oz', color:'Green Pumpkin', pack:'4 Pack', retail:5.99, wholesale:4.19, image:'images/spotsticker/screwball-shaky/green-pumpkin-14-oz.jpg' },
    { sku:'SS-SS10804-BLK', desc:'Screwball Shaky Head — 1/8 oz — Black', size:'1/8 oz', color:'Black', pack:'4 Pack', retail:5.99, wholesale:4.19, image:'images/spotsticker/screwball-shaky/black-18-oz.jpg' },
    { sku:'SS-SS31604-BLK', desc:'Screwball Shaky Head — 3/16 oz — Black', size:'3/16 oz', color:'Black', pack:'4 Pack', retail:5.99, wholesale:4.19, image:'images/spotsticker/screwball-shaky/black-316-oz.jpg' },
    { sku:'SS-SS10404-BLK', desc:'Screwball Shaky Head — 1/4 oz — Black', size:'1/4 oz', color:'Black', pack:'4 Pack', retail:5.99, wholesale:4.19, image:'images/spotsticker/screwball-shaky/black-14-oz.jpg' },
    { sku:'SS-SS10815-GRN', desc:'Screwball Shaky Head — 1/8 oz — Green Pumpkin', size:'1/8 oz', color:'Green Pumpkin', pack:'15 Pack', retail:19.99, wholesale:13.99, image:'images/spotsticker/screwball-shaky/green-pumpkin-18-oz.jpg' },
    { sku:'SS-SS31615-GRN', desc:'Screwball Shaky Head — 3/16 oz — Green Pumpkin', size:'3/16 oz', color:'Green Pumpkin', pack:'15 Pack', retail:19.99, wholesale:13.99, image:'images/spotsticker/screwball-shaky/green-pumpkin-316-oz.jpg' },
    { sku:'SS-SS10415-GRN', desc:'Screwball Shaky Head — 1/4 oz — Green Pumpkin', size:'1/4 oz', color:'Green Pumpkin', pack:'15 Pack', retail:19.99, wholesale:13.99, image:'images/spotsticker/screwball-shaky/green-pumpkin-14-oz.jpg' },
    { sku:'SS-SS10815-BLK', desc:'Screwball Shaky Head — 1/8 oz — Black', size:'1/8 oz', color:'Black', pack:'15 Pack', retail:19.99, wholesale:13.99, image:'images/spotsticker/screwball-shaky/black-18-oz.jpg' },
    { sku:'SS-SS31615-BLK', desc:'Screwball Shaky Head — 3/16 oz — Black', size:'3/16 oz', color:'Black', pack:'15 Pack', retail:19.99, wholesale:13.99, image:'images/spotsticker/screwball-shaky/black-316-oz.jpg' },
    { sku:'SS-SS10415-BLK', desc:'Screwball Shaky Head — 1/4 oz — Black', size:'1/4 oz', color:'Black', pack:'15 Pack', retail:19.99, wholesale:13.99, image:'images/spotsticker/screwball-shaky/black-14-oz.jpg' },
  ],

  crawler_heads: [
    { sku:'SS-CH10804-BLK', desc:'Crawler Head — 1/8 oz — Black', size:'1/8 oz', color:'Black', pack:'4 Pack', retail:6.99, wholesale:4.99, image:'images/spotsticker/crawler-heads/black-18-oz.jpg' },
    { sku:'SS-CH10404-BLK', desc:'Crawler Head — 1/4 oz — Black', size:'1/4 oz', color:'Black', pack:'4 Pack', retail:6.99, wholesale:4.99, image:'images/spotsticker/crawler-heads/black-14-oz.jpg' },
    { sku:'SS-CH30804-BLK', desc:'Crawler Head — 3/8 oz — Black', size:'3/8 oz', color:'Black', pack:'4 Pack', retail:6.99, wholesale:4.99, image:'images/spotsticker/crawler-heads/black-38-oz.jpg' },
    { sku:'SS-CH10804-BRN', desc:'Crawler Head — 1/8 oz — Brown', size:'1/8 oz', color:'Brown', pack:'4 Pack', retail:6.99, wholesale:4.99, image:'images/spotsticker/crawler-heads/brown-18-oz.jpg' },
    { sku:'SS-CH10404-BRN', desc:'Crawler Head — 1/4 oz — Brown', size:'1/4 oz', color:'Brown', pack:'4 Pack', retail:6.99, wholesale:4.99, image:'images/spotsticker/crawler-heads/brown-14-oz.jpg' },
    { sku:'SS-CH30804-BRN', desc:'Crawler Head — 3/8 oz — Brown', size:'3/8 oz', color:'Brown', pack:'4 Pack', retail:6.99, wholesale:4.99, image:'images/spotsticker/crawler-heads/brown-38-oz.jpg' },
    { sku:'SS-CH10804-GRN', desc:'Crawler Head — 1/8 oz — Green Pumpkin', size:'1/8 oz', color:'Green Pumpkin', pack:'4 Pack', retail:6.99, wholesale:4.99, image:'images/spotsticker/crawler-heads/green-pumpkin-18-oz.jpg' },
    { sku:'SS-CH10404-GRN', desc:'Crawler Head — 1/4 oz — Green Pumpkin', size:'1/4 oz', color:'Green Pumpkin', pack:'4 Pack', retail:6.99, wholesale:4.99, image:'images/spotsticker/crawler-heads/green-pumpkin-14-oz.jpg' },
    { sku:'SS-CH30804-GRN', desc:'Crawler Head — 3/8 oz — Green Pumpkin', size:'3/8 oz', color:'Green Pumpkin', pack:'4 Pack', retail:6.99, wholesale:4.99, image:'images/spotsticker/crawler-heads/green-pumpkin-38-oz.jpg' },
  ],

  // ── DROPSHOT WEIGHTS ──

  dropshot_cylinder: [
    { sku:'SS-CDS125', desc:'Finesse Dropshot Cylinder — 1/8 oz', size:'1/8 oz', color:'Lead', pack:'10 Pack', retail:5.99, wholesale:4.19, image:'images/spotsticker/dropshot-cylinder/main-18-oz.jpg' },
    { sku:'SS-CDS200', desc:'Finesse Dropshot Cylinder — 3/16 oz', size:'3/16 oz', color:'Lead', pack:'10 Pack', retail:5.99, wholesale:4.19, image:'images/spotsticker/dropshot-cylinder/main-316-oz.jpg' },
    { sku:'SS-CDS250', desc:'Finesse Dropshot Cylinder — 1/4 oz', size:'1/4 oz', color:'Lead', pack:'10 Pack', retail:5.99, wholesale:4.19, image:'images/spotsticker/dropshot-cylinder/main-14-oz.jpg' },
    { sku:'SS-CDS375', desc:'Finesse Dropshot Cylinder — 3/8 oz', size:'3/8 oz', color:'Lead', pack:'8 Pack', retail:5.99, wholesale:4.19, image:'images/spotsticker/dropshot-cylinder/main-38-oz.jpg' },
  ],

  dropshot_teardrop: [
    { sku:'SS-TDS125', desc:'Finesse Dropshot Teardrop — 1/8 oz', size:'1/8 oz', color:'Lead', pack:'10 Pack', retail:5.99, wholesale:4.19, image:'images/spotsticker/dropshot-teardrop/main-18-oz.jpg' },
    { sku:'SS-TDS200', desc:'Finesse Dropshot Teardrop — 3/16 oz', size:'3/16 oz', color:'Lead', pack:'10 Pack', retail:5.99, wholesale:4.19, image:'images/spotsticker/dropshot-teardrop/main-316-oz.jpg' },
    { sku:'SS-TDS250', desc:'Finesse Dropshot Teardrop — 1/4 oz', size:'1/4 oz', color:'Lead', pack:'10 Pack', retail:5.99, wholesale:4.19, image:'images/spotsticker/dropshot-teardrop/main-14-oz.jpg' },
    { sku:'SS-TDS375', desc:'Finesse Dropshot Teardrop — 3/8 oz', size:'3/8 oz', color:'Lead', pack:'8 Pack', retail:5.99, wholesale:4.19, image:'images/spotsticker/dropshot-teardrop/main-38-oz.jpg' },
  ],

  // ── HAND-TIED CASTING JIGS ──

  casting_jigs: [
    { sku:'SS-CJ10401-BLK', desc:'Casting Jig — 1/4 oz — Black', size:'1/4 oz', color:'Black', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/black-14-oz.jpg' },
    { sku:'SS-CJ30801-BLK', desc:'Casting Jig — 3/8 oz — Black', size:'3/8 oz', color:'Black', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/black-38-oz.jpg' },
    { sku:'SS-CJ10201-BLK', desc:'Casting Jig — 1/2 oz — Black', size:'1/2 oz', color:'Black', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/black-12-oz.jpg' },
    { sku:'SS-CJ10401-BRN', desc:'Casting Jig — 1/4 oz — Brown', size:'1/4 oz', color:'Brown', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/brown-14-oz.jpg' },
    { sku:'SS-CJ30801-BRN', desc:'Casting Jig — 3/8 oz — Brown', size:'3/8 oz', color:'Brown', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/brown-38-oz.jpg' },
    { sku:'SS-CJ10201-BRN', desc:'Casting Jig — 1/2 oz — Brown', size:'1/2 oz', color:'Brown', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/brown-12-oz.jpg' },
    { sku:'SS-CJ10401-BOL', desc:'Casting Jig — 1/4 oz — Brown/Olive', size:'1/4 oz', color:'Brown/Olive', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/brownolive-14-oz.jpg' },
    { sku:'SS-CJ30801-BOL', desc:'Casting Jig — 3/8 oz — Brown/Olive', size:'3/8 oz', color:'Brown/Olive', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/brownolive-38-oz.jpg' },
    { sku:'SS-CJ10201-BOL', desc:'Casting Jig — 1/2 oz — Brown/Olive', size:'1/2 oz', color:'Brown/Olive', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/brownolive-12-oz.jpg' },
    { sku:'SS-CJ10401-BML', desc:'Casting Jig — 1/4 oz — Brown/Melon', size:'1/4 oz', color:'Brown/Melon', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/brownmelon-14-oz.jpg' },
    { sku:'SS-CJ30801-BML', desc:'Casting Jig — 3/8 oz — Brown/Melon', size:'3/8 oz', color:'Brown/Melon', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/brownmelon-38-oz.jpg' },
    { sku:'SS-CJ10201-BML', desc:'Casting Jig — 1/2 oz — Brown/Melon', size:'1/2 oz', color:'Brown/Melon', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/brownmelon-12-oz.jpg' },
    { sku:'SS-CJ10401-BOG', desc:'Casting Jig — 1/4 oz — Brown/Orange', size:'1/4 oz', color:'Brown/Orange', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/brownorange-14-oz.jpg' },
    { sku:'SS-CJ30801-BOG', desc:'Casting Jig — 3/8 oz — Brown/Orange', size:'3/8 oz', color:'Brown/Orange', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/brownorange-38-oz.jpg' },
    { sku:'SS-CJ10201-BOG', desc:'Casting Jig — 1/2 oz — Brown/Orange', size:'1/2 oz', color:'Brown/Orange', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/brownorange-12-oz.jpg' },
    { sku:'SS-CJ10401-BPP', desc:'Casting Jig — 1/4 oz — Brown/Purple', size:'1/4 oz', color:'Brown/Purple', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/brownpurple-14-oz.jpg' },
    { sku:'SS-CJ30801-BPP', desc:'Casting Jig — 3/8 oz — Brown/Purple', size:'3/8 oz', color:'Brown/Purple', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/brownpurple-38-oz.jpg' },
    { sku:'SS-CJ10201-BPP', desc:'Casting Jig — 1/2 oz — Brown/Purple', size:'1/2 oz', color:'Brown/Purple', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/brownpurple-12-oz.jpg' },
    { sku:'SS-CJ10401-GCW', desc:'Casting Jig — 1/4 oz — Green Craw', size:'1/4 oz', color:'Green Craw', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/green-craw-14-oz.jpg' },
    { sku:'SS-CJ30801-GCW', desc:'Casting Jig — 3/8 oz — Green Craw', size:'3/8 oz', color:'Green Craw', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/green-craw-38-oz.jpg' },
    { sku:'SS-CJ10201-GCW', desc:'Casting Jig — 1/2 oz — Green Craw', size:'1/2 oz', color:'Green Craw', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/green-craw-12-oz.jpg' },
    { sku:'SS-CJ10401-GGC', desc:'Casting Jig — 1/4 oz — Georgia Craw', size:'1/4 oz', color:'Georgia Craw', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/georgia-craw-14-oz.jpg' },
    { sku:'SS-CJ30801-GGC', desc:'Casting Jig — 3/8 oz — Georgia Craw', size:'3/8 oz', color:'Georgia Craw', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/georgia-craw-38-oz.jpg' },
    { sku:'SS-CJ10201-GGC', desc:'Casting Jig — 1/2 oz — Georgia Craw', size:'1/2 oz', color:'Georgia Craw', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/georgia-craw-12-oz.jpg' },
    { sku:'SS-CJ10401-CHC', desc:'Casting Jig — 1/4 oz — Chartreuse Craw', size:'1/4 oz', color:'Chartreuse Craw', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/chartreuse-craw-14-oz.jpg' },
    { sku:'SS-CJ30801-CHC', desc:'Casting Jig — 3/8 oz — Chartreuse Craw', size:'3/8 oz', color:'Chartreuse Craw', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/chartreuse-craw-38-oz.jpg' },
    { sku:'SS-CJ10201-CHC', desc:'Casting Jig — 1/2 oz — Chartreuse Craw', size:'1/2 oz', color:'Chartreuse Craw', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/chartreuse-craw-12-oz.jpg' },
    { sku:'SS-CJ10401-GPC', desc:'Casting Jig — 1/4 oz — Green Pumpkin Craw', size:'1/4 oz', color:'Green Pumpkin Craw', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/green-pumpkin-craw-14-oz.jpg' },
    { sku:'SS-CJ30801-GPC', desc:'Casting Jig — 3/8 oz — Green Pumpkin Craw', size:'3/8 oz', color:'Green Pumpkin Craw', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/green-pumpkin-craw-38-oz.jpg' },
    { sku:'SS-CJ10201-GPC', desc:'Casting Jig — 1/2 oz — Green Pumpkin Craw', size:'1/2 oz', color:'Green Pumpkin Craw', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/green-pumpkin-craw-12-oz.jpg' },
    { sku:'SS-CJ10401-RTB', desc:'Casting Jig — 1/4 oz — Rootbeer', size:'1/4 oz', color:'Rootbeer', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/rootbeer-14-oz.jpg' },
    { sku:'SS-CJ30801-RTB', desc:'Casting Jig — 3/8 oz — Rootbeer', size:'3/8 oz', color:'Rootbeer', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/rootbeer-38-oz.jpg' },
    { sku:'SS-CJ10201-RTB', desc:'Casting Jig — 1/2 oz — Rootbeer', size:'1/2 oz', color:'Rootbeer', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/rootbeer-12-oz.jpg' },
    { sku:'SS-CJ10401-CPP', desc:'Casting Jig — 1/4 oz — Cinnamon Pepper', size:'1/4 oz', color:'Cinnamon Pepper', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/cinnamon-pepper-14-oz.jpg' },
    { sku:'SS-CJ30801-CPP', desc:'Casting Jig — 3/8 oz — Cinnamon Pepper', size:'3/8 oz', color:'Cinnamon Pepper', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/cinnamon-pepper-38-oz.jpg' },
    { sku:'SS-CJ10201-CPP', desc:'Casting Jig — 1/2 oz — Cinnamon Pepper', size:'1/2 oz', color:'Cinnamon Pepper', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/cinnamon-pepper-12-oz.jpg' },
    { sku:'SS-CJ10401-SMK', desc:'Casting Jig — 1/4 oz — Dark Smoke', size:'1/4 oz', color:'Dark Smoke', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/dark-smoke-14-oz.jpg' },
    { sku:'SS-CJ30801-SMK', desc:'Casting Jig — 3/8 oz — Dark Smoke', size:'3/8 oz', color:'Dark Smoke', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/dark-smoke-38-oz.jpg' },
    { sku:'SS-CJ10201-SMK', desc:'Casting Jig — 1/2 oz — Dark Smoke', size:'1/2 oz', color:'Dark Smoke', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/dark-smoke-12-oz.jpg' },
    { sku:'SS-CJ10401-PBJ', desc:'Casting Jig — 1/4 oz — PB&J', size:'1/4 oz', color:'PB&J', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/pbj-14-oz.jpg' },
    { sku:'SS-CJ30801-PBJ', desc:'Casting Jig — 3/8 oz — PB&J', size:'3/8 oz', color:'PB&J', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/pbj-38-oz.jpg' },
    { sku:'SS-CJ10201-PBJ', desc:'Casting Jig — 1/2 oz — PB&J', size:'1/2 oz', color:'PB&J', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/pbj-12-oz.jpg' },
    { sku:'SS-CJ10401-BPK', desc:'Casting Jig — 1/4 oz — Black Pumpkin', size:'1/4 oz', color:'Black Pumpkin', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/black-pumpkin-14-oz.jpg' },
    { sku:'SS-CJ30801-BPK', desc:'Casting Jig — 3/8 oz — Black Pumpkin', size:'3/8 oz', color:'Black Pumpkin', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/black-pumpkin-38-oz.jpg' },
    { sku:'SS-CJ10201-BPK', desc:'Casting Jig — 1/2 oz — Black Pumpkin', size:'1/2 oz', color:'Black Pumpkin', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/black-pumpkin-12-oz.jpg' },
    { sku:'SS-CJ10401-SCD', desc:'Casting Jig — 1/4 oz — Spot C Ducer', size:'1/4 oz', color:'Spot C Ducer', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/spot-c-ducer-14-oz.jpg' },
    { sku:'SS-CJ30801-SCD', desc:'Casting Jig — 3/8 oz — Spot C Ducer', size:'3/8 oz', color:'Spot C Ducer', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/spot-c-ducer-38-oz.jpg' },
    { sku:'SS-CJ10201-SCD', desc:'Casting Jig — 1/2 oz — Spot C Ducer', size:'1/2 oz', color:'Spot C Ducer', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/spot-c-ducer-12-oz.jpg' },
    { sku:'SS-CJ10401-BKB-R', desc:'Casting Jig LR — 1/4 oz — Reptile Black/Blue', size:'1/4 oz', color:'Reptile - Black/Blue', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/reptile-blackblue-14-oz.jpg' },
    { sku:'SS-CJ30801-BKB-R', desc:'Casting Jig LR — 3/8 oz — Reptile Black/Blue', size:'3/8 oz', color:'Reptile - Black/Blue', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/reptile-blackblue-38-oz.jpg' },
    { sku:'SS-CJ10201-BKB-R', desc:'Casting Jig LR — 1/2 oz — Reptile Black/Blue', size:'1/2 oz', color:'Reptile - Black/Blue', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/reptile-blackblue-12-oz.jpg' },
    { sku:'SS-CJ10401-BOG-R', desc:'Casting Jig LR — 1/4 oz — Reptile Brown/Orange', size:'1/4 oz', color:'Reptile - Brown/Orange', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/reptile-brownorange-14-oz.jpg' },
    { sku:'SS-CJ30801-BOG-R', desc:'Casting Jig LR — 3/8 oz — Reptile Brown/Orange', size:'3/8 oz', color:'Reptile - Brown/Orange', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/reptile-brownorange-38-oz.jpg' },
    { sku:'SS-CJ10201-BOG-R', desc:'Casting Jig LR — 1/2 oz — Reptile Brown/Orange', size:'1/2 oz', color:'Reptile - Brown/Orange', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/reptile-brownorange-12-oz.jpg' },
    { sku:'SS-CJ10401-BBL-R', desc:'Casting Jig LR — 1/4 oz — Reptile Brown/Black', size:'1/4 oz', color:'Reptile - Brown/Black', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/reptile-brownblack-14-oz.jpg' },
    { sku:'SS-CJ30801-BBL-R', desc:'Casting Jig LR — 3/8 oz — Reptile Brown/Black', size:'3/8 oz', color:'Reptile - Brown/Black', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/reptile-brownblack-38-oz.jpg' },
    { sku:'SS-CJ10201-BBL-R', desc:'Casting Jig LR — 1/2 oz — Reptile Brown/Black', size:'1/2 oz', color:'Reptile - Brown/Black', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/reptile-brownblack-12-oz.jpg' },
    { sku:'SS-CJ10401-GPL', desc:'Casting Jig — 1/4 oz — Green Pearl', size:'1/4 oz', color:'Green Pearl', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/green-pearl-14-oz.jpg' },
    { sku:'SS-CJ30801-GPL', desc:'Casting Jig — 3/8 oz — Green Pearl', size:'3/8 oz', color:'Green Pearl', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/green-pearl-38-oz.jpg' },
    { sku:'SS-CJ10201-GPL', desc:'Casting Jig — 1/2 oz — Green Pearl', size:'1/2 oz', color:'Green Pearl', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/casting-jigs/green-pearl-12-oz.jpg' },
  ],

  // ── HAND-TIED FOOTBALL JIGS ──

  football_jigs: [
    { sku:'SS-FJ30801-GCW', desc:'Football Jig — 3/8 oz — Green Craw', size:'3/8 oz', color:'Green Craw', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/football-jigs/green-craw-38-oz.jpg' },
    { sku:'SS-FJ10201-GCW', desc:'Football Jig — 1/2 oz — Green Craw', size:'1/2 oz', color:'Green Craw', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/football-jigs/green-craw-12-oz.jpg' },
    { sku:'SS-FJ30401-GCW', desc:'Football Jig — 3/4 oz — Green Craw', size:'3/4 oz', color:'Green Craw', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/football-jigs/green-craw-34-oz.jpg' },
    { sku:'SS-FJ30801-GGC', desc:'Football Jig — 3/8 oz — Georgia Craw', size:'3/8 oz', color:'Georgia Craw', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/football-jigs/georgia-craw-38-oz.jpg' },
    { sku:'SS-FJ10201-GGC', desc:'Football Jig — 1/2 oz — Georgia Craw', size:'1/2 oz', color:'Georgia Craw', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/football-jigs/georgia-craw-12-oz.jpg' },
    { sku:'SS-FJ30401-GGC', desc:'Football Jig — 3/4 oz — Georgia Craw', size:'3/4 oz', color:'Georgia Craw', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/football-jigs/georgia-craw-34-oz.jpg' },
    { sku:'SS-FJ30801-GPC', desc:'Football Jig — 3/8 oz — Green Pumpkin Craw', size:'3/8 oz', color:'Green Pumpkin Craw', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/football-jigs/green-pumpkin-craw-38-oz.jpg' },
    { sku:'SS-FJ10201-GPC', desc:'Football Jig — 1/2 oz — Green Pumpkin Craw', size:'1/2 oz', color:'Green Pumpkin Craw', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/football-jigs/green-pumpkin-craw-12-oz.jpg' },
    { sku:'SS-FJ30401-GPC', desc:'Football Jig — 3/4 oz — Green Pumpkin Craw', size:'3/4 oz', color:'Green Pumpkin Craw', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/football-jigs/green-pumpkin-craw-34-oz.jpg' },
    { sku:'SS-FJ30801-PBJ', desc:'Football Jig — 3/8 oz — PB&J', size:'3/8 oz', color:'PB&J', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/football-jigs/pbj-38-oz.jpg' },
    { sku:'SS-FJ10201-PBJ', desc:'Football Jig — 1/2 oz — PB&J', size:'1/2 oz', color:'PB&J', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/football-jigs/pbj-12-oz.jpg' },
    { sku:'SS-FJ30401-PBJ', desc:'Football Jig — 3/4 oz — PB&J', size:'3/4 oz', color:'PB&J', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/football-jigs/pbj-34-oz.jpg' },
    { sku:'SS-FJ30801-BPK', desc:'Football Jig — 3/8 oz — Black Pumpkin', size:'3/8 oz', color:'Black Pumpkin', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/football-jigs/black-pumpkin-38-oz.jpg' },
    { sku:'SS-FJ10201-BPK', desc:'Football Jig — 1/2 oz — Black Pumpkin', size:'1/2 oz', color:'Black Pumpkin', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/football-jigs/black-pumpkin-12-oz.jpg' },
    { sku:'SS-FJ30401-BPK', desc:'Football Jig — 3/4 oz — Black Pumpkin', size:'3/4 oz', color:'Black Pumpkin', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/football-jigs/black-pumpkin-34-oz.jpg' },
    { sku:'SS-FJ30801-BKB-R', desc:'Football Jig LR — 3/8 oz — Reptile Black/Blue', size:'3/8 oz', color:'Reptile - Black/Blue', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/football-jigs/reptile-blackblue-38-oz.jpg' },
    { sku:'SS-FJ10201-BKB-R', desc:'Football Jig LR — 1/2 oz — Reptile Black/Blue', size:'1/2 oz', color:'Reptile - Black/Blue', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/football-jigs/reptile-blackblue-12-oz.jpg' },
    { sku:'SS-FJ30401-BKB-R', desc:'Football Jig LR — 3/4 oz — Reptile Black/Blue', size:'3/4 oz', color:'Reptile - Black/Blue', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/football-jigs/reptile-blackblue-34-oz.jpg' },
    { sku:'SS-FJ30801-BOG-R', desc:'Football Jig LR — 3/8 oz — Reptile Brown/Orange', size:'3/8 oz', color:'Reptile - Brown/Orange', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/football-jigs/reptile-brownorange-38-oz.jpg' },
    { sku:'SS-FJ10201-BOG-R', desc:'Football Jig LR — 1/2 oz — Reptile Brown/Orange', size:'1/2 oz', color:'Reptile - Brown/Orange', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/football-jigs/reptile-brownorange-12-oz.jpg' },
    { sku:'SS-FJ30401-BOG-R', desc:'Football Jig LR — 3/4 oz — Reptile Brown/Orange', size:'3/4 oz', color:'Reptile - Brown/Orange', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/football-jigs/reptile-brownorange-34-oz.jpg' },
    { sku:'SS-FJ30801-BBL-R', desc:'Football Jig LR — 3/8 oz — Reptile Brown/Black', size:'3/8 oz', color:'Reptile - Brown/Black', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/football-jigs/green-craw-38-oz.jpg' },
    { sku:'SS-FJ10201-BBL-R', desc:'Football Jig LR — 1/2 oz — Reptile Brown/Black', size:'1/2 oz', color:'Reptile - Brown/Black', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/football-jigs/green-craw-12-oz.jpg' },
    { sku:'SS-FJ30401-BBL-R', desc:'Football Jig LR — 3/4 oz — Reptile Brown/Black', size:'3/4 oz', color:'Reptile - Brown/Black', pack:'1 Pack', retail:4.59, wholesale:3.19, image:'images/spotsticker/football-jigs/green-craw-34-oz.jpg' },
  ],

  // ── SPECIALTY HEADS ──

  underspins: [
    { sku:'SS-US716-WHT',   desc:'Underspin — 7/16 oz — White', size:'7/16 oz', color:'White', pack:'1 Pack', retail:4.99, wholesale:3.29, image:'images/spotsticker/underspins/white.jpg' },
    { sku:'SS-US716-WHT-P', desc:'Underspin — 7/16 oz — White (Painted)', size:'7/16 oz', color:'White (Painted)', pack:'1 Pack', retail:4.99, wholesale:3.29, image:'images/spotsticker/underspins/white-painted.jpg' },
    { sku:'SS-US716-ALB',   desc:'Underspin — 7/16 oz — Albino', size:'7/16 oz', color:'Albino', pack:'1 Pack', retail:4.99, wholesale:3.29, image:'images/spotsticker/underspins/albino.jpg' },
    { sku:'SS-US716-ARK',   desc:'Underspin — 7/16 oz — Ark Shiner', size:'7/16 oz', color:'Ark Shiner', pack:'1 Pack', retail:4.99, wholesale:3.29, image:'images/spotsticker/underspins/ark-shiner.jpg' },
  ],

  football_swimbait: [
    { sku:'SS-FS30803-UNP', desc:'Football Swimbait Head — 3/8 oz', size:'3/8 oz', color:'Unpainted', pack:'3 Pack', retail:5.99, wholesale:3.99, image:'images/spotsticker/football-swimbait/main-38-oz.jpg' },
    { sku:'SS-FS10203-UNP', desc:'Football Swimbait Head — 1/2 oz', size:'1/2 oz', color:'Unpainted', pack:'3 Pack', retail:5.99, wholesale:3.99, image:'images/spotsticker/football-swimbait/main-12-oz.jpg' },
    { sku:'SS-FS30403-UNP', desc:'Football Swimbait Head — 3/4 oz', size:'3/4 oz', color:'Unpainted', pack:'3 Pack', retail:5.99, wholesale:3.99, image:'images/spotsticker/football-swimbait/main-34-oz.jpg' },
  ],

  screwlock_swimbait: [
    { sku:'SS-SB10804-UNP', desc:'Screwlock Swimbait Head — 1/8 oz', size:'1/8 oz', color:'Unpainted', pack:'4 Pack', retail:5.99, wholesale:4.19, image:'images/spotsticker/screwlock-swimbait/main-18-oz.jpg' },
    { sku:'SS-SB10404-UNP', desc:'Screwlock Swimbait Head — 1/4 oz', size:'1/4 oz', color:'Unpainted', pack:'4 Pack', retail:5.99, wholesale:4.19, image:'images/spotsticker/screwlock-swimbait/main-14-oz.jpg' },
    { sku:'SS-SB30804-UNP', desc:'Screwlock Swimbait Head — 3/8 oz', size:'3/8 oz', color:'Unpainted', pack:'4 Pack', retail:5.99, wholesale:4.19, image:'images/spotsticker/screwlock-swimbait/main-38-oz.jpg' },
    { sku:'SS-SB10810-UNP', desc:'Screwlock Swimbait Head — 1/8 oz', size:'1/8 oz', color:'Unpainted', pack:'10 Pack', retail:13.99, wholesale:9.69, image:'images/spotsticker/screwlock-swimbait/main-18-oz.jpg' },
    { sku:'SS-SB10410-UNP', desc:'Screwlock Swimbait Head — 1/4 oz', size:'1/4 oz', color:'Unpainted', pack:'10 Pack', retail:13.99, wholesale:9.69, image:'images/spotsticker/screwlock-swimbait/main-14-oz.jpg' },
    { sku:'SS-SB30810-UNP', desc:'Screwlock Swimbait Head — 3/8 oz', size:'3/8 oz', color:'Unpainted', pack:'10 Pack', retail:13.99, wholesale:9.69, image:'images/spotsticker/screwlock-swimbait/main-38-oz.jpg' },
  ],

  // ── SOFT PLASTICS ──

  dropshot_worm_6: [
    { sku:'SS-PP-6DS-CPU', desc:'Drop-Shot Worm 6" — Cinnamon Purple', size:'6"', color:'Cinnamon Purple', pack:'12 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/dropshot-worm-6/cinnamon-purple-6-inch.jpg' },
    { sku:'SS-PP-6DS-CRH', desc:'Drop-Shot Worm 6" — Crushed Herring', size:'6"', color:'Crushed Herring', pack:'12 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/dropshot-worm-6/crushed-herring-6-inch.jpg' },
    { sku:'SS-PP-6DS-GPG', desc:'Drop-Shot Worm 6" — Green Pumpkin/Green', size:'6"', color:'Green Pumpkin/Green', pack:'12 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/dropshot-worm-6/green-pumpkin-green-6-inch.jpg' },
    { sku:'SS-PP-6DS-HTO', desc:'Drop-Shot Worm 6" — Hot Tomato', size:'6"', color:'Hot Tomato', pack:'12 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/dropshot-worm-6/hot-tomato-6-inch.jpg' },
    { sku:'SS-PP-6DS-LVS', desc:'Drop-Shot Worm 6" — Lavender Shad', size:'6"', color:'Lavender Shad', pack:'12 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/dropshot-worm-6/lavender-shad-6-inch.jpg' },
    { sku:'SS-PP-6DS-SSS', desc:'Drop-Shot Worm 6" — SS Sunrise', size:'6"', color:'SS Sunrise', pack:'12 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/dropshot-worm-6/ss-sunrise-6-inch.jpg' },
    { sku:'SS-PP-6DS-SND', desc:'Drop-Shot Worm 6" — Sand', size:'6"', color:'Sand', pack:'12 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/dropshot-worm-6/sand-6-inch.jpg' },
    { sku:'SS-PP-6DS-MRD', desc:'Drop-Shot Worm 6" — Morning Dawn', size:'6"', color:'Morning Dawn', pack:'12 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/dropshot-worm-6/morning-dawn-6-inch.jpg' },
    { sku:'SS-PP-6DS-BLS', desc:'Drop-Shot Worm 6" — Blue Shad', size:'6"', color:'Blue Shad', pack:'12 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/dropshot-worm-6/blue-shad-6-inch.jpg' },
    { sku:'SS-PP-6DS-ELS', desc:'Drop-Shot Worm 6" — Electric Shad', size:'6"', color:'Electric Shad', pack:'12 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/dropshot-worm-6/electric-shad-6-inch.jpg' },
  ],

  dropshot_worm_45: [
    { sku:'SS-PP-45DS-CPU', desc:'Drop-Shot Worm 4.5" — Cinnamon Purple', size:'4.5"', color:'Cinnamon Purple', pack:'15 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/dropshot-worm-45/cinnamon-purple-6-inch.jpg' },
    { sku:'SS-PP-45DS-CRH', desc:'Drop-Shot Worm 4.5" — Crushed Herring', size:'4.5"', color:'Crushed Herring', pack:'15 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/dropshot-worm-45/crushed-herring-6-inch.jpg' },
    { sku:'SS-PP-45DS-GPG', desc:'Drop-Shot Worm 4.5" — Green Pumpkin/Green', size:'4.5"', color:'Green Pumpkin/Green', pack:'15 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/dropshot-worm-45/green-pumpkin-green-6-inch.jpg' },
    { sku:'SS-PP-45DS-HTO', desc:'Drop-Shot Worm 4.5" — Hot Tomato', size:'4.5"', color:'Hot Tomato', pack:'15 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/dropshot-worm-45/hot-tomato-6-inch.jpg' },
    { sku:'SS-PP-45DS-LVS', desc:'Drop-Shot Worm 4.5" — Lavender Shad', size:'4.5"', color:'Lavender Shad', pack:'15 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/dropshot-worm-45/lavender-shad-6-inch.jpg' },
    { sku:'SS-PP-45DS-SSS', desc:'Drop-Shot Worm 4.5" — SS Sunrise', size:'4.5"', color:'SS Sunrise', pack:'15 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/dropshot-worm-45/ss-sunrise-6-inch.jpg' },
    { sku:'SS-PP-45DS-SND', desc:'Drop-Shot Worm 4.5" — Sand', size:'4.5"', color:'Sand', pack:'15 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/dropshot-worm-45/sand-6-inch.jpg' },
    { sku:'SS-PP-45DS-MRD', desc:'Drop-Shot Worm 4.5" — Morning Dawn', size:'4.5"', color:'Morning Dawn', pack:'15 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/dropshot-worm-45/morning-dawn-6-inch.jpg' },
    { sku:'SS-PP-45DS-BLS', desc:'Drop-Shot Worm 4.5" — Blue Shad', size:'4.5"', color:'Blue Shad', pack:'15 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/dropshot-worm-45/blue-shad-6-inch.jpg' },
    { sku:'SS-PP-45DS-ELS', desc:'Drop-Shot Worm 4.5" — Electric Shad', size:'4.5"', color:'Electric Shad', pack:'15 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/dropshot-worm-45/electric-shad-6-inch.jpg' },
  ],

  twin_tail_grub: [
    { sku:'SS-PP-5TT-GPK', desc:'5" Twin-Tail Grub — Green Pumpkin', size:'5"', color:'Green Pumpkin', pack:'12 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/twin-tail-grub/green-pumpkin.jpg' },
    { sku:'SS-PP-5TT-WAT', desc:'5" Twin-Tail Grub — Watermelon Seed', size:'5"', color:'Watermelon Seed', pack:'12 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/twin-tail-grub/watermelon-seed.jpg' },
    { sku:'SS-PP-5TT-BBS', desc:'5" Twin-Tail Grub — Black/Blue Swirl', size:'5"', color:'Black/Blue Swirl', pack:'12 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/twin-tail-grub/black-blue-swirl.jpg' },
    { sku:'SS-PP-5TT-CPP', desc:'5" Twin-Tail Grub — Cinnamon/Black Flake', size:'5"', color:'Cinnamon/Black Flake', pack:'12 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/twin-tail-grub/cinnamon-black-flake.jpg' },
    { sku:'SS-PP-5TT-BRB', desc:'5" Twin-Tail Grub — Brown/Black Flake', size:'5"', color:'Brown/Black Flake', pack:'12 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/twin-tail-grub/brown-black-flake.jpg' },
  ],

  finesse_stick: [
    { sku:'SS-PP-6FS-GPK', desc:'6" Finesse Stick — Green Pumpkin', size:'5.75"', color:'Green Pumpkin', pack:'12 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/finesse-stick/green-pumpkin.jpg' },
    { sku:'SS-PP-6FS-GPG', desc:'6" Finesse Stick — Green Pumpkin/Green', size:'5.75"', color:'Green Pumpkin/Green', pack:'12 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/finesse-stick/green-pumpkin-green.jpg' },
    { sku:'SS-PP-6FS-GPP', desc:'6" Finesse Stick — Green Pumpkin/Purple', size:'5.75"', color:'Green Pumpkin/Purple', pack:'12 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/finesse-stick/green-pumpkin-purple.jpg' },
    { sku:'SS-PP-6FS-BBH', desc:'6" Finesse Stick — Blueback Herring', size:'5.75"', color:'Blueback Herring', pack:'12 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/finesse-stick/blueback-herring.jpg' },
    { sku:'SS-PP-6FS-PRS', desc:'6" Finesse Stick — Pearl Shad', size:'5.75"', color:'Pearl Shad', pack:'12 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/finesse-stick/pearl-shad.jpg' },
    { sku:'SS-PP-6FS-WTR', desc:'6" Finesse Stick — Watermelon Red', size:'5.75"', color:'Watermelon Red', pack:'12 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/finesse-stick/watermelon-red.jpg' },
    { sku:'SS-PP-6FS-CPU', desc:'6" Finesse Stick — Cinnamon Purple', size:'5.75"', color:'Cinnamon Purple', pack:'12 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/finesse-stick/cinnamon-purple.jpg' },
    { sku:'SS-PP-6FS-ELS', desc:'6" Finesse Stick — Electric Shad', size:'5.75"', color:'Electric Shad', pack:'12 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/finesse-stick/electric-shad.jpg' },
    { sku:'SS-PP-6FS-TIL', desc:'6" Finesse Stick — Tilapia', size:'5.75"', color:'Tilapia', pack:'12 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/finesse-stick/tilapia.jpg' },
    { sku:'SS-PP-6FS-SND', desc:'6" Finesse Stick — Sand', size:'5.75"', color:'Sand', pack:'12 Pack', retail:4.49, wholesale:2.99, image:'images/spotsticker/finesse-stick/sand.jpg' },
  ],

  swimbait_38: [
    { sku:'SS-PP-38S-BBH', desc:'Soft Swimbait 3.8" — Blueback Herring', size:'3.8"', color:'Blueback Herring', pack:'6 Pack', retail:6.99, wholesale:4.99, image:'images/spotsticker/swimbait-38/blueback-herring-3-3.jpg' },
    { sku:'SS-PP-38S-ALB', desc:'Soft Swimbait 3.8" — Albino', size:'3.8"', color:'Albino', pack:'6 Pack', retail:6.99, wholesale:4.99, image:'images/spotsticker/swimbait-38/albino-3-3.jpg' },
    { sku:'SS-PP-38S-WMP', desc:'Soft Swimbait 3.8" — Watermelon Pearl', size:'3.8"', color:'Watermelon Pearl', pack:'6 Pack', retail:6.99, wholesale:4.99, image:'images/spotsticker/swimbait-38/watermelon-pearl-3-3.jpg' },
    { sku:'SS-PP-38S-CRS', desc:'Soft Swimbait 3.8" — Cripple Shad', size:'3.8"', color:'Cripple Shad', pack:'6 Pack', retail:6.99, wholesale:4.99, image:'images/spotsticker/swimbait-38/cripple-shad-3-3.jpg' },
    { sku:'SS-PP-38S-WHT', desc:'Soft Swimbait 3.8" — Pearl White', size:'3.8"', color:'Pearl White', pack:'6 Pack', retail:6.99, wholesale:4.99, image:'images/spotsticker/swimbait-38/_main.jpg' },
  ],

  swimbait_33: [
    { sku:'SS-PP-33S-BBH', desc:'Soft Swimbait 3.3" — Blueback Herring', size:'3.3"', color:'Blueback Herring', pack:'7 Pack', retail:6.99, wholesale:4.99, image:'images/spotsticker/swimbait-33/_main.jpg' },
    { sku:'SS-PP-33S-ALB', desc:'Soft Swimbait 3.3" — Albino', size:'3.3"', color:'Albino', pack:'7 Pack', retail:6.99, wholesale:4.99, image:'images/spotsticker/swimbait-33/_main.jpg' },
    { sku:'SS-PP-33S-WMP', desc:'Soft Swimbait 3.3" — Watermelon Pearl', size:'3.3"', color:'Watermelon Pearl', pack:'7 Pack', retail:6.99, wholesale:4.99, image:'images/spotsticker/swimbait-33/_main.jpg' },
    { sku:'SS-PP-33S-CRS', desc:'Soft Swimbait 3.3" — Cripple Shad', size:'3.3"', color:'Cripple Shad', pack:'7 Pack', retail:6.99, wholesale:4.99, image:'images/spotsticker/swimbait-33/_main.jpg' },
    { sku:'SS-PP-33S-WHT', desc:'Soft Swimbait 3.3" — Pearl White', size:'3.3"', color:'Pearl White', pack:'7 Pack', retail:6.99, wholesale:4.99, image:'images/spotsticker/swimbait-33/_main.jpg' },
  ],

};

// ── SpotSticker categories metadata ───────────────────────────
const spotstickerCategories = [
  // Standard Jig Heads
  { key:'wide_gap',           label:'Wide Gap Jig Head',               group:'Standard Jig Heads' },
  { key:'long_shank',         label:'Long Shank Jig Head',             group:'Standard Jig Heads' },
  { key:'magnum',             label:'Magnum Jig Head',                 group:'Standard Jig Heads' },
  // Pro Series
  { key:'pro_ball',           label:'Pro Series Ball Head',            group:'Pro Series Jig Heads' },
  { key:'pro_football',       label:'Pro Series Football Head',        group:'Pro Series Jig Heads' },
  { key:'football_ewg',       label:'Football EWG Head',               group:'Pro Series Jig Heads' },
  { key:'screwball_shaky',    label:'Screwball Shaky Head',            group:'Pro Series Jig Heads' },
  { key:'crawler_heads',      label:'Crawler Head',                    group:'Pro Series Jig Heads' },
  // Dropshot
  { key:'dropshot_cylinder',  label:'Finesse Dropshot — Cylinder',     group:'Dropshot Weights' },
  { key:'dropshot_teardrop',  label:'Finesse Dropshot — Teardrop',     group:'Dropshot Weights' },
  // Hand-Tied Jigs
  { key:'casting_jigs',       label:'Hand-Tied Casting Jigs',          group:'Hand-Tied Jigs' },
  { key:'football_jigs',      label:'Hand-Tied Football Jigs',         group:'Hand-Tied Jigs' },
  // Specialty
  { key:'underspins',         label:'Underspins',                      group:'Specialty Heads' },
  { key:'football_swimbait',  label:'Football Swimbait Head',          group:'Specialty Heads' },
  { key:'screwlock_swimbait', label:'Screwlock Swimbait Head',         group:'Specialty Heads' },
  // Soft Plastics
  { key:'dropshot_worm_6',    label:'Drop-Shot Worm 6"',              group:'Soft Plastics' },
  { key:'dropshot_worm_45',   label:'Drop-Shot Worm 4.5"',            group:'Soft Plastics' },
  { key:'twin_tail_grub',     label:'5" Twin-Tail Grub',              group:'Soft Plastics' },
  { key:'finesse_stick',      label:'6" Finesse Stick',               group:'Soft Plastics' },
  { key:'swimbait_38',        label:'Soft Swimbait 3.8"',             group:'Soft Plastics' },
  { key:'swimbait_33',        label:'Soft Swimbait 3.3"',             group:'Soft Plastics' },
];

// ── SpotSticker render function ───────────────────────────────
function renderSpotstickerRows(cat, tbodyId) {
  const tbody = document.getElementById(tbodyId);
  spotstickerCatalog[cat].forEach(p => {
    const tr = document.createElement('tr');
    const imgCell = p.image
      ? `<img src="${p.image}" alt="${p.desc.replace(/"/g,'&quot;')}" class="product-thumb" loading="lazy">`
      : '<span class="product-thumb-placeholder">—</span>';
    tr.innerHTML = `
      <td style="text-align:center">
        <input class="qty-input" type="number" min="0" step="1"
          data-sku="${p.sku}" data-wholesale="${p.wholesale}"
          data-product="${p.desc.replace(/"/g, '&quot;')}"
          data-color="${p.color}" data-retail="${p.retail}"
          placeholder="0" autocomplete="off">
      </td>
      <td class="product-thumb-cell">${imgCell}</td>
      <td class="sku">${p.sku.replace('SS-','')}</td>
      <td class="bold">${p.desc}</td>
      <td style="color:var(--muted);font-size:12px">${p.pack}</td>
      <td class="right">$${p.wholesale.toFixed(2)}</td>
      <td class="right" style="color:var(--muted)">$${p.retail.toFixed(2)}</td>
      <td class="right"><span class="line-total" id="lt-${p.sku.replace(/[^a-zA-Z0-9]/g,'_')}">—</span></td>
    `;
    tbody.appendChild(tr);
  });
}

// ── Build all SpotSticker sections dynamically ────────────────
function renderAllSpotstickerSections() {
  const container = document.getElementById('spotsticker-sections');
  let lastGroup = '';
  spotstickerCategories.forEach(cat => {
    if (cat.group !== lastGroup) {
      lastGroup = cat.group;
      const groupLabel = document.createElement('div');
      groupLabel.className = 'section-label';
      groupLabel.textContent = cat.group;
      container.appendChild(groupLabel);
    }
    const tbodyId = 'ss-' + cat.key + '-rows';
    const skuCount = spotstickerCatalog[cat.key].length;
    const section = document.createElement('div');
    section.className = 'product-section';
    section.innerHTML = `
      <div class="category-header">
        <span class="category-name">${cat.label}</span>
        <span class="category-desc">${skuCount} SKUs</span>
      </div>
      <table><thead><tr>
        <th class="center">Qty</th><th class="center">Image</th><th>SKU</th><th>Description</th><th>Pack</th>
        <th class="right">Wholesale</th><th class="right">Retail</th>
        <th class="right">Line Total</th>
      </tr></thead><tbody id="${tbodyId}"></tbody></table>
    `;
    container.appendChild(section);
    renderSpotstickerRows(cat.key, tbodyId);
  });
}