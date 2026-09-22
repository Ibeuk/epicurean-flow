const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  const url = 'file:///' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  await page.evaluate(() => {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
  });
  await new Promise(r => setTimeout(r, 400));

  // 1. Capture the 5 courses grid
  const coursesGrid = await page.$('.product-cards-grid-5');
  if (coursesGrid) {
    await coursesGrid.screenshot({ path: path.join(__dirname, 'courses_grid_3col_desktop.png') });
    console.log('Saved courses_grid_3col_desktop.png');
  }

  // 2. Capture the testimonials slider initial state (Slide 1)
  const testimonials = await page.$('#testimonials');
  if (testimonials) {
    await testimonials.screenshot({ path: path.join(__dirname, 'testimonials_slide1_desktop.png') });
    console.log('Saved testimonials_slide1_desktop.png');
  }

  // 3. Click Next Arrow and capture Slide 2
  const nextBtn = await page.$('#testimonial-next-btn');
  if (nextBtn) {
    await nextBtn.click();
    await new Promise(r => setTimeout(r, 800)); // wait for transition
    if (testimonials) {
      await testimonials.screenshot({ path: path.join(__dirname, 'testimonials_slide2_desktop.png') });
      console.log('Saved testimonials_slide2_desktop.png');
    }
  }

  // 4. Mobile view for courses and testimonials
  await page.setViewport({ width: 390, height: 844 });
  await new Promise(r => setTimeout(r, 400));
  if (coursesGrid) {
    await coursesGrid.screenshot({ path: path.join(__dirname, 'courses_grid_mobile.png') });
    console.log('Saved courses_grid_mobile.png');
  }
  if (testimonials) {
    await testimonials.screenshot({ path: path.join(__dirname, 'testimonials_mobile.png') });
    console.log('Saved testimonials_mobile.png');
  }

  await browser.close();
  console.log('All verifications complete.');
})();
