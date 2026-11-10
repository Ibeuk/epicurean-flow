import os
import shutil

if os.path.exists('dist'):
    shutil.rmtree('dist')
os.makedirs('dist', exist_ok=True)

with open('dist/index.html', 'w', encoding='utf-8') as f:
    f.write('<!DOCTYPE html>\n<html>\n<head>\n  <meta name="robots" content="noindex, nofollow">\n  <title>Offline</title>\n</head>\n<body>\n</body>\n</html>')

print("Created blank offline dist successfully!")
