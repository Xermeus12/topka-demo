(() => {
  const config = window.TOPKA_CONFIG || {};
  const apiConfig = config.api || {};
  const fallbackEnabled = config.fallback?.enabled !== false;

  function cleanBaseUrl(value) {
    return String(value || '').replace(/\/+$/, '');
  }

  function buildUrl(endpoint) {
    const value = String(endpoint || '');
    if (/^https?:\/\//i.test(value)) return value;
    const baseUrl = cleanBaseUrl(apiConfig.baseUrl);
    if (!baseUrl) return value;
    return `${baseUrl}${value.startsWith('/') ? '' : '/'}${value}`;
  }

  function extractArray(payload) {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.items)) return payload.items;
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.results)) return payload.results;
    return [];
  }

  async function fetchJson(endpoint) {
    const controller = new AbortController();
    const timeout = window.setTimeout(
      () => controller.abort(),
      Number(apiConfig.timeoutMs) || 8000
    );

    try {
      const response = await fetch(buildUrl(endpoint), {
        method: 'GET',
        headers: { Accept: 'application/json' },
        credentials: 'same-origin',
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`API вернул HTTP ${response.status}`);
      }

      return await response.json();
    } finally {
      window.clearTimeout(timeout);
    }
  }

  function numberFromPrice(value) {
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    const parsed = Number(String(value ?? '').replace(/[^\d.,-]/g, '').replace(',', '.'));
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function booleanValue(value, fallback = false) {
    if (typeof value === 'boolean') return value;
    if (value === 1 || value === '1' || value === 'true') return true;
    if (value === 0 || value === '0' || value === 'false') return false;
    return fallback;
  }

  function resolveImage(value) {
    if (!value) return '';
    const raw = String(value).trim();
    if (!raw) return '';
    if (/^(data:|blob:|https?:\/\/)/i.test(raw)) return raw;

    try {
      const apiBase = cleanBaseUrl(apiConfig.baseUrl);
      if (apiBase) return new URL(raw, `${apiBase}/`).href;
      return raw;
    } catch {
      return raw;
    }
  }

  function normalizeMenuItem(item, index = 0) {
    const title = String(item.title ?? item.name ?? '').trim();
    const category = String(
      item.category ?? item.categoryId ?? item.category_id ?? ''
    ).trim();

    return {
      id: String(item.id ?? item.slug ?? `item-${index + 1}`),
      slug: String(item.slug ?? item.id ?? `item-${index + 1}`),
      title,
      category,
      categoryLabel: String(
        item.categoryLabel ??
        item.category_label ??
        item.categoryName ??
        item.category_name ??
        category
      ).trim(),
      price: numberFromPrice(item.price ?? item.priceValue ?? item.price_value),
      priceText: String(item.priceText ?? item.price_text ?? '').trim(),
      weight: String(item.weight ?? '').trim(),
      description: String(item.description ?? item.composition ?? '').trim(),
      image: resolveImage(item.image ?? item.imageUrl ?? item.image_url),
      imageAlt: String(item.imageAlt ?? item.image_alt ?? title).trim(),
      isActive: booleanValue(
        item.isActive ?? item.is_active ?? item.active,
        true
      ),
      isHot: booleanValue(
        item.isHot ?? item.is_hot ?? item.hot,
        false
      ),
      sort: Number(item.sort ?? item.sortOrder ?? item.sort_order ?? index * 10) || 0,
      tag: String(item.tag ?? '').trim(),
      tags: Array.isArray(item.tags) ? item.tags.map(String) : []
    };
  }

  function normalizeCategory(item, index = 0) {
    const id = String(item.id ?? item.slug ?? item.code ?? '').trim();
    return {
      id,
      label: String(item.label ?? item.title ?? item.name ?? id).trim(),
      sort: Number(item.sort ?? item.sortOrder ?? item.sort_order ?? index * 10) || 0,
      isActive: booleanValue(
        item.isActive ?? item.is_active ?? item.active,
        true
      )
    };
  }

  function deriveCategories(menu) {
    const seen = new Map();
    menu.forEach((item, index) => {
      if (!item.category || seen.has(item.category)) return;
      seen.set(item.category, {
        id: item.category,
        label: item.categoryLabel || item.category,
        sort: index * 10,
        isActive: true
      });
    });
    return [...seen.values()];
  }

  function fallbackData() {
    const menu = (Array.isArray(window.TOPKA_MENU) ? window.TOPKA_MENU : [])
      .map(normalizeMenuItem)
      .filter(item => item.title && item.isActive)
      .sort((a, b) => a.sort - b.sort);

    const categories = (Array.isArray(window.TOPKA_CATEGORIES) ? window.TOPKA_CATEGORIES : [])
      .map(normalizeCategory)
      .filter(item => item.id && item.isActive)
      .sort((a, b) => a.sort - b.sort);

    return {
      menu,
      categories: categories.length ? categories : deriveCategories(menu),
      source: 'fallback',
      warning: ''
    };
  }

  async function load() {
    if (!apiConfig.enabled) return fallbackData();

    try {
      const [menuPayload, categoriesPayload] = await Promise.all([
        fetchJson(apiConfig.menuEndpoint),
        fetchJson(apiConfig.categoriesEndpoint).catch(() => [])
      ]);

      const menu = extractArray(menuPayload)
        .map(normalizeMenuItem)
        .filter(item => item.title && item.isActive)
        .sort((a, b) => a.sort - b.sort);

      let categories = extractArray(categoriesPayload)
        .map(normalizeCategory)
        .filter(item => item.id && item.isActive)
        .sort((a, b) => a.sort - b.sort);

      if (!categories.length) categories = deriveCategories(menu);

      if (!menu.length) {
        throw new Error('API вернул пустое меню');
      }

      return { menu, categories, source: 'api', warning: '' };
    } catch (error) {
      console.warn('Не удалось загрузить меню из API:', error);

      if (!fallbackEnabled) {
        return {
          menu: [],
          categories: [],
          source: 'error',
          warning: 'Меню временно недоступно.'
        };
      }

      const fallback = fallbackData();
      fallback.warning = 'Показана резервная версия меню.';
      return fallback;
    }
  }

  window.TopkaMenuService = Object.freeze({
    load,
    normalizeMenuItem,
    normalizeCategory
  });
})();
