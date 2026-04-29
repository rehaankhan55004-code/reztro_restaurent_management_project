export const menuDetails = {
  id: 1,
  name: "Mango Coconut Smoothie Bowl",
  category: "Beverages",
  subCategory: "Dessert",
  image: "",
  price: 9.0,
  tag: "Customizable",
  rating: 4.6,
  reviewsCount: 85,
  ordersCount: 120,
  favoritesCount: 45,
  description:
    "Refreshing and tropical smoothie bowl with a hint of coconut, topped with fresh fruits. Perfect for a light meal or a cool dessert.",
  values: [
    "Tropical & Refreshing",
    "Creamy & Indulgent",
    "Nutrient-Rich",
    "Naturally Sweet",
    "Energizing",
    "Versatile & Customizable",
  ],
  nutrition: {
    calories: "320 Kcal",
    proteins: "5 gram",
    fats: "12 gram",
    carbs: "50 gram",
  },
  ingredients: [
    "Mango",
    "Coconut milk",
    "Banana",
    "Pineapple",
    "Coconut flakes",
    "Fresh berries (strawberries, blueberries)",
    "Granola",
  ],
};

export const menuOrdersOverview = {
  ordersOverview: {
    period: "This Week",
    chartData: [
      { day: "Mon", orders: 14 },
      { day: "Sun", orders: 12 },
      { day: "Wed", orders: 9 },
      { day: "Thu", orders: 13 },
      { day: "Fri", orders: 15 },
      { day: "Sat", orders: 17 },
      { day: "Sun", orders: 13 },
    ],
  },
};

export const similarMenus = [
    {
      id: 1,
      name: "Nuts Berries Oatmeal",
      category: "Dessert",
      image: "",
      rating: 4.7,
      price: 10.0,
    },
    {
      id: 2,
      name: "Pineapple Paradise Smoothie",
      category: "Beverages",
      image: "",
      rating: 4.5,
      price: 8.0,
    },
    {
      id: 3,
      name: "Green Detox Juice",
      category: "Beverages",
      image: "",
      rating: 4.2,
      price: 7.0,
    },
    {
      id: 4,
      name: "Tropical Fruit Salad",
      category: "Dessert",
      image: "",
      rating: 4.6,
      price: 7.0,
    },
];

export const menuReviews = [
  {
      id: 1,
      userName: "Sarah L.",
      location: "Oct 15,2035",
      rating: 5,
      review:
        "Absolutely delicious! The mango and coconut flavors are refreshing and perfectly balanced.",
    },
    {
      id: 2,
      userName: "Michael T.",
      location: "Oct 15,2034",
      rating: 4,
      review:
        "Very tasty and refreshing. Would love a larger portion. Great choice for a summer day!",
    },
    {
      id: 3,
      userName: "Emily R.",
      location: "Oct 15,2033",
      rating: 4,
      review:
        "Loved the fresh taste and light texture. It’s just the right mix of sweet and healthy.",
    },
];

const MenuDetailsData = {
  menuDetails,
  menuOrdersOverview,
  similarMenus,
  menuReviews,
};

export default MenuDetailsData