const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // 1. Check index.html around where about section was
  const page1 = await browser.newPage();
  await page1.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  const indexUrl = 'file:///' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');
  await page1.goto(indexUrl, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  await page1.evaluate(() => {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
  });

  // Check if #about exists
  const aboutOnHome = await page1.$('#about');
  console.log('Exists #about on homepage?', !!aboutOnHome);

  // Take screenshot of home page promo banner & seasonal section transition
  const promo = await page1.$('#limited-offer');
  if (promo) {
    await promo.scrollIntoViewIfNeeded();
    await new Promise(r => setTimeout(r, 300));
    await page1.screenshot({ path: path.join(__dirname, 'home_post_removal_transition.png') });
    console.log('Saved home_post_removal_transition.png');
  }

  // 2. Check about.html
  const page2 = await browser.newPage();
  await page2.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  const aboutUrl = 'file:///' + path.resolve(__dirname, '../about.html').replace(/\\/g, '/');
  await page2.goto(aboutUrl, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  await page2.evaluate(() => {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
  });

  const aboutSec = await page2.$('#meet-chef-eliane');
  console.log('Exists #meet-chef-eliane on about.html?', !!aboutSec);
  if (aboutSec) {
    await aboutSec.scrollIntoViewIfNeeded();
    await new Promise(r => setTimeout(r, 300));
    await aboutSec.screenshot({ path: path.join(__dirname, 'about_page_chef_eliane_section.png') });
    console.log('Saved about_page_chef_eliane_section.png');
  }

  await browser.close();
  console.log('Verification script completed!');
})();
