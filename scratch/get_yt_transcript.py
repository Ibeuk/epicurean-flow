import urllib.request
import re
import xml.etree.ElementTree as ET

url = 'https://www.youtube.com/watch?v=7oYJiVfD6T0'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

m = re.search(r'"captionTracks":\[\{"baseUrl":"([^"]+)"', html)
if m:
    cap_url = m.group(1).replace('\\u0026', '&')
    req2 = urllib.request.Request(cap_url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req2) as resp2:
        xml_data = resp2.read().decode('utf-8')
    root = ET.fromstring(xml_data)
    lines = [elem.text for elem in root.findall('text') if elem.text]
    full_text = ' '.join(lines)
    with open('scratch/video_transcript.txt', 'w', encoding='utf-8') as f:
        f.write(full_text)
    print("Transcript length:", len(full_text))
    print(full_text[:1500])
else:
    print("No caption match found")
