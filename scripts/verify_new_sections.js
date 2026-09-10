const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const currentArtifactDir = 'C:\\Users\\ibe88\\.gemini\\antigravity-ide\\brain\\dfafeb50-ceed-4f26-9a18-111f6758d5ec';
const outDir = path.join(currentArtifactDir, 'screenshots');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const filePath = 'file:///' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');
  const bundlePath = 'file:///' + path.resolve(__dirname, '../wix-bundle.html').replace(/\\/g, '/');

  const testConfigs = [
    { name: 'desktop_index', url: filePath, width: 1440, height: 900 },
    { name: 'mobile_index', url: filePath, width: 390, height: 844 },
    { name: 'desktop_wix_bundle', url: bundlePath, width: 1440, height: 900 }
  ];

  for (const cfg of testConfigs) {
    const page = await browser.newPage();
    await page.setViewport({ width: cfg.width, height: cfg.height });
    await page.goto(cfg.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await new Promise(r => setTimeout(r, 800));

    // Force all reveal elements visible
    await page.evaluate(() => {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
    });
    await new Promise(r => setTimeout(r, 400));

    // Verify absence of dummy products
    const pageAudit = await page.evaluate(() => {
      const hasFeaturedSection = !!document.getElementById('featured-products');
      const hasVase = document.body.innerText.includes('Ceramic Flower Vase');
      const hasSweater = document.body.innerText.includes('Knitted Golf Sweater');
      const hasCoursesSec = !!document.getElementById('cooking-courses');
      const hasCookbooksSec = !!document.getElementById('cookbooks-collection');
      const docWidth = document.documentElement.clientWidth;
      const scrollWidth = document.body.scrollWidth;

      return {
        hasFeaturedSection,
        hasVase,
        hasSweater,
        hasCoursesSec,
        hasCookbooksSec,
        hasHorizontalOverflow: scrollWidth > docWidth,
        docWidth,
        scrollWidth
      };
    });

    console.log(`[${cfg.name}] Audit Results:`, pageAudit);

    // Capture targeted screenshot of the Courses & Cookbooks sections
    const coursesEl = await page.$('#cooking-courses');
    if (coursesEl) {
      await coursesEl.screenshot({ path: path.join(outDir, `${cfg.name}_courses.png`) });
    }
    const cookbooksEl = await page.$('#cookbooks-collection');
    if (cookbooksEl) {
      await cookbooksEl.screenshot({ path: path.join(outDir, `${cfg.name}_cookbooks.png`) });
    }

    // Capture combined view of courses and cookbooks together
    const combinedShot = await page.evaluate(() => {
      const courses = document.getElementById('cooking-courses');
      const cookbooks = document.getElementById('cookbooks-collection');
      if (!courses || !cookbooks) return null;
      const r1 = courses.getBoundingClientRect();
      const r2 = cookbooks.getBoundingClientRect();
      return {
        x: Math.min(r1.left, r2.left) + window.scrollX,
        y: Math.min(r1.top, r2.top) + window.scrollY,
        width: Math.max(r1.width, r2.width),
        height: (r2.bottom - r1.top)
      };
    });

    if (combinedShot) {
      await page.screenshot({
        path: path.join(outDir, `${cfg.name}_courses_and_cookbooks.png`),
        clip: combinedShot
      });
      console.log(`  Captured combined screenshot: ${cfg.name}_courses_and_cookbooks.png`);
    }

    await page.close();
  }

  await browser.close();
  console.log('Verification completed. All screenshots saved to:', outDir);
})();
