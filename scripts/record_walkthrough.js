const puppeteer = require('puppeteer-core');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:8080';
const FPS = 20;

const DESKTOP_VIDEO = path.resolve(__dirname, '../Epicurean_Flow_Desktop_Walkthrough.mp4');
const MOBILE_VIDEO = path.resolve(__dirname, '../Epicurean_Flow_Mobile_Walkthrough.mp4');
const MASTER_VIDEO = path.resolve(__dirname, '../Epicurean_Flow_Full_Walkthrough.mp4');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Inject HUD and Animated Virtual Cursor
async function injectHUDAndCursor(page, isMobile = false) {
  await page.evaluate((isMobile) => {
    const oldHud = document.getElementById('ef-walkthrough-hud');
    if (oldHud) oldHud.remove();
    const oldCursor = document.getElementById('ef-virtual-cursor');
    if (oldCursor) oldCursor.remove();

    // 1. HUD Badge
    const hud = document.createElement('div');
    hud.id = 'ef-walkthrough-hud';
    hud.innerHTML = `
      <div id="hud-inner" style="
        position: fixed;
        top: ${isMobile ? '12px' : '22px'};
        left: 50%;
        transform: translateX(-50%);
        z-index: 99999999;
        background: rgba(18, 15, 12, 0.92);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(212, 175, 55, 0.55);
        box-shadow: 0 12px 35px rgba(0, 0, 0, 0.6), 0 0 20px rgba(212, 175, 55, 0.25);
        padding: ${isMobile ? '8px 16px' : '10px 28px'};
        border-radius: 999px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        pointer-events: none;
        max-width: 92vw;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      ">
        <span id="hud-title" style="
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: ${isMobile ? '15px' : '19px'};
          font-weight: 700;
          letter-spacing: 1.8px;
          color: #EBD6A0;
          text-transform: uppercase;
          line-height: 1.2;
        ">Epicurean Flow</span>
        <span id="hud-desc" style="
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: ${isMobile ? '11px' : '12.5px'};
          color: #FAF5EE;
          opacity: 0.92;
          letter-spacing: 0.5px;
          margin-top: 3px;
        ">Chef-Led Culinary Platform & Gastronomy</span>
      </div>
    `;
    document.body.appendChild(hud);

    // 2. Virtual Cursor
    const cursor = document.createElement('div');
    cursor.id = 'ef-virtual-cursor';
    cursor.innerHTML = '<div id="ef-cursor-ring"></div><div id="ef-cursor-dot"></div>';
    cursor.style = `
      position: fixed;
      top: 0px;
      left: 0px;
      width: 26px;
      height: 26px;
      pointer-events: none;
      z-index: 100000000;
      transform: translate(-50%, -50%);
      transition: opacity 0.2s ease;
      display: ${isMobile ? 'none' : 'block'};
    `;
    const styleTag = document.createElement('style');
    styleTag.textContent = `
      #ef-cursor-ring {
        position: absolute;
        inset: 0;
        border: 2px solid #D4AF37;
        background: rgba(212, 175, 55, 0.25);
        border-radius: 50%;
        box-shadow: 0 0 14px rgba(212, 175, 55, 0.8);
        transition: transform 0.15s ease, background 0.15s ease;
      }
      #ef-cursor-dot {
        position: absolute;
        top: 50%; left: 50%;
        width: 6px; height: 6px;
        background: #FFF;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 6px #FFF;
      }
      .ef-cursor-clicked #ef-cursor-ring {
        transform: scale(0.65);
        background: rgba(255, 255, 255, 0.85);
      }
    `;
    document.head.appendChild(styleTag);
    document.body.appendChild(cursor);

    window.__updateHUD = (title, desc) => {
      const t = document.getElementById('hud-title');
      const d = document.getElementById('hud-desc');
      if (t) t.textContent = title;
      if (d) d.textContent = desc;
    };

    window.__setCursor = (x, y, isClick = false) => {
      const c = document.getElementById('ef-virtual-cursor');
      if (!c) return;
      c.style.left = `${x}px`;
      c.style.top = `${y}px`;
      if (isClick) {
        c.classList.add('ef-cursor-clicked');
        setTimeout(() => c.classList.remove('ef-cursor-clicked'), 180);
      }
    };
  }, isMobile);
}

