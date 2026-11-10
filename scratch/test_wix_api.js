const https = require('https');

// Test with wix-site-id header
const data = JSON.stringify({ query: { paging: { limit: 10 } } });

const req = https.request('https://www.wixapis.com/stores/v1/products/query', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'wix-client-id': 'd446c704-ea75-4680-affd-1633fca4bfb8',
    'wix-site-id': 'c4f86012-7e7b-4eda-8838-2ec67d3dbeb7',
    'Content-Length': data.length
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', body.slice(0, 500));
  });
});

req.on('error', console.error);
req.write(data);
req.end();
