(() => {
  const config = window.TOPKA_CONFIG || {};
  const orderUrl = config.orderUrl || '#order';
  const imageFallback = config.imageFallback || 'assets/logo-mark.png';

  let categories = [];
  let menu = [];
  let activeFilter = 'all';
  let searchQuery = '';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function normalize(value) {
    return String(value ?? '').toLowerCase().replaceAll('ё', 'е').trim();
  }

  function formatPrice(item) {
    if (item.priceText) return item.priceText;
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0
    }).format(Number(item.price) || 0);
  }

  function cardTemplate(item, index) {
    const title = escapeHtml(item.title);
    const priceText = escapeHtml(formatPrice(item));
    const priceValue = Number(item.price) || 0;
    const image = item.image
      ? `<img class="menu-card__image" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.imageAlt || item.title)}" loading="lazy" decoding="async" />`
      : `<div class="menu-card__image menu-card__image--placeholder" aria-hidden="true"><img src="${escapeHtml(imageFallback)}" alt="" loading="lazy" /></div>`;

    return `
      <article class="menu-card ${item.isHot ? 'is-hot' : ''}" data-category="${escapeHtml(item.category)}" style="animation-delay:${Math.min(index * 18, 180)}ms" itemscope itemtype="https://schema.org/MenuItem">
        ${image}
        <div class="menu-card__top">
          <span>${escapeHtml(item.categoryLabel)}</span>
          ${item.isHot ? '<em>хит</em>' : ''}
        </div>
        <h3 itemprop="name">${title}</h3>
        <p itemprop="description">${escapeHtml(item.description)}</p>
        <div class="menu-card__meta" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
          <meta itemprop="priceCurrency" content="RUB" />
          <strong itemprop="price" content="${priceValue}">${priceText}</strong>
          <span>${escapeHtml(item.weight)}</span>
        </div>
        <a class="menu-card__order" href="${escapeHtml(orderUrl)}" target="_blank" rel="noopener noreferrer">Заказать в Яндекс Еде</a>
      </article>
    `;
  }

  function hitTemplate(item) {
    return `
      <article class="hit-card" itemscope itemtype="https://schema.org/MenuItem">
        <span class="hit-card__label">${escapeHtml(item.categoryLabel)}</span>
        <h3 itemprop="name">${escapeHtml(item.title)}</h3>
        <p itemprop="description">${escapeHtml(item.description)}</p>
        <img src="${escapeHtml(item.image || imageFallback)}" alt="${item.image ? escapeHtml(item.imageAlt || item.title) : ''}" ${item.image ? '' : 'aria-hidden="true"'} loading="lazy" decoding="async" />
        <div class="hit-card__meta"><strong>${escapeHtml(formatPrice(item))}</strong><span>${escapeHtml(item.weight)}</span></div>
      </article>
    `;
  }

  function buildTabs() {
    const tabs = $('[data-category-tabs]');
    if (!tabs) return;

    const allCategories = [{ id: 'all', label: 'Все' }, ...categories];
    tabs.innerHTML = allCategories.map((category, index) => `
      <button class="tab ${index === 0 ? 'is-active' : ''}" type="button" data-filter="${escapeHtml(category.id)}">${escapeHtml(category.label)}</button>
    `).join('');
  }

  function getFilteredItems() {
    return menu.filter((item) => {
      const matchesCategory = activeFilter === 'all' || item.category === activeFilter;
      const haystack = normalize([
        item.title,
        item.description,
        item.categoryLabel,
        item.tag,
        ...(item.tags || [])
      ].join(' '));
      const matchesSearch = !searchQuery || haystack.includes(normalize(searchQuery));
      return matchesCategory && matchesSearch;
    });
  }

  function renderMenu() {
    const grid = $('[data-menu-grid]');
    const count = $('[data-menu-count]');
    const status = $('[data-menu-status]');
    if (!grid) return;

    if (!menu.length) {
      grid.innerHTML = '';
      status?.classList.add('is-visible');
      if (status) status.textContent = 'Меню временно недоступно. Обновите страницу или попробуйте позже.';
      if (count) count.textContent = '0';
      return;
    }

    const items = getFilteredItems();
    if (count) count.textContent = String(items.length);

    if (status) {
      status.classList.toggle('is-visible', !items.length);
      status.textContent = !items.length
        ? 'Ничего не найдено. Попробуйте другую категорию или поиск.'
        : '';
    }

    grid.innerHTML = items.map(cardTemplate).join('');
  }

  function renderHits() {
    const grid = $('[data-hit-grid]');
    if (!grid) return;

    const hits = menu.filter(item => item.isHot).slice(0, 4);
    grid.innerHTML = hits.length
      ? hits.map(hitTemplate).join('')
      : '<div class="hit-skeleton">Популярные позиции скоро появятся.</div>';
  }

  function updateStats() {
    const itemCount = $('[data-stat-items]');
    const categoryCount = $('[data-stat-categories]');
    if (itemCount) itemCount.textContent = String(menu.length);
    if (categoryCount) categoryCount.textContent = String(categories.length);
  }

  function scrollToMenuPositions() {
    if (!window.matchMedia('(max-width: 760px)').matches) return;
    const grid = $('[data-menu-grid]');
    if (!grid) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const headerHeight = parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue('--header-height')
        ) || 72;
        const top = grid.getBoundingClientRect().top + window.pageYOffset - headerHeight - 14;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      });
    });
  }

  function bindEvents() {
    const header = $('[data-header]');
    const scrollTopButton = $('[data-scroll-top]');
    const menuToggle = $('[data-menu-toggle]');

    menuToggle?.addEventListener('click', () => {
      const isOpen = header?.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
      syncStickyOffsets();
    });

    document.addEventListener('click', (event) => {
      const navLink = event.target.closest('.nav a');
      if (navLink) {
        header?.classList.remove('is-open');
        menuToggle?.setAttribute('aria-expanded', 'false');
        syncStickyOffsets();
      }

      const tab = event.target.closest('[data-filter]');
      if (tab) {
        activeFilter = tab.dataset.filter || 'all';
        $$('[data-filter]').forEach(button => button.classList.remove('is-active'));
        tab.classList.add('is-active');
        renderMenu();
        scrollToMenuPositions();
      }
    });

    $('[data-menu-search]')?.addEventListener('input', (event) => {
      searchQuery = event.target.value;
      renderMenu();
    });

    scrollTopButton?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
      scrollTopButton?.classList.toggle('is-visible', window.scrollY > 520);
    }, { passive: true });
  }

  function syncStickyOffsets() {
    const header = $('[data-header]');
    if (!header) return;
    const height = Math.ceil(header.getBoundingClientRect().height);
    document.documentElement.style.setProperty('--header-height', `${height}px`);
  }

  function initHeroParallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const heroImage = document.querySelector('.hero__image img');
    const hero = document.querySelector('.hero__banner');
    if (!heroImage || !hero) return;

    const update = () => {
      const rect = hero.getBoundingClientRect();
      const viewport = window.innerHeight || document.documentElement.clientHeight;
      if (rect.bottom < 0 || rect.top > viewport) return;
      const progress = Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1);
      const offset = Math.round(progress * 90);
      heroImage.style.setProperty('--parallax-y', `${offset}px`);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  function revealOnScroll() {
    const items = $$('.reveal');

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      items.forEach(item => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    items.forEach(item => observer.observe(item));
  }

  async function init() {
    bindEvents();
    syncStickyOffsets();
    initHeroParallax();
    revealOnScroll();

    try {
      const result = await window.TopkaMenuService.load();
      menu = result.menu || [];
      categories = result.categories || [];
      document.body.dataset.menuSource = result.source || 'unknown';

      buildTabs();
      renderHits();
      renderMenu();
      updateStats();

      if (result.warning) {
        console.info(result.warning);
      }
    } catch (error) {
      console.error('Ошибка инициализации меню:', error);
      menu = [];
      categories = [];
      buildTabs();
      renderHits();
      renderMenu();
      updateStats();
    }

    window.addEventListener('resize', syncStickyOffsets);
    window.addEventListener('orientationchange', syncStickyOffsets);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
