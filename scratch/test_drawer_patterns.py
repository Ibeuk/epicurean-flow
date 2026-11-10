import os
import re

files = [
    'index.html', 'cookbooks.html', 'courses.html', 'food-tours.html',
    'recipes.html', 'about.html', 'contact.html', 'diabetes.html',
    'nutrition.html', 'menu-planning.html', 'media.html', 'seasonal.html',
    'product-detail.html', 'privacy-policy.html', 'terms.html', 'refund-policy.html'
]

drawer_pattern = re.compile(r'(<div class="mobile-nav-drawer[^"]*".*?</div>\s*</div>)', re.DOTALL)

for f in files:
    content = open(f, 'r', encoding='utf-8').read()
    match = bool(drawer_pattern.search(content))
    print(f"{f}: drawer match={match}")
