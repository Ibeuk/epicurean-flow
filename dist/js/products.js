/* ==========================================================================
   EPICUREAN FLOW - PRODUCTS, COURSES & WIX HEADLESS COMMERCE MODULE
   ========================================================================== */

const WIX_CONFIG = {
  clientId: '155465fa-5c5a-477d-969f-f0d098b3bcca',
  get pagesDomain() {
    if (typeof window !== 'undefined') {
      return `${window.location.protocol}//${window.location.host}/`;
    }
    return 'https://epicureanflow.com/';
  }
};

/* ==========================================================================
   FLUTTERWAVE LIVE PAYMENT CONFIGURATION
   ========================================================================== */
const FLUTTERWAVE_CONFIG = {
  publicKey: 'FLWPUBK-2f89237ea33cdd550db1f26af74d3c34-X',
  currency: 'EUR',
  businessTitle: 'Epicurean Flow',
  logoUrl: 'https://epicureanflow.com/images/logo.png',
  scriptUrl: 'https://checkout.flutterwave.com/v3.js'
};

function loadFlutterwaveScript() {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.FlutterwaveCheckout) return resolve(true);
    if (typeof document === 'undefined') return resolve(false);
    const existing = document.querySelector('script[src*="flutterwave.com/v3.js"]');
    if (existing) {
      if (window.FlutterwaveCheckout) return resolve(true);
      existing.addEventListener('load', () => resolve(true));
      existing.addEventListener('error', () => resolve(false));
      return;
    }
    const s = document.createElement('script');
    s.src = FLUTTERWAVE_CONFIG.scriptUrl;
    s.async = true;
    s.onload = () => resolve(true);
    s.onerror = () => {
      console.warn('[Flutterwave] Script failed to load from CDN.');
      resolve(false);
    };
    document.head.appendChild(s);
  });
}


