import re

def clean_cookbooks():
    with open('cookbooks.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern matches from filter bar to closing grid div
    pattern = r'<!-- Interactive Category Filters -->.*?</div>\s*<!-- Books Grid -->\s*<div class="grid-products-responsive">.*?</div>\s*</div>\s*</section>'
    
    replacement = '''<!-- Redesigned Collection Under Curation -->
        <div style="max-width: 860px; margin: 0 auto; text-align: center; background: var(--color-white); border: 1px solid var(--color-border-light); border-radius: var(--radius-lg); padding: 64px 36px; box-shadow: var(--shadow-sm);">
          <span class="product-badge gold" style="font-size: 0.85rem; padding: 6px 18px; margin-bottom: 20px; display: inline-block;">New Editions in Curation</span>
          <h2 style="font-family: var(--font-serif); font-size: 2.25rem; color: var(--color-ink); margin-bottom: 16px;">Newly Redesigned Cookbooks &amp; Guides Arriving Soon</h2>
          <p style="font-size: 1.0625rem; color: var(--color-ink-muted); max-width: 640px; margin: 0 auto 32px auto; line-height: 1.75;">
            Chef Eliane is currently finalizing our refreshed, redesigned digital publications and seasonal master guides. The updated collection is being prepared for release.
          </p>
          <div style="display: inline-flex; gap: 16px; flex-wrap: wrap; justify-content: center;">
            <a href="recipes.html" class="btn btn-primary"><span>Explore Free Chef Recipes</span></a>
            <a href="contact.html" class="btn btn-outline"><span>Inquire with Chef Eliane</span></a>
          </div>
        </div>
      </div>
    </section>'''

    new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    if new_content != content:
        with open('cookbooks.html', 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Successfully updated cookbooks.html")
    else:
        print("cookbooks.html pattern not matched!")

def clean_courses():
    with open('courses.html', 'r', encoding='utf-8') as f:
        content = f.read()

    pattern = r'<div class="grid-cards-responsive">\s*<!-- Course 1: Beginners -->.*?</div>\s*</div>\s*</section>'
    
    replacement = '''<div style="max-width: 860px; margin: 0 auto; text-align: center; background: var(--color-white); border: 1px solid var(--color-border-light); border-radius: var(--radius-lg); padding: 64px 36px; box-shadow: var(--shadow-sm);">
          <span class="product-badge gold" style="font-size: 0.85rem; padding: 6px 18px; margin-bottom: 20px; display: inline-block;">Academy Upgrades in Progress</span>
          <h2 style="font-family: var(--font-serif); font-size: 2.25rem; color: var(--color-ink); margin-bottom: 16px;">New Masterclasses &amp; Video Courses in Production</h2>
          <p style="font-size: 1.0625rem; color: var(--color-ink-muted); max-width: 640px; margin: 0 auto 32px auto; line-height: 1.75;">
            We are currently updating our culinary curriculum with newly produced masterclasses, studio videos, and downloadable kitchen workbooks. Enrolment will re-open with the redesigned curriculum shortly.
          </p>
          <div style="display: inline-flex; gap: 16px; flex-wrap: wrap; justify-content: center;">
            <a href="recipes.html" class="btn btn-primary"><span>Explore Technique Library</span></a>
            <a href="contact.html" class="btn btn-outline"><span>Contact for Private Coaching</span></a>
          </div>
        </div>
      </div>
    </section>'''

    new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    if new_content != content:
        with open('courses.html', 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Successfully updated courses.html")
    else:
        print("courses.html pattern not matched!")

def clean_index():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # Cookbooks section on homepage
    cookbooks_pattern = r'<!-- Asymmetric Cookbooks Layout -->\s*<div class="grid-asymmetric-cookbooks">.*?</div>\s*</div>\s*<div style="text-align: center; margin-top: 52px;">'
    cookbooks_replacement = '''<!-- New Collection Curation State -->
      <div style="max-width: 860px; margin: 0 auto; text-align: center; background: var(--color-white); border: 1px solid var(--color-border-light); border-radius: var(--radius-lg); padding: 64px 36px; box-shadow: var(--shadow-sm);">
        <span class="product-badge gold" style="font-size: 0.85rem; padding: 6px 18px; margin-bottom: 20px; display: inline-block;">New Edition in Curation</span>
        <h3 style="font-family: var(--font-serif); font-size: 2.25rem; color: var(--color-ink); margin-bottom: 16px;">Newly Redesigned Cookbooks &amp; Guides Arriving Soon</h3>
        <p style="font-size: 1.0625rem; color: var(--color-ink-muted); max-width: 640px; margin: 0 auto 32px auto; line-height: 1.75;">
          Chef Eliane is currently finalizing our refreshed, redesigned digital publications and seasonal master guides. The updated collection is being prepared for release.
        </p>
        <div style="display: inline-flex; gap: 16px; flex-wrap: wrap; justify-content: center;">
          <a href="recipes.html" class="btn btn-primary"><span>Explore Free Recipes</span></a>
          <a href="about.html" class="btn btn-outline"><span>Meet Chef Eliane</span></a>
        </div>
      </div>
      <div style="text-align: center; margin-top: 52px;">'''

    content = re.sub(cookbooks_pattern, cookbooks_replacement, content, flags=re.DOTALL)

    # Courses section on homepage
    courses_pattern = r'<!-- Asymmetric Courses Layout -->\s*<div class="grid-asymmetric-courses">.*?</div>\s*</div>\s*<div style="text-align: center; margin-top: 52px;">'
    courses_replacement = '''<!-- New Courses In Production State -->
      <div style="max-width: 860px; margin: 0 auto; text-align: center; background: var(--color-white); border: 1px solid var(--color-border-light); border-radius: var(--radius-lg); padding: 64px 36px; box-shadow: var(--shadow-sm);">
        <span class="product-badge gold" style="font-size: 0.85rem; padding: 6px 18px; margin-bottom: 20px; display: inline-block;">Academy Redesign</span>
        <h3 style="font-family: var(--font-serif); font-size: 2.25rem; color: var(--color-ink); margin-bottom: 16px;">New Masterclasses &amp; Video Courses in Production</h3>
        <p style="font-size: 1.0625rem; color: var(--color-ink-muted); max-width: 640px; margin: 0 auto 32px auto; line-height: 1.75;">
          We are currently updating our culinary curriculum with newly produced masterclasses, studio videos, and downloadable kitchen workbooks. Enrolment will re-open with the redesigned curriculum shortly.
        </p>
        <div style="display: inline-flex; gap: 16px; flex-wrap: wrap; justify-content: center;">
          <a href="recipes.html" class="btn btn-primary"><span>Explore Technique Library</span></a>
          <a href="contact.html" class="btn btn-outline"><span>Inquire About Private Sessions</span></a>
        </div>
      </div>
      <div style="text-align: center; margin-top: 52px;">'''

    new_content = re.sub(courses_pattern, courses_replacement, content, flags=re.DOTALL)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully updated index.html")

if __name__ == '__main__':
    clean_cookbooks()
    clean_courses()
    clean_index()
