/* ==========================================================================
   EPICUREAN FLOW - PRODUCTS, COURSES & WIX HEADLESS COMMERCE MODULE
   ========================================================================== */

const WIX_CONFIG = {
  clientId: 'd446c704-ea75-4680-affd-1633fca4bfb8',
  pagesDomain: 'https://epicureanflow.wixsite.com/epicurean-flow/'
};

const PRODUCTS_DATA = {
  cookbooks: [
    {
      id: 'symphony-flavors',
      title: 'A Symphony of Flavors',
      subtitle: 'Mediterranean & Middle Eastern Spice Essentials',
      category: 'Digital Cookbook',
      price: '€9.00',
      numericPrice: 9.00,
      image: 'https://static.wixstatic.com/media/30dece_e2aa58069aa245689abd1c1db9c7efd1~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg',
      badge: 'Bestseller',
      description: 'Master the essential spices and blends—from sumac and za’atar to ras el hanout—that elevate home dishes into Mediterranean culinary masterpieces.',
      url: 'https://epicureanflow.wixsite.com/epicurean-flow/product-page/a-symphony-of-flavors-mediterranean-middle-eastern-spice-essentials-elevate'
    },
    {
      id: 'diabetes-recipe-book',
      title: 'Chef Eliane’s New Diabetes Recipe Book',
      subtitle: 'Flavor-First Low-Carb Gourmet Cooking',
      category: 'Specialized Cookbook',
      price: '€32.00',
      numericPrice: 32.00,
      image: 'https://static.wixstatic.com/media/30dece_b9c1ee9fe5bd4fb3b69eec8a061852fd~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg',
      badge: 'Pre-Order',
      description: 'Vibrant, low-carb recipes designed by an award-winning chef living with diabetes. Enjoy restaurant-grade meals without compromising flavor.',
      url: 'https://epicureanflow.wixsite.com/epicurean-flow/product-page/chef-eliane-s-new-diabetes-recipe-book'
    },
    {
      id: 'lets-eat',
      title: 'Let’s Eat',
      subtitle: 'Everyday Gourmet Culinary Inspirations',
      category: 'Cookbook',
      price: '€9.00',
      numericPrice: 9.00,
      image: 'https://static.wixstatic.com/media/8e85e1_06c405184e654ab7845eee7980e6d23d~mv2.jpg/v1/fit/w_2121,h_1414,q_90/file.jpg',
      badge: 'Essential',
      description: 'Chef Eliane’s signature collection of approachable yet sophisticated daily meals crafted to inspire culinary confidence.',
      url: 'https://epicureanflow.wixsite.com/epicurean-flow/product-page/let-s-eat'
    },
    {
      id: 'seasonal-recipe-cookbook',
      title: 'Seasonal Recipe Cookbook',
      subtitle: 'Fresh Ingredients for Year-Round Plating',
      category: 'Seasonal Guide',
      price: '€9.00',
      numericPrice: 9.00,
      image: 'https://static.wixstatic.com/media/8e85e1_77c9aa584b06402187c746820060e2e1~mv2.jpg/v1/fill/w_2500,h_1357,al_c/8e85e1_77c9aa584b06402187c746820060e2e1~mv2.jpg',
      badge: 'Seasonal',
      description: 'Harness market-fresh ingredients with seasonal techniques that celebrate texture, aroma, and natural produce.',
      url: 'https://epicureanflow.wixsite.com/epicurean-flow/product-page/seasonal-recipe-cookbook'
    },
    {
      id: 'christmas-recipe-collection',
      title: 'Christmas Recipe Collection Cookbook',
      subtitle: 'Festive Entertaining & Elegant Holiday Menus',
      category: 'Holiday Edition',
      price: '€14.00',
      numericPrice: 14.00,
      image: 'https://static.wixstatic.com/media/8e85e1_fc54bcfb12d744b8b64e0a4f660d5b78~mv2.jpg/v1/fill/w_1200,h_800,al_c/8e85e1_fc54bcfb12d744b8b64e0a4f660d5b78~mv2.jpg',
      badge: 'Holiday Special',
      description: 'Your secret to a flawless, stress-free festive dinner table filled with European elegance and showstopping flavors.',
      url: 'https://epicureanflow.wixsite.com/epicurean-flow/product-page/christmas-recipe-collection-cookbook'
    },
    {
      id: 'ultimate-macronutrient-guide',
      title: 'The Ultimate Macronutrient Guide',
      subtitle: 'Mastering Carbs, Proteins & Healthy Fats',
      category: 'Nutrition Guide',
      price: '€12.00',
      numericPrice: 12.00,
      image: 'https://static.wixstatic.com/media/8e85e1_53239a5ec99b4562ad8fb7a3c3dfd3e0~mv2.jpg/v1/fill/w_1200,h_1600,al_c/8e85e1_53239a5ec99b4562ad8fb7a3c3dfd3e0~mv2.jpg',
      badge: 'Nutrition Guide',
      description: 'Clear, practical formulas to balance energy, manage blood sugar, and structure nutrient-dense plates effortlessly.',
      url: 'https://epicureanflow.wixsite.com/epicurean-flow/product-page/the-ultimate-macronutrient-guide'
    },
    {
      id: 'meal-planner-eliane',
      title: 'Epicurean Flow Meal Planner',
      subtitle: 'By Award-Winning Chef Eliane Muskus',
      category: 'Kitchen Planner',
      price: '€15.00',
      numericPrice: 15.00,
      image: 'https://static.wixstatic.com/media/8e85e1_a9f1a0808a5c49ee9fef4c09d5a7d79b~mv2.jpg/v1/fill/w_1200,h_1600,al_c/8e85e1_a9f1a0808a5c49ee9fef4c09d5a7d79b~mv2.jpg',
      badge: 'Planner',
      description: 'Streamline your week with organized mise en place sheets, grocery lists, and balanced seasonal meal plans.',
      url: 'https://epicureanflow.wixsite.com/epicurean-flow/product-page/epicurean-flow-meal-planner-by-eliane-muskus'
    }
  ],
  courses: [
    {
      id: 'course-beginners',
      title: 'Beginners Cooking Course',
      price: '€49.00',
      numericPrice: 49.00,
      image: 'https://static.wixstatic.com/media/8e85e1_166b8ba26a9749198642a8b375b4dbb6~mv2.jpg/v1/fill/w_1200,h_1600,al_c/8e85e1_166b8ba26a9749198642a8b375b4dbb6~mv2.jpg',
      badge: 'Foundational'
    },
    {
      id: 'course-intermediates',
      title: 'Intermediates Cooking Course',
      price: '€69.00',
      numericPrice: 69.00,
      image: 'https://static.wixstatic.com/media/8e85e1_53239a5ec99b4562ad8fb7a3c3dfd3e0~mv2.jpg/v1/fill/w_1200,h_1600,al_c/8e85e1_53239a5ec99b4562ad8fb7a3c3dfd3e0~mv2.jpg',
      badge: 'Popular'
    },
    {
      id: 'course-advanced',
      title: 'Advanced Cooking Course',
      price: '€89.00',
      numericPrice: 89.00,
      image: 'https://static.wixstatic.com/media/8e85e1_a9f1a0808a5c49ee9fef4c09d5a7d79b~mv2.jpg/v1/fill/w_1200,h_1600,al_c/8e85e1_a9f1a0808a5c49ee9fef4c09d5a7d79b~mv2.jpg',
      badge: 'Mastery'
    },
    {
      id: 'course-mini-essentials',
      title: 'Mini Course: Foundations of Flavor (7 Days)',
      price: '€19.00',
      numericPrice: 19.00,
      image: 'https://static.wixstatic.com/media/8e85e1_fc54bcfb12d744b8b64e0a4f660d5b78~mv2.jpg/v1/fill/w_1200,h_800,al_c/8e85e1_fc54bcfb12d744b8b64e0a4f660d5b78~mv2.jpg',
      badge: 'Quick Start'
    },
    {
      id: 'course-diabetes-masterclass',
      title: 'Diabetes Cooking Course Masterclass',
      price: '€39.00',
      numericPrice: 39.00,
      image: 'https://static.wixstatic.com/media/8e85e1_166b8ba26a9749198642a8b375b4dbb6~mv2.jpg/v1/fill/w_1200,h_1600,al_c/8e85e1_166b8ba26a9749198642a8b375b4dbb6~mv2.jpg',
      badge: 'Health'
    },
    {
      id: 'holiday-bundle',
      title: 'Exclusive Holiday Cooking Bundle',
      price: '€69.00',
      numericPrice: 69.00,
      image: 'https://static.wixstatic.com/media/8e85e1_fc54bcfb12d744b8b64e0a4f660d5b78~mv2.jpg/v1/fill/w_1200,h_800,al_c/8e85e1_fc54bcfb12d744b8b64e0a4f660d5b78~mv2.jpg',
      badge: 'Bundle'
    }
  ],
  services: [
    {
      id: 'consultation-menu-planning',
      title: '30-Minute Culinary Consultation with Chef Eliane',
      subtitle: 'Stress-Free Party Menu Planning & Custom Organization',
      price: '€65.00',
      numericPrice: 65.00,
      image: 'https://static.wixstatic.com/media/8e85e1_53239a5ec99b4562ad8fb7a3c3dfd3e0~mv2.jpg/v1/fill/w_1200,h_1600,al_c/8e85e1_53239a5ec99b4562ad8fb7a3c3dfd3e0~mv2.jpg',
      badge: 'Private Service'
    }
  ],
  freeResources: [
    {
      id: 'free-mediterranean-ebook',
      title: 'Mediterranean Recipe eBook',
      subtitle: '6 Authentic Dishes + 2 Bonus Secret Dips',
      category: 'Free Download',
      price: '€0.00',
      numericPrice: 0.00,
      image: 'https://static.wixstatic.com/media/30dece_44304d695112497d9840ceafd90ff96f~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg',
      badge: 'Free Gift',
      description: 'Experience true Mediterranean warmth with Chef Eliane’s favorite everyday recipes, pairing notes, and secret herb blends.',
      url: 'https://epicureanflow.wixsite.com/epicurean-flow/product-page/download-your-free-mediterranean-recipe-ebook-6-delicious-recipes-2-bonus-di'
    },
    {
      id: 'free-diabetes-bowls',
      title: 'Diabetes-Friendly Mediterranean Bowls of Flavor',
      subtitle: 'Low-Carb, High-Protein Nutrient-Dense Bowls',
      category: 'Free Download',
      price: '€0.00',
      numericPrice: 0.00,
      image: 'https://static.wixstatic.com/media/30dece_e2aa58069aa245689abd1c1db9c7efd1~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg',
      badge: 'Free Gift',
      description: 'Satisfying, blood-sugar conscious bowls loaded with fresh greens, healthy fats, and savory Mediterranean spices.',
      url: 'https://epicureanflow.wixsite.com/epicurean-flow/product-page/download-your-free-diabetes-friendly-mediterranean-bowls-of-flavor'
    }
  ]
};

