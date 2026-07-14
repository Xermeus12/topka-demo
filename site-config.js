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
    directorPhone: "+79185973882",
    address: "Советская ул., 1, Ставрополь",
    mapsUrl: "https://yandex.ru/maps/?text=%D0%A1%D0%BE%D0%B2%D0%B5%D1%82%D1%81%D0%BA%D0%B0%D1%8F%20%D1%83%D0%BB.%2C%201%2C%20%D0%A1%D1%82%D0%B0%D0%B2%D1%80%D0%BE%D0%BF%D0%BE%D0%BB%D1%8C"
  },
  imageFallback: "assets/logo-mark.png"
});
