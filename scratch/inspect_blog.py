import re

with open(r'C:\Users\ibe88\.gemini\antigravity-ide\brain\bb3c093e-09c6-4c19-a8dc-85efa90fe8b1\.system_generated\steps\78\content.md', 'r', encoding='utf-8') as f:
    text = f.read()

print('Length of blog page:', len(text))
posts = re.findall(r'(/post/[a-zA-Z0-9_\-]+)', text)
print('Blog post links found on /blog:')
for p in sorted(set(posts)):
    print('  ', p)

# Check titles or headings
titles = re.findall(r'<h[1-4][^>]*>([^<]+)</h[1-4]>', text)
print('\nHeadings on blog page:')
for t in titles[:20]:
    print('  ', t.strip())