const PRODUCTS_DATA = {
  bundles: [
    {
      id: 'holiday-collection',
      wixId: 'c5d1456f-fbc3-c9c5-f0fe-520b3f1ef401',
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
      wixId: '3c4c3872-5b66-a78e-0623-757992b4bf45',
      title: 'The Flavor Without Compromise Bundle',
      subtitle: 'Delicious Food Doesn’t Have to be Bland',
      category: 'Promotional Nutrition Bundle',
      originalPrice: '€41.90',
      originalNumeric: 41.90,
      price: '€34.95',
      numericPrice: 34.95,
      savings: '€6.95',
      isBundle: true,
      isComingSoon: true,
      image: 'images/diabetes-kitchen-cover.jpg',
      badge: 'Coming Soon • Signature Flavor Bundle',
      itemsIncluded: [
        'The Diabetes-Friendly Kitchen (Comprehensive Specialist Guide — Pending Release)',
        'A Symphony of Flavors: Spice Essentials (€16.95 value)'
      ],
      description: 'Enjoy flavorful meals while managing diabetes! Our bundle includes The Diabetes-Friendly Kitchen and A Symphony of Flavors, empowering you to create satisfying dishes without sacrificing taste.',
      buttonText: 'PRE-ORDER INQUIRY',
      url: 'cookbooks.html'
    }
  ],
  cookbooks: [
    {
      id: 'stress-free-thanksgiving',
      wixId: '090291be-8dd5-69da-a123-7c35870a8ec6',
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
      wixId: '',
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
      wixId: '92e444d7-eb3b-c4eb-0975-12416df7a09f',
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
      wixId: '',
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
      wixId: '3c4c3872-5b66-a78e-0623-757992b4bf45',
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
      wixId: '58c9b3a6-c50b-52d8-67f7-e2b1adf793de',
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
      wixId: '',
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
      wixId: '',
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
      wixId: '46e3573a-341a-b5bc-926d-f0f15279d4c7',
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
    },
    {
      id: 'epicurean-flow-meal-planner',
      wixId: '5c782d72-4985-3fdc-bc3e-8897538044e4',
      title: 'Epicurean Flow Meal Planner',
      subtitle: 'Streamline Your Kitchen Schedule & Shopping Lists',
      category: 'Digital Planner & Guide',
      price: '€7.00',
      numericPrice: 7.00,
      image: 'images/lets-eat-cover.jpg',
      badge: 'Digital Meal Planner',
      pages: 25,
      description: 'The complete chef-designed meal planner to organize weekly menus, batch cooking, and intentional nutrition without waste.',
      buttonText: 'GET MEAL PLANNER',
      url: 'cookbooks.html'
    },
    {
      id: 'the-ultimate-macronutrient-guide',
      wixId: '',
      title: 'The Ultimate Macronutrient Guide',
      subtitle: 'Balance Proteins, Fats & Carbohydrates with Chef Precision',
      category: 'Specialist Nutrition Guide',
      price: '€7.00',
      numericPrice: 7.00,
      image: 'images/nutrition-guide-cover.jpg',
      badge: 'Macronutrient Guide',
      pages: 35,
      description: 'Master nutrient density and glycemic balance with straightforward charts, portion wisdom, and flavorful chef substitution ideas.',
      buttonText: 'GET MACRONUTRIENT GUIDE',
      url: 'nutrition.html'
    }
  ],
  courses: [
    {
      id: 'beginners-cooking-course',
      wixId: '',
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
      wixId: '53390c18-fd85-559f-50fb-f1f03bf9fae6',
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
      wixId: '6ce22f5e-37bb-efac-57a3-5b18eff12dd8',
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
      wixId: '7d018d10-9562-91d3-4d2d-6c6bdcb872c9',
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
      wixId: '160f5527-13c1-9ef9-3e2e-1b0f07a94abb',
      title: 'Diabetes Cooking Course',
      subtitle: 'Cook Smart, Eat Well, Enjoy Your Meals',
      differentiator: 'Practical, structured everyday guidance',
      category: 'Diabetes-Friendly Cooking Courses',
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
      wixId: 'b0ad737f-d24e-afa3-9390-bd9691cd5e67',
      title: 'The Complete Diabetes-Friendly Cooking Masterclass',
      subtitle: 'Transform Your Cooking with Confidence and Flavor',
      differentiator: 'Comprehensive premium learning experience',
      category: 'Diabetes-Friendly Cooking Courses',
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
      image: 'images/hero-chef-eliane-new.jpg',
      badge: 'Private Service'
    }
  ],
  freeResources: [
    {
      id: 'free-mediterranean-ebook',
      wixId: 'cbe45ea4-5f5f-5177-21aa-fcc9cf531613',
      title: 'Mediterranean Recipe eBook',
      subtitle: '6 Authentic Dishes + 2 Bonus Secret Dips',
      category: 'Free Download',
      price: '€0.00',
      numericPrice: 0.00,
      image: 'https://static.wixstatic.com/media/30dece_44304d695112497d9840ceafd90ff96f~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg',
      badge: 'Free Gift',
      description: 'Experience true Mediterranean warmth with Chef Eliane’s favorite everyday recipes, pairing notes, and secret herb blends.',
      url: 'cookbooks.html'
    },
    {
      id: 'free-diabetes-bowls',
      wixId: 'd5747779-c725-f005-32e5-e7e4f47af82b',
      title: 'Diabetes-Friendly Mediterranean Bowls of Flavor',
      subtitle: 'Low-Carb, High-Protein Nutrient-Dense Bowls',
      category: 'Free Download',
      price: '€0.00',
      numericPrice: 0.00,
      image: 'https://static.wixstatic.com/media/30dece_e2aa58069aa245689abd1c1db9c7efd1~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg',
      badge: 'Free Gift',
      description: 'Satisfying, blood-sugar conscious bowls loaded with fresh greens, healthy fats, and savory Mediterranean spices.',
      url: 'cookbooks.html'
    }
  ],
  findById: function(id) {
    if (!id) return null;
    const cleanId = String(id).toLowerCase().trim()
      .replace(/^a-symphony-of-flavors$/, 'symphony-of-flavors')
      .replace(/^christmas-in-paris(-.*)?$/, 'christmas-in-paris')
      .replace(/^stress-free-thanksgiving(-.*)?$/, 'stress-free-thanksgiving')
      .replace(/^the-christmas-recipe-collection(-.*)?$/, 'the-christmas-recipe-collection')
      .replace(/^the-diabetes-friendly-kitchen$/, 'the-diabetes-friendly-kitchen')
      .replace(/^diabetes-friendly-kitchen$/, 'the-diabetes-friendly-kitchen')
      .replace(/^diabetes-kitchen$/, 'the-diabetes-friendly-kitchen')
      .replace(/^christmas-collection$/, 'the-christmas-recipe-collection');
    const all = [
      ...(this.bundles || []),
      ...(this.courses || []),
      ...(this.cookbooks || []),
      ...(this.freeResources || []),
      ...(this.services || [])
    ];
    return all.find(item => item.id === id || item.id === cleanId || item.wixId === id) || null;
  }
};

