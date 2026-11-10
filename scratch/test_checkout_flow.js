const { createClient, OAuthStrategy } = require('@wix/sdk');
const { products } = require('@wix/stores');
const { currentCart } = require('@wix/ecom');
const { redirects } = require('@wix/redirects');

async function testCheckout() {
  console.log('Testing Wix Headless Checkout Flow...');
  const client = createClient({
    modules: { products, currentCart, redirects },
    auth: OAuthStrategy({ clientId: '155465fa-5c5a-477d-969f-f0d098b3bcca' })
  });

  const tokens = await client.auth.generateVisitorTokens();
  client.auth.setTokens(tokens);

  try {
    await client.currentCart.deleteCurrentCart();
  } catch(e) {}

  // Add a product: "Chef Eliane’s New Diabetes Recipe Book" -> ID: 3c4c3872-5b66-a78e-0623-757992b4bf45
  console.log('Adding product to currentCart...');
  const addRes = await client.currentCart.addToCurrentCart({
    lineItems: [
      {
        catalogReference: {
          appId: '215238eb-22a5-4c36-9e7b-e7c08025e04e',
          catalogItemId: '3c4c3872-5b66-a78e-0623-757992b4bf45'
        },
        quantity: 1
      }
    ]
  });
  console.log('Cart subtotal:', addRes.cart.subtotal);

  console.log('Creating checkout from current cart...');
  const checkout = await client.currentCart.createCheckoutFromCurrentCart({
    channelType: 'WEB'
  });
  console.log('Checkout ID:', checkout.checkoutId);

  console.log('Creating redirect session...');
  const redirect = await client.redirects.createRedirectSession({
    ecomCheckout: { checkoutId: checkout.checkoutId },
    callbacks: {
      postFlowUrl: 'https://epicurean-flow-1-epicureanflow-100d.wix-site-host.com',
      thankYouPageUrl: 'https://epicurean-flow-1-epicureanflow-100d.wix-site-host.com'
    }
  });

  console.log('Full Redirect URL:', redirect.redirectSession?.fullUrl);
}

testCheckout().catch(err => {
  console.error('Checkout error:', err);
});
