// Настройки сайта и будущего API.
// Когда Саша развернёт API, достаточно:
// 1) поставить enabled: true;
// 2) при необходимости указать baseUrl;
// 3) проверить пути menuEndpoint и categoriesEndpoint.
window.TOPKA_CONFIG = Object.freeze({
  api: {
    enabled: false,
    baseUrl: "",
    menuEndpoint: "/api/menu",
    categoriesEndpoint: "/api/categories",
    timeoutMs: 8000
  },
  fallback: {
    enabled: true
  },
  orderUrl: "https://eda.yandex.ru/restaurant/topka_prjdh?utm_campaign=android&utm_medium=referral&utm_source=rst_shared_link",
  contacts: {
    venuePhone: "+79197360000",
    directorPhone: "+79185973882"
  },
  imageFallback: "assets/logo-mark.png"
});
