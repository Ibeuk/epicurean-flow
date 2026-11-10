const puppeteer = require('puppeteer-core');
const fs = require('fs');

const paths = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
];
const execPath = paths.find(p => fs.existsSync(p));

(async () => {
  const browser = await puppeteer.launch({ executablePath: execPath, headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('BROWSER PAGE ERROR:', err.message));

  console.log('Navigating to live site...');
  await page.goto('https://epicurean-flow-1-epicureanflow-100d.wix-site-host.com', { waitUntil: 'networkidle2', timeout: 30000 });

  // Find an "Add to Cart" or "Buy" button on the page
  console.log('Finding product button...');
  const addBtn = await page.$('.btn-add-to-cart, button[data-action="add-to-cart"], .btn-gold[data-product-id], a[data-product-id], button[data-product-id]');
  if (addBtn) {
    console.log('Clicking add to cart button...');
    await addBtn.click();
  } else {
    // Try adding via JS CartManager
    console.log('Evaluating CartManager.addItem...');
    await page.evaluate(() => {
      if (window.cartManager) {
        window.cartManager.addItem({
          id: 'holiday-collection',
          title: 'Complete Holiday Table Collection',
          price: '€36.95',
          numericPrice: 36.95,
          wixId: 'c5d1456f-fbc3-c9c5-f0fe-520b3f1ef401'
        });
      }
    });
  }

  await new Promise(r => setTimeout(r, 1000));
  
  // Now click checkout button
  console.log('Clicking checkout button...');
  const checkoutBtn = await page.$('#btn-proceed-checkout');
  if (checkoutBtn) {
    await checkoutBtn.click();
  }
  
  // Wait to see what URL it navigates to
  console.log('Waiting for navigation or redirect...');
  await new Promise(r => setTimeout(r, 4000));
  console.log('Final page URL:', page.url());
  
  await browser.close();
})();
