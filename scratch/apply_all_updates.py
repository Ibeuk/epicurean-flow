import os
import re

ROOT = r"c:\Users\ibe88\Downloads\Epicurean Flow"

def update_file(filename, updater_fn):
    filepath = os.path.join(ROOT, filename)
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    new_content = updater_fn(content)
    if new_content != content:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"SUCCESS: Updated {filename}")
    else:
        print(f"NOTE: No changes in {filename}")

# Unified Footer Contact Block
FOOTER_CONTACT_REPLACEMENT = """          <div class="footer-contact-info" style="font-size: 0.875rem; color: rgba(245, 240, 231, 0.78); margin-top: 14px;">
            <p style="color: rgba(245, 240, 231, 0.78); margin-bottom: 4px; font-weight: 600;">Epicurean Flow</p>
            <p style="color: rgba(245, 240, 231, 0.78); margin-bottom: 4px;">Sierra Grazalema 23<br>29016 Málaga, Spain</p>
            <p style="color: rgba(245, 240, 231, 0.78); margin-bottom: 4px;">WhatsApp: <a href="https://wa.me/31618571677" style="color: var(--color-gold);">+ 31618571677</a></p>
            <p style="color: rgba(245, 240, 231, 0.78); margin-bottom: 4px;">Telephone Spain: <a href="tel:+34626617282" style="color: var(--color-gold);">+34626617282</a></p>
            <p style="color: rgba(245, 240, 231, 0.78); margin-bottom: 0;">Email: <a href="mailto:info@epicureanflow.com" style="color: var(--color-gold);">info@epicureanflow.com</a></p>
          </div>"""

def standardize_footer_contact(content):
    # Pattern matching existing .footer-contact-info block
    pattern = r'<div class="footer-contact-info"[^>]*>[\s\S]*?<\/div>'
    if re.search(pattern, content):
        content = re.sub(pattern, FOOTER_CONTACT_REPLACEMENT.strip(), content, count=1)
    
    # Replace Amsterdam registration in footer-bottom
    content = re.sub(
        r'Business Registration number:\s*94886792\s*&bull;\s*Amsterdam,\s*The Netherlands',
        'Business Registration: 94886792 &bull; Málaga, Spain',
        content
    )
    content = re.sub(
        r'Registration 94886792\s*&bull;\s*Amsterdam,\s*The Netherlands',
        'Registration 94886792 &bull; Sierra Grazalema 23, 29016 Málaga, Spain',
        content
    )
    return content

# --------------------------------------------------------------------------
# 1. Update contact.html
# --------------------------------------------------------------------------
def update_contact_html(c):
    # Meta description
    c = re.sub(
        r'<meta name="description" content="[^"]*Amsterdam[^"]*"',
        '<meta name="description" content="Epicurean Flow, Sierra Grazalema 23, 29016 Málaga, Spain. WhatsApp: +31 6 18571677, Telephone Spain: +34 626 617 282. Reach out for masterclasses, cookbooks, or consultations."',
        c
    )
    
    # Headquarters location card
    old_location = r'<strong style="display: block; font-size: 0\.95rem; color: var\(--color-ink\);">Location<\/strong>\s*<p style="font-size: 0\.92rem; color: var\(--color-ink-subtle\); line-height: 1\.5;">Amsterdam \(Zuidas\) 1082MZ<br>The Netherlands<\/p>'
    new_location = """<strong style="display: block; font-size: 0.95rem; color: var(--color-ink);">Location &amp; Studio</strong>
                  <p style="font-size: 0.92rem; color: var(--color-ink-subtle); line-height: 1.5;">
                    Epicurean Flow<br>
                    Sierra Grazalema 23<br>
                    29016 Málaga, Spain
                  </p>"""
    c = re.sub(old_location, new_location, c)

    # Insert Spanish phone item if not present
    if "+34626617282" not in c and "+34 626 617 282" not in c:
        phone_html = """              <div class="contact-channel-item">
                <div class="contact-icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <strong style="display: block; font-size: 0.95rem; color: var(--color-ink);">Telephone (Spain)</strong>
                  <a href="tel:+34626617282" style="font-size: 0.92rem; color: var(--color-gold); text-decoration: none;">+34 626 617 282</a>
                </div>
              </div>\n"""
        c = c.replace('<!-- Form Column -->', phone_html + '          </div>\n\n          <!-- Form Column -->', 1)
        # remove extra </div> if needed
        c = c.replace('</div>\n          </div>\n\n          <!-- Form Column -->', '</div>\n          <!-- Form Column -->')

    c = standardize_footer_contact(c)
    return c

