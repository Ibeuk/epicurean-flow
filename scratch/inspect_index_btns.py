import re

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

btns = re.findall(r'<a[^>]+class=["\'][^"\']*btn[^"\']*["\'][^>]*>', text)
print('Total buttons found in index.html:', len(btns))
for b in btns[:20]:
    print('Button:', b)

cards = re.findall(r'<article[^>]*>[\s\S]*?</article>', text)
print('Total articles/cards found:', len(cards))
for c in cards[:5]:
    # print title and button inside card
    title = re.findall(r'<h[34][^>]*>(.*?)</h[34]>', c)
    btn = re.findall(r'<[ab][^>]+class=["\'][^"\']*btn[^"\']*["\'][^>]*>[\s\S]*?</[ab]>', c)
    print(' Card Title:', title, 'Button:', btn)
