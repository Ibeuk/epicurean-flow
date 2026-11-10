const { createClient, OAuthStrategy } = require('@wix/sdk');
const { products } = require('@wix/stores');

async function listAll() {
  const client = createClient({
    modules: { products },
    auth: OAuthStrategy({ clientId: '155465fa-5c5a-477d-969f-f0d098b3bcca' })
  });

  const tokens = await client.auth.generateVisitorTokens();
  client.auth.setTokens(tokens);

  const res = await client.products.queryProducts().limit(50).find();
  console.log('Total products on real Wix site:', res.items.length);
  const map = {};
  res.items.forEach(p => {
    console.log(`ID: "${p._id}" | Price: €${p.price?.price} | Slug: "${p.slug}" | Name: "${p.name}"`);
    map[p.slug] = { id: p._id, name: p.name, price: p.price?.price };
  });
  const fs = require('fs');
  fs.writeFileSync('scratch/real_wix_catalog.json', JSON.stringify(map, null, 2));
}

listAll();
