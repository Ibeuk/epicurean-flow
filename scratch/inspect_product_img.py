import re

with open(r'C:\Users\ibe88\.gemini\antigravity-ide\brain\bb3c093e-09c6-4c19-a8dc-85efa90fe8b1\.system_generated\steps\84\content.md', 'r', encoding='utf-8') as f:
    text = f.read()

for m in re.findall(r'static\.wixstatic\.com/media/[a-zA-Z0-9_~]+\.(?:jpg|png|jpeg)', text):
    if not '11062b' in m and not '01c3af' in m:
        print('Real Media item:', m)
