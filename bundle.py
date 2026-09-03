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
        'responsive.css'
    ]

    js_files = [
        'products.js',
        'navigation.js',
        'animations.js',
        'main.js'
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
          targetElement.scrollIntoView({ behavior: 'smooth' });
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
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <!-- Inlined Stylesheets for Standalone Wix Embed -->
  <style>
{css_content}
  </style>'''

    js_bundle_tag = f'''  <!-- Inlined Scripts for Standalone Wix Embed -->
  <script>
{js_content}
  </script>'''

    # Replace CSS references
    html_bundled = re.sub(
        r'\s*<!-- Stylesheets -->(\s*<link rel="stylesheet" href="css/[^"]+">)+',
        '\n' + css_bundle_tag,
        html
    )

    # Replace JS references
    html_bundled = re.sub(
        r'\s*<!-- Scripts -->(\s*<script src="js/[^"]+"></script>)+',
        '\n' + js_bundle_tag,
        html_bundled
    )

    # Update checkout link in cart drawer to point directly to Wix Cart page
    html_bundled = html_bundled.replace(
        'href="#cookbooks" class="btn btn-gold" style="width: 100%; text-align: center;">\n        <span>Proceed to Wix Checkout</span>',
        'href="https://epicureanflow.wixsite.com/epicurean-flow/cart-page" target="_top" class="btn btn-gold" style="width: 100%; text-align: center;">\n        <span>Proceed to Wix Checkout</span>'
    )

    output_path = 'wix-bundle.html'
    with open(output_path, 'w', encoding='utf-8') as out:
        out.write(html_bundled)

    print(f"Successfully created '{output_path}' ({len(html_bundled)} bytes)")

if __name__ == '__main__':
    build_wix_bundle()
