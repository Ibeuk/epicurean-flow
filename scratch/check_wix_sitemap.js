const https = require('https');

https.get('https://epicureanflow.wixsite.com/epicurean-flow/sitemap.xml', (res) => {
  let xml = '';
  res.on('data', c => xml += c);
  res.on('end', () => {
    const locs = xml.match(/<loc>([^<]+)<\/loc>/g) || [];
    console.log('Total URLs in Wix sitemap:', locs.length);
    locs.forEach(l => {
      const url = l.replace(/<\/?loc>/g, '');
      if (url.includes('product-page') || url.includes('courses') || url.includes('cookbooks')) {
        console.log('Product URL:', url);
      }
    });
  });
}).on('error', err => console.error(err));
