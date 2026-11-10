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

  const cookbooksUrl = 'file:///' + path.resolve(__dirname, '../cookbooks.html').replace(/\\/g, '/');
  await page.goto(cookbooksUrl, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 800));

  await page.evaluate(() => {
    const h = document.getElementById('main-header') || document.querySelector('.header');
    if (h) h.style.display = 'none';
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
    const card = document.getElementById('symphony-of-flavors');
    if (card) {
      card.scrollIntoView({ block: 'center' });
      card.classList.add('is-visible');
    }
  });
  await new Promise(r => setTimeout(r, 600));

  const symphonyCard = await page.$('#symphony-of-flavors');
  if (symphonyCard) {
    await symphonyCard.screenshot({ path: path.join(__dirname, 'clean_mobile_symphony_flavors.png') });
    console.log('Saved clean_mobile_symphony_flavors.png successfully!');
  } else {
    console.log('Could not find #symphony-of-flavors');
  }

  await browser.close();
})();