// Asynchronously load the official Wix Headless SDK
async function createWixHeadlessClient() {
  try {
    const { createClient, OAuthStrategy } = await import('https://esm.sh/@wix/sdk@1.15.5');
    const { products } = await import('https://esm.sh/@wix/stores@1.0.185');
    const { currentCart } = await import('https://esm.sh/@wix/ecom@1.0.697');

    const client = createClient({
      modules: { products, currentCart },
      auth: OAuthStrategy({ clientId: WIX_CONFIG.clientId })
    });
    console.log('[Wix Headless] Client initialized with Client ID:', WIX_CONFIG.clientId);
    return client;
  } catch (err) {
    console.info('[Wix Headless] Running in local offline/fallback mode:', err.message);
    return null;
  }
}

// Cart Drawer & eCommerce Manager Class
class CartManager {
  constructor() {
    this.cartItems = [];
    this.wixClient = null;
    this.badgeEl = document.querySelector('.cart-badge');
    this.drawerEl = document.getElementById('cart-drawer');
    this.backdropEl = document.getElementById('cart-backdrop') || document.getElementById('cart-overlay');
    this.cartItemsListEl = document.getElementById('cart-items-list') || document.getElementById('cart-items-container');
    this.cartSubtotalEl = document.getElementById('cart-subtotal-val') || document.querySelector('.cart-subtotal-amount');
    this.checkoutBtnEl = document.getElementById('btn-proceed-checkout');
    this.closeBtnEl = document.getElementById('close-cart-btn') || document.getElementById('cart-close-btn');
    this.init();
  }

