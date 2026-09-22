const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto('file:///' + path.resolve('index.html').replace(/\\/g, '/'));
  await new Promise(r => setTimeout(r, 1200));

  const coursesSection = await page.$('#interactive-courses');
  if (coursesSection) {
    await coursesSection.screenshot({ path: 'scratch/new_courses_section.png' });
    console.log('Saved scratch/new_courses_section.png');
  }

  const cookbooksSection = await page.$('#curated-cookbooks');
  if (cookbooksSection) {
    await cookbooksSection.screenshot({ path: 'scratch/new_cookbooks_section.png' });
    console.log('Saved scratch/new_cookbooks_section.png');
  }

  const secondCard = await page.$('#interactive-courses .catalog-product-card:nth-child(2)');
  if (secondCard) {
    await secondCard.screenshot({ path: 'scratch/new_intermediate_card.png' });
    console.log('Saved scratch/new_intermediate_card.png');
    
    await secondCard.hover();
    await new Promise(r => setTimeout(r, 400));
    await secondCard.screenshot({ path: 'scratch/new_intermediate_card_hover.png' });
    console.log('Saved scratch/new_intermediate_card_hover.png');
  }

  await browser.close();
})();
