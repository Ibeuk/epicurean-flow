const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Audit Index & Cart Flow
  console.log('Testing Index & Cart Flow...');
  await page.goto('file:///' + path.resolve('index.html').replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // Verify footer has no developer bar or unauthorized text
  const footerText = await page.evaluate(() => document.querySelector('footer').innerText);
  console.log('Footer contains "Developer"?', footerText.includes('Developer'));
  console.log('Footer contains "IBTEX"?', footerText.includes('IBTEX'));
  console.log('Footer contains "2348103883295"?', footerText.includes('2348103883295'));

  // Test adding an item to the cart
  await page.evaluate(() => {
    window.cartManager.addItem('stress-free-thanksgiving');
    window.cartManager.openDrawer();
  });
  await new Promise(r => setTimeout(r, 1000));

  const cartSubtotal = await page.evaluate(() => {
    const el = document.getElementById('cart-subtotal-val');
    return el ? el.innerText : 'NOT_FOUND';
  });
  console.log('Cart subtotal after adding Stress-Free Thanksgiving (€14.95):', cartSubtotal);

  await page.screenshot({ path: 'scratch/final_cart_drawer.png' });
  console.log('Saved scratch/final_cart_drawer.png');

  // 2. Audit Cookbooks Catalog Grid
  console.log('\nTesting Cookbooks Catalog...');
  await page.goto('file:///' + path.resolve('cookbooks.html').replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
  });

  const diabetesCard = await page.$('#the-diabetes-friendly-kitchen');
  if (diabetesCard) {
    await page.evaluate(el => el.scrollIntoView({ block: 'center' }), diabetesCard);
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: 'scratch/final_diabetes_card.png' });
    console.log('Saved scratch/final_diabetes_card.png');
  }

  const amazonSection = await page.$('#physical-book-section');
  if (amazonSection) {
    await page.evaluate(el => el.scrollIntoView({ block: 'center' }), amazonSection);
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: 'scratch/final_amazon_section.png' });
    console.log('Saved scratch/final_amazon_section.png');
  }

  // 3. Audit Recipes Blog Page
  console.log('\nTesting Recipes Blog Archive...');
  await page.goto('file:///' + path.resolve('recipes.html').replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'scratch/final_recipes_page.png' });
  console.log('Saved scratch/final_recipes_page.png');

  await browser.close();
  console.log('\n=== AUDIT COMPLETE ===');
})();
