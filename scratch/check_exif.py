import os
import glob
from PIL import Image
from PIL.ExifTags import TAGS

for f in sorted(glob.glob('WhatsApp Image*.jpeg')):
    try:
        im = Image.open(f)
        info = f"{f}: size={im.size}"
        exif = im.getexif()
        if exif:
            exif_dict = {TAGS.get(k, k): v for k, v in exif.items() if k in TAGS}
            info += f" exif={exif_dict}"
        print(info)
    except Exception as e:
        print(f"{f}: error {e}")
