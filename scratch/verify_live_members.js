const puppeteer = require('puppeteer-core');

(async () => {
    console.log('--- STARTING LIVE PRODUCTION VERIFICATION FOR MEMBERS PORTAL ---');
    const browser = await puppeteer.launch({
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        headless: 'new',
        args: ['--no-sandbox', '--disable-web-security']
    });

    const page = await browser.newPage();
    const liveUrl = 'https://epicurean-flow-1-epicureanflow-100d.wix-site-host.com';

    // 1. Desktop Test (1440x950)
    await page.setViewport({ width: 1440, height: 950 });
    console.log(`Navigating to live URL: ${liveUrl}`);
    await page.goto(liveUrl, { waitUntil: 'networkidle2', timeout: 45000 });

    // Verify window.EpicureanMembers exists
    const membersLoaded = await page.evaluate(() => {
        return typeof window.EpicureanMembers !== 'undefined';
    });
    console.log('window.EpicureanMembers initialized on live site:', membersLoaded);

    // Register real user
    const regResult = await page.evaluate(() => {
        return window.EpicureanMembers.registerRealUser({
            name: 'Sophie Laurent',
            email: 'sophie.laurent@paris-cuisine.fr',
            password: 'secretPassword2026',
            provider: 'email',
            publicProfile: true
        });
    });
    console.log('Registration result on live site:', regResult.success, regResult.member?.name);
    await new Promise(r => setTimeout(r, 800));

    // Open orders portal
    await page.evaluate(() => {
        window.openEpicureanPortal('orders');
    });
    await new Promise(r => setTimeout(r, 1000));

    // Capture desktop modal orders tab
    await page.screenshot({ path: 'scratch/live_member_portal_orders_desktop.png' });
    console.log('Saved scratch/live_member_portal_orders_desktop.png');

    // Switch to Library tab
    await page.evaluate(() => {
        window.openEpicureanPortal('library');
    });
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: 'scratch/live_member_portal_library_desktop.png' });
    console.log('Saved scratch/live_member_portal_library_desktop.png');

    // Switch to Profile tab
    await page.evaluate(() => {
        window.openEpicureanPortal('profile');
    });
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: 'scratch/live_member_portal_profile_desktop.png' });
    console.log('Saved scratch/live_member_portal_profile_desktop.png');

    // 2. Mobile Viewport Test (390x844)
    console.log('Testing Mobile 390px on live site...');
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.evaluate(() => {
        window.openEpicureanPortal('orders');
    });
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: 'scratch/live_member_portal_orders_mobile.png' });
    console.log('Saved scratch/live_member_portal_orders_mobile.png');

    // Mobile Profile tab
    await page.evaluate(() => {
        window.openEpicureanPortal('profile');
    });
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: 'scratch/live_member_portal_profile_mobile.png' });
    console.log('Saved scratch/live_member_portal_profile_mobile.png');

    // Test Security: Verify sessionStorage vs localStorage
    const storageCheck = await page.evaluate(() => {
        const sessionActive = sessionStorage.getItem('epicurean_member_active_session');
        const localAccounts = localStorage.getItem('epicurean_registered_accounts_v2');
        const localUser = localStorage.getItem('epicurean_member_user_v2');
        return {
            hasSessionActive: !!sessionActive,
            hasLocalAccounts: !!localAccounts,
            localUserIsEmpty: !localUser
        };
    });
    console.log('Live Security & Storage Check:', storageCheck);

    await browser.close();
    console.log('--- LIVE PRODUCTION VERIFICATION COMPLETE ---');
})();
