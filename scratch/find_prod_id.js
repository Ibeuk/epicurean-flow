const https = require('https');

https.get('https://epicureanflow.wixsite.com/epicurean-flow/product-page/diabetes-cooking-course', res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    // Search for warmup data or product object
    const warmupMatch = d.match(/<script id="wix-warmup-data" type="application\/json">([\s\S]*?)<\/script>/i);
    if (warmupMatch) {
      console.log('Warmup data found! Length:', warmupMatch[1].length);
      try {
        const warmup = JSON.parse(warmupMatch[1]);
        const str = JSON.stringify(warmup);
        const matches = str.match(/"product":\{"id":"([^"]+)"/g) || str.match(/"productId":"([^"]+)"/g);
        console.log('Matches in warmup:', matches);
      } catch(e) {
        console.log('Parse err:', e.message);
      }
    } else {
      console.log('No warmup data tag');
    }
  });
});
