import re
import urllib.request
import os
import pypdf
from PIL import Image

links = [
    ("link1", "https://acrobat.adobe.com/id/urn:aaid:sc:EU:5819396d-9606-426d-938b-706e06869a8d"),
    ("link2", "https://acrobat.adobe.com/id/urn:aaid:sc:EU:f38437f8-356c-4f7a-927e-651de7c94996"),
    ("link3", "https://acrobat.adobe.com/id/urn:aaid:sc:EU:670b42b5-b2b9-4b28-9426-a5f99d8f4988"),
    ("link4", "https://acrobat.adobe.com/id/urn:aaid:sc:EU:f71181b3-7964-4dd7-ba14-ab55425d1b4a")
]

os.makedirs('scratch/books', exist_ok=True)
os.makedirs('images', exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

results = []

for idx, (tag, url) in enumerate(links):
    print(f"\n==================== PROCESSING {tag} ({idx+1}/4) ====================")
    print("URL:", url)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=20) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
        
        m = re.search(r'"download_url":"(https:[^"]+)"', html)
        if not m:
            print(f"FAILED to find download_url for {tag}")
            results.append((tag, None, "No download_url found", None))
            continue
            
        dl_url = m.group(1).replace(r'\u0026', '&')
        
        # Try to find filename
        fn_match = re.search(r'filename%3D%22([^%"]+)%22', dl_url)
        if not fn_match:
            fn_match = re.search(r'filename="([^"]+)"', dl_url)
        filename = fn_match.group(1) if fn_match else f"doc_{idx+1}.pdf"
        
        pdf_path = os.path.join('scratch/books', filename)
        print(f"Downloading {filename}...")
        
        dl_req = urllib.request.Request(dl_url, headers=headers)
        with urllib.request.urlopen(dl_req, timeout=60) as dl_resp, open(pdf_path, 'wb') as f:
            f.write(dl_resp.read())
            
        size_mb = os.path.getsize(pdf_path) / (1024 * 1024)
        print(f"Downloaded {filename}: {size_mb:.2f} MB")
        
        # Parse PDF
        reader = pypdf.PdfReader(pdf_path)
        page_count = len(reader.pages)
        meta = reader.metadata or {}
        title = meta.get('/Title', filename)
        subject = meta.get('/Subject', '')
        
        # Text from page 1 and page 2
        p1_text = reader.pages[0].extract_text() if page_count > 0 else ""
        p2_text = reader.pages[1].extract_text() if page_count > 1 else ""
        
        # Extract cover image from page 1
        cover_saved = None
        if page_count > 0 and len(reader.pages[0].images) > 0:
            img = reader.pages[0].images[0]
            clean_name = re.sub(r'[^a-zA-Z0-9_-]', '_', filename.replace('.pdf', '')).lower()
            cover_path = os.path.join('images', f"{clean_name}-cover.jpg")
            with open(cover_path, 'wb') as img_f:
                img_f.write(img.data)
            cover_saved = cover_path
            print(f"Extracted cover: {cover_path}")
        
        results.append({
            'tag': tag,
            'filename': filename,
            'pdf_path': pdf_path,
            'size_mb': size_mb,
            'page_count': page_count,
            'metadata': meta,
            'cover_path': cover_saved,
            'p1_text': p1_text[:300],
            'p2_text': p2_text[:300]
        })
        
    except Exception as e:
        print(f"Error processing {tag}: {e}")
        results.append({'tag': tag, 'error': str(e)})

print("\n\n==================== ALL RESULTS ====================")
import json
for r in results:
    print(r.get('tag'), "->", r.get('filename'), "| Pages:", r.get('page_count'), "| Cover:", r.get('cover_path'))
    if 'metadata' in r:
        print("  Meta Title:", r['metadata'].get('/Title'))
        print("  Meta Subject:", r['metadata'].get('/Subject'))
    if 'p2_text' in r and r['p2_text'].strip():
        print("  P2 Text Snippet:", r['p2_text'].strip()[:120].replace('\n', ' '))
