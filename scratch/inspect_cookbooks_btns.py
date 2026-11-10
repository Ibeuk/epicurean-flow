import re

with open('cookbooks.html', 'r', encoding='utf-8') as f:
    text = f.read()

cards = re.findall(r'<article[^>]*>[\s\S]*?</article>', text)
print('Total articles/cards in cookbooks.html:', len(cards))
for c in cards:
    title = re.findall(r'<h[234][^>]*>(.*?)</h[234]>', c)
    btn = re.findall(r'<[ab][^>]+class=["\'][^"\']*btn[^"\']*["\'][^>]*>[\s\S]*?</[ab]>', c)
    print(' Card:', title, 'Btn:', btn[:1])
