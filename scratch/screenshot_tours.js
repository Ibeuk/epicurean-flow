const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1600 });
  const url = 'file:///' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  await page.evaluate(() => {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
  });
  await new Promise(r => setTimeout(r, 400));

  const foodTours = await page.$('#food-tours');
  if (foodTours) {
    await foodTours.screenshot({ path: path.join(__dirname, 'food_tours_full_desktop.png') });
    console.log('Saved food_tours_full_desktop.png');
  }

  // Also capture just the two city cards
  const cityCards = await page.$('#food-tours .grid-cards-responsive');
  if (cityCards) {
    await cityCards.screenshot({ path: path.join(__dirname, 'city_cards_desktop.png') });
    console.log('Saved city_cards_desktop.png');
  }

  await browser.close();
})();
