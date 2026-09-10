const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const viewports = [
  { name: 'desktop_1440', width: 1440, height: 900 },
  { name: 'laptop_1024', width: 1024, height: 768 },
  { name: 'tablet_768', width: 768, height: 1024 },
  { name: 'mobile_390', width: 390, height: 844 },
  { name: 'mobile_320', width: 320, height: 568 }
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const outDir = path.resolve('C:\\Users\\ibe88\\.gemini\\antigravity-ide\\brain\\587d3aae-9839-4657-9f17-5eda1b17f186\\scratch\\screenshots');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const filePath = 'file:///' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');

  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(filePath, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 400));

    // Ensure all reveal elements are visible for complete visual inspection
    await page.evaluate(() => {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
    });
    await new Promise(r => setTimeout(r, 400));

    // Measure any elements that cause horizontal overflow
    const overflowInfo = await page.evaluate(() => {
      const docWidth = document.documentElement.clientWidth;
      const elements = Array.from(document.querySelectorAll('*'));
      const overflowing = [];
      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.right > docWidth + 2) {
          overflowing.push({
            tag: el.tagName,
            class: el.className,
            id: el.id,
            right: Math.round(rect.right),
            docWidth
          });
        }
      }
      return {
        bodyScrollWidth: document.body.scrollWidth,
        docWidth,
        overflowing: overflowing.slice(0, 10)
      };
    });

    console.log(`[${vp.name}] Width: ${vp.width} - Body scrollWidth: ${overflowInfo.bodyScrollWidth}`);
    if (overflowInfo.overflowing.length > 0) {
      console.log(`  Overflowing elements:`, JSON.stringify(overflowInfo.overflowing));
    }

    const screenshotPath = path.join(outDir, `${vp.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`  Saved full screenshot to: ${screenshotPath}`);
    await page.close();
  }

  await browser.close();
  console.log('All viewports tested successfully.');
})();
