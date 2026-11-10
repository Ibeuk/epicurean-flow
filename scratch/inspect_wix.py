import re, json

with open(r'C:\Users\ibe88\.gemini\antigravity-ide\brain\bb3c093e-09c6-4c19-a8dc-85efa90fe8b1\.system_generated\steps\62\content.md', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's find all URLs or paths on the Wix site
urls = set(re.findall(r'https://epicureanflow\.wixsite\.com/epicurean-flow(/[a-zA-Z0-9_\-\./]+)', text))
print('URLs found under epicurean-flow:')
for u in sorted(urls):
    print('  ', u)

# Search for masterPage or navigation structure
print('\nNavigation/page titles in text:')
titles = re.findall(r'"title"\s*:\s*"([^"]+)"', text)
for t in set(titles):
    if len(t) < 40 and not t.startswith('specs.'):
        print('  Title:', t)

print('\nBlog references:')
blog_matches = re.findall(r'(/post/[a-zA-Z0-9_\-]+|/blog[a-zA-Z0-9_\-/]*)', text)
for b in sorted(set(blog_matches)):
    print('  Blog match:', b)
