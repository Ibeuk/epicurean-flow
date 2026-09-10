import os
import re

PAGES = {
    'recipes.html': 'recipes',
    'about.html': 'about',
    'contact.html': 'contact',
    'diabetes.html': 'diabetes',
    'nutrition.html': 'nutrition',
    'menu-planning.html': 'menu-planning',
    'media.html': 'media',
    'privacy-policy.html': 'privacy',
    'terms.html': 'terms',
    'refund-policy.html': 'refund'
}

def generate_desktop_nav(page_key):
    is_home = ' active' if page_key == 'home' else ''
    is_cookbooks = ' active' if page_key == 'cookbooks' else ''
    is_courses = ' active' if page_key == 'courses' else ''
    is_food_tours = ' active' if page_key == 'food-tours' else ''
    is_about = ' active' if page_key == 'about' else ''
    is_contact = ' active' if page_key == 'contact' else ''

    # Dropdown active state
    is_dropdown_active = ' active' if page_key in ['recipes', 'diabetes', 'nutrition', 'menu-planning', 'media'] else ''
    item_all_recipes = ' active' if page_key == 'recipes' else ''
    item_diabetes = ' active' if page_key == 'diabetes' else ''
    item_nutrition = ' active' if page_key == 'nutrition' else ''
    item_menu = ' active' if page_key == 'menu-planning' else ''
    item_media = ' active' if page_key == 'media' else ''

    return f'''      <!-- Desktop Navigation (7 Pillars) -->
      <nav class="nav-desktop" role="navigation" aria-label="Primary Navigation">
        <ul class="nav-links">
          <li class="nav-item"><a href="index.html" class="nav-link{is_home}">Home</a></li>
          <li class="nav-item"><a href="cookbooks.html" class="nav-link{is_cookbooks}">Cookbooks</a></li>
          <li class="nav-item"><a href="courses.html" class="nav-link{is_courses}">Courses</a></li>
          
          <!-- Recipes & Living Dropdown -->
          <li class="nav-item has-dropdown">
            <a href="recipes.html" class="nav-link dropdown-toggle{is_dropdown_active}" aria-haspopup="true" aria-expanded="false">
              <span>Recipes / Blog</span>
              <svg class="dropdown-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
            <div class="dropdown-menu" role="menu">
              <a href="recipes.html" class="dropdown-item{item_all_recipes}" role="menuitem">
                <span class="dropdown-item-title">All Recipes</span>
                <span class="dropdown-item-desc">Mediterranean, low-carb &amp; chef creations</span>
              </a>
              <a href="diabetes.html" class="dropdown-item{item_diabetes}" role="menuitem">
                <span class="dropdown-item-title">Diabetes Living</span>
                <span class="dropdown-item-desc">Flavor-first low-carb gastronomy</span>
              </a>
              <a href="nutrition.html" class="dropdown-item{item_nutrition}" role="menuitem">
                <span class="dropdown-item-title">Nutrition &amp; Science</span>
                <span class="dropdown-item-desc">Macro balancing &amp; vital energy</span>
              </a>
              <a href="menu-planning.html" class="dropdown-item{item_menu}" role="menuitem">
                <span class="dropdown-item-title">Menu Planning</span>
                <span class="dropdown-item-desc">Bespoke 1-on-1 chef consultations</span>
              </a>
              <a href="media.html" class="dropdown-item{item_media}" role="menuitem">
                <span class="dropdown-item-title">Media &amp; Cinema</span>
                <span class="dropdown-item-desc">Masterclass video streams &amp; previews</span>
              </a>
            </div>
          </li>

          <li class="nav-item"><a href="food-tours.html" class="nav-link{is_food_tours}">Food Tours</a></li>
          <li class="nav-item"><a href="about.html" class="nav-link{is_about}">About</a></li>
          <li class="nav-item"><a href="contact.html" class="nav-link{is_contact}">Contact</a></li>
        </ul>

        <div class="nav-actions">
          <button class="cart-btn" id="open-cart-btn" aria-label="View Shopping Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span class="cart-badge" id="cart-count">0</span>
          </button>
          <a href="cookbooks.html" class="btn btn-primary nav-cta"><span>Shop</span></a>
        </div>
      </nav>'''

