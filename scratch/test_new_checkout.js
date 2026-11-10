const { createClient, OAuthStrategy } = require('@wix/sdk');
const { products } = require('@wix/stores');
const { currentCart } = require('@wix/ecom');
const { redirects } = require('@wix/redirects');

async function testCheckout() {
  try {
    const client = createClient({
      modules: { products, currentCart, redirects },
      auth: OAuthStrategy({ clientId: '155465fa-5c5a-477d-969f-f0d098b3bcca' })
    });

    const tokens = await client.auth.generateVisitorTokens();
    client.auth.setTokens(tokens);

    // Get real product
    const res = await client.products.queryProducts().limit(1).find();
    const prod = res.items[0];
    console.log('Testing with product:', prod.name, 'ID:', prod._id);

    // Add to cart
    console.log('Adding product to currentCart...');
    const cartRes = await client.currentCart.addToCurrentCart({
      lineItems: [{
        catalogReference: {
          appId: '215238eb-22a5-4c36-9e7b-e7c08025e04e',
          catalogItemId: prod._id
        },
        quantity: 1
      }]
    });
    console.log('Cart subtotal:', cartRes.cart?.subtotal?.amount);

    // Create checkout
    console.log('Creating checkout from currentCart...');
    const checkout = await client.currentCart.createCheckoutFromCurrentCart({
      channelType: 'WEB'
    });
    console.log('Checkout created! Checkout ID:', checkout.checkoutId);

    // Create redirect session
    console.log('Generating redirect session URL...');
    const redirect = await client.redirects.createRedirectSession({
      ecomCheckout: { checkoutId: checkout.checkoutId },
      callbacks: {
        postFlowUrl: 'https://epicureanflow.wixsite.com/epicurean-flow',
        thankYouPageUrl: 'https://epicureanflow.wixsite.com/epicurean-flow'
      }
    });
    console.log('\n=============================================');
    console.log('REAL LIVE WIX CHECKOUT URL:');
    console.log(redirect.redirectSession?.fullUrl);
    console.log('=============================================\n');
  } catch(e) {
    console.error('Error during checkout test:', e);
  }
}

testCheckout();