async function recordFrames(page, ffmpeg, count, stepFn = null) {
  for (let i = 0; i < count; i++) {
    if (stepFn) await stepFn(i, count);
    const buf = await page.screenshot({ type: 'jpeg', quality: 84 });
    ffmpeg.stdin.write(buf);
  }
}

async function smoothScroll(page, ffmpeg, totalY, durationFrames) {
  const step = totalY / durationFrames;
  await recordFrames(page, ffmpeg, durationFrames, async () => {
    await page.evaluate((s) => window.scrollBy(0, s), step);
  });
}

async function moveCursor(page, ffmpeg, startX, startY, endX, endY, frames, clickAtEnd = false) {
  for (let i = 0; i < frames; i++) {
    const t = i / (frames - 1 || 1);
    const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    const curX = startX + (endX - startX) * ease;
    const curY = startY + (endY - startY) * ease;
    await page.evaluate((x, y) => window.__setCursor(x, y), curX, curY);
    const buf = await page.screenshot({ type: 'jpeg', quality: 84 });
    ffmpeg.stdin.write(buf);
  }
  if (clickAtEnd) {
    await page.evaluate((x, y) => window.__setCursor(x, y, true), endX, endY);
    const buf = await page.screenshot({ type: 'jpeg', quality: 84 });
    ffmpeg.stdin.write(buf);
  }
}

