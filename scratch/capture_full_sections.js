const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\ibe88\\.gemini\\antigravity-ide\\brain\\5f5f76d6-75b9-4392-9cb0-1c996b1705ca';
const BASE_DIR = path.resolve(__dirname, '..');

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  // Cookbooks Bundles & Amazon section
  await page.goto('file:///' + path.join(BASE_DIR, 'cookbooks.html').replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  const bundlesEl = await page.$('#bundle-showcase-section');
  if (bundlesEl) {
    await bundlesEl.screenshot({ path: path.join(ARTIFACT_DIR, 'cookbooks_bundles_spotlight.png') });
  }
  const physicalEl = await page.$('#physical-book-section');
  if (physicalEl) {
    await physicalEl.screenshot({ path: path.join(ARTIFACT_DIR, 'cookbooks_physical_amazon_spotlight.png') });
  }

  // Courses 6-Grid & Banner
  await page.goto('file:///' + path.join(BASE_DIR, 'courses.html').replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  const coursesSection = await page.$('#all-courses');
  if (coursesSection) {
    await coursesSection.screenshot({ path: path.join(ARTIFACT_DIR, 'courses_grid_and_banner_spotlight.png') });
  }

  // Seasonal Holiday Bundle
  await page.goto('file:///' + path.join(BASE_DIR, 'seasonal.html').replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  const seasonalBundle = await page.$('#holiday-bundle-showcase');
  if (seasonalBundle) {
    await seasonalBundle.screenshot({ path: path.join(ARTIFACT_DIR, 'seasonal_holiday_bundle_spotlight.png') });
  }

  await browser.close();
  console.log('Spotlight screenshots successfully captured!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
