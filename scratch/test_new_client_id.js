const { createClient, OAuthStrategy } = require('@wix/sdk');
const { products } = require('@wix/stores');
const { currentCart } = require('@wix/ecom');

async function testWixSDK() {
  try {
    const client = createClient({
      modules: { products, currentCart },
      auth: OAuthStrategy({ clientId: '155465fa-5c5a-477d-969f-f0d098b3bcca' })
    });

    console.log('Generating visitor tokens...');
    const tokens = await client.auth.generateVisitorTokens();
    client.auth.setTokens(tokens);
    console.log('Visitor tokens created successfully!');

    console.log('Querying products from real Epicurean Flow site...');
    const res = await client.products.queryProducts().limit(5).find();
    console.log('Products found:', res.items ? res.items.length : 0);
    if (res.items) {
      res.items.forEach(p => console.log(' -', p.name, 'Price:', p.price?.price));
    }
  } catch(e) {
    console.error('Error:', e);
  }
}

testWixSDK();
