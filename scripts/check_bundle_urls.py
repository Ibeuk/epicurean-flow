import re

with open('wix-bundle.html', encoding='utf-8') as f:
    c = f.read()

urls = re.findall(r'(?:src|href)=["\']([^"\'#]+)["\']', c)
non_http = [u for u in set(urls) if not u.startswith(('http', 'data:', 'mailto:', 'tel:'))]
print('Non-HTTP/data URLs in wix-bundle.html:')
for u in sorted(non_http):
    print(' ', u)
