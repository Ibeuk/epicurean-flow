import os
import re

files = [
    'index.html', 'cookbooks.html', 'courses.html', 'food-tours.html',
    'recipes.html', 'about.html', 'contact.html', 'diabetes.html',
    'nutrition.html', 'menu-planning.html', 'media.html', 'seasonal.html',
    'product-detail.html', 'privacy-policy.html', 'terms.html', 'refund-policy.html'
]

for f in files:
    content = open(f, 'r', encoding='utf-8').read()
    m = re.search(r'(<main[^>]*>)', content)
    if m:
        print(f"{f}: {m.group(1)}")
    else:
        print(f"{f}: NO MAIN TAG FOUND")
