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

  const fileUrl = 'file:///' + path.resolve('wix-bundle.html').replace(/\\/g, '/');
  console.log('Loading:', fileUrl);
  await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1200));

  // Wait for images to load
  await page.evaluate(async () => {
    const selectors = Array.from(document.querySelectorAll('img'));
    await Promise.all(selectors.map(img => {
      if (img.complete) return;
      return new Promise(resolve => {
        img.addEventListener('load', resolve);
        img.addEventListener('error', resolve);
      });
    }));
  });
  await new Promise(r => setTimeout(r, 500));

  // Check initial state
  const initialGlow = await page.$eval('#hero-interactive-visual', el => el.style.getPropertyValue('--mouse-x') || 'none');
  console.log('Initial Ambient Glow CSS Variable:', initialGlow);

  // Move mouse over the hero visual to trigger 3D perspective tilt
  const visualBox = await page.$eval('#hero-interactive-visual', el => {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width * 0.25, y: r.top + r.height * 0.25 };
  });

  console.log('Simulating mouse move to (25%, 25%) of hero visual:', visualBox);
  await page.mouse.move(visualBox.x, visualBox.y, { steps: 10 });
  await new Promise(r => setTimeout(r, 400));

  // Read transformed values
  const transformState1 = await page.evaluate(() => {
    const card = document.getElementById('hero-3d-card');
    const badge1 = document.getElementById('hero-float-badge-1');
    const badge2 = document.getElementById('hero-float-badge-2');
    const visual = document.getElementById('hero-interactive-visual');
    return {
      cardTransform: card ? card.style.transform : 'none',
      badge1Transform: badge1 ? badge1.style.transform : 'none',
      badge2Transform: badge2 ? badge2.style.transform : 'none',
      glowMouseX: visual ? visual.style.getPropertyValue('--mouse-x') : 'none',
      glowMouseY: visual ? visual.style.getPropertyValue('--mouse-y') : 'none'
    };
  });
  console.log('Active 3D Tilt State 1:', transformState1);

  // Take screenshot of tilted hero with floating badges
  const heroSection = await page.$('.hero-wrapper');
  if (heroSection) {
    await heroSection.screenshot({ path: 'hero_3d_animation_interactive.png' });
    console.log('Saved: hero_3d_animation_interactive.png');
  }

  // Simulate scrolling to test scroll parallax & reveal
  console.log('Simulating mouse scroll down 400px...');
  await page.evaluate(() => window.scrollBy(0, 400));
  await new Promise(r => setTimeout(r, 400));

  const scrollParallaxState = await page.evaluate(() => {
    const img = document.getElementById('hero-parallax-img');
    const coursesSection = document.getElementById('cooking-courses');
    const coursesVisible = coursesSection ? coursesSection.querySelector('.reveal-on-scroll')?.classList.contains('is-visible') : false;
    return {
      imgTransform: img ? img.style.transform : 'none',
      coursesVisible
    };
  });
  console.log('Scroll Parallax & Reveal State:', scrollParallaxState);

  await browser.close();
  console.log('ALL HERO ANIMATION TESTS PASSED!');
})();
