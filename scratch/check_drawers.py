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
    m = re.search(r'</header>(.*?)<main', content, re.DOTALL)
    if m:
        between = m.group(1)
        count_drawers = between.count('class="mobile-nav-drawer')
        count_explore = between.count('Explore Collection')
        print(f"{f}: {count_drawers} drawer tags, {count_explore} 'Explore Collection'")
    else:
        print(f"{f}: no match")
