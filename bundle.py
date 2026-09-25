import os
import re

def build_wix_bundle():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    css_files = [
        'variables.css',
        'base.css',
        'layout.css',
        'components.css',
        'animations.css',
        'responsive.css',
        'members.css'
    ]

    js_files = [
        'products.js',
        'navigation.js',
        'animations.js',
        'main.js',
        'members.js'
    ]

    css_content = ''
    for f in css_files:
        path = os.path.join('css', f)
        with open(path, 'r', encoding='utf-8') as cf:
            c = cf.read()
            # remove duplicate @import font rules since we link Google Fonts in head
            c = re.sub(r'@import\s+url\([^)]+\);', '', c)
            css_content += f'\n/* --- {f} --- */\n' + c

    js_content = ''
    for f in js_files:
        path = os.path.join('js', f)
        with open(path, 'r', encoding='utf-8') as jf:
            c = jf.read()
            # Ensure product URLs are absolute Wix store URLs
            c = c.replace("url: '/product-page/", "url: 'https://epicureanflow.wixsite.com/epicurean-flow/product-page/")
            js_content += f'\n// --- {f} ---\n' + c

    # Add smooth scroll handler for iframe compatibility
    js_content += '''
// Smooth scroll for internal anchor links within iframe & open external links in parent window
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView();
        }
      }
    });
  });

  // Ensure external links break out of Wix iframe
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.hasAttribute('target')) {
      link.setAttribute('target', '_top');
    }
  });
});
'''

    # Bundle tags
    css_bundle_tag = f'''  <!-- Google Fonts Preconnect & Stylesheet -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet">

  <!-- Inlined Stylesheets for Standalone Wix Embed -->
  <style>
{css_content}
  </style>'''

    js_bundle_tag = f'''  <!-- Inlined Scripts for Standalone Wix Embed -->
  <script>
{js_content}
  </script>'''

    # Replace CSS references safely without regex backslash interpretation
    html_bundled = re.sub(
        r'\s*<!-- Stylesheets -->(\s*<link rel="stylesheet" href="css/[^"]+">)+',
        lambda m: '\n' + css_bundle_tag,
        html
    )

    # Replace JS references safely without regex backslash interpretation
    html_bundled = re.sub(
        r'\s*<!-- Scripts -->(\s*<script src="js/[^"]+"></script>)+',
        lambda m: '\n' + js_bundle_tag,
        html_bundled
    )

    # Update checkout link in cart drawer to point directly to Wix Cart page with target="_top"
    if 'id="btn-proceed-checkout"' in html_bundled and 'id="btn-proceed-checkout" target="_top"' not in html_bundled:
        html_bundled = html_bundled.replace(
            'id="btn-proceed-checkout"',
            'id="btn-proceed-checkout" target="_top"'
        )

    # In-line local images from images/ folder as base64 for 100% standalone portable embed
    import base64
    if os.path.exists('images'):
        for img_name in os.listdir('images'):
            img_path = os.path.join('images', img_name)
            if os.path.isfile(img_path):
                ext = os.path.splitext(img_name)[1].lower()
                mime = 'image/png' if ext == '.png' else ('image/jpeg' if ext in ('.jpg', '.jpeg') else 'application/octet-stream')
                with open(img_path, 'rb') as img_f:
                    b64_data = f'data:{mime};base64,' + base64.b64encode(img_f.read()).decode('utf-8')
                html_bundled = html_bundled.replace(f'src="images/{img_name}"', f'src="{b64_data}"')
                html_bundled = html_bundled.replace(f'href="images/{img_name}"', f'href="{b64_data}"')

    output_path = 'wix-bundle.html'
    with open(output_path, 'w', encoding='utf-8') as out:
        out.write(html_bundled)

    print(f"Successfully created '{output_path}' ({len(html_bundled)} bytes)")

if __name__ == '__main__':
    build_wix_bundle()
