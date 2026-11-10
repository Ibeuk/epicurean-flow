const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('file:///' + path.resolve('diabetes.html').replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2500));
  await page.evaluate(() => {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      el.classList.add('is-visible');
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.visibility = 'visible';
    });
  });
  await page.screenshot({ path: 'scratch/diabetes_full_page.png', fullPage: false });
  console.log('Saved scratch/diabetes_full_page.png');
  
  // Scroll to usps
  const el = await page.$('#diabetes-usps');
  if (el) {
    await page.evaluate(target => target.scrollIntoView(), el);
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: 'scratch/diabetes_usps_viewport.png' });
    console.log('Saved scratch/diabetes_usps_viewport.png');
  }

  // Scroll to spotlight
  const el2 = await page.$('#diabetes-friendly-kitchen');
  if (el2) {
    await page.evaluate(target => target.scrollIntoView(), el2);
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: 'scratch/diabetes_spotlight_viewport.png' });
    console.log('Saved scratch/diabetes_spotlight_viewport.png');
  }

  await browser.close();
})();