# --------------------------------------------------------------------------
# 2. Update privacy-policy.html
# --------------------------------------------------------------------------
def update_privacy_html(c):
    c = re.sub(r'Amsterdam Zuidas, The Netherlands', 'Sierra Grazalema 23, 29016 Málaga, Spain', c)
    c = re.sub(r'with headquarters at Amsterdam \(Zuidas\) 1082MZ, The Netherlands', 'located at Sierra Grazalema 23, 29016 Málaga, Spain', c)
    
    # Section 6 Contact Details
    old_contact = r'<h2>6\. Contact Details<\/h2>\s*<p>[\s\S]*?<\/p>'
    new_contact = """<h2>6. Contact Details</h2>
          <p>
            Epicurean Flow<br>
            Sierra Grazalema 23<br>
            29016 Málaga<br>
            Spain<br>
            WhatsApp: + 31618571677<br>
            Telephone Spain: +34626617282<br>
            Business Registration: 94886792<br>
            Email: <a href="mailto:info@epicureanflow.com" style="color: var(--color-gold);">info@epicureanflow.com</a>
          </p>"""
    c = re.sub(old_contact, new_contact, c)
    c = standardize_footer_contact(c)
    return c

# --------------------------------------------------------------------------
# 3. Update terms.html
# --------------------------------------------------------------------------
def update_terms_html(c):
    c = re.sub(r'Amsterdam, The Netherlands', 'Sierra Grazalema 23, 29016 Málaga, Spain', c)
    c = re.sub(
        r'exclusive jurisdiction of the courts of Amsterdam',
        'exclusive jurisdiction of the competent courts of Málaga, Spain',
        c
    )
    old_contact = r'<h2>6\. Applicable Law<\/h2>\s*<p>[\s\S]*?<\/p>'
    new_contact = """<h2>6. Applicable Law &amp; Contact Details</h2>
          <p>
            These terms are governed by and construed in accordance with applicable laws. Any inquiries or notices should be addressed to:<br><br>
            Epicurean Flow<br>
            Sierra Grazalema 23<br>
            29016 Málaga<br>
            Spain<br>
            WhatsApp: + 31618571677<br>
            Telephone Spain: +34626617282<br>
            Email: <a href="mailto:info@epicureanflow.com" style="color: var(--color-gold);">info@epicureanflow.com</a><br>
            Business Registration: 94886792
          </p>"""
    c = re.sub(old_contact, new_contact, c)
    c = standardize_footer_contact(c)
    return c

# --------------------------------------------------------------------------
# 4. Update refund-policy.html
# --------------------------------------------------------------------------
def update_refund_html(c):
    c = re.sub(r'Amsterdam, The Netherlands', 'Sierra Grazalema 23, 29016 Málaga, Spain', c)
    old_contact = r'<h2>5\. Contact Our Support Team<\/h2>\s*<p>[\s\S]*?<\/p>'
    new_contact = """<h2>5. Contact Our Support Team</h2>
          <p>
            If you have any questions regarding your order or would like to request assistance, please write to:<br>
            <strong>Epicurean Flow Support</strong><br>
            Sierra Grazalema 23<br>
            29016 Málaga<br>
            Spain<br>
            WhatsApp: + 31618571677<br>
            Telephone Spain: +34626617282<br>
            Email: <a href="mailto:info@epicureanflow.com" style="color: var(--color-gold);">info@epicureanflow.com</a>
          </p>"""
    c = re.sub(old_contact, new_contact, c)
    c = standardize_footer_contact(c)
    return c

