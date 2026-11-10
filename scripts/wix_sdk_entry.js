import { createClient, OAuthStrategy } from '@wix/sdk';
import { products } from '@wix/stores';
import { currentCart } from '@wix/ecom';
import { redirects } from '@wix/redirects';
import { posts } from '@wix/blog';

if (typeof window !== 'undefined') {
  window.WixHeadless = {
    createClient,
    OAuthStrategy,
    products,
    currentCart,
    redirects,
    posts
  };
}

export { createClient, OAuthStrategy, products, currentCart, redirects, posts };
