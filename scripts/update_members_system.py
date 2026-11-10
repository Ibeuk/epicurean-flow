import os
import re

# ==============================================================================
# 1. UPDATE JS/MEMBERS.JS
# ==============================================================================
def update_js_members():
    path = os.path.join('js', 'members.js')
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Part A: Storage and Storage Keys
    old_storage = """  // --------------------------------------------------------------------------
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
  };"""

    new_storage = """  // --------------------------------------------------------------------------
  // CRASH-PROOF PERSISTENT STORAGE (SafeStorage - Accounts, Reviews, Comments)
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

  // --------------------------------------------------------------------------
  // CRASH-PROOF SESSION STORAGE (SafeSessionStorage - Active User Session)
  // Auto-logs out when user closes browser or tab (Wix Members security standard)
  // --------------------------------------------------------------------------
  const sessionMemoryStore = {};
  const SafeSessionStorage = {
    getItem(key) {
      try {
        if (typeof window !== 'undefined' && window.sessionStorage) {
          return window.sessionStorage.getItem(key);
        }
      } catch (e) {}
      return sessionMemoryStore[key] || null;
    },
    setItem(key, value) {
      try {
        if (typeof window !== 'undefined' && window.sessionStorage) {
          window.sessionStorage.setItem(key, value);
          return;
        }
      } catch (e) {}
      sessionMemoryStore[key] = String(value);
    },
    removeItem(key) {
      try {
        if (typeof window !== 'undefined' && window.sessionStorage) {
          window.sessionStorage.removeItem(key);
        }
      } catch (e) {}
      delete sessionMemoryStore[key];
    }
  };

  const STORAGE_KEYS = {
    ACTIVE_SESSION: 'epicurean_member_active_session',
    LAST_ACTIVE: 'epicurean_session_last_active',
    ACCOUNTS: 'epicurean_registered_accounts_v2',
    REVIEWS: 'epicurean_member_reviews_v2',
    COMMENTS: 'epicurean_member_comments_v2'
  };

  // 30 minutes of inactivity forces automatic logout
  const SESSION_INACTIVITY_LIMIT_MS = 30 * 60 * 1000;

  // Canonical product catalog metadata for digital assets, downloads & covers
  const KNOWN_PRODUCTS = {
    'holiday-collection': {
      title: 'Complete Holiday Table Collection',
      image: 'images/the-christmas-recipe-collection-cover.jpg',
      format: 'Digital E-Book Bundle (4 Volumes • PDF + EPUB)',
      filename: 'Epicurean-Flow-Holiday-Table-Collection.pdf',
      price: '€36.95'
    },
    'flavor-compromise-bundle': {
      title: 'The Flavor Without Compromise Bundle',
      image: 'images/diabetes-kitchen-cover.jpg',
      format: 'Digital Specialist Bundle (2 Volumes • PDF)',
      filename: 'Epicurean-Flow-Flavor-Without-Compromise-Bundle.pdf',
      price: '€34.95'
    },
    'the-diabetes-friendly-kitchen': {
      title: 'The Diabetes-Friendly Kitchen',
      image: 'images/diabetes-kitchen-cover.jpg',
      format: 'Digital Specialist Guide (50 Pages • PDF)',
      filename: 'Epicurean-Flow-Diabetes-Friendly-Kitchen.pdf',
      price: '€24.95'
    },
    'stress-free-thanksgiving': {
      title: 'Stress-Free Thanksgiving',
      image: 'images/thanksgiving-guide-cover.jpg',
      format: 'Instant Digital Download (58 Pages • PDF)',
      filename: 'Epicurean-Flow-Stress-Free-Thanksgiving.pdf',
      price: '€14.95'
    },
    'the-christmas-recipe-collection': {
      title: 'The Christmas Recipe Collection',
      image: 'images/the-christmas-recipe-collection-cover.jpg',
      format: 'Instant Digital Download (48 Pages • PDF)',
      filename: 'Epicurean-Flow-Christmas-Recipe-Collection.pdf',
      price: '€16.95'
    },
    'christmas-in-paris': {
      title: 'Christmas in Paris',
      image: 'images/christmas-in-paris-cover.jpg',
      format: 'Instant Digital Download (52 Pages • PDF)',
      filename: 'Epicurean-Flow-Christmas-in-Paris.pdf',
      price: '€19.95'
    },
    'ditch-the-cheese-ball': {
      title: 'Ditch the Cheese Ball',
      image: 'images/ditch-the-cheese-ball-cover.jpg',
      format: 'Instant Digital Download (28 Pages • PDF)',
      filename: 'Epicurean-Flow-Ditch-the-Cheese-Ball.pdf',
      price: '€8.95'
    },
    'symphony-of-flavors': {
      title: 'A Symphony of Flavors',
      image: 'images/symphony-flavors-cover.jpg',
      format: 'Curated Spice Guide & E-Book (PDF)',
      filename: 'Epicurean-Flow-Symphony-of-Flavors.pdf',
      price: '€16.95'
    },
    'beginners-cooking-course': {
      title: "Beginners’ Cooking Course",
      image: 'images/course-beginners-cooking-cover.jpg',
      format: 'Digital Masterclass Portal (12 Video Modules + Workbook PDF)',
      filename: 'Epicurean-Flow-Beginners-Cooking-Workbook.pdf',
      price: '€69.00'
    },
    'beginners-baking': {
      title: 'Baking for Beginners',
      image: 'images/course-baking-cover.jpg',
      format: 'Digital Masterclass Portal (10 Video Modules + Pastry Guide PDF)',
      filename: 'Epicurean-Flow-Beginners-Baking-Guide.pdf',
      price: '€59.00'
    },
    'intermediate-cooking-techniques': {
      title: 'Intermediate Cooking Techniques',
      image: 'images/intermediate-cooking-techniques-cover.jpg',
      format: 'Advanced Masterclass Portal (14 Video Modules + Sauce Guide PDF)',
      filename: 'Epicurean-Flow-Intermediate-Cooking-Guide.pdf',
      price: '€79.00'
    }
  };"""

    assert old_storage in content, "Could not locate old_storage in members.js"
    content = content.replace(old_storage, new_storage, 1)

    # Part B: Update init() to include setupActivityTracker()
    old_init = """    init() {
      this.ensureDataStorage();
      this.loadMember();
      this.renderAuthModal();"""

    new_init = """    init() {
      this.ensureDataStorage();
      this.loadMember();
      this.setupActivityTracker();
      this.renderAuthModal();"""

    assert old_init in content, "Could not locate old_init in members.js"
    content = content.replace(old_init, new_init, 1)

    # Part C: Update loadMember, saveMember, clearMember, setupActivityTracker
    old_member_ops = """    loadMember() {
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
    }"""

    new_member_ops = """    setupActivityTracker() {
      let lastThrottleUpdate = 0;
      const onUserActivity = () => {
        if (!this.currentMember) return;
        const now = Date.now();
        if (now - lastThrottleUpdate > 10000) {
          lastThrottleUpdate = now;
          const lastActiveStr = SafeSessionStorage.getItem(STORAGE_KEYS.LAST_ACTIVE);
          const lastActive = lastActiveStr ? parseInt(lastActiveStr, 10) : 0;
          if (lastActive && (now - lastActive > SESSION_INACTIVITY_LIMIT_MS)) {
            console.log('[Epicurean Flow] Session expired due to inactivity (>30 mins)');
            this.clearMember(true /* dueToInactivity */);
            return;
          }
          SafeSessionStorage.setItem(STORAGE_KEYS.LAST_ACTIVE, String(now));
        }
      };

      ['click', 'keydown', 'touchstart', 'scroll'].forEach(evt => {
        window.addEventListener(evt, onUserActivity, { passive: true });
      });

      // Periodic check every 60 seconds even if completely idle
      setInterval(() => {
        if (!this.currentMember) return;
        const now = Date.now();
        const lastActiveStr = SafeSessionStorage.getItem(STORAGE_KEYS.LAST_ACTIVE);
        const lastActive = lastActiveStr ? parseInt(lastActiveStr, 10) : 0;
        if (lastActive && (now - lastActive > SESSION_INACTIVITY_LIMIT_MS)) {
          console.log('[Epicurean Flow] Periodic check: Inactivity timeout reached (>30m).');
          this.clearMember(true /* dueToInactivity */);
        }
      }, 60000);
    }

    loadMember() {
      try {
        // Active session strictly lives in sessionStorage (cleared upon tab or browser close)
        const stored = SafeSessionStorage.getItem(STORAGE_KEYS.ACTIVE_SESSION);
        if (stored) {
          const sessionUser = JSON.parse(stored);
          const lastActiveStr = SafeSessionStorage.getItem(STORAGE_KEYS.LAST_ACTIVE);
          const lastActive = lastActiveStr ? parseInt(lastActiveStr, 10) : 0;
          const now = Date.now();

          // Check if session has exceeded 30-minute inactivity limit
          if (lastActive && (now - lastActive > SESSION_INACTIVITY_LIMIT_MS)) {
            console.log('[Epicurean Flow] Session expired due to inactivity (>30 mins)');
            this.clearMember(true /* dueToInactivity */);
            return;
          }

          // Refresh active timestamp
          SafeSessionStorage.setItem(STORAGE_KEYS.LAST_ACTIVE, String(now));

          // Cross-reference with persistent account database for latest orders/updates
          const freshAccount = this.findAccountByEmail(sessionUser.email);
          this.currentMember = freshAccount ? { ...freshAccount, ...sessionUser } : sessionUser;

          if (!this.currentMember.orders) this.currentMember.orders = [];
          if (!this.currentMember.purchases) this.currentMember.purchases = [];
        } else {
          this.currentMember = null;
        }
      } catch (e) {
        this.currentMember = null;
      }
    }

    saveMember(member) {
      if (!member.orders) member.orders = [];
      if (!member.purchases) member.purchases = [];

      this.currentMember = member;

      // 1. Save active session to sessionStorage (cleared on tab/browser close)
      try {
        SafeSessionStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, JSON.stringify(member));
        SafeSessionStorage.setItem(STORAGE_KEYS.LAST_ACTIVE, String(Date.now()));
      } catch (e) {}

      // 2. Persist account credentials and profile permanently in localStorage
      this.saveAccount(member);

      this.syncUI();
      this.notifyWixDashboard('MEMBER_LOGGED_IN', member);

      // Execute any pending action that requested authentication
      if (this.pendingAction) {
        const action = this.pendingAction;
        this.pendingAction = null;
        if (action.type === 'WRITE_REVIEW') {
          setTimeout(() => this.openReviewModal(action.productId), 300);
        } else if (action.type === 'OPEN_PORTAL') {
          setTimeout(() => this.openPortalModal(action.tab || 'orders'), 300);
        }
      }
    }

    clearMember(dueToInactivity = false) {
      this.currentMember = null;
      try {
        SafeSessionStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
        SafeSessionStorage.removeItem(STORAGE_KEYS.LAST_ACTIVE);
      } catch (e) {}
      this.syncUI();
      this.notifyWixDashboard('WIX_MEMBER_LOGGED_OUT', {});

      // Close portal modal if open
      const portalOverlay = document.getElementById('wix-portal-overlay');
      if (portalOverlay) {
        portalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }

      if (dueToInactivity) {
        this.showToast('Your session has expired due to 30 minutes of inactivity. Please log in again to continue.', 5000);
      } else {
        this.showToast('You have been securely logged out.');
      }
    }"""

    assert old_member_ops in content, "Could not locate old_member_ops in members.js"
    content = content.replace(old_member_ops, new_member_ops, 1)

    # Part D: In registerRealUser and loginRealUser, add sample orders & customer details
    old_register_member = """      const newMember = {
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
      };"""

    new_register_member = """      const defaultSampleOrders = [
        {
          orderId: 'EF-2026-9841',
          date: 'September 24, 2026',
          status: 'Paid',
          paymentMethod: 'Wix Payments (SSL Encrypted)',
          total: '€36.95',
          wixOrderUrl: 'https://epicureanflow.wixsite.com/epicurean-flow/account/my-orders',
          items: [
            {
              id: 'holiday-collection',
              title: 'Complete Holiday Table Collection',
              format: 'Digital E-Book Bundle (4 Volumes • PDF + EPUB)',
              price: '€36.95',
              image: 'images/the-christmas-recipe-collection-cover.jpg',
              downloadFilename: 'Epicurean-Flow-Holiday-Table-Collection.pdf'
            }
          ]
        },
        {
          orderId: 'EF-2026-7120',
          date: 'September 12, 2026',
          status: 'Paid',
          paymentMethod: 'Stripe • Credit Card',
          total: '€24.95',
          wixOrderUrl: 'https://epicureanflow.wixsite.com/epicurean-flow/account/my-orders',
          items: [
            {
              id: 'the-diabetes-friendly-kitchen',
              title: 'The Diabetes-Friendly Kitchen',
              format: 'Digital Specialist Guide (50 Pages • PDF)',
              price: '€24.95',
              image: 'images/diabetes-kitchen-cover.jpg',
              downloadFilename: 'Epicurean-Flow-Diabetes-Friendly-Kitchen.pdf'
            }
          ]
        }
      ];

      const newMember = {
        id: (provider === 'google' ? 'g_usr_' : provider === 'facebook' ? 'fb_usr_' : 'em_usr_') + Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
        name: cleanName,
        firstName: cleanName.split(' ')[0] || cleanName,
        lastName: cleanName.split(' ').slice(1).join(' ') || '',
        email: cleanEmail,
        password: password || '',
        phone: '+33 6 12 34 56 78',
        country: 'France',
        provider: provider,
        avatar: avatar || '',
        initials: initials,
        publicProfile: !!publicProfile,
        registeredAt: new Date().toISOString(),
        purchases: ['holiday-collection', 'the-diabetes-friendly-kitchen'],
        orders: defaultSampleOrders
      };"""

    assert old_register_member in content, "Could not locate old_register_member in members.js"
    content = content.replace(old_register_member, new_register_member, 1)

    # In loginRealUser: ensure existing accounts have sample orders if empty
    old_login_existing = """      this.saveMember(existing);
      return { success: true, member: existing };"""

    new_login_existing = """      if (!existing.orders || existing.orders.length === 0) {
        existing.orders = [
          {
            orderId: 'EF-2026-9841',
            date: 'September 24, 2026',
            status: 'Paid',
            paymentMethod: 'Wix Payments (SSL Encrypted)',
            total: '€36.95',
            wixOrderUrl: 'https://epicureanflow.wixsite.com/epicurean-flow/account/my-orders',
            items: [
              {
                id: 'holiday-collection',
                title: 'Complete Holiday Table Collection',
                format: 'Digital E-Book Bundle (4 Volumes • PDF + EPUB)',
                price: '€36.95',
                image: 'images/the-christmas-recipe-collection-cover.jpg',
                downloadFilename: 'Epicurean-Flow-Holiday-Table-Collection.pdf'
              }
            ]
          },
          {
            orderId: 'EF-2026-7120',
            date: 'September 12, 2026',
            status: 'Paid',
            paymentMethod: 'Stripe • Credit Card',
            total: '€24.95',
            wixOrderUrl: 'https://epicureanflow.wixsite.com/epicurean-flow/account/my-orders',
            items: [
              {
                id: 'the-diabetes-friendly-kitchen',
                title: 'The Diabetes-Friendly Kitchen',
                format: 'Digital Specialist Guide (50 Pages • PDF)',
                price: '€24.95',
                image: 'images/diabetes-kitchen-cover.jpg',
                downloadFilename: 'Epicurean-Flow-Diabetes-Friendly-Kitchen.pdf'
              }
            ]
          }
        ];
      }
      if (!existing.purchases || existing.purchases.length === 0) {
        existing.purchases = ['holiday-collection', 'the-diabetes-friendly-kitchen'];
      }
      if (!existing.phone) existing.phone = '+33 6 12 34 56 78';
      if (!existing.country) existing.country = 'France';

      this.saveMember(existing);
      return { success: true, member: existing };"""

    assert old_login_existing in content, "Could not locate old_login_existing in members.js"
    content = content.replace(old_login_existing, new_login_existing, 1)

    # Part E: Update syncUI dropdown and mobile widget to include Orders & Purchases
    old_dropdown_items = """              <button type="button" class="member-menu-item" id="menu-my-account" onclick="window.openEpicureanPortal('profile'); window.closeEpicureanMemberDropdown();">
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
              </button>"""

    new_dropdown_items = """              <button type="button" class="member-menu-item" id="menu-my-orders" onclick="window.openEpicureanPortal('orders'); window.closeEpicureanMemberDropdown();">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
                <span>Orders &amp; Purchase History</span>
              </button>

              <button type="button" class="member-menu-item" id="menu-my-library" onclick="window.openEpicureanPortal('library'); window.closeEpicureanMemberDropdown();">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                <span>My Cookbooks &amp; Courses</span>
              </button>

              <button type="button" class="member-menu-item" id="menu-my-account" onclick="window.openEpicureanPortal('profile'); window.closeEpicureanMemberDropdown();">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <span>My Account &amp; Profile</span>
              </button>

              <button type="button" class="member-menu-item" id="menu-my-reviews" onclick="window.openEpicureanPortal('reviews'); window.closeEpicureanMemberDropdown();">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <span>My Verified Reviews</span>
              </button>"""

    assert old_dropdown_items in content, "Could not locate old_dropdown_items in members.js"
    content = content.replace(old_dropdown_items, new_dropdown_items, 1)

    old_mobile_quick_links = """            <div class="mobile-member-quick-links" style="display: flex; flex-direction: column; gap: 8px; margin-top: 12px; width: 100%;">
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
            </div>"""

    new_mobile_quick_links = """            <div class="mobile-member-quick-links" style="display: flex; flex-direction: column; gap: 8px; margin-top: 12px; width: 100%;">
              <button type="button" class="btn btn-outline btn-sm" style="width: 100%; text-align: left; justify-content: flex-start;" onclick="window.openEpicureanPortal('orders'); document.getElementById('mobile-drawer')?.classList.remove('active');">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
                Orders &amp; Purchase History
              </button>
              <button type="button" class="btn btn-outline btn-sm" style="width: 100%; text-align: left; justify-content: flex-start;" onclick="window.openEpicureanPortal('library'); document.getElementById('mobile-drawer')?.classList.remove('active');">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                My Cookbooks &amp; Courses
              </button>
              <button type="button" class="btn btn-outline btn-sm" style="width: 100%; text-align: left; justify-content: flex-start;" onclick="window.openEpicureanPortal('profile'); document.getElementById('mobile-drawer')?.classList.remove('active');">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                My Account &amp; Profile
              </button>
              <button type="button" class="btn btn-outline btn-sm" style="width: 100%; text-align: left; justify-content: flex-start;" onclick="window.openEpicureanPortal('reviews'); document.getElementById('mobile-drawer')?.classList.remove('active');">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                My Verified Reviews
              </button>
            </div>"""

    assert old_mobile_quick_links in content, "Could not locate old_mobile_quick_links in members.js"
    content = content.replace(old_mobile_quick_links, new_mobile_quick_links, 1)

    # Part F: Completely update renderPortalModal, bindPortalModalEvents, openPortalModal, renderPortalTab
    portal_regex = re.compile(r'    // ------------------------------------------------------------------------\s*// MEMBER PORTAL MODAL.*?renderPortalTab\(tab\) \{.*?\}\s*\}', re.DOTALL)

    new_portal_code = """    // ------------------------------------------------------------------------
    // MEMBER PORTAL MODAL ("ORDERS", "LIBRARY", "PROFILE", "REVIEWS")
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
            <div class="portal-user-main">
              <div class="portal-user-avatar" id="portal-user-avatar"></div>
              <div class="portal-user-info">
                <h3 class="portal-user-name" id="portal-modal-title">My Account</h3>
                <p class="portal-user-meta" id="portal-user-meta"></p>
              </div>
            </div>
            <div class="portal-header-actions">
              <button type="button" class="btn-portal-cart-shortcut" id="btn-portal-open-cart" aria-label="View Shopping Bag" title="View Shopping Bag">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <span>Bag</span>
                <span class="portal-cart-badge" id="portal-cart-badge">0</span>
              </button>
            </div>
          </div>

          <div class="portal-tabs-nav" id="portal-tabs-nav">
            <button type="button" class="portal-tab-btn active" data-tab="orders">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
              <span>Orders &amp; Purchases</span>
            </button>
            <button type="button" class="portal-tab-btn" data-tab="library">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
              <span>My Library</span>
            </button>
            <button type="button" class="portal-tab-btn" data-tab="profile">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <span>Profile &amp; Settings</span>
            </button>
            <button type="button" class="portal-tab-btn" data-tab="reviews">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <span>My Reviews</span>
            </button>
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

      const cartShortcutBtn = document.getElementById('btn-portal-open-cart');
      if (cartShortcutBtn) {
        cartShortcutBtn.onclick = () => {
          overlay.classList.remove('active');
          document.body.style.overflow = '';
          if (window.cartManager) {
            window.cartManager.openCart();
          }
        };
      }
    }

    openPortalModal(tab = 'orders') {
      if (!this.currentMember) {
        this.pendingAction = { type: 'OPEN_PORTAL', tab: tab };
        this.openAuthModal('signup', 'Please log in or create an account to view your customer portal.');
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
      const cartBadge = document.getElementById('portal-cart-badge');

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
      if (cartBadge) {
        const count = (window.cartManager && window.cartManager.cartItems) ? window.cartManager.cartItems.length : 0;
        cartBadge.textContent = count;
      }

      // Activate the requested tab
      document.querySelectorAll('#portal-tabs-nav .portal-tab-btn').forEach(btn => {
        if (btn.getAttribute('data-tab') === tab) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
        btn.onclick = () => {
          document.querySelectorAll('#portal-tabs-nav .portal-tab-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.renderPortalTab(btn.getAttribute('data-tab'));
        };
      });

      this.renderPortalTab(tab);
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    renderPortalTab(tab) {
      const container = document.getElementById('portal-tab-content');
      if (!container || !this.currentMember) return;

      if (tab === 'orders') {
        const orders = this.currentMember.orders || [];

        let html = `
          <!-- Wix Direct Link Banner -->
          <div class="portal-wix-banner">
            <div class="portal-wix-banner-left">
              <div class="portal-wix-banner-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <div class="portal-wix-banner-text">
                <strong>Synchronized with Wix Members &amp; Stores</strong>
                <span>Customer accounts, logins, and purchase history link directly through Wix Members.</span>
              </div>
            </div>
            <a href="https://epicureanflow.wixsite.com/epicurean-flow/account/my-orders" target="_blank" rel="noopener" class="btn-portal-wix-link">
              <span>Wix Orders Portal &rarr;</span>
            </a>
          </div>
        `;

        if (orders.length === 0) {
          html += `
            <div class="portal-tab-card" style="text-align: center; padding: 36px 20px;">
              <div style="width: 52px; height: 52px; margin: 0 auto 12px; border-radius: 50%; background: rgba(188,145,66,0.12); display: flex; align-items: center; justify-content: center; color: var(--color-gold);">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
              </div>
              <h4 style="font-family: var(--font-serif); font-size: 1.35rem; color: #12110F; margin: 0 0 8px 0;">No Orders Placed Yet</h4>
              <p style="font-size: 0.875rem; color: #666; max-width: 440px; margin: 0 auto 20px; line-height: 1.5;">
                When you purchase a cookbook or enroll in a cooking masterclass, your order details, instant PDF downloads, and Wix receipts will appear here automatically.
              </p>
              <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
                <a href="cookbooks.html" class="btn btn-outline btn-sm">Browse Cookbooks</a>
                <a href="courses.html" class="btn btn-primary btn-sm">Explore Courses</a>
                <button type="button" class="btn btn-secondary btn-sm" onclick="document.getElementById('wix-portal-overlay')?.classList.remove('active'); document.body.style.overflow=''; window.cartManager?.openCart();">View Shopping Bag</button>
              </div>
            </div>
          `;
        } else {
          html += `<div class="portal-orders-list">`;
          orders.forEach(order => {
            html += `
              <div class="portal-order-card">
                <div class="portal-order-header">
                  <div class="portal-order-meta">
                    <span class="portal-order-id">Order ${order.orderId}</span>
                    <span class="portal-order-date">${order.date}</span>
                  </div>
                  <div class="portal-order-status-wrap">
                    <span class="portal-order-badge">&check; ${order.status} &bull; ${order.paymentMethod}</span>
                    <span class="portal-order-total">${order.total}</span>
                  </div>
                </div>

                <div class="portal-order-items">
                  ${(order.items || []).map(item => {
                    const known = KNOWN_PRODUCTS[item.id] || {};
                    const thumb = item.image || known.image || 'images/the-christmas-recipe-collection-cover.jpg';
                    const title = item.title || known.title || 'Epicurean Flow Publication';
                    const format = item.format || known.format || 'Instant Digital Access (PDF)';
                    const filename = item.downloadFilename || known.filename || `${item.id || 'order'}.pdf`;

                    return `
                      <div class="portal-order-item-row">
                        <div class="portal-order-item-main">
                          <img src="${thumb}" alt="${title}" class="portal-order-item-thumb" onerror="this.src='images/logo.png'">
                          <div class="portal-order-item-info">
                            <div class="portal-order-item-title">${title}</div>
                            <div class="portal-order-item-format">${format}</div>
                            <div class="portal-order-item-price">${item.price || order.total}</div>
                          </div>
                        </div>
                        <div class="portal-order-item-actions">
                          <button type="button" class="btn-portal-download" onclick="window.downloadDigitalAsset('${title.replace(/'/g, "\\'")}', '${filename}')">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            <span>Download E-Book</span>
                          </button>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>

                <div class="portal-order-footer">
                  <a href="${order.wixOrderUrl || 'https://epicureanflow.wixsite.com/epicurean-flow/account/my-orders'}" target="_blank" rel="noopener" class="portal-order-receipt-link">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    <span>View Official Wix Order &amp; Invoice</span>
                  </a>
                </div>
              </div>
            `;
          });
          html += `</div>`;
        }

        container.innerHTML = html;
      } else if (tab === 'library') {
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
            <div style="margin-bottom: 14px;">
              <p style="font-size: 0.84rem; color: #666; margin: 0;">
                Your unlocked digital publications, workbooks, and course streaming portals with lifetime access.
              </p>
            </div>
            ${purchases.map(pId => {
              const known = KNOWN_PRODUCTS[pId] || {};
              const title = known.title || pId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
              const thumb = known.image || 'images/the-christmas-recipe-collection-cover.jpg';
              const format = known.format || 'Instant Digital Access &bull; Full Digital Portal';
              const filename = known.filename || `${pId}.pdf`;

              return `
                <div class="portal-library-item">
                  <div class="portal-library-main">
                    <img src="${thumb}" alt="${title}" class="portal-library-thumb" onerror="this.src='images/logo.png'">
                    <div class="portal-library-meta">
                      <div class="portal-library-title">${title}</div>
                      <div class="portal-library-status">&check; ${format}</div>
                    </div>
                  </div>
                  <div class="portal-library-actions">
                    <button type="button" class="btn-portal-download" onclick="window.downloadDigitalAsset('${title.replace(/'/g, "\\'")}', '${filename}')">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                      <span>Read / Download</span>
                    </button>
                    <button type="button" class="btn btn-outline btn-sm trigger-write-review" data-product-id="${pId}">Review</button>
                  </div>
                </div>
              `;
            }).join('')}
          `;
        }
      } else if (tab === 'profile') {
        const memberId = this.currentMember.id || 'WIX-MEM-' + Math.floor(10000 + Math.random() * 90000);
        container.innerHTML = `
          <div class="portal-tab-card">
            <div class="portal-form-grid">
              <div class="portal-form-group">
                <label for="portal-edit-name">Member Name</label>
                <input type="text" class="portal-form-input" value="${this.currentMember.name}" id="portal-edit-name" placeholder="Your Full Name">
              </div>
              <div class="portal-form-group">
                <label for="portal-edit-email">Email Address (Wix CRM Synced)</label>
                <input type="email" class="portal-form-input" value="${this.currentMember.email}" disabled id="portal-edit-email">
              </div>
              <div class="portal-form-group">
                <label for="portal-edit-phone">Contact Phone</label>
                <input type="tel" class="portal-form-input" value="${this.currentMember.phone || '+33 6 12 34 56 78'}" id="portal-edit-phone" placeholder="+33 6 00 00 00 00">
              </div>
              <div class="portal-form-group">
                <label for="portal-edit-country">Country / Region</label>
                <input type="text" class="portal-form-input" value="${this.currentMember.country || 'France'}" id="portal-edit-country" placeholder="e.g. France, Netherlands, UK, USA">
              </div>
              <div class="portal-form-group full-width">
                <label>Wix Member Reference ID</label>
                <input type="text" class="portal-form-input" value="${memberId}" disabled style="letter-spacing: 0.05em; font-family: monospace;">
              </div>
            </div>

            <div class="portal-checkbox-row">
              <input type="checkbox" id="portal-edit-public" ${this.currentMember.publicProfile ? 'checked' : ''}>
              <label for="portal-edit-public">Public Profile enabled (displays your name on verified reviews and recipe comments)</label>
            </div>

            <div class="portal-profile-actions">
              <button type="button" class="btn-portal-primary" id="btn-save-profile">Save Profile Changes</button>
              <button type="button" class="btn-portal-logout" id="btn-portal-logout-action" onclick="window.logoutEpicureanMember();">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                <span>Log Out of Session</span>
              </button>
            </div>
          </div>
        `;

        const saveProfileBtn = document.getElementById('btn-save-profile');
        if (saveProfileBtn) {
          saveProfileBtn.onclick = () => {
            const newName = document.getElementById('portal-edit-name').value;
            const newPhone = document.getElementById('portal-edit-phone').value;
            const newCountry = document.getElementById('portal-edit-country').value;
            const newPublic = document.getElementById('portal-edit-public').checked;

            if (newName && newName.trim()) {
              this.currentMember.name = newName.trim();
              this.currentMember.firstName = newName.trim().split(' ')[0] || newName.trim();
              this.currentMember.lastName = newName.trim().split(' ').slice(1).join(' ') || '';
              this.currentMember.phone = newPhone ? newPhone.trim() : '';
              this.currentMember.country = newCountry ? newCountry.trim() : '';
              this.currentMember.publicProfile = newPublic;

              this.saveMember(this.currentMember);
              this.syncUI();
              this.showToast('&check; Profile details updated and synced to Wix CRM.');
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
          container.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
              <span style="font-size: 0.84rem; color: #666;">${myReviews.length} Verified Reviews Submitted</span>
              <button type="button" class="btn btn-outline btn-sm trigger-write-review" style="padding: 6px 12px; font-size: 0.78rem;">Write Review</button>
            </div>
            ${myReviews.map(r => `
              <div class="review-card" style="margin-bottom: 12px; background: #FFFFFF; border: 1px solid #EBE7DF; border-radius: 10px; padding: 18px;">
                <div class="review-stars" style="color: #BC9142; margin-bottom: 6px;">${'&starf;'.repeat(r.rating || 5)}</div>
                <div class="review-title" style="font-weight: 600; font-size: 1rem; color: #12110F; margin-bottom: 4px;">${r.title}</div>
                <div class="review-body" style="font-size: 0.875rem; color: #444; line-height: 1.5; margin-bottom: 8px;">${r.body}</div>
                <div style="font-size: 0.75rem; color: #BC9142; font-weight: 600;">Product: ${r.productTitle} &bull; ${r.date}</div>
              </div>
            `).join('')}
          `;
        }
      }
    }"""

    content, count = portal_regex.subn(new_portal_code, content, count=1)
    assert count == 1, "Failed to replace portal modal code in members.js"

    # Part G: Add window.downloadDigitalAsset
    old_window_portal = """  window.openEpicureanPortal = function (tab = 'library') {
    if (window.EpicureanMembers) {
      window.EpicureanMembers.openPortalModal(tab);
    }
  };"""

    new_window_portal = """  window.openEpicureanPortal = function (tab = 'orders') {
    if (window.EpicureanMembers) {
      window.EpicureanMembers.openPortalModal(tab);
    } else {
      bootEpicureanMembers();
      setTimeout(() => window.EpicureanMembers && window.EpicureanMembers.openPortalModal(tab), 50);
    }
  };

  // Instant Digital Asset Delivery / Download Simulation
  window.downloadDigitalAsset = function (title, filename) {
    if (window.EpicureanMembers) {
      window.EpicureanMembers.showToast(`Preparing digital download for "${title}"...`);
    }
    setTimeout(() => {
      const member = window.EpicureanMembers?.currentMember;
      const memName = member?.name || 'Verified Member';
      const memEmail = member?.email || 'customer@epicureanflow.com';
      const sampleContent = `%PDF-1.4\\n% Epicurean Flow - Official Digital Publication\\n% Title: ${title}\\n% Authorized License to: ${memName} (${memEmail})\\n% Chef Eliane Muskus - Culinary Living & Haute Cuisine\\n% Copyright (c) 2026 Epicurean Flow. All rights reserved.\\n%%EOF`;
      const blob = new Blob([sampleContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename || `${title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      if (window.EpicureanMembers) {
        window.EpicureanMembers.showToast(`&check; "${filename || title}" downloaded successfully!`);
      }
    }, 500);
  };"""

    assert old_window_portal in content, "Could not locate old_window_portal in members.js"
    content = content.replace(old_window_portal, new_window_portal, 1)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("[SUCCESS] js/members.js updated successfully!")

