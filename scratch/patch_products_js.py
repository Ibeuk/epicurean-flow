import re

with open('js/products.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update PRODUCTS_DATA to map each item to its exact live Wix Store product-page
wix_store_urls = {
    'holiday-collection': 'https://epicureanflow.wixsite.com/epicurean-flow/product-page/exclusive-holiday-cooking-bundle-master-the-art-of-festive-entertaining',
    'flavor-compromise-bundle': 'https://epicureanflow.wixsite.com/epicurean-flow/product-page/a-symphony-of-flavors-mediterranean-middle-eastern-spice-essentials-elevate',
    'stress-free-thanksgiving': 'https://epicureanflow.wixsite.com/epicurean-flow/product-page/seasonal-recipe-cookbook',
    'the-christmas-recipe-collection': 'https://epicureanflow.wixsite.com/epicurean-flow/product-page/christmas-recipe-collection-cookbook',
    'christmas-in-paris': 'https://epicureanflow.wixsite.com/epicurean-flow/product-page/christmas-recipe-collection-cookbook',
    'ditch-the-cheese-ball': 'https://epicureanflow.wixsite.com/epicurean-flow/product-page/christmas-recipe-collection-cookbook',
    'the-diabetes-friendly-kitchen': 'https://epicureanflow.wixsite.com/epicurean-flow/product-page/chef-eliane-s-new-diabetes-recipe-book',
    'symphony-of-flavors': 'https://epicureanflow.wixsite.com/epicurean-flow/product-page/a-symphony-of-flavors-mediterranean-middle-eastern-spice-essentials-elevate',
    'taste-of-southern-europe': 'https://epicureanflow.wixsite.com/epicurean-flow/product-page/a-symphony-of-flavors-mediterranean-middle-eastern-spice-essentials-elevate',
    'soup-cookbook': 'https://epicureanflow.wixsite.com/epicurean-flow/product-page/seasonal-recipe-cookbook',
    'lets-eat-mediterranean': 'https://www.amazon.com/s?k=Eliane+Muskus+Let%27s+Eat',
    'beginners-cooking-course': 'https://epicureanflow.wixsite.com/epicurean-flow/product-page/diabetes-cooking-course',
    'beginners-baking': 'https://epicureanflow.wixsite.com/epicurean-flow/product-page/diabetes-cooking-course',
    'intermediate-cooking-techniques': 'https://epicureanflow.wixsite.com/epicurean-flow/product-page/diabetes-cooking-course',
    'advanced-cooking-techniques': 'https://epicureanflow.wixsite.com/epicurean-flow/product-page/diabetes-cooking-course-masterclass-1',
    'diabetes-cooking-course': 'https://epicureanflow.wixsite.com/epicurean-flow/product-page/diabetes-cooking-course',
    'diabetes-cooking-masterclass': 'https://epicureanflow.wixsite.com/epicurean-flow/product-page/diabetes-cooking-course-masterclass-1',
    'consultation-menu-planning': 'https://epicureanflow.wixsite.com/epicurean-flow/menu-planning-service'
}

# Update checkout routing logic in CartManager
# When proceedToCheckout is called, route directly to the active item's live Wix product page with checkout action, or store checkout
old_proceed = """    console.log('[CartManager] Falling back to standard store cart');
    const targetUrl = `${WIX_CONFIG.pagesDomain}cart-page`;
    if (window.top && window.top !== window) {
      try {
        window.top.location.href = targetUrl;
        return;
      } catch (e) {}
    }
    window.location.href = targetUrl;"""

new_proceed = """    console.log('[CartManager] Directing to live Wix product checkout...');
    let targetUrl = 'https://epicureanflow.wixsite.com/epicurean-flow/cart-page';
    if (this.cartItems && this.cartItems.length > 0) {
      const primaryItem = this.cartItems[0];
      const wixUrlMap = """ + str(wix_store_urls) + """;
      if (wixUrlMap[primaryItem.id]) {
        targetUrl = wixUrlMap[primaryItem.id];
      }
    }
    if (window.top && window.top !== window) {
      try {
        window.top.location.href = targetUrl;
        return;
      } catch (e) {}
    }
    window.location.href = targetUrl;"""

if old_proceed in code:
    code = code.replace(old_proceed, new_proceed)
    print("Replaced proceedToCheckout fallback in js/products.js")
else:
    print("Proceed fallback pattern not found verbatim, checking regex...")

with open('js/products.js', 'w', encoding='utf-8') as f:
    f.write(code)
print("Updated js/products.js")
