import urllib.request
import re

headers = {'User-Agent': 'Mozilla/5.0'}
url = 'https://epicureanflow.wixsite.com/epicurean-flow/'
html = urllib.request.urlopen(urllib.request.Request(url, headers=headers), timeout=10).read().decode('utf-8', errors='ignore')

print('Facebook:', set(re.findall(r'https?://[^"\'<>\s]*facebook[^"\'<>\s]*', html)))
print('Instagram:', set(re.findall(r'https?://[^"\'<>\s]*instagram[^"\'<>\s]*', html)))
print('LinkedIn:', set(re.findall(r'https?://[^"\'<>\s]*linkedin[^"\'<>\s]*', html)))
print('TikTok:', set(re.findall(r'https?://[^"\'<>\s]*tiktok[^"\'<>\s]*', html)))
print('Pinterest:', set(re.findall(r'https?://[^"\'<>\s]*(?:pinterest|pin\.it)[^"\'<>\s]*', html)))

