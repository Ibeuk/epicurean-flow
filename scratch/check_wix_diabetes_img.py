import re

with open(r'C:\Users\ibe88\.gemini\antigravity-ide\brain\bb3c093e-09c6-4c19-a8dc-85efa90fe8b1\.system_generated\steps\84\content.md', 'r', encoding='utf-8') as f:
    text = f.read()

imgs = re.findall(r'https://static\.wixstatic\.com/media/[^\s"\'<>]+\.(?:png|jpg|jpeg)', text)
for i in set(imgs):
    if '8e85e1' in i:
        print('Live Wix image for Diabetes book:', i)
