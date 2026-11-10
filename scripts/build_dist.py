import os
import shutil

DIST_DIR = 'dist'

def build():
    if os.path.exists(DIST_DIR):
        shutil.rmtree(DIST_DIR)
    os.makedirs(DIST_DIR)

    # 1. Copy HTML pages (excluding bundles or scratch files)
    for f in os.listdir('.'):
        if f.endswith('.html') and not f.startswith('wix-bundle') and not f.startswith('scratch'):
            shutil.copy2(f, os.path.join(DIST_DIR, f))
            print(f"Copied {f} to {DIST_DIR}/")

    # 2. Copy asset folders
    for folder in ['css', 'js', 'images']:
        if os.path.exists(folder):
            dest = os.path.join(DIST_DIR, folder)
            shutil.copytree(folder, dest)
            print(f"Copied {folder}/ to {dest}/")

    # 3. Copy videos if exists (ignoring raw 4k master backups)
    if os.path.exists('videos'):
        dest = os.path.join(DIST_DIR, 'videos')
        shutil.copytree('videos', dest, ignore=shutil.ignore_patterns('*4k*', '*.bak', '*.tmp'))
        print(f"Copied videos/ to {dest}/ (excluding raw 4k master)")

    # 4. Copy sitemap, robots, and icons if present
    for extra in ['sitemap.xml', 'robots.txt', 'favicon.ico']:
        if os.path.exists(extra):
            shutil.copy2(extra, os.path.join(DIST_DIR, extra))
            print(f"Copied {extra} to {DIST_DIR}/")

    print("\n[SUCCESS] dist/ directory successfully assembled for Wix Headless deployment!")

if __name__ == '__main__':
    build()
