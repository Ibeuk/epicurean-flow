const puppeteer = require('puppeteer-core');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const PORT = 8096;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let p = decodeURI(req.url.split('?')[0]);
  if (p === '/') p = '/cookbooks.html';
  const fp = path.join(ROOT_DIR, p);
  fs.stat(fp, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404');
      return;
    }
    const ext = path.extname(fp).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    fs.createReadStream(fp).pipe(res);
  });
});

server.listen(PORT, async () => {
  console.log(`Checkout Verification Server listening on port ${PORT}`);
  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: 'new',
      args: ['--no-sandbox']
    });

    const page = await browser.newPage();
    let redirectedUrl = null;

    page.on('console', msg => {
      console.log('[BROWSER]', msg.type(), msg.text());
    });
    page.on('pageerror', err => {
      console.error('[PAGE ERROR]', err);
    });
    page.on('dialog', async dialog => {
      console.log('[BROWSER DIALOG ALERT]:', dialog.message());
      await dialog.dismiss();
    });

    page.on('framenavigated', frame => {
      if (frame === page.mainFrame()) {
        const u = frame.url();
        if (!u.includes('localhost')) {
          redirectedUrl = u;
          console.log('\n>>> DETECTED EXTERNAL NAVIGATION:', u);
        }
      }
    });

    await page.goto(`http://localhost:${PORT}/cookbooks.html`, { waitUntil: 'domcontentloaded' });
    console.log('cookbooks.html loaded successfully');

    // Wait up to 5s for CartManager to initialize its wixClient
    await page.waitForFunction(() => window.cartManager && window.cartManager.wixClient, { timeout: 8000 }).catch(e => {
      console.log('wixClient still initializing...');
    });

    // Test adding the Flagship Holiday Bundle to cart
    console.log('Adding product to cart...');
    const addSuccess = await page.evaluate(() => {
      if (window.cartManager) {
        window.cartManager.addItem('holiday-collection');
        return true;
      }
      return false;
    });
    console.log('Product added to cart:', addSuccess);

    // Verify cart drawer is opened and has item
    await new Promise(r => setTimeout(r, 1000));
    const cartState = await page.evaluate(() => {
      const drawer = document.getElementById('cart-drawer');
      const items = document.querySelectorAll('.cart-item-row');
      const checkoutBtn = document.getElementById('btn-proceed-checkout');
      return {
        drawerOpen: drawer ? drawer.classList.contains('open') : false,
        itemCount: items.length,
        hasCheckoutBtn: !!checkoutBtn
      };
    });
    console.log('Cart drawer state:', cartState);

    // Click Proceed to Checkout
    console.log('Clicking Proceed to Checkout button...');
    await page.evaluate(() => {
      document.getElementById('btn-proceed-checkout').click();
    });

    // Wait up to 25s for Wix Checkout redirection session
    for (let i = 0; i < 50; i++) {
      await new Promise(r => setTimeout(r, 500));
      if (redirectedUrl) {
        break;
      }
    }

    console.log('\n=============================================');
    if (redirectedUrl && redirectedUrl.includes('/__ecom/checkout')) {
      console.log('CHECKOUT TEST: PASSED 100%!');
      console.log('Genuine Wix Checkout URL Generated:');
      console.log(redirectedUrl);
    } else if (redirectedUrl) {
      console.log('NAVIGATED TO:', redirectedUrl);
    } else {
      console.log('No external navigation occurred within 15 seconds.');
    }
    console.log('=============================================\n');

  } catch (err) {
    console.error('Checkout test error:', err);
  } finally {
    if (browser) await browser.close();
    server.close();
    process.exit(0);
  }
});
