import re

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

sections = re.findall(r'<section[^>]*id="([^"]+)"', text)
print('Section IDs:', sections)

for s in sections:
    if any(k in s.lower() for k in ['course', 'book', 'product', 'catalog']):
        print('Matching section:', s)
        # find articles or cards
        sec_content = re.search(r'<section[^>]*id="' + s + r'"[\s\S]*?</section>', text)
        if sec_content:
            cards = re.findall(r'<article[^>]*class="([^"]+)"', sec_content.group(0))
            print(f'  Cards in {s}:', cards)
