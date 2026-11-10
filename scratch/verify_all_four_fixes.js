const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_DIR = path.resolve(__dirname, '..');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  console.log('1. Checking Courses Mobile...');
  await page.goto('file:///' + path.join(BASE_DIR, 'courses.html').replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // Find any visible article card in either live grid or static grid
  const cardHandle = await page.evaluateHandle(() => {
    const liveCards = Array.from(document.querySelectorAll('#courses-live-grid article'));
    if (liveCards.length > 0 && liveCards[0].offsetParent !== null) return liveCards[0];
    const staticCards = Array.from(document.querySelectorAll('#courses-static-grid article'));
    for (const c of staticCards) {
      if (c.offsetParent !== null) return c;
    }
    // If static grid was hidden, unhide it for inspection
    const sg = document.getElementById('courses-static-grid');
    if (sg) {
      sg.style.display = 'grid';
      return sg.querySelector('article');
    }
    return document.querySelector('article.catalog-card-editorial');
  });

  const card = cardHandle.asElement();
  if (card) {
    await card.screenshot({ path: 'scratch/verified_element_course_card.png' });
    console.log('Saved scratch/verified_element_course_card.png');
  }

  console.log('2. Checking Recipes Components...');
  await page.goto('file:///' + path.join(BASE_DIR, 'recipes.html').replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  const discSec = await page.$('#community-discussion');
  if (discSec) {
    await discSec.screenshot({ path: 'scratch/verified_element_recipe_discussion.png' });
    console.log('Saved scratch/verified_element_recipe_discussion.png');
  }

  const metaStrip = await page.$('.recipe-meta-strip');
  if (metaStrip) {
    await metaStrip.screenshot({ path: 'scratch/verified_element_recipe_meta.png' });
    console.log('Saved scratch/verified_element_recipe_meta.png');
  }

  await browser.close();
  console.log('All Done!');
})();
