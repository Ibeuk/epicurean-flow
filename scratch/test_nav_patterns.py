import os
import re

files = [
    'index.html', 'cookbooks.html', 'courses.html', 'food-tours.html',
    'recipes.html', 'about.html', 'contact.html', 'diabetes.html',
    'nutrition.html', 'menu-planning.html', 'media.html', 'seasonal.html',
    'product-detail.html', 'privacy-policy.html', 'terms.html', 'refund-policy.html'
]

nav_pattern = re.compile(r'(\s*<!-- Desktop Navigation.*?-->\s*<nav class="nav-desktop"[^>]*>.*?</nav>)', re.DOTALL)
nav_pattern_alt = re.compile(r'(<nav class="nav-desktop"[^>]*>.*?</nav>)', re.DOTALL)

for f in files:
    content = open(f, 'r', encoding='utf-8').read()
    match1 = bool(nav_pattern.search(content))
    match2 = bool(nav_pattern_alt.search(content))
    print(f"{f}: standard={match1}, alt={match2}")
