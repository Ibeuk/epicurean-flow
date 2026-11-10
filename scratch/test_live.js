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
  await page.goto('https://epicurean-flow-1-epicureanflow-100d.wix-site-host.com', { waitUntil: 'networkidle2', timeout: 30000 });
  
  // Test clicking cart button
  const cartBtn = await page.$('#nav-cart-btn') || await page.$('.nav-cart-btn') || await page.$('button[aria-label*="Cart"]');
  if (cartBtn) {
    await cartBtn.click();
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: 'scratch/wix_headless_cart.png' });
    console.log('Cart drawer screenshot saved!');
  }
  
  // Scroll down to cookbooks
  await page.evaluate(() => window.scrollBy(0, 1100));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'scratch/wix_headless_cookbooks.png' });
  console.log('Cookbooks screenshot saved!');

  // Scroll down to diabetes
  await page.evaluate(() => window.scrollBy(0, 1200));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'scratch/wix_headless_diabetes.png' });
  console.log('Diabetes spotlight screenshot saved!');
  
  await browser.close();
})();
