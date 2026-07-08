(() => {
  const categories = window.TOPKA_CATEGORIES || [
    { id: 'all', label: 'Все' },
    { id: 'tandoor', label: 'Тандыр' },
    { id: 'combo', label: 'Комбо' },
    { id: 'shawarma', label: 'Шаверма' },
    { id: 'snacks', label: 'Закуски' },
    { id: 'salads', label: 'Салаты' },
    { id: 'desserts', label: 'Десерты' },
    { id: 'extras', label: 'Допы' }
  ];
  const menu = Array.isArray(window.TOPKA_MENU) ? window.TOPKA_MENU : [];
  const hotTitles = new Set([
    'Комбо Поляна куриный',
    'Комбо Поляна свиной',
    'Комбо Пикник куриный',
    'Шаверма с цыплёнком M',
    'Шашлык в тандыре из свинины',
    'Сувлак куриный 1 шт'
  ]);

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

  function cardTemplate(item, index) {
    const title = escapeHtml(item.title);
    const isHot = hotTitles.has(item.title);
    return `
      <article class="menu-card ${isHot ? 'is-hot' : ''}" data-category="${escapeHtml(item.category)}" style="animation-delay:${Math.min(index * 18, 180)}ms">
        <div class="menu-card__top">
          <span>${escapeHtml(item.categoryLabel)}</span>
          ${isHot ? '<em>хит</em>' : ''}
        </div>
        <h3>${title}</h3>
        <p>${escapeHtml(item.description)}</p>
        <div class="menu-card__meta">
          <strong>${escapeHtml(item.price)}</strong>
          <span>${escapeHtml(item.weight)}</span>
        </div>
        <a class="menu-card__order" href="#order" data-order-title="${title}" data-order-price="${escapeHtml(item.price)}">Заказать</a>
      </article>
    `;
  }

  function hitTemplate(item) {
    return `
      <article class="hit-card">
        <span class="hit-card__label">${escapeHtml(item.categoryLabel)}</span>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.description)}</p>
        <img src="assets/logo-mark.png" alt="" aria-hidden="true" />
        <div class="hit-card__meta"><strong>${escapeHtml(item.price)}</strong><span>${escapeHtml(item.weight)}</span></div>
      </article>
    `;
  }

  function buildTabs() {
    const tabs = $('[data-category-tabs]');
    if (!tabs) return;
    tabs.innerHTML = categories.map((category, index) => `
      <button class="tab ${index === 0 ? 'is-active' : ''}" type="button" data-filter="${escapeHtml(category.id)}">${escapeHtml(category.label)}</button>
    `).join('');
  }

  let activeFilter = 'all';
  let searchQuery = '';

  function getFilteredItems() {
    return menu.filter((item) => {
      const matchesCategory = activeFilter === 'all' || item.category === activeFilter;
      const haystack = normalize([item.title, item.description, item.categoryLabel, item.tag].join(' '));
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
      status.textContent = !items.length ? 'Ничего не найдено. Попробуйте другую категорию или поиск.' : '';
    }
    grid.innerHTML = items.map(cardTemplate).join('');
  }

  function renderHits() {
    const grid = $('[data-hit-grid]');
    if (!grid || !menu.length) return;
    const hits = menu.filter(item => hotTitles.has(item.title)).slice(0, 4);
    grid.innerHTML = hits.map(hitTemplate).join('');
  }


  function scrollToMenuPositions() {
    if (!window.matchMedia('(max-width: 760px)').matches) return;
    const grid = $('[data-menu-grid]');
    if (!grid) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 72;
        const top = grid.getBoundingClientRect().top + window.pageYOffset - headerHeight - 14;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      });
    });
  }

  function bindEvents() {
    const header = $('[data-header]');
    const scrollTopButton = $('[data-scroll-top]');

    $('[data-menu-toggle]')?.addEventListener('click', () => { header?.classList.toggle('is-open'); syncStickyOffsets(); });

    document.addEventListener('click', (event) => {
      const navLink = event.target.closest('.nav a');
      if (navLink) { header?.classList.remove('is-open'); syncStickyOffsets(); }

      const tab = event.target.closest('[data-filter]');
      if (tab) {
        activeFilter = tab.dataset.filter || 'all';
        $$('[data-filter]').forEach(button => button.classList.remove('is-active'));
        tab.classList.add('is-active');
        renderMenu();
        scrollToMenuPositions();
      }

      const order = event.target.closest('[data-order-title]');
      if (order) {
        const title = order.dataset.orderTitle;
        const price = order.dataset.orderPrice;
        const message = `Здравствуйте! Хочу заказать: ${title} — ${price}.`;
        const text = $('[data-order-text]');
        const area = $('[data-order-message]');
        const wa = $('[data-wa-link]');
        const tg = $('[data-tg-link]');
        if (text) text.innerHTML = `Вы выбрали: <b>${escapeHtml(title)}</b>. Текст заявки готов.`;
        if (area) area.value = message;
        if (wa) wa.href = '#contacts';
        if (tg) tg.href = '#contacts';
        header?.classList.remove('is-open');
        syncStickyOffsets();
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
    if (!('IntersectionObserver' in window)) {
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

  function init() {
    buildTabs();
    renderHits();
    renderMenu();
    bindEvents();
    syncStickyOffsets();
    window.addEventListener('resize', syncStickyOffsets);
    window.addEventListener('orientationchange', syncStickyOffsets);
    initHeroParallax();
    revealOnScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
