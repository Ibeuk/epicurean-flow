/**
 * ============================================================================
 * EPICUREAN FLOW — WIX VELO PAGE BRIDGE (Wix Studio & Wix Editor)
 * ============================================================================
 * Paste this snippet into your Wix Studio / Wix Editor Page Code (Velo).
 * It connects your live Wix Stores ("Stores/Products") database directly
 * to your custom Epicurean Flow frontend embed ($w('#htmlComponent')).
 *
 * HOW IT WORKS:
 * 1. Queries all active products from Wix Stores with collections included.
 * 2. Transmits the real products to Epicurean Flow via postMessage.
 * 3. Courses are automatically placed into the "Courses" section.
 * 4. Cookbooks are automatically placed into the "Cookbooks" section.
 * 5. Listens for cart checkout clicks to seamlessly navigate the parent
 *    Wix window to the secure checkout page (/cart-page).
 * ============================================================================
 */

import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(async function () {
  try {
    // 1. Query active products from your Wix Store catalog (including Collections)
    const queryResults = await wixData.query('Stores/Products')
      .eq('visible', true)
      .include('collections')
      .limit(50)
      .find();

    if (queryResults.items && queryResults.items.length > 0) {
      // Send the live products to your Epicurean Flow HTML embed component
      // (Replace '#htmlComponent' with the ID of your HTML element in Wix if different)
      $w('#htmlComponent').postMessage({
        type: 'SYNC_WIX_PRODUCTS',
        items: queryResults.items
      });
      console.log('[Epicurean Flow] Sent ' + queryResults.items.length + ' live Wix products to embed.');
    }

    // 2. Listen for checkout or cart navigation requests from the embed
    $w('#htmlComponent').onMessage((event) => {
      if (event.data && (event.data.type === 'NAVIGATE_CHECKOUT' || event.data.type === 'GO_TO_CART')) {
        console.log('[Epicurean Flow] Navigating parent window to secure Wix cart/checkout page');
        wixLocation.to('/cart-page');
      }
    });

  } catch (err) {
    console.error('[Epicurean Flow] Wix Stores sync note:', err);
  }
});
