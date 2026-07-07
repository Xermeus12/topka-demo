// Порядок категорий и подписи для отрисовки меню через JS
window.TOPKA_CATEGORIES = [
  { id: 'all', label: 'Все' },
  { id: 'tandoor', label: 'Тандыр' },
  { id: 'combo', label: 'Комбо' },
  { id: 'shawarma', label: 'Шаверма' },
  { id: 'snacks', label: 'Закуски' },
  { id: 'salads', label: 'Салаты' },
  { id: 'desserts', label: 'Десерты' },
  { id: 'extras', label: 'Допы' }
];

// Меню вынесено отдельно, чтобы быстро менять цены, вес, состав и добавлять позиции.
// Данные обновлены по актуальному PDF-меню: тандыр, комбо, шаверма, закуски, салаты, десерты и допы.
window.TOPKA_MENU = [
  {
    "title": "Сувлак куриный 1 шт",
    "category": "tandoor",
    "categoryLabel": "Из тандыра",
    "weight": "100 г",
    "price": "210 ₽",
    "description": "Куриный сувлак из тандыра. Удобный горячий перекус или дополнение к заказу.",
    "tag": "сувлак"
  },
  {
    "title": "Сувлак свиной 1 шт",
    "category": "tandoor",
    "categoryLabel": "Из тандыра",
    "weight": "100 г",
    "price": "230 ₽",
    "description": "Свиной сувлак из тандыра — горячий, сытный и простой формат на каждый день.",
    "tag": "сувлак"
  },
  {
    "title": "Шашлык в тандыре из свинины",
    "category": "tandoor",
    "categoryLabel": "Из тандыра",
    "weight": "100/20/10 г",
    "price": "230 ₽",
    "description": "Фирменный шашлык из шейки молочного поросёнка, приготовленный в тандыре.",
    "tag": "шашлык"
  },
  {
    "title": "Шашлык в тандыре из филе грудки цыплёнка",
    "category": "tandoor",
    "categoryLabel": "Из тандыра",
    "weight": "100/20/10 г",
    "price": "210 ₽",
    "description": "Фирменный шашлык из филе грудки кукурузного цыплёнка, приготовленного в тандыре.",
    "tag": "шашлык"
  },
  {
    "title": "Шашлык в тандыре из филе бедра цыплёнка",
    "category": "tandoor",
    "categoryLabel": "Из тандыра",
    "weight": "100/20/10 г",
    "price": "210 ₽",
    "description": "Фирменный шашлык из филе бедра кукурузного цыплёнка, приготовленного в тандыре.",
    "tag": "шашлык"
  },
  {
    "title": "Мини комбо куриный",
    "category": "combo",
    "categoryLabel": "Комбо",
    "weight": "250 г",
    "price": "350 ₽",
    "description": "На пите с салатом коул слоу, маринованным луком и соусом.",
    "tag": "мини"
  },
  {
    "title": "Мини комбо свиной",
    "category": "combo",
    "categoryLabel": "Комбо",
    "weight": "250 г",
    "price": "390 ₽",
    "description": "На пите с салатом коул слоу, маринованным луком и соусом.",
    "tag": "мини"
  },
  {
    "title": "Комбо Пикник куриный",
    "category": "combo",
    "categoryLabel": "Комбо",
    "weight": "1210 г",
    "price": "1450 ₽",
    "description": "Сувлаки куриные, коул слоу, ачучук, картофельные дольки, малиновый лук, соус, пита.",
    "tag": "для компании"
  },
  {
    "title": "Комбо Пикник свиной",
    "category": "combo",
    "categoryLabel": "Комбо",
    "weight": "1210 г",
    "price": "1550 ₽",
    "description": "Сувлаки свиные, коул слоу, ачучук, картофельные дольки, малиновый лук, соус, пита.",
    "tag": "для компании"
  },
  {
    "title": "Комбо Поляна куриный",
    "category": "combo",
    "categoryLabel": "Комбо",
    "weight": "1880 г",
    "price": "2000 ₽",
    "description": "Шашлык куриный, коул слоу, картофельные дольки, огурец, помидор, маринованный лук, соус, лаваш.",
    "tag": "большой набор"
  },
  {
    "title": "Комбо Поляна свиной",
    "category": "combo",
    "categoryLabel": "Комбо",
    "weight": "1880 г",
    "price": "2150 ₽",
    "description": "Шашлык свиной, коул слоу, картофельные дольки, огурец, помидор, маринованный лук, соус, лаваш.",
    "tag": "большой набор"
  },
  {
    "title": "Шаверма с цыплёнком S",
    "category": "shawarma",
    "categoryLabel": "Шаверма",
    "weight": "300 г",
    "price": "330 ₽",
    "description": "В лаваше с салатом коул слоу, помидорами, огурцами и чесночным соусом.",
    "tag": "лаваш"
  },
  {
    "title": "Шаверма с цыплёнком M",
    "category": "shawarma",
    "categoryLabel": "Шаверма",
    "weight": "400 г",
    "price": "360 ₽",
    "description": "В лаваше с салатом коул слоу, помидорами, огурцами и чесночным соусом.",
    "tag": "лаваш"
  },
  {
    "title": "Шаверма с цыплёнком L",
    "category": "shawarma",
    "categoryLabel": "Шаверма",
    "weight": "500 г",
    "price": "400 ₽",
    "description": "В лаваше с салатом коул слоу, помидорами, огурцами и чесночным соусом.",
    "tag": "лаваш"
  },
  {
    "title": "Шаверма в пите",
    "category": "shawarma",
    "categoryLabel": "Шаверма",
    "weight": "220 г",
    "price": "360 ₽",
    "description": "С цыплёнком, салатом коул слоу, помидорами, огурцами и соусом.",
    "tag": "пита"
  },
  {
    "title": "Снекасти с цыплёнком, картофелем фри и соусом",
    "category": "shawarma",
    "categoryLabel": "Шаверма",
    "weight": "500 г",
    "price": "620 ₽",
    "description": "Пита 2 шт., помидоры, огурцы, сыр, соус, картофель фри.",
    "tag": "сытно"
  },
  {
    "title": "Порция",
    "category": "shawarma",
    "categoryLabel": "Шаверма",
    "weight": "350 г",
    "price": "420 ₽",
    "description": "Пита, цыплёнок, салат коул слоу, помидоры, огурцы, соус, картофель фри.",
    "tag": "боул"
  },
  {
    "title": "Сырные палочки / соус",
    "category": "snacks",
    "categoryLabel": "Закуски",
    "weight": "100/30 г",
    "price": "250 ₽",
    "description": "Горячие сырные палочки с соусом.",
    "tag": "сыр"
  },
  {
    "title": "Наггетсы / соус",
    "category": "snacks",
    "categoryLabel": "Закуски",
    "weight": "85/30 г",
    "price": "230 ₽",
    "description": "Наггетсы с соусом — быстрый перекус к заказу.",
    "tag": "фри"
  },
  {
    "title": "Кольца кальмара / соус",
    "category": "snacks",
    "categoryLabel": "Закуски",
    "weight": "130/30 г",
    "price": "310 ₽",
    "description": "Кольца кальмара во фритюре с соусом.",
    "tag": "фри"
  },
  {
    "title": "Креветки фри / соус",
    "category": "snacks",
    "categoryLabel": "Закуски",
    "weight": "45/30 г",
    "price": "200 ₽",
    "description": "Креветки фри с соусом.",
    "tag": "фри"
  },
  {
    "title": "Луковые кольца / соус",
    "category": "snacks",
    "categoryLabel": "Закуски",
    "weight": "100/30 г",
    "price": "200 ₽",
    "description": "Хрустящие луковые кольца с соусом.",
    "tag": "фри"
  },
  {
    "title": "Наггетсы комбо фри",
    "category": "snacks",
    "categoryLabel": "Закуски",
    "weight": "100/85/30 г",
    "price": "340 ₽",
    "description": "Картофель фри, наггетсы и соус.",
    "tag": "комбо"
  },
  {
    "title": "Кольца кальмара комбо фри",
    "category": "snacks",
    "categoryLabel": "Закуски",
    "weight": "100/100/30 г",
    "price": "380 ₽",
    "description": "Картофель фри, кольца кальмара и соус.",
    "tag": "комбо"
  },
  {
    "title": "Креветки комбо фри",
    "category": "snacks",
    "categoryLabel": "Закуски",
    "weight": "100/45/30 г",
    "price": "370 ₽",
    "description": "Картофель фри, креветки фри и соус.",
    "tag": "комбо"
  },
  {
    "title": "Картофель фри / соус",
    "category": "snacks",
    "categoryLabel": "Закуски",
    "weight": "100/30/10 г",
    "price": "170 ₽",
    "description": "С сыром, фирменным миксом специй и соусом.",
    "tag": "картофель"
  },
  {
    "title": "Батат фри / соус",
    "category": "snacks",
    "categoryLabel": "Закуски",
    "weight": "120/30/10 г",
    "price": "220 ₽",
    "description": "С сыром, фирменным миксом специй и соусом.",
    "tag": "батат"
  },
  {
    "title": "Картофельные дольки",
    "category": "snacks",
    "categoryLabel": "Закуски",
    "weight": "150 г",
    "price": "150 ₽",
    "description": "Горячие картофельные дольки отдельно или к мясу.",
    "tag": "гарнир"
  },
  {
    "title": "Салат коул слоу",
    "category": "salads",
    "categoryLabel": "Салаты",
    "weight": "130 г",
    "price": "130 ₽",
    "description": "Классический салат из капусты с морковью, заправкой из соуса провансаль.",
    "tag": "салат"
  },
  {
    "title": "Шеф салат",
    "category": "salads",
    "categoryLabel": "Салаты",
    "weight": "210 г",
    "price": "280 ₽",
    "description": "Цыплёнок, коул слоу, огурцы, помидор, лук, соус.",
    "tag": "салат"
  },
  {
    "title": "Салат ачучук из томатов с луком",
    "category": "salads",
    "categoryLabel": "Салаты",
    "weight": "130 г",
    "price": "250 ₽",
    "description": "Салат из узбекских розовых томатов с маринованным луком и заправкой из оливкового масла.",
    "tag": "ачучук"
  },
  {
    "title": "Греческий хворост с корицей",
    "category": "desserts",
    "categoryLabel": "Десерты",
    "weight": "90 г",
    "price": "180 ₽",
    "description": "Завитушки из заварного теста, обжаренного во фритюре до золотистой корочки.",
    "tag": "сладкое"
  },
  {
    "title": "Греческий хворост с сахарной пудрой",
    "category": "desserts",
    "categoryLabel": "Десерты",
    "weight": "90 г",
    "price": "180 ₽",
    "description": "Завитушки из заварного теста, обжаренного во фритюре до золотистой корочки.",
    "tag": "сладкое"
  },
  {
    "title": "Греческий хворост с мороженым",
    "category": "desserts",
    "categoryLabel": "Десерты",
    "weight": "90/30 г",
    "price": "200 ₽",
    "description": "Хворост из заварного теста с порцией мороженого.",
    "tag": "с мороженым"
  },
  {
    "title": "Мороженое",
    "category": "desserts",
    "categoryLabel": "Десерты",
    "weight": "30 г",
    "price": "40 ₽",
    "description": "Порция мороженого как десерт или дополнение к хворосту.",
    "tag": "доп"
  },
  {
    "title": "Топпинг",
    "category": "desserts",
    "categoryLabel": "Десерты",
    "weight": "30 г",
    "price": "40 ₽",
    "description": "Сладкий топпинг к десертам.",
    "tag": "доп"
  },
  {
    "title": "Сыр",
    "category": "extras",
    "categoryLabel": "Допы",
    "weight": "10 г",
    "price": "40 ₽",
    "description": "Дополнительная порция сыра к блюду.",
    "tag": "доп"
  },
  {
    "title": "Соус 30 г",
    "category": "extras",
    "categoryLabel": "Допы",
    "weight": "30 г",
    "price": "40 ₽",
    "description": "Дополнительный соус к заказу.",
    "tag": "соус"
  },
  {
    "title": "Соус 100 г",
    "category": "extras",
    "categoryLabel": "Допы",
    "weight": "100 г",
    "price": "100 ₽",
    "description": "Большая порция соуса к заказу.",
    "tag": "соус"
  },
  {
    "title": "Халапеньо",
    "category": "extras",
    "categoryLabel": "Допы",
    "weight": "10 г",
    "price": "30 ₽",
    "description": "Острый халапеньо к блюду.",
    "tag": "остро"
  },
  {
    "title": "Замена картофель фри на батат фри",
    "category": "extras",
    "categoryLabel": "Допы",
    "weight": "опция",
    "price": "50 ₽",
    "description": "Замена стандартного картофеля фри на батат фри.",
    "tag": "замена"
  }
];
