const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Set Mobile Viewport (iPhone 14)
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  console.log('--- 1. Testing Live Wix Headless URL on Mobile ---');
  try {
    await page.goto('https://epicurean-flow-1-epicureanflow-100d.wix-site-host.com', { waitUntil: 'networkidle0', timeout: 30000 });
    await page.evaluate(() => {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
    });
    await new Promise(r => setTimeout(r, 1000));

    // Check if Cannes is anywhere on the page
    const pageText = await page.evaluate(() => document.body.innerText);
    const hasCannes = /cannes provenance/i.test(pageText);
    console.log('Live Mobile Page contains "Cannes Provenance"?:', hasCannes);

    // Get hero image src
    const heroImgSrc = await page.evaluate(() => {
      const img = document.querySelector('.hero-square-img, .hero-fullwidth-img');
      return img ? img.src : 'NO_IMG';
    });
    console.log('Live Hero Image Src:', heroImgSrc);

    // Screenshot of Mobile Hero
    await page.screenshot({ path: 'scratch/live_mobile_hero.png' });
    console.log('Saved scratch/live_mobile_hero.png');

    // Scroll down to Explore Cookbooks & Courses
    await page.evaluate(() => {
      const el = document.getElementById('explore-collection');
      if (el) el.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: 'scratch/live_mobile_explore.png' });
    console.log('Saved scratch/live_mobile_explore.png');

  } catch (err) {
    console.warn('Note on live URL network fetch:', err.message);
  }

  // --- 2. Testing Cookbooks Page on Mobile ---
  console.log('\n--- 2. Testing Cookbooks Page on Mobile ---');
  await page.goto('https://epicurean-flow-1-epicureanflow-100d.wix-site-host.com/cookbooks.html', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.evaluate(() => {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
  });

  // Screenshot bundle cards
  await page.evaluate(() => {
    const el = document.getElementById('bundle-flavor-compromise');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'scratch/live_mobile_cookbooks_bundle.png' });
  console.log('Saved scratch/live_mobile_cookbooks_bundle.png');

  // Check bundle buttons
  const bundleBtnStatus = await page.evaluate(() => {
    const card = document.getElementById('bundle-flavor-compromise');
    if (!card) return 'NOT_FOUND';
    const btn = card.querySelector('button');
    return {
      text: btn ? btn.innerText.trim() : 'NO_BTN',
      disabled: btn ? btn.disabled : false,
      hasAddToCartClass: btn ? btn.classList.contains('btn-add-to-cart') : false
    };
  });
  console.log('Flavor Compromise Bundle button status:', bundleBtnStatus);

  // Check individual Diabetes-Friendly Kitchen card
  const diabetesCardStatus = await page.evaluate(() => {
    const card = document.getElementById('the-diabetes-friendly-kitchen');
    if (!card) return 'NOT_FOUND';
    const btns = Array.from(card.querySelectorAll('button, a')).map(b => ({
      tag: b.tagName,
      text: b.innerText.trim(),
      href: b.href || '',
      isAddToCart: b.classList.contains('btn-add-to-cart')
    }));
    return btns;
  });
  console.log('The Diabetes-Friendly Kitchen card buttons on cookbooks.html:', diabetesCardStatus);

  // Screenshot of first row of cookbooks
  await page.evaluate(() => {
    const el = document.getElementById('stress-free-thanksgiving');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'scratch/live_mobile_cookbooks_cards.png' });
  console.log('Saved scratch/live_mobile_cookbooks_cards.png');

  // --- 3. Testing Courses Page on Mobile ---
  console.log('\n--- 3. Testing Courses Page on Mobile ---');
  await page.goto('https://epicurean-flow-1-epicureanflow-100d.wix-site-host.com/courses.html', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.evaluate(() => {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
  });

  // Check Diabetes Cooking Course cover
  const courseCoverSrc = await page.evaluate(() => {
    const card = document.getElementById('diabetes-cooking-course');
    if (!card) return 'CARD_NOT_FOUND';
    const img = card.querySelector('img');
    return img ? img.src : 'NO_IMG';
  });
  console.log('Diabetes Cooking Course image src:', courseCoverSrc);

  await page.evaluate(() => {
    const el = document.getElementById('diabetes-cooking-course');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'scratch/live_mobile_course_cover.png' });
  console.log('Saved scratch/live_mobile_course_cover.png');

  // --- 4. Tablet Viewport (iPad: 768x1024) ---
  console.log('\n--- 4. Testing Tablet Viewport (768x1024) ---');
  await page.setViewport({ width: 768, height: 1024, isMobile: true, hasTouch: true });
  await page.goto('https://epicurean-flow-1-epicureanflow-100d.wix-site-host.com', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.evaluate(() => {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
  });
  await page.screenshot({ path: 'scratch/live_tablet_hero.png' });
  console.log('Saved scratch/live_tablet_hero.png');

  await browser.close();
  console.log('\n[SUCCESS] Mobile and Tablet live audits completed successfully!');
})();
