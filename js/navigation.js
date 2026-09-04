/* ==========================================================================
   EPICUREAN FLOW - MASTER NAVIGATION & MOBILE DRAWER MODULE
   Universal compatibility for all headers, mobile buttons and drawers
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const hamburger = document.querySelector('.hamburger, .mobile-menu-btn');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer, .mobile-menu-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // Sticky Header Scroll State
  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // Mobile Drawer Backdrop Setup
  let drawerBackdrop = document.querySelector('.mobile-drawer-backdrop');
  if (!drawerBackdrop && mobileDrawer) {
    drawerBackdrop = document.createElement('div');
    drawerBackdrop.className = 'mobile-drawer-backdrop';
    document.body.appendChild(drawerBackdrop);
  }

  // Drawer Open/Close Helpers
  const openDrawer = () => {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('open');
    if (hamburger) {
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
    }
    if (drawerBackdrop) {
      drawerBackdrop.classList.add('open');
    }
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('open');
    if (hamburger) {
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
    if (drawerBackdrop) {
      drawerBackdrop.classList.remove('open');
    }
    document.body.style.overflow = '';
  };

  // Toggle Listener
  if (hamburger && mobileDrawer) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    // Backdrop Click/Touch Listener
    if (drawerBackdrop) {
      drawerBackdrop.addEventListener('click', closeDrawer);
      drawerBackdrop.addEventListener('touchstart', closeDrawer, { passive: true });
    }

    // Close when clicking any nav link
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        closeDrawer();
      }
    });

    // Close when resizing window to desktop width (> 1024px)
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && mobileDrawer.classList.contains('open')) {
        closeDrawer();
      }
    }, { passive: true });
  }

  // Desktop/Tablet Dropdown Toggle Handling
  const dropdownItems = document.querySelectorAll('.has-dropdown');
  dropdownItems.forEach(item => {
    const toggle = item.querySelector('.dropdown-toggle');
    if (toggle) {
      // Toggle on touch devices or click
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth >= 1024 && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
          if (!item.classList.contains('open')) {
            e.preventDefault();
            dropdownItems.forEach(other => other.classList.remove('open'));
            item.classList.add('open');
            toggle.setAttribute('aria-expanded', 'true');
          }
        }
      });
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-dropdown')) {
      dropdownItems.forEach(item => {
        item.classList.remove('open');
        const t = item.querySelector('.dropdown-toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
  });
});

