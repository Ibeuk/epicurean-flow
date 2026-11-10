import os

def clean_media():
    with open('media.html', 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace('data-video-link="https://epicureanflow.wixsite.com/epicurean-flow/media"', 'data-video-link="courses.html"')
    content = content.replace('href="https://epicureanflow.wixsite.com/epicurean-flow/media"', 'href="courses.html"')
    content = content.replace("'https://epicureanflow.wixsite.com/epicurean-flow/media'", "'courses.html'")
    content = content.replace('Watch Full HD Video on Wix Cinema &rarr;', 'Watch Masterclass Video Lessons &rarr;')
    with open('media.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Cleaned media.html")

def clean_sitemap():
    with open('sitemap.xml', 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace('https://epicureanflow.wixsite.com/epicurean-flow/', 'https://epicureanflow.com/')
    with open('sitemap.xml', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Cleaned sitemap.xml")

def clean_robots():
    with open('robots.txt', 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace('https://epicureanflow.wixsite.com/epicurean-flow/', 'https://epicureanflow.com/')
    with open('robots.txt', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Cleaned robots.txt")

if __name__ == '__main__':
    clean_media()
    clean_sitemap()
    clean_robots()
