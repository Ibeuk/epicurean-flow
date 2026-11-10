const puppeteer = require('puppeteer-core');
const fs = require('fs');

const paths = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
];
const execPath = paths.find(p => fs.existsSync(p));

const certHtml = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @page {
    size: A4 landscape;
    margin: 0;
  }
  body {
    margin: 0;
    padding: 40px;
    font-family: 'Cinzel', 'Georgia', serif;
    background: #FAF7F2;
    color: #1A1A1A;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    box-sizing: border-box;
  }
  .cert-container {
    width: 100%;
    height: 100%;
    border: 8px solid #9B7026;
    outline: 2px solid #D4AF37;
    outline-offset: -16px;
    padding: 40px 60px;
    background: #FFFFFF;
    position: relative;
    box-sizing: border-box;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  }
  .corner-decor {
    position: absolute;
    width: 40px;
    height: 40px;
    border: 3px solid #9B7026;
  }
  .tl { top: 22px; left: 22px; border-right: none; border-bottom: none; }
  .tr { top: 22px; right: 22px; border-left: none; border-bottom: none; }
  .bl { bottom: 22px; left: 22px; border-right: none; border-top: none; }
  .br { bottom: 22px; right: 22px; border-left: none; border-top: none; }
  
  .brand {
    font-size: 26px;
    letter-spacing: 0.25em;
    font-weight: 700;
    color: #1A1A1A;
    text-transform: uppercase;
    margin-top: 10px;
  }
  .sub-brand {
    font-size: 13px;
    letter-spacing: 0.3em;
    color: #9B7026;
    text-transform: uppercase;
    margin-top: 4px;
    font-weight: 600;
  }
  .gold-divider {
    width: 120px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #9B7026, transparent);
    margin: 20px auto;
  }
  .title {
    font-size: 38px;
    color: #9B7026;
    font-family: 'Cinzel Decorative', 'Georgia', serif;
    letter-spacing: 0.1em;
    margin: 10px 0 15px;
    font-weight: 700;
    text-transform: uppercase;
  }
  .presented-to {
    font-size: 14px;
    letter-spacing: 0.15em;
    color: #666;
    text-transform: uppercase;
    margin-bottom: 15px;
  }
  .student-name {
    font-size: 34px;
    font-family: 'Playfair Display', 'Georgia', serif;
    font-style: italic;
    color: #1A1A1A;
    border-bottom: 1px solid #D4AF37;
    display: inline-block;
    padding: 0 40px 8px;
    margin-bottom: 20px;
    min-width: 380px;
  }
  .description {
    font-size: 15px;
    line-height: 1.6;
    color: #444;
    max-width: 720px;
    margin: 0 auto 30px;
    font-family: 'Georgia', serif;
  }
  .footer-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 30px;
    padding: 0 40px;
  }
  .sign-col {
    text-align: center;
    width: 220px;
  }
  .sig-line {
    border-top: 1px solid #1A1A1A;
    padding-top: 8px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.05em;
  }
  .sig-title {
    font-size: 11px;
    color: #777;
    margin-top: 3px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .sig-handwritten {
    font-family: 'Brush Script MT', 'cursive';
    font-size: 30px;
    color: #1A1A1A;
    margin-bottom: 4px;
  }
  .seal-gold {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 2px dashed #9B7026;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #9B7026;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    box-shadow: inset 0 0 10px rgba(155, 112, 38, 0.1);
  }
</style>
</head>
<body>
  <div class="cert-container">
    <div class="corner-decor tl"></div>
    <div class="corner-decor tr"></div>
    <div class="corner-decor bl"></div>
    <div class="corner-decor br"></div>

    <div class="brand">Epicurean Flow</div>
    <div class="sub-brand">Culinary Academy &bull; Interactive Masterclasses</div>

    <div class="gold-divider"></div>

    <div class="title">Certificate of Completion</div>
    <div class="presented-to">This is proudly awarded to</div>
    <div class="student-name">Honored Student</div>

    <div class="description">
      For successfully mastering the self-paced curriculum, interactive knowledge checks, recipe execution, and culinary techniques of the <strong>Epicurean Flow Professional Culinary Program</strong>.
    </div>

    <div class="footer-row">
      <div class="sign-col">
        <div class="sig-line">Official Issue Date</div>
        <div class="sig-title">Self-Paced Verification</div>
      </div>
      <div class="seal-gold">
        <div>Verified</div>
        <div style="font-size: 14px; margin: 2px 0;">★</div>
        <div>Standard</div>
      </div>
      <div class="sign-col">
        <div class="sig-handwritten">Eliane Muskus</div>
        <div class="sig-line">Chef Eliane Muskus</div>
        <div class="sig-title">Founder &amp; Executive Chef</div>
      </div>
    </div>
  </div>
</body>
</html>
`;

(async () => {
  const browser = await puppeteer.launch({ executablePath: execPath, headless: 'new' });
  const page = await browser.newPage();
  await page.setContent(certHtml, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: 'scratch/Epicurean_Flow_Official_Certificate_of_Completion.pdf',
    format: 'A4',
    landscape: true,
    printBackground: true
  });
  await browser.close();
  console.log('Certificate PDF generated successfully at scratch/Epicurean_Flow_Official_Certificate_of_Completion.pdf');
})();