// -----------------------------------------------------------------------------
// PART 1: RECORD DESKTOP WALKTHROUGH (1280 x 720)
// -----------------------------------------------------------------------------
async function recordDesktop() {
  console.log('\n[1/3] Generating Desktop Walkthrough Video (1280x720)...');

  const ffmpeg = spawn('ffmpeg', [
    '-y',
    '-f', 'image2pipe',
    '-vcodec', 'mjpeg',
    '-r', String(FPS),
    '-i', '-',
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-preset', 'fast',
    '-crf', '21',
    '-movflags', '+faststart',
    DESKTOP_VIDEO
  ]);

  ffmpeg.stderr.on('data', () => {});
  const closePromise = new Promise(resolve => ffmpeg.on('close', resolve));

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,720']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });

  // Scene 1: Homepage & Editorial Header
  console.log(' - Scene 1: Homepage & Luxury Header');
  await page.goto(`${BASE_URL}/index.html`, { waitUntil: 'networkidle0' });
  await injectHUDAndCursor(page, false);
  await page.evaluate(() => {
    window.__updateHUD('Epicurean Flow | Chef Eliane Muskus', 'Fine Dining Gastronomy, Cookbooks & Masterclasses');
    window.__setCursor(640, 360);
  });
  await recordFrames(page, ffmpeg, 25);

  // Move cursor across header navigation
  await page.evaluate(() => window.__updateHUD('Luxury Header & Sticky Navigation', 'Cormorant Garamond Typography & Warm Gold Accents'));
  await moveCursor(page, ffmpeg, 640, 360, 480, 40, 15);
  await moveCursor(page, ffmpeg, 480, 40, 780, 40, 15);
  await recordFrames(page, ffmpeg, 10);

  // Scroll down homepage
  await page.evaluate(() => window.__updateHUD('Chef Story & Culinary Ethos', 'Mediterranean & Middle Eastern Fine Dining'));
  await smoothScroll(page, ffmpeg, 700, 25);
  await recordFrames(page, ffmpeg, 15);

  await page.evaluate(() => window.__updateHUD('Featured Cookbooks & Academy Teasers', 'Digital Masterclasses, Recipe Guides & Experiences'));
  await smoothScroll(page, ffmpeg, 850, 30);
  await recordFrames(page, ffmpeg, 15);

  await smoothScroll(page, ffmpeg, 800, 25);
  await recordFrames(page, ffmpeg, 15);

  // Scene 2: Cookbooks Collection & Filtering
  console.log(' - Scene 2: Cookbooks Catalog & Collection');
  await page.goto(`${BASE_URL}/cookbooks.html`, { waitUntil: 'networkidle0' });
  await injectHUDAndCursor(page, false);
  await page.evaluate(() => {
    window.__updateHUD('Cookbooks Showcase & Culinary Guides', 'Complete Library: Digital & Hardcover Publications');
    window.__setCursor(640, 150);
  });
  await recordFrames(page, ffmpeg, 20);

  await smoothScroll(page, ffmpeg, 450, 20);
  await recordFrames(page, ffmpeg, 15);

  // Scene 3: Interactive Cart Drawer (STAR FEATURE)
  console.log(' - Scene 3: Interactive Cart Drawer & Subtotal Calculation');
  await page.evaluate(() => {
    window.__updateHUD('Interactive Cart Drawer (Wix Headless)', 'Instant Slide-Out Drawer Without Page Reload');
  });

  // Position of first Add to Cart button
  const btn1 = await page.evaluate(() => {
    const b = document.querySelector('.btn-add-to-cart');
    const rect = b.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  });

  await moveCursor(page, ffmpeg, 640, 300, btn1.x, btn1.y, 18, true);
  await page.evaluate(() => {
    const b = document.querySelector('.btn-add-to-cart');
    if (b) b.click();
  });
  await recordFrames(page, ffmpeg, 25);

  // Add a second cookbook to show multi-item subtotal recalculation
  await page.evaluate(() => {
    window.__updateHUD('Dynamic Cart Items & Live Subtotal', 'Instant multi-item calculation (€9.00 → €41.00)');
    // Add second book directly via CartManager
    if (window.cartManager) {
      window.cartManager.addItem('diabetes-recipe-book');
    }
  });
  await recordFrames(page, ffmpeg, 25);

  // Hover over Proceed to Checkout
  const checkoutBtn = await page.evaluate(() => {
    const b = document.getElementById('btn-proceed-checkout');
    const rect = b.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  });
  await page.evaluate(() => {
    window.__updateHUD('Direct Wix eCommerce Integration', 'One-click route to secure hosted checkout');
  });
  await moveCursor(page, ffmpeg, btn1.x, btn1.y, checkoutBtn.x, checkoutBtn.y, 16);
  await recordFrames(page, ffmpeg, 20);

  // Close Cart Drawer
  const closeBtn = await page.evaluate(() => {
    const b = document.getElementById('close-cart-btn');
    const rect = b.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  });
  await moveCursor(page, ffmpeg, checkoutBtn.x, checkoutBtn.y, closeBtn.x, closeBtn.y, 14, true);
  await page.evaluate(() => {
    const b = document.getElementById('close-cart-btn');
    if (b) b.click();
  });
  await recordFrames(page, ffmpeg, 15);

  // Scene 4: Courses & Masterclasses
  console.log(' - Scene 4: Courses & Masterclasses');
  await page.goto(`${BASE_URL}/courses.html`, { waitUntil: 'networkidle0' });
  await injectHUDAndCursor(page, false);
  await page.evaluate(() => {
    window.__updateHUD('Culinary Academy & Masterclasses', 'Beginners, Intermediate & Advanced Gastronomy Courses');
    window.__setCursor(640, 200);
  });
  await recordFrames(page, ffmpeg, 20);
  await smoothScroll(page, ffmpeg, 650, 25);
  await recordFrames(page, ffmpeg, 20);

  // Scene 5: Specialized Diabetes Nutrition Page
  console.log(' - Scene 5: Specialized Diabetes Page');
  await page.goto(`${BASE_URL}/diabetes.html`, { waitUntil: 'networkidle0' });
  await injectHUDAndCursor(page, false);
  await page.evaluate(() => {
    window.__updateHUD('Specialized Gastronomy: Diabetes Recipe Book', 'Flavor-First, Low-Carb Gourmet Cooking by Chef Eliane');
    window.__setCursor(640, 200);
  });
  await recordFrames(page, ffmpeg, 25);
  await smoothScroll(page, ffmpeg, 700, 25);
  await recordFrames(page, ffmpeg, 20);

  await page.evaluate(() => {
    window.__updateHUD('Blood Sugar Balance & Meal Planning', 'Clinical nutrition principles fused with restaurant-grade flavor');
  });
  await smoothScroll(page, ffmpeg, 750, 25);
  await recordFrames(page, ffmpeg, 20);

  // Scene 6: Recipes & Techniques
  console.log(' - Scene 6: Recipes & Food Philosophy');
  await page.goto(`${BASE_URL}/recipes.html`, { waitUntil: 'networkidle0' });
  await injectHUDAndCursor(page, false);
  await page.evaluate(() => {
    window.__updateHUD('Inspiring Culinary Recipes & Techniques', 'Categorized by dietary needs, seasonal produce & plating');
    window.__setCursor(640, 200);
  });
  await recordFrames(page, ffmpeg, 20);
  await smoothScroll(page, ffmpeg, 600, 25);
  await recordFrames(page, ffmpeg, 15);

  // Outro
  await page.evaluate(() => {
    window.__updateHUD('Epicurean Flow | Desktop Experience', 'Luxury Fine Dining Aesthetic • Fast Wix Headless Architecture');
  });
  await recordFrames(page, ffmpeg, 25);

  ffmpeg.stdin.end();
  await closePromise;
  await browser.close();
  console.log('✓ Desktop walkthrough completed:', DESKTOP_VIDEO);
}

