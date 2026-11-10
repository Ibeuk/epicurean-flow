const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files']
  });

  const page = await browser.newPage();
  const distDir = path.resolve(__dirname, '..', 'dist');

  console.log('Testing dist files in:', distDir);

  // 1. Test about.html on Desktop
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`file://${path.join(distDir, 'about.html')}`, { waitUntil: 'load' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, 'verify_about_desktop.png') });
  console.log('Captured verify_about_desktop.png');

  // 1b. Test about.html on Mobile
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(`file://${path.join(distDir, 'about.html')}`, { waitUntil: 'load' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, 'verify_about_mobile.png') });
  console.log('Captured verify_about_mobile.png');

  // 2. Test index.html on Desktop (1440x900)
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`file://${path.join(distDir, 'index.html')}`, { waitUntil: 'load' });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(__dirname, 'verify_index_desktop.png') });
  console.log('Captured verify_index_desktop.png');

  // 2b. Test index.html on Tablet (768x1024)
  await page.setViewport({ width: 768, height: 1024, isMobile: true, hasTouch: true });
  await page.goto(`file://${path.join(distDir, 'index.html')}`, { waitUntil: 'load' });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(__dirname, 'verify_index_tablet.png') });
  console.log('Captured verify_index_tablet.png');

  // 2c. Test index.html on Mobile (390x844)
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(`file://${path.join(distDir, 'index.html')}`, { waitUntil: 'load' });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(__dirname, 'verify_index_mobile.png') });
  console.log('Captured verify_index_mobile.png');

  // 3. Test cookbooks.html on Desktop - Check image size
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`file://${path.join(distDir, 'cookbooks.html')}`, { waitUntil: 'load' });
  await new Promise(r => setTimeout(r, 800));
  const bookImgDims = await page.evaluate(() => {
    const img = document.querySelector('.catalog-card-editorial .catalog-card-img, .catalog-card-img');
    if (!img) return null;
    const rect = img.getBoundingClientRect();
    return { width: Math.round(rect.width), height: Math.round(rect.height) };
  });
  console.log('Desktop Cookbook Image Dimensions:', bookImgDims);
  await page.evaluate(() => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(__dirname, 'verify_cookbooks_desktop.png') });
  console.log('Captured verify_cookbooks_desktop.png');

  // 4. Test recipes.html on Mobile (390x844)
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(`file://${path.join(distDir, 'recipes.html')}`, { waitUntil: 'load' });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(__dirname, 'verify_recipes_mobile.png') });
  console.log('Captured verify_recipes_mobile.png');

  await browser.close();
  console.log('All verification screenshots captured successfully!');
})();
