import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html') and f != 'wix-bundle.html']

community_desktop = '<li class="nav-item"><a href="https://apps.wix.com/place-invites/join-lp/c4f86012-7e7b-4eda-8838-2ec67d3dbeb7" target="_blank" rel="noopener noreferrer" class="nav-link" title="Epicurean Flow Community & Member Portal">Community</a></li>'
community_mobile = '<a href="https://apps.wix.com/place-invites/join-lp/c4f86012-7e7b-4eda-8838-2ec67d3dbeb7" target="_blank" rel="noopener noreferrer" class="mobile-nav-link">Community &amp; Members</a>'

count = 0
for filename in html_files:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'apps.wix.com/place-invites/join-lp/c4f86012-7e7b-4eda-8838-2ec67d3dbeb7' in content:
        print(f"Skipping {filename}, already has community link")
        continue

    # Add to desktop nav after contact
    new_content = re.sub(
        r'(<li class="nav-item"><a href="contact\.html"[^>]*>Contact</a></li>)',
        r'\1\n          ' + community_desktop,
        content
    )

    # Add to mobile nav drawer after contact
    new_content = re.sub(
        r'(<a href="contact\.html"[^>]*class="mobile-nav-link[^"]*"[^>]*>Contact</a>)',
        r'\1\n      ' + community_mobile,
        new_content
    )

    if new_content != content:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Added Community links to {filename}")
        count += 1

print(f"Total files updated: {count}")