// -----------------------------------------------------------------------------
// PART 2: RECORD MOBILE WALKTHROUGH (390 x 844)
// -----------------------------------------------------------------------------
async function recordMobile() {
  console.log('\n[2/3] Generating Mobile Responsive Walkthrough Video (390x844)...');

  const ffmpeg = spawn('ffmpeg', [
    '-y',
    '-f', 'image2pipe',
    '-vcodec', 'mjpeg',
    '-r', String(FPS),
    '-i', '-',
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-preset', 'fast',
    '-crf', '21',
    '-movflags', '+faststart',
    MOBILE_VIDEO
  ]);

  ffmpeg.stderr.on('data', () => {});
  const closePromise = new Promise(resolve => ffmpeg.on('close', resolve));

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=390,844']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });

  // Mobile Scene 1: Mobile Homepage
  console.log(' - Mobile Scene 1: Mobile Header & Hero');
  await page.goto(`${BASE_URL}/index.html`, { waitUntil: 'networkidle0' });
  await injectHUDAndCursor(page, true);
  await page.evaluate(() => {
    window.__updateHUD('100% Mobile Responsive', 'Optimized for iPhone, Android & Tablets');
  });
  await recordFrames(page, ffmpeg, 25);

  // Mobile Scene 2: Open Mobile Navigation Drawer
  console.log(' - Mobile Scene 2: Mobile Navigation Drawer');
  await page.evaluate(() => {
    window.__updateHUD('Slide-Out Navigation Drawer', 'Fast touch navigation across all categories');
    const burger = document.querySelector('.hamburger') || document.getElementById('mobile-menu-btn');
    if (burger) burger.click();
  });
  await recordFrames(page, ffmpeg, 35);

  // Close Mobile Drawer
  await page.evaluate(() => {
    const burger = document.querySelector('.hamburger') || document.getElementById('mobile-menu-btn');
    if (burger) burger.click();
  });
  await recordFrames(page, ffmpeg, 15);

  // Scroll down mobile homepage
  console.log(' - Mobile Scene 3: Mobile Flow & Cookbooks');
  await page.evaluate(() => {
    window.__updateHUD('Fluid Mobile Product Cards', 'Touch-friendly typography & quick add buttons');
  });
  await smoothScroll(page, ffmpeg, 650, 25);
  await recordFrames(page, ffmpeg, 20);

  // Open Mobile Cart Drawer
  console.log(' - Mobile Scene 4: Mobile Cart Drawer');
  await page.evaluate(() => {
    window.__updateHUD('Full-Width Mobile Cart Drawer', 'Persistent cart & frictionless Wix checkout');
    const cartBtn = document.getElementById('open-cart-btn') || document.querySelector('.cart-btn');
    if (cartBtn) cartBtn.click();
  });
  await recordFrames(page, ffmpeg, 35);

  // Close mobile cart
  await page.evaluate(() => {
    const closeBtn = document.getElementById('close-cart-btn');
    if (closeBtn) closeBtn.click();
  });
  await recordFrames(page, ffmpeg, 15);

  // Mobile Scene 5: Mobile Diabetes Page
  console.log(' - Mobile Scene 5: Mobile Specialty Page');
  await page.goto(`${BASE_URL}/diabetes.html`, { waitUntil: 'networkidle0' });
  await injectHUDAndCursor(page, true);
  await page.evaluate(() => {
    window.__updateHUD('Diabetes Living on Mobile', 'Responsive recipe previews & pre-order flow');
  });
  await recordFrames(page, ffmpeg, 20);
  await smoothScroll(page, ffmpeg, 600, 25);
  await recordFrames(page, ffmpeg, 20);

  // Mobile Outro
  await page.evaluate(() => {
    window.__updateHUD('Epicurean Flow | Mobile Ready', 'Flawless presentation on every screen size');
  });
  await recordFrames(page, ffmpeg, 25);

  ffmpeg.stdin.end();
  await closePromise;
  await browser.close();
  console.log('✓ Mobile walkthrough completed:', MOBILE_VIDEO);
}

