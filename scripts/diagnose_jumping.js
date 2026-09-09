const puppeteer = require('puppeteer-core');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const PORT = 8092;

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(ROOT_DIR, reqPath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, async () => {
  console.log(`Diagnostic server listening on ${PORT}`);
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });

  for (const pageName of ['index.html', 'wix-bundle.html']) {
    console.log(`\n================ Testing ${pageName} ================`);
    for (const isMobile of [false, true]) {
      const mode = isMobile ? 'MOBILE (390x844)' : 'DESKTOP (1280x800)';
      console.log(`\n--- Device: ${mode} ---`);
      const page = await browser.newPage();
      if (isMobile) {
        await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
      } else {
        await page.setViewport({ width: 1280, height: 800 });
      }

      await page.goto(`http://localhost:${PORT}/${pageName}`, { waitUntil: 'networkidle0' });

      const report = await page.evaluate(async () => {
        const shifts = [];
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput && entry.value > 0.005) {
              shifts.push({
                value: entry.value,
                sources: entry.sources ? entry.sources.map(s => ({
                  nodeTag: s.node ? s.node.tagName : 'unknown',
                  nodeClass: s.node ? s.node.className : '',
                  currentRect: s.currentRect,
                  previousRect: s.previousRect
                })) : []
              });
            }
          }
        });
        observer.observe({ type: 'layout-shift', buffered: true });

        // Scroll test
        for (let i = 0; i < 25; i++) {
          window.scrollBy(0, 120);
          await new Promise(r => setTimeout(r, 60));
        }
        for (let i = 0; i < 25; i++) {
          window.scrollBy(0, -120);
          await new Promise(r => setTimeout(r, 60));
        }

        await new Promise(r => setTimeout(r, 400));
        return {
          totalShifts: shifts.length,
          cumulativeScore: shifts.reduce((a, b) => a + b.value, 0),
          shiftDetails: shifts.slice(0, 10)
        };
      });

      console.log(`Total Shifts: ${report.totalShifts}`);
      console.log(`Cumulative Score: ${report.cumulativeScore.toFixed(4)}`);
      if (report.shiftDetails.length > 0) {
        console.log('Sample Shift Details:');
        report.shiftDetails.forEach((s, idx) => {
          console.log(`  Shift #${idx + 1} (value: ${s.value.toFixed(4)}):`);
          s.sources.forEach(src => {
            console.log(`    Tag: ${src.nodeTag}, Class: "${src.nodeClass}"`);
            if (src.previousRect && src.currentRect) {
              console.log(`    Y moved from ${src.previousRect.y} to ${src.currentRect.y} (delta: ${src.currentRect.y - src.previousRect.y})`);
            }
          });
        });
      }

      await page.close();
    }
  }

  await browser.close();
  server.close();
  process.exit(0);
});