# --------------------------------------------------------------------------
# 5. Update courses.html (Item 2 & Item 8)
# --------------------------------------------------------------------------
def update_courses_html(c):
    # Item 2: Remove duplicated statement
    # Old hero subtitle:
    # "We don’t just teach recipes; we deliver a complete cooking experience with features you won’t find elsewhere. Master the essentials in 7 days or advance to Michelin-level technique."
    c = c.replace(
        "We don’t just teach recipes; we deliver a complete cooking experience with features you won’t find elsewhere. Master the essentials in 7 days or advance to Michelin-level technique.",
        "Master the essentials in 7 days or advance to Michelin-level technique with immersive, step-by-step culinary masterclasses."
    )
    
    # Old heading: "Unique Selling Points for Interactive Cooking Courses"
    # New heading: "What Makes Our Courses Different"
    c = c.replace(
        "Unique Selling Points for Interactive Cooking Courses",
        "What Makes Our Courses Different"
    )

    # Replace Emojis in USP cards with elegant SVG Badges
    # 🎯 Step-by-Step Clarity
    c = re.sub(
        r'<div style="font-size: 2rem; margin-bottom: 16px;">🎯<\/div>',
        """<div class="usp-icon-badge" style="width: 52px; height: 52px; border-radius: 50%; background: rgba(188, 145, 66, 0.12); color: var(--color-gold); display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
            </div>""",
        c
    )
    
    # 🌍 Global Inspiration
    c = re.sub(
        r'<div style="font-size: 2rem; margin-bottom: 16px;">🌍<\/div>',
        """<div class="usp-icon-badge" style="width: 52px; height: 52px; border-radius: 50%; background: rgba(188, 145, 66, 0.12); color: var(--color-gold); display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </div>""",
        c
    )
    
    # ⚡ Interactive Features
    c = re.sub(
        r'<div style="font-size: 2rem; margin-bottom: 16px;">⚡<\/div>',
        """<div class="usp-icon-badge" style="width: 52px; height: 52px; border-radius: 50%; background: rgba(188, 145, 66, 0.12); color: var(--color-gold); display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>""",
        c
    )
    
    # 📖 Comprehensive Resources
    c = re.sub(
        r'<div style="font-size: 2rem; margin-bottom: 16px;">📖<\/div>',
        """<div class="usp-icon-badge" style="width: 52px; height: 52px; border-radius: 50%; background: rgba(188, 145, 66, 0.12); color: var(--color-gold); display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            </div>""",
        c
    )
    
    # 🤝 Community Support
    c = re.sub(
        r'<div style="font-size: 2rem; margin-bottom: 16px;">🤝<\/div>',
        """<div class="usp-icon-badge" style="width: 52px; height: 52px; border-radius: 50%; background: rgba(188, 145, 66, 0.12); color: var(--color-gold); display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>""",
        c
    )
    
    # 🏆 Certified Accomplishment
    c = re.sub(
        r'<div style="font-size: 2rem; margin-bottom: 16px;">🏆<\/div>',
        """<div class="usp-icon-badge" style="width: 52px; height: 52px; border-radius: 50%; background: rgba(188, 145, 66, 0.12); color: var(--color-gold); display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
            </div>""",
        c
    )
    
    # Student community circle emoji -> SVG
    c = c.replace(
        "<span>👥 Student Community Circle</span>",
        """<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><span>Student Community Circle</span>"""
    )
    
    # Item 8: Clarify Course 5 description and CTA button
    old_course5_desc = "Unlock the secrets to flavorful and healthy cooking in our Diabetes Cooking Course! This interactive experience focuses on essential culinary techniques and practical strategies that empower you to create satisfying meals while managing diabetes. With a selection of delicious recipes included, you’ll learn how to make informed ingredient choices and master cooking methods that enhance taste and nutrition. Plus, combine this course with The Diabetes-Friendly Kitchen cookbook for a comprehensive culinary toolkit that encourages you to enjoy every meal without compromise."
    new_course5_desc = "Master the secrets of nutritious, flavor-packed dining in our self-paced Diabetes Cooking Course. This structured video program focuses on core culinary techniques, kitchen strategies, and ingredient substitutions that empower you to prepare satisfying meals while managing blood sugar with confidence. (For companion printed recipes, explore our standalone cookbook, <em>The Diabetes-Friendly Kitchen</em>)."
    c = c.replace(old_course5_desc, new_course5_desc)
    c = c.replace("START YOUR COOKING JOURNEY &bull; €49.00", "ENROLL IN COURSE &bull; €49.00")
    
    c = standardize_footer_contact(c)
    return c

