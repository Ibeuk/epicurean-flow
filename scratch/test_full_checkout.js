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
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  console.log('Opening live site...');
  await page.goto('https://epicurean-flow-1-epicureanflow-100d.wix-site-host.com', { waitUntil: 'networkidle2', timeout: 30000 });

  console.log('Adding item to cart...');
  await page.evaluate(() => {
    window.cartManager.addItem({
      id: 'holiday-collection',
      title: 'Complete Holiday Table Collection',
      price: '€36.95',
      numericPrice: 36.95,
      wixId: 'c5d1456f-fbc3-c9c5-f0fe-520b3f1ef401'
    });
  });

  await new Promise(r => setTimeout(r, 1200));

  console.log('Clicking checkout button...');
  // Intercept navigation or wait for it
  const [navResponse] = await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 45000 }).catch(e => console.log('Nav wait note:', e.message)),
    page.click('#btn-proceed-checkout')
  ]);

  console.log('Current URL after checkout click:', page.url());
  console.log('Page Title:', await page.title());
  await page.screenshot({ path: 'scratch/checkout_success.png' });
  console.log('Saved scratch/checkout_success.png');

  await browser.close();
})();
