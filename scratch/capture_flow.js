const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  const indexUrl = 'file:///' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');
  await page.goto(indexUrl, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  await page.evaluate(() => {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
  });

  const seasonal = await page.$('#seasonal');
  if (seasonal) {
    await seasonal.scrollIntoViewIfNeeded();
    await new Promise(r => setTimeout(r, 300));
    await page.screenshot({ path: path.join(__dirname, 'home_seasonal_flow.png') });
    console.log('Saved home_seasonal_flow.png');
  }

  await browser.close();
})();