# --------------------------------------------------------------------------
# 6. Update recipes.html (Item 3, 4, 6)
# --------------------------------------------------------------------------
def update_recipes_html(c):
    # Recipe 2: Replace book cover with dish image
    c = c.replace(
        '<img src="images/thanksgiving-guide-cover.jpg" alt="Sous Vide Turkey Breast">',
        '<img src="images/lemon-herb-roasted-chicken.jpg" alt="Sous Vide Herb Turkey Breast">'
    )
    
    # Recipe 4: Replace generic typography with seafood plate
    c = re.sub(
        r'<img src="https:\/\/static\.wixstatic\.com\/media\/30dece_296a2da8c7bc41e38a13027d5a22dab2~mv2\.jpg[^"]*" alt="Sarde in Saor Venetian Sardines">',
        '<img src="images/seafood-crab-platter.jpg" alt="Sarde in Saor Venetian Seafood">',
        c
    )
    
    # Recipe 6: Replace spice mix with meatballs dish
    c = re.sub(
        r'<img src="https:\/\/static\.wixstatic\.com\/media\/30dece_e2aa58069aa245689abd1c1db9c7efd1~mv2\.jpg[^"]*" alt="Succulent Meatballs with Silky Smooth Gravy">',
        '<img src="images/spaghetti-meatballs.jpg" alt="Succulent Meatballs with Silky Smooth Gravy">',
        c
    )
    
    # Star Recipe Feature: Replace foie gras image with banana cake
    c = re.sub(
        r'<img src="https:\/\/static\.wixstatic\.com\/media\/8e85e1_06c405184e654ab7845eee7980e6d23d~mv2\.jpg[^"]*" alt="Healthy Banana Cake for Diabetics" class="recipe-detail-img">',
        '<img src="images/banana-cake.jpg" alt="Diabetes-Friendly Banana Cake" class="recipe-detail-img">',
        c
    )
    
    # Rename title
    c = c.replace(
        "Healthy Banana Cake Recipe for Diabetics",
        "Diabetes-Friendly Banana Cake"
    )
    
    # Update subtitle from Cannes, Amsterdam to Cannes, Málaga
    c = c.replace(
        "Curated dishes from Cannes, Amsterdam, and the Mediterranean basin.",
        "Curated dishes from Cannes, Málaga, and the Mediterranean basin."
    )
    
    c = standardize_footer_contact(c)
    return c

