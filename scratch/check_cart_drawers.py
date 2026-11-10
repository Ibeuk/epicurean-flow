import os, re

files = [f for f in os.listdir('.') if f.endswith('.html')]
for f in sorted(files):
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        content = fp.read()
    subtotal_matches = re.findall(r'<div[^>]*class=["\'][^"\']*cart-subtotal[^"\']*["\'][^>]*>', content)
    cart_matches = re.findall(r'id=["\']cart-drawer["\']', content)
    if cart_matches:
        print(f'{f}: cart drawer found, subtotal divs: {len(subtotal_matches)}')
    else:
        print(f'{f}: NO cart drawer')
