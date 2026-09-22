const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // 1. COURSES.HTML (DESKTOP)
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  const coursesUrl = 'file:///' + path.resolve(__dirname, '../courses.html').replace(/\\/g, '/');
  console.log('Navigating to:', coursesUrl);
  await page.goto(coursesUrl, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  await page.evaluate(() => {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
    const hdr = document.querySelector('header, .header');
    if (hdr) hdr.style.position = 'static';
  });
  await new Promise(r => setTimeout(r, 400));

  const coursesCatalogSection = await page.$('#all-courses');
  if (coursesCatalogSection) {
    await coursesCatalogSection.screenshot({ path: path.join(__dirname, 'courses_page_catalog_desktop.png') });
    console.log('Saved scratch/courses_page_catalog_desktop.png');
  }

  // 1b. COURSES.HTML (MOBILE)
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await new Promise(r => setTimeout(r, 400));
  if (coursesCatalogSection) {
    await coursesCatalogSection.screenshot({ path: path.join(__dirname, 'courses_page_catalog_mobile.png') });
    console.log('Saved scratch/courses_page_catalog_mobile.png');
  }

  // 2. COOKBOOKS.HTML (DESKTOP)
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  const cookbooksUrl = 'file:///' + path.resolve(__dirname, '../cookbooks.html').replace(/\\/g, '/');
  console.log('Navigating to:', cookbooksUrl);
  await page.goto(cookbooksUrl, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  await page.evaluate(() => {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
    const hdr = document.querySelector('header, .header');
    if (hdr) hdr.style.position = 'static';
  });
  await new Promise(r => setTimeout(r, 400));

  const cookbooksCatalogSection = await page.$('#catalog');
  if (cookbooksCatalogSection) {
    await cookbooksCatalogSection.screenshot({ path: path.join(__dirname, 'cookbooks_page_catalog_desktop.png') });
    console.log('Saved scratch/cookbooks_page_catalog_desktop.png');
  }

  // 2b. COOKBOOKS.HTML (MOBILE)
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await new Promise(r => setTimeout(r, 400));
  if (cookbooksCatalogSection) {
    await cookbooksCatalogSection.screenshot({ path: path.join(__dirname, 'cookbooks_page_catalog_mobile.png') });
    console.log('Saved scratch/cookbooks_page_catalog_mobile.png');
  }

  // 3. PRODUCT-DETAIL.HTML?id=beginners-baking
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  const detailUrl1 = 'file:///' + path.resolve(__dirname, '../product-detail.html').replace(/\\/g, '/') + '?id=beginners-baking';
  console.log('Navigating to:', detailUrl1);
  await page.goto(detailUrl1, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, 'detail_beginners_baking_desktop.png'), clip: { x: 0, y: 0, width: 1440, height: 1100 } });
  console.log('Saved scratch/detail_beginners_baking_desktop.png');

  // 4. PRODUCT-DETAIL.HTML?id=lets-eat-mediterranean
  const detailUrl2 = 'file:///' + path.resolve(__dirname, '../product-detail.html').replace(/\\/g, '/') + '?id=lets-eat-mediterranean';
  console.log('Navigating to:', detailUrl2);
  await page.goto(detailUrl2, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, 'detail_lets_eat_desktop.png'), clip: { x: 0, y: 0, width: 1440, height: 1100 } });
  console.log('Saved scratch/detail_lets_eat_desktop.png');

  await browser.close();
  console.log('ALL INDIVIDUAL PAGE SCREENSHOTS GENERATED SUCCESSFULLY!');
})();
