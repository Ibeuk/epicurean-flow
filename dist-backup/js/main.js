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

  // FAQ Accordion Toggle
  const faqButtons = document.querySelectorAll('.faq-question-btn');
  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const parentItem = btn.closest('.faq-item');
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      
      // Optionally close other items
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== parentItem) {
          item.classList.remove('active');
          const otherBtn = item.querySelector('.faq-question-btn');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      if (isExpanded) {
        parentItem.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        parentItem.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Copy Coupon Code Handler
  const copyBtn = document.getElementById('copy-coupon-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const code = copyBtn.getAttribute('data-code') || 'FLOWS10';
      navigator.clipboard.writeText(code).then(() => {
        const origText = copyBtn.innerText;
        copyBtn.innerText = 'Copied!';
        setTimeout(() => {
          copyBtn.innerText = origText;
        }, 2500);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  }

  // Limited-Time Promo Countdown Timer
  const countdownEl = document.getElementById('promo-countdown');
  if (countdownEl) {
    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minutesEl = document.getElementById('countdown-minutes');
    const secondsEl = document.getElementById('countdown-seconds');

    // Storage key for persistent offer deadline
    const STORAGE_KEY = 'epicurean_offer_deadline_ts';
    // 3 days, 14 hours, 36 minutes default countdown cycle
    const DEFAULT_CYCLE_MS = (3 * 24 * 60 * 60 + 14 * 60 * 60 + 36 * 60) * 1000;

    let targetTime;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        targetTime = parseInt(stored, 10);
      }
    } catch (e) {
      console.warn('localStorage not accessible', e);
    }

    const now = Date.now();
    // If no deadline or already expired, set a new evergreen deadline
    if (!targetTime || targetTime <= now) {
      targetTime = now + DEFAULT_CYCLE_MS;
      try {
        localStorage.setItem(STORAGE_KEY, targetTime.toString());
      } catch (e) {}
    }

    let lastSec = -1;

    const updateCountdown = () => {
      const currentTime = Date.now();
      let diff = targetTime - currentTime;

      if (diff <= 0) {
        // Automatically renew evergreen cycle to avoid ever showing stale 00:00:00
        targetTime = Date.now() + (2 * 24 * 60 * 60 * 1000 + 18 * 60 * 60 * 1000);
        try {
          localStorage.setItem(STORAGE_KEY, targetTime.toString());
        } catch (e) {}
        diff = targetTime - Date.now();
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
      if (secondsEl) {
        secondsEl.textContent = String(seconds).padStart(2, '0');
        if (seconds !== lastSec) {
          lastSec = seconds;
          const secBox = secondsEl.closest('.countdown-unit-sec');
          if (secBox) {
            secBox.classList.remove('tick');
            void secBox.offsetWidth; // Force CSS reflow to re-trigger animation
            secBox.classList.add('tick');
          }
        }
      }
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }
});

