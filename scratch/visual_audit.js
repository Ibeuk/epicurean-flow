const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });

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

  // 1. Index Page
  console.log('Navigating to index.html...');
  await page.goto(getUrl('index.html'));
  await new Promise(r => setTimeout(r, 1000));
  await makeVisible();

  const exploreSection = await page.$('#explore-collection');
  if (exploreSection) {
    await exploreSection.screenshot({ path: 'scratch/index_explore_collection.png' });
    console.log('Saved scratch/index_explore_collection.png');
  }

  const whyChooseSection = await page.$('#why-choose');
  if (whyChooseSection) {
    await whyChooseSection.screenshot({ path: 'scratch/index_why_choose.png' });
    console.log('Saved scratch/index_why_choose.png');
  }

  const finalCtaSection = await page.$('#final-cta');
  if (finalCtaSection) {
    await finalCtaSection.screenshot({ path: 'scratch/index_final_cta.png' });
    console.log('Saved scratch/index_final_cta.png');
  }

  // 2. Courses Page
  console.log('Navigating to courses.html...');
  await page.goto(getUrl('courses.html'));
  await new Promise(r => setTimeout(r, 1000));
  await makeVisible();

  const coursesUsp = await page.$('#course-usps');
  if (coursesUsp) {
    await coursesUsp.screenshot({ path: 'scratch/courses_usps.png' });
    console.log('Saved scratch/courses_usps.png');
  }

  const coursesGrid = await page.$('.catalog-product-grid');
  if (coursesGrid) {
    await coursesGrid.screenshot({ path: 'scratch/courses_grid.png' });
    console.log('Saved scratch/courses_grid.png');
  }

  // 3. Cookbooks Page
  console.log('Navigating to cookbooks.html...');
  await page.goto(getUrl('cookbooks.html'));
  await new Promise(r => setTimeout(r, 1000));
  await makeVisible();

  const bundleGrid = await page.$('.bundle-offer-grid');
  if (bundleGrid) {
    await bundleGrid.screenshot({ path: 'scratch/cookbooks_bundles.png' });
    console.log('Saved scratch/cookbooks_bundles.png');
  }

  const cookbooksGrid = await page.$('#cookbooks-grid');
  if (cookbooksGrid) {
    await cookbooksGrid.screenshot({ path: 'scratch/cookbooks_grid.png' });
    console.log('Saved scratch/cookbooks_grid.png');
  }

  // 4. Diabetes Page
  console.log('Navigating to diabetes.html...');
  await page.goto(getUrl('diabetes.html'));
  await new Promise(r => setTimeout(r, 1000));
  await makeVisible();

  const diabetesUsp = await page.$('#diabetes-usp');
  if (diabetesUsp) {
    await diabetesUsp.screenshot({ path: 'scratch/diabetes_usps.png' });
    console.log('Saved scratch/diabetes_usps.png');
  }

  const diabetesSpotlight = await page.$('#diabetes-kitchen-spotlight');
  if (diabetesSpotlight) {
    await diabetesSpotlight.screenshot({ path: 'scratch/diabetes_spotlight.png' });
    console.log('Saved scratch/diabetes_spotlight.png');
  }

  const diabetesCourses = await page.$('#diabetes-courses');
  if (diabetesCourses) {
    await diabetesCourses.screenshot({ path: 'scratch/diabetes_courses.png' });
    console.log('Saved scratch/diabetes_courses.png');
  }

  await browser.close();
  console.log('All visual audit screenshots generated successfully!');
})();