// -----------------------------------------------------------------------------
// PART 3: CONCATENATE INTO MASTER VIDEO (1280 x 720)
// -----------------------------------------------------------------------------
async function concatenateVideos() {
  console.log('\n[3/3] Merging Desktop and Mobile into Master Walkthrough Video...');
  
  // Scale & pad mobile video to 1280x720 with luxury background #141210, then concat
  return new Promise((resolve, reject) => {
    const ffmpeg = spawn('ffmpeg', [
      '-y',
      '-i', DESKTOP_VIDEO,
      '-i', MOBILE_VIDEO,
      '-filter_complex',
      '[1:v]scale=-1:720,pad=1280:720:(1280-iw)/2:0:color=#141210[v1]; [0:v][v1]concat=n=2:v=1:a=0[outv]',
      '-map', '[outv]',
      '-c:v', 'libx264',
      '-pix_fmt', 'yuv420p',
      '-preset', 'fast',
      '-crf', '21',
      '-movflags', '+faststart',
      MASTER_VIDEO
    ]);

    ffmpeg.stderr.on('data', d => {});
    ffmpeg.on('close', code => {
      if (code === 0) {
        console.log('✓ Master Walkthrough Video successfully created at:', MASTER_VIDEO);
        resolve();
      } else {
        console.warn('Concat exited with code:', code, '- Falling back to individual videos.');
        resolve();
      }
    });
  });
}

(async () => {
  try {
    const startTime = Date.now();
    await recordDesktop();
    await recordMobile();
    await concatenateVideos();
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`\n🎉 All walkthrough videos rendered successfully in ${duration}s!`);
  } catch (err) {
    console.error('Recording error:', err);
    process.exit(1);
  }
})();
