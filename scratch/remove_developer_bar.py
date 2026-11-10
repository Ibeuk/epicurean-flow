import os, re

files = [f for f in os.listdir('.') if f.endswith('.html')]
pattern = re.compile(r'\s*<div class="footer-developer-bar">[\s\S]*?</div>\s*', re.MULTILINE)

modified = []
for f in files:
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        content = fp.read()
    if '<div class="footer-developer-bar">' in content:
        new_content = pattern.sub('\n', content)
        with open(f, 'w', encoding='utf-8') as fp:
            fp.write(new_content)
        modified.append(f)

print(f"Removed developer bar from {len(modified)} files:")
for m in modified:
    print(f" - {m}")
