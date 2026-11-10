import urllib.request
import re

links = [
    'https://acrobat.adobe.com/id/urn:aaid:sc:EU:a4eb1934-d244-4bfd-a3cc-6c9890d055e0',
    'https://acrobat.adobe.com/id/urn:aaid:sc:EU:5819396d-9606-426d-938b-706e06869a8d',
    'https://acrobat.adobe.com/id/urn:aaid:sc:EU:670b42b5-b2b9-4b28-9426-a5f99d8f4988',
    'https://acrobat.adobe.com/id/urn:aaid:sc:EU:f71181b3-7964-4dd7-ba14-ab55425d1b4a'
]

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for idx, url in enumerate(links, 1):
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
        m = re.search(r'"download_url":"(https:[^"]+)"', html)
        if m:
            dl = m.group(1).replace(r'\u0026', '&')
            fn_m = re.search(r'filename%3D%22([^%"]+)%22', dl)
            if not fn_m:
                fn_m = re.search(r'filename="([^"]+)"', dl)
            fn = fn_m.group(1) if fn_m else 'unknown'
            print(f"Link {idx}: {fn}")
        else:
            title_m = re.search(r'<title>([^<]+)</title>', html)
            print(f"Link {idx}: No download_url, title: {title_m.group(1) if title_m else 'None'}")
    except Exception as e:
        print(f"Link {idx}: error {e}")
