import os
import re

files = [f for f in os.listdir('.') if f.endswith('.html') and not f.startswith('wix-bundle')]
found_any = False
for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        content = fp.read()
    matches = re.findall(r'href=[\'"]([^\'"]*epicureanflow\.wixsite\.com[^\'"]*)[\'"]', content)
    if matches:
        found_any = True
        print(f"{f}: {len(matches)} links found:")
        for m in matches:
            print(f"  - {m}")

if not found_any:
    print("Zero links to epicureanflow.wixsite.com found across all active HTML pages!")
