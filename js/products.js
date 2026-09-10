/* ==========================================================================
   EPICUREAN FLOW - PRODUCTS, COURSES & WIX HEADLESS COMMERCE MODULE
   ========================================================================== */

const WIX_CONFIG = {
  clientId: 'd446c704-ea75-4680-affd-1633fca4bfb8',
  pagesDomain: 'https://epicureanflow.wixsite.com/epicurean-flow/'
};

const PRODUCTS_DATA = {
  // Current products removed pending synchronization with newly redesigned catalog
  cookbooks: [],
  courses: [],
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
  ]
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
    this.drawerEl = document.getElementById('cart-drawer');
    this.backdropEl = document.getElementById('cart-backdrop') || document.getElementById('cart-overlay');
    this.cartItemsListEl = document.getElementById('cart-items-list') || document.getElementById('cart-items-container') || document.getElementById('cart-body');
    this.cartSubtotalEl = document.getElementById('cart-subtotal-val') || document.querySelector('.cart-subtotal-amount') || document.querySelector('.subtotal-amount');
    this.checkoutBtnEl = document.getElementById('btn-proceed-checkout');
    this.closeBtnEl = document.getElementById('close-cart-btn') || document.getElementById('cart-close-btn');

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
        const price = btn.getAttribute('data-price');
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

    // Find product in catalog or use meta
    let item = PRODUCTS_DATA.cookbooks.find(p => p.id === productId);
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
        image: meta && meta.image ? meta.image : 'https://static.wixstatic.com/media/30dece_e2aa58069aa245689abd1c1db9c7efd1~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg'
      };
    }

    this.cartItems.push({
      id: item.id,
      title: item.title,
      price: item.price,
      numericPrice: Number(item.numericPrice) || 9.00,
      image: item.image,
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
      if (this.cartSubtotalEl) this.cartSubtotalEl.textContent = '€0.00';
      return;
    }

    let subtotal = 0;
    let html = '';

    this.cartItems.forEach((item, idx) => {
      const p = Number(item.numericPrice) || 0;
      subtotal += p;
      html += `
        <div class="cart-item-row">
          <img src="${item.image}" alt="${item.title}" class="cart-item-img" onerror="this.src='https://static.wixstatic.com/media/30dece_e2aa58069aa245689abd1c1db9c7efd1~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg'">
          <div class="cart-item-details">
            <div class="cart-item-title">${item.title}</div>
            <div class="cart-item-price">${item.price || ('€' + p.toFixed(2))}</div>
          </div>
          <button type="button" class="cart-item-remove" onclick="window.cartManager.removeItem(${idx})" aria-label="Remove item" title="Remove">✕</button>
        </div>
      `;
    });

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
            <img src="https://static.wixstatic.com/media/8e85e1_c25a6a7985884ad7bc9e9b38adda9152~mv2.png/v1/fit/w_500,h_500,q_90/file.png" alt="Menu Planning Consultation" class="cart-upsell-img">
            <div class="cart-upsell-info">
              <div class="cart-upsell-title">Personalized Menu Planning</div>
              <div class="cart-upsell-price">€120.00</div>
            </div>
            <button type="button" class="btn-add-upsell" onclick="window.cartManager.addItem('consultation-menu-planning')">+ Add</button>
          </div>
        </div>
      `;
    }

    this.cartItemsListEl.innerHTML = html;
    // Hide legacy empty state element if present
    const legacyEmpty = document.getElementById('cart-empty-state');
    if (legacyEmpty && legacyEmpty !== this.cartItemsListEl) {
      legacyEmpty.style.display = 'none';
    }
    if (this.cartSubtotalEl) this.cartSubtotalEl.textContent = '€' + subtotal.toFixed(2);
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
            window.location.href = redirect.redirectSession.fullUrl;
            return;
          }
        }
      } catch (err) {
        console.error('[CartManager] Wix Headless checkout error:', err);
      }
    } else {
      console.warn('[CartManager] wixClient not ready, fallback triggered');
    }

    console.log('[CartManager] Falling back to standard store cart');
    window.location.href = `${WIX_CONFIG.pagesDomain}cart-page`;
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
    const gridEl = document.getElementById('featured-products-grid') || document.getElementById('catalog-grid');
    if (!gridEl || !items || items.length === 0) return;

    // Filter out Wix store default template dummy goods (vases, eyewear, sweaters, etc.)
    const dummyItemKeywords = ['vase', 'tote bag', 'eye serum', 'sweater', 'eyeglasses', 'chair', 'cleanser', 'baseball cap', 'water bottle', 'diffuser', 'earrings', 't-shirt'];
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

    let html = '';
    validItems.forEach((item, index) => {

      const id = item._id || item.id || `wix-prod-${index}`;
      const title = item.name || item.title || 'Epicurean Flow Edition';
      const rawPrice = item.price?.price ?? item.priceData?.price ?? item.numericPrice ?? 0;
      const formattedPrice = item.price?.formatted?.price ?? item.priceData?.formatted?.price ?? item.formattedPrice ?? (rawPrice ? `$${Number(rawPrice).toFixed(2)}` : 'Inquire');
      
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

      const badge = item.ribbon || item.badge || (item.productType === 'digital' ? 'Digital Edition' : 'Featured Culinary');
      const desc = item.description ? item.description.replace(/<[^>]*>?/gm, '').slice(0, 130) + '...' : 'Michelin-rooted technique, chef-tested ingredients, and vibrant gastronomic creations.';
      const productSlug = item.slug || item.productPageUrl?.path || 'product-detail.html';
      const detailUrl = productSlug.startsWith('http') ? productSlug : `product-detail.html?id=${id}`;

      html += `
        <article class="tour-card" data-wix-id="${id}">
          <div class="tour-media">
            <img src="${imgUrl}" alt="${title}" onerror="this.src='https://static.wixstatic.com/media/30dece_1857ef21db784a739672d128e48f7dc7f002.jpg/v1/fill/w_1200,h_800,enc_auto/file.jpeg'">
            <span class="tour-city-badge">${badge}</span>
          </div>
          <div class="tour-body">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
              <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-gold);">Chef Edition</span>
              <span style="font-family: var(--font-serif); font-size: 1.5rem; font-weight: 700; color: var(--color-ink);">${formattedPrice}</span>
            </div>
            <h3 style="font-family: var(--font-serif); font-size: 1.35rem; margin-bottom: 10px; color: var(--color-ink);">${title}</h3>
            <p style="font-size: 0.9375rem; color: var(--color-ink-light); line-height: 1.6; margin-bottom: 20px;">
              ${desc}
            </p>
            <div class="card-action-buttons">
              <a href="${detailUrl}" class="btn btn-primary btn-sm btn-card-action">View Details</a>
              <button type="button" class="btn btn-outline btn-sm btn-card-action btn-add-to-cart" 
                onclick="CartManager.addItem({id:'${id}', wixId:'${id}', title:'${title.replace(/'/g, "\\'")}', price:${rawPrice || 0}, image:'${imgUrl}'}); CartManager.openCart();">
                Add to Cart &bull; ${formattedPrice}
              </button>
            </div>
          </div>
        </article>
      `;
    });

    gridEl.innerHTML = html;
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
