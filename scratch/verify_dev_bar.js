const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-web-security']
  });

  const page = await browser.newPage();
  
  // 1. Desktop Test (1440 x 950)
  console.log('Testing Desktop 1440px footer...');
  await page.setViewport({ width: 1440, height: 950 });
  const fileUrl = 'file:///' + path.resolve('index.html').replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  // Scroll to footer
  await page.evaluate(() => {
    const bar = document.querySelector('.footer-developer-bar');
    if (bar) bar.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 600));

  const devBarEl = await page.$('.footer-developer-bar');
  if (devBarEl) {
    await devBarEl.screenshot({ path: 'scratch/footer_dev_bar_desktop.png' });
    console.log('Saved scratch/footer_dev_bar_desktop.png');
  } else {
    console.error('footer-developer-bar not found on Desktop!');
  }

  // Full footer view
  const footerEl = await page.$('footer.footer');
  if (footerEl) {
    await footerEl.screenshot({ path: 'scratch/footer_full_desktop.png' });
    console.log('Saved scratch/footer_full_desktop.png');
  }

  // 2. Mobile Test (390 x 844)
  console.log('Testing Mobile 390px footer...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  await page.evaluate(() => {
    const bar = document.querySelector('.footer-developer-bar');
    if (bar) bar.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 600));

  const devBarMobile = await page.$('.footer-developer-bar');
  if (devBarMobile) {
    await devBarMobile.screenshot({ path: 'scratch/footer_dev_bar_mobile.png' });
    console.log('Saved scratch/footer_dev_bar_mobile.png');
  }

  await browser.close();
  console.log('Verification finished successfully!');
})();