def generate_mobile_drawer(page_key):
    is_home = ' active' if page_key == 'home' else ''
    is_cookbooks = ' active' if page_key == 'cookbooks' else ''
    is_courses = ' active' if page_key == 'courses' else ''
    is_food_tours = ' active' if page_key == 'food-tours' else ''
    is_about = ' active' if page_key == 'about' else ''
    is_contact = ' active' if page_key == 'contact' else ''

    is_recipes_group = ' active' if page_key in ['recipes', 'diabetes', 'nutrition', 'menu-planning', 'media'] else ''
    item_all_recipes = ' active' if page_key == 'recipes' else ''
    item_diabetes = ' active' if page_key == 'diabetes' else ''
    item_nutrition = ' active' if page_key == 'nutrition' else ''
    item_menu = ' active' if page_key == 'menu-planning' else ''
    item_media = ' active' if page_key == 'media' else ''

    return f'''  <!-- Mobile Drawer Menu -->
  <div class="mobile-nav-drawer mobile-menu-drawer" id="mobile-drawer" role="dialog" aria-modal="true" aria-label="Navigation Menu">
    <div class="mobile-nav-links">
      <a href="index.html" class="mobile-nav-link{is_home}">Home</a>
      <a href="cookbooks.html" class="mobile-nav-link{is_cookbooks}">Cookbooks</a>
      <a href="courses.html" class="mobile-nav-link{is_courses}">Courses</a>
      
      <div class="mobile-nav-group">
        <a href="recipes.html" class="mobile-nav-link{is_recipes_group}">Recipes / Blog</a>
        <div class="mobile-nav-submenu">
          <a href="recipes.html" class="mobile-nav-sublink{item_all_recipes}">All Recipes</a>
          <a href="diabetes.html" class="mobile-nav-sublink{item_diabetes}">Diabetes Living</a>
          <a href="nutrition.html" class="mobile-nav-sublink{item_nutrition}">Nutrition &amp; Science</a>
          <a href="menu-planning.html" class="mobile-nav-sublink{item_menu}">Menu Planning Consultation</a>
          <a href="media.html" class="mobile-nav-sublink{item_media}">Media &amp; Masterclasses</a>
        </div>
      </div>

      <a href="food-tours.html" class="mobile-nav-link{is_food_tours}">Food Tours</a>
      <a href="about.html" class="mobile-nav-link{is_about}">About Chef Eliane</a>
      <a href="contact.html" class="mobile-nav-link{is_contact}">Contact</a>
    </div>
    <div class="mobile-nav-footer">
      <a href="cookbooks.html" class="btn btn-primary" style="width: 100%;">Explore Collection</a>
      <p style="font-size: 0.8125rem; color: var(--color-ink-light); text-align: center; margin-top: 8px;">
        Chef-led culinary education &amp; cookbooks
      </p>
    </div>
  </div>'''

def process_file(filename, key):
    filepath = os.path.join(r'c:\Users\ibe88\Downloads\Epicurean Flow', filename)
    if not os.path.exists(filepath):
        print(f"File not found: {filename}")
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern for desktop nav: from <!-- Desktop Navigation ... --> to </nav>
    nav_pattern = re.compile(r'(\s*<!-- Desktop Navigation.*?-->\s*<nav class="nav-desktop"[^>]*>.*?</nav>)', re.DOTALL)
    # Pattern for mobile drawer: from <!-- Mobile Drawer Menu --> to </div>\s*</div>
    drawer_pattern = re.compile(r'(\s*<!-- Mobile Drawer Menu -->\s*<div class="mobile-nav-drawer[^"]*".*?</div>\s*</div>)', re.DOTALL)

    new_nav = generate_desktop_nav(key)
    new_drawer = generate_mobile_drawer(key)

    if nav_pattern.search(content):
        content = nav_pattern.sub(lambda m: '\n' + new_nav, content, count=1)
    else:
        print(f"Nav pattern not matched in {filename}")

    if drawer_pattern.search(content):
        content = drawer_pattern.sub(lambda m: '\n' + new_drawer, content, count=1)
    else:
        print(f"Drawer pattern not matched in {filename}")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Successfully synchronized navigation in {filename}")

if __name__ == '__main__':
    for fname, key in PAGES.items():
        process_file(fname, key)
