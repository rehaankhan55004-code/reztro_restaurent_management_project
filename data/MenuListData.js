export const menuFilters = {
  categories: [
    { id: 1, name: "All", slug: "all", checked: false },
    { id: 2, name: "Pasta", slug: "pasta", checked: true },
    { id: 3, name: "Chicken", slug: "chicken", checked: true },
    { id: 4, name: "Burgers", slug: "burgers", checked: true },
    { id: 5, name: "Beef", slug: "beef", checked: false },
    { id: 6, name: "Salad", slug: "salad", checked: true },
    { id: 7, name: "Noodles", slug: "noodles", checked: false },
    { id: 8, name: "Bakery", slug: "bakery", checked: false },
    { id: 9, name: "Rice", slug: "rice", checked: false },
    { id: 10, name: "Desserts", slug: "desserts", checked: true },
    { id: 11, name: "Seafood", slug: "seafood", checked: true },
    { id: 12, name: "Beverages", slug: "beverages", checked: false },
    { id: 13, name: "Pizza", slug: "pizza", checked: true },
    { id: 14, name: "Others", slug: "others", checked: false },
  ],

  mealTimes: [
    { id: 1, name: "All", slug: "all", checked: true },
    { id: 2, name: "Snack", slug: "snack", checked: false },
    { id: 3, name: "Breakfast", slug: "breakfast", checked: false },
    { id: 4, name: "Dinner", slug: "dinner", checked: false },
    { id: 5, name: "Lunch", slug: "lunch", checked: false },
  ],

  priceRanges: [
    { id: 1, label: "$5 - $10", min: 5, max: 10, checked: false },
    { id: 2, label: "$20 - $30", min: 20, max: 30, checked: true },
    { id: 3, label: "$10 - $20", min: 10, max: 20, checked: false },
    { id: 4, label: "Above $30", min: 30, max: null, checked: false },
  ],

  ratings: [
    { id: 1, label: "5", value: 5, checked: false },
    { id: 2, label: "4", value: 4, checked: false },
    { id: 3, label: "3", value: 3, checked: false },
    { id: 4, label: "2", value: 2, checked: false },
    { id: 5, label: "1", value: 1, checked: false },
  ],

  promos: [
    { id: 1, name: "Buy 1 Get 1 Free", slug: "buy-1-get-1-free", active: false },
    { id: 2, name: "Seasonal Offers", slug: "seasonal-offers", active: false },
    { id: 3, name: "10% Off", slug: "10-off", active: false },
    { id: 4, name: "Member Discount", slug: "member-discount", active: false },
    { id: 5, name: "All Promo", slug: "all-promo", active: true },
  ],
};

export const menuItems = [
  {
    id: 1,
    name: "Smokey Supreme Pizza",
    category: "Pizza",
    image: "",
    price: 12.0,
    rating: 4.5,
    tags: ["Customizable"],
  },
  {
    id: 2,
    name: "Grilled Salmon",
    category: "Seafood",
    image: "",
    price: 22.0,
    rating: 4.7,
    tags: ["Customizable", "10% Off"],
  },
  {
    id: 3,
    name: "Grilled Chicken Delight",
    category: "Chicken",
    image: "",
    price: 18.0,
    rating: 4.8,
    tags: [],
  },
  {
    id: 4,
    name: "Fiery Shrimp Salad",
    category: "Salad",
    image: "",
    price: 8.0,
    rating: 4.4,
    tags: [],
  },
  {
    id: 5,
    name: "Chocolate Lava Cake",
    category: "Dessert",
    image: "",
    price: 10.0,
    rating: 4.9,
    tags: [],
  },
  {
    id: 6,
    name: "Classic Cheeseburger",
    category: "Burger",
    image: "",
    price: 10.0,
    rating: 4.6,
    tags: ["Customizable", "Buy 1 Get 1 Free"],
  },
  {
    id: 7,
    name: "Spaghetti Carbonara",
    category: "Pasta",
    image: "",
    price: 15.0,
    rating: 4.7,
    tags: ["Seasonal Offer"],
  },
  {
    id: 8,
    name: "Roasted Turkey Legs",
    category: "Chicken",
    image: "",
    price: 8.0,
    rating: 4.5,
    tags: ["Customizable"],
  },
  {
    id: 9,
    name: "Sunny Citrus Cake",
    category: "Dessert",
    image: "",
    price: 8.5,
    rating: 4.8,
    tags: ["Member Discount"],
  },
];

const MenuListData = {
  menuFilters,
  menuItems,
};

export default MenuListData;