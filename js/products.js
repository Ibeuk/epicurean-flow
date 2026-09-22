/* ==========================================================================
   EPICUREAN FLOW - PRODUCTS, COURSES & WIX HEADLESS COMMERCE MODULE
   ========================================================================== */

const WIX_CONFIG = {
  clientId: 'd446c704-ea75-4680-affd-1633fca4bfb8',
  get pagesDomain() {
    if (typeof window !== 'undefined') {
      const host = window.location.hostname;
      if (host.includes('epicureanflow.com')) {
        return `${window.location.protocol}//${window.location.host}/`;
      }
      try {
        if (window.top && window.top.location && window.top.location.hostname.includes('epicureanflow.com')) {
          return `${window.top.location.protocol}//${window.top.location.host}/`;
        }
      } catch (e) {}
    }
    return 'https://epicureanflow.wixsite.com/epicurean-flow/';
  }
};


const PRODUCTS_DATA = {
  bundles: [
    {
      id: 'holiday-collection',
      title: 'Complete Holiday Table Collection',
      subtitle: 'Four Festive Books. One Unforgettable Holiday Season.',
      category: 'Promotional Holiday Bundle',
      originalPrice: '€60.80',
      originalNumeric: 60.80,
      price: '€36.95',
      numericPrice: 36.95,
      savings: '€23.85',
      savingsPercent: '39%',
      isBundle: true,
      image: 'images/the-christmas-recipe-collection-cover.jpg',
      badge: 'Special Holiday Bundle • Save €23.85',
      bonus: 'Ditch the Cheese Ball is included FREE',
      itemsIncluded: [
        'Stress-Free Thanksgiving (A Complete Cooking Guide — €14.95 value)',
        'The Christmas Recipe Collection (Festive Classics — €16.95 value)',
        'Christmas in Paris: The French Holiday Table (€19.95 value)',
        'Ditch the Cheese Ball: 10 Holiday Appetizers (€8.95 FREE BONUS)'
      ],
      description: 'Plan Thanksgiving and Christmas with chef-created recipes, menus, preparation guidance and practical timelines designed to take the stress out of holiday entertaining. Get the complete collection for only €36.95, including Ditch the Cheese Ball absolutely free. Total value €60.80 – save €23.85.',
      buttonText: 'GET THE HOLIDAY COLLECTION',
      url: 'seasonal.html'
    },
    {
      id: 'flavor-compromise-bundle',
      title: 'The Flavor Without Compromise Bundle',
      subtitle: 'Diabetes-Friendly Should Never Mean Flavour-Free',
      category: 'Promotional Nutrition Bundle',
      originalPrice: '€41.90',
      originalNumeric: 41.90,
      price: '€34.95',
      numericPrice: 34.95,
      savings: '€6.95',
      isBundle: true,
      image: 'images/diabetes-kitchen-cover.jpg',
      badge: 'Signature Flavor Bundle • Save €6.95',
      itemsIncluded: [
        'The Diabetes-Friendly Kitchen (Comprehensive Specialist Guide — €24.95 value)',
        'A Symphony of Flavors: Spice Essentials (€16.95 value)'
      ],
      description: 'Discover satisfying diabetes-friendly recipes alongside a practical guide to Mediterranean and Middle Eastern herbs, spices and flavour combinations. Total value €41.90 – bundle price €34.95. Save €6.95.',
      buttonText: 'GET THE BUNDLE',
      url: 'cookbooks.html'
    }
  ],
  cookbooks: [
    {
      id: 'stress-free-thanksgiving',
      title: 'Stress-Free Thanksgiving',
      subtitle: 'A Complete Cooking Guide',
      category: 'Holiday Culinary Guide',
      price: '€14.95',
      numericPrice: 14.95,
      image: 'images/thanksgiving-guide-cover.jpg',
      badge: 'Instant Digital Download • 58 Pages',
      pages: 58,
      description: 'Eliminate holiday cooking stress with Chef Eliane’s definitive 58-page guide. Features turkey three ways, foolproof side dishes, luscious desserts, and a minute-by-minute 3-day oven master timeline.',
      url: 'seasonal.html'
    },
    {
      id: 'the-christmas-recipe-collection',
      title: 'The Christmas Recipe Collection',
      subtitle: 'Traditional & Modern Festive Classics',
      category: 'Holiday Culinary Collection',
      price: '€16.95',
      numericPrice: 16.95,
      image: 'images/the-christmas-recipe-collection-cover.jpg',
      badge: 'Instant Digital Download • 48 Pages',
      pages: 48,
      description: 'From golden roasts and aromatic stuffing to showstopping desserts, master festive entertaining with foolproof chef instructions and prep timelines.',
      url: 'cookbooks.html'
    },
    {
      id: 'christmas-in-paris',
      title: 'Christmas in Paris',
      subtitle: 'The French Holiday Table',
      category: 'French Gastronomy Guide',
      price: '€19.95',
      numericPrice: 19.95,
      image: 'images/christmas-in-paris-cover.jpg',
      badge: 'Instant Digital Download • 52 Pages',
      pages: 52,
      description: 'European festive sophistication made approachable. Classic French holiday starters, oysters, delicate duck confit, bûche de Noël, and wine pairings.',
      url: 'cookbooks.html'
    },
    {
      id: 'ditch-the-cheese-ball',
      title: 'Ditch the Cheese Ball',
      subtitle: '10 Holiday Appetizers That Steal the Show',
      category: 'Entertaining Guide',
      price: '€8.95',
      numericPrice: 8.95,
      image: 'images/ditch-the-cheese-ball-cover.jpg',
      badge: 'Instant Digital Download • 28 Pages',
      pages: 28,
      description: 'Say goodbye to tired supermarket platters. 10 sophisticated, vibrant party appetizers that are easy to prepare and leave guests raving.',
      url: 'cookbooks.html'
    },
    {
      id: 'the-diabetes-friendly-kitchen',
      title: 'The Diabetes-Friendly Kitchen',
      subtitle: 'Nourishing Low-Glycemic Everyday Meals',
      category: 'Specialist Culinary Guide',
      price: '€24.95',
      numericPrice: 24.95,
      image: 'images/diabetes-kitchen-cover.jpg',
      badge: 'Instant Digital Download • 50 Pages',
      pages: 50,
      description: 'A comprehensive specialist guide combining diabetes-friendly recipes, smart substitutions, shopping guidance, travel advice, and professional chef techniques.',
      url: 'cookbooks.html'
    },
    {
      id: 'symphony-of-flavors',
      title: 'A Symphony of Flavors',
      subtitle: 'Mediterranean & Middle Eastern Spice Essentials',
      category: 'Curated Spice Guide & Cookbook',
      price: '€16.95',
      numericPrice: 16.95,
      image: 'images/symphony-flavors-cover.jpg',
      badge: 'Instant Digital Download • 39 Pages',
      pages: 39,
      description: 'Unlock the secret aromatic alchemy of Mediterranean and Middle Eastern spice blending. Detailed flavor pairings, storage secrets, and 39 pages of foolproof culinary inspiration.',
      url: 'cookbooks.html'
    },
    {
      id: 'taste-of-southern-europe',
      title: 'A Taste of Southern Europe',
      subtitle: '20 Budget-Friendly Mediterranean Recipes',
      category: 'Everyday Mediterranean',
      price: '€15.95',
      numericPrice: 15.95,
      image: 'images/taste-of-southern-europe-cover.jpg',
      badge: 'Instant Digital Download • 42 Pages',
      pages: 42,
      description: 'Authentic Mediterranean cooking on a budget. 20 nourishing, vegetable-forward and seafood-inspired recipes celebrating the sun-drenched European coast.',
      url: 'cookbooks.html'
    },
    {
      id: 'soup-cookbook',
      title: 'Soup Cookbook',
      subtitle: 'Nourishing Broths, Velvety Purees & Wholesome Bowls',
      category: 'Comfort Gastronomy',
      price: '€8.95',
      numericPrice: 8.95,
      image: 'images/soup-cookbook-cover.jpg',
      badge: 'Instant Digital Download • 32 Pages',
      pages: 32,
      description: 'Warm your table with deeply flavorful artisan soups. Silky purees, robust Mediterranean broths, and meal-in-a-bowl creations with chef pairing notes.',
      url: 'cookbooks.html'
    },
    {
      id: 'lets-eat-mediterranean',
      title: "Let's Eat",
      subtitle: 'Delicious Recipes from My Cooking Classes and World Travels',
      category: 'Physical Published Cookbook',
      price: 'Available on Amazon',
      numericPrice: 0.00,
      image: 'images/lets-eat-cover.jpg',
      badge: 'Amazon Physical Edition • 339 Pages',
      pages: 339,
      isPhysical: true,
      retailer: 'Amazon',
      amazonUrl: 'https://www.amazon.com/s?k=Eliane+Muskus+Let%27s+Eat',
      description: 'From the award-winning cooking classes of La Serviette Blanche in Cannes to flavours inspired by Eliane’s travels, this 339-page cookbook brings together recipes shaped by a lifetime of cooking, teaching and discovery. Available in paperback and hardcover exclusively through Amazon. Orders, payment and delivery are handled directly by Amazon.',
      url: 'cookbooks.html'
    }
  ],
  courses: [
    {
      id: 'beginners-cooking-course',
      title: 'Beginners’ Cooking Course',
      subtitle: 'Essential Kitchen Foundations, Knife Skills & Flavor',
      category: 'Self-Paced Digital Course',
      price: '€39.00',
      numericPrice: 39.00,
      image: 'images/course-beginners-cooking-cover.jpg',
      badge: 'Self-Paced Digital Course',
      pages: 65,
      description: 'Master essential culinary knife skills, heat control, pan searing, and seasoning fundamentals to cook with total confidence every single evening.',
      url: 'courses.html'
    },
    {
      id: 'beginners-baking',
      title: 'Baking for Beginners',
      subtitle: 'Simple Recipes • Essential Techniques • Timeless Results',
      category: 'Self-Paced Digital Course',
      price: '€39.00',
      numericPrice: 39.00,
      image: 'images/course-baking-cover.jpg',
      badge: 'Self-Paced Digital Course',
      pages: 91,
      description: 'Master pastry foundations, crusts, dough hydration chemistry, and golden savory bakes with confidence across 91 comprehensive instructional pages.',
      url: 'courses.html'
    },
    {
      id: 'intermediate-cooking-techniques',
      title: 'Intermediate Cooking Techniques',
      subtitle: 'Build Skills. Create Flavor. Cook with Confidence.',
      category: 'Self-Paced Digital Course',
      price: '€59.00',
      numericPrice: 59.00,
      image: 'images/intermediate-cooking-techniques-cover.jpg',
      badge: 'Self-Paced Digital Course',
      pages: 73,
      description: 'Stop guessing pan heat and seasoning. Master golden pan-searing, emulsified French sauces, precision knife skills, and restaurant-style kitchen timing across 73 chef-led pages.',
      url: 'courses.html'
    },
    {
      id: 'advanced-cooking-techniques',
      title: 'Advanced Cooking Techniques',
      subtitle: 'Master the Methods. Elevate Every Dish.',
      category: 'Self-Paced Digital Course',
      price: '€79.00',
      numericPrice: 79.00,
      image: 'images/course-advanced-cover.jpg',
      badge: 'Self-Paced Digital Course',
      pages: 40,
      description: 'Professional culinary methods for passionate home cooks. Complex reductions, braising science, delicate poaching, and precision plated presentation.',
      url: 'courses.html'
    },
    {
      id: 'diabetes-cooking-course',
      title: 'Diabetes Cooking Course (Everyday Guidance)',
      subtitle: 'Practical, Structured Everyday Guidance',
      category: 'Self-Paced Digital Course',
      price: '€49.00',
      numericPrice: 49.00,
      image: 'images/course-diabetes-cooking.jpg',
      badge: 'Self-Paced Digital Course',
      pages: 45,
      description: 'Practical, structured everyday culinary guidance for balanced blood sugar, vibrant energy, and delicious home cooking without sacrificing rich Mediterranean flavor.',
      url: 'courses.html'
    },
    {
      id: 'diabetes-cooking-masterclass',
      title: 'The Complete Diabetes-Friendly Cooking Masterclass',
      subtitle: 'Delicious Recipes. Smart Strategies. Better Blood Sugar.',
      category: 'Self-Paced Digital Course',
      price: '€89.00',
      numericPrice: 89.00,
      image: 'images/course-diabetes-masterclass.jpg',
      badge: 'Self-Paced Digital Course',
      pages: 37,
      description: 'A scientifically grounded, culinary-focused masterclass guide. Delicious glycemic control strategies, nutrient-dense meal architecture, and satisfying gourmet flavors.',
      url: 'courses.html'
    }
  ],
  services: [
    {
      id: 'consultation-menu-planning',
      title: '30-Minute Culinary Consultation with Chef Eliane',
      subtitle: 'Stress-Free Party Menu Planning & Custom Organization',
      price: '€65.00',
      numericPrice: 65.00,
      image: 'https://static.wixstatic.com/media/8e85e1_de8c49d68c604d00adf01909d76ffb0c~mv2.jpg/v1/fill/w_1200,h_1200,al_c/8e85e1_de8c49d68c604d00adf01909d76ffb0c~mv2.jpg',
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
  ],
  findById: function(id) {
    if (!id) return null;
    const all = [
      ...(this.bundles || []),
      ...(this.courses || []),
      ...(this.cookbooks || []),
      ...(this.freeResources || []),
      ...(this.services || [])
    ];
    return all.find(item => item.id === id) || null;
  }
};

// Asynchronously load the official Wix Headless SDK
async function createWixHeadlessClient() {
  try {
    const { createClient, OAuthStrategy } = await import('https://esm.sh/@wix/sdk');
    const { products } = await import('https://esm.sh/@wix/stores');
    const { currentCart } = await import('https://esm.sh/@wix/ecom');
    const { redirects } = await import('https://esm.sh/@wix/redirects');

    const client = createClient({
      modules: { products, currentCart, redirects },
      auth: OAuthStrategy({ clientId: WIX_CONFIG.clientId })
    });
    console.log('[Wix Headless] Client initialized with Client ID:', WIX_CONFIG.clientId);
    return client;
  } catch (err) {
    console.info('[Wix Headless] Running in local offline/fallback mode:', err.message);
    return null;
  }
}

// Storage Key for cross-page persistence
const CART_STORAGE_KEY = 'epicurean_flow_cart';

// Cart Drawer & eCommerce Manager Class
class CartManager {
  constructor() {
    this.cartItems = [];
    this.wixClient = null;
    this.appliedCoupon = null;
    this.couponError = null;
    this.drawerEl = document.getElementById('cart-drawer');
    this.backdropEl = document.getElementById('cart-backdrop') || document.getElementById('cart-overlay');
    this.cartItemsListEl = document.getElementById('cart-items-list') || document.getElementById('cart-items-container') || document.getElementById('cart-body');
    this.cartSubtotalEl = document.getElementById('cart-subtotal-val') || document.querySelector('.cart-subtotal-amount') || document.querySelector('.subtotal-amount');
    this.checkoutBtnEl = document.getElementById('btn-proceed-checkout');
    this.closeBtnEl = document.getElementById('close-cart-btn') || document.getElementById('cart-close-btn');

    // Load persisted coupon from localStorage
    try {
      this.appliedCoupon = localStorage.getItem('epicurean_flow_coupon') || null;
      if (typeof window !== 'undefined' && window.location && window.location.search) {
        const p = new URLSearchParams(window.location.search);
        const c = p.get('coupon');
        if (c && c.toUpperCase() === 'FLOWS10') {
          this.appliedCoupon = 'FLOWS10';
          localStorage.setItem('epicurean_flow_coupon', 'FLOWS10');
        }
      }
    } catch (e) {}

    // Load persisted cart from localStorage immediately on instantiate
    this.loadCart();
    this.init();
    this.renderCart();
  }

  loadCart() {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          this.cartItems = parsed;
        }
      }
    } catch (err) {
      console.warn('[CartManager] Error reading saved cart:', err);
      this.cartItems = [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.cartItems));
    } catch (err) {
      console.warn('[CartManager] Error saving cart:', err);
    }
  }

  applyCoupon(code) {
    if (!code || typeof code !== 'string') return;
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'FLOWS10') {
      const hasBundle = this.cartItems.some(i => i.isBundle || i.id === 'holiday-collection' || i.id === 'flavor-compromise-bundle');
      if (hasBundle) {
        this.couponError = 'Coupon FLOWS10 cannot be combined with promotional bundles. It applies exclusively to individual courses.';
        this.appliedCoupon = null;
        localStorage.removeItem('epicurean_flow_coupon');
      } else {
        const hasCourse = this.cartItems.some(i => i.isCourse || (PRODUCTS_DATA.courses && PRODUCTS_DATA.courses.some(c => c.id === i.id)));
        if (!hasCourse) {
          this.couponError = 'FLOWS10 is valid only on individual cooking courses. Add a course to your cart to claim 10% off.';
          this.appliedCoupon = null;
          localStorage.removeItem('epicurean_flow_coupon');
        } else {
          this.appliedCoupon = 'FLOWS10';
          this.couponError = null;
          localStorage.setItem('epicurean_flow_coupon', 'FLOWS10');
        }
      }
    } else {
      this.couponError = 'Invalid promo code. Please check your code and try again.';
      this.appliedCoupon = null;
      localStorage.removeItem('epicurean_flow_coupon');
    }
    this.renderCart();
  }

  removeCoupon() {
    this.appliedCoupon = null;
    this.couponError = null;
    localStorage.removeItem('epicurean_flow_coupon');
    this.renderCart();
  }

  async init() {
    const cartToggleBtns = document.querySelectorAll('.cart-btn, #open-cart-btn');
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

    // Escape key closes cart drawer
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.drawerEl && this.drawerEl.classList.contains('open')) {
        this.closeDrawer();
      }
    });

    // Cross-tab and window sync: if another tab updates cart, reflect here
    window.addEventListener('storage', (e) => {
      if (e.key === CART_STORAGE_KEY) {
        this.loadCart();
        this.renderCart();
      }
    });

    // Global listener for all buy & add-to-cart buttons
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-add-to-cart, .btn-buy-trigger');
      if (btn) {
        e.preventDefault();
        const productId = btn.getAttribute('data-id') || btn.getAttribute('data-product-id');
        const title = btn.getAttribute('data-title');
        const price = btn.getAttribute('data-numeric') || btn.getAttribute('data-price');
        const image = btn.getAttribute('data-image');
        this.addItem(productId, { title, price, image });
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

  openCart() {
    this.openDrawer();
  }

  closeCart() {
    this.closeDrawer();
  }

  async addItem(productId, meta = null) {
    if (typeof productId === 'object' && productId !== null) {
      meta = productId;
      productId = productId.id;
    }

    // Direct Amazon-only physical book routing
    if (productId === 'lets-eat-mediterranean' || (meta && meta.isPhysical)) {
      window.open('https://www.amazon.com/s?k=Eliane+Muskus+Let%27s+Eat', '_blank');
      return;
    }

    // Find product in catalog (bundles first, then cookbooks, courses, services)
    let item = (PRODUCTS_DATA.bundles || []).find(p => p.id === productId);
    if (!item && PRODUCTS_DATA.cookbooks) {
      item = PRODUCTS_DATA.cookbooks.find(p => p.id === productId);
    }
    if (!item && PRODUCTS_DATA.courses) {
      item = PRODUCTS_DATA.courses.find(p => p.id === productId);
    }
    if (!item && PRODUCTS_DATA.services) {
      item = PRODUCTS_DATA.services.find(p => p.id === productId);
    }

    if (!item) {
      const rawPrice = meta && meta.price !== undefined ? meta.price : 9.00;
      const priceVal = typeof rawPrice === 'number' ? rawPrice : (parseFloat(String(rawPrice).replace(/[^0-9.]/g, '')) || 9.00);
      item = {
        id: productId || 'custom-item-' + Date.now(),
        title: meta && meta.title ? meta.title : 'Selected Culinary Publication',
        price: '€' + priceVal.toFixed(2),
        numericPrice: priceVal,
        image: meta && meta.image ? meta.image : 'images/logo.png',
        isBundle: !!(meta && meta.isBundle)
      };
    }

    const isCourse = !!(PRODUCTS_DATA.courses && PRODUCTS_DATA.courses.some(c => c.id === item.id));
    const isBundle = !!item.isBundle || item.id === 'holiday-collection' || item.id === 'flavor-compromise-bundle';

    this.cartItems.push({
      id: item.id,
      title: item.title,
      price: item.price,
      numericPrice: Number(item.numericPrice) || 9.00,
      image: item.image,
      isBundle: isBundle,
      isCourse: isCourse,
      wixId: item.wixId || null
    });

    this.saveCart();
    this.renderCart();
    this.openDrawer();

    // If connected to Wix Headless e-commerce, sync with currentCart
    if (this.wixClient && item.wixId) {
      try {
        await this.wixClient.currentCart.addToCurrentCart({
          lineItems: [
            {
              catalogReference: {
                appId: '215238eb-22a5-4c36-9e7b-e7c08025e04e',
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
    if (index >= 0 && index < this.cartItems.length) {
      this.cartItems.splice(index, 1);
      this.saveCart();
      this.renderCart();
    }
  }

  renderCart() {
    const count = this.cartItems.length;

    // Update ALL badge elements across headers/navs
    const badges = document.querySelectorAll('.cart-badge, #cart-count');
    badges.forEach(badge => {
      badge.textContent = count;
      badge.style.transform = 'scale(1.25)';
      setTimeout(() => { badge.style.transform = 'scale(1)'; }, 200);
    });

    if (!this.cartItemsListEl) return;

    if (count === 0) {
      this.cartItemsListEl.innerHTML = `
        <div class="cart-empty-message">
          <div class="cart-empty-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </div>
          <p class="cart-empty-title">Your shopping bag is empty</p>
          <p class="cart-empty-desc">Explore our cookbooks, chef guides, and culinary masterclasses.</p>
          <a href="cookbooks.html" class="btn btn-outline btn-sm">Browse Books &amp; Courses</a>
        </div>
      `;
      // Also hide legacy empty state if present
      const legacyEmpty = document.getElementById('cart-empty-state');
      if (legacyEmpty && legacyEmpty !== this.cartItemsListEl) {
        legacyEmpty.style.display = 'none';
      }
      // Empty cart subtotal update
      const subtotalElZero = document.getElementById('cart-subtotal-val');
      const footerContainerZero = document.querySelector('.cart-subtotal') || (subtotalElZero ? subtotalElZero.parentElement : null);
      if (footerContainerZero) {
        footerContainerZero.innerHTML = `
          <div style="display: flex; justify-content: space-between; width: 100%; font-size: 1.15rem; color: var(--color-ink); font-weight: 700;">
            <span>Subtotal:</span>
            <span id="cart-subtotal-val">€0.00</span>
          </div>
        `;
      }
      return;
    }

    let subtotal = 0;
    let html = '';

    this.cartItems.forEach((item, idx) => {
      const p = Number(item.numericPrice) || 0;
      subtotal += p;
      html += `
        <div class="cart-item-row">
          <img src="${item.image}" alt="${item.title}" class="cart-item-img" onerror="this.src='images/logo.png'">
          <div class="cart-item-details">
            <div class="cart-item-title">${item.title}</div>
            <div class="cart-item-price">${item.price || ('€' + p.toFixed(2))}</div>
          </div>
          <button type="button" class="cart-item-remove" onclick="window.cartManager.removeItem(${idx})" aria-label="Remove item" title="Remove">✕</button>
        </div>
      `;
    });

    // Evaluate coupon code rules
    let discountAmount = 0;
    let discountedCourseTitle = '';

    if (this.appliedCoupon === 'FLOWS10') {
      const hasBundle = this.cartItems.some(i => i.isBundle || i.id === 'holiday-collection' || i.id === 'flavor-compromise-bundle');
      if (hasBundle) {
        this.couponError = 'Coupon FLOWS10 cannot be combined with promotional bundles. It applies exclusively to individual courses.';
        this.appliedCoupon = null;
        try { localStorage.removeItem('epicurean_flow_coupon'); } catch(e){}
      } else {
        const eligibleCourse = this.cartItems.find(i => i.isCourse || (PRODUCTS_DATA.courses && PRODUCTS_DATA.courses.some(c => c.id === i.id)));
        if (eligibleCourse) {
          discountAmount = Number((eligibleCourse.numericPrice * 0.10).toFixed(2));
          discountedCourseTitle = eligibleCourse.title;
        } else {
          this.couponError = 'FLOWS10 is valid only on individual courses. Add a course to apply discount.';
          this.appliedCoupon = null;
          try { localStorage.removeItem('epicurean_flow_coupon'); } catch(e){}
        }
      }
    }

    const finalTotal = Math.max(0, subtotal - discountAmount);

    // Contextual Upsell Recommendation (Section 8 of Brief)
    const hasConsultation = this.cartItems.some(i => i.id === 'consultation-menu-planning');
    if (!hasConsultation) {
      html += `
        <div class="cart-upsell-section">
          <div class="cart-upsell-header">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span>Chef's Recommended Pairing</span>
          </div>
          <div class="cart-upsell-card">
            <img src="https://static.wixstatic.com/media/8e85e1_de8c49d68c604d00adf01909d76ffb0c~mv2.jpg/v1/fill/w_1200,h_1200,al_c/8e85e1_de8c49d68c604d00adf01909d76ffb0c~mv2.jpg" alt="30-Minute Culinary Consultation with Chef Eliane" class="cart-upsell-img">
            <div class="cart-upsell-info">
              <div class="cart-upsell-title">30-Min Menu Planning Consultation</div>
              <div class="cart-upsell-price">€65.00</div>
            </div>
            <button type="button" class="btn-add-upsell" onclick="window.cartManager.addItem('consultation-menu-planning')">+ Add</button>
          </div>
        </div>
      `;
    }

    // Promo Code Input Module
    html += `
      <div class="cart-promo-container" style="margin: 16px 0 8px 0; padding: 12px; background: rgba(0,0,0,0.02); border: 1px solid var(--color-border-light, #e0dcd5); border-radius: 8px;">
        <div style="display: flex; gap: 8px;">
          <input type="text" id="cart-promo-input" placeholder="Promo code (e.g. FLOWS10)" value="${this.appliedCoupon || ''}" style="flex: 1; padding: 8px 12px; border: 1px solid #ccc; border-radius: 4px; font-size: 0.85rem; text-transform: uppercase;">
          <button type="button" class="btn btn-outline btn-sm" id="cart-promo-apply-btn" style="padding: 8px 14px; font-size: 0.85rem; white-space: nowrap;">Apply</button>
        </div>
        ${this.appliedCoupon ? `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px; font-size: 0.82rem; color: #2E7D32;">
            <span>✓ Code <strong>FLOWS10</strong> applied (10% off ${discountedCourseTitle ? ('&ldquo;' + discountedCourseTitle + '&rdquo;') : 'first course'})</span>
            <button type="button" onclick="window.cartManager.removeCoupon()" style="background: none; border: none; color: #c00; font-size: 0.78rem; text-decoration: underline; cursor: pointer; padding: 0;">Remove</button>
          </div>
        ` : ''}
        ${this.couponError ? `
          <div style="margin-top: 8px; font-size: 0.82rem; color: #d32f2f; line-height: 1.4;">${this.couponError}</div>
        ` : ''}
      </div>
    `;

    this.cartItemsListEl.innerHTML = html;

    // Attach listener for Promo Apply button
    const promoBtn = document.getElementById('cart-promo-apply-btn');
    const promoInput = document.getElementById('cart-promo-input');
    if (promoBtn && promoInput) {
      promoBtn.onclick = () => {
        this.applyCoupon(promoInput.value);
      };
      promoInput.onkeydown = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.applyCoupon(promoInput.value);
        }
      };
    }

    // Hide legacy empty state element if present
    const legacyEmpty = document.getElementById('cart-empty-state');
    if (legacyEmpty && legacyEmpty !== this.cartItemsListEl) {
      legacyEmpty.style.display = 'none';
    }

    // Render Subtotal & Total dynamically in container
    const subtotalContainer = document.querySelector('.cart-subtotal');
    if (subtotalContainer) {
      if (discountAmount > 0) {
        subtotalContainer.innerHTML = `
          <div style="display: flex; flex-direction: column; width: 100%; gap: 6px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.9rem; color: var(--color-ink-subtle); font-weight: 500;">
              <span>Subtotal:</span>
              <span>€${subtotal.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.9rem; color: #2E7D32; font-weight: 600;">
              <span>Discount (${this.appliedCoupon} - 10%):</span>
              <span>-€${discountAmount.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 1.15rem; color: var(--color-ink); font-weight: 700; border-top: 1px solid var(--color-border-light, #e0dcd5); padding-top: 8px; margin-top: 4px;">
              <span>Total:</span>
              <span id="cart-subtotal-val">€${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        `;
      } else {
        subtotalContainer.innerHTML = `
          <div style="display: flex; justify-content: space-between; width: 100%; font-size: 1.15rem; color: var(--color-ink); font-weight: 700;">
            <span>Subtotal:</span>
            <span id="cart-subtotal-val">€${subtotal.toFixed(2)}</span>
          </div>
        `;
      }
    }
  }

  async proceedToCheckout() {
    console.log('[CartManager] proceedToCheckout invoked! Cart items:', this.cartItems.length);
    const originalText = this.checkoutBtnEl ? this.checkoutBtnEl.textContent : '';
    if (this.checkoutBtnEl) {
      this.checkoutBtnEl.textContent = 'Connecting to Secure Checkout...';
      this.checkoutBtnEl.style.opacity = '0.75';
      this.checkoutBtnEl.style.pointerEvents = 'none';
    }

    if (this.wixClient && this.wixClient.currentCart) {
      console.log('[CartManager] wixClient ready, checking items...');
      try {
        // Sync any cart items to Wix server cart if needed
        for (const item of this.cartItems) {
          console.log('[CartManager] Checking item wixId:', item.title, item.wixId);
          if (item.wixId) {
            try {
              const addRes = await this.wixClient.currentCart.addToCurrentCart({
                lineItems: [{
                  catalogReference: {
                    appId: '215238eb-22a5-4c36-9e7b-e7c08025e04e',
                    catalogItemId: item.wixId
                  },
                  quantity: 1
                }]
              });
              console.log('[CartManager] Synced item to Wix cart:', addRes);
            } catch (addErr) {
              console.warn('[CartManager] Item add note:', addErr.message);
            }
          }
        }

        console.log('[CartManager] Calling createCheckoutFromCurrentCart...');
        const checkout = await this.wixClient.currentCart.createCheckoutFromCurrentCart({
          channelType: 'WEB'
        });
        console.log('[CartManager] Checkout created:', checkout);

        if (checkout && checkout.checkoutId && this.wixClient.redirects) {
          console.log('[CartManager] Creating redirect session for checkoutId:', checkout.checkoutId);
          const redirect = await this.wixClient.redirects.createRedirectSession({
            ecomCheckout: { checkoutId: checkout.checkoutId },
            callbacks: {
              postFlowUrl: window.location.href,
              thankYouPageUrl: window.location.origin
            }
          });
          console.log('[CartManager] Redirect session result:', redirect);

          if (redirect && redirect.redirectSession && redirect.redirectSession.fullUrl) {
            console.log('[CartManager] REDIRECTING TO:', redirect.redirectSession.fullUrl);
            if (window.top) {
              window.top.location.href = redirect.redirectSession.fullUrl;
            } else {
              window.location.href = redirect.redirectSession.fullUrl;
            }
            return;
          }
        }
      } catch (err) {
        console.error('[CartManager] Wix Headless checkout error:', err);
      }
    } else {
      console.warn('[CartManager] wixClient not ready, fallback triggered');
    }

    // 1. Notify parent Wix page if running inside an iframe
    if (window.parent && window.parent !== window) {
      try {
        window.parent.postMessage({ type: 'NAVIGATE_CHECKOUT' }, '*');
      } catch (e) {}
    }

    console.log('[CartManager] Falling back to standard store cart');
    const targetUrl = `${WIX_CONFIG.pagesDomain}cart-page`;
    if (window.top && window.top !== window) {
      try {
        window.top.location.href = targetUrl;
        return;
      } catch (e) {}
    }
    window.location.href = targetUrl;
  }
}

// ==========================================================================
// DYNAMIC WIX STORE SYNCHRONIZATION ENGINE
// Allows Chef Eliane to manage products in Wix Dashboard -> updates website live
// ==========================================================================
class WixProductsSync {
  constructor() {
    this.wixClient = null;
    this.init();
  }

  async init() {
    // 1. Listen for Wix Velo messages if embedded in Wix
    window.addEventListener('message', (event) => {
      try {
        if (!event.data) return;
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data.type === 'SYNC_WIX_PRODUCTS' || data.type === 'WIX_PRODUCTS') {
          const items = data.products || data.items || [];
          if (Array.isArray(items) && items.length > 0) {
            console.log('[WixProductsSync] Received live products via Wix Velo bridge:', items.length);
            this.renderProducts(items);
          }
        }
      } catch (err) {
        console.debug('[WixProductsSync] Non-json window message ignored');
      }
    });

    // 2. Query Wix Headless Stores if client available
    try {
      this.wixClient = await createWixHeadlessClient();
      if (this.wixClient && this.wixClient.products) {
        console.log('[WixProductsSync] Fetching live products from Wix Stores query...');
        const res = await this.wixClient.products.queryProducts().limit(12).find();
        if (res && res.items && res.items.length > 0) {
          console.log('[WixProductsSync] Wix Stores returned live products:', res.items.length);
          this.renderProducts(res.items);
        }
      }
    } catch (err) {
      console.info('[WixProductsSync] Wix Stores live query note:', err.message);
    }
  }

  renderProducts(items) {
    if (!items || items.length === 0) return;

    // Filter out Wix store default template dummy goods (vases, eyewear, sweaters, etc.)
    const dummyItemKeywords = ['vase', 'tote bag', 'eye serum', 'sweater', 'eyeglasses', 'chair', 'cleanser', 'baseball cap', 'water bottle', 'diffuser', 'earrings', 't-shirt', 'sunglasses'];
    const validItems = items.filter(item => {
      const name = (item.name || item.title || '').toLowerCase();
      return !dummyItemKeywords.some(keyword => name.includes(keyword));
    });

    if (validItems.length === 0) {
      console.info('[WixProductsSync] Only default Wix store demo items detected; preserving curated chef catalog.');
      return;
    }

    const newIds = validItems.map(i => i._id || i.id).join(',');
    if (this.renderedIds === newIds) return;
    this.renderedIds = newIds;

    // Separate products into Courses vs Cookbooks
    const courses = [];
    const cookbooks = [];

    validItems.forEach(item => {
      const name = (item.name || item.title || '').toLowerCase();
      const ribbon = (item.ribbon || item.badge || '').toLowerCase();
      const collections = (item.collections || item.collectionIds || []).map(c => 
        (typeof c === 'string' ? c : (c.name || c.title || '')).toLowerCase()
      );

      const isCourse = 
        collections.some(c => c.includes('course') || c.includes('masterclass') || c.includes('academy') || c.includes('workbook') || c.includes('curriculum')) ||
        ribbon.includes('course') || ribbon.includes('masterclass') || ribbon.includes('academy') || ribbon.includes('workbook') ||
        name.includes('course') || name.includes('masterclass') || name.includes('academy') ||
        name.includes('class') || name.includes('workshop') || name.includes('module') ||
        name.includes('coursebook') || name.includes('workbook') || name.includes('curriculum');

      if (isCourse) {
        courses.push(item);
      } else {
        cookbooks.push(item);
      }
    });

    // High-end responsive card generator
    const renderCard = (item, type) => {
      const id = item._id || item.id;
      const title = item.name || item.title || 'Epicurean Flow Edition';
      const rawPrice = item.price?.price ?? item.priceData?.price ?? item.numericPrice ?? 0;
      // Strictly enforce Euro (€) currency across all product display cards
      const formattedPrice = `€${Number(rawPrice || 0).toFixed(2)}`;

      let imgUrl = 'https://static.wixstatic.com/media/30dece_1857ef21db784a739672d128e48f7dc7f002.jpg/v1/fill/w_1200,h_800,enc_auto/file.jpeg';
      if (item.media?.mainMedia?.image?.url) {
        imgUrl = item.media.mainMedia.image.url;
        if (imgUrl.startsWith('wix:image://v1/')) {
          const match = imgUrl.match(/wix:image:\/\/v1\/([^/]+)/);
          if (match) imgUrl = `https://static.wixstatic.com/media/${match[1]}/v1/fit/w_800,h_800,q_90/file.jpg`;
        }
      } else if (item.image) {
        imgUrl = item.image;
      }

      const defaultBadge = type === 'course' ? 'Masterclass Course' : 'Digital Cookbook';
      const badge = item.ribbon || item.badge || defaultBadge;
      const descSnippet = item.description 
        ? item.description.replace(/<[^>]*>?/gm, '').slice(0, 130) + '...' 
        : (type === 'course' 
            ? 'Chef-led video masterclass with step-by-step techniques and comprehensive kitchen workbook.' 
            : 'Chef-tested recipes with authentic Mediterranean roots, flavor pairing notes, and chef guidance.');

      const productSlug = item.slug || item.productPageUrl?.path || '';
      const detailUrl = productSlug.startsWith('http') ? productSlug : `product-detail.html?id=${id}`;
      const safeTitle = title.replace(/'/g, "\\'").replace(/"/g, '&quot;');

      return `
        <article class="catalog-card-editorial" data-wix-id="${id}">
          <div class="catalog-card-media">
            <img src="${imgUrl}" alt="${safeTitle}" class="catalog-card-img" onerror="this.src='images/lets-eat-cover.jpg'">
            <span class="card-badge-pill badge-masterclass">${badge}</span>
          </div>
          <div class="catalog-card-body">
            <div class="catalog-card-meta">
              <span class="catalog-card-tag">${type === 'course' ? 'Culinary Academy' : 'Chef Edition'}</span>
              <span class="catalog-card-price">${formattedPrice}</span>
            </div>
            <h3 class="catalog-card-heading">${title}</h3>
            <p class="catalog-card-paragraph">
              ${descSnippet}
            </p>
            <div class="catalog-card-btn-group">
              <button type="button" class="btn btn-primary btn-sm btn-add-to-cart" 
                data-id="${id}"
                data-title="${safeTitle}"
                data-numeric="${rawPrice || 0}"
                data-price="${formattedPrice}"
                data-image="${imgUrl}">
                Add to Cart &bull; ${formattedPrice}
              </button>
              <a href="${detailUrl}" class="btn btn-outline btn-sm">View Details</a>
            </div>
          </div>
        </article>
      `;
    };

    // 1. Render Courses into #courses-live-grid
    const coursesGridEl = document.getElementById('courses-live-grid');
    if (coursesGridEl && courses.length > 0) {
      coursesGridEl.innerHTML = courses.map(item => renderCard(item, 'course')).join('');
      coursesGridEl.style.display = 'grid';
      const staticGrid = document.getElementById('courses-static-grid');
      if (staticGrid) staticGrid.style.display = 'none';
      const coursePlaceholder = document.getElementById('courses-curation-placeholder');
      if (coursePlaceholder) coursePlaceholder.style.display = 'none';
      console.log(`[WixProductsSync] Rendered ${courses.length} live course(s) into #courses-live-grid`);
    }

    // 2. Render Cookbooks into #cookbooks-live-grid
    const cookbooksGridEl = document.getElementById('cookbooks-live-grid');
    if (cookbooksGridEl && cookbooks.length > 0) {
      cookbooksGridEl.innerHTML = cookbooks.map(item => renderCard(item, 'cookbook')).join('');
      cookbooksGridEl.style.display = 'grid';
      const staticGrid = document.getElementById('cookbooks-static-grid');
      if (staticGrid) staticGrid.style.display = 'none';
      const cookbookPlaceholder = document.getElementById('cookbooks-curation-placeholder');
      if (cookbookPlaceholder) cookbookPlaceholder.style.display = 'none';
      console.log(`[WixProductsSync] Rendered ${cookbooks.length} live cookbook(s) into #cookbooks-live-grid`);
    }

    // 3. Fallback for legacy generic grids if present
    const genericGrid = document.getElementById('featured-products-grid') || document.getElementById('catalog-grid');
    if (genericGrid) {
      genericGrid.innerHTML = validItems.map(item => renderCard(item, 'cookbook')).join('');
    }
  }
}

// Automatically bind singleton instance on DOM load or immediately
function setupCartGlobals() {
  window.cartManager = new CartManager();
  window.wixProductsSync = new WixProductsSync();
  window.CartManager = {
    addItem: (prod, meta) => window.cartManager.addItem(prod, meta),
    removeItem: (idx) => window.cartManager.removeItem(idx),
    openCart: () => window.cartManager.openDrawer(),
    closeCart: () => window.cartManager.closeDrawer()
  };
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupCartGlobals);
} else {
  setupCartGlobals();
}
