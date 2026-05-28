import { IMAGES } from "@/lib/constants";

export interface MenuItem {
  id: string;
  category: string;
  nameKey: string;
  descriptionKey: string;
  price: string;
  image: string;
}

export const menuItems: MenuItem[] = [
  // Burgers
  {
    id: "b1",
    category: "burgers",
    nameKey: "The Classic Smash",
    descriptionKey: "Double-patty smash burger with aged cheddar, caramelized onions, and Lakers sauce",
    price: "380 ETB",
    image: IMAGES.food.burger1,
  },
  {
    id: "b2",
    category: "burgers",
    nameKey: "The Bole Burger",
    descriptionKey: "Wagyu beef patty with truffle aioli, arugula, and smoked gouda on brioche",
    price: "520 ETB",
    image: IMAGES.food.burger2,
  },
  // Pizzas
  {
    id: "p1",
    category: "pizzas",
    nameKey: "Truffle Margherita",
    descriptionKey: "San Marzano tomatoes, fresh mozzarella, basil, and black truffle oil",
    price: "420 ETB",
    image: IMAGES.food.pizza1,
  },
  {
    id: "p2",
    category: "pizzas",
    nameKey: "Lakers Supreme",
    descriptionKey: "Pepperoni, Italian sausage, roasted peppers, caramelized onions, mozzarella",
    price: "480 ETB",
    image: IMAGES.food.pizza2,
  },
  // Coffee
  {
    id: "c1",
    category: "coffee",
    nameKey: "Signature Latte",
    descriptionKey: "Ethiopian single-origin espresso with vanilla oat milk and cardamom",
    price: "120 ETB",
    image: IMAGES.drinks.coffee1,
  },
  {
    id: "c2",
    category: "coffee",
    nameKey: "Pour Over Yirgacheffe",
    descriptionKey: "Hand-poured Yirgacheffe single origin with floral and citrus notes",
    price: "150 ETB",
    image: IMAGES.drinks.coffee2,
  },
  // Mocktails
  {
    id: "m1",
    category: "mocktails",
    nameKey: "Bole Sunset",
    descriptionKey: "Passion fruit, mango, hibiscus syrup, sparkling water, smoked rosemary",
    price: "180 ETB",
    image: IMAGES.drinks.mocktail1,
  },
  {
    id: "m2",
    category: "mocktails",
    nameKey: "Addis Fizz",
    descriptionKey: "Elderflower, lime, cucumber, tonic water with a juniper berry garnish",
    price: "160 ETB",
    image: IMAGES.drinks.mocktail2,
  },
  // Desserts
  {
    id: "d1",
    category: "desserts",
    nameKey: "Dark Chocolate Fondant",
    descriptionKey: "Rich chocolate lava cake with vanilla bean ice cream and gold leaf",
    price: "280 ETB",
    image: IMAGES.food.dessert1,
  },
  {
    id: "d2",
    category: "desserts",
    nameKey: "Tiramisu Lakers Style",
    descriptionKey: "Classic tiramisu infused with Ethiopian coffee and amaretto cream",
    price: "260 ETB",
    image: IMAGES.food.dessert2,
  },
  // Brunch
  {
    id: "br1",
    category: "brunch",
    nameKey: "Lakers Benedict",
    descriptionKey: "Poached eggs, smoked salmon, hollandaise on toasted sourdough with avocado",
    price: "340 ETB",
    image: IMAGES.food.brunch,
  },
  // Fusion
  {
    id: "f1",
    category: "fusion",
    nameKey: "Ethiopian Fusion Bowl",
    descriptionKey: "Berbere-spiced grilled chicken with injera croutons, avocado mousse, tikil gomen",
    price: "360 ETB",
    image: IMAGES.food.fusion,
  },
];
