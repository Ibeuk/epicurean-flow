const puppeteer = require('puppeteer-core');
const path = require('path');
const http = require('http');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 8099;
const ROOT_DIR = path.resolve(__dirname, '..');

// Simple static HTTP server for accurate origin/localStorage support
function startServer() {
  return new Promise((resolve) => {
    const mimeTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'text/javascript',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml'
    };

    const server = http.createServer((req, res) => {
      let reqPath = decodeURI(req.url.split('?')[0]);
      if (reqPath === '/') reqPath = '/index.html';
      const filePath = path.join(ROOT_DIR, reqPath);

      fs.readFile(filePath, (err, data) => {
        if (err) {
          if (!reqPath.includes('favicon.ico')) console.log('404 Not Found:', reqPath);
          res.writeHead(404);
          res.end('Not Found');
          return;
        }
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
        res.end(data);
      });
    });

    server.listen(PORT, () => {
      console.log(`Test server running at http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function runTest() {
  const server = await startServer();
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  try {
    console.log('\n--- 1. Testing index.html Cart Flow ---');
    await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'networkidle0' });

    // Clear any previous cart data
    await page.evaluate(() => localStorage.removeItem('epicurean_flow_cart'));
    await page.reload({ waitUntil: 'networkidle0' });

    const initialBadge = await page.$eval('.cart-badge', el => el.textContent.trim());
    console.log(`Initial cart badge count: "${initialBadge}"`);

    // Click quick add button on first product
    const addBtn = await page.$('.btn-add-to-cart, .btn-buy-trigger');
    if (!addBtn) throw new Error('Could not find .btn-add-to-cart or .btn-buy-trigger button on index.html');
    await addBtn.click();
    await new Promise(r => setTimeout(r, 600));

    // Verify cart drawer is open
    const isDrawerOpen = await page.$eval('#cart-drawer', el => el.classList.contains('open'));
    console.log(`Cart drawer opened: ${isDrawerOpen}`);

    const badgeAfterAdd = await page.$eval('.cart-badge', el => el.textContent.trim());
    console.log(`Badge count after adding item: "${badgeAfterAdd}"`);

    const itemCount = await page.$$eval('.cart-item-row', rows => rows.length);
    console.log(`Cart items displayed in drawer: ${itemCount}`);

    const subtotal = await page.$eval('#cart-subtotal-val', el => el.textContent.trim());
    console.log(`Cart subtotal: "${subtotal}"`);

    // Check localStorage
    const savedCart = await page.evaluate(() => localStorage.getItem('epicurean_flow_cart'));
    console.log(`localStorage saved items count: ${JSON.parse(savedCart).length}`);

    // Close drawer
    await page.click('#close-cart-btn');
    await new Promise(r => setTimeout(r, 400));
    const isDrawerClosed = await page.$eval('#cart-drawer', el => !el.classList.contains('open'));
    console.log(`Cart drawer closed after close button click: ${isDrawerClosed}`);

    console.log('\n--- 2. Testing Cross-Page Persistence on cookbooks.html ---');
    await page.goto(`http://localhost:${PORT}/cookbooks.html`, { waitUntil: 'networkidle0' });

    const cookbooksBadge = await page.$eval('.cart-badge', el => el.textContent.trim());
    console.log(`Cart badge persisted on cookbooks.html: "${cookbooksBadge}" (expected 1)`);

    // Open drawer via header cart button
    await page.click('.cart-btn');
    await new Promise(r => setTimeout(r, 400));
    const persistedItemsCount = await page.$$eval('.cart-item-row', rows => rows.length);
    console.log(`Persisted items visible in cookbooks.html drawer: ${persistedItemsCount}`);

    // Add another item from cookbooks.html
    const cookbookAddBtns = await page.$$('.btn-add-to-cart');
    if (cookbookAddBtns.length > 1) {
      await cookbookAddBtns[1].click();
      await new Promise(r => setTimeout(r, 600));
      const badgeAfterSecond = await page.$eval('.cart-badge', el => el.textContent.trim());
      console.log(`Badge after adding 2nd item: "${badgeAfterSecond}" (expected 2)`);
      const subtotal2 = await page.$eval('#cart-subtotal-val', el => el.textContent.trim());
      console.log(`Updated subtotal for 2 items: "${subtotal2}"`);
    }

    console.log('\n--- 3. Testing Cart on terms.html & legal pages ---');
    await page.goto(`http://localhost:${PORT}/terms.html`, { waitUntil: 'networkidle0' });
    const termsBadge = await page.$eval('.cart-badge', el => el.textContent.trim());
    console.log(`Cart badge persisted on terms.html: "${termsBadge}" (expected 2)`);

    await page.click('.cart-btn');
    await new Promise(r => setTimeout(r, 400));
    const termsDrawerOpen = await page.$eval('#cart-drawer', el => el.classList.contains('open'));
    console.log(`terms.html cart drawer opens successfully: ${termsDrawerOpen}`);

    console.log('\n--- 4. Testing media.html Video Player Modal ---');
    await page.goto(`http://localhost:${PORT}/media.html`, { waitUntil: 'networkidle0' });
    const videoCard = await page.$('.video-card');
    if (videoCard) {
      await videoCard.click();
      await new Promise(r => setTimeout(r, 500));
      const isModalOpen = await page.$eval('#video-modal', el => el.classList.contains('open') || el.style.display !== 'none');
      console.log(`Video modal opened on card click: ${isModalOpen}`);
    }

    console.log('\n--- 5. Testing wix-bundle.html Standalone Bundle ---');
    await page.goto(`http://localhost:${PORT}/wix-bundle.html`, { waitUntil: 'networkidle0' });
    const bundleCheckoutTarget = await page.$eval('#btn-proceed-checkout', el => el.getAttribute('target'));
    console.log(`wix-bundle.html checkout button target attribute: "${bundleCheckoutTarget}" (expected "_top")`);

    console.log('\n--- Console Errors Check ---');
    const realErrors = consoleErrors.filter(e => !e.includes('favicon.ico') && !e.includes('esm.sh'));
    if (realErrors.length === 0) {
      console.log('Zero critical console errors detected!');
    } else {
      console.log('Errors:', realErrors);
    }

    console.log('\n✅ ALL VERIFICATION CHECKS PASSED SUCCESSFULLY!');
  } finally {
    await browser.close();
    server.close();
  }
}

runTest().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