# --------------------------------------------------------------------------
# 7. Update diabetes.html (Item 3, 4, 7, 8)
# --------------------------------------------------------------------------
def update_diabetes_html(c):
    # Title & meta
    c = c.replace(
        "<title>Banana Cake Recipe for Diabetics & More Low-Carb Meals by Chef Eliane | Epicurean Flow</title>",
        "<title>Diabetes-Friendly Banana Cake & Low-Carb Gourmet Cuisine | Epicurean Flow</title>"
    )
    c = c.replace(
        'content="Discover banana cake recipe for diabetics and more! Chef Eliane crafts low-carb dishes for diabetes-friendly living. Try banana cake recipe for diabetics."',
        'content="Discover Diabetes-Friendly Banana Cake and low-carb gourmet dishes by Chef Eliane Muskus. Wholesome ingredients and bold Mediterranean flavor."'
    )

    # Card 3: Replace generic spice mix with stuffed bell peppers
    c = re.sub(
        r'<img src="https:\/\/static\.wixstatic\.com\/media\/30dece_e2aa58069aa245689abd1c1db9c7efd1~mv2\.jpg[^"]*" alt="Stuffed Bell Peppers with Bulgur, Feta & Herbs">',
        '<img src="images/stuffed-bell-peppers.jpg" alt="Stuffed Bell Peppers with Bulgur, Feta & Herbs">',
        c
    )

    # Card 4: Replace generic typography with seafood platter
    c = re.sub(
        r'<img src="https:\/\/static\.wixstatic\.com\/media\/30dece_296a2da8c7bc41e38a13027d5a22dab2~mv2\.jpg[^"]*" alt="Mediterranean Stuffed Calamari">',
        '<img src="images/seafood-crab-platter.jpg" alt="Mediterranean Stuffed Calamari & Seafood">',
        c
    )

    # Star Recipe Feature: Foie gras -> banana cake
    c = re.sub(
        r'<img src="https:\/\/static\.wixstatic\.com\/media\/8e85e1_06c405184e654ab7845eee7980e6d23d~mv2\.jpg[^"]*" alt="Healthy Banana Cake for Diabetics" class="recipe-detail-img">',
        '<img src="images/banana-cake.jpg" alt="Diabetes-Friendly Banana Cake" class="recipe-detail-img">',
        c
    )
    c = c.replace(
        '<h2 class="section-title">Healthy Banana Cake Recipe for Diabetics</h2>',
        '<h2 class="section-title">Diabetes-Friendly Banana Cake</h2>'
    )

    # Item 8: Clarify course card description and button
    old_course5_desc = "Unlock the secrets to flavorful and healthy cooking in our Diabetes Cooking Course! This interactive experience focuses on essential culinary techniques and practical strategies that empower you to create satisfying meals while managing diabetes. With a selection of delicious recipes included, you’ll learn how to make informed ingredient choices and master cooking methods that enhance taste and nutrition. Plus, combine this course with The Diabetes-Friendly Kitchen cookbook for a comprehensive culinary toolkit that encourages you to enjoy every meal without compromise."
    new_course5_desc = "Master the secrets of nutritious, flavor-packed dining in our self-paced Diabetes Cooking Course. This structured video program focuses on core culinary techniques, kitchen strategies, and ingredient substitutions that empower you to prepare satisfying meals while managing blood sugar with confidence. (For companion printed recipes, explore our standalone cookbook, <em>The Diabetes-Friendly Kitchen</em>)."
    c = c.replace(old_course5_desc, new_course5_desc)
    c = c.replace("START YOUR COOKING JOURNEY &bull; €49.00", "ENROLL IN COURSE &bull; €49.00")

    # Spotlight book cover
    c = c.replace(
        'images/diabetes-kitchen-cover.jpg',
        'images/diabetes-friendly-kitchen-official-cover.jpg'
    )

    c = standardize_footer_contact(c)
    return c

# --------------------------------------------------------------------------
# 8. Update nutrition.html (Item 3)
# --------------------------------------------------------------------------
def update_nutrition_html(c):
    # Dish 2: Vegan Tofu Satay -> Replace cropped logo with real dish image
    c = re.sub(
        r'<img src="https:\/\/static\.wixstatic\.com\/media\/8e85e1_3f5245da684548df89b77ecb97a66fff%7Emv2\.png[^"]*" alt="Vegan Tofu Satay">',
        '<img src="images/tofu-satay-dish.jpg" alt="Vegan Tofu Satay with Warm Peanut Sauce">',
        c
    )

    # Dish 3: Tabouleh -> Replace spice mix with mezze platter
    c = re.sub(
        r'<img src="https:\/\/static\.wixstatic\.com\/media\/30dece_e2aa58069aa245689abd1c1db9c7efd1~mv2\.jpg[^"]*" alt="Chef’s Mediterranean Tabouleh with a Twist">',
        '<img src="images/mediterranean-mezze-platter.jpg" alt="Chef’s Mediterranean Tabouleh & Mezze Platter">',
        c
    )

    c = standardize_footer_contact(c)
    return c

