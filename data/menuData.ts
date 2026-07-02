export type MenuCategory = 'tacos' | 'mains' | 'lunch'

export type MenuItem = {
  id: string
  name: string
  spanishName?: string
  description: string
  price: number
  category: MenuCategory
  popular?: boolean
}

export const menuItems: MenuItem[] = [
  // TACOS
  {
    id: "taco-asada",
    name: "Asada",
    spanishName: "Carne Asada",
    description: "Grilled steak with cilantro and onions on a handmade corn tortilla",
    price: 2.50,
    category: "tacos",
    popular: true,
  },
  {
    id: "taco-alpastor",
    name: "Al Pastor",
    description: "Marinated pork with pineapple, cilantro and onions",
    price: 2.50,
    category: "tacos",
    popular: true,
  },
  {
    id: "taco-pollo",
    name: "Pollo",
    spanishName: "Chicken",
    description: "Seasoned grilled chicken with cilantro and roasted onions",
    price: 2.50,
    category: "tacos",
  },
  {
    id: "taco-chorizo",
    name: "Chorizo",
    spanishName: "Sausage",
    description: "Savory Mexican chorizo with cilantro and onions",
    price: 2.50,
    category: "tacos",
  },
  {
    id: "taco-carnitas",
    name: "Carnitas",
    spanishName: "Pulled Pork",
    description: "Slow-cooked pulled pork, tender and flavorful",
    price: 2.50,
    category: "tacos",
  },
  {
    id: "taco-birria",
    name: "Birria",
    spanishName: "Beef Chuck Roast",
    description: "Slow-braised beef chuck roast served in a corn tortilla",
    price: 2.50,
    category: "tacos",
    popular: true,
  },
  {
    id: "taco-camarones",
    name: "Camarones",
    spanishName: "Shrimp",
    description: "Seasoned shrimp with cilantro, onions and roasted peppers",
    price: 2.75,
    category: "tacos",
  },
  {
    id: "taco-campechano",
    name: "Campechano",
    spanishName: "Steak & Chorizo",
    description: "Steak and chorizo combo with cilantro and roasted onions",
    price: 3.25,
    category: "tacos",
  },
  {
    id: "taco-cabeza",
    name: "Cabeza",
    spanishName: "Cow's Head",
    description: "Traditional slow-cooked beef head, rich and tender",
    price: 3.25,
    category: "tacos",
  },
  {
    id: "taco-quesobirria",
    name: "Red Taco / Quesobirria",
    description: "Beef chuck roast with cheese, cilantro, roasted onions and beef broth for dipping",
    price: 3.25,
    category: "tacos",
    popular: true,
  },
  {
    id: "taco-texmex",
    name: "Tex Mex",
    description: "Flour tortilla loaded with cilantro, onions, lettuce, tomato and cheese",
    price: 2.75,
    category: "tacos",
  },

  // MAINS
  {
    id: "main-burrito",
    name: "Burrito",
    description: "Meat of your choice with rice, beans, lettuce, tomato, onion, cheese and avocado",
    price: 8.00,
    category: "mains",
  },
  {
    id: "main-quesadilla",
    name: "Quesadilla",
    description: "Meat of your choice with melted cheese and sour cream",
    price: 8.00,
    category: "mains",
  },
  {
    id: "main-torta",
    name: "Torta",
    description: "Mexican sandwich with meat of choice, lettuce, tomato, cheese, onion, jalapeño, mayo and avocado",
    price: 8.00,
    category: "mains",
  },
  {
    id: "main-flautas",
    name: "Flautas (3 pcs)",
    description: "Three crispy rolled tortillas with meat of choice, lettuce, tomato, cheese, jalapeño and avocado",
    price: 7.00,
    category: "mains",
    popular: true,
  },
  {
    id: "main-gorditas",
    name: "Gorditas",
    description: "Thick corn cake stuffed with meat of choice, lettuce, tomato, cheese, jalapeño and avocado",
    price: 3.75,
    category: "mains",
  },
  {
    id: "main-huarache",
    name: "Huarache",
    description: "Oval masa base topped with meat of choice, lettuce, tomato, Mexican cheese, avocado and cilantro",
    price: 4.50,
    category: "mains",
  },
  {
    id: "main-tamales",
    name: "Tamales",
    description: "Verde (Green Chicken) or Rojo (Red Pork) — traditional handmade tamales",
    price: 2.50,
    category: "mains",
  },
  {
    id: "main-diabla",
    name: "Camarones a la Diabla",
    description: "Shrimp in spicy red sauce served with rice and beans",
    price: 13.00,
    category: "mains",
    popular: true,
  },
  {
    id: "main-fajitas",
    name: "Trio Fajitas",
    description: "Sizzling combo of shrimp, chicken and beef with rice, beans, bell peppers and roasted onions",
    price: 13.00,
    category: "mains",
  },

  // LUNCH PLATES
  {
    id: "lunch-asada",
    name: "Lunch de Asada",
    spanishName: "Steak Plate",
    description: "Grilled steak served with rice, beans, jalapeño, roasted onions and tortillas",
    price: 10.35,
    category: "lunch",
  },
  {
    id: "lunch-pollo",
    name: "Lunch de Pollo",
    spanishName: "Chicken Plate",
    description: "Grilled chicken served with rice, beans, jalapeño, roasted onions and tortillas",
    price: 10.35,
    category: "lunch",
  },
  {
    id: "lunch-costilla",
    name: "Lunch de Costilla",
    spanishName: "Ribs Plate",
    description: "Tender ribs served with rice, beans, jalapeño, roasted onions and tortillas",
    price: 10.35,
    category: "lunch",
  },
]

export const menuCategories: { label: string; value: MenuCategory }[] = [
  { label: "🌮 Tacos",        value: "tacos" },
  { label: "🍽️ Mains",       value: "mains" },
  { label: "☀️ Lunch Plates", value: "lunch" },
]
