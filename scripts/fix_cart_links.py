import glob

files = glob.glob('*.html')
updated = 0
target = 'href="https://epicureanflow.wixsite.com/epicurean-flow/cart-page"'
replacement = 'href="javascript:void(0)"'

for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        content = fp.read()
    if target in content:
        content = content.replace(target, replacement)
        with open(f, 'w', encoding='utf-8') as fp:
            fp.write(content)
        print(f"Updated: {f}")
        updated += 1

print(f"Total files updated: {updated}")
