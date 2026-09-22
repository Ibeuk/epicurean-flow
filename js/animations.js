/* ==========================================================================
   EPICUREAN FLOW - LUXURY INTERACTIVE ANIMATION CONTROLLER
   Features:
   - Transformation Stories (5-Story Dynamic Sliding Carousel & Scroll-Slide Engine)
   - 3D Interactive Mouse Gyro Tilt on Product & Tour Cards
   - Scroll-Driven Image Parallax & Cinematic Floating Elements
   - Staggered Viewport Reveal & Micro-Interactions
   ========================================================================== */

(() => {
  'use strict';

  // Check reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initTestimonialSlider();

    if (!prefersReducedMotion && !isTouchDevice) {
      initCard3DTilt();
      initScrollParallax();
      initHeroMicroParallax();
    }
  });

  /* ------------------------------------------------------------------------
     1. SCROLL REVEAL CONTROLLER
     ------------------------------------------------------------------------ */
  function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal-on-scroll');
    if (!revealEls.length) return;

    if (prefersReducedMotion) {
      revealEls.forEach(el => el.classList.add('is-visible'));
      return;
    }

    // Immediately reveal hero elements with a graceful stagger
    const winHeight = window.innerHeight;
    revealEls.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < winHeight * 0.95) {
        setTimeout(() => {
          el.classList.add('is-visible');
        }, index * 80);
      }
    });

    // Observe remaining elements
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '60px 0px -40px 0px',
      threshold: 0.05
    });

    revealEls.forEach(el => {
      if (!el.classList.contains('is-visible')) {
        observer.observe(el);
      }
    });
  }

  /* ------------------------------------------------------------------------
     2. TRANSFORMATION STORIES SLIDING ENGINE (5-STORY CAROUSEL)
     ------------------------------------------------------------------------ */
  function initTestimonialSlider() {
    const sliderWrap = document.getElementById('testimonial-slider-wrap');
    const track = document.getElementById('testimonial-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('testimonial-prev-btn');
    const nextBtn = document.getElementById('testimonial-next-btn');
    const dotsContainer = document.getElementById('testimonial-dots');
    const progressBar = document.getElementById('testimonial-timer-progress');

    if (!sliderWrap || !track || !slides.length) return;

    const totalSlides = slides.length;
    let currentIndex = 0;
    let isTransitioning = false;
    let progressTimer = null;
    let progressPercent = 0;
    const slideDuration = 6000; // 6 seconds per story
    const progressInterval = 50; // Update progress bar every 50ms

    // Dynamically initialize dots to match the exact number of slides
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `testimonial-dot ${i === 0 ? 'active' : ''}`;
        dot.setAttribute('data-slide', i);
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
        dot.setAttribute('aria-label', `Go to story ${i + 1}`);
        dot.addEventListener('click', (e) => {
          e.preventDefault();
          if (i !== currentIndex) {
            updateSlider(i, i > currentIndex ? 'next' : 'prev');
          }
        });
        dotsContainer.appendChild(dot);
      });
    }

    const dots = dotsContainer ? dotsContainer.querySelectorAll('.testimonial-dot') : [];

    function updateSlider(newIndex, direction = 'next') {
      if (isTransitioning) return;
      isTransitioning = true;

      // Handle cyclic index
      if (newIndex < 0) {
        newIndex = totalSlides - 1;
      } else if (newIndex >= totalSlides) {
        newIndex = 0;
      }

      currentIndex = newIndex;

      // Animate track
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Update slide active classes
      slides.forEach((slide, i) => {
        if (i === currentIndex) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      // Update dots
      dots.forEach((dot, i) => {
        const isActive = i === currentIndex;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      resetProgressTimer();

      setTimeout(() => {
        isTransitioning = false;
      }, 650);
    }

    function startProgressTimer() {
      stopProgressTimer();
      progressPercent = 0;
      if (progressBar) progressBar.style.width = '0%';

      progressTimer = setInterval(() => {
        progressPercent += (progressInterval / slideDuration) * 100;
        if (progressBar) {
          progressBar.style.width = `${Math.min(100, progressPercent)}%`;
        }

        if (progressPercent >= 100) {
          stopProgressTimer();
          updateSlider(currentIndex + 1, 'next');
        }
      }, progressInterval);
    }

    function stopProgressTimer() {
      if (progressTimer) {
        clearInterval(progressTimer);
        progressTimer = null;
      }
    }

    function resetProgressTimer() {
      stopProgressTimer();
      startProgressTimer();
    }

    // Controls
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateSlider(currentIndex - 1, 'prev');
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateSlider(currentIndex + 1, 'next');
      });
    }

    // Pause on hover
    sliderWrap.addEventListener('mouseenter', () => {
      stopProgressTimer();
    });

    sliderWrap.addEventListener('mouseleave', () => {
      startProgressTimer();
    });

    // Mouse Wheel Scroll Navigation (Advances slides on vertical/horizontal scroll wheel)
    let wheelDebounce = false;
    sliderWrap.addEventListener('wheel', (e) => {
      if (wheelDebounce) return;
      if (Math.abs(e.deltaY) > 35 || Math.abs(e.deltaX) > 35) {
        wheelDebounce = true;
        if (e.deltaY > 0 || e.deltaX > 0) {
          updateSlider(currentIndex + 1, 'next');
        } else {
          updateSlider(currentIndex - 1, 'prev');
        }
        setTimeout(() => {
          wheelDebounce = false;
        }, 700);
      }
    }, { passive: true });

    // Touch Swipe Gestures for Mobile
    let touchStartX = 0;
    let touchEndX = 0;

    sliderWrap.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopProgressTimer();
    }, { passive: true });

    sliderWrap.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleGesture();
      startProgressTimer();
    }, { passive: true });

    function handleGesture() {
      const deltaX = touchEndX - touchStartX;
      if (Math.abs(deltaX) > 40) {
        if (deltaX < 0) {
          updateSlider(currentIndex + 1, 'next');
        } else {
          updateSlider(currentIndex - 1, 'prev');
        }
      }
    }

    // Initialize auto-sliding
    startProgressTimer();
  }

  /* ------------------------------------------------------------------------
     3. INTERACTIVE 3D CARD HOVER TILT
     ------------------------------------------------------------------------ */
  function initCard3DTilt() {
    const tiltCards = document.querySelectorAll('.catalog-product-card, .tour-card, .advantage-card');
    if (!tiltCards.length) return;

    tiltCards.forEach(card => {
      let isHovered = false;

      card.addEventListener('mouseenter', () => {
        isHovered = true;
        card.style.transition = 'transform 0.15s ease-out, box-shadow 0.25s ease-out';
      });

      card.addEventListener('mousemove', (e) => {
        if (!isHovered) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6; // max 6deg
        const rotateY = ((x - centerX) / centerX) * 6;  // max 6deg

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        isHovered = false;
        card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  /* ------------------------------------------------------------------------
     4. SCROLL-DRIVEN IMAGE PARALLAX
     ------------------------------------------------------------------------ */
  function initScrollParallax() {
    const parallaxImages = document.querySelectorAll('.tour-feature-img, .final-cta-img');
    if (!parallaxImages.length) return;

    let ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const winHeight = window.innerHeight;

          parallaxImages.forEach(img => {
            const rect = img.getBoundingClientRect();
            if (rect.top < winHeight && rect.bottom > 0) {
              const scrollProgress = (winHeight - rect.top) / (winHeight + rect.height);
              const translateY = (scrollProgress - 0.5) * 24; // Subtle 24px travel
              img.style.transform = `scale(1.04) translateY(${translateY.toFixed(1)}px)`;
            }
          });

          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ------------------------------------------------------------------------
     5. HERO SUBTLE MICRO-PARALLAX
     ------------------------------------------------------------------------ */
  function initHeroMicroParallax() {
    const hero = document.getElementById('hero');
    const heroImg = document.querySelector('.hero-fullwidth-img');
    if (!hero || !heroImg) return;

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const deltaX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const deltaY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      const transX = deltaX * 8;
      const transY = deltaY * 8;

      heroImg.style.transform = `scale(1.03) translate(${transX.toFixed(1)}px, ${transY.toFixed(1)}px)`;
    }, { passive: true });

    hero.addEventListener('mouseleave', () => {
      heroImg.style.transform = 'scale(1) translate(0, 0)';
    });
  }

})();
