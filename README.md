# Топка — V18 SEO + API-ready

## Что сделано

### SEO

- расширенные метатеги;
- Open Graph и Twitter Card;
- favicon, Apple Touch Icon, webmanifest;
- OG-изображение 1200×630;
- микроразметка Restaurant/Menu/MenuItem/Offer;
- статический HTML-снимок меню для поисковой индексации;
- robots.txt;
- шаблон sitemap;
- 404.html;
- улучшения производительности и доступности.

### Подготовка к админке/API

Добавлены:

- `site-config.js` — включение и адреса API;
- `menu-service.js` — загрузка, нормализация и fallback;
- новый формат `menu-data.js`;
- поддержка `image`, `isActive`, `isHot`, `sort`, числовой цены;
- примеры JSON и контракт API в папке `docs`.

## Как Саше подключить API

1. Развернуть:
   - `GET /api/menu`
   - `GET /api/categories`
2. Открыть `site-config.js`.
3. Поставить `enabled: true`.
4. Проверить формат по `docs/API_CONTRACT.md`.

Сам дизайн и карточки переписывать не нужно.

## Что загружать на хостинг

Загрузить все файлы, кроме:

- `preview_single_js.html`;
- папки `docs` — она нужна разработчику, но не обязательна на продакшене;
- `sitemap.template.xml` после создания готового `sitemap.xml`.

## Важно после выбора домена

Пройти пункты из `docs/SEO_CHECKLIST.md`: подставить абсолютный домен, создать sitemap и добавить фактический адрес/график работы.
