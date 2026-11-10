import glob
import os

images = sorted(glob.glob('WhatsApp Image*.jpeg'))
videos = sorted(glob.glob('WhatsApp Video*.mp4'))

html = """<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>WhatsApp Media Gallery</title>
<style>
body { font-family: sans-serif; background: #1a1a1a; color: #fff; padding: 20px; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
.card { background: #2a2a2a; border-radius: 8px; overflow: hidden; padding: 10px; }
.card img, .card video { width: 100%; height: 220px; object-fit: contain; background: #000; }
.card p { font-size: 11px; word-break: break-all; margin: 8px 0 0; }
</style>
</head>
<body>
<h1>WhatsApp Uploaded Media</h1>
<h2>Images (Total: """ + str(len(images)) + """)</h2>
<div class="grid">
"""

for img in images:
    html += f'<div class="card"><img src="../{img}"><p>{img}</p></div>\n'

html += """</div>
<h2>Videos (Total: """ + str(len(videos)) + """)</h2>
<div class="grid">
"""

for vid in videos:
    html += f'<div class="card"><video controls src="../{vid}"></video><p>{vid}</p></div>\n'

html += """</div></body></html>"""

with open('scratch/gallery.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Created scratch/gallery.html")
