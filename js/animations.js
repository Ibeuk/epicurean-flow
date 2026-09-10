/* ==========================================================================
   EPICUREAN FLOW - ANIMATIONS & REVEALS MODULE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js-ready');

  // Reveal elements already in or near viewport immediately
  const winHeight = window.innerHeight;
  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < winHeight + 150) {
      el.classList.add('is-visible');
    }
  });

  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  // IntersectionObserver for Scroll Reveal
  const observerOptions = {
    root: null,
    rootMargin: '200px 0px 100px 0px',
    threshold: 0.02
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll:not(.is-visible)').forEach(el => {
    revealObserver.observe(el);
  });
});