# --------------------------------------------------------------------------
# 9. Update media.html (Item 9)
# --------------------------------------------------------------------------
def update_media_html(c):
    # Fix Crème Brûlée card thumbnail
    c = re.sub(
        r'data-video-thumb="https:\/\/static\.wixstatic\.com\/media\/30dece_fcfa16bac6d14050b74009e84df8977af002\.jpg[^"]*"',
        'data-video-thumb="images/apricot-galette.jpg" data-video-src="videos/gourmet-plate-reel.mp4" data-course-link="courses.html#beginners-baking"',
        c
    )
    c = re.sub(
        r'<img src="https:\/\/static\.wixstatic\.com\/media\/30dece_fcfa16bac6d14050b74009e84df8977af002\.jpg[^"]*" alt="Crème Brûlée Made Easy \| Silky French Dessert">',
        '<img src="images/apricot-galette.jpg" alt="Crème Brûlée Made Easy | Silky French Dessert">',
        c
    )

    # Add course links to other trigger items
    c = c.replace('data-video-title="Searing the Perfect Steak"', 'data-video-title="Searing the Perfect Steak" data-video-src="videos/gourmet-plate-reel.mp4" data-course-link="courses.html#advanced-cooking-techniques"')
    c = c.replace('data-video-title="Healthy Cooking Tips for Delicious Everyday Meals"', 'data-video-title="Healthy Cooking Tips for Delicious Everyday Meals" data-video-src="videos/chef-reel-cooking.mp4" data-course-link="courses.html#beginners-cooking-course"')
    c = c.replace('data-video-title="Puff Pastry Tips for Flaky, Golden Layers"', 'data-video-title="Puff Pastry Tips for Flaky, Golden Layers" data-course-link="courses.html#beginners-baking"')
    c = c.replace('data-video-title="Marinated Cucumber Rolls with Whipped Feta"', 'data-video-title="Marinated Cucumber Rolls with Whipped Feta" data-course-link="courses.html#diabetes-cooking-course"')

    # Replace modal preview HTML with active HTML5 video element + fallback
    old_modal_preview = r'<div class="video-modal-preview">[\s\S]*?<\/div>\s*<div class="video-modal-content">'
    new_modal_preview = """<div class="video-modal-preview" style="position: relative; aspect-ratio: 16/9; background: #000; overflow: hidden; display: flex; align-items: center; justify-content: center;">
        <video id="modal-video-player" controls playsinline style="width: 100%; height: 100%; object-fit: contain; display: none;" poster=""></video>
        <img id="modal-video-poster" src="" alt="Video Preview" style="width: 100%; height: 100%; object-fit: cover;">
        <span class="badge badge-gold video-modal-overlay-badge" id="modal-video-badge">Technique</span>
        <div id="modal-video-overlay-play" style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.35); cursor: pointer;">
          <button type="button" class="play-overlay-btn" style="width: 76px; height: 76px; transform: scale(1); box-shadow: 0 0 30px rgba(212,163,89,0.6);" aria-label="Stream Video in HD">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </button>
        </div>
      </div>
      <div class="video-modal-content">"""
    c = re.sub(old_modal_preview, new_modal_preview, c)

    # Secondary button in modal
    c = re.sub(
        r'<a href="courses\.html" class="btn btn-outline"[^>]*>\s*<span>Explore Related Academy Course<\/span>\s*<\/a>',
        '<a id="modal-course-btn" href="courses.html" class="btn btn-outline" style="border-color: rgba(255,255,255,0.25); color: #fff;"><span>Explore Related Academy Course &rarr;</span></a>',
        c
    )

    # Modal controller script
    old_script_block = r'<!-- Cinema Video Modal Controller -->[\s\S]*?<\/script>'
    new_script_block = """<!-- Cinema Video Modal Controller -->
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const modal = document.getElementById('video-modal');
      const closeBtn = document.getElementById('modal-video-close');
      const titleEl = document.getElementById('modal-video-title');
      const descEl = document.getElementById('modal-video-desc');
      const badgeEl = document.getElementById('modal-video-badge');
      const posterEl = document.getElementById('modal-video-poster');
      const videoPlayer = document.getElementById('modal-video-player');
      const overlayPlay = document.getElementById('modal-video-overlay-play');
      const ctaLink = document.getElementById('modal-video-cta');
      const courseBtn = document.getElementById('modal-course-btn');

      function openModal(card) {
        const title = card.getAttribute('data-video-title') || 'Culinary Masterclass';
        const desc = card.getAttribute('data-video-desc') || '';
        const tag = card.getAttribute('data-video-tag') || 'Culinary Cinema';
        const thumb = card.getAttribute('data-video-thumb') || '';
        const src = card.getAttribute('data-video-src') || '';
        const link = card.getAttribute('data-video-link') || 'https://epicureanflow.wixsite.com/epicurean-flow/media';
        const courseLink = card.getAttribute('data-course-link') || 'courses.html';

        titleEl.textContent = title;
        descEl.textContent = desc;
        badgeEl.textContent = tag;
        posterEl.src = thumb;
        posterEl.alt = title;
        ctaLink.href = link;
        if (courseBtn) courseBtn.href = courseLink;

        if (src) {
          videoPlayer.src = src;
          videoPlayer.poster = thumb;
          videoPlayer.style.display = 'block';
          posterEl.style.display = 'none';
          overlayPlay.style.display = 'none';
          videoPlayer.play().catch(e => console.log('Autoplay prevented:', e));
        } else {
          videoPlayer.style.display = 'none';
          videoPlayer.pause();
          posterEl.style.display = 'block';
          overlayPlay.style.display = 'flex';
        }

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }

      function closeModal() {
        if (videoPlayer) {
          videoPlayer.pause();
          videoPlayer.currentTime = 0;
        }
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }

      document.querySelectorAll('.video-trigger-item').forEach(el => {
        el.addEventListener('click', (e) => {
          if (e.target.closest('a') && !e.target.closest('.play-overlay-btn')) return;
          e.preventDefault();
          openModal(el);
        });
      });

      if (overlayPlay) {
        overlayPlay.addEventListener('click', () => {
          if (videoPlayer.src) {
            videoPlayer.style.display = 'block';
            posterEl.style.display = 'none';
            overlayPlay.style.display = 'none';
            videoPlayer.play();
          } else if (ctaLink) {
            window.open(ctaLink.href, '_blank');
          }
        });
      }

      if (closeBtn) closeBtn.addEventListener('click', closeModal);
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) closeModal();
        });
      }
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
          closeModal();
        }
      });
    });
  </script>"""
    c = re.sub(old_script_block, new_script_block, c)

    c = standardize_footer_contact(c)
    return c

