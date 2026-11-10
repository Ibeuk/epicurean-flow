import re

def update_recipes():
    with open('recipes.html', 'r', encoding='utf-8') as f:
        c = f.read()

    posts = [
        ('manchurian-chicken-recipe', 'Crispy Manchurian Chicken: Indo-Chinese Fusion', 'Indo-Chinese Gastronomy', 'https://static.wixstatic.com/media/30dece_427d6f6d4dc142de9892ef6d03d0b4c6~mv2.jpg/v1/fit/w_800,h_800,q_90/file.jpg', 'fusion', 'Crispy golden chicken bites tossed in an aromatic, glossy, umami-rich dark glaze with fresh ginger, garlic, green chilies, and scallions.'),
        ('braised-cabbage-rolls', 'Comforting Braised Cabbage Rolls in Rich Tomato Broth', 'Classic Comfort Heritage', 'https://static.wixstatic.com/media/30dece_b7a5dffdfda04db8a28660301d5970a4~mv2.jpg/v1/fit/w_800,h_800,q_90/file.jpg', 'technique', 'Tender Savoy cabbage leaves enveloping a seasoned beef and rice stuffing, gently braised in a velvety sweet-and-tangy tomato and herb sauce.'),
        ('event-menu-planning-tips-for-success', 'Event Menu Planning: 7 Chef Secrets for Success', 'Professional Event Catering', 'https://static.wixstatic.com/media/30dece_f0648762bb9946d4a667982b1a4d5d6f~mv2.png/v1/fit/w_800,h_800,q_90/file.png', 'technique', 'Strategic menu design, prep-ahead scheduling, and portion-pacing insights from 25 years of mega-yacht and luxury private dining.'),
        ('indulgent-elegance-homemade-chicken-liver-pâté', 'Indulgent Elegance: Velvety Chicken Liver Pâté', 'French Charcuterie Art', 'https://static.wixstatic.com/media/30dece_db05d9da34fa4c9eaa35100e4fb54dd3~mv2.jpg/v1/fit/w_800,h_800,q_90/file.jpg', 'mediterranean', 'Silky, rich, and delicately spiced poultry parfait enriched with Cognac, thyme, caramelized shallots, and clarified butter cap.'),
        ('creating-a-personalized-menu-for-your-needs', 'Designing a Bespoke Menu Tailored to Dietary Needs', 'Bespoke Culinary Design', 'https://static.wixstatic.com/media/30dece_c31fd3fcab9f42be9c1d909c363a3e76~mv2.png/v1/fit/w_800,h_800,q_90/file.png', 'diabetes', 'How to balance diabetes management, allergies, and luxury culinary expectations across a unified multi-course dinner.'),
        ('holiday-chocolate-fondue-recipe', 'Decadent Holiday Dark Chocolate Fondue with Spices', 'Festive Celebration', 'https://static.wixstatic.com/media/30dece_fd0c4b04a74546a0be5457a60bbb7458~mv2.jpg/v1/fit/w_800,h_800,q_90/file.jpg', 'technique', 'Gourmet 70% dark chocolate melted with double cream, Cointreau, fresh orange zest, and sea salt flakes. Served with seasonal fruits.'),
        ('healthy-diabetic-banana-bread-low-sugar-guilt-free-recipe', 'Guilt-Free Diabetic Banana Bread (Low Sugar, High Fiber)', 'Diabetes-Friendly Baking', 'https://static.wixstatic.com/media/30dece_8fec68335c1642cc91c030d83d0087e4~mv2.png/v1/fit/w_800,h_800,q_90/file.png', 'diabetes', 'Chef Eliane’s blood-sugar-conscious recipe crafted with almond flour, ripe bananas, cinnamon, and coconut oil.')
    ]

    new_cards = ''
    for p_id, title, badge, img, cat, desc in posts:
        if f'data-recipe-target="{p_id}"' not in c:
            new_cards += f'''
          <!-- Recipe Article: {title} -->
          <article class="course-card" data-category="{cat}">
            <div class="course-thumb">
              <img src="{img}" alt="{title}" loading="lazy">
              <span class="course-badge">{badge}</span>
            </div>
            <div class="course-card-content">
              <h3 style="font-family: var(--font-serif); font-size: 1.25rem; margin-bottom: 10px;">{title}</h3>
              <p style="font-size: 0.92rem; color: var(--color-ink-subtle); line-height: 1.6; margin-bottom: 16px;">
                {desc}
              </p>
              <button type="button" class="btn btn-outline btn-block btn-read-recipe" data-recipe-target="{p_id}">Read Authentic Recipe &rarr;</button>
            </div>
          </article>'''

    if new_cards:
        marker = '<!-- Recipe 6: Succulent Meatballs with Silky Gravy -->'
        idx = c.find(marker)
        if idx != -1:
            end_art = c.find('</article>', idx) + len('</article>')
            c = c[:end_art] + new_cards + c[end_art:]
            with open('recipes.html', 'w', encoding='utf-8') as f:
                f.write(c)
            print('Successfully added all 7 blog article cards to recipes.html!')
        else:
            print('Marker not found')
    else:
        print('Cards already present')

if __name__ == '__main__':
    update_recipes()
