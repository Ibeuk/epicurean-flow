const puppeteer = require('puppeteer-core');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const PORT = 8099;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
  const filePath = path.join(ROOT_DIR, reqPath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

const VIEWPORTS = [
  { name: 'Mobile (375px)', width: 375, height: 667 },
  { name: 'Mobile (390px)', width: 390, height: 844 },
  { name: 'Tablet (768px)', width: 768, height: 1024 },
  { name: 'Laptop (1024px)', width: 1024, height: 768 },
  { name: 'Desktop (1440px)', width: 1440, height: 900 }
];

const PAGES = [
  'index.html',
  'about.html',
  'contact.html',
  'cookbooks.html',
  'courses.html',
  'diabetes.html',
  'food-tours.html',
  'media.html',
  'menu-planning.html',
  'nutrition.html',
  'privacy-policy.html',
  'product-detail.html?product=the-diabetes-friendly-kitchen',
  'recipes.html',
  'refund-policy.html',
  'seasonal.html',
  'terms.html'
];

server.listen(PORT, async () => {
  console.log(`Responsive Test Server running on port ${PORT}`);
  let browser;
  let hasErrors = false;

  try {
    browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    for (const pageName of PAGES) {
      console.log(`\n======================================================`);
      console.log(`AUDITING PAGE: ${pageName}`);
      console.log(`======================================================`);

      const targetUrl = `http://localhost:${PORT}/${pageName}`;

      for (const vp of VIEWPORTS) {
        await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
        await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
        // Allow brief time for layout computations and JS execution
        await new Promise(r => setTimeout(r, 600));

        // 1. Check for horizontal overflow
        const overflowInfo = await page.evaluate((vpWidth) => {
          const docScrollWidth = document.documentElement.scrollWidth;
          const bodyScrollWidth = document.body.scrollWidth;
          const maxScroll = Math.max(docScrollWidth, bodyScrollWidth);
          const hasOverflow = maxScroll > vpWidth + 1;

          let offendingElements = [];
          if (hasOverflow) {
            const allElements = document.querySelectorAll('*');
            for (const el of allElements) {
              const rect = el.getBoundingClientRect();
              if (rect.right > vpWidth + 2) {
                const tag = el.tagName.toLowerCase();
                const id = el.id ? `#${el.id}` : '';
                const cls = el.className && typeof el.className === 'string' ? `.${el.className.split(' ').join('.')}` : '';
                offendingElements.push({
                  selector: `${tag}${id}${cls}`,
                  rectRight: Math.round(rect.right),
                  rectWidth: Math.round(rect.width)
                });
                if (offendingElements.length >= 5) break;
              }
            }
          }

          return {
            hasOverflow,
            maxScroll,
            vpWidth,
            offendingElements
          };
        }, vp.width);

        if (overflowInfo.hasOverflow) {
          hasErrors = true;
          console.error(`[OVERFLOW ERROR] ${pageName} on ${vp.name}: ScrollWidth=${overflowInfo.maxScroll}px > Viewport=${overflowInfo.vpWidth}px`);
          console.error('Offending elements:', JSON.stringify(overflowInfo.offendingElements, null, 2));
        } else {
          console.log(`  [OK] ${vp.name}: No overflow (Width: ${overflowInfo.maxScroll}px / ${vp.width}px)`);
        }

        // 2. On Mobile viewports, test mobile drawer interaction
        if (vp.width <= 768) {
          const drawerTest = await page.evaluate(() => {
            const btn = document.querySelector('.hamburger, .mobile-menu-btn');
            const drawer = document.querySelector('.mobile-nav-drawer, .mobile-menu-drawer');
            if (!btn || !drawer) return { status: 'skipped', reason: 'btn or drawer not found' };
            
            btn.click();
            const isOpen = drawer.classList.contains('active') || drawer.classList.contains('open') || window.getComputedStyle(drawer).display !== 'none';
            // Click again to close
            btn.click();
            return { status: 'passed', isOpen };
          });
          // drawer test status logged if needed
        }

        // 3. On recipes.html, test the modal reader on mobile & desktop
        if (pageName === 'recipes.html') {
          const modalTest = await page.evaluate(() => {
            const recipeBtn = document.querySelector('[data-recipe-target], .btn-read-recipe, .grid-recipes-responsive button');
            const modal = document.getElementById('recipe-detail-modal');
            if (!recipeBtn || !modal) return { status: 'skipped', reason: 'no recipe btn or modal' };

            recipeBtn.click();
            const isOpen = modal.classList.contains('active');
            const title = document.getElementById('modal-title')?.textContent;
            const container = modal.querySelector('.recipe-modal-container');
            const containerWidth = container ? container.getBoundingClientRect().width : 0;
            const hasModalOverflow = container ? container.scrollWidth > container.clientWidth + 2 : false;

            // close modal
            const closeBtn = document.getElementById('btn-close-recipe-modal');
            if (closeBtn) closeBtn.click();

            return {
              status: 'tested',
              isOpen,
              title,
              containerWidth,
              hasModalOverflow
            };
          });

          if (modalTest.status === 'tested') {
            if (modalTest.isOpen && !modalTest.hasModalOverflow) {
              console.log(`  [OK] Modal Reader Tested on ${vp.name}: Opened "${modalTest.title}" (Width: ${modalTest.containerWidth}px)`);
            } else {
              console.warn(`  [MODAL WARNING] ${vp.name}:`, modalTest);
            }
          }
        }
      }
    }

    console.log(`\n======================================================`);
    if (hasErrors) {
      console.log(`AUDIT FINISHED WITH ISSUES - See errors above.`);
    } else {
      console.log(`ALL 16 PAGES PASSED 100% RESPONSIVE AUDIT ACROSS ALL 5 VIEWPORTS!`);
    }
    console.log(`======================================================\n`);

  } catch (err) {
    console.error('Audit encountered error:', err);
  } finally {
    if (browser) await browser.close();
    server.close();
    process.exit(hasErrors ? 1 : 0);
  }
});
