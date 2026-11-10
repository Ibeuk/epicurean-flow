const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1200 });

  const getUrl = (file) => 'file:///' + path.resolve(file).replace(/\\/g, '/');
  const makeVisible = async () => {
    await page.evaluate(() => {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        el.classList.add('is-visible');
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.visibility = 'visible';
      });
    });
  };

  // 1. Index Page - Curated Cookbooks
  console.log('Testing index.html...');
  await page.goto(getUrl('index.html'));
  await new Promise(r => setTimeout(r, 1200));
  await makeVisible();

  const curatedCookbooks = await page.$('#curated-cookbooks');
  if (curatedCookbooks) {
    await curatedCookbooks.screenshot({ path: 'scratch/index_curated_cookbooks_3col.png' });
    console.log('Saved scratch/index_curated_cookbooks_3col.png');
  }

  const interactiveCourses = await page.$('#interactive-courses');
  if (interactiveCourses) {
    await interactiveCourses.screenshot({ path: 'scratch/index_interactive_courses_3col.png' });
    console.log('Saved scratch/index_interactive_courses_3col.png');
  }

  // 2. Cookbooks Page - All Digital Cookbooks
  console.log('Testing cookbooks.html...');
  await page.goto(getUrl('cookbooks.html'));
  await new Promise(r => setTimeout(r, 1200));
  await makeVisible();

  const cookbooksSection = await page.evaluate(() => {
    const el = document.querySelector('#cookbooks-static-grid');
    return el ? el.closest('.container') !== null : false;
  });

  const staticGrid = await page.$('#cookbooks-static-grid');
  if (staticGrid) {
    await staticGrid.screenshot({ path: 'scratch/cookbooks_catalog_3col.png' });
    console.log('Saved scratch/cookbooks_catalog_3col.png');
  }

  // Capture full section on cookbooks.html
  const fullCookbooksSection = await page.evaluateHandle(() => {
    const heading = document.querySelector('.section-header.text-center');
    return heading ? heading.parentElement : document.querySelector('#cookbooks-static-grid');
  });
  if (fullCookbooksSection) {
    await fullCookbooksSection.screenshot({ path: 'scratch/cookbooks_full_section_3col.png' });
    console.log('Saved scratch/cookbooks_full_section_3col.png');
  }

  // 3. Seasonal Page
  console.log('Testing seasonal.html...');
  await page.goto(getUrl('seasonal.html'));
  await new Promise(r => setTimeout(r, 1200));
  await makeVisible();

  const seasonalTitles = await page.$('#individual-holiday-titles');
  if (seasonalTitles) {
    await seasonalTitles.screenshot({ path: 'scratch/seasonal_titles_3col.png' });
    console.log('Saved scratch/seasonal_titles_3col.png');
  }

  await browser.close();
  console.log('Visual audit completed successfully!');
})();
