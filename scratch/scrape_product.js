const https = require('https');

https.get('https://epicureanflow.wixsite.com/epicurean-flow/product-page/exclusive-holiday-cooking-bundle-master-the-art-of-festive-entertaining', res => {
  let html = '';
  res.on('data', d => html += d);
  res.on('end', () => {
    // Look for product json-ld or wix product data
    const jsonLdMatches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi) || [];
    jsonLdMatches.forEach(m => console.log('JSON-LD:', m));
    
    // Look for product id
    const prodIdMatch = html.match(/"productId":"([^"]+)"/i) || html.match(/"id":"([a-f0-9-]{36})"/i);
    console.log('Product ID match:', prodIdMatch ? prodIdMatch[0] : 'not found');
  });
}).on('error', console.error);
