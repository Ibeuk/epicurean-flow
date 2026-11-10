const https = require('https');

const urls = [
  'exclusive-holiday-cooking-bundle-master-the-art-of-festive-entertaining',
  'diabetes-cooking-course-masterclass-1',
  'download-your-free-mediterranean-recipe-ebook-6-delicious-recipes-2-bonus-di',
  'epicurean-flow-meal-planner-by-eliane-muskus',
  'the-ultimate-macronutrient-guide',
  'download-your-free-diabetes-friendly-mediterranean-bowls-of-flavor',
  'let-s-eat',
  'christmas-recipe-collection-cookbook',
  'a-symphony-of-flavors-mediterranean-middle-eastern-spice-essentials-elevate',
  'seasonal-recipe-cookbook',
  'chef-eliane-s-new-diabetes-recipe-book',
  'diabetes-cooking-course'
];

async function fetchOne(slug) {
  return new Promise((resolve) => {
    const fullUrl = `https://epicureanflow.wixsite.com/epicurean-flow/product-page/${slug}`;
    https.get(fullUrl, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const jsonMatch = data.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
        let name = '', price = '', currency = '', prodId = '';
        if (jsonMatch) {
          try {
            const parsed = JSON.parse(jsonMatch[1]);
            name = parsed.name || '';
            price = parsed.offers?.price || '';
            currency = parsed.offers?.priceCurrency || '';
          } catch(e){}
        }
        const idMatch = data.match(/"productId":"([^"]+)"/i) || data.match(/"id":"([a-f0-9-]{36})"/i);
        if (idMatch) prodId = idMatch[1];
        resolve({ slug, name, price, currency, prodId, fullUrl });
      });
    }).on('error', () => resolve({ slug, error: true }));
  });
}

async function run() {
  const results = [];
  for (const slug of urls) {
    const r = await fetchOne(slug);
    results.push(r);
    console.log(`[${r.price || 'Free'} ${r.currency}] ${r.name} -> ID: ${r.prodId}`);
  }
  const fs = require('fs');
  fs.writeFileSync('scratch/wix_products_scraped.json', JSON.stringify(results, null, 2));
}

run();
