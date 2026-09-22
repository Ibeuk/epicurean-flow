const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const filePath = 'file:///' + path.resolve(__dirname, '../wix-bundle.html').replace(/\\/g, '/');
  console.log('Loading:', filePath);
  await page.goto(filePath, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1000));

  // Check social links
  const socialData = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('.footer-social-links .social-btn'));
    return btns.map(b => ({
      className: b.className,
      href: b.href,
      target: b.target,
      rel: b.rel,
      ariaLabel: b.getAttribute('aria-label'),
      bgColor: window.getComputedStyle(b).backgroundColor,
      bgImage: window.getComputedStyle(b).backgroundImage,
      width: window.getComputedStyle(b).width,
      height: window.getComputedStyle(b).height,
      borderRadius: window.getComputedStyle(b).borderRadius
    }));
  });

  console.log('Social buttons found:', JSON.stringify(socialData, null, 2));

  // Take screenshot of the footer
  const footerElement = await page.$('.footer');
  if (footerElement) {
    const screenshotPath = path.resolve(__dirname, '../footer_social_verification.png');
    await footerElement.screenshot({ path: screenshotPath });
    console.log('Screenshot saved to:', screenshotPath);
  }

  await browser.close();
})();