# --------------------------------------------------------------------------
# 10. Update index.html
# --------------------------------------------------------------------------
def update_index_html(c):
    # Banana cake image and title on homepage
    c = re.sub(
        r'<img src="https:\/\/static\.wixstatic\.com\/media\/8e85e1_06c405184e654ab7845eee7980e6d23d~mv2\.jpg[^"]*" alt="Low-Carb Gourmet Banana Cake">',
        '<img src="images/banana-cake.jpg" alt="Diabetes-Friendly Banana Cake">',
        c
    )
    c = c.replace(
        "Low-Carb Gourmet Banana Cake",
        "Diabetes-Friendly Banana Cake"
    )

    # Direct contact bar: Add Spanish telephone and WhatsApp
    old_contact_bar = r'<!-- Direct Contact Bar -->[\s\S]*?<\/div>\s*<\/div>\s*<!-- Right Column'
    new_contact_bar = """<!-- Direct Contact Bar -->
            <div class="direct-contact-bar" style="margin-top: 24px; padding-top: 18px; justify-content: flex-start; flex-wrap: wrap; gap: 12px;">
              <span style="font-weight: 500;">Have questions? Contact us:</span>
              <a href="mailto:info@epicureanflow.com" class="contact-chip-link" title="Email Epicurean Flow">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <span>info@epicureanflow.com</span>
              </a>
              <a href="https://wa.me/31618571677" target="_blank" rel="noopener" class="contact-chip-link contact-chip-whatsapp" title="WhatsApp Chef Eliane">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                <span>WhatsApp: + 31618571677</span>
              </a>
              <a href="tel:+34626617282" class="contact-chip-link" title="Call Spain Headquarters">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>Tel Spain: +34626617282</span>
              </a>
              <span class="contact-chip-link" style="background: rgba(255,255,255,0.06); cursor: default;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Sierra Grazalema 23, 29016 Málaga, Spain</span>
              </span>
            </div>
          </div>

          <!-- Right Column"""
    c = re.sub(old_contact_bar, new_contact_bar, c)

    # Replace cutting tomato image with chef mise en place
    c = c.replace('images/chef-cutting-tomato.jpg', 'images/mise-en-place-prep.jpg')

    # Footer contact addition to index.html if missing
    if 'footer-contact-info' not in c:
        c = c.replace(
            '<p class="footer-desc">\n            Epicurean Flow inspires home cooks and culinary professionals with Michelin-caliber technique, curated cookbooks, bespoke masterclasses, and boutique European food tours.\n          </p>',
            '<p class="footer-desc">\n            Epicurean Flow inspires home cooks and culinary professionals with Michelin-caliber technique, curated cookbooks, bespoke masterclasses, and boutique European food tours.\n          </p>\n' + FOOTER_CONTACT_REPLACEMENT
        )

    # Footer bottom registration
    c = re.sub(
        r'<p class="copyright">&copy; 2026 Epicurean Flow\. All rights reserved\.<\/p>',
        '<p class="copyright">&copy; 2026 Epicurean Flow. All rights reserved. &bull; Registration: 94886792 &bull; Málaga, Spain</p>',
        c
    )

    return c

