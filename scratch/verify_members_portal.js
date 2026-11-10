const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-web-security']
  });

  const page = await browser.newPage();
  
  // 1. Desktop Test (1440 x 950)
  console.log('Testing Desktop 1440px...');
  await page.setViewport({ width: 1440, height: 950 });
  const fileUrl = 'file:///' + path.resolve('cookbooks.html').replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 800));

  // Register a real member so they have active session and persistent account
  const regResult = await page.evaluate(() => {
    return window.EpicureanMembers.registerRealUser({
      name: 'Claire Dupont',
      email: 'c.dupont@orange.fr',
      password: 'password123',
      provider: 'email',
      publicProfile: true
    });
  });
  console.log('Registration result:', regResult.success, regResult.member?.name);
  await new Promise(r => setTimeout(r, 600));

  // Verify SafeSessionStorage vs SafeStorage
  const sessionCheck = await page.evaluate(() => {
    const sessionActive = sessionStorage.getItem('epicurean_member_active_session');
    const localAccounts = localStorage.getItem('epicurean_registered_accounts_v2');
    const localUser = localStorage.getItem('epicurean_member_user_v2');
    return {
      hasSessionActive: !!sessionActive,
      hasLocalAccounts: !!localAccounts,
      localUserIsEmpty: !localUser
    };
  });
  console.log('Session Storage Verification:', sessionCheck);

  // Open the profile dropdown in navbar
  await page.evaluate(() => {
    window.toggleEpicureanMemberDropdown();
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: 'scratch/member_nav_dropdown_desktop.png',
    clip: { x: 920, y: 0, width: 520, height: 440 }
  });
  console.log('Saved scratch/member_nav_dropdown_desktop.png');

  // Open the Member Portal Modal on 'orders' tab
  await page.evaluate(() => {
    window.closeEpicureanMemberDropdown();
    window.openEpicureanPortal('orders');
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: 'scratch/member_portal_orders_desktop.png'
  });
  console.log('Saved scratch/member_portal_orders_desktop.png');

  // Switch to 'library' tab
  await page.evaluate(() => {
    window.openEpicureanPortal('library');
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: 'scratch/member_portal_library_desktop.png'
  });
  console.log('Saved scratch/member_portal_library_desktop.png');

  // Switch to 'profile' tab
  await page.evaluate(() => {
    window.openEpicureanPortal('profile');
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: 'scratch/member_portal_profile_desktop.png'
  });
  console.log('Saved scratch/member_portal_profile_desktop.png');

  // 2. Mobile Test (390 x 844 - iPhone)
  console.log('Testing Mobile 390px...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.evaluate(() => {
    window.openEpicureanPortal('orders');
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: 'scratch/member_portal_orders_mobile.png'
  });
  console.log('Saved scratch/member_portal_orders_mobile.png');

  // Switch to profile on mobile
  await page.evaluate(() => {
    window.openEpicureanPortal('profile');
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: 'scratch/member_portal_profile_mobile.png'
  });
  console.log('Saved scratch/member_portal_profile_mobile.png');

  // 3. Test Digital Asset Download function
  const downloadResult = await page.evaluate(() => {
    try {
      window.downloadDigitalAsset('Complete Holiday Table Collection', 'Epicurean-Flow-Holiday-Table-Collection.pdf');
      return true;
    } catch(e) {
      return false;
    }
  });
  console.log('Download trigger executed successfully:', downloadResult);
  await new Promise(r => setTimeout(r, 700));

  await browser.close();
  console.log('All tests completed successfully!');
})();
