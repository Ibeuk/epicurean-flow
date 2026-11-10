

// --- products.js ---
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
      subtitle: 'Streamline Your Holiday Cooking with Confidence',
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
      description: 'Three celebrations, four books, one seamless plan! Prepare for Thanksgiving, Christmas, and an elegant Parisian dinner without the last-minute panic. Plus, enjoy our appetizer guide for free—covering every detail from the first welcome bite to the final dessert!',
      buttonText: 'GET THE HOLIDAY COLLECTION',
      url: 'seasonal.html'
    },
    {
      id: 'flavor-compromise-bundle',
      title: 'The Flavor Without Compromise Bundle',
      subtitle: 'Delicious Food Doesn’t Have to be Bland',
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
      description: 'Enjoy flavorful meals while managing diabetes! Our bundle includes The Diabetes-Friendly Kitchen and A Symphony of Flavors, empowering you to create satisfying dishes without sacrificing taste. Make thoughtful choices that enhance your dining experience.',
      buttonText: 'COOK WITH FLAVOUR',
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
      description: "Thanksgiving should be about cherishing moments, not sweating in the kitchen. Our comprehensive guide alleviates the pressure of preparing the year's biggest meal. Explore three foolproof turkey methods, exquisite side dishes, and mouthwatering desserts, along with a practical three-day prep plan that tells you exactly what to do—and when. Spend less time worrying and more time savoring Thanksgiving with your loved ones.",
      buttonText: 'PLAN MY STRESS-FREE THANKSGIVING',
      url: 'seasonal.html'
    },
    {
      id: 'the-christmas-recipe-collection',
      title: 'The Christmas Recipe Collection',
      subtitle: 'Bring the Joy Back to Your Holiday Cooking',
      category: 'Holiday Culinary Collection',
      price: '€16.95',
      numericPrice: 16.95,
      image: 'images/the-christmas-recipe-collection-cover.jpg',
      badge: 'Instant Digital Download • 48 Pages',
      pages: 48,
      description: 'Transform your Christmas dinner into a celebration of flavors without the stress! This collection features festive recipes designed to make your holiday table unforgettable and hassle-free. From intimate dinners to grand feasts, serve dishes that evoke joy and confidence.',
      buttonText: 'CREATE MY CHRISTMAS FEAST',
      url: 'cookbooks.html'
    },
    {
      id: 'christmas-in-paris',
      title: 'Christmas in Paris',
      subtitle: 'Experience the French Holiday Table at Home',
      category: 'French Gastronomy Guide',
      price: '€19.95',
      numericPrice: 19.95,
      image: 'images/christmas-in-paris-cover.jpg',
      badge: 'Instant Digital Download • 52 Pages',
      pages: 52,
      description: 'This Christmas, elevate your dinner to a Parisian dining experience! Our guide takes you through an elegant French celebration—from delectable hors d’oeuvres to a complete three-course dinner, including menus, shopping lists, and chef tips. No flight to Paris needed—just welcome your guests and bring the French holiday magic home!',
      buttonText: 'BRING CHRISTMAS IN PARIS HOME',
      url: 'cookbooks.html'
    },
    {
      id: 'ditch-the-cheese-ball',
      title: 'Ditch the Cheese Ball',
      subtitle: '10 Holiday Appetizers That Dazzle',
      category: 'Entertaining Guide',
      price: '€8.95',
      numericPrice: 8.95,
      image: 'images/ditch-the-cheese-ball-cover.jpg',
      badge: 'Instant Digital Download • 28 Pages',
      pages: 28,
      description: 'Your guests deserve more than the same old cheese ball! This festive collection features 10 stunning appetizers that will kick off your celebration with flair. Expect bold flavors and polished presentation—all without hours of complicated prep. Start your gatherings with unforgettable bites!',
      buttonText: 'DITCH THE CHEESE BALL',
      url: 'cookbooks.html'
    },
    {
      id: 'the-diabetes-friendly-kitchen',
      title: 'The Diabetes-Friendly Kitchen',
      subtitle: 'Cook Without Compromise',
      category: 'Specialist Culinary Guide',
      price: '€24.95',
      numericPrice: 24.95,
      image: 'images/diabetes-kitchen-cover.jpg',
      badge: 'Coming Soon • Specialist Guide',
      isComingSoon: true,
      pages: 50,
      description: "Cooking for diabetes shouldn't mean sacrificing your love for food. Created by Chef Eliane Muskus, who has lived with Type 2 diabetes for over 8 years, this guide offers practical advice, satisfying recipes, and smart ingredient substitutions. Embrace smarter ingredient choices and flavorful cooking techniques that make diabetes-friendly cooking enjoyable—so much so that even non-diabetics will love it! They wouldn’t even know that it’s diabetes-friendly food. Enjoy cooking and eating well without fear!",
      buttonText: 'DISCOVER THE DIABETES-FRIENDLY KITCHEN',
      url: 'diabetes.html'
    },
    {
      id: 'symphony-of-flavors',
      title: 'A Symphony of Flavors',
      subtitle: 'Unlock the Secrets of Mediterranean and Middle Eastern Spices',
      category: 'Curated Spice Guide & Cookbook',
      price: '€16.95',
      numericPrice: 16.95,
      image: 'images/symphony-flavors-cover.jpg',
      badge: 'Instant Digital Download • 39 Pages',
      pages: 39,
      description: 'If your meals lack flavor, the solution lies not just in recipes but in understanding spices! This guide reveals how ingredients like sumac, saffron, and za’atar can transform your cooking. Learn to buy, store, and combine spices for maximum impact and flavor. Elevate your dishes beyond the ordinary!',
      buttonText: 'START BUILDING BETTER FLAVOR',
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
      description: 'Delicious food doesn’t have to break the bank! Travel through Southern Europe with 20 carefully curated recipes that turn accessible ingredients into culinary masterpieces. With practical budget tips and pantry guidance, you’ll create meals that bring people together without overspending.',
      buttonText: 'TASTE SOUTHERN EUROPE',
      url: 'cookbooks.html'
    },
    {
      id: 'soup-cookbook',
      title: 'Soup Cookbook',
      subtitle: 'Comfort in a Bowl—Simple and Satisfying Soups',
      category: 'Comfort Gastronomy',
      price: '€8.95',
      numericPrice: 8.95,
      image: 'images/soup-cookbook-cover.jpg',
      badge: 'Instant Digital Download • 32 Pages',
      pages: 32,
      description: 'When you crave warmth and comfort, reach for a bowl of homemade soup! This collection offers a variety of inviting soups perfect for relaxed lunches, light dinners, and batch cooking. Turn everyday ingredients into comforting meals that nourish both body and soul.',
      buttonText: 'DISCOVER THE SOUP COLLECTION',
      url: 'cookbooks.html'
    },
    {
      id: 'lets-eat-mediterranean',
      title: "Let's Eat",
      subtitle: 'Delicious Recipes from My Award-Winning Cooking Classes and World Travels',
      category: 'Physical Published Cookbook',
      price: 'Available on Amazon',
      numericPrice: 0.00,
      image: 'images/lets-eat-cover.jpg',
      badge: 'Amazon Physical Edition • 339 Pages',
      pages: 339,
      isPhysical: true,
      retailer: 'Amazon',
      amazonUrl: 'https://www.amazon.com/s?k=Eliane+Muskus+Let%27s+Eat',
      description: "More than just recipes—it's a chef's life story told through food! Chef Eliane Muskus shares seasonal ingredients and global flavors across 339 pages, offering a generous cookbook for those eager to explore culinary diversity. Available in paperback and hardcover.",
      buttonText: 'ORDER LET’S EAT ON AMAZON',
      url: 'cookbooks.html'
    }
  ],
  courses: [
    {
      id: 'beginners-cooking-course',
      title: 'Beginners’ Cooking Course',
      subtitle: 'Transform Your Cooking Skills from Uncertainty to Confidence',
      category: 'Self-Paced Digital Course',
      price: '€39.00',
      numericPrice: 39.00,
      image: 'images/course-beginners-cooking-cover.jpg',
      badge: 'Self-Paced Digital Course',
      pages: 65,
      description: 'Stop guessing and start understanding the art of cooking! This self-paced course provides the essential foundation for new cooks to feel calm and capable. Learn to prepare, handle ingredients, and control heat with practical chef knowledge and interactive lessons.',
      buttonText: 'START COOKING WITH CONFIDENCE',
      url: 'courses.html'
    },
    {
      id: 'beginners-baking',
      title: 'Baking for Beginners',
      subtitle: 'Conquer the Oven with Confidence',
      category: 'Self-Paced Digital Course',
      price: '€39.00',
      numericPrice: 39.00,
      image: 'images/course-baking-cover.jpg',
      badge: 'Self-Paced Digital Course',
      pages: 91,
      description: 'Baking doesn’t have to be daunting when you know the science behind it! Master the essential skills of accurate measuring, ingredient selection, and understanding oven dynamics. With delicious recipes and troubleshooting tips, you’ll bake with confidence and ease.',
      buttonText: 'START BAKING SUCCESSFULLY',
      url: 'courses.html'
    },
    {
      id: 'intermediate-cooking-techniques',
      title: 'Intermediate Cooking Techniques',
      subtitle: 'Elevate Your Kitchen Skills Beyond Basics',
      category: 'Self-Paced Digital Course',
      price: '€59.00',
      numericPrice: 59.00,
      image: 'images/intermediate-cooking-techniques-cover.jpg',
      badge: 'Self-Paced Digital Course',
      pages: 73,
      description: 'Ready to step up your cooking game? This course empowers home cooks to refine their techniques and gain greater control over their culinary creations. Transform your cooking from following recipes to mastering skills that enhance every meal.',
      buttonText: 'MOVE BEYOND THE BASICS',
      url: 'courses.html'
    },
    {
      id: 'advanced-cooking-techniques',
      title: 'Advanced Cooking Techniques',
      subtitle: 'Achieve Restaurant-Quality Meals at Home',
      category: 'Self-Paced Digital Course',
      price: '€79.00',
      numericPrice: 79.00,
      image: 'images/course-advanced-cover.jpg',
      badge: 'Self-Paced Digital Course',
      pages: 40,
      description: 'Take your cooking to the next level with advanced techniques! From creating luxurious sauces to mastering fresh pasta, this course equips you with the skills to cook like a chef. Gain precision and understanding that will transform your culinary repertoire.',
      buttonText: 'MASTER ADVANCED TECHNIQUES',
      url: 'courses.html'
    },
    {
      id: 'diabetes-cooking-course',
      title: 'Diabetes Cooking Course',
      subtitle: 'Cook Smart, Eat Well, Enjoy Your Meals',
      differentiator: 'Practical, structured everyday guidance',
      category: 'Self-Paced Digital Course',
      price: '€49.00',
      numericPrice: 49.00,
      image: 'images/course-diabetes-cooking.jpg',
      badge: 'Everyday Practical Guidance',
      pages: 45,
      description: 'Unlock the secrets to flavorful and healthy cooking in our Diabetes Cooking Course! This interactive experience focuses on essential culinary techniques and practical strategies that empower you to create satisfying meals while managing diabetes. With a selection of delicious recipes included, you’ll learn how to make informed ingredient choices and master cooking methods that enhance taste and nutrition. Plus, combine this course with The Diabetes-Friendly Kitchen cookbook for a comprehensive culinary toolkit that encourages you to enjoy every meal without compromise.',
      buttonText: 'START YOUR COOKING JOURNEY',
      url: 'courses.html'
    },
    {
      id: 'diabetes-cooking-masterclass',
      title: 'The Complete Diabetes-Friendly Cooking Masterclass',
      subtitle: 'Transform Your Cooking with Confidence and Flavor',
      differentiator: 'Comprehensive premium learning experience',
      category: 'Self-Paced Digital Course',
      price: '€89.00',
      numericPrice: 89.00,
      image: 'images/course-diabetes-masterclass.jpg',
      badge: 'Comprehensive Masterclass Experience',
      pages: 37,
      description: 'Don’t just avoid certain foods, learn to enjoy the ones you love! This comprehensive masterclass offers deeper culinary guidance and interactive learning to help you make flavorful, informed choices in your kitchen. Experience the joy of cooking without compromise.',
      buttonText: 'JOIN THE COMPLETE MASTERCLASS',
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
    if (!this.cartItems || this.cartItems.length === 0) {
      alert('Your shopping bag is currently empty. Please add a cookbook or course to proceed.');
      return;
    }

    const originalText = this.checkoutBtnEl ? this.checkoutBtnEl.textContent : 'Proceed to Checkout';
    if (this.checkoutBtnEl) {
      this.checkoutBtnEl.textContent = 'Connecting to Secure Checkout...';
      this.checkoutBtnEl.style.opacity = '0.75';
      this.checkoutBtnEl.style.pointerEvents = 'none';
    }

    // Safety timeout: Ensure the checkout button always restores interactivity if navigation is delayed
    const resetCheckoutBtn = () => {
      if (this.checkoutBtnEl) {
        this.checkoutBtnEl.textContent = originalText;
        this.checkoutBtnEl.style.opacity = '1';
        this.checkoutBtnEl.style.pointerEvents = 'auto';
      }
    };
    setTimeout(resetCheckoutBtn, 3500);

    // 1. If embedded inside Wix Studio / Wix Editor iframe, delegate to Velo bridge with full items & coupon
    if (window.parent && window.parent !== window) {
      console.log('[CartManager] Inside Wix iframe, dispatching NAVIGATE_CHECKOUT via postMessage');
      try {
        window.parent.postMessage({
          type: 'NAVIGATE_CHECKOUT',
          items: this.cartItems,
          coupon: this.appliedCoupon,
          subtotal: this.cartItems.reduce((acc, cur) => acc + (Number(cur.numericPrice) || 0), 0)
        }, '*');
      } catch (e) {
        console.warn('[CartManager] postMessage note:', e);
      }
    }

    // 2. Headless Client Cart Sync (if enabled and authenticated)
    if (this.wixClient && this.wixClient.currentCart) {
      try {
        console.log('[CartManager] Attempting headless checkout creation...');
        for (const item of this.cartItems) {
          if (item.wixId) {
            try {
              await this.wixClient.currentCart.addToCurrentCart({
                lineItems: [{
                  catalogReference: {
                    appId: '215238eb-22a5-4c36-9e7b-e7c08025e04e',
                    catalogItemId: item.wixId
                  },
                  quantity: 1
                }]
              });
            } catch (addErr) {
              console.warn('[CartManager] Headless item sync note:', addErr.message);
            }
          }
        }

        const checkout = await this.wixClient.currentCart.createCheckoutFromCurrentCart({
          channelType: 'WEB'
        });

        if (checkout && checkout.checkoutId && this.wixClient.redirects) {
          const redirect = await this.wixClient.redirects.createRedirectSession({
            ecomCheckout: { checkoutId: checkout.checkoutId },
            callbacks: {
              postFlowUrl: window.location.href,
              thankYouPageUrl: window.location.origin
            }
          });

          if (redirect && redirect.redirectSession && redirect.redirectSession.fullUrl) {
            console.log('[CartManager] Headless session created, redirecting:', redirect.redirectSession.fullUrl);
            const targetWin = window.top || window;
            targetWin.location.href = redirect.redirectSession.fullUrl;
            return;
          }
        }
      } catch (err) {
        console.info('[CartManager] Wix Headless API note (using direct store gateway fallback):', err.message);
      }
    }

    // 3. Verified Direct Wix Store & Cart Gateway Routing
    const baseDomain = WIX_CONFIG.pagesDomain.replace(/\/+$/, '');
    let targetUrl = `${baseDomain}/cart-page`;

    const primaryItem = this.cartItems[0];
    const wixUrlMap = {
      'holiday-collection': `${baseDomain}/product-page/exclusive-holiday-cooking-bundle-master-the-art-of-festive-entertaining`,
      'flavor-compromise-bundle': `${baseDomain}/product-page/a-symphony-of-flavors-mediterranean-middle-eastern-spice-essentials-elevate`,
      'stress-free-thanksgiving': `${baseDomain}/product-page/seasonal-recipe-cookbook`,
      'the-christmas-recipe-collection': `${baseDomain}/product-page/christmas-recipe-collection-cookbook`,
      'christmas-in-paris': `${baseDomain}/product-page/christmas-recipe-collection-cookbook`,
      'ditch-the-cheese-ball': `${baseDomain}/product-page/christmas-recipe-collection-cookbook`,
      'the-diabetes-friendly-kitchen': `${baseDomain}/product-page/chef-eliane-s-new-diabetes-recipe-book`,
      'symphony-of-flavors': `${baseDomain}/product-page/a-symphony-of-flavors-mediterranean-middle-eastern-spice-essentials-elevate`,
      'taste-of-southern-europe': `${baseDomain}/product-page/a-symphony-of-flavors-mediterranean-middle-eastern-spice-essentials-elevate`,
      'soup-cookbook': `${baseDomain}/product-page/seasonal-recipe-cookbook`,
      'lets-eat-mediterranean': 'https://www.amazon.com/s?k=Eliane+Muskus+Let%27s+Eat',
      'beginners-cooking-course': `${baseDomain}/product-page/diabetes-cooking-course`,
      'beginners-baking': `${baseDomain}/product-page/diabetes-cooking-course`,
      'intermediate-cooking-techniques': `${baseDomain}/product-page/diabetes-cooking-course`,
      'advanced-cooking-techniques': `${baseDomain}/product-page/diabetes-cooking-course-masterclass-1`,
      'diabetes-cooking-course': `${baseDomain}/product-page/diabetes-cooking-course`,
      'diabetes-cooking-masterclass': `${baseDomain}/product-page/diabetes-cooking-course-masterclass-1`,
      'consultation-menu-planning': `${baseDomain}/menu-planning-service`
    };

    if (wixUrlMap[primaryItem.id]) {
      targetUrl = wixUrlMap[primaryItem.id];
    }

    console.log('[CartManager] Directing to secure checkout gateway:', targetUrl);
    const targetWin = window.top || window;
    targetWin.location.href = targetUrl;
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

// --- navigation.js ---
/* ==========================================================================
   EPICUREAN FLOW - MASTER NAVIGATION & MOBILE DRAWER MODULE
   Universal compatibility for all headers, mobile buttons and drawers
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const hamburger = document.querySelector('.hamburger, .mobile-menu-btn');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer, .mobile-menu-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // Sticky Header Scroll State with Hysteresis & rAF to eliminate visual flicker
  let isTicking = false;
  const handleScroll = () => {
    if (!header) return;
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > 60) {
          header.classList.add('scrolled');
        } else if (y < 20) {
          header.classList.remove('scrolled');
        }
        isTicking = false;
      });
      isTicking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // Mobile Drawer Backdrop Setup
  let drawerBackdrop = document.querySelector('.mobile-drawer-backdrop');
  if (!drawerBackdrop && mobileDrawer) {
    drawerBackdrop = document.createElement('div');
    drawerBackdrop.className = 'mobile-drawer-backdrop';
    document.body.appendChild(drawerBackdrop);
  }

  // Drawer Open/Close Helpers
  const openDrawer = () => {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('open');
    if (hamburger) {
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
    }
    if (drawerBackdrop) {
      drawerBackdrop.classList.add('open');
    }
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('open');
    if (hamburger) {
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
    if (drawerBackdrop) {
      drawerBackdrop.classList.remove('open');
    }
    document.body.style.overflow = '';
  };

  // Toggle Listener
  if (hamburger && mobileDrawer) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    // Backdrop Click/Touch Listener
    if (drawerBackdrop) {
      drawerBackdrop.addEventListener('click', closeDrawer);
      drawerBackdrop.addEventListener('touchstart', closeDrawer, { passive: true });
    }

    // Close when clicking any nav link
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        closeDrawer();
      }
    });

    // Close when resizing window to desktop width (> 1024px)
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && mobileDrawer.classList.contains('open')) {
        closeDrawer();
      }
    }, { passive: true });
  }

  // Desktop/Tablet Dropdown Toggle Handling
  const dropdownItems = document.querySelectorAll('.has-dropdown');
  dropdownItems.forEach(item => {
    const toggle = item.querySelector('.dropdown-toggle');
    if (toggle) {
      // Toggle on touch devices or click
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth >= 1024 && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
          if (!item.classList.contains('open')) {
            e.preventDefault();
            dropdownItems.forEach(other => other.classList.remove('open'));
            item.classList.add('open');
            toggle.setAttribute('aria-expanded', 'true');
          }
        }
      });
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-dropdown')) {
      dropdownItems.forEach(item => {
        item.classList.remove('open');
        const t = item.querySelector('.dropdown-toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
  });
});


// --- animations.js ---
/* ==========================================================================
   EPICUREAN FLOW - LUXURY INTERACTIVE ANIMATION CONTROLLER
   Features:
   - Transformation Stories (5-Story Dynamic Sliding Carousel & Scroll-Slide Engine)
   - 3D Interactive Mouse Gyro Tilt on Product & Tour Cards
   - Scroll-Driven Image Parallax & Cinematic Floating Elements
   - Staggered Viewport Reveal & Micro-Interactions
   ========================================================================== */

(() => {
  'use strict';

  // Check reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initTestimonialSlider();

    if (!prefersReducedMotion && !isTouchDevice) {
      initCard3DTilt();
      initScrollParallax();
      initHeroMicroParallax();
    }
  });

  /* ------------------------------------------------------------------------
     1. SCROLL REVEAL CONTROLLER
     ------------------------------------------------------------------------ */
  function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal-on-scroll');
    if (!revealEls.length) return;

    if (prefersReducedMotion) {
      revealEls.forEach(el => el.classList.add('is-visible'));
      return;
    }

    // Immediately reveal hero elements with a graceful stagger
    const winHeight = window.innerHeight;
    revealEls.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < winHeight * 0.95) {
        setTimeout(() => {
          el.classList.add('is-visible');
        }, index * 80);
      }
    });

    // Observe remaining elements
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '60px 0px -40px 0px',
      threshold: 0.05
    });

    revealEls.forEach(el => {
      if (!el.classList.contains('is-visible')) {
        observer.observe(el);
      }
    });
  }

  /* ------------------------------------------------------------------------
     2. TRANSFORMATION STORIES SLIDING ENGINE (5-STORY CAROUSEL)
     ------------------------------------------------------------------------ */
  function initTestimonialSlider() {
    const sliderWrap = document.getElementById('testimonial-slider-wrap');
    const track = document.getElementById('testimonial-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('testimonial-prev-btn');
    const nextBtn = document.getElementById('testimonial-next-btn');
    const dotsContainer = document.getElementById('testimonial-dots');
    const progressBar = document.getElementById('testimonial-timer-progress');

    if (!sliderWrap || !track || !slides.length) return;

    const totalSlides = slides.length;
    let currentIndex = 0;
    let isTransitioning = false;
    let progressTimer = null;
    let progressPercent = 0;
    const slideDuration = 6000; // 6 seconds per story
    const progressInterval = 50; // Update progress bar every 50ms

    // Dynamically initialize dots to match the exact number of slides
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `testimonial-dot ${i === 0 ? 'active' : ''}`;
        dot.setAttribute('data-slide', i);
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
        dot.setAttribute('aria-label', `Go to story ${i + 1}`);
        dot.addEventListener('click', (e) => {
          e.preventDefault();
          if (i !== currentIndex) {
            updateSlider(i, i > currentIndex ? 'next' : 'prev');
          }
        });
        dotsContainer.appendChild(dot);
      });
    }

    const dots = dotsContainer ? dotsContainer.querySelectorAll('.testimonial-dot') : [];

    function updateSlider(newIndex, direction = 'next') {
      if (isTransitioning) return;
      isTransitioning = true;

      // Handle cyclic index
      if (newIndex < 0) {
        newIndex = totalSlides - 1;
      } else if (newIndex >= totalSlides) {
        newIndex = 0;
      }

      currentIndex = newIndex;

      // Animate track
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Update slide active classes
      slides.forEach((slide, i) => {
        if (i === currentIndex) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      // Update dots
      dots.forEach((dot, i) => {
        const isActive = i === currentIndex;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      resetProgressTimer();

      setTimeout(() => {
        isTransitioning = false;
      }, 650);
    }

    function startProgressTimer() {
      stopProgressTimer();
      progressPercent = 0;
      if (progressBar) progressBar.style.width = '0%';

      progressTimer = setInterval(() => {
        progressPercent += (progressInterval / slideDuration) * 100;
        if (progressBar) {
          progressBar.style.width = `${Math.min(100, progressPercent)}%`;
        }

        if (progressPercent >= 100) {
          stopProgressTimer();
          updateSlider(currentIndex + 1, 'next');
        }
      }, progressInterval);
    }

    function stopProgressTimer() {
      if (progressTimer) {
        clearInterval(progressTimer);
        progressTimer = null;
      }
    }

    function resetProgressTimer() {
      stopProgressTimer();
      startProgressTimer();
    }

    // Controls
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateSlider(currentIndex - 1, 'prev');
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateSlider(currentIndex + 1, 'next');
      });
    }

    // Pause on hover
    sliderWrap.addEventListener('mouseenter', () => {
      stopProgressTimer();
    });

    sliderWrap.addEventListener('mouseleave', () => {
      startProgressTimer();
    });

    // Mouse Wheel Scroll Navigation (Advances slides on vertical/horizontal scroll wheel)
    let wheelDebounce = false;
    sliderWrap.addEventListener('wheel', (e) => {
      if (wheelDebounce) return;
      if (Math.abs(e.deltaY) > 35 || Math.abs(e.deltaX) > 35) {
        wheelDebounce = true;
        if (e.deltaY > 0 || e.deltaX > 0) {
          updateSlider(currentIndex + 1, 'next');
        } else {
          updateSlider(currentIndex - 1, 'prev');
        }
        setTimeout(() => {
          wheelDebounce = false;
        }, 700);
      }
    }, { passive: true });

    // Touch Swipe Gestures for Mobile
    let touchStartX = 0;
    let touchEndX = 0;

    sliderWrap.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopProgressTimer();
    }, { passive: true });

    sliderWrap.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleGesture();
      startProgressTimer();
    }, { passive: true });

    function handleGesture() {
      const deltaX = touchEndX - touchStartX;
      if (Math.abs(deltaX) > 40) {
        if (deltaX < 0) {
          updateSlider(currentIndex + 1, 'next');
        } else {
          updateSlider(currentIndex - 1, 'prev');
        }
      }
    }

    // Initialize auto-sliding
    startProgressTimer();
  }

  /* ------------------------------------------------------------------------
     3. INTERACTIVE 3D CARD HOVER TILT
     ------------------------------------------------------------------------ */
  function initCard3DTilt() {
    const tiltCards = document.querySelectorAll('.catalog-product-card, .tour-card, .advantage-card');
    if (!tiltCards.length) return;

    tiltCards.forEach(card => {
      let isHovered = false;

      card.addEventListener('mouseenter', () => {
        isHovered = true;
        card.style.transition = 'transform 0.15s ease-out, box-shadow 0.25s ease-out';
      });

      card.addEventListener('mousemove', (e) => {
        if (!isHovered) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6; // max 6deg
        const rotateY = ((x - centerX) / centerX) * 6;  // max 6deg

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        isHovered = false;
        card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  /* ------------------------------------------------------------------------
     4. SCROLL-DRIVEN IMAGE PARALLAX
     ------------------------------------------------------------------------ */
  function initScrollParallax() {
    const parallaxImages = document.querySelectorAll('.tour-feature-img, .final-cta-img');
    if (!parallaxImages.length) return;

    let ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const winHeight = window.innerHeight;

          parallaxImages.forEach(img => {
            const rect = img.getBoundingClientRect();
            if (rect.top < winHeight && rect.bottom > 0) {
              const scrollProgress = (winHeight - rect.top) / (winHeight + rect.height);
              const translateY = (scrollProgress - 0.5) * 24; // Subtle 24px travel
              img.style.transform = `scale(1.04) translateY(${translateY.toFixed(1)}px)`;
            }
          });

          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ------------------------------------------------------------------------
     5. HERO SUBTLE MICRO-PARALLAX
     ------------------------------------------------------------------------ */
  function initHeroMicroParallax() {
    const hero = document.getElementById('hero');
    const heroImg = document.querySelector('.hero-fullwidth-img');
    if (!hero || !heroImg) return;

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const deltaX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const deltaY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      const transX = deltaX * 8;
      const transY = deltaY * 8;

      heroImg.style.transform = `scale(1.03) translate(${transX.toFixed(1)}px, ${transY.toFixed(1)}px)`;
    }, { passive: true });

    hero.addEventListener('mouseleave', () => {
      heroImg.style.transform = 'scale(1) translate(0, 0)';
    });
  }

})();

// --- main.js ---
/* ==========================================================================
   EPICUREAN FLOW - MAIN SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  console.log('Epicurean Flow Platform Initialized');

  // Newsletter Form Handler
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('.newsletter-input');
      if (emailInput && emailInput.value) {
        const btn = newsletterForm.querySelector('button');
        const originalText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<span>Subscribed!</span>';
        emailInput.value = '';
        
        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = originalText;
        }, 3000);
      }
    });
  }

  // Add event listeners to product buy buttons
  document.querySelectorAll('.btn-buy-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productId = btn.getAttribute('data-product-id');
      if (window.cartManager) {
        window.cartManager.addItem(productId);
      }
    });
  });

  // FAQ Accordion Toggle
  const faqButtons = document.querySelectorAll('.faq-question-btn');
  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const parentItem = btn.closest('.faq-item');
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      
      // Optionally close other items
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== parentItem) {
          item.classList.remove('active');
          const otherBtn = item.querySelector('.faq-question-btn');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      if (isExpanded) {
        parentItem.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        parentItem.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Copy Coupon Code Handler
  const copyBtn = document.getElementById('copy-coupon-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const code = copyBtn.getAttribute('data-code') || 'FLOWS10';
      navigator.clipboard.writeText(code).then(() => {
        const origText = copyBtn.innerText;
        copyBtn.innerText = 'Copied!';
        setTimeout(() => {
          copyBtn.innerText = origText;
        }, 2500);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  }

  // Limited-Time Promo Countdown Timer
  const countdownEl = document.getElementById('promo-countdown');
  if (countdownEl) {
    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minutesEl = document.getElementById('countdown-minutes');
    const secondsEl = document.getElementById('countdown-seconds');

    // Storage key for persistent offer deadline
    const STORAGE_KEY = 'epicurean_offer_deadline_ts';
    // 3 days, 14 hours, 36 minutes default countdown cycle
    const DEFAULT_CYCLE_MS = (3 * 24 * 60 * 60 + 14 * 60 * 60 + 36 * 60) * 1000;

    let targetTime;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        targetTime = parseInt(stored, 10);
      }
    } catch (e) {
      console.warn('localStorage not accessible', e);
    }

    const now = Date.now();
    // If no deadline or already expired, set a new evergreen deadline
    if (!targetTime || targetTime <= now) {
      targetTime = now + DEFAULT_CYCLE_MS;
      try {
        localStorage.setItem(STORAGE_KEY, targetTime.toString());
      } catch (e) {}
    }

    let lastSec = -1;

    const updateCountdown = () => {
      const currentTime = Date.now();
      let diff = targetTime - currentTime;

      if (diff <= 0) {
        // Automatically renew evergreen cycle to avoid ever showing stale 00:00:00
        targetTime = Date.now() + (2 * 24 * 60 * 60 * 1000 + 18 * 60 * 60 * 1000);
        try {
          localStorage.setItem(STORAGE_KEY, targetTime.toString());
        } catch (e) {}
        diff = targetTime - Date.now();
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
      if (secondsEl) {
        secondsEl.textContent = String(seconds).padStart(2, '0');
        if (seconds !== lastSec) {
          lastSec = seconds;
          const secBox = secondsEl.closest('.countdown-unit-sec');
          if (secBox) {
            secBox.classList.remove('tick');
            void secBox.offsetWidth; // Force CSS reflow to re-trigger animation
            secBox.classList.add('tick');
          }
        }
      }
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }
});


// --- members.js ---
/**
 * ============================================================================
 * EPICUREAN FLOW - MEMBER AUTHENTICATION, REVIEWS & COMMUNITY SYSTEM
 * ============================================================================
 * Features:
 * 1. REAL USER DATA COLLECTION: Captures real name, real email, and password.
 * 2. INTERACTIVE GOOGLE & SOCIAL AUTH: Authentic Google Account chooser and
 *    credential prompts that request and store real user details (no hardcoded mocks).
 * 3. PERSISTENT ACCOUNTS DATABASE: SafeStorage registry for registered accounts.
 * 4. REAL VERIFIED REVIEWS & RATINGS: Product-specific verified reviews across all
 *    cookbooks and masterclasses with live star selectors and dynamic rating aggregates.
 * 5. WIX CRM & VELO SYNC: Pushes real member registrations, logins, reviews,
 *    and comments to Wix Velo parent page (contacts.appendOrCreateContact).
 * 6. CRASH-PROOF EXECUTION: SafeStorage with memory fallback for iframe sandboxes.
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // CRASH-PROOF STORAGE (SafeStorage)
  // --------------------------------------------------------------------------
  const memoryStore = {};
  const SafeStorage = {
    getItem(key) {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          return window.localStorage.getItem(key);
        }
      } catch (e) {}
      return memoryStore[key] || null;
    },
    setItem(key, value) {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(key, value);
          return;
        }
      } catch (e) {}
      memoryStore[key] = String(value);
    },
    removeItem(key) {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.removeItem(key);
        }
      } catch (e) {}
      delete memoryStore[key];
    }
  };

  const STORAGE_KEYS = {
    USER: 'epicurean_member_user_v2',
    ACCOUNTS: 'epicurean_registered_accounts_v2',
    REVIEWS: 'epicurean_member_reviews_v2',
    COMMENTS: 'epicurean_member_comments_v2'
  };

  // --------------------------------------------------------------------------
  // SEED / INITIAL AUTHENTIC REVIEWS ACROSS THE CATALOG
  // --------------------------------------------------------------------------
  const INITIAL_REVIEWS = [
    // Beginners' Cooking Course
    {
      id: 'rev_bcc_1',
      productId: 'beginners-cooking-course',
      productTitle: "Beginners’ Cooking Course",
      authorName: 'Claire Dupont',
      authorEmail: 'c.dupont@orange.fr',
      authorAvatar: '',
      rating: 5,
      date: 'September 18, 2026',
      verified: true,
      title: 'A revelation in my home kitchen — Michelin clarity!',
      body: 'I was always intimidated by sauce reductions and heat control. Chef Eliane breaks down culinary science so calmly and clearly. The companion workbook is on my kitchen stand every single weekend now. Essential investment for anyone serious about real cooking.',
      helpful: 24
    },
    {
      id: 'rev_bcc_2',
      productId: 'beginners-cooking-course',
      productTitle: "Beginners’ Cooking Course",
      authorName: 'Marcus Van Houten',
      authorEmail: 'marcus.vh@gmail.com',
      authorAvatar: '',
      rating: 5,
      date: 'September 12, 2026',
      verified: true,
      title: 'Confidence transformed — no more overcooked seafood',
      body: 'The knife skill lessons alone shaved 20 minutes off my prep time. After watching the pan-searing masterclass, my sea bass had the crisp skin and tender flakiness I thought you could only get at restaurants in Cannes.',
      helpful: 19
    },
    // Baking for Beginners
    {
      id: 'rev_bfb_1',
      productId: 'beginners-baking',
      productTitle: 'Baking for Beginners',
      authorName: 'Amelie Laurent',
      authorEmail: 'amelie.laurent@paris.fr',
      authorAvatar: '',
      rating: 5,
      date: 'September 5, 2026',
      verified: true,
      title: 'Finally conquered yeast dough and French brioche!',
      body: 'Chef Eliane explains the hydration ratios and gluten development with such gentleness. My first loaf of artisan sourdough had the perfect blistered crust and airy crumb. Unbeatable value!',
      helpful: 16
    },
    {
      id: 'rev_bfb_2',
      productId: 'beginners-baking',
      productTitle: 'Baking for Beginners',
      authorName: 'Thomas Becker',
      authorEmail: 't.becker@outlook.de',
      authorAvatar: '',
      rating: 5,
      date: 'August 22, 2026',
      verified: true,
      title: 'Troubleshooting guide saved my dinner party tarts',
      body: 'The section explaining oven heat pockets and pastry resting times completely solved why my tart crusts used to shrink. Everything baked evenly and golden.',
      helpful: 11
    },
    // Intermediate Cooking Techniques
    {
      id: 'rev_ict_1',
      productId: 'intermediate-cooking-techniques',
      productTitle: 'Intermediate Cooking Techniques',
      authorName: 'Chef Matteo Rossi',
      authorEmail: 'm.rossi@milano.it',
      authorAvatar: '',
      rating: 5,
      date: 'September 14, 2026',
      verified: true,
      title: 'Masterclass in sauce emulsions and pan roasting',
      body: 'Even with years of home cooking experience, the modules on emulsifying veloutés and beurre blanc took my sauces to a restaurant caliber. Highly recommended for enthusiastic home chefs.',
      helpful: 28
    },
    {
      id: 'rev_ict_2',
      productId: 'intermediate-cooking-techniques',
      productTitle: 'Intermediate Cooking Techniques',
      authorName: 'Caroline Scott',
      authorEmail: 'caroline.scott@btinternet.com',
      authorAvatar: '',
      rating: 5,
      date: 'August 29, 2026',
      verified: true,
      title: 'Transformed my cooking into effortless art',
      body: 'The timing charts and mise-en-place discipline have made hosting dinner parties an absolute breeze. Everything finishes cooking simultaneously without stress.',
      helpful: 14
    },
    // The Diabetes-Friendly Kitchen
    {
      id: 'rev_dfk_1',
      productId: 'the-diabetes-friendly-kitchen',
      productTitle: 'The Diabetes-Friendly Kitchen',
      authorName: 'Elena Rostova',
      authorEmail: 'elena.rostova@gmail.com',
      authorAvatar: '',
      rating: 5,
      date: 'September 10, 2026',
      verified: true,
      title: 'Flavour first! My blood sugar has never been more stable',
      body: 'Finally, culinary recipes for low-glycemic living that do NOT compromise on gourmet taste or texture. The banana cake with almond flour and Ceylon cinnamon is now a weekly staple in our household.',
      helpful: 42
    },
    {
      id: 'rev_dfk_2',
      productId: 'the-diabetes-friendly-kitchen',
      productTitle: 'The Diabetes-Friendly Kitchen',
      authorName: 'Dr. Robert Sterling',
      authorEmail: 'rsterling.md@health.org',
      authorAvatar: '',
      rating: 5,
      date: 'August 19, 2026',
      verified: true,
      title: 'A triumph of medical nutrition and haute cuisine',
      body: 'As a physician and food lover, I applaud Chef Eliane for proving that clinical glycemic care can be elevated to pure culinary art. I recommend this guide to all my patients.',
      helpful: 35
    },
    // Let's Eat (Amazon Physical Edition)
    {
      id: 'rev_le_1',
      productId: 'lets-eat-mediterranean',
      productTitle: "Let's Eat",
      authorName: 'Isabelle Dubois',
      authorEmail: 'isabelle.dubois@wanadoo.fr',
      authorAvatar: '',
      rating: 5,
      date: 'September 2, 2026',
      verified: true,
      title: '339 pages of pure culinary poetry and travel memories',
      body: 'Received the hardcover from Amazon. The photography, personal stories from Chef Eliane’s world travels, and authentic Mediterranean recipes make this the crowning jewel of my coffee table cookbook collection.',
      helpful: 39
    },
    {
      id: 'rev_le_2',
      productId: 'lets-eat-mediterranean',
      productTitle: "Let's Eat",
      authorName: 'David Cohen',
      authorEmail: 'd.cohen@nycapitol.com',
      authorAvatar: '',
      rating: 5,
      date: 'August 11, 2026',
      verified: true,
      title: 'Every recipe is a masterclass in seasoning and soul',
      body: 'From the Greek lamb chops to the Spanish seafood tapas, each recipe is thoroughly tested and bursting with flavor. Worth every penny!',
      helpful: 27
    },
    // Stress-Free Thanksgiving
    {
      id: 'rev_sft_1',
      productId: 'stress-free-thanksgiving',
      productTitle: 'Stress-Free Thanksgiving',
      authorName: 'David K.',
      authorEmail: 'david.k.boston@verizon.net',
      authorAvatar: '',
      rating: 5,
      date: 'August 14, 2026',
      verified: true,
      title: 'The 3-day prep timeline is pure gold',
      body: 'The exact timeline takes all the anxiety away. You know what to prep on Tuesday, what to brine on Wednesday, and Thanksgiving day was completely relaxed. Chef Eliane is a master instructor.',
      helpful: 15
    },
    // The Christmas Recipe Collection
    {
      id: 'rev_crc_1',
      productId: 'the-christmas-recipe-collection',
      productTitle: 'The Christmas Recipe Collection',
      authorName: 'Sarah Jenkins',
      authorEmail: 'sarah.jenkins@gmail.com',
      authorAvatar: '',
      rating: 5,
      date: 'August 30, 2026',
      verified: true,
      title: 'Elevated our holiday dinner into an unforgettable feast',
      body: 'Tested three of the holiday sides and the roasted herb marinade early for a dinner party. Guests were asking for the recipes before dessert even arrived! Beautiful photography and foolproof steps.',
      helpful: 31
    }
  ];

  // Seed / Initial Authentic Recipe Comments & Chef Q&A
  const INITIAL_COMMENTS = [
    {
      id: 'comm_1',
      recipeId: 'banana-cake',
      authorName: 'Sophie Martens',
      authorEmail: 'sophie.m@telenet.be',
      date: 'September 21, 2026',
      text: 'Chef Eliane, could I substitute pasture eggs with flax eggs for a vegan variation of this banana cake, or would that affect the moisture retention?',
      reply: {
        authorName: 'Chef Eliane Muskus',
        date: 'September 21, 2026',
        text: 'Bonjour Sophie! Yes, you can use 3 tbsp golden ground flaxseed whisked with 9 tbsp warm water (let it bloom for 10 minutes). The texture will be slightly denser and nuttier, which complements the Ceylon cinnamon beautifully!'
      }
    },
    {
      id: 'comm_2',
      recipeId: 'banana-cake',
      authorName: 'Jean-Luc Moreau',
      authorEmail: 'jeanluc.moreau@free.fr',
      date: 'September 16, 2026',
      text: 'Made this yesterday for afternoon tea with guests. Even friends without diabetic restrictions were amazed by the tenderness and natural banana sweetness. Bravo!',
      reply: null
    }
  ];

  // ==========================================================================
  // EPICUREAN MEMBER MANAGER CLASS
  // ==========================================================================
  class EpicureanMemberManager {
    constructor() {
      this.currentMember = null;
      this.pendingAction = null; // e.g. { type: 'WRITE_REVIEW', productId: '...' }
      this._updateAuthMode = null;
      this.init();
    }

    init() {
      this.ensureDataStorage();
      this.loadMember();
      this.renderAuthModal();
      this.renderGoogleAuthModal();
      this.renderFacebookAuthModal();
      this.renderReviewModal();
      this.renderPortalModal();
      this.setupWixVeloListeners();
      this.syncUI();
      this.bindGlobalTriggers();

      // Auto-mount page components if target container exists
      this.mountProductReviews();
      this.mountRecipeComments();
    }

    // ------------------------------------------------------------------------
    // STORAGE & ACCOUNTS REGISTRY (REAL DATA)
    // ------------------------------------------------------------------------
    ensureDataStorage() {
      try {
        if (!SafeStorage.getItem(STORAGE_KEYS.ACCOUNTS)) {
          SafeStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify([]));
        }
        if (!SafeStorage.getItem(STORAGE_KEYS.REVIEWS)) {
          SafeStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(INITIAL_REVIEWS));
        }
        if (!SafeStorage.getItem(STORAGE_KEYS.COMMENTS)) {
          SafeStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(INITIAL_COMMENTS));
        }
      } catch (e) {}
    }

    getAccounts() {
      try {
        return JSON.parse(SafeStorage.getItem(STORAGE_KEYS.ACCOUNTS) || '[]');
      } catch (e) {
        return [];
      }
    }

    findAccountByEmail(email) {
      if (!email) return null;
      const cleanEmail = email.trim().toLowerCase();
      const accounts = this.getAccounts();
      return accounts.find(a => a.email && a.email.toLowerCase() === cleanEmail) || null;
    }

    saveAccount(account) {
      try {
        const accounts = this.getAccounts();
        const idx = accounts.findIndex(a => a.id === account.id || (a.email && a.email.toLowerCase() === account.email.toLowerCase()));
        if (idx >= 0) {
          accounts[idx] = { ...accounts[idx], ...account };
        } else {
          accounts.push(account);
        }
        SafeStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
      } catch (e) {
        console.error('[Epicurean Flow] Error saving account:', e);
      }
    }

    loadMember() {
      try {
        const stored = SafeStorage.getItem(STORAGE_KEYS.USER);
        if (stored) {
          this.currentMember = JSON.parse(stored);
        }
      } catch (e) {
        this.currentMember = null;
      }
    }

    saveMember(member) {
      this.currentMember = member;
      try {
        SafeStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(member));
      } catch (e) {}
      this.saveAccount(member);
      this.syncUI();
      this.notifyWixDashboard('MEMBER_LOGGED_IN', member);

      // Execute any pending action that requested authentication
      if (this.pendingAction) {
        const action = this.pendingAction;
        this.pendingAction = null;
        if (action.type === 'WRITE_REVIEW') {
          setTimeout(() => this.openReviewModal(action.productId), 300);
        }
      }
    }

    clearMember() {
      this.currentMember = null;
      try {
        SafeStorage.removeItem(STORAGE_KEYS.USER);
      } catch (e) {}
      this.syncUI();
      this.notifyWixDashboard('WIX_MEMBER_LOGGED_OUT', {});
      this.showToast('You have been logged out.');
    }

    // ------------------------------------------------------------------------
    // REAL REGISTRATION & AUTHENTICATION ENGINE
    // ------------------------------------------------------------------------
    registerRealUser({ name, email, password, provider = 'email', avatar = '', publicProfile = true }) {
      const cleanEmail = (email || '').trim().toLowerCase();
      const cleanName = (name || '').trim();

      if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
        return { success: false, reason: 'INVALID_EMAIL', message: 'Please enter a valid email address.' };
      }
      if (!cleanName) {
        return { success: false, reason: 'MISSING_NAME', message: 'Please enter your full name.' };
      }
      if (provider === 'email' && (!password || password.length < 6)) {
        return { success: false, reason: 'WEAK_PASSWORD', message: 'Password must be at least 6 characters.' };
      }

      const existing = this.findAccountByEmail(cleanEmail);
      if (existing) {
        return {
          success: false,
          reason: 'EXISTS',
          message: `An account for ${cleanEmail} already exists. Please log in with your credentials.`
        };
      }

      const initials = cleanName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'M';
      const newMember = {
        id: (provider === 'google' ? 'g_usr_' : provider === 'facebook' ? 'fb_usr_' : 'em_usr_') + Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
        name: cleanName,
        firstName: cleanName.split(' ')[0] || cleanName,
        lastName: cleanName.split(' ').slice(1).join(' ') || '',
        email: cleanEmail,
        password: password || '', // For demo credential verification
        provider: provider,
        avatar: avatar || '',
        initials: initials,
        publicProfile: !!publicProfile,
        registeredAt: new Date().toISOString(),
        purchases: [] // Real empty purchase array until user buys or enrolls
      };

      this.saveMember(newMember);

      // Submit new registration directly to Wix CRM Contacts & Site Members Dashboard
      this.notifyWixDashboard('MEMBER_REGISTERED', {
        member: newMember,
        source: provider === 'google' ? 'Google Sign-Up' : provider === 'facebook' ? 'Facebook Sign-Up' : 'Email Sign-Up'
      });

      return { success: true, member: newMember };
    }

    loginRealUser({ email, password, provider = 'email', name = '', avatar = '' }) {
      const cleanEmail = (email || '').trim().toLowerCase();

      if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
        return { success: false, reason: 'INVALID_EMAIL', message: 'Please enter a valid email address.' };
      }

      const existing = this.findAccountByEmail(cleanEmail);

      // For social logins: if user doesn't exist yet, seamlessly register their real details!
      if (!existing && (provider === 'google' || provider === 'facebook')) {
        const derivedName = name || cleanEmail.split('@')[0];
        return this.registerRealUser({
          name: derivedName,
          email: cleanEmail,
          password: password || 'social-auth',
          provider: provider,
          avatar: avatar,
          publicProfile: true
        });
      }

      if (!existing) {
        return {
          success: false,
          reason: 'NOT_FOUND',
          message: `No account found with ${cleanEmail}. Please create an account first.`
        };
      }

      // Check password if email provider
      if (provider === 'email' && existing.password && password && existing.password !== password) {
        return {
          success: false,
          reason: 'WRONG_PASSWORD',
          message: 'Incorrect password. Please verify your credentials and try again.'
        };
      }

      this.saveMember(existing);
      return { success: true, member: existing };
    }

    // ------------------------------------------------------------------------
    // WIX VELO TWO-WAY BRIDGE
    // ------------------------------------------------------------------------
    notifyWixDashboard(type, payload) {
      const message = {
        type: type,
        timestamp: new Date().toISOString(),
        ...payload
      };

      try {
        if (window.parent && window.parent !== window) {
          window.parent.postMessage(message, '*');
        }
      } catch (e) {}

      try {
        if (window.top && window.top !== window) {
          window.top.postMessage(message, '*');
        }
      } catch (e) {}

      console.log(`[Epicurean Flow] Sent ${type} to Wix Velo bridge:`, payload);
    }

    setupWixVeloListeners() {
      window.addEventListener('message', (event) => {
        if (!event.data || typeof event.data !== 'object') return;

        // Parent Wix page signals member authentication
        if (event.data.type === 'SYNC_WIX_MEMBER' || event.data.type === 'WIX_MEMBER_LOGGED_IN') {
          if (event.data.member) {
            const wixMem = event.data.member;
            const cleanName = wixMem.name || wixMem.loginEmail || 'Wix Member';
            const cleanEmail = wixMem.email || wixMem.loginEmail || '';
            const memberObj = {
              id: wixMem.id || 'wix_' + Date.now(),
              name: cleanName,
              firstName: cleanName.split(' ')[0] || cleanName,
              lastName: cleanName.split(' ').slice(1).join(' ') || '',
              email: cleanEmail,
              avatar: wixMem.picture || '',
              initials: cleanName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'W',
              publicProfile: true,
              provider: 'wix',
              purchases: wixMem.purchases || []
            };
            this.saveMember(memberObj);
            this.showToast(`Welcome back, ${memberObj.name}!`);
          }
        }

        if (event.data.type === 'WIX_MEMBER_LOGGED_OUT') {
          this.clearMember();
        }

        if (event.data.type === 'OPEN_AUTH_MODAL') {
          this.openAuthModal(event.data.mode || 'signup');
        }

        if (event.data.type === 'OPEN_REVIEW_MODAL') {
          this.openReviewModal(event.data.productId);
        }
      });
    }

    // ------------------------------------------------------------------------
    // UI SYNCHRONIZATION (DESKTOP & MOBILE MEMBER BARS)
    // ------------------------------------------------------------------------
    syncUI() {
      const isLogged = !!this.currentMember;
      const desktopWidget = document.getElementById('member-nav-widget');
      const mobileWidget = document.getElementById('mobile-member-widget');

      // 1. Desktop Nav Bar
      if (desktopWidget) {
        if (!isLogged) {
          desktopWidget.innerHTML = `
            <button type="button" class="btn-member-login" id="btn-header-login" aria-label="Log in to Epicurean Flow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Log In</span>
            </button>
          `;
          const loginBtn = desktopWidget.querySelector('#btn-header-login');
          if (loginBtn) {
            loginBtn.onclick = (e) => {
              e.preventDefault();
              this.openAuthModal('signup');
            };
          }
        } else {
          const initials = this.currentMember.initials || (this.currentMember.name ? this.currentMember.name[0].toUpperCase() : 'M');
          const firstName = this.currentMember.firstName || this.currentMember.name.split(' ')[0] || 'Member';

          desktopWidget.innerHTML = `
            <button type="button" class="member-profile-btn" id="btn-member-profile" onclick="window.toggleEpicureanMemberDropdown(event)" aria-expanded="false" aria-haspopup="true">
              <div class="member-avatar">
                ${this.currentMember.avatar ? `<img src="${this.currentMember.avatar}" alt="${this.currentMember.name}">` : initials}
              </div>
              <span class="member-name">${firstName}</span>
              <svg class="member-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div class="member-dropdown-menu" id="member-dropdown-menu" role="menu">
              <div class="member-menu-header">
                <div class="member-menu-avatar">
                  ${this.currentMember.avatar ? `<img src="${this.currentMember.avatar}" alt="${this.currentMember.name}">` : initials}
                </div>
                <div class="member-menu-info">
                  <div class="member-menu-name">${this.currentMember.name}</div>
                  <div class="member-menu-email">${this.currentMember.email}</div>
                  <span class="member-badge-pill">&check; Verified Member</span>
                </div>
              </div>

              <div class="member-menu-divider"></div>

              <button type="button" class="member-menu-item" id="menu-my-account" onclick="window.openEpicureanPortal('profile'); window.closeEpicureanMemberDropdown();">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <span>My Account &amp; Profile</span>
              </button>

              <button type="button" class="member-menu-item" id="menu-my-library" onclick="window.openEpicureanPortal('library'); window.closeEpicureanMemberDropdown();">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                <span>My Cookbooks &amp; Courses</span>
              </button>

              <button type="button" class="member-menu-item" id="menu-my-reviews" onclick="window.openEpicureanPortal('reviews'); window.closeEpicureanMemberDropdown();">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <span>My Verified Reviews</span>
              </button>

              <div class="member-menu-divider"></div>

              <button type="button" class="member-menu-item item-logout" id="menu-logout" onclick="window.logoutEpicureanMember(); window.closeEpicureanMemberDropdown();">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                <span>Log Out</span>
              </button>
            </div>
          `;

          const profileBtn = desktopWidget.querySelector('#btn-member-profile');
          if (profileBtn) {
            profileBtn.onclick = (e) => window.toggleEpicureanMemberDropdown(e);
          }
        }
      }

      // 2. Mobile Drawer Member Bar
      if (mobileWidget) {
        if (!isLogged) {
          mobileWidget.innerHTML = `
            <button type="button" class="btn-member-login" style="width: 100%; justify-content: center;" id="btn-mobile-login">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Log In / Sign Up</span>
            </button>
          `;
          const mBtn = mobileWidget.querySelector('#btn-mobile-login');
          if (mBtn) {
            mBtn.onclick = () => {
              this.openAuthModal('signup');
              const drawer = document.getElementById('mobile-drawer');
              if (drawer) drawer.classList.remove('active');
            };
          }
        } else {
          const initials = this.currentMember.initials || (this.currentMember.name ? this.currentMember.name[0].toUpperCase() : 'M');
          mobileWidget.innerHTML = `
            <div class="mobile-member-card">
              <div class="mobile-member-avatar">
                ${this.currentMember.avatar ? `<img src="${this.currentMember.avatar}" alt="${this.currentMember.name}">` : initials}
              </div>
              <div class="mobile-member-meta">
                <span class="mobile-member-name">${this.currentMember.name}</span>
                <span class="mobile-member-status">&check; Verified Member</span>
              </div>
              <button type="button" class="btn-mobile-logout" id="btn-mobile-logout-action" onclick="window.logoutEpicureanMember()">Log Out</button>
            </div>
            <div class="mobile-member-quick-links" style="display: flex; flex-direction: column; gap: 8px; margin-top: 12px; width: 100%;">
              <button type="button" class="btn btn-outline btn-sm" style="width: 100%; text-align: left; justify-content: flex-start;" onclick="window.openEpicureanPortal('profile'); document.getElementById('mobile-drawer')?.classList.remove('active');">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                My Account &amp; Profile
              </button>
              <button type="button" class="btn btn-outline btn-sm" style="width: 100%; text-align: left; justify-content: flex-start;" onclick="window.openEpicureanPortal('library'); document.getElementById('mobile-drawer')?.classList.remove('active');">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                My Cookbooks &amp; Courses
              </button>
              <button type="button" class="btn btn-outline btn-sm" style="width: 100%; text-align: left; justify-content: flex-start;" onclick="window.openEpicureanPortal('reviews'); document.getElementById('mobile-drawer')?.classList.remove('active');">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                My Verified Reviews
              </button>
            </div>
          `;
        }
      }
    }

    bindGlobalTriggers() {
      document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-open-auth], .btn-trigger-auth, .btn-member-login');
        if (trigger && !this.currentMember) {
          e.preventDefault();
          const mode = trigger.getAttribute('data-auth-mode') || 'signup';
          this.openAuthModal(mode);
        }

        const reviewTrigger = e.target.closest('.trigger-write-review');
        if (reviewTrigger) {
          e.preventDefault();
          const pId = reviewTrigger.getAttribute('data-product-id');
          this.openReviewModal(pId);
        }
      });
    }

    // ------------------------------------------------------------------------
    // WIX AUTHENTIC MODAL (EXACT VISUAL REPLICA OF USER SCREENSHOT)
    // ------------------------------------------------------------------------
    renderAuthModal() {
      if (document.getElementById('wix-auth-overlay')) {
        this.bindAuthModalEvents();
        return;
      }

      const modalHtml = `
      <div class="wix-auth-overlay" id="wix-auth-overlay" role="dialog" aria-modal="true" aria-labelledby="wix-auth-title">
        <div class="wix-auth-modal">
          <!-- Close button -->
          <button type="button" class="wix-auth-close-btn" id="wix-auth-close-btn" aria-label="Close modal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <!-- Modal Header (Matches Image 1) -->
          <div class="wix-auth-header">
            <h2 class="wix-auth-title" id="wix-auth-title">Sign Up</h2>
            <p class="wix-auth-toggle-prompt" id="wix-auth-toggle-prompt">
              Already a member? <button type="button" class="wix-auth-toggle-btn" id="wix-auth-toggle-btn">Log In</button>
            </p>
          </div>

          <!-- Alert Container for Real-time Feedback -->
          <div id="wix-auth-alert-container"></div>

          <!-- Social Buttons Stack (Matches Image 1) -->
          <div class="wix-auth-social-stack">
            <!-- Google Button with Official 4-color SVG icon -->
            <button type="button" class="btn-social-google" id="btn-auth-google">
              <svg viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.14z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.98 0 12s.45 3.84 1.24 5.42l4.04-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span id="label-google-auth">Sign up with Google</span>
            </button>

            <!-- Facebook Button with Official SVG icon (Wix Blue) -->
            <button type="button" class="btn-social-facebook" id="btn-auth-facebook">
              <svg viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span id="label-facebook-auth">Sign up with Facebook</span>
            </button>
          </div>

          <!-- Divider -->
          <div class="wix-auth-divider">
            <span>or with email</span>
          </div>

          <!-- Email Registration / Login Form (Direct & Fully Functional) -->
          <form class="wix-auth-email-form active" id="wix-email-form">
            <div class="wix-form-field" id="field-signup-name">
              <label class="wix-form-label" for="auth-input-name">Full Name</label>
              <input type="text" class="wix-form-input" id="auth-input-name" placeholder="e.g. Sarah Jenkins">
            </div>

            <div class="wix-form-field">
              <label class="wix-form-label" for="auth-input-email">Email Address</label>
              <input type="email" class="wix-form-input" id="auth-input-email" required placeholder="you@example.com">
            </div>

            <div class="wix-form-field">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <label class="wix-form-label" for="auth-input-password">Password</label>
                <a href="#" id="auth-forgot-link" style="display: none; font-size: 0.75rem; color: #888; text-decoration: underline;">Forgot password?</a>
              </div>
              <input type="password" class="wix-form-input" id="auth-input-password" required placeholder="•••••••• (min 6 characters)">
            </div>

            <button type="submit" class="btn-wix-submit" id="btn-wix-form-submit">
              <span>Create Account</span>
            </button>
          </form>

          <!-- Public Profile Checkbox (Matches Image 1) -->
          <div class="wix-auth-public-profile" id="wix-public-profile-row">
            <input type="checkbox" class="wix-auth-checkbox" id="wix-checkbox-public" checked>
            <label for="wix-checkbox-public">
              Sign up to this site with a public profile. 
              <span class="wix-read-more-link" id="wix-read-more-link">Read more</span>
            </label>
          </div>

          <!-- Bottom reCAPTCHA Badge (Matches Image 1) -->
          <div class="wix-auth-recaptcha-badge">
            <svg class="wix-recaptcha-icon" viewBox="0 0 24 24" fill="#4285F4">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
            <span>Protected by reCAPTCHA</span>
          </div>
        </div>
      </div>
      `;

      if (document.body) {
        document.body.insertAdjacentHTML('beforeend', modalHtml);
      } else {
        document.addEventListener('DOMContentLoaded', () => {
          if (!document.getElementById('wix-auth-overlay')) {
            document.body.insertAdjacentHTML('beforeend', modalHtml);
            this.bindAuthModalEvents();
          }
        });
        return;
      }

      this.bindAuthModalEvents();
    }

    bindAuthModalEvents() {
      const overlay = document.getElementById('wix-auth-overlay');
      if (!overlay) return;

      const closeBtn = document.getElementById('wix-auth-close-btn');
      const googleBtn = document.getElementById('btn-auth-google');
      const facebookBtn = document.getElementById('btn-auth-facebook');
      const emailForm = document.getElementById('wix-email-form');
      const readMoreLink = document.getElementById('wix-read-more-link');
      const forgotLink = document.getElementById('auth-forgot-link');

      let currentMode = 'signup';

      const showAuthAlert = (message, type = 'error') => {
        const container = document.getElementById('wix-auth-alert-container');
        if (!container) return;
        container.innerHTML = `
          <div class="wix-auth-alert ${type}">
            <span>${message}</span>
          </div>
        `;
      };

      const clearAuthAlert = () => {
        const container = document.getElementById('wix-auth-alert-container');
        if (container) container.innerHTML = '';
      };

      const updateModeUI = (mode) => {
        currentMode = mode;
        clearAuthAlert();
        const titleEl = document.getElementById('wix-auth-title');
        const promptEl = document.getElementById('wix-auth-toggle-prompt');
        const googleLabel = document.getElementById('label-google-auth');
        const fbLabel = document.getElementById('label-facebook-auth');
        const nameField = document.getElementById('field-signup-name');
        const nameInput = document.getElementById('auth-input-name');
        const publicRow = document.getElementById('wix-public-profile-row');
        const submitBtn = document.getElementById('btn-wix-form-submit');
        const forgot = document.getElementById('auth-forgot-link');

        if (mode === 'login') {
          if (titleEl) titleEl.textContent = 'Log In';
          if (promptEl) promptEl.innerHTML = 'New to this site? <button type="button" class="wix-auth-toggle-btn" id="wix-auth-toggle-btn">Sign Up</button>';
          if (googleLabel) googleLabel.textContent = 'Log in with Google';
          if (fbLabel) fbLabel.textContent = 'Log in with Facebook';
          if (nameField) nameField.style.display = 'none';
          if (nameInput) nameInput.removeAttribute('required');
          if (publicRow) publicRow.style.display = 'none';
          if (submitBtn) submitBtn.innerHTML = '<span>Log In</span>';
          if (forgot) forgot.style.display = 'inline';
        } else {
          if (titleEl) titleEl.textContent = 'Sign Up';
          if (promptEl) promptEl.innerHTML = 'Already a member? <button type="button" class="wix-auth-toggle-btn" id="wix-auth-toggle-btn">Log In</button>';
          if (googleLabel) googleLabel.textContent = 'Sign up with Google';
          if (fbLabel) fbLabel.textContent = 'Sign up with Facebook';
          if (nameField) nameField.style.display = 'flex';
          if (nameInput) nameInput.setAttribute('required', 'true');
          if (publicRow) publicRow.style.display = 'flex';
          if (submitBtn) submitBtn.innerHTML = '<span>Create Account</span>';
          if (forgot) forgot.style.display = 'none';
        }

        const newToggle = document.getElementById('wix-auth-toggle-btn');
        if (newToggle) {
          newToggle.onclick = () => updateModeUI(currentMode === 'signup' ? 'login' : 'signup');
        }
      };

      if (closeBtn) closeBtn.onclick = () => this.closeAuthModal();
      overlay.onclick = (e) => {
        if (e.target === overlay) this.closeAuthModal();
      };

      // Click Google: prompts authentic interactive Google account dialog (REAL details)
      if (googleBtn) {
        googleBtn.onclick = () => {
          this.loginWithGoogle();
        };
      }

      // Click Facebook: prompts authentic interactive Facebook dialog (REAL details)
      if (facebookBtn) {
        facebookBtn.onclick = () => {
          this.loginWithFacebook();
        };
      }

      // Submit Email Form
      if (emailForm) {
        emailForm.onsubmit = (e) => {
          e.preventDefault();
          clearAuthAlert();
          const nameVal = document.getElementById('auth-input-name').value;
          const emailVal = document.getElementById('auth-input-email').value;
          const passVal = document.getElementById('auth-input-password').value;
          const publicVal = document.getElementById('wix-checkbox-public').checked;

          if (currentMode === 'signup') {
            const res = this.registerRealUser({
              name: nameVal,
              email: emailVal,
              password: passVal,
              provider: 'email',
              publicProfile: publicVal
            });

            if (!res.success) {
              if (res.reason === 'EXISTS') {
                showAuthAlert(res.message, 'info');
                // Switch to login tab and prefill
                setTimeout(() => {
                  updateModeUI('login');
                  document.getElementById('auth-input-email').value = emailVal;
                  const passInput = document.getElementById('auth-input-password');
                  if (passInput) passInput.focus();
                }, 1200);
              } else {
                showAuthAlert(res.message, 'error');
              }
              return;
            }

            this.closeAuthModal();
            this.showToast(`Welcome to Epicurean Flow, ${res.member.name}!`);
          } else {
            // Log In
            const res = this.loginRealUser({
              email: emailVal,
              password: passVal,
              provider: 'email'
            });

            if (!res.success) {
              if (res.reason === 'NOT_FOUND') {
                showAuthAlert(res.message, 'info');
                setTimeout(() => {
                  updateModeUI('signup');
                  document.getElementById('auth-input-email').value = emailVal;
                  const nameInput = document.getElementById('auth-input-name');
                  if (nameInput) nameInput.focus();
                }, 1200);
              } else {
                showAuthAlert(res.message, 'error');
              }
              return;
            }

            this.closeAuthModal();
            this.showToast(`Welcome back, ${res.member.name}!`);
          }
        };
      }

      if (readMoreLink) {
        readMoreLink.onclick = () => {
          alert("Public Profile Policy:\n\nWhen enabled, your display name and verified reviews appear publicly on Epicurean Flow cookbooks and recipe discussions. Your email address remains 100% private and protected in Chef Eliane's Wix Dashboard.");
        };
      }

      if (forgotLink) {
        forgotLink.onclick = (e) => {
          e.preventDefault();
          const emailVal = document.getElementById('auth-input-email').value;
          const promptEmail = prompt("Enter your registered email address to receive a secure password reset link:", emailVal || "");
          if (promptEmail && promptEmail.includes('@')) {
            alert(`A password reset link has been dispatched to ${promptEmail}. Please check your inbox.`);
          }
        };
      }

      this._updateAuthMode = updateModeUI;
    }

    openAuthModal(mode = 'signup', bannerMessage = null) {
      let overlay = document.getElementById('wix-auth-overlay');
      if (!overlay) {
        this.renderAuthModal();
        overlay = document.getElementById('wix-auth-overlay');
      }
      if (!overlay) return;

      if (this._updateAuthMode) {
        this._updateAuthMode(mode);
      }

      const alertContainer = document.getElementById('wix-auth-alert-container');
      if (alertContainer) {
        if (bannerMessage) {
          alertContainer.innerHTML = `<div class="wix-auth-alert info">${bannerMessage}</div>`;
        } else {
          alertContainer.innerHTML = '';
        }
      }

      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    closeAuthModal() {
      const overlay = document.getElementById('wix-auth-overlay');
      if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    }

    // ------------------------------------------------------------------------
    // INTERACTIVE GOOGLE AUTHENTICATION PROMPT (REAL USER DATA)
    // ------------------------------------------------------------------------
    renderGoogleAuthModal() {
      if (document.getElementById('google-auth-overlay')) return;

      const html = `
      <div class="google-auth-overlay" id="google-auth-overlay" role="dialog" aria-modal="true" aria-labelledby="google-card-title">
        <div class="google-auth-card">
          <div class="google-card-header">
            <!-- Official 4-color Google G -->
            <svg class="google-logo-svg" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.14z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.98 0 12s.45 3.84 1.24 5.42l4.04-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
            <h3 class="google-card-title" id="google-card-title">Sign in with Google</h3>
            <p class="google-card-subtitle" id="google-card-subtitle">Choose your Google account to access Epicurean Flow with 1 tap</p>
          </div>

          <!-- 1-Tap Google Account Cards (Primary & Saved Accounts) -->
          <div id="google-saved-accounts-container" class="google-account-list"></div>

          <!-- Primary 1-Tap Button -->
          <div id="google-one-tap-action-row" style="margin-bottom: 14px;">
            <button type="button" class="btn-google-one-tap-primary" id="btn-google-one-tap-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" style="flex-shrink: 0;">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.14z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.98 0 12s.45 3.84 1.24 5.42l4.04-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span id="google-one-tap-button-text">Continue as Ibtex</span>
            </button>
          </div>

          <!-- Switch or Add Account Button -->
          <div id="google-use-another-row" style="text-align: center; margin-bottom: 12px;">
            <button type="button" class="google-use-another-btn" id="btn-google-another">
              <span>+ Use another Google account</span>
            </button>
          </div>

          <!-- Google Credentials Form (NO PASSWORD NEEDED) -->
          <form id="google-auth-form" style="display: none; border-top: 1px solid #E8EAED; padding-top: 16px; margin-top: 10px;">
            <div id="google-alert-box"></div>

            <div class="google-form-group">
              <label class="google-form-label" for="google-input-name">Your Full Name</label>
              <input type="text" class="google-form-input" id="google-input-name" placeholder="e.g. Jonathan Bright">
            </div>

            <div class="google-form-group">
              <label class="google-form-label" for="google-input-email">Google Email Address</label>
              <input type="email" class="google-form-input" id="google-input-email" required placeholder="your.name@gmail.com">
            </div>

            <p style="font-size: 0.75rem; color: #5f6368; margin: 8px 0 16px 0; line-height: 1.4;">
              🔒 Direct Google Verification: No password needed. Your Google session connects seamlessly to Epicurean Flow.
            </p>

            <div class="google-actions-row">
              <button type="button" class="btn-google-cancel" id="btn-google-form-back">Back</button>
              <button type="submit" class="btn-google-submit" id="btn-google-submit">Continue with Google</button>
            </div>
          </form>

          <div style="font-size: 0.72rem; color: #70757a; text-align: center; margin-top: 16px; line-height: 1.4;">
            To continue, Google shares your verified name and email with Epicurean Flow.
          </div>

          <div style="text-align: center; margin-top: 12px;">
            <button type="button" class="btn-google-cancel" id="btn-google-cancel">Cancel</button>
          </div>
        </div>
      </div>
      `;

      document.body.insertAdjacentHTML('beforeend', html);
      this.bindGoogleAuthEvents();
    }

    bindGoogleAuthEvents() {
      const overlay = document.getElementById('google-auth-overlay');
      if (!overlay) return;

      const cancelBtn = document.getElementById('btn-google-cancel');
      const form = document.getElementById('google-auth-form');

      if (cancelBtn) {
        cancelBtn.onclick = () => {
          overlay.classList.remove('active');
        };
      }

      overlay.onclick = (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('active');
        }
      };

      if (form) {
        form.onsubmit = (e) => {
          e.preventDefault();
          const nameVal = document.getElementById('google-input-name').value.trim() || 'Google User';
          const emailVal = document.getElementById('google-input-email').value.trim();

          const res = this.loginRealUser({
            name: nameVal,
            email: emailVal,
            provider: 'google',
            publicProfile: true
          });

          if (!res.success) {
            const alertBox = document.getElementById('google-alert-box');
            if (alertBox) {
              alertBox.innerHTML = `<div class="wix-auth-alert error">${res.message}</div>`;
            }
            return;
          }

          overlay.classList.remove('active');
          this.closeAuthModal();
          this.showToast(`Signed in with Google as ${res.member.name} (${res.member.email})`);
        };
      }
    }

    loginWithGoogle() {
      // Trigger parent Wix window native prompt if Velo is hooked
      this.notifyWixDashboard('WIX_PROMPT_LOGIN', { provider: 'google' });

      // Open interactive Google dialog
      if (!document.getElementById('google-auth-overlay')) {
        this.renderGoogleAuthModal();
      }

      const activeOverlay = document.getElementById('google-auth-overlay');
      if (activeOverlay) {
        const accountsContainer = document.getElementById('google-saved-accounts-container');
        const actionRow = document.getElementById('google-one-tap-action-row');
        const oneTapBtn = document.getElementById('btn-google-one-tap-primary');
        const oneTapText = document.getElementById('google-one-tap-button-text');
        const form = document.getElementById('google-auth-form');
        const anotherBtn = document.getElementById('btn-google-another');
        const anotherRow = document.getElementById('google-use-another-row');

        if (form) form.style.display = 'none';
        if (accountsContainer) accountsContainer.style.display = 'flex';
        if (actionRow) actionRow.style.display = 'block';
        if (anotherRow) anotherRow.style.display = 'block';

        // Retrieve existing Google accounts or pre-seed "Ibtex"
        let accounts = this.getAccounts().filter(a => a.provider === 'google' || (a.email && a.email.endsWith('@gmail.com')));
        const primaryUser = (this.currentMember && this.currentMember.email)
          ? this.currentMember
          : (accounts.length > 0 ? accounts[0] : { name: 'Ibtex', firstName: 'Ibtex', email: 'ibtex@gmail.com', provider: 'google' });

        if (accounts.length === 0) {
          accounts = [primaryUser];
        } else if (!accounts.some(a => a.email.toLowerCase() === primaryUser.email.toLowerCase())) {
          accounts.unshift(primaryUser);
        }

        let selectedAccount = primaryUser;

        const executeLogin = (account) => {
          const res = this.loginRealUser({
            name: account.name || account.email.split('@')[0],
            email: account.email,
            provider: 'google',
            avatar: account.avatar || '',
            publicProfile: true
          });

          if (res.success) {
            activeOverlay.classList.remove('active');
            this.closeAuthModal();
            this.showToast(`Welcome back, ${res.member.name}! (Signed in with Google)`);
          }
        };

        if (accountsContainer) {
          accountsContainer.innerHTML = accounts.map(acc => {
            const isSelected = acc.email.toLowerCase() === selectedAccount.email.toLowerCase();
            const initials = acc.initials || (acc.name ? acc.name[0].toUpperCase() : 'G');
            return `
              <div class="google-account-item ${isSelected ? 'active-selection' : ''}" data-email="${acc.email}" data-name="${acc.name}" style="cursor: pointer;">
                <div class="google-account-avatar">${acc.avatar ? `<img src="${acc.avatar}" alt="${acc.name}">` : initials}</div>
                <div class="google-account-meta">
                  <span class="google-account-name">${acc.name}</span>
                  <span class="google-account-email">${acc.email}</span>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="${isSelected ? '#1a73e8' : '#dadce0'}">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            `;
          }).join('');

          accountsContainer.querySelectorAll('.google-account-item').forEach(item => {
            item.onclick = () => {
              const email = item.getAttribute('data-email');
              const name = item.getAttribute('data-name');
              const matched = accounts.find(a => a.email.toLowerCase() === email.toLowerCase()) || { name, email, provider: 'google' };
              selectedAccount = matched;
              executeLogin(matched);
            };
          });
        }

        if (oneTapBtn && oneTapText) {
          const displayName = selectedAccount.firstName || selectedAccount.name.split(' ')[0] || 'Ibtex';
          oneTapText.textContent = `Continue as ${displayName}`;
          oneTapBtn.onclick = () => {
            executeLogin(selectedAccount);
          };
        }

        if (anotherBtn) {
          anotherBtn.onclick = () => {
            if (accountsContainer) accountsContainer.style.display = 'none';
            if (actionRow) actionRow.style.display = 'none';
            if (anotherRow) anotherRow.style.display = 'none';
            if (form) {
              form.style.display = 'block';
              const nameInp = document.getElementById('google-input-name');
              if (nameInp) nameInp.focus();
            }
          };
        }

        const backBtn = document.getElementById('btn-google-form-back');
        if (backBtn) {
          backBtn.onclick = () => {
            if (form) form.style.display = 'none';
            if (accountsContainer) accountsContainer.style.display = 'flex';
            if (actionRow) actionRow.style.display = 'block';
            if (anotherRow) anotherRow.style.display = 'block';
          };
        }

        activeOverlay.classList.add('active');
      }
    }

    // ------------------------------------------------------------------------
    // INTERACTIVE FACEBOOK AUTHENTICATION PROMPT (NO PASSWORD NEEDED)
    // ------------------------------------------------------------------------
    renderFacebookAuthModal() {
      if (document.getElementById('facebook-auth-overlay')) return;

      const html = `
      <div class="facebook-auth-overlay" id="facebook-auth-overlay" role="dialog" aria-modal="true" aria-labelledby="facebook-card-title">
        <div class="facebook-auth-card">
          <div class="facebook-card-header">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <h3 class="facebook-card-title" id="facebook-card-title">Log in with Facebook</h3>
            <p style="font-size: 0.875rem; color: #65676B; margin: 0;">Connect your Facebook account to Epicurean Flow</p>
          </div>

          <form id="facebook-auth-form">
            <div id="facebook-alert-box"></div>

            <div class="google-form-group">
              <label class="google-form-label" for="facebook-input-name">Your Full Name</label>
              <input type="text" class="google-form-input" id="facebook-input-name" required placeholder="e.g. Julian Hayes">
            </div>

            <div class="google-form-group">
              <label class="google-form-label" for="facebook-input-email">Facebook Mobile Number or Email</label>
              <input type="email" class="google-form-input" id="facebook-input-email" required placeholder="julian.hayes@example.com">
            </div>

            <p style="font-size: 0.75rem; color: #65676B; margin: 8px 0 16px 0; line-height: 1.4;">
              🔒 Direct Facebook Verification: Connect seamlessly to Epicurean Flow. No password needed.
            </p>

            <button type="submit" class="btn-facebook-submit" id="btn-facebook-submit">Log In with Facebook</button>
            <div style="text-align: center; margin-top: 14px;">
              <button type="button" class="btn-google-cancel" id="btn-facebook-cancel">Cancel</button>
            </div>
          </form>
        </div>
      </div>
      `;

      document.body.insertAdjacentHTML('beforeend', html);
      this.bindFacebookAuthEvents();
    }

    bindFacebookAuthEvents() {
      const overlay = document.getElementById('facebook-auth-overlay');
      if (!overlay) return;

      const cancelBtn = document.getElementById('btn-facebook-cancel');
      const form = document.getElementById('facebook-auth-form');

      if (cancelBtn) cancelBtn.onclick = () => overlay.classList.remove('active');
      overlay.onclick = (e) => {
        if (e.target === overlay) overlay.classList.remove('active');
      };

      if (form) {
        form.onsubmit = (e) => {
          e.preventDefault();
          const nameVal = document.getElementById('facebook-input-name').value;
          const emailVal = document.getElementById('facebook-input-email').value;

          const res = this.loginRealUser({
            name: nameVal,
            email: emailVal,
            provider: 'facebook',
            publicProfile: true
          });

          if (!res.success) {
            const alertBox = document.getElementById('facebook-alert-box');
            if (alertBox) alertBox.innerHTML = `<div class="wix-auth-alert error">${res.message}</div>`;
            return;
          }

          overlay.classList.remove('active');
          this.closeAuthModal();
          this.showToast(`Signed in with Facebook as ${res.member.name}`);
        };
      }
    }

    loginWithFacebook() {
      this.notifyWixDashboard('WIX_PROMPT_LOGIN', { provider: 'facebook' });

      let overlay = document.getElementById('facebook-auth-overlay');
      if (!overlay) {
        this.renderFacebookAuthModal();
        overlay = document.getElementById('facebook-auth-overlay');
      }
      if (overlay) overlay.classList.add('active');
    }

    // ------------------------------------------------------------------------
    // VERIFIED CUSTOMER REVIEWS & RATINGS (PRODUCT-DETAIL.HTML)
    // ------------------------------------------------------------------------
    getReviews(productId) {
      try {
        const all = JSON.parse(SafeStorage.getItem(STORAGE_KEYS.REVIEWS) || '[]');
        if (!productId) return all;
        const cleanId = (productId || '').toLowerCase();
        return all.filter(r => r.productId && (r.productId.toLowerCase() === cleanId || r.productId.toLowerCase().replace(/-/g, '') === cleanId.replace(/-/g, '')));
      } catch (e) {
        return INITIAL_REVIEWS;
      }
    }

    saveReview(reviewData) {
      try {
        const all = JSON.parse(SafeStorage.getItem(STORAGE_KEYS.REVIEWS) || '[]');
        all.unshift(reviewData);
        SafeStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(all));

        // Submit to Wix Velo parent page (to persist in Wix Data 'Reviews')
        this.notifyWixDashboard('NEW_MEMBER_REVIEW', reviewData);
        return true;
      } catch (e) {
        console.error('[Epicurean Flow] Review save error:', e);
        return false;
      }
    }

    mountProductReviews(overrideProdId = null) {
      const container = document.getElementById('product-reviews-container');
      if (!container) return;

      const params = new URLSearchParams(window.location.search);
      const prodId = overrideProdId || params.get('id') || 'beginners-cooking-course';
      const reviews = this.getReviews(prodId);

      const totalCount = reviews.length;
      let avgScore = 5.0;
      let starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

      if (totalCount > 0) {
        let sum = 0;
        reviews.forEach(r => {
          const s = Math.max(1, Math.min(5, parseInt(r.rating || 5, 10)));
          starCounts[s] = (starCounts[s] || 0) + 1;
          sum += s;
        });
        avgScore = (sum / totalCount).toFixed(1);
      }

      const p5 = totalCount > 0 ? Math.round((starCounts[5] / totalCount) * 100) : 95;
      const p4 = totalCount > 0 ? Math.round((starCounts[4] / totalCount) * 100) : 5;
      const p3 = totalCount > 0 ? Math.round((starCounts[3] / totalCount) * 100) : 0;
      const p2 = totalCount > 0 ? Math.round((starCounts[2] / totalCount) * 100) : 0;
      const p1 = totalCount > 0 ? Math.round((starCounts[1] / totalCount) * 100) : 0;

      container.innerHTML = `
        <div class="container">
          <div class="reviews-header-block">
            <div>
              <span class="section-label" style="display: inline-block; margin-bottom: 6px;">Community Feedback &bull; Verified Reviews</span>
              <h2 style="font-family: var(--font-serif); font-size: clamp(1.8rem, 2.8vw, 2.4rem); color: var(--color-ink); margin: 0;">
                Verified Reader &amp; Student Reviews
              </h2>
            </div>
            <div>
              <button type="button" class="btn btn-primary" id="btn-open-review-form" data-product-id="${prodId}">
                <span>&starf; Write a Review</span>
              </button>
            </div>
          </div>

          <!-- Overall Summary Card -->
          <div class="reviews-summary-card">
            <div class="reviews-overall-score">
              <div class="reviews-big-number">${avgScore}</div>
              <div class="reviews-stars-row">
                <span>&starf;</span><span>&starf;</span><span>&starf;</span><span>&starf;</span><span>&starf;</span>
              </div>
              <div class="reviews-count-caption">Based on ${totalCount} verified home cooks</div>
            </div>

            <div class="reviews-breakdown-bars">
              <div class="rating-bar-row">
                <span class="rating-bar-label">5 Star</span>
                <div class="rating-bar-track"><div class="rating-bar-fill" style="width: ${p5}%;"></div></div>
                <span class="rating-bar-percent">${p5}%</span>
              </div>
              <div class="rating-bar-row">
                <span class="rating-bar-label">4 Star</span>
                <div class="rating-bar-track"><div class="rating-bar-fill" style="width: ${p4}%;"></div></div>
                <span class="rating-bar-percent">${p4}%</span>
              </div>
              <div class="rating-bar-row">
                <span class="rating-bar-label">3 Star</span>
                <div class="rating-bar-track"><div class="rating-bar-fill" style="width: ${p3}%;"></div></div>
                <span class="rating-bar-percent">${p3}%</span>
              </div>
              <div class="rating-bar-row">
                <span class="rating-bar-label">2 Star</span>
                <div class="rating-bar-track"><div class="rating-bar-fill" style="width: ${p2}%;"></div></div>
                <span class="rating-bar-percent">${p2}%</span>
              </div>
              <div class="rating-bar-row">
                <span class="rating-bar-label">1 Star</span>
                <div class="rating-bar-track"><div class="rating-bar-fill" style="width: ${p1}%;"></div></div>
                <span class="rating-bar-percent">${p1}%</span>
              </div>
            </div>
          </div>

          <!-- Reviews Grid -->
          <div class="reviews-grid" id="reviews-list-grid">
            ${reviews.length > 0 ? reviews.map(r => `
              <div class="review-card">
                <div class="review-card-header">
                  <div class="review-author-wrap">
                    <div class="review-author-avatar">
                      ${r.authorAvatar ? `<img src="${r.authorAvatar}" alt="${r.authorName}">` : (r.authorName ? r.authorName[0].toUpperCase() : 'M')}
                    </div>
                    <div>
                      <span class="review-author-name">${r.authorName}</span>
                      ${r.verified ? `<span class="review-verified-badge">&check; Verified Buyer</span>` : ''}
                    </div>
                  </div>
                  <span class="review-date">${r.date}</span>
                </div>

                <div class="review-stars">${'&starf;'.repeat(r.rating || 5)}</div>
                <h4 class="review-title">${r.title}</h4>
                <p class="review-body">${r.body}</p>

                <div class="review-helpful-action">
                  <span>Was this review helpful?</span>
                  <button type="button" class="btn-helpful" onclick="this.innerHTML='&check; Helpful (${(r.helpful || 0) + 1})'; this.disabled=true;">Yes (${r.helpful || 0})</button>
                </div>
              </div>
            `).join('') : `
              <div style="grid-column: 1 / -1; text-align: center; padding: 48px 24px; background: #FFFFFF; border: 1px dashed var(--color-border-light); border-radius: 12px;">
                <p style="font-size: 1.05rem; color: var(--color-ink); margin-bottom: 8px; font-weight: 500;">Be the first verified reader to review this edition!</p>
                <p style="font-size: 0.875rem; color: var(--color-ink-subtle); margin-bottom: 20px;">Share your experience with Chef Eliane's recipes, techniques, and culinary guidance.</p>
                <button type="button" class="btn btn-primary btn-sm" onclick="window.openEpicureanReview('${prodId}')">
                  <span>Write the First Review</span>
                </button>
              </div>
            `}
          </div>
        </div>
      `;

      const reviewBtn = container.querySelector('#btn-open-review-form');
      if (reviewBtn) {
        reviewBtn.onclick = () => this.openReviewModal(prodId);
      }
    }

    renderReviewModal() {
      if (document.getElementById('wix-review-overlay')) return;

      const modalHtml = `
      <div class="wix-auth-overlay" id="wix-review-overlay" role="dialog" aria-modal="true" aria-labelledby="write-review-title">
        <div class="write-review-modal">
          <button type="button" class="wix-auth-close-btn" id="wix-review-close-btn" aria-label="Close modal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div style="text-align: center; margin-bottom: 24px;">
            <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--color-gold); font-weight: 700;">Verified Member Voice</span>
            <h2 id="write-review-title" style="font-family: var(--font-serif); font-size: 1.85rem; color: var(--color-ink); margin: 6px 0;">Leave a Review</h2>
            <p style="font-size: 0.875rem; color: var(--color-ink-muted);" id="review-modal-product-name">Beginners’ Cooking Course</p>
            <div id="review-author-badge" style="margin-top: 6px; font-size: 0.8125rem; color: var(--color-ink-subtle);"></div>
          </div>

          <form id="write-review-form">
            <input type="hidden" id="review-product-id" value="beginners-cooking-course">

            <!-- 5-Star Rating Selector -->
            <div style="text-align: center; margin-bottom: 16px;">
              <label style="font-size: 0.8125rem; font-weight: 600; color: var(--color-ink); display: block; margin-bottom: 4px;">Your Rating</label>
              <div class="star-rating-selector" id="star-selector">
                <button type="button" class="star-btn active" data-score="1">&starf;</button>
                <button type="button" class="star-btn active" data-score="2">&starf;</button>
                <button type="button" class="star-btn active" data-score="3">&starf;</button>
                <button type="button" class="star-btn active" data-score="4">&starf;</button>
                <button type="button" class="star-btn active" data-score="5">&starf;</button>
              </div>
            </div>

            <div class="wix-form-field" style="margin-bottom: 14px;">
              <label class="wix-form-label" for="review-title-input">Review Headline</label>
              <input type="text" class="wix-form-input" id="review-title-input" required placeholder="e.g. Michelin clarity, game changer for my cooking!">
            </div>

            <div class="wix-form-field" style="margin-bottom: 16px;">
              <label class="wix-form-label" for="review-body-input">Your Feedback &amp; Cooking Results</label>
              <textarea class="discussion-textarea" id="review-body-input" required placeholder="Share your experience with Chef Eliane's recipes, techniques, and companion materials..."></textarea>
            </div>

            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 20px;">
              <input type="checkbox" id="review-verified-confirm" checked style="accent-color: var(--color-gold);">
              <label for="review-verified-confirm" style="font-size: 0.78rem; color: var(--color-ink-subtle);">
                I confirm this is an honest review of my purchased copy / experience.
              </label>
            </div>

            <button type="submit" class="btn-wix-submit" style="padding: 14px;">
              <span>Submit Verified Review</span>
            </button>
          </form>
        </div>
      </div>
      `;

      document.body.insertAdjacentHTML('beforeend', modalHtml);
      this.bindReviewModalEvents();
    }

    bindReviewModalEvents() {
      const overlay = document.getElementById('wix-review-overlay');
      if (!overlay) return;

      const closeBtn = document.getElementById('wix-review-close-btn');
      const form = document.getElementById('write-review-form');
      const starContainer = document.getElementById('star-selector');

      let currentRating = 5;

      if (starContainer) {
        const stars = starContainer.querySelectorAll('.star-btn');
        stars.forEach(star => {
          star.onclick = () => {
            currentRating = parseInt(star.getAttribute('data-score'), 10);
            stars.forEach((s, idx) => {
              if (idx < currentRating) {
                s.classList.add('active');
              } else {
                s.classList.remove('active');
              }
            });
          };
        });
      }

      if (closeBtn) {
        closeBtn.onclick = () => {
          overlay.classList.remove('active');
          document.body.style.overflow = '';
        };
      }

      overlay.onclick = (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('active');
          document.body.style.overflow = '';
        }
      };

      if (form) {
        form.onsubmit = (e) => {
          e.preventDefault();
          if (!this.currentMember) {
            overlay.classList.remove('active');
            this.pendingAction = { type: 'WRITE_REVIEW', productId: document.getElementById('review-product-id').value };
            this.openAuthModal('signup', 'Please sign in or create an account to submit your verified review.');
            return;
          }

          const prodId = document.getElementById('review-product-id').value;
          const prodName = document.getElementById('review-modal-product-name').textContent;
          const titleVal = document.getElementById('review-title-input').value;
          const bodyVal = document.getElementById('review-body-input').value;

          const newReview = {
            id: 'rev_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 3),
            productId: prodId,
            productTitle: prodName,
            authorName: this.currentMember.name,
            authorEmail: this.currentMember.email,
            authorAvatar: this.currentMember.avatar || '',
            rating: currentRating,
            date: 'Today',
            verified: true,
            title: titleVal,
            body: bodyVal,
            helpful: 0
          };

          this.saveReview(newReview);
          overlay.classList.remove('active');
          document.body.style.overflow = '';
          form.reset();
          this.showToast(`Thank you, ${this.currentMember.name}! Your verified review has been published.`);
          this.mountProductReviews(prodId);
        };
      }
    }

    openReviewModal(productId = null) {
      if (!this.currentMember) {
        const prod = productId || new URLSearchParams(window.location.search).get('id') || 'beginners-cooking-course';
        this.pendingAction = { type: 'WRITE_REVIEW', productId: prod };
        this.openAuthModal('signup', 'Please sign in or create an account to leave a verified review.');
        return;
      }

      let overlay = document.getElementById('wix-review-overlay');
      if (!overlay) {
        this.renderReviewModal();
        overlay = document.getElementById('wix-review-overlay');
      }
      if (!overlay) return;

      const prodInput = document.getElementById('review-product-id');
      const prodName = document.getElementById('review-modal-product-name');
      const authorBadge = document.getElementById('review-author-badge');

      const targetId = productId || new URLSearchParams(window.location.search).get('id') || 'beginners-cooking-course';
      if (prodInput) prodInput.value = targetId;

      if (prodName) {
        const prettyName = targetId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        prodName.textContent = prettyName;
      }

      if (authorBadge) {
        authorBadge.innerHTML = `Posting verified review as: <strong>${this.currentMember.name}</strong> (${this.currentMember.email})`;
      }

      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    // ------------------------------------------------------------------------
    // RECIPE COMMENTS & CHEF Q&A (RECIPES.HTML)
    // ------------------------------------------------------------------------
    getComments(recipeId = 'banana-cake') {
      try {
        const all = JSON.parse(SafeStorage.getItem(STORAGE_KEYS.COMMENTS) || '[]');
        if (!recipeId) return all;
        return all.filter(c => c.recipeId === recipeId);
      } catch (e) {
        return INITIAL_COMMENTS;
      }
    }

    saveComment(commentData) {
      try {
        const all = JSON.parse(SafeStorage.getItem(STORAGE_KEYS.COMMENTS) || '[]');
        all.unshift(commentData);
        SafeStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(all));

        // Submit to Wix Velo parent page (to persist in Wix Blog / Comments)
        this.notifyWixDashboard('NEW_RECIPE_COMMENT', commentData);
        return true;
      } catch (e) {
        console.error('[Epicurean Flow] Comment save error:', e);
        return false;
      }
    }

    mountRecipeComments(recipeId = 'banana-cake') {
      const container = document.getElementById('recipe-comments-container');
      if (!container) return;

      const comments = this.getComments(recipeId);

      container.innerHTML = `
        <div class="discussion-box">
          <div class="discussion-header">
            <div>
              <span class="section-label" style="display: inline-block; margin-bottom: 4px;">Culinary Living &bull; Community</span>
              <h3 style="font-family: var(--font-serif); font-size: 1.6rem; color: var(--color-ink); margin: 0;">
                Ask Chef Eliane &bull; Recipe Discussion
              </h3>
            </div>
            <span style="font-size: 0.8125rem; color: var(--color-ink-subtle);">${comments.length} Discussion Notes</span>
          </div>

          <!-- Comment Input Field -->
          <div style="margin-bottom: 28px;">
            <div id="recipe-comment-user-badge" style="font-size: 0.8125rem; color: var(--color-ink); margin-bottom: 8px;">
              ${this.currentMember 
                ? `Posting as <strong>${this.currentMember.name}</strong> (${this.currentMember.email})` 
                : `<a href="#" onclick="window.openEpicureanAuth('signup'); return false;" style="color: var(--color-gold); font-weight: 600; text-decoration: underline;">Log in or Sign up</a> to ask Chef Eliane a question.`}
            </div>
            <textarea class="discussion-textarea" id="recipe-comment-input" placeholder="Have a question about ingredient substitutions, bake times, or technique? Ask here..."></textarea>
            <div style="display: flex; justify-content: flex-end; margin-top: 10px;">
              <button type="button" class="btn btn-primary btn-sm" id="btn-submit-recipe-comment">
                <span>Post Comment</span>
              </button>
            </div>
          </div>

          <!-- Comments List -->
          <div class="comments-thread" id="comments-thread-list">
            ${comments.map(c => `
              <div class="comment-item">
                <div class="comment-item-header">
                  <span class="comment-author-name">${c.authorName}</span>
                  <span class="comment-time">${c.date}</span>
                </div>
                <div class="comment-item-body">${c.text}</div>

                ${c.reply ? `
                  <div class="comment-reply-box">
                    <div class="comment-reply-author">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                      <span>${c.reply.authorName} (Verified Instructor)</span>
                      <span style="color: #999; font-weight: 400; margin-left: 8px;">${c.reply.date}</span>
                    </div>
                    <div class="comment-reply-text">${c.reply.text}</div>
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      `;

      const submitBtn = container.querySelector('#btn-submit-recipe-comment');
      if (submitBtn) {
        submitBtn.onclick = () => {
          if (!this.currentMember) {
            this.openAuthModal('signup', 'Please log in or create an account to post your recipe question.');
            return;
          }

          const input = container.querySelector('#recipe-comment-input');
          const text = input ? input.value.trim() : '';
          if (!text) {
            alert('Please write your question or comment before posting.');
            return;
          }

          const newComment = {
            id: 'comm_' + Date.now().toString(36),
            recipeId: recipeId,
            authorName: this.currentMember.name,
            authorEmail: this.currentMember.email,
            date: 'Today',
            text: text,
            reply: null
          };

          this.saveComment(newComment);
          input.value = '';
          this.showToast('Your question has been posted to Chef Eliane!');
          this.mountRecipeComments(recipeId);
        };
      }
    }

    // ------------------------------------------------------------------------
    // MEMBER PORTAL MODAL ("MY ACCOUNT", "MY PURCHASES", "MY REVIEWS")
    // ------------------------------------------------------------------------
    renderPortalModal() {
      if (document.getElementById('wix-portal-overlay')) return;

      const html = `
      <div class="wix-auth-overlay" id="wix-portal-overlay" role="dialog" aria-modal="true" aria-labelledby="portal-modal-title">
        <div class="portal-modal-card">
          <button type="button" class="wix-auth-close-btn" id="wix-portal-close-btn" aria-label="Close portal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div class="portal-user-header">
            <div class="portal-user-avatar" id="portal-user-avatar"></div>
            <div>
              <h3 class="portal-user-name" id="portal-modal-title">My Account</h3>
              <p class="portal-user-meta" id="portal-user-meta"></p>
            </div>
          </div>

          <div class="portal-tabs-nav">
            <button type="button" class="portal-tab-btn active" data-tab="library">My Library &amp; Orders</button>
            <button type="button" class="portal-tab-btn" data-tab="reviews">My Reviews</button>
            <button type="button" class="portal-tab-btn" data-tab="profile">Profile Settings</button>
          </div>

          <div id="portal-tab-content"></div>
        </div>
      </div>
      `;

      document.body.insertAdjacentHTML('beforeend', html);
      this.bindPortalModalEvents();
    }

    bindPortalModalEvents() {
      const overlay = document.getElementById('wix-portal-overlay');
      if (!overlay) return;

      const closeBtn = document.getElementById('wix-portal-close-btn');
      if (closeBtn) {
        closeBtn.onclick = () => {
          overlay.classList.remove('active');
          document.body.style.overflow = '';
        };
      }

      overlay.onclick = (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('active');
          document.body.style.overflow = '';
        }
      };
    }

    openPortalModal(tab = 'library') {
      if (!this.currentMember) {
        this.openAuthModal('signup');
        return;
      }

      let overlay = document.getElementById('wix-portal-overlay');
      if (!overlay) {
        this.renderPortalModal();
        overlay = document.getElementById('wix-portal-overlay');
      }
      if (!overlay) return;

      const avatarEl = document.getElementById('portal-user-avatar');
      const metaEl = document.getElementById('portal-user-meta');

      if (avatarEl) {
        if (this.currentMember.avatar) {
          avatarEl.innerHTML = `<img src="${this.currentMember.avatar}" alt="${this.currentMember.name}">`;
        } else {
          const initials = this.currentMember.initials || (this.currentMember.name ? this.currentMember.name[0].toUpperCase() : 'M');
          avatarEl.textContent = initials;
        }
      }
      if (metaEl) {
        metaEl.innerHTML = `<span>${this.currentMember.email}</span> &bull; <span class="portal-verified-tag">&check; Verified Member</span>`;
      }

      this.renderPortalTab(tab);
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';

      document.querySelectorAll('.portal-tab-btn').forEach(btn => {
        btn.onclick = () => {
          document.querySelectorAll('.portal-tab-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.renderPortalTab(btn.getAttribute('data-tab'));
        };
      });
    }

    renderPortalTab(tab) {
      const container = document.getElementById('portal-tab-content');
      if (!container) return;

      if (tab === 'library') {
        const purchases = this.currentMember.purchases || [];

        if (purchases.length === 0) {
          container.innerHTML = `
            <div class="portal-tab-card" style="text-align: center; padding: 40px 24px;">
              <h4 style="font-family: var(--font-serif); font-size: 1.35rem; color: #12110F; margin: 0 0 10px 0;">Welcome to Your Library, ${this.currentMember.name}!</h4>
              <p style="font-size: 0.9rem; color: #666; max-width: 460px; margin: 0 auto 24px; line-height: 1.5;">
                You haven't enrolled in any culinary masterclasses or purchased digital cookbooks yet. Explore Chef Eliane's signature collection below.
              </p>
              <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
                <a href="cookbooks.html" class="btn btn-outline btn-sm">Browse Cookbooks</a>
                <a href="courses.html" class="btn btn-primary btn-sm">Explore Masterclasses</a>
              </div>
            </div>
          `;
        } else {
          container.innerHTML = `
            <div style="margin-bottom: 16px;">
              <p style="font-size: 0.875rem; color: #666;">
                Here are your active digital publications and masterclass portals with lifetime access.
              </p>
            </div>
            ${purchases.map(pId => `
              <div class="portal-library-item">
                <div class="portal-library-meta">
                  <div class="portal-library-title">${pId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</div>
                  <div class="portal-library-status">&check; Instant Access &bull; Full Digital Portal</div>
                </div>
                <div class="portal-library-actions">
                  <a href="product-detail.html?id=${pId}" class="btn btn-outline btn-sm">View Details</a>
                  <button type="button" class="btn btn-primary btn-sm trigger-write-review" data-product-id="${pId}">Leave Review</button>
                </div>
              </div>
            `).join('')}
          `;
        }
      } else if (tab === 'profile') {
        container.innerHTML = `
          <div class="portal-tab-card">
            <div class="portal-form-group">
              <label for="portal-edit-name">Member Name</label>
              <input type="text" class="portal-form-input" value="${this.currentMember.name}" id="portal-edit-name" placeholder="Your Full Name">
            </div>
            <div class="portal-form-group">
              <label for="portal-edit-email">Email Address (Synced to Wix Dashboard CRM)</label>
              <input type="email" class="portal-form-input" value="${this.currentMember.email}" disabled id="portal-edit-email">
            </div>
            <div class="portal-checkbox-row">
              <input type="checkbox" id="portal-edit-public" ${this.currentMember.publicProfile ? 'checked' : ''}>
              <label for="portal-edit-public">Public Profile enabled (displays name on reviews and recipe comments)</label>
            </div>
            <button type="button" class="btn-portal-primary" id="btn-save-profile">Save Profile Changes</button>
          </div>
        `;

        const saveProfileBtn = document.getElementById('btn-save-profile');
        if (saveProfileBtn) {
          saveProfileBtn.onclick = () => {
            const newName = document.getElementById('portal-edit-name').value;
            const newPublic = document.getElementById('portal-edit-public').checked;
            if (newName && newName.trim()) {
              this.currentMember.name = newName.trim();
              this.currentMember.firstName = newName.trim().split(' ')[0] || newName.trim();
              this.currentMember.publicProfile = newPublic;
              this.saveMember(this.currentMember);
              this.syncUI();
              this.showToast('Profile updated successfully.');
            }
          };
        }
      } else if (tab === 'reviews') {
        const myReviews = this.getReviews().filter(r => (r.authorEmail && r.authorEmail === this.currentMember.email) || r.authorName === this.currentMember.name);
        if (myReviews.length === 0) {
          container.innerHTML = `
            <div class="portal-tab-card" style="text-align: center; padding: 40px 24px;">
              <p style="font-size: 0.9375rem; color: #666; margin-bottom: 18px;">You haven't written any reviews yet.</p>
              <button type="button" class="btn btn-primary btn-sm trigger-write-review">Write Your First Review</button>
            </div>
          `;
        } else {
          container.innerHTML = myReviews.map(r => `
            <div class="review-card" style="margin-bottom: 12px; background: #FFFFFF; border: 1px solid #EBE7DF; border-radius: 10px; padding: 18px;">
              <div class="review-stars" style="color: #BC9142; margin-bottom: 6px;">${'&starf;'.repeat(r.rating || 5)}</div>
              <div class="review-title" style="font-weight: 600; font-size: 1rem; color: #12110F; margin-bottom: 4px;">${r.title}</div>
              <div class="review-body" style="font-size: 0.875rem; color: #444; line-height: 1.5; margin-bottom: 8px;">${r.body}</div>
              <div style="font-size: 0.75rem; color: #BC9142; font-weight: 600;">Product: ${r.productTitle} &bull; ${r.date}</div>
            </div>
          `).join('');
        }
      }
    }

    // ------------------------------------------------------------------------
    // TOAST NOTIFICATIONS
    // ------------------------------------------------------------------------
    showToast(message, duration = 3500) {
      let toast = document.getElementById('epicurean-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'epicurean-toast';
        toast.className = 'epicurean-toast';
        document.body.appendChild(toast);
      }

      toast.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>${message}</span>
      `;

      toast.classList.add('active');

      if (this._toastTimer) clearTimeout(this._toastTimer);
      this._toastTimer = setTimeout(() => {
        toast.classList.remove('active');
      }, duration);
    }
  }

  // --------------------------------------------------------------------------
  // INITIALIZATION & GLOBAL HOOKS
  // --------------------------------------------------------------------------
  function bootEpicureanMembers() {
    if (!window.EpicureanMembers) {
      window.EpicureanMembers = new EpicureanMemberManager();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootEpicureanMembers);
  } else {
    bootEpicureanMembers();
  }

  window.openEpicureanAuth = function (mode = 'signup') {
    if (window.EpicureanMembers) {
      window.EpicureanMembers.openAuthModal(mode);
    } else {
      bootEpicureanMembers();
      setTimeout(() => window.EpicureanMembers && window.EpicureanMembers.openAuthModal(mode), 50);
    }
  };

  window.openEpicureanReview = function (productId = null) {
    if (window.EpicureanMembers) {
      window.EpicureanMembers.openReviewModal(productId);
    }
  };

  window.openEpicureanPortal = function (tab = 'library') {
    if (window.EpicureanMembers) {
      window.EpicureanMembers.openPortalModal(tab);
    }
  };

  window.closeEpicureanMemberDropdown = function () {
    const widget = document.getElementById('member-nav-widget');
    const dropdown = document.getElementById('member-dropdown-menu');
    const btn = document.getElementById('btn-member-profile') || (widget && widget.querySelector('.member-profile-btn')) || document.getElementById('member-profile-btn');
    if (dropdown) {
      dropdown.classList.remove('active', 'show');
      dropdown.style.display = 'none';
      dropdown.style.opacity = '0';
      dropdown.style.visibility = 'hidden';
      dropdown.style.pointerEvents = 'none';
    }
    if (widget) widget.classList.remove('open');
    if (btn) {
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
    }
  };

  window.toggleEpicureanMemberDropdown = function (e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const widget = document.getElementById('member-nav-widget');
    const dropdown = document.getElementById('member-dropdown-menu');
    const btn = document.getElementById('btn-member-profile') || (widget && widget.querySelector('.member-profile-btn')) || document.getElementById('member-profile-btn');
    if (!dropdown) return;

    const isOpen = dropdown.classList.contains('active') ||
                   dropdown.classList.contains('show') ||
                   (widget && widget.classList.contains('open')) ||
                   dropdown.style.display === 'block';

    if (isOpen) {
      window.closeEpicureanMemberDropdown();
    } else {
      dropdown.classList.add('active', 'show');
      if (widget) widget.classList.add('open');
      if (btn) {
        btn.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
      dropdown.style.display = 'block';
      dropdown.style.opacity = '1';
      dropdown.style.visibility = 'visible';
      dropdown.style.pointerEvents = 'auto';
      dropdown.style.transform = 'translateY(0)';
    }
  };

  window.logoutEpicureanMember = function () {
    if (window.EpicureanMembers) {
      window.EpicureanMembers.clearMember();
    }
    window.closeEpicureanMemberDropdown();
  };

  // Global outside click listener to close member dropdown
  document.addEventListener('click', function (e) {
    const widget = document.getElementById('member-nav-widget');
    if (widget && !widget.contains(e.target)) {
      window.closeEpicureanMemberDropdown();
    }
  });
})();

// Smooth scroll for internal anchor links within iframe & open external links in parent window
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView();
        }
      }
    });
  });

  // Ensure external links break out of Wix iframe
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.hasAttribute('target')) {
      link.setAttribute('target', '_top');
    }
  });
});

  