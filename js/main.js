/* ==========================================================================
   EPICUREAN FLOW - MAIN SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  console.log('Epicurean Flow Platform Initialized');

  // Newsletter Form Handler
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('.newsletter-input');
      if (emailInput && emailInput.value) {
        const btn = newsletterForm.querySelector('button');
        const originalText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<span>Subscribed!</span>';
        emailInput.value = '';
        
        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = originalText;
        }, 3000);
      }
    });
  }

  // Add event listeners to product buy buttons
  document.querySelectorAll('.btn-buy-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productId = btn.getAttribute('data-product-id');
      if (window.cartManager) {
        window.cartManager.addItem(productId);
      }
    });
  });
});
