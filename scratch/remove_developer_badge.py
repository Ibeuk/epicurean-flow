import os
import re

pattern1 = re.compile(r'\s*<div class="container">\s*<a href="https://wa\.me/2348103883295[\s\S]*?</a>\s*</div>', re.MULTILINE)
pattern2 = re.compile(r'\s*<a href="https://wa\.me/2348103883295[\s\S]*?</a>', re.MULTILINE)

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

count = 0
for filename in html_files:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = pattern1.sub('', content)
    new_content = pattern2.sub('', new_content)

    if new_content != content:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Scrubbed developer badge from {filename}")
        count += 1

print(f"Total files updated: {count}")
