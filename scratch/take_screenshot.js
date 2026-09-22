const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto('file:///' + path.resolve('index.html').replace(/\\/g, '/'));
  await new Promise(r => setTimeout(r, 1000));
  
  const el = await page.$('#interactive-courses');
  if (el) {
    await el.screenshot({ path: 'scratch/interactive_courses_screenshot.png' });
    console.log('Saved scratch/interactive_courses_screenshot.png');
  }

  const card = await page.$('#interactive-courses .catalog-product-card:nth-child(2)');
  if (card) {
    await card.screenshot({ path: 'scratch/intermediate_card_screenshot.png' });
    console.log('Saved scratch/intermediate_card_screenshot.png');
  }

  await browser.close();
})();