# --------------------------------------------------------------------------
# 11. Update other HTML pages for unified footer & cover fixes
# --------------------------------------------------------------------------
def update_seasonal_html(c):
    c = c.replace('object-fit: cover;', 'object-fit: contain; background: #FAF8F5;')
    return standardize_footer_contact(c)

def update_cookbooks_html(c):
    c = c.replace('images/diabetes-kitchen-cover.jpg', 'images/diabetes-friendly-kitchen-official-cover.jpg')
    c = c.replace('style="width: 88px; height: 110px; object-fit: cover;', 'style="width: 88px; height: 110px; object-fit: contain; background: #FAF8F5;')
    return standardize_footer_contact(c)

def update_standard_page(c):
    return standardize_footer_contact(c)

def main():
    update_file("contact.html", update_contact_html)
    update_file("privacy-policy.html", update_privacy_html)
    update_file("terms.html", update_terms_html)
    update_file("refund-policy.html", update_refund_html)
    update_file("courses.html", update_courses_html)
    update_file("recipes.html", update_recipes_html)
    update_file("diabetes.html", update_diabetes_html)
    update_file("nutrition.html", update_nutrition_html)
    update_file("media.html", update_media_html)
    update_file("index.html", update_index_html)
    update_file("seasonal.html", update_seasonal_html)
    update_file("cookbooks.html", update_cookbooks_html)
    
    # Remaining pages for footer and registration:
    for page in ["about.html", "food-tours.html", "menu-planning.html", "product-detail.html"]:
        update_file(page, update_standard_page)

if __name__ == "__main__":
    main()

