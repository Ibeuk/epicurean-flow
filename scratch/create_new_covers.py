import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

brain_dir = r"C:\Users\ibe88\.gemini\antigravity-ide\brain\5f5f76d6-75b9-4392-9cb0-1c996b1705ca"
images_dir = r"c:\Users\ibe88\Downloads\Epicurean Flow\images"

covers_to_make = [
    {
        "filename": "the-christmas-recipe-collection-cover.jpg",
        "bg": os.path.join(brain_dir, "christmas_recipes_bg_1790055958835.jpg"),
        "title": "The Christmas Recipe\nCollection",
        "subtitle": "Traditional & Modern Festive Classics",
        "tag": "EPICUREAN FLOW • FESTIVE SPECIAL",
        "author": "Chef Eliane Muskus",
        "accent": (212, 175, 55) # Gold
    },
    {
        "filename": "christmas-in-paris-cover.jpg",
        "bg": os.path.join(brain_dir, "paris_holiday_bg_1790056027445.jpg"),
        "title": "Christmas in Paris",
        "subtitle": "The French Holiday Table",
        "tag": "EPICUREAN FLOW • CULINARY EDITIONS",
        "author": "Chef Eliane Muskus",
        "accent": (212, 175, 55)
    },
    {
        "filename": "ditch-the-cheese-ball-cover.jpg",
        "bg": os.path.join(brain_dir, "ditch_appetizers_bg_1790056093624.jpg"),
        "title": "Ditch the Cheese Ball",
        "subtitle": "10 Holiday Appetizers That Steal the Show",
        "tag": "EPICUREAN FLOW • ENTERTAINING",
        "author": "Chef Eliane Muskus",
        "accent": (212, 175, 55)
    },
    {
        "filename": "taste-of-southern-europe-cover.jpg",
        "bg": os.path.join(images_dir, "malaga-terrace-dining.jpg"),
        "title": "A Taste of\nSouthern Europe",
        "subtitle": "20 Budget-Friendly Mediterranean Recipes",
        "tag": "EPICUREAN FLOW • EVERYDAY GOURMET",
        "author": "Chef Eliane Muskus",
        "accent": (212, 175, 55)
    },
    {
        "filename": "soup-cookbook-cover.jpg",
        "bg": os.path.join(images_dir, "course-diabetes-masterclass.jpg"),
        "title": "The Artisan\nSoup Cookbook",
        "subtitle": "Nourishing Broths, Velvety Purees & Wholesome Bowls",
        "tag": "EPICUREAN FLOW • COMFORT GASTRONOMY",
        "author": "Chef Eliane Muskus",
        "accent": (212, 175, 55)
    },
    {
        "filename": "course-beginners-cooking-cover.jpg",
        "bg": os.path.join(images_dir, "intermediate-cooking-techniques-cover.jpg"),
        "title": "Beginners’ Cooking\nCourse",
        "subtitle": "Essential Kitchen Foundations, Knife Skills & Flavor",
        "tag": "EPICUREAN FLOW • CULINARY ACADEMY",
        "author": "Chef Eliane Muskus",
        "accent": (212, 175, 55)
    }
]

def make_cover(spec):
    target_w, target_h = 800, 1104 # Standard 1 : 1.38 ratio
    
    # Load background or fallback
    if os.path.exists(spec["bg"]):
        img = Image.open(spec["bg"]).convert("RGBA")
        # Crop to target aspect ratio
        img_w, img_h = img.size
        target_ratio = target_w / target_h
        current_ratio = img_w / img_h
        if current_ratio > target_ratio:
            new_w = int(img_h * target_ratio)
            left = (img_w - new_w) // 2
            img = img.crop((left, 0, left + new_w, img_h))
        else:
            new_h = int(img_w / target_ratio)
            top = (img_h - new_h) // 2
            img = img.crop((0, top, img_w, top + new_h))
        img = img.resize((target_w, target_h), Image.Resampling.LANCZOS)
    else:
        img = Image.new("RGBA", (target_w, target_h), (28, 25, 23, 255))
        
    # Dark luxury vignette overlay
    overlay = Image.new("RGBA", (target_w, target_h), (0, 0, 0, 0))
    d_overlay = ImageDraw.Draw(overlay)
    
    # Top banner gradient
    for y in range(320):
        alpha = int(220 * (1 - y / 320))
        d_overlay.line([(0, y), (target_w, y)], fill=(15, 12, 10, alpha))
        
    # Bottom banner gradient
    for y in range(target_h - 260, target_h):
        alpha = int(230 * ((y - (target_h - 260)) / 260))
        d_overlay.line([(0, y), (target_w, y)], fill=(15, 12, 10, alpha))
        
    # Border
    d_overlay.rectangle([(20, 20), (target_w - 20, target_h - 20)], outline=(212, 175, 55, 180), width=2)
    d_overlay.rectangle([(26, 26), (target_w - 26, target_h - 26)], outline=(212, 175, 55, 90), width=1)
    
    img = Image.alpha_composite(img, overlay)
    draw = ImageDraw.Draw(img)
    
    # Fonts
    try:
        font_tag = ImageFont.truetype("arial.ttf", 18)
        font_title = ImageFont.truetype("georgia.ttf", 52)
        font_sub = ImageFont.truetype("georgia.ttf", 24)
        font_author = ImageFont.truetype("georgia.ttf", 26)
    except:
        font_tag = font_title = font_sub = font_author = ImageFont.load_default()
        
    # Draw Tag
    tag_text = spec["tag"]
    draw.text((target_w // 2, 65), tag_text, font=font_tag, fill=(212, 175, 55, 255), anchor="mm")
    draw.line([(target_w // 2 - 120, 85), (target_w // 2 + 120, 85)], fill=(212, 175, 55, 180), width=1)
    
    # Draw Title
    title_text = spec["title"]
    draw.text((target_w // 2, 160), title_text, font=font_title, fill=(255, 250, 240, 255), anchor="mm", align="center")
    
    # Draw Subtitle
    sub_text = spec["subtitle"]
    draw.text((target_w // 2, 235), sub_text, font=font_sub, fill=(230, 220, 200, 240), anchor="mm", align="center")
    
    # Draw Author
    draw.line([(target_w // 2 - 80, target_h - 115), (target_w // 2 + 80, target_h - 115)], fill=(212, 175, 55, 160), width=1)
    draw.text((target_w // 2, target_h - 80), spec["author"], font=font_author, fill=(255, 250, 240, 255), anchor="mm")
    draw.text((target_w // 2, target_h - 50), "FORMER MICHELIN-ACCREDITED CHEF", font=font_tag, fill=(212, 175, 55, 220), anchor="mm")
    
    out_path = os.path.join(images_dir, spec["filename"])
    img.convert("RGB").save(out_path, quality=95)
    print(f"Generated {out_path}")

for spec in covers_to_make:
    make_cover(spec)