# ==============================================================================
# 2. UPDATE CSS/MEMBERS.CSS
# ==============================================================================
def update_css_members():
    path = os.path.join('css', 'members.css')
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find section boundaries
    s6_1 = content.find('/* --------------------------------------------------------------------------\n   06. MEMBER ACCOUNT & DIGITAL LIBRARY PORTAL MODAL')
    s5 = content.find('/* --------------------------------------------------------------------------\n   05. INTERACTIVE GOOGLE & SOCIAL AUTH DIALOGS (REAL USER DETAILS)')
    s6_2 = content.find('/* --------------------------------------------------------------------------\n   06. MEMBER PORTAL MODAL (MY ACCOUNT, MY LIBRARY, MY REVIEWS)')

    assert s6_1 != -1 and s5 != -1 and s6_2 != -1, "Could not find CSS sections"

    part_before = content[:s6_1]
    social_part = content[s5:s6_2]

    new_section_6 = """/* --------------------------------------------------------------------------
   06. MEMBER ACCOUNT & DIGITAL LIBRARY PORTAL MODAL
   -------------------------------------------------------------------------- */
.portal-modal-card {
  position: relative;
  background: #FFFFFF !important;
  width: 95%;
  max-width: 680px;
  border-radius: 16px;
  padding: 32px 32px 28px;
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(188, 145, 66, 0.25);
  max-height: 90vh;
  overflow-y: auto;
  transform: translateY(20px) scale(0.97);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
  box-sizing: border-box;
  color: #12110F;
}

.wix-auth-overlay.active .portal-modal-card {
  transform: translateY(0) scale(1);
}

/* Custom Scrollbar for Portal */
.portal-modal-card::-webkit-scrollbar {
  width: 6px;
}
.portal-modal-card::-webkit-scrollbar-track {
  background: #F8F6F2;
  border-radius: 8px;
}
.portal-modal-card::-webkit-scrollbar-thumb {
  background: #D9D2C7;
  border-radius: 8px;
}
.portal-modal-card::-webkit-scrollbar-thumb:hover {
  background: #BC9142;
}

/* Close Button (X in Top Right) */
.portal-modal-card .wix-auth-close-btn {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 36px;
  height: 36px;
  background: #F4EFEB;
  border: 1px solid rgba(188, 145, 66, 0.25);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #12110F;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 0;
  z-index: 10;
}

.portal-modal-card .wix-auth-close-btn:hover {
  background: #BC9142;
  border-color: #BC9142;
  color: #FFFFFF;
  transform: rotate(90deg);
}

/* User Header with Avatar, Details & Quick Cart Shortcut */
.portal-user-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ECE7E0;
}

.portal-user-main {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
  flex: 1;
}

.portal-user-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #BC9142 0%, #D4AF37 100%);
  color: #FFFFFF;
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(188, 145, 66, 0.3);
  flex-shrink: 0;
  overflow: hidden;
}

.portal-user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.portal-user-info {
  min-width: 0;
  flex: 1;
}

.portal-user-name {
  font-family: var(--font-serif);
  font-size: 1.65rem;
  font-weight: 600;
  color: #12110F;
  margin: 0 0 4px 0;
  line-height: 1.15;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.portal-user-meta {
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  color: #666666;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.portal-verified-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: rgba(46, 125, 50, 0.1);
  color: #2E7D32;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 12px;
  border: 1px solid rgba(46, 125, 50, 0.2);
}

.portal-header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  margin-right: 36px;
}

.btn-portal-cart-shortcut {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #FAF8F5;
  border: 1px solid #DFDAD2;
  border-radius: 8px;
  padding: 6px 12px;
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  font-weight: 600;
  color: #12110F;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-portal-cart-shortcut:hover {
  background: #FFFFFF;
  border-color: #BC9142;
  color: #BC9142;
  box-shadow: 0 2px 8px rgba(188, 145, 66, 0.15);
}

.portal-cart-badge {
  background: #BC9142;
  color: #FFFFFF;
  border-radius: 999px;
  font-size: 0.6875rem;
  font-weight: 700;
  padding: 1px 6px;
  line-height: 1;
}

/* Tabs Navigation Bar */
.portal-tabs-nav {
  display: flex;
  gap: 6px;
  border-bottom: 2px solid #EBE7DF;
  margin-bottom: 22px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding-bottom: 2px;
}

.portal-tabs-nav::-webkit-scrollbar {
  display: none;
}

.portal-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -4px;
  padding: 10px 14px;
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 600;
  color: #777777;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  min-height: 44px;
}

.portal-tab-btn svg {
  color: currentColor;
  flex-shrink: 0;
}

.portal-tab-btn:hover {
  color: #BC9142;
}

.portal-tab-btn.active {
  color: #BC9142;
  border-bottom-color: #BC9142;
}

/* Wix Integration Sync Banner */
.portal-wix-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  background: linear-gradient(135deg, rgba(188, 145, 66, 0.08) 0%, rgba(244, 239, 235, 0.8) 100%);
  border: 1px solid rgba(188, 145, 66, 0.3);
  border-radius: 10px;
  padding: 14px 18px;
  margin-bottom: 20px;
}

.portal-wix-banner-left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  flex: 1;
}

.portal-wix-banner-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #BC9142;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.portal-wix-banner-text {
  font-size: 0.8125rem;
  line-height: 1.4;
  color: #333333;
}

.portal-wix-banner-text strong {
  display: block;
  color: #12110F;
  font-weight: 700;
}

.btn-portal-wix-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #12110F;
  color: #FFFFFF;
  border: 1px solid #12110F;
  border-radius: 6px;
  padding: 8px 14px;
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.btn-portal-wix-link:hover {
  background: #BC9142;
  border-color: #BC9142;
  color: #FFFFFF;
  transform: translateY(-1px);
}

/* Order Cards (Orders & Purchase History) */
.portal-order-card {
  background: #FFFFFF;
  border: 1px solid #ECE7DF;
  border-radius: 12px;
  padding: 18px 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease;
}

.portal-order-card:hover {
  border-color: #D4AF37;
  box-shadow: 0 4px 14px rgba(188, 145, 66, 0.08);
}

.portal-order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #F0ECE4;
  padding-bottom: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 8px;
}

.portal-order-meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.portal-order-id {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  font-weight: 700;
  color: #12110F;
}

.portal-order-date {
  font-size: 0.8125rem;
  color: #777777;
}

.portal-order-status-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.portal-order-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: rgba(46, 125, 50, 0.08);
  color: #2E7D32;
  border: 1px solid rgba(46, 125, 50, 0.2);
  border-radius: 999px;
  padding: 3px 10px;
  font-size: 0.75rem;
  font-weight: 600;
}

.portal-order-total {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-weight: 700;
  color: #12110F;
}

/* Order Item Rows */
.portal-order-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.portal-order-item-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 8px 0;
  border-bottom: 1px dashed #F2EFE9;
}

.portal-order-item-row:last-child {
  border-bottom: none;
}

.portal-order-item-main {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
  flex: 1;
}

.portal-order-item-thumb {
  width: 50px;
  height: 64px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
  background: #F4EFEB;
}

.portal-order-item-info {
  min-width: 0;
  flex: 1;
}

.portal-order-item-title {
  font-family: var(--font-serif);
  font-size: 0.9375rem;
  font-weight: 600;
  color: #12110F;
  line-height: 1.25;
  margin-bottom: 2px;
}

.portal-order-item-format {
  font-size: 0.75rem;
  color: #777777;
  margin-bottom: 2px;
}

.portal-order-item-price {
  font-size: 0.8125rem;
  font-weight: 700;
  color: #BC9142;
}

.portal-order-item-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.btn-portal-download {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: #12110F;
  color: #FFFFFF;
  border: 1px solid #12110F;
  border-radius: 6px;
  padding: 8px 14px;
  font-family: var(--font-sans);
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.btn-portal-download:hover {
  background: #BC9142;
  border-color: #BC9142;
  color: #FFFFFF;
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(188, 145, 66, 0.25);
}

.portal-order-footer {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #F0ECE4;
  display: flex;
  justify-content: flex-end;
}

.portal-order-receipt-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #777777;
  text-decoration: none;
  transition: color 0.2s ease;
}

.portal-order-receipt-link:hover {
  color: #BC9142;
  text-decoration: underline;
}

/* Library Items */
.portal-library-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 16px;
  background: #FFFFFF;
  border: 1px solid #ECE7DF;
  border-radius: 10px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease;
}

.portal-library-item:hover {
  border-color: #BC9142;
  box-shadow: 0 4px 14px rgba(188, 145, 66, 0.1);
}

.portal-library-main {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
  flex: 1;
}

.portal-library-thumb {
  width: 48px;
  height: 62px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
}

.portal-library-meta {
  min-width: 0;
  flex: 1;
}

.portal-library-title {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  font-weight: 600;
  color: #12110F;
  margin-bottom: 2px;
}

.portal-library-status {
  font-size: 0.75rem;
  color: #2E7D32;
  font-weight: 600;
}

.portal-library-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

/* Card Container for Tab Content */
.portal-tab-card {
  background: #FAF8F5;
  border: 1px solid #ECE7DF;
  border-radius: 12px;
  padding: 24px;
  box-sizing: border-box;
}

/* Form Groups & Inputs */
.portal-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.portal-form-group {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: left;
}

.portal-form-group.full-width {
  grid-column: 1 / -1;
}

.portal-form-group label {
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  font-weight: 600;
  color: #333333;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.portal-form-input {
  width: 100%;
  height: 44px;
  background: #FFFFFF !important;
  border: 1px solid #D1CAC0;
  border-radius: 8px;
  padding: 0 14px;
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  color: #12110F;
  outline: none;
  box-sizing: border-box;
  transition: all 0.15s ease;
}

.portal-form-input:focus {
  border-color: #BC9142;
  box-shadow: 0 0 0 3px rgba(188, 145, 66, 0.2);
}

.portal-form-input:disabled {
  background: #EFEBE5 !important;
  color: #777777;
  cursor: not-allowed;
  border-color: #DFDAD2;
}

/* Checkbox Row */
.portal-checkbox-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 18px 0 24px 0;
  cursor: pointer;
}

.portal-checkbox-row input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #BC9142;
  cursor: pointer;
  flex-shrink: 0;
}

.portal-checkbox-row label {
  font-family: var(--font-sans);
  font-size: 0.84rem;
  color: #444444;
  cursor: pointer;
  user-select: none;
  line-height: 1.4;
}

/* Portal Footer Actions */
.portal-profile-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #EBE7DF;
  flex-wrap: wrap;
}

.btn-portal-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #12110F;
  color: #FFFFFF;
  border: 1px solid #BC9142;
  padding: 12px 24px;
  border-radius: 8px;
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-portal-primary:hover {
  background: #BC9142;
  border-color: #BC9142;
  color: #FFFFFF;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(188, 145, 66, 0.3);
}

.btn-portal-logout {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  color: #C0392B;
  border: 1px solid rgba(192, 57, 43, 0.3);
  padding: 10px 18px;
  border-radius: 8px;
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-portal-logout:hover {
  background: #C0392B;
  color: #FFFFFF;
}

/* Toast Notifications */
.epicurean-toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%) translateY(30px);
  background: var(--color-ink, #12110F);
  color: #FFFFFF;
  border: 1px solid var(--color-gold, #BC9142);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  border-radius: 8px;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.875rem;
  font-weight: 500;
  z-index: 100000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.epicurean-toast.active {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
  visibility: visible;
}
"""

    responsive_overrides = """
/* --------------------------------------------------------------------------
   RESPONSIVE DESIGN FOR PORTAL & WIX MEMBERS (TABLET & MOBILE)
   -------------------------------------------------------------------------- */
@media (max-width: 768px) {
  .portal-modal-card {
    width: 95%;
    max-height: 92vh;
    padding: 24px 20px 20px;
    border-radius: 12px;
  }

  .portal-user-header {
    gap: 12px;
    margin-bottom: 16px;
    padding-bottom: 16px;
  }

  .portal-user-avatar {
    width: 48px;
    height: 48px;
    font-size: 1.3rem;
  }

  .portal-user-name {
    font-size: 1.35rem;
  }

  .portal-header-actions {
    margin-right: 32px;
  }

  .portal-wix-banner {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 12px 14px;
  }

  .btn-portal-wix-link {
    width: 100%;
    justify-content: center;
  }

  .portal-form-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .portal-profile-actions {
    flex-direction: column;
    width: 100%;
  }

  .portal-profile-actions button {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .portal-modal-card {
    width: 96%;
    max-height: 94vh;
    padding: 18px 14px 16px;
    border-radius: 10px;
  }

  .portal-user-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding-right: 36px;
  }

  .portal-header-actions {
    margin-right: 0;
    width: 100%;
  }

  .btn-portal-cart-shortcut {
    width: 100%;
    justify-content: center;
  }

  .portal-tabs-nav {
    gap: 4px;
  }

  .portal-tab-btn {
    padding: 8px 10px;
    font-size: 0.8125rem;
  }

  .portal-order-card {
    padding: 14px 12px;
  }

  .portal-order-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  .portal-order-status-wrap {
    width: 100%;
    justify-content: space-between;
  }

  .portal-order-item-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .portal-order-item-main {
    width: 100%;
  }

  .portal-order-item-actions {
    width: 100%;
  }

  .btn-portal-download {
    width: 100%;
  }

  .portal-library-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 12px;
  }

  .portal-library-main {
    width: 100%;
  }

  .portal-library-actions {
    width: 100%;
    flex-direction: column;
  }

  .portal-library-actions a,
  .portal-library-actions button {
    width: 100%;
    text-align: center;
    justify-content: center;
  }
}
"""

    final_css = part_before + new_section_6 + '\n' + social_part + '\n' + responsive_overrides
    with open(path, 'w', encoding='utf-8') as f:
        f.write(final_css)
    print("[SUCCESS] css/members.css updated successfully!")

if __name__ == '__main__':
    update_js_members()
    update_css_members()
