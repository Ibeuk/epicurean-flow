import os
import re

PAGES = {
    'index.html': 'home',
    'cookbooks.html': 'cookbooks',
    'courses.html': 'courses',
    'food-tours.html': 'food-tours',
    'recipes.html': 'recipes',
    'about.html': 'about',
    'contact.html': 'contact',
    'diabetes.html': 'diabetes',
    'nutrition.html': 'nutrition',
    'menu-planning.html': 'menu-planning',
    'media.html': 'media',
    'seasonal.html': 'seasonal',
    'product-detail.html': 'product-detail',
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

    return f'''      <!-- Desktop Navigation (Refined Classic Luxury) -->
      <nav class="nav-desktop" role="navigation" aria-label="Primary Navigation">
        <ul class="nav-links">
          <li class="nav-item"><a href="index.html" class="nav-link{is_home}">Home</a></li>
          <li class="nav-item"><a href="cookbooks.html" class="nav-link{is_cookbooks}">Cookbooks</a></li>
          <li class="nav-item"><a href="courses.html" class="nav-link{is_courses}">Courses</a></li>
          
          <!-- Recipes Dropdown -->
          <li class="nav-item has-dropdown">
            <a href="recipes.html" class="nav-link dropdown-toggle{is_dropdown_active}" aria-haspopup="true" aria-expanded="false">
              <span>Recipes</span>
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
          <!-- Member Log In / Profile Widget (Matching Image 2) -->
          <div class="member-nav-widget" id="member-nav-widget">
            <button type="button" class="btn-member-login" id="btn-header-login" onclick="window.openEpicureanAuth('signup')" aria-label="Member Log In">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Log In</span>
            </button>
            <div class="member-profile-btn" id="member-profile-btn" style="display: none;" onclick="window.toggleEpicureanMemberDropdown(event)" aria-label="Member Account Menu">
              <div class="member-avatar" id="member-avatar-initials">M</div>
              <span class="member-name" id="member-display-name">Member</span>
              <svg class="member-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="member-dropdown-menu" id="member-dropdown-menu">
              <div class="member-menu-header">
                <div class="member-menu-avatar" id="member-menu-avatar">M</div>
                <div class="member-menu-info">
                  <div class="member-menu-name" id="member-menu-name">Member Name</div>
                  <div class="member-menu-email" id="member-menu-email">member@email.com</div>
                  <span class="member-badge-pill">Verified Member</span>
                </div>
              </div>
              <div class="member-menu-divider"></div>
              <button type="button" class="member-menu-item" id="menu-my-account" onclick="window.openEpicureanPortal('profile'); window.closeEpicureanMemberDropdown();">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <span>My Account &amp; Profile</span>
              </button>
              <button type="button" class="member-menu-item" id="menu-my-library" onclick="window.openEpicureanPortal('library'); window.closeEpicureanMemberDropdown();">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                <span>My Cookbooks &amp; Courses</span>
              </button>
              <button type="button" class="member-menu-item" id="menu-my-reviews" onclick="window.openEpicureanPortal('reviews'); window.closeEpicureanMemberDropdown();">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <span>My Verified Reviews</span>
              </button>
              <div class="member-menu-divider"></div>
              <button type="button" class="member-menu-item member-logout-item" id="menu-logout-btn" onclick="window.logoutEpicureanMember(); window.closeEpicureanMemberDropdown();">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                <span>Log Out</span>
              </button>
            </div>
          </div>

          <button class="cart-btn" id="open-cart-btn" aria-label="View Shopping Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span class="cart-badge" id="cart-count">0</span>
          </button>
          <a href="cookbooks.html" class="btn-header-shop"><span>Shop</span></a>
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
    <!-- Mobile Member Status Bar -->
    <div class="mobile-member-widget" id="mobile-member-widget">
      <button type="button" class="btn-mobile-login" id="btn-mobile-login" onclick="window.openEpicureanAuth('signup')">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span>Member Log In / Sign Up</span>
      </button>
      <div class="mobile-member-info" id="mobile-member-info" style="display: none;">
        <div class="mobile-member-avatar" id="mobile-member-avatar">M</div>
        <div class="mobile-member-meta">
          <span class="mobile-member-name" id="mobile-member-name">Member</span>
          <span class="mobile-member-status">Verified Community Member</span>
        </div>
        <button type="button" class="btn-mobile-logout" id="btn-mobile-logout" title="Log Out">Log Out</button>
      </div>
    </div>

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
  </div>'''

def process_file(filename, key):
    filepath = os.path.join(r'c:\Users\ibe88\Downloads\Epicurean Flow', filename)
    if not os.path.exists(filepath):
        print(f"File not found: {filename}")
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_nav = generate_desktop_nav(key)
    new_drawer = generate_mobile_drawer(key)

    # 1. Update desktop nav
    nav_pattern = re.compile(r'(\s*<!-- Desktop Navigation.*?-->\s*<nav class="nav-desktop"[^>]*>.*?</nav>)', re.DOTALL)
    nav_pattern_fallback = re.compile(r'(\s*<nav class="nav-desktop"[^>]*>.*?</nav>)', re.DOTALL)

    if nav_pattern.search(content):
        content = nav_pattern.sub(lambda m: '\n' + new_nav, content, count=1)
    elif nav_pattern_fallback.search(content):
        content = nav_pattern_fallback.sub(lambda m: '\n' + new_nav, content, count=1)
    else:
        print(f"Nav pattern not matched in {filename}")

    # 2. Cleanly replace EVERYTHING between </header> and <main id="main-content">
    drawer_section_pattern = re.compile(r'</header>\s*.*?<main id="main-content">', re.DOTALL)
    if drawer_section_pattern.search(content):
        content = drawer_section_pattern.sub(f'</header>\n\n{new_drawer}\n\n  <main id="main-content">', content, count=1)
    else:
        print(f"Drawer section pattern not matched in {filename}")

    # 3. Ensure members.css is linked in head
    if 'css/members.css' not in content:
        content = content.replace('css/responsive.css">', 'css/responsive.css">\n  <link rel="stylesheet" href="css/members.css">')

    # 4. Ensure members.js is included in scripts
    if 'js/members.js' not in content:
        content = content.replace('js/main.js"></script>', 'js/main.js"></script>\n  <script src="js/members.js"></script>')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Successfully cleaned and synchronized {filename}")

if __name__ == '__main__':
    for fname, key in PAGES.items():
        process_file(fname, key)
