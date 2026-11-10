const https = require('https');

https.get('https://epicureanflow.wixsite.com/epicurean-flow', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const metaSiteMatch = data.match(/metaSiteId["':\s]+([a-f0-9-]+)/i) || data.match(/siteId["':\s]+([a-f0-9-]+)/i);
    console.log('Metasite match:', metaSiteMatch ? metaSiteMatch[1] : 'not found');
    const allMatches = data.match(/"metaSiteId":"([^"]+)"/g);
    console.log('All metaSiteId occurrences:', allMatches);
  });
}).on('error', err => console.error(err));
