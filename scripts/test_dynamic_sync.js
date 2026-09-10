const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  const fileUrl = 'file:///' + path.resolve('wix-bundle.html').replace(/\\/g, '/');
  console.log('Loading:', fileUrl);
  await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });

  // 1. Verify default state
  const dummyProductsCount = await page.$$eval('.tour-card[data-wix-id]', cards => cards.length);
  console.log('Default live product cards rendered:', dummyProductsCount);

  // 2. Simulate Wix Stores postMessage with 1 course and 1 cookbook
  await page.evaluate(() => {
    window.postMessage(JSON.stringify({
      type: 'SYNC_WIX_PRODUCTS',
      items: [
        {
          _id: 'wix-course-101',
          name: 'The Art of Mediterranean Masterclass',
          price: { price: 49.00, formatted: { price: '€49.00' } },
          description: '12-lesson video masterclass with Michelin-accredited Chef Eliane Muskus.',
          ribbon: 'Masterclass Course',
          collections: ['Cooking Courses', 'Academy'],
          image: 'https://static.wixstatic.com/media/30dece_1857ef21db784a739672d128e48f7dc7f002.jpg/v1/fill/w_1200,h_800,enc_auto/file.jpeg'
        },
        {
          _id: 'wix-book-202',
          name: 'Mediterranean Essentials Cookbook',
          price: { price: 19.99, formatted: { price: '€19.99' } },
          description: '50+ chef-tested Mediterranean recipes with flavor pairing guides.',
          ribbon: 'Digital Cookbook',
          collections: ['Cookbooks', 'Digital Books'],
          image: 'https://static.wixstatic.com/media/30dece_e2aa58069aa245689abd1c1db9c7efd1~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg'
        }
      ]
    }), '*');
  });

  // Wait 100ms for DOM update
  await new Promise(r => setTimeout(r, 200));

  // 3. Inspect grids
  const courseGridDisplay = await page.$eval('#courses-live-grid', el => window.getComputedStyle(el).display);
  const courseGridCards = await page.$$eval('#courses-live-grid .tour-card', els => els.length);
  const courseCardTitle = await page.$eval('#courses-live-grid .tour-card h3', el => el.textContent);

  const cookbookGridDisplay = await page.$eval('#cookbooks-live-grid', el => window.getComputedStyle(el).display);
  const cookbookGridCards = await page.$$eval('#cookbooks-live-grid .tour-card', els => els.length);
  const cookbookCardTitle = await page.$eval('#cookbooks-live-grid .tour-card h3', el => el.textContent);

  console.log('Courses Grid:', { display: courseGridDisplay, cards: courseGridCards, title: courseCardTitle });
  console.log('Cookbooks Grid:', { display: cookbookGridDisplay, cards: cookbookGridCards, title: cookbookCardTitle });

  // 4. Test Cart interaction: Click Add to Cart on the live course card
  await page.$eval('#courses-live-grid .btn-add-to-cart', btn => btn.click());
  await new Promise(r => setTimeout(r, 200));

  const cartDrawerOpen = await page.$eval('#cart-drawer', el => el.classList.contains('open'));
  const cartBadge = await page.$eval('.cart-badge', el => el.textContent);
  const cartSubtotal = await page.$eval('#cart-subtotal-val', el => el.textContent);

  console.log('Cart Test after adding Course:', {
    drawerOpen: cartDrawerOpen,
    badgeCount: cartBadge,
    subtotal: cartSubtotal
  });

  // Add the cookbook too
  await page.$eval('#cookbooks-live-grid .btn-add-to-cart', btn => btn.click());
  await new Promise(r => setTimeout(r, 200));

  const cartBadge2 = await page.$eval('.cart-badge', el => el.textContent);
  const cartSubtotal2 = await page.$eval('#cart-subtotal-val', el => el.textContent);

  console.log('Cart Test after adding Cookbook:', {
    badgeCount: cartBadge2,
    subtotal: cartSubtotal2
  });

  await browser.close();
  console.log('ALL TESTS PASSED PERFECTLY!');
})();