// Asynchronously load the official Wix Headless SDK
async function createWixHeadlessClient() {
  try {
    let createClient, OAuthStrategy, products, currentCart, redirects;
    if (typeof window !== 'undefined' && window.WixHeadless) {
      ({ createClient, OAuthStrategy, products, currentCart, redirects } = window.WixHeadless);
    } else {
      ({ createClient, OAuthStrategy } = await import('https://esm.sh/@wix/sdk'));
      ({ products } = await import('https://esm.sh/@wix/stores'));
      ({ currentCart } = await import('https://esm.sh/@wix/ecom'));
      ({ redirects } = await import('https://esm.sh/@wix/redirects'));
    }

    const client = createClient({
      modules: { products, currentCart, redirects },
      auth: OAuthStrategy({ clientId: WIX_CONFIG.clientId })
    });
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const savedTokens = localStorage.getItem('wix_visitor_tokens');
        if (savedTokens) {
          client.auth.setTokens(JSON.parse(savedTokens));
        } else if (client.auth && client.auth.generateVisitorTokens) {
          const tokens = await client.auth.generateVisitorTokens();
          client.auth.setTokens(tokens);
          localStorage.setItem('wix_visitor_tokens', JSON.stringify(tokens));
        }
      }
    } catch(tErr) {
      console.warn('[Wix Headless] Visitor token note:', tErr.message);
    }
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
    this.customerEmail = '';
    try {
      this.customerEmail = localStorage.getItem('epicurean_customer_email') || '';
    } catch (e) {}

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

    // Preload Flutterwave SDK
    loadFlutterwaveScript();

    // Initialize Wix SDK connection in background
    this.wixClient = await createWixHeadlessClient();
  }

  getFinalTotal() {
    let subtotal = 0;
    this.cartItems.forEach(item => {
      subtotal += (Number(item.numericPrice) || 0);
    });
    let discountAmount = 0;
    if (this.appliedCoupon === 'FLOWS10') {
      const hasBundle = this.cartItems.some(i => i.isBundle || i.id === 'holiday-collection' || i.id === 'flavor-compromise-bundle');
      if (!hasBundle) {
        const eligibleCourse = this.cartItems.find(i => i.isCourse || (PRODUCTS_DATA.courses && PRODUCTS_DATA.courses.some(c => c.id === i.id)));
        if (eligibleCourse) {
          discountAmount = Number((eligibleCourse.numericPrice * 0.10).toFixed(2));
        }
      }
    }
    return Math.max(0, subtotal - discountAmount);
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

    // Find product in catalog (using findById if available, then bundles, cookbooks, courses, services)
    let item = (typeof PRODUCTS_DATA.findById === 'function') ? PRODUCTS_DATA.findById(productId) : null;
    if (!item && PRODUCTS_DATA.bundles) {
      item = PRODUCTS_DATA.bundles.find(p => p.id === productId);
    }
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
      const rawPrice = meta && (meta.numericPrice !== undefined ? meta.numericPrice : meta.price !== undefined ? meta.price : 9.00);
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
      const subtotalElZero = document.getElementById('cart-subtotal-val') || document.getElementById('cart-subtotal');
      const footerContainersZero = document.querySelectorAll('.cart-subtotal, .cart-subtotal-row');
      if (footerContainersZero && footerContainersZero.length > 0) {
        footerContainersZero.forEach(c => {
          c.innerHTML = `
            <div style="display: flex; justify-content: space-between; width: 100%; font-size: 1.15rem; color: var(--color-ink); font-weight: 700;">
              <span>Subtotal:</span>
              <span id="cart-subtotal-val">€0.00</span>
            </div>
          `;
        });
      } else if (subtotalElZero) {
        subtotalElZero.textContent = '€0.00';
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

    // Contextual Upsell Recommendation
    const hasConsultation = this.cartItems.some(i => i.id === 'consultation-menu-planning');
    if (!hasConsultation) {
      html += `
        <div class="cart-upsell-section">
          <div class="cart-upsell-header">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span>Chef's Recommended Pairing</span>
          </div>
          <div class="cart-upsell-card">
            <img src="images/hero-chef-eliane-welcoming.jpg" alt="30-Minute Culinary Consultation with Chef Eliane" class="cart-upsell-img">
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

    // Customer Optional Reference Input Module (Zero email automation required)
    html += `
      <div class="cart-email-container" style="margin: 14px 0 8px 0; padding: 12px; background: rgba(212, 163, 115, 0.08); border: 1px solid rgba(212, 163, 115, 0.35); border-radius: 8px;">
        <label for="cart-customer-email" style="display: flex; align-items: center; justify-content: space-between; font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-ink, #2c2523); margin-bottom: 6px;">
          <span>Customer Name or Reference (Optional):</span>
          <span style="font-weight: 500; color: #2E7D32; font-size: 0.72rem; text-transform: none;">Instant On-Screen Download</span>
        </label>
        <input type="text" id="cart-customer-email" placeholder="e.g. Your name or leave blank" value="${this.customerEmail || ''}" style="width: 100%; padding: 10px 12px; border: 1px solid #c9c2b5; border-radius: 6px; font-size: 0.88rem; box-sizing: border-box; background: #fff;">
        <div style="font-size: 0.72rem; color: #777; margin-top: 5px;">⚡ Direct Digital Delivery: Your purchased book files download immediately on screen. No email required.</div>
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

    // Attach listener for Customer Email input
    const emailInput = document.getElementById('cart-customer-email');
    if (emailInput) {
      emailInput.addEventListener('input', (e) => {
        this.customerEmail = e.target.value.trim();
        try { localStorage.setItem('epicurean_customer_email', this.customerEmail); } catch(err){}
        const errEl = document.getElementById('cart-email-error');
        if (errEl) errEl.style.display = 'none';
        emailInput.style.borderColor = '#c9c2b5';
      });
    }

    // Hide legacy empty state element if present
    const legacyEmpty = document.getElementById('cart-empty-state');
    if (legacyEmpty && legacyEmpty !== this.cartItemsListEl) {
      legacyEmpty.style.display = 'none';
    }

    // Render Subtotal & Total dynamically in all matching containers
    const subtotalContainers = document.querySelectorAll('.cart-subtotal, .cart-subtotal-row');
    if (subtotalContainers && subtotalContainers.length > 0) {
      subtotalContainers.forEach(container => {
        if (discountAmount > 0) {
          container.innerHTML = `
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
          container.innerHTML = `
            <div style="display: flex; justify-content: space-between; width: 100%; font-size: 1.15rem; color: var(--color-ink); font-weight: 700;">
              <span>Subtotal:</span>
              <span id="cart-subtotal-val">€${subtotal.toFixed(2)}</span>
            </div>
          `;
        }
      });
    }

    // Also update any standalone spans by ID
    const standaloneSpans = document.querySelectorAll('#cart-subtotal-val, #cart-subtotal');
    standaloneSpans.forEach(s => {
      s.textContent = `€${(discountAmount > 0 ? finalTotal : subtotal).toFixed(2)}`;
    });

    // Checkout button — live and ready for purchases via Flutterwave
    if (this.checkoutBtnEl) {
      const totalAmount = (discountAmount > 0 ? finalTotal : subtotal);
      this.checkoutBtnEl.innerHTML = `
        <span style="display: inline-flex; align-items: center; justify-content: center; gap: 8px;">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
          Pay with Flutterwave &bull; €${totalAmount.toFixed(2)}
        </span>
      `;
      this.checkoutBtnEl.disabled = false;
      this.checkoutBtnEl.style.opacity = '1';
      this.checkoutBtnEl.style.cursor = 'pointer';

      const footer = this.checkoutBtnEl.closest('.cart-drawer-footer');
      if (footer && !footer.querySelector('.cart-flutterwave-badge')) {
        const badge = document.createElement('div');
        badge.className = 'cart-flutterwave-badge';
        badge.style.cssText = 'text-align: center; margin-top: 10px; font-size: 0.72rem; color: #777; letter-spacing: 0.02em;';
        badge.innerHTML = '🔒 Secured by <strong>Flutterwave</strong> &bull; Cards &bull; Apple Pay &bull; Bank';
        footer.appendChild(badge);
      }
    }
  }

  async proceedToCheckout() {
    console.log('[CartManager] proceedToCheckout invoked! Cart items:', this.cartItems.length);

    if (!this.cartItems || this.cartItems.length === 0) {
      alert('Your shopping bag is currently empty. Please add a cookbook or course to proceed.');
      return;
    }

    // Customer reference: 100% optional (zero email automation / zero blocking)
    const emailInput = document.getElementById('cart-customer-email');
    const inputVal = emailInput ? emailInput.value.trim() : (this.customerEmail || '');
    
    // Fallback internally to a guest reference so Flutterwave API payload is satisfied without dispatching mail
    const isRealEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputVal);
    const finalEmail = isRealEmail ? inputVal : ('guest-' + Date.now() + '@epicureanflow.com');
    const customerDisplayName = (inputVal && !isRealEmail) ? inputVal : (isRealEmail ? inputVal.split('@')[0] : 'Guest Reader');

    if (inputVal) {
      this.customerEmail = inputVal;
      try { localStorage.setItem('epicurean_customer_email', inputVal); } catch (e) {}
    }

    const originalContent = this.checkoutBtnEl ? this.checkoutBtnEl.innerHTML : 'Proceed to Checkout';
    if (this.checkoutBtnEl) {
      this.checkoutBtnEl.innerHTML = '<span>Launching Secure Payment...</span>';
      this.checkoutBtnEl.style.opacity = '0.8';
      this.checkoutBtnEl.style.pointerEvents = 'none';
    }

    const resetCheckoutBtn = () => {
      if (this.checkoutBtnEl) {
        this.checkoutBtnEl.innerHTML = originalContent;
        this.checkoutBtnEl.style.opacity = '1';
        this.checkoutBtnEl.style.pointerEvents = 'auto';
      }
    };

    try {
      await loadFlutterwaveScript();

      if (typeof window.FlutterwaveCheckout !== 'function') {
        throw new Error('Flutterwave SDK not loaded');
      }

      const totalAmount = this.getFinalTotal();
      const txRef = 'EF-' + Date.now() + '-' + Math.floor(Math.random() * 1000000);
      const itemsList = this.cartItems.map(i => i.title).join(', ');
      const purchasedSnapshot = [...this.cartItems];

      window.FlutterwaveCheckout({
        public_key: FLUTTERWAVE_CONFIG.publicKey,
        tx_ref: txRef,
        amount: totalAmount,
        currency: FLUTTERWAVE_CONFIG.currency,
        payment_options: 'card, ussd, mobilemoney, banktransfer, account, applepay, googlepay',
        customer: {
          email: finalEmail,
          name: customerDisplayName
        },
        customizations: {
          title: FLUTTERWAVE_CONFIG.businessTitle,
          description: 'Payment for: ' + (itemsList.length > 70 ? itemsList.substring(0, 67) + '...' : itemsList),
          logo: FLUTTERWAVE_CONFIG.logoUrl
        },
        callback: (response) => {
          console.log('[Flutterwave] Payment response:', response);
          resetCheckoutBtn();
          if (response.status === 'successful' || response.status === 'completed') {
            this.handlePaymentSuccess(response, totalAmount, finalEmail, purchasedSnapshot);
          }
        },
        onclose: () => {
          console.log('[Flutterwave] Payment modal closed by user');
          resetCheckoutBtn();
        }
      });
    } catch (err) {
      console.error('[CartManager] Flutterwave checkout error:', err);
      resetCheckoutBtn();
      alert('Unable to launch Flutterwave secure checkout. Please check your internet connection or try again.');
    }
  }

  handlePaymentSuccess(response, amountPaid, customerEmail, purchasedItems) {
    this.cartItems = [];
    this.saveCart();
    this.renderCart();
    this.closeDrawer();

    let modal = document.getElementById('ef-payment-success-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'ef-payment-success-modal';
      modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(18, 14, 12, 0.75); backdrop-filter: blur(8px);
        display: flex; align-items: center; justify-content: center;
        z-index: 999999; padding: 20px; box-sizing: border-box;
      `;
      document.body.appendChild(modal);
    }

    const downloadMap = {
      'symphony': { file: 'ready_for_wix_upload/A_Symphony_of_Flavors_Cookbook.pdf', name: 'A_Symphony_of_Flavors_Cookbook.pdf' },
      'diabetes': { file: 'ready_for_wix_upload/The_Complete_Diabetes_Cooking_Masterclass.pdf', name: 'The_Complete_Diabetes_Cooking_Masterclass.pdf' },
      'thanksgiving': { file: 'Stress_Free_Thanksgiving_Premium_Guide_Final_Publication_Interactive.pdf', name: 'Stress_Free_Thanksgiving_Guide.pdf' },
      'baking': { file: 'ready_for_wix_upload/Beginners_Baking_Course_Guide.pdf', name: 'Beginners_Baking_Course_Guide.pdf' },
      'intermediate': { file: 'ready_for_wix_upload/Intermediate_Cooking_Techniques_Course_Workbook.pdf', name: 'Intermediate_Cooking_Techniques_Workbook.pdf' },
      'advanced': { file: 'ready_for_wix_upload/Advanced_Cooking_Techniques_Course_Guide.pdf', name: 'Advanced_Cooking_Techniques_Guide.pdf' }
    };

    const getFileForItem = (item) => {
      const t = ((item.title || '') + ' ' + (item.id || '')).toLowerCase();
      if (t.includes('symphony') || t.includes('flavor') || t.includes('spice')) return downloadMap.symphony;
      if (t.includes('diabetes') || t.includes('diabetic')) return downloadMap.diabetes;
      if (t.includes('thanksgiving')) return downloadMap.thanksgiving;
      if (t.includes('baking') || t.includes('beginner')) return downloadMap.baking;
      if (t.includes('intermediate')) return downloadMap.intermediate;
      if (t.includes('advanced')) return downloadMap.advanced;
      return downloadMap.thanksgiving;
    };

    const itemsHtml = (purchasedItems || []).map(item => {
      const dl = getFileForItem(item);
      return `
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 10px; text-align: left; padding: 12px 14px; background: #faf8f5; border-radius: 8px; border: 1px solid #ebd9c8;">
          <div style="overflow: hidden; flex: 1;">
            <div style="font-size: 0.92rem; font-weight: 700; color: #2c2523; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">📖 ${item.title}</div>
            <div style="font-size: 0.74rem; color: #2E7D32; font-weight: 600; margin-top: 2px;">✓ Verified Purchase &bull; Instant PDF Delivery</div>
          </div>
          <a href="${dl.file}" download="${dl.name}" target="_blank" style="display: inline-flex; align-items: center; gap: 6px; background: #d4a373; color: #ffffff; padding: 9px 16px; border-radius: 6px; font-size: 0.84rem; font-weight: 700; text-decoration: none; white-space: nowrap; box-shadow: 0 2px 6px rgba(0,0,0,0.12);">
            Download PDF
          </a>
        </div>
      `;
    }).join('');

    modal.innerHTML = `
      <div style="background: #ffffff; max-width: 520px; width: 100%; border-radius: 14px; padding: 34px 28px; text-align: center; box-shadow: 0 25px 60px rgba(0,0,0,0.3); border: 1px solid #d4a373; font-family: 'Montserrat', sans-serif;">
        <div style="width: 60px; height: 60px; border-radius: 50%; background: #e8f5e9; color: #2e7d32; display: inline-flex; align-items: center; justify-content: center; font-size: 30px; margin-bottom: 14px;">
          ✓
        </div>
        <h2 style="font-family: 'Cinzel', serif; font-size: 1.55rem; color: #1e1b18; margin: 0 0 8px 0;">Payment Successful!</h2>
        <p style="font-size: 0.92rem; color: #555; line-height: 1.5; margin: 0 0 18px 0;">
          Your payment of <strong>€${Number(amountPaid).toFixed(2)}</strong> via Flutterwave has been confirmed.
        </p>

        <div style="margin: 18px 0; text-align: left;">
          <div style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #777; margin-bottom: 10px;">
            📥 Download Your Publications Below:
          </div>
          ${itemsHtml || '<div style="font-size: 0.9rem;">Your selected culinary publications</div>'}
        </div>

        <div style="background: #fdfaf6; border: 1px solid #e8e2d9; border-radius: 8px; padding: 12px; margin-bottom: 22px; font-size: 0.78rem; color: #666; line-height: 1.4; display: flex; justify-content: space-between;">
          <span>Transaction Ref: <strong>${response.tx_ref || 'EF-' + Date.now()}</strong></span>
          <span style="color: #2E7D32; font-weight: 700;">Status: Paid</span>
        </div>

        <button type="button" id="btn-close-payment-modal" style="background: #2c2523; color: #ffffff; border: none; padding: 14px 28px; border-radius: 8px; font-size: 0.95rem; font-weight: 600; cursor: pointer; width: 100%; transition: background 0.2s;">
          Close &amp; Return to Epicurean Flow
        </button>
      </div>
    `;

    modal.style.display = 'flex';
    document.getElementById('btn-close-payment-modal').onclick = () => {
      modal.style.display = 'none';
    };
  }
}

// Expose direct single-book Flutterwave checkout globally
window.paySingleBookWithFlutterwave = async function(bookId, email = null) {
  let item = (typeof PRODUCTS_DATA.findById === 'function') ? PRODUCTS_DATA.findById(bookId) : null;
  if (!item && PRODUCTS_DATA.cookbooks) item = PRODUCTS_DATA.cookbooks.find(p => p.id === bookId);
  if (!item && PRODUCTS_DATA.bundles) item = PRODUCTS_DATA.bundles.find(p => p.id === bookId);
  if (!item && PRODUCTS_DATA.courses) item = PRODUCTS_DATA.courses.find(p => p.id === bookId);

  if (!item) {
    console.error('[Flutterwave] Book not found:', bookId);
    return;
  }

  const rawPrice = item.numericPrice || parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 14.95;
  const userRef = email || (window.cartManager && window.cartManager.customerEmail) || '';
  const isRealEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userRef);
  const finalEmail = isRealEmail ? userRef : ('guest-' + Date.now() + '@epicureanflow.com');
  const finalName = (userRef && !isRealEmail) ? userRef : 'Customer';

  await loadFlutterwaveScript();
  const txRef = 'EF-BOOK-' + Date.now() + '-' + Math.floor(Math.random() * 1000000);

  window.FlutterwaveCheckout({
    public_key: FLUTTERWAVE_CONFIG.publicKey,
    tx_ref: txRef,
    amount: rawPrice,
    currency: FLUTTERWAVE_CONFIG.currency,
    payment_options: 'card, ussd, mobilemoney, banktransfer, account, applepay, googlepay',
    customer: {
      email: finalEmail,
      name: finalName
    },
    customizations: {
      title: FLUTTERWAVE_CONFIG.businessTitle,
      description: 'Purchase: ' + item.title,
      logo: FLUTTERWAVE_CONFIG.logoUrl
    },
    callback: function(response) {
      if (response.status === 'successful' || response.status === 'completed') {
        if (window.cartManager) {
          window.cartManager.handlePaymentSuccess(response, rawPrice, finalEmail, [item]);
        } else {
          alert('Payment Successful! Reference: ' + response.tx_ref);
        }
      }
    }
  });
};

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

      // Never render generic or unwanted "Digital Cookbook" badge over book covers
      let badgeHtml = '';
      if (item.ribbon && item.ribbon.trim()) {
        const ribbonLower = item.ribbon.toLowerCase().trim();
        if (!ribbonLower.includes('cookbook') && !ribbonLower.includes('digital')) {
          const badgeClass = ribbonLower.includes('masterclass') ? 'badge-masterclass' : 'badge-everyday';
          badgeHtml = `<span class="card-badge-pill ${badgeClass}">${item.ribbon}</span>`;
        }
      }

      const descSnippet = item.description 
        ? item.description.replace(/<[^>]*>?/gm, '').slice(0, 130) + '...' 
        : (type === 'course' 
            ? 'Comprehensive self-paced culinary curriculum with step-by-step techniques and kitchen workbook.' 
            : 'Chef-tested recipes with authentic Mediterranean roots, flavor pairing notes, and chef guidance.');

      const detailUrl = `product-detail.html?id=${encodeURIComponent(id)}`;
      const safeTitle = title.replace(/'/g, "\\'").replace(/"/g, '&quot;');

      return `
        <article class="catalog-card-editorial" data-wix-id="${id}">
          <div class="catalog-card-media">
            <img src="${imgUrl}" alt="${safeTitle}" class="catalog-card-img" onerror="this.src='images/lets-eat-cover.jpg'">
            ${badgeHtml}
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

    // 1. Keep all 6 curated courses permanently visible and active
    const staticGrid = document.getElementById('courses-static-grid');
    if (staticGrid) {
      staticGrid.style.display = 'grid';
    }
    const coursePlaceholder = document.getElementById('courses-curation-placeholder');
    if (coursePlaceholder) coursePlaceholder.style.display = 'none';

    // 2. Keep curated cookbooks permanently visible and active
    const staticCookbooksGrid = document.getElementById('cookbooks-static-grid');
    if (staticCookbooksGrid) {
      staticCookbooksGrid.style.display = 'grid';
    }
    const cookbookPlaceholder = document.getElementById('cookbooks-curation-placeholder');
    if (cookbookPlaceholder) cookbookPlaceholder.style.display = 'none';

    // 3. Fallback for legacy generic grids if present
    const genericGrid = document.getElementById('featured-products-grid') || document.getElementById('catalog-grid');
    if (genericGrid) {
      genericGrid.innerHTML = validItems.map(item => {
        const name = (item.name || item.title || '').toLowerCase();
        const isC = name.includes('course') || name.includes('masterclass') || name.includes('academy') || name.includes('class');
        return renderCard(item, isC ? 'course' : 'cookbook');
      }).join('');
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
