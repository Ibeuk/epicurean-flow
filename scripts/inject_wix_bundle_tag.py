import os

html_files = [f for f in os.listdir('.') if f.endswith('.html') and not f.startswith('wix-bundle') and not f.startswith('scratch')]

count = 0
for f in html_files:
    with open(f, 'r', encoding='utf-8') as fp:
        content = fp.read()

    target = '<script src="js/products.js"></script>'
    bundle_tag = '<script src="js/wix-sdk-client.bundle.js"></script>\n  <script src="js/products.js"></script>'
    
    if target in content and 'wix-sdk-client.bundle.js' not in content:
        content = content.replace(target, bundle_tag)
        with open(f, 'w', encoding='utf-8') as fp:
            fp.write(content)
        count += 1
        print(f"Injected wix-sdk-client.bundle.js into {f}")

print(f"\nTotal files updated: {count}")
