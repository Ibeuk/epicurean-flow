const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });

  // 1. courses.html - hide header properly
  const coursesUrl = 'file:///' + path.resolve(__dirname, '../courses.html').replace(/\\/g, '/');
  await page.goto(coursesUrl, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  await page.evaluate(() => {
    const h = document.getElementById('main-header') || document.querySelector('.header');
    if (h) h.style.display = 'none';
  });
  await new Promise(r => setTimeout(r, 300));

  const diabetesCard = await page.$('#diabetes-cooking-course');
  if (diabetesCard) {
    await diabetesCard.screenshot({ path: path.join(__dirname, 'clean_mobile_diabetes_cooking_course.png') });
    console.log('Saved clean_mobile_diabetes_cooking_course.png without header overlap');
  }

  // 2. cookbooks.html - hide header properly
  const cookbooksUrl = 'file:///' + path.resolve(__dirname, '../cookbooks.html').replace(/\\/g, '/');
  await page.goto(cookbooksUrl, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  await page.evaluate(() => {
    const h = document.getElementById('main-header') || document.querySelector('.header');
    if (h) h.style.display = 'none';
  });
  await new Promise(r => setTimeout(r, 300));

  const symphonyCard = await page.$('#symphony-of-flavors');
  if (symphonyCard) {
    await symphonyCard.screenshot({ path: path.join(__dirname, 'clean_mobile_symphony_flavors.png') });
    console.log('Saved clean_mobile_symphony_flavors.png without header overlap');
  }

  await browser.close();
  console.log('Done clean screenshots without header overlap!');
})();
