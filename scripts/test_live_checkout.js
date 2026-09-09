const puppeteer = require('puppeteer-core');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const PORT = 8097;

const server = http.createServer((req, res) => {
  let p = decodeURI(req.url.split('?')[0]);
  if (p === '/') p = '/wix-bundle.html';
  const fp = path.join(ROOT_DIR, p);
  fs.readFile(fp, (err, d) => {
    if (err) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { 'Content-Type': p.endsWith('.html') ? 'text/html' : 'text/javascript' });
    res.end(d);
  });
});

server.listen(PORT, async () => {
  console.log(`Server listening on ${PORT}`);
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  let redirectedUrl = null;

  page.on('console', msg => console.log('[BROWSER]', msg.text()));

  page.on('framenavigated', frame => {
    if (frame === page.mainFrame()) {
      const u = frame.url();
      if (!u.includes('localhost')) {
        redirectedUrl = u;
        console.log('>>> REDIRECTED TO LIVE URL:', u);
      }
    }
  });

  await page.goto(`http://localhost:${PORT}/wix-bundle.html`, { waitUntil: 'networkidle2' });
  console.log('wix-bundle.html loaded');

  // Click buy button for Symphony of Flavors
  await page.click('.btn-buy-trigger[data-product-id="symphony-flavors"]');
  console.log('Clicked Buy Symphony of Flavors');
  await new Promise(r => setTimeout(r, 2000));

  // Click checkout
  console.log('Clicking proceed to checkout...');
  await page.click('#btn-proceed-checkout');

  // Wait up to 12s for checkout navigation
  for (let i = 0; i < 24; i++) {
    await new Promise(r => setTimeout(r, 500));
    if (redirectedUrl) {
      console.log('\n=============================================');
      console.log('SUCCESS! DESTINATION IS:');
      console.log(redirectedUrl);
      console.log('=============================================\n');
      break;
    }
  }

  await browser.close();
  server.close();
  process.exit(0);
});
