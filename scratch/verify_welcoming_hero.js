const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  console.log('--- STARTING WELCOMING HERO VERIFICATION ---');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-web-security']
  });

  const page = await browser.newPage();
  
  // 1. Desktop Test (1440 x 950)
  console.log('Testing Desktop 1440px Welcoming Hero...');
  await page.setViewport({ width: 1440, height: 950 });
  const fileUrl = 'file:///' + path.resolve('index.html').replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1200));

  const heroEl = await page.$('#hero');
  if (heroEl) {
    await heroEl.screenshot({ path: 'scratch/welcoming_hero_desktop.png' });
    console.log('Saved scratch/welcoming_hero_desktop.png');
  }

  // 2. Mobile Test (390 x 844)
  console.log('Testing Mobile 390px Welcoming Hero...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1200));

  const mobileHeroEl = await page.$('#hero');
  if (mobileHeroEl) {
    await mobileHeroEl.screenshot({ path: 'scratch/welcoming_hero_mobile.png' });
    console.log('Saved scratch/welcoming_hero_mobile.png');
  }

  await browser.close();
  console.log('--- WELCOMING HERO VERIFICATION COMPLETE ---');
})();
