import os
import re

DEV_BAR_HTML = '''    <div class="container">
      <div class="footer-developer-bar">
        <div class="developer-info">
          <span class="developer-label">Website Engineered &amp; Designed by <a href="https://ibtex.ibe88agwu.workers.dev/" target="_blank" rel="noopener" class="developer-brand-link">IBTEX</a></span>
          <span class="developer-sep">•</span>
          <span class="developer-pitch">Planning a website redesign, brand build, platform migration, or SEO growth?</span>
        </div>
        <a href="https://wa.me/2348103883295?text=Hello%20IBTEX,%20I%20saw%20the%20Epicurean%20Flow%20website%20and%20would%20like%20to%20discuss%20a%20website%20redesign%2C%20development%2C%20or%20SEO%20project." target="_blank" rel="noopener" class="developer-cta-badge">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          <span>Chat with Developer on WhatsApp</span>
        </a>
      </div>
    </div>'''

html_files = [
    'about.html', 'contact.html', 'cookbooks.html', 'courses.html',
    'diabetes.html', 'food-tours.html', 'index.html', 'media.html',
    'menu-planning.html', 'nutrition.html', 'privacy-policy.html',
    'product-detail.html', 'recipes.html', 'refund-policy.html',
    'seasonal.html', 'terms.html'
]

updated = []

for filename in html_files:
    if not os.path.exists(filename):
        continue
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip if already has developer bar
    if 'footer-developer-bar' in content:
        print(f"Skipping {filename}: already has footer-developer-bar")
        continue

    # Special handling for index.html which had missing </footer>
    if filename == 'index.html':
        target = '''      <div class="footer-bottom">
        <p class="copyright">&copy; 2026 Epicurean Flow. All rights reserved. &bull; Registration: 94886792 &bull; Málaga, Spain</p>
        <ul class="footer-legal-links">
          <li><a href="privacy-policy.html">Privacy Policy</a></li>
          <li><a href="terms.html">Terms of Service</a></li>
          <li><a href="refund-policy.html">Refund Policy</a></li>
        </ul>
      </div>
      </div>
    </div>'''

        replacement = '''      <div class="footer-bottom">
        <p class="copyright">&copy; 2026 Epicurean Flow. All rights reserved. &bull; Registration: 94886792 &bull; Málaga, Spain</p>
        <ul class="footer-legal-links">
          <li><a href="privacy-policy.html">Privacy Policy</a></li>
          <li><a href="terms.html">Terms of Service</a></li>
          <li><a href="refund-policy.html">Refund Policy</a></li>
        </ul>
      </div>
    </div>
''' + DEV_BAR_HTML + '''
  </footer>'''

        if target in content:
            new_content = content.replace(target, replacement, 1)
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)
            updated.append(filename)
            print(f"Successfully restored footer and developer bar in {filename}")
        else:
            print(f"ERROR: Target pattern not found in {filename}")
        continue

    # For all other pages, find the dangling </div> before </footer>
    # Patterns usually look like:
    #   </div>\n  </footer> or </div>\n    </div>\n  </footer>
    pattern = re.compile(r'(\s*</div>\s*</div>\s*</footer>|\s*</div>\s*</footer>)')
    match = re.search(r'([ \t]*)</div>\s*</footer>', content)
    
    if match:
        # Check if preceded by another </div>
        before = content[:match.start()]
        # Check if the last closing div was dangling
        # Replace the dangling </div>\s*</footer> with DEV_BAR_HTML + '\n  </footer>'
        new_content = content[:match.start()] + '\n' + DEV_BAR_HTML + '\n  </footer>' + content[match.end():]
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        updated.append(filename)
        print(f"Successfully added developer bar to {filename}")
    else:
        print(f"Could not find footer closing pattern in {filename}")

print(f"\nTotal files updated: {len(updated)} of {len(html_files)}")
