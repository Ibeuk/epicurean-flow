/**
 * ============================================================================
 * EPICUREAN FLOW — WIX VELO PAGE BRIDGE
 * ============================================================================
 * This snippet can be pasted into your Wix Studio or Wix Editor
 * Page Code (Velo) if you embed Epicurean Flow via an HTML Component ($w('#htmlComponent')).
 *
 * HOW IT WORKS:
 * 1. Queries your live Wix Store Products ("Stores/Products") collection.
 * 2. Transmits the real-time product list to the Epicurean Flow embedded page.
 * 3. Whenever Chef Eliane adds, edits, or deletes a product in the Wix Dashboard,
 *    the website immediately reflects the changes!
 * ============================================================================
 */

import wixData from 'wix-data';

$w.onReady(async function () {
  try {
    // Query active products from your Wix Store catalog
    const queryResults = await wixData.query('Stores/Products')
      .eq('visible', true)
      .limit(12)
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
  } catch (err) {
    console.error('[Epicurean Flow] Wix Stores sync note:', err);
  }
});