  async init() {
    const cartToggleBtns = document.querySelectorAll('.cart-btn');
    cartToggleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleDrawer();
      });
    });

    if (this.closeBtnEl) {
      this.closeBtnEl.addEventListener('click', (e) => {
        e.preventDefault();
        this.closeDrawer();
      });
    }

    if (this.backdropEl) {
      this.backdropEl.addEventListener('click', () => this.closeDrawer());
    }

    if (this.checkoutBtnEl) {
      this.checkoutBtnEl.addEventListener('click', (e) => {
        e.preventDefault();
        this.proceedToCheckout();
      });
    }

    // Global listener for all buy & add-to-cart buttons
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-add-to-cart, .btn-buy-trigger');
      if (btn) {
        e.preventDefault();
        const productId = btn.getAttribute('data-id') || btn.getAttribute('data-product-id');
        const title = btn.getAttribute('data-title');
        const price = btn.getAttribute('data-price');
        this.addItem(productId, { title, price });
      }
    });

    // Initialize Wix SDK connection in background
    this.wixClient = await createWixHeadlessClient();
  }

  toggleDrawer() {
    if (this.drawerEl) {
      const isOpen = this.drawerEl.classList.toggle('open');
      if (this.backdropEl) this.backdropEl.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }
  }

  openDrawer() {
    if (this.drawerEl) {
      this.drawerEl.classList.add('open');
      if (this.backdropEl) this.backdropEl.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  closeDrawer() {
    if (this.drawerEl) {
      this.drawerEl.classList.remove('open');
      if (this.backdropEl) this.backdropEl.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  async addItem(productId, meta = null) {
    // Find product in catalog or use meta
    let item = PRODUCTS_DATA.cookbooks.find(p => p.id === productId);
    if (!item && PRODUCTS_DATA.courses) {
      item = PRODUCTS_DATA.courses.find(p => p.id === productId);
    }

    if (!item) {
      const priceVal = meta && meta.price ? parseFloat(meta.price) : 9.00;
      item = {
        id: productId || 'custom-item',
        title: meta && meta.title ? meta.title : 'Selected Culinary Publication',
        price: '€' + priceVal.toFixed(2),
        numericPrice: priceVal,
        image: 'https://static.wixstatic.com/media/8e85e1_53239a5ec99b4562ad8fb7a3c3dfd3e0~mv2.jpg/v1/fill/w_1200,h_1600,al_c/8e85e1_53239a5ec99b4562ad8fb7a3c3dfd3e0~mv2.jpg'
      };
    }

    this.cartItems.push(item);
    this.renderCart();
    this.openDrawer();

    // If connected to Wix Headless e-commerce, sync with currentCart
    if (this.wixClient && item.wixId) {
      try {
        await this.wixClient.currentCart.addToCurrentCart({
          lineItems: [
            {
              catalogReference: {
                appId: '1380b703-ce81-ff05-f115-39571d94dfcd',
                catalogItemId: item.wixId
              },
              quantity: 1
            }
          ]
        });
      } catch (err) {
        console.warn('[Wix Headless] Server cart sync note:', err.message);
      }
    }
  }

  removeItem(index) {
    this.cartItems.splice(index, 1);
    this.renderCart();
  }

  renderCart() {
    const count = this.cartItems.length;
    if (this.badgeEl) {
      this.badgeEl.textContent = count;
      this.badgeEl.style.transform = 'scale(1.25)';
      setTimeout(() => this.badgeEl.style.transform = 'scale(1)', 200);
    }

    if (!this.cartItemsListEl) return;

    if (count === 0) {
      this.cartItemsListEl.innerHTML = `
        <div class="cart-empty-message">
          <p style="font-family: var(--font-serif); font-size: 1.25rem; margin-bottom: 8px;">Your cart is currently empty</p>
          <p style="font-size: 0.875rem; color: var(--color-ink-muted);">Explore our cookbooks and courses to start learning.</p>
        </div>
      `;
      if (this.cartSubtotalEl) this.cartSubtotalEl.textContent = '€0.00';
      return;
    }

    let subtotal = 0;
    let html = '';

    this.cartItems.forEach((item, idx) => {
      subtotal += item.numericPrice;
      html += `
        <div style="display: flex; gap: 16px; align-items: center; padding: 16px 0; border-bottom: 1px solid var(--color-border-light);">
          <img src="${item.image}" alt="${item.title}" style="width: 56px; height: 56px; object-fit: cover; border-radius: var(--radius-xs);">
          <div style="flex-grow: 1;">
            <div style="font-family: var(--font-serif); font-weight: 600; font-size: 1rem; color: var(--color-ink);">${item.title}</div>
            <div style="font-size: 0.8125rem; color: var(--color-gold); font-weight: 600;">${item.price}</div>
          </div>
          <button onclick="window.cartManager.removeItem(${idx})" style="color: var(--color-ink-muted); font-size: 1.25rem; padding: 4px; cursor: pointer;" title="Remove">✕</button>
        </div>
      `;
    });

    this.cartItemsListEl.innerHTML = html;
    if (this.cartSubtotalEl) this.cartSubtotalEl.textContent = '€' + subtotal.toFixed(2);
  }

  async proceedToCheckout() {
    if (this.wixClient) {
      try {
        const { checkoutUrl } = await this.wixClient.currentCart.createCheckoutUrl();
        if (checkoutUrl) {
          window.location.href = checkoutUrl;
          return;
        }
      } catch (err) {
        console.warn('[Wix Headless] Direct checkout session note:', err.message);
      }
    }
    // Fallback: direct redirection to the Wix Pages Domain checkout
    window.location.href = `${WIX_CONFIG.pagesDomain}cart-page`;
  }
}

window.cartManager = new CartManager();
