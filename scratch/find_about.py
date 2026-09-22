with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    l_lower = l.lower()
    if any(k in l_lower for k in ['cannes', 'corporate leadership', 'vishandel', 'meet chef eliane', 'about']):
        clean = l.strip()[:120].encode('ascii', 'replace').decode('ascii')
        print(f'Line {i+1}: {clean}')
