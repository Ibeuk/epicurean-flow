/* ==========================================================================
   EPICUREAN FLOW - MASTER NAVIGATION & MOBILE DRAWER MODULE
   Universal compatibility for all headers, mobile buttons and drawers
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const hamburger = document.querySelector('.hamburger, .mobile-menu-btn');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer, .mobile-menu-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // Sticky Header Scroll State with Hysteresis & rAF to eliminate visual flicker
  let isTicking = false;
  const handleScroll = () => {
    if (!header) return;
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > 60) {
          header.classList.add('scrolled');
        } else if (y < 20) {
          header.classList.remove('scrolled');
        }
        isTicking = false;
      });
      isTicking = true;
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

    // Event delegation on mobileDrawer for Close Button, Accordion Trigger, and Navigation Links
    mobileDrawer.addEventListener('click', (e) => {
      // 1. Close / Cancel button
      const closeBtn = e.target.closest('#mobile-drawer-close, .mobile-drawer-close');
      if (closeBtn) {
        e.preventDefault();
        e.stopPropagation();
        closeDrawer();
        return;
      }

      // 2. Mobile Accordion Toggle for Recipes & Blog
      const accordionTrigger = e.target.closest('.mobile-accordion-trigger');
      if (accordionTrigger) {
        e.preventDefault();
        e.stopPropagation();
        const parentGroup = accordionTrigger.closest('.mobile-nav-group');
        const submenu = parentGroup ? parentGroup.querySelector('.mobile-nav-submenu') : null;
        const isExpanded = accordionTrigger.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
          accordionTrigger.setAttribute('aria-expanded', 'false');
          accordionTrigger.classList.remove('open');
          if (submenu) submenu.style.display = 'none';
        } else {
          accordionTrigger.setAttribute('aria-expanded', 'true');
          accordionTrigger.classList.add('open');
          if (submenu) submenu.style.display = 'flex';
        }
        return;
      }

      // 3. Close when clicking any direct nav link or sublink
      const navLink = e.target.closest('.mobile-nav-link:not(.mobile-accordion-trigger), .mobile-nav-sublink');
      if (navLink) {
        closeDrawer();
      }
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

