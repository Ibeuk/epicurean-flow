const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  console.log('--- STARTING HERO VIDEO LOCAL VERIFICATION ---');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-web-security', '--autoplay-policy=no-user-gesture-required']
  });

  const page = await browser.newPage();
  
  // 1. Desktop Test (1440 x 950)
  console.log('Testing Desktop 1440px Hero Video...');
  await page.setViewport({ width: 1440, height: 950 });
  const fileUrl = 'file:///' + path.resolve('index.html').replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
  
  // Wait 2.5 seconds for video to start playback and advance frames
  await new Promise(r => setTimeout(r, 2500));

  const videoStats = await page.evaluate(() => {
    const v = document.querySelector('video.hero-fullwidth-video');
    if (!v) return { exists: false };
    return {
      exists: true,
      src: v.currentSrc || v.querySelector('source')?.src,
      paused: v.paused,
      muted: v.muted,
      currentTime: v.currentTime,
      duration: v.duration,
      videoWidth: v.videoWidth,
      videoHeight: v.videoHeight
    };
  });
  console.log('Desktop Video Stats:', videoStats);

  // Capture Desktop Hero Section
  const heroEl = await page.$('#hero');
  if (heroEl) {
    await heroEl.screenshot({ path: 'scratch/hero_video_desktop.png' });
    console.log('Saved scratch/hero_video_desktop.png');
  }

  // 2. Mobile Test (390 x 844)
  console.log('Testing Mobile 390px Hero Video...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 2000));

  const mobileHeroEl = await page.$('#hero');
  if (mobileHeroEl) {
    await mobileHeroEl.screenshot({ path: 'scratch/hero_video_mobile.png' });
    console.log('Saved scratch/hero_video_mobile.png');
  }

  await browser.close();
  console.log('--- HERO VIDEO VERIFICATION COMPLETE ---');
})();
