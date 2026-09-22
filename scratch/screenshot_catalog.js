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

  const fileUrl = 'file:///' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');
  console.log('Navigating to:', fileUrl);
  await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 800));

  await page.evaluate(() => {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
  });
  await new Promise(r => setTimeout(r, 500));

  // Courses
  const coursesSubpart = await page.$('#interactive-courses');
  if (coursesSubpart) {
    await coursesSubpart.screenshot({ path: path.join(__dirname, 'new_courses_catalog_desktop.png') });
    console.log('Saved scratch/new_courses_catalog_desktop.png');
  }

  // Cookbooks
  const cookbooksSubpart = await page.$('#curated-cookbooks');
  if (cookbooksSubpart) {
    await cookbooksSubpart.screenshot({ path: path.join(__dirname, 'new_cookbooks_catalog_desktop.png') });
    console.log('Saved scratch/new_cookbooks_catalog_desktop.png');
  }

  // Mobile
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await new Promise(r => setTimeout(r, 500));

  if (coursesSubpart) {
    await coursesSubpart.screenshot({ path: path.join(__dirname, 'new_courses_catalog_mobile.png') });
    console.log('Saved scratch/new_courses_catalog_mobile.png');
  }

  if (cookbooksSubpart) {
    await cookbooksSubpart.screenshot({ path: path.join(__dirname, 'new_cookbooks_catalog_mobile.png') });
    console.log('Saved scratch/new_cookbooks_catalog_mobile.png');
  }

  await browser.close();
  console.log('Done all screenshots!');
})();
