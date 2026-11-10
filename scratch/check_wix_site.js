const { execSync } = require('child_process');
const https = require('https');

const siteId = 'd599ebce-bf83-48e1-8bba-bb231269bd51';

try {
  const token = execSync(`npx @wix/cli token --site ${siteId}`, { encoding: 'utf-8' }).trim();
  console.log('Got site token, length:', token.length);

  function fetchApi(url, headers = {}) {
    return new Promise((resolve, reject) => {
      const u = new URL(url);
      const req = https.request({
        hostname: u.hostname,
        path: u.pathname + u.search,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'wix-site-id': siteId,
          'Content-Type': 'application/json',
          ...headers
        }
      }, (res) => {
        let body = '';
        res.on('data', d => body += d);
        res.on('end', () => {
          resolve({ status: res.statusCode, body });
        });
      });
      req.on('error', reject);
      req.end();
    });
  }

  async function check() {
    console.log('\n--- Checking Site Properties ---');
    const siteRes = await fetchApi(`https://www.wixapis.com/site-properties/v4/properties`);
    console.log('Site Properties Status:', siteRes.status);
    console.log('Site Properties:', siteRes.body);

    console.log('\n--- Checking Site Metadata ---');
    const metaRes = await fetchApi(`https://www.wixapis.com/sites/v1/sites/${siteId}`);
    console.log('Site Metadata Status:', metaRes.status);
    console.log('Site Metadata:', metaRes.body);

    console.log('\n--- Checking Reseller / Subscription ---');
    const subRes = await fetchApi(`https://www.wixapis.com/premium-reseller/v1/plans`);
    console.log('Sub Status:', subRes.status);
    console.log('Sub Body:', subRes.body);
  }

  check();
} catch (err) {
  console.error('Error:', err);
}
