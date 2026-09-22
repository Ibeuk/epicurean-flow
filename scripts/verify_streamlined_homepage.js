const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });

  const fileUrl = 'file:///' + path.resolve('wix-bundle.html').replace(/\\/g, '/');
  console.log('Loading:', fileUrl);
  await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1200));

  // Wait for images to load
  await page.evaluate(async () => {
    const selectors = Array.from(document.querySelectorAll('img'));
    await Promise.all(selectors.map(img => {
      if (img.complete) return;
      return new Promise(resolve => {
        img.addEventListener('load', resolve);
        img.addEventListener('error', resolve);
      });
    }));
  });
  await new Promise(r => setTimeout(r, 400));

  // Force reveal elements visible
  await page.evaluate(() => {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
  });
  await new Promise(r => setTimeout(r, 300));

  // Screenshot Section 3 (Cookbooks) and Section 4 (Meet Chef Eliane)
  const aboutSec = await page.$('#about');
  if (aboutSec) {
    await aboutSec.screenshot({ path: 'homepage_about_streamlined.png' });
    console.log('Saved: homepage_about_streamlined.png');
  }

  const cookbooksSec = await page.$('#cookbooks-collection');
  if (cookbooksSec) {
    await cookbooksSec.screenshot({ path: 'homepage_cookbooks_streamlined.png' });
    console.log('Saved: homepage_cookbooks_streamlined.png');
  }

  await browser.close();
  console.log('Done screenshotting streamlined sections.');
})();
