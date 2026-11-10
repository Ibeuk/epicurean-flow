import shutil
import os

os.makedirs('images', exist_ok=True)
os.makedirs('videos', exist_ok=True)

brain_dir = r"C:\Users\ibe88\.gemini\antigravity-ide\brain\d639e01c-68e6-41fb-9958-909a6e5de97e"

file_map = {
    os.path.join(brain_dir, "tofu_satay_dish_1790294135186.jpg"): "images/tofu-satay-dish.jpg",
    os.path.join(brain_dir, "stuffed_peppers_dish_1790294176535.jpg"): "images/stuffed-bell-peppers.jpg",
    os.path.join(brain_dir, "banana_cake_dish_1790294225864.jpg"): "images/banana-cake.jpg",
    "WhatsApp Image 2026-09-24 at 6.51.18 AM.jpeg": "images/seafood-crab-platter.jpg",
    "WhatsApp Image 2026-09-24 at 6.59.16 AM (1).jpeg": "images/pan-seared-fish-chef-eliane.jpg",
    "WhatsApp Image 2026-09-24 at 6.59.17 AM.jpeg": "images/hero-chef-eliane-new.jpg",
    "WhatsApp Image 2026-09-24 at 6.59.33 AM.jpeg": "images/chef-eliane-kneading-dough.jpg",
    "WhatsApp Image 2026-09-24 at 6.51.25 AM (2).jpeg": "images/chef-eliane-terrace-dough.jpg",
    "WhatsApp Image 2026-09-24 at 6.59.32 AM (1).jpeg": "images/mise-en-place-prep.jpg",
    "WhatsApp Image 2026-09-24 at 6.59.33 AM (2).jpeg": "images/mediterranean-mezze-platter.jpg",
    "WhatsApp Image 2026-09-24 at 6.59.32 AM (6).jpeg": "images/roasted-tomato-basil-soup.jpg",
    "WhatsApp Image 2026-09-24 at 6.59.32 AM.jpeg": "images/lemon-herb-roasted-chicken.jpg",
    "WhatsApp Image 2026-09-24 at 6.59.32 AM (2).jpeg": "images/grilled-lamb-chops.jpg",
    "WhatsApp Image 2026-09-24 at 6.59.32 AM (4).jpeg": "images/zucchini-feta-fritters.jpg",
    "WhatsApp Image 2026-09-24 at 6.59.32 AM (5).jpeg": "images/chicken-souvlaki-skewers.jpg",
    "WhatsApp Image 2026-09-24 at 6.59.33 AM (1).jpeg": "images/polenta-blistered-tomatoes.jpg",
    "WhatsApp Image 2026-09-24 at 6.59.33 AM (3).jpeg": "images/apricot-galette.jpg",
    "WhatsApp Image 2026-09-24 at 6.59.33 AM (4).jpeg": "images/spaghetti-meatballs.jpg",
    "WhatsApp Image 2026-09-24 at 6.59.33 AM (5).jpeg": "images/handmade-ravioli.jpg",
    "WhatsApp Image 2026-09-24 at 6.59.16 AM (2).jpeg": "images/fresh-pasta-machine.jpg",
    "WhatsApp Image 2026-09-24 at 6.59.16 AM.jpeg": "images/sliced-gourmet-steak.jpg",
    "WhatsApp Image 2026-09-24 at 6.51.26 AM (2).jpeg": "images/food-tour-tapas-bodega.jpg",
    "WhatsApp Image 2026-09-24 at 6.51.25 AM (1).jpeg": "images/digital-learning-setup.jpg",
    "WhatsApp Image 2026-09-24 at 7.08.08 AM (1).jpeg": "images/diabetes-friendly-kitchen-official-cover.jpg",
    "WhatsApp Image 2026-09-24 at 7.20.13 AM.jpeg": "images/cook-with-confidence-malaga-banner.jpg",
    "WhatsApp Image 2026-09-24 at 7.08.08 AM.jpeg": "images/three-cookbooks-collection-banner.jpg",
    "WhatsApp Video 2026-09-24 at 6.51.25 AM.mp4": "videos/chef-reel-cooking.mp4",
    "WhatsApp Video 2026-09-24 at 6.59.32 AM.mp4": "videos/gourmet-plate-reel.mp4",
    "WhatsApp Video 2026-09-24 at 6.51.25 AM_frame200.jpg": "images/chef-reel-cooking-thumb.jpg",
    "WhatsApp Video 2026-09-24 at 6.59.32 AM_frame300.jpg": "images/gourmet-plate-reel-thumb.jpg"
}

for src, dst in file_map.items():
    if os.path.exists(src):
        shutil.copy2(src, dst)
        print(f"Copied {src} -> {dst}")
    else:
        print(f"NOT FOUND: {src}")

# Also copy official diabetes kitchen cover to overwrite old mockup if needed
shutil.copy2("images/diabetes-friendly-kitchen-official-cover.jpg", "images/diabetes-kitchen-cover.jpg")
print("Updated images/diabetes-kitchen-cover.jpg with official approved cover")
