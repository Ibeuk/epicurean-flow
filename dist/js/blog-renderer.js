/**
 * EPICUREAN FLOW - DYNAMIC BLOG, DIABETES & NUTRITION ENGINE
 * Powers all 274 culinary posts, instant search, categories, and article reader modal.
 */

(function () {
  'use strict';

  function initBlogEngine() {
    const posts = window.EPICUREAN_POSTS || [];
    if (!posts.length) return;

    const pathname = window.location.pathname.toLowerCase();
    const isDiabetesPage = pathname.includes('diabetes');
    const isNutritionPage = pathname.includes('nutrition');
    const isBlogPage = pathname.includes('blog') || (!isDiabetesPage && !isNutritionPage && document.getElementById('blog-posts-grid'));

    ensureReaderModal();

    if (isBlogPage) {
      setupBlogPage(posts);
    } else if (isDiabetesPage) {
      setupCategoryPage(posts, 'diabetes', '#diabetes-recipes-grid, .featured-recipes-grid, .recipe-grid');
    } else if (isNutritionPage) {
      setupCategoryPage(posts, 'nutrition', '#nutrition-posts-grid, .nutrition-grid, .recipe-grid');
    }
  }

  // --- GRAND EDITORIAL BLOG READER MODAL ---
  function ensureReaderModal() {
    if (document.getElementById('epicurean-article-modal')) return;

    const modalHTML = `
      <div class="recipe-modal-backdrop" id="epicurean-article-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="modal-art-title">
        <div class="recipe-modal-container">
          <!-- Sticky Top Utility Bar -->
          <div class="recipe-modal-sticky-bar">
            <div class="recipe-modal-sticky-left">
              <span class="recipe-modal-badge" id="modal-sticky-badge" style="margin-bottom: 0;">Culinary Story</span>
              <span style="font-size: 0.85rem; color: #776e65; font-weight: 500;" id="modal-sticky-time">5 min read</span>
            </div>
            <div class="recipe-modal-sticky-actions">
              <button type="button" class="btn btn-outline" id="modal-share-btn" style="padding: 7px 14px; font-size: 0.8rem; border-color: rgba(0,0,0,0.15); display: inline-flex; align-items: center; gap: 6px;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                <span id="modal-share-text">Share</span>
              </button>
              <button type="button" class="btn btn-outline" id="modal-print-btn" style="padding: 7px 14px; font-size: 0.8rem; border-color: rgba(0,0,0,0.15); display: inline-flex; align-items: center; gap: 6px;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                <span>Print</span>
              </button>
              <button type="button" class="recipe-modal-close" id="epicurean-modal-close" aria-label="Close Article">&times;</button>
            </div>
          </div>

          <!-- Hero Cover Image -->
          <div class="recipe-modal-hero-wrap">
            <img id="modal-art-img" class="recipe-modal-hero-img" src="" alt="Recipe Cover">
          </div>

          <!-- Article Header -->
          <div class="recipe-modal-header">
            <span class="recipe-modal-badge" id="modal-art-badge">Culinary Story</span>
            <h1 class="recipe-modal-title" id="modal-art-title">Article Title</h1>
            <p class="recipe-modal-subtitle" id="modal-art-desc"></p>
            
            <div class="recipe-modal-author-row">
              <div class="recipe-modal-author">
                <img src="images/logo.png" alt="Chef Eliane Muskus" class="recipe-modal-author-img">
                <div class="recipe-modal-author-info">
                  <span class="recipe-modal-author-name">Chef Eliane Muskus</span>
                  <span class="recipe-modal-author-role">Founder, Epicurean Flow &bull; Mediterranean Gastronomy</span>
                </div>
              </div>
              <div class="recipe-modal-meta-pills">
                <span id="modal-art-date">Date</span>
                <span>&bull;</span>
                <span id="modal-art-time">5 min read</span>
              </div>
            </div>
          </div>

          <!-- Article Body -->
          <div class="recipe-modal-body" id="modal-art-body">
          </div>

          <!-- Author Bio & Recommendations Card -->
          <div style="max-width: 960px; margin: 0 auto; width: 100%; padding: 0 clamp(24px, 5vw, 64px) 36px;">
            <div style="background: #FAF8F5; border: 1px solid rgba(188, 145, 66, 0.3); border-radius: var(--radius-md); padding: 28px 32px; display: flex; gap: 24px; align-items: center; flex-wrap: wrap;">
              <img src="images/logo.png" alt="Chef Eliane Muskus" style="width: 64px; height: 64px; border-radius: 50%; object-fit: contain; background: #fff; padding: 4px; border: 1.5px solid var(--color-gold);">
              <div style="flex: 1; min-width: 240px;">
                <h4 style="font-family: var(--font-serif); font-size: 1.15rem; color: #1a1714; margin-bottom: 6px;">Cook with Chef Eliane Muskus</h4>
                <p style="font-size: 0.95rem; color: #665f58; line-height: 1.6; margin-bottom: 0;">
                  Discover culinary confidence with masterclasses, diabetes-friendly guides, and curated Mediterranean recipe collections crafted with sensory passion.
                </p>
              </div>
              <a href="courses.html" class="btn btn-gold" style="font-size: 0.85rem; padding: 10px 20px;">Explore Masterclasses &rarr;</a>
            </div>
          </div>

          <!-- Bottom Actions Bar -->
          <div class="recipe-modal-actions">
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              <a href="courses.html" class="btn btn-gold">Explore Chef Courses</a>
              <a href="cookbooks.html" class="btn btn-outline">Browse Cookbooks</a>
            </div>
            <a id="modal-art-original-link" href="#" target="_blank" rel="noopener" class="btn btn-outline" style="font-size: 0.85rem;">View Original Post on Wix &rarr;</a>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('epicurean-article-modal');
    const closeBtn = document.getElementById('epicurean-modal-close');
    const shareBtn = document.getElementById('modal-share-btn');
    const printBtn = document.getElementById('modal-print-btn');
    const shareText = document.getElementById('modal-share-text');

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }

    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        const title = document.getElementById('modal-art-title').textContent;
        const url = window.location.href;
        if (navigator.share) {
          navigator.share({ title, url }).catch(() => {});
        } else {
          navigator.clipboard.writeText(url).then(() => {
            if (shareText) {
              const orig = shareText.textContent;
              shareText.textContent = 'Copied!';
              setTimeout(() => { shareText.textContent = orig; }, 2000);
            }
          });
        }
      });
    }
  }

  function openModal(post) {
    const modal = document.getElementById('epicurean-article-modal');
    if (!modal) return;

    const formattedCat = formatCategory(post.category);
    const readTime = post.readTime || '4 min read';

    const heroImg = document.getElementById('modal-art-img');
    heroImg.src = post.image || 'images/chef-eliane-cooking-paella.jpg';
    heroImg.alt = post.title;

    document.getElementById('modal-art-badge').textContent = formattedCat;
    const stickyBadge = document.getElementById('modal-sticky-badge');
    if (stickyBadge) stickyBadge.textContent = formattedCat;

    document.getElementById('modal-art-title').textContent = post.title;
    document.getElementById('modal-art-desc').textContent = post.description || '';
    document.getElementById('modal-art-date').textContent = formatDate(post.date);
    document.getElementById('modal-art-time').textContent = readTime;
    const stickyTime = document.getElementById('modal-sticky-time');
    if (stickyTime) stickyTime.textContent = readTime;

    document.getElementById('modal-art-original-link').href = post.url || '#';

    const bodyEl = document.getElementById('modal-art-body');
    if (post.content_html && post.content_html.length > 50) {
      bodyEl.innerHTML = post.content_html;
    } else {
      bodyEl.innerHTML = `<p style="font-size: 1.15rem; line-height: 1.85;">${post.description || ''}</p><p style="font-size: 1.15rem; line-height: 1.85;">${post.body_snippet || ''}</p>`;
    }

    // Scroll modal container to top
    const container = modal.querySelector('.recipe-modal-container');
    if (container) container.scrollTop = 0;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const modal = document.getElementById('epicurean-article-modal');
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // --- BLOG PAGE CONTROLLER ---
  function setupBlogPage(posts) {
    const grid = document.getElementById('blog-posts-grid') || document.querySelector('.blog-grid');
    if (!grid) return;

    let currentFilter = 'all';
    let searchQuery = '';
    let displayedCount = 18;
    const PAGE_SIZE = 18;

    // Insert Search & Counter Bar before .blog-filter-wrap
    const filterContainer = document.querySelector('.blog-filter-wrap, .blog-filter-bar, .blog-filters');
    if (filterContainer && !document.getElementById('blog-search-wrap')) {
      const searchHTML = `
        <div id="blog-search-wrap" style="margin-bottom: 24px; display: flex; gap: 16px; align-items: center; justify-content: space-between; flex-wrap: wrap;">
          <div style="position: relative; flex: 1; max-width: 520px; min-width: 280px;">
            <input type="search" id="blog-search-input" placeholder="Search 274+ recipes, ingredients, health tips..." 
                   style="width: 100%; padding: 13px 20px 13px 44px; border: 1px solid rgba(188,145,66,0.4); border-radius: 999px; font-size: 0.95rem; background: #fff; box-shadow: 0 4px 14px rgba(0,0,0,0.04); outline: none;">
            <svg style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); width: 18px; height: 18px; color: #888;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <span id="blog-posts-counter" style="font-size: 0.95rem; color: #555; font-weight: 600;">Showing all 274 stories</span>
        </div>
      `;
      filterContainer.insertAdjacentHTML('beforebegin', searchHTML);

      const searchInput = document.getElementById('blog-search-input');
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          searchQuery = e.target.value.toLowerCase().trim();
          displayedCount = PAGE_SIZE;
          render();
        });
      }
    }

    // Filter Buttons
    const filterBtns = document.querySelectorAll('.blog-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter') || 'all';
        displayedCount = PAGE_SIZE;
        render();
      });
    });

    // Load More Button
    let loadMoreBtn = document.getElementById('blog-load-more-btn');
    if (!loadMoreBtn) {
      const btnWrap = document.createElement('div');
      btnWrap.id = 'blog-pagination-wrap';
      btnWrap.style.textAlign = 'center';
      btnWrap.style.marginTop = '48px';
      btnWrap.style.marginBottom = '48px';
      btnWrap.innerHTML = `
        <button id="blog-load-more-btn" class="btn btn-outline" style="min-width: 240px; padding: 14px 36px; font-weight: 600; border-color: var(--color-gold); color: var(--color-ink);">
          Load More Articles
        </button>
      `;
      grid.parentNode.insertBefore(btnWrap, grid.nextSibling);
      loadMoreBtn = document.getElementById('blog-load-more-btn');
    }

    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        displayedCount += PAGE_SIZE;
        render();
      });
    }

    function render() {
      const filtered = posts.filter(post => {
        const matchesCat = currentFilter === 'all' || post.category === currentFilter;
        if (!matchesCat) return false;
        if (!searchQuery) return true;
        const text = `${post.title} ${post.description} ${post.slug} ${post.body_snippet}`.toLowerCase();
        return text.includes(searchQuery);
      });

      const counter = document.getElementById('blog-posts-counter');
      if (counter) {
        counter.textContent = `Showing ${Math.min(displayedCount, filtered.length)} of ${filtered.length} stories`;
      }

      const toShow = filtered.slice(0, displayedCount);
      if (toShow.length === 0) {
        grid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
            <p style="font-size: 1.2rem; color: #888; margin-bottom: 12px;">No culinary stories match your query.</p>
            <button class="btn btn-sm btn-outline" onclick="document.getElementById('blog-search-input').value=''; document.getElementById('blog-search-input').dispatchEvent(new Event('input'));">Clear Search</button>
          </div>
        `;
      } else {
        grid.innerHTML = toShow.map(post => createCardHTML(post)).join('');
      }

      grid.querySelectorAll('.blog-post-card').forEach((cardEl, idx) => {
        cardEl.addEventListener('click', () => {
          const post = toShow[idx];
          if (post) window.location.href = 'post.html?slug=' + encodeURIComponent(post.slug);
        });
      });

      if (loadMoreBtn) {
        loadMoreBtn.style.display = displayedCount >= filtered.length ? 'none' : 'inline-block';
      }
    }

    render();
  }

  // --- CATEGORY PAGE CONTROLLER (Diabetes & Nutrition) ---
  function setupCategoryPage(posts, targetCategory, selector) {
    const container = document.querySelector(selector);
    if (!container) return;

    const filtered = posts.filter(p => p.category === targetCategory);
    if (!filtered.length) return;

    container.innerHTML = filtered.slice(0, 36).map(post => createCardHTML(post)).join('');

    container.querySelectorAll('.blog-post-card').forEach((cardEl, idx) => {
      cardEl.addEventListener('click', () => {
        const post = filtered[idx];
        if (post) window.location.href = 'post.html?slug=' + encodeURIComponent(post.slug);
      });
    });
  }

  // --- CARD GENERATOR (Direct Full-Page Link) ---
  function createCardHTML(post) {
    const catLabel = formatCategory(post.category);
    const dateStr = formatDate(post.date);
    const readTime = post.readTime || '3 min read';
    const imgUrl = post.image || 'images/chef-eliane-cooking-paella.jpg';
    const postUrl = 'post.html?slug=' + encodeURIComponent(post.slug);

    return `
      <article class="blog-post-card" data-category="${post.category}" data-slug="${post.slug}" onclick="window.location.href='${postUrl}'" style="cursor: pointer; display: flex; flex-direction: column; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); transition: transform 0.25s ease, box-shadow 0.25s ease; border: 1px solid rgba(0,0,0,0.06);">
        <a href="${postUrl}" class="blog-card-img-wrap" style="position: relative; overflow: hidden; aspect-ratio: 16/10; display: block;">
          <img src="${imgUrl}" alt="${escapeHtml(post.title)}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;">
          <span class="blog-card-cat" style="position: absolute; top: 12px; left: 12px; background: rgba(18,14,10,0.85); color: #D4AF37; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; padding: 4px 10px; border-radius: 4px; backdrop-filter: blur(4px);">
            ${catLabel}
          </span>
        </a>
        <div class="blog-card-body" style="padding: 24px; display: flex; flex-direction: column; flex: 1;">
          <span class="blog-card-date" style="font-size: 0.8rem; color: #888; margin-bottom: 8px;">
            ${dateStr} &bull; ${readTime}
          </span>
          <h3 class="blog-card-title" style="font-family: var(--font-serif); font-size: 1.35rem; line-height: 1.35; margin-bottom: 12px; color: #1a1a1a;">
            <a href="${postUrl}" style="color: inherit; text-decoration: none;">${escapeHtml(post.title)}</a>
          </h3>
          <p class="blog-card-excerpt" style="color: #666; font-size: 0.92rem; line-height: 1.6; margin-bottom: 20px; flex: 1; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
            ${escapeHtml(post.description || '')}
          </p>
          <div class="blog-card-footer" style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f0f0f0; padding-top: 16px; margin-top: auto;">
            <a href="${postUrl}" style="font-weight: 600; font-size: 0.85rem; color: var(--color-gold); display: inline-flex; align-items: center; gap: 6px; text-decoration: none;">
              Read Article &rarr;
            </a>
            <span style="font-size: 0.78rem; color: #999;">Chef Eliane</span>
          </div>
        </div>
      </article>
    `;
  }

  // --- HELPERS ---
  function formatCategory(cat) {
    const map = {
      'diabetes': 'Diabetes-Friendly',
      'nutrition': 'Nutrition & Wellness',
      'technique': 'Technique & Skills',
      'recipes': 'Chef Recipes',
      'baking': 'Pastry & Baking',
      'festive': 'Entertaining & Holiday',
      'mediterranean': 'Mediterranean',
      'wine': 'Wine & Pairing',
      'meal-prep': 'Meal Planning'
    };
    return map[cat] || 'Culinary Creation';
  }

  function formatDate(dStr) {
    if (!dStr) return 'Recent';
    try {
      const parts = dStr.split('-');
      if (parts.length >= 3) {
        const d = new Date(parts[0], parts[1] - 1, parts[2]);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      }
    } catch (e) {}
    return dStr;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, function (m) {
      switch (m) {
        case '&': return '&amp;';
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#39;';
        default: return m;
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlogEngine);
  } else {
    initBlogEngine();
  }
})();
