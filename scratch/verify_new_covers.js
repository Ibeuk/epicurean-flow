const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Test 1: courses.html on mobile (390px)
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  const coursesUrl = 'file:///' + path.resolve(__dirname, '../courses.html').replace(/\\/g, '/');
  await page.goto(coursesUrl, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  const diabetesCard = await page.$('#diabetes-cooking-course');
  if (diabetesCard) {
    await diabetesCard.screenshot({ path: path.join(__dirname, 'verified_mobile_diabetes_cooking_course.png') });
    console.log('Saved verified_mobile_diabetes_cooking_course.png');
  }

  // Test 2: cookbooks.html on mobile (390px)
  const cookbooksUrl = 'file:///' + path.resolve(__dirname, '../cookbooks.html').replace(/\\/g, '/');
  await page.goto(cookbooksUrl, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  const symphonyCard = await page.$('#symphony-of-flavors');
  if (symphonyCard) {
    await symphonyCard.screenshot({ path: path.join(__dirname, 'verified_mobile_symphony_flavors.png') });
    console.log('Saved verified_mobile_symphony_flavors.png');
  }

  // Test 3: index.html on mobile (390px)
  const indexUrl = 'file:///' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');
  await page.goto(indexUrl, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  const indexDiabetes = await page.$('#card-diabetes-cooking');
  if (indexDiabetes) {
    await indexDiabetes.screenshot({ path: path.join(__dirname, 'verified_mobile_index_diabetes.png') });
    console.log('Saved verified_mobile_index_diabetes.png');
  }

  const indexSymphony = await page.$('#card-symphony-flavors');
  if (indexSymphony) {
    await indexSymphony.screenshot({ path: path.join(__dirname, 'verified_mobile_index_symphony.png') });
    console.log('Saved verified_mobile_index_symphony.png');
  }

  await browser.close();
  console.log('Finished visual verification of both covers!');
})();
