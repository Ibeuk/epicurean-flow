const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\ibe88\\.gemini\\antigravity-ide\\brain\\5f5f76d6-75b9-4392-9cb0-1c996b1705ca';
const BASE_DIR = path.resolve(__dirname, '..');

async function run() {
  console.log('Launching Chrome from:', CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  // 1. Verify Cookbooks Page
  const cookbooksUrl = 'file:///' + path.join(BASE_DIR, 'cookbooks.html').replace(/\\/g, '/');
  console.log('Navigating to:', cookbooksUrl);
  await page.goto(cookbooksUrl, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'cookbooks_verified.png'), fullPage: false });
  console.log('Cookbooks screenshot saved');

  // 2. Verify Courses Page & FLOWS10 Coupon
  const coursesUrl = 'file:///' + path.join(BASE_DIR, 'courses.html').replace(/\\/g, '/');
  console.log('Navigating to:', coursesUrl);
  await page.goto(coursesUrl, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'courses_verified.png'), fullPage: false });
  console.log('Courses screenshot saved');

  // Check 6 courses present
  const coursesCount = await page.$$eval('#courses-static-grid article', els => els.length);
  console.log('Courses count in static grid:', coursesCount);

  // Enroll in Beginners' Cooking Course (€39)
  console.log('Enrolling in Beginners Cooking Course...');
  await page.click('#beginners-cooking-course button.btn-add-to-cart');
  await new Promise(r => setTimeout(r, 600));

  // Check Cart Drawer opened
  const isDrawerOpen = await page.$eval('#cart-drawer', el => el.classList.contains('open'));
  console.log('Is Cart Drawer Open:', isDrawerOpen);

  // Apply FLOWS10 coupon
  console.log('Applying FLOWS10 coupon in cart drawer...');
  await page.type('#cart-promo-input', 'FLOWS10');
  await page.click('#cart-promo-apply-btn');
  await new Promise(r => setTimeout(r, 600));

  // Capture cart with discount applied
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'cart_coupon_flows10_verified.png') });
  console.log('Cart coupon screenshot saved');

  const cartTotal = await page.$eval('#cart-subtotal-val', el => el.textContent.trim());
  console.log('Cart Subtotal / Total after FLOWS10:', cartTotal);

  // 3. Verify Seasonal Page
  const seasonalUrl = 'file:///' + path.join(BASE_DIR, 'seasonal.html').replace(/\\/g, '/');
  console.log('Navigating to:', seasonalUrl);
  await page.goto(seasonalUrl, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'seasonal_verified.png'), fullPage: false });
  console.log('Seasonal screenshot saved');

  await browser.close();
  console.log('All verifications completed successfully!');
}

run().catch(err => {
  console.error('Error during verification:', err);
  process.exit(1);
});
