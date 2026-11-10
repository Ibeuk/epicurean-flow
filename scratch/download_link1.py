import urllib.request
import re
import os

url = 'https://acrobat.adobe.com/id/urn:aaid:sc:EU:a4eb1934-d244-4bfd-a3cc-6c9890d055e0'
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req, timeout=15) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

m = re.search(r'"download_url":"(https:[^"]+)"', html)
if m:
    dl = m.group(1).replace(r'\u0026', '&')
    out_path = os.path.join('scratch/books', 'Diabetes_Cooking_Course_Regular_Version_Corrected.pdf')
    print("Downloading to", out_path)
    dl_req = urllib.request.Request(dl, headers=headers)
    with urllib.request.urlopen(dl_req, timeout=60) as dl_resp, open(out_path, 'wb') as f:
        f.write(dl_resp.read())
    print("Downloaded successfully! Size:", os.path.getsize(out_path) / (1024*1024), "MB")
else:
    print("Download URL not found!")
