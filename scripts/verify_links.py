import os
import re

ROOT_DIR = r'c:\Users\ibe88\Downloads\Epicurean Flow'
html_files = [f for f in os.listdir(ROOT_DIR) if f.endswith('.html')]

broken_links = []

for hf in html_files:
    path = os.path.join(ROOT_DIR, hf)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find href links
    links = re.findall(r'href=["\']([^"\']+)["\']', content)
    for link in links:
        # Ignore external, anchor, mailto, tel, javascript, query
        if link.startswith(('http://', 'https://', '#', 'mailto:', 'tel:', 'javascript:')):
            continue
        # Strip query and anchor
        target = link.split('?')[0].split('#')[0]
        if not target:
            continue
        target_path = os.path.join(ROOT_DIR, target)
        if not os.path.exists(target_path):
            broken_links.append((hf, link, target))

if broken_links:
    print(f"Found {len(broken_links)} broken links:")
    for src, link, target in broken_links:
        print(f"  {src} -> {link} (file not found: {target})")
else:
    print(f"All internal links across {len(html_files)} HTML pages are valid!")
