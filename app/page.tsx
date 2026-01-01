"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type MenuCategory =
  | "Soups"
  | "Snacks"
  | "Egg Corner"
  | "Chinese"
  | "Main Course"
  | "Tea & Coffee"
  | "Pizza"
  | "Thali"
  | "South Indian"
  | "Mocktails"
  | "Continental"
  | "Fruit Juice";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  spicy?: boolean;
  tags?: string[];
  image: string;
  recommended?: boolean;
};

type CartItem = {
  id: string;
  quantity: number;
};

const MENU: MenuItem[] = [
  {
    id: "soup-tomato",
    name: "Tomato Soup",
    description: "Classic creamy tomato soup served hot.",
    price: 60,
    category: "Soups",
    tags: ["Veg"],
    image: "/menu/soup-placeholder.svg",
    recommended: true,
  },
  {
    id: "soup-veg-corn",
    name: "Veg. Corn Soup",
    description: "Sweet corn and vegetables in a light broth.",
    price: 70,
    category: "Soups",
    tags: ["Veg"],
    image: "/menu/soup-placeholder.svg",
    recommended: true,
  },
  {
    id: "soup-manchow",
    name: "Manchow Soup",
    description: "Spicy Indo-Chinese soup with crispy noodles.",
    price: 80,
    category: "Soups",
    tags: ["Spicy"],
    image: "/menu/soup-placeholder.svg",
  },
  {
    id: "soup-veg-coriander",
    name: "Veg. Coriander Soup",
    description: "Fragrant coriander flavoured clear vegetable soup.",
    price: 80,
    category: "Soups",
    tags: ["Veg"],
    image: "/menu/soup-placeholder.svg",
  },
  {
    id: "soup-hot-sour",
    name: "Hot & Sour Soup",
    description: "Tangy, spicy soup loaded with veggies.",
    price: 80,
    category: "Soups",
    tags: ["Spicy"],
    image: "/menu/soup-placeholder.svg",
  },
  {
    id: "soup-lung-fung",
    name: "Lung Fung Soup",
    description: "Rich Chinese-style soup with mixed flavours.",
    price: 100,
    category: "Soups",
    image: "/menu/soup-placeholder.svg",
  },
  {
    id: "snack-aloo-tikki-burger",
    name: "Aloo Tikki Burger",
    description: "Crispy aloo tikki patty with chutneys in a soft bun.",
    price: 50,
    category: "Snacks",
    tags: ["Veg"],
    image: "/menu/snack-placeholder.svg",
    recommended: true,
  },
  {
    id: "snack-paneer-burger",
    name: "Paneer Burger",
    description: "Grilled paneer patty with cheese and veggies.",
    price: 60,
    category: "Snacks",
    tags: ["Veg"],
    image: "/menu/snack-placeholder.svg",
  },
  {
    id: "snack-cheese-burger",
    name: "Cheese Burger",
    description: "Cheesy veg patty loaded with sauce.",
    price: 60,
    category: "Snacks",
    tags: ["Veg"],
    image: "/menu/snack-placeholder.svg",
  },
  {
    id: "snack-paneer-hot-dog",
    name: "Paneer Hot Dog",
    description: "Soft roll stuffed with spicy paneer filling.",
    price: 60,
    category: "Snacks",
    tags: ["Veg"],
    image: "/menu/snack-placeholder.svg",
  },
  {
    id: "snack-veg-hot-dog",
    name: "Veg Hot Dog",
    description: "Vegetable filling with sauces in a hot dog bun.",
    price: 60,
    category: "Snacks",
    tags: ["Veg"],
    image: "/menu/snack-placeholder.svg",
  },
  {
    id: "snack-aloo-tikki-wrap",
    name: "Aloo Tikki Wrap",
    description: "Roll stuffed with crispy aloo tikki and veggies.",
    price: 55,
    category: "Snacks",
    tags: ["Veg"],
    image: "/menu/snack-placeholder.svg",
  },
  {
    id: "snack-veg-wrap",
    name: "Veg Wrap",
    description: "Mixed veg filling wrapped in a soft roti.",
    price: 70,
    category: "Snacks",
    tags: ["Veg"],
    image: "/menu/snack-placeholder.svg",
  },
  {
    id: "snack-cheese-grilled-sandwich",
    name: "Cheese Grilled Sandwich",
    description: "Grilled bread with gooey cheese.",
    price: 60,
    category: "Snacks",
    tags: ["Veg"],
    image: "/menu/snack-placeholder.svg",
  },
  {
    id: "snack-veg-grilled-sandwich",
    name: "Veg. Grilled Sandwich",
    description: "Grilled sandwich loaded with vegetables.",
    price: 50,
    category: "Snacks",
    tags: ["Veg"],
    image: "/menu/snack-placeholder.svg",
  },
  {
    id: "snack-paneer-grilled-sandwich",
    name: "Paneer Grilled Sandwich",
    description: "Grilled sandwich stuffed with paneer.",
    price: 60,
    category: "Snacks",
    tags: ["Veg"],
    image: "/menu/snack-placeholder.svg",
  },
  {
    id: "snack-paneer-wrap",
    name: "Paneer Wrap",
    description: "Paneer tikka style filling wrapped in roti.",
    price: 70,
    category: "Snacks",
    tags: ["Veg"],
    image: "/menu/snack-placeholder.svg",
  },
  {
    id: "snack-veg-spring-roll-1pc",
    name: "Veg Spring Roll (1 Pc)",
    description: "Single crispy veg spring roll.",
    price: 60,
    category: "Snacks",
    tags: ["Veg"],
    image: "/menu/snack-placeholder.svg",
  },
  {
    id: "snack-veg-spring-roll-2pc",
    name: "Veg Spring Roll (2 Pcs)",
    description: "Two crispy veg spring rolls.",
    price: 100,
    category: "Snacks",
    tags: ["Veg"],
    image: "/menu/snack-placeholder.svg",
  },
  {
    id: "snack-hara-bhara-kabab",
    name: "Hara Bhara Kabab",
    description: "Pan-fried kababs made with spinach and peas.",
    price: 120,
    category: "Snacks",
    tags: ["Veg"],
    image: "/menu/snack-placeholder.svg",
  },
  {
    id: "snack-dahi-ke-shole",
    name: "Dahi Ke Shole",
    description: "Crispy bread pockets stuffed with hung curd filling.",
    price: 120,
    category: "Snacks",
    tags: ["Veg"],
    image: "/menu/snack-placeholder.svg",
  },
  {
    id: "snack-peanut-chat",
    name: "Peanut Chat",
    description: "Spiced peanuts tossed with onion, tomato and masala.",
    price: 80,
    category: "Snacks",
    image: "/menu/snack-placeholder.svg",
  },
  {
    id: "snack-vada-pav",
    name: "Vada Pav",
    description: "Mumbai style vada pav with chutneys.",
    price: 50,
    category: "Snacks",
    tags: ["Veg"],
    image: "/menu/snack-placeholder.svg",
  },
  {
    id: "snack-cheese-corn-roll-1pc",
    name: "Cheese Corn Roll (1 Pc)",
    description: "Single roll stuffed with cheese and corn.",
    price: 70,
    category: "Snacks",
    tags: ["Veg"],
    image: "/menu/snack-placeholder.svg",
  },
  {
    id: "snack-cheese-corn-roll-2pc",
    name: "Cheese Corn Roll (2 Pcs)",
    description: "Two rolls stuffed with cheese and corn.",
    price: 120,
    category: "Snacks",
    tags: ["Veg"],
    image: "/menu/snack-placeholder.svg",
  },
  {
    id: "snack-paneer-roll",
    name: "Paneer Roll",
    description: "Roll stuffed with paneer and veggies.",
    price: 100,
    category: "Snacks",
    tags: ["Veg"],
    image: "/menu/snack-placeholder.svg",
  },
  {
    id: "snack-veg-roll",
    name: "Veg Roll",
    description: "Simple veg roll with chutneys.",
    price: 60,
    category: "Snacks",
    tags: ["Veg"],
    image: "/menu/snack-placeholder.svg",
  },
  {
    id: "snack-aloo-tikki-roll",
    name: "Aloo Tikki Roll",
    description: "Roll filled with aloo tikki and sauces.",
    price: 70,
    category: "Snacks",
    tags: ["Veg"],
    image: "/menu/snack-placeholder.svg",
  },
  {
    id: "chinese-veg-noodle",
    name: "Veg. Noodle",
    description: "Stir-fried veg noodles with soy and veggies.",
    price: 50,
    category: "Chinese",
    tags: ["Veg"],
    image: "/menu/chinese-placeholder.svg",
    recommended: true,
  },
  {
    id: "chinese-hakka-noodle",
    name: "Hakka Noodle",
    description: "Street-style hakka noodles tossed on high flame.",
    price: 80,
    category: "Chinese",
    tags: ["Veg"],
    image: "/menu/chinese-placeholder.svg",
  },
  {
    id: "chinese-chilli-garlic-noodle",
    name: "Chilli Garlic Noodle",
    description: "Spicy noodles with chilli and garlic.",
    price: 70,
    category: "Chinese",
    tags: ["Spicy"],
    image: "/menu/chinese-placeholder.svg",
  },
  {
    id: "chinese-singapuri-noodle",
    name: "Singapuri Noodle",
    description: "Indo-Singapore style spicy noodles.",
    price: 80,
    category: "Chinese",
    tags: ["Spicy"],
    image: "/menu/chinese-placeholder.svg",
  },
  {
    id: "chinese-chilli-potato",
    name: "Chilli Potato",
    description: "Crispy potato tossed in chilli sauce.",
    price: 80,
    category: "Chinese",
    tags: ["Spicy"],
    image: "/menu/chinese-placeholder.svg",
  },
  {
    id: "chinese-honey-chilli-potato",
    name: "Honey Chilli Potato",
    description: "Sweet & spicy honey chilli potato.",
    price: 90,
    category: "Chinese",
    tags: ["Spicy"],
    image: "/menu/chinese-placeholder.svg",
  },
  {
    id: "chinese-potato-fries",
    name: "Potato Fries",
    description: "Crispy classic french fries.",
    price: 80,
    category: "Chinese",
    tags: ["Veg"],
    image: "/menu/chinese-placeholder.svg",
  },
  {
    id: "chinese-veg-steam-momos",
    name: "Veg. Steam Momos",
    description: "Steamed veg momos with chutney.",
    price: 50,
    category: "Chinese",
    tags: ["Veg"],
    image: "/menu/chinese-placeholder.svg",
  },
  {
    id: "chinese-veg-fried-momos",
    name: "Veg. Fried Momos",
    description: "Crispy fried veg momos.",
    price: 70,
    category: "Chinese",
    tags: ["Veg"],
    image: "/menu/chinese-placeholder.svg",
  },
  {
    id: "chinese-veg-kurkure-momos",
    name: "Veg. Kurkure Momos",
    description: "Crumb-fried crunchy veg momos.",
    price: 80,
    category: "Chinese",
    tags: ["Veg"],
    image: "/menu/chinese-placeholder.svg",
  },
  {
    id: "chinese-paneer-steam-momos",
    name: "Paneer Steam Momos",
    description: "Steamed momos stuffed with paneer.",
    price: 70,
    category: "Chinese",
    tags: ["Veg"],
    image: "/menu/chinese-placeholder.svg",
  },
  {
    id: "chinese-paneer-fried-momos",
    name: "Paneer Fried Momos",
    description: "Fried momos stuffed with paneer.",
    price: 80,
    category: "Chinese",
    tags: ["Veg"],
    image: "/menu/chinese-placeholder.svg",
  },
  {
    id: "chinese-paneer-kurkure-momos",
    name: "Paneer Kurkure Momos",
    description: "Crispy kurkure paneer momos.",
    price: 100,
    category: "Chinese",
    tags: ["Veg"],
    image: "/menu/chinese-placeholder.svg",
  },
  {
    id: "chinese-peri-peri-fries",
    name: "Peri Peri Fries",
    description: "Fries tossed in peri peri masala.",
    price: 100,
    category: "Chinese",
    tags: ["Spicy"],
    image: "/menu/chinese-placeholder.svg",
  },
  {
    id: "chinese-veg-manchurian",
    name: "Veg. Manchurian",
    description: "Veg manchurian balls in gravy.",
    price: 100,
    category: "Chinese",
    tags: ["Spicy"],
    image: "/menu/chinese-placeholder.svg",
  },
  {
    id: "chinese-paneer-finger-5",
    name: "Paneer Finger (5 Pcs.)",
    description: "Five crispy paneer fingers.",
    price: 100,
    category: "Chinese",
    tags: ["Veg"],
    image: "/menu/chinese-placeholder.svg",
  },
  {
    id: "chinese-paneer-finger-10",
    name: "Paneer Finger (10 Pcs.)",
    description: "Ten crispy paneer fingers.",
    price: 120,
    category: "Chinese",
    tags: ["Veg"],
    image: "/menu/chinese-placeholder.svg",
  },
  {
    id: "chinese-veg-chopsey",
    name: "Veg. Chopsey",
    description: "Crispy noodles topped with veg gravy.",
    price: 80,
    category: "Chinese",
    tags: ["Veg"],
    image: "/menu/chinese-placeholder.svg",
  },
  {
    id: "chinese-american-chopsey",
    name: "American Chopsey",
    description: "American style crispy noodles with sauce.",
    price: 100,
    category: "Chinese",
    image: "/menu/chinese-placeholder.svg",
  },
  {
    id: "chinese-italian-chopsey",
    name: "Italian Chopsey",
    description: "Fusion chopsey with Italian-style flavours.",
    price: 120,
    category: "Chinese",
    image: "/menu/chinese-placeholder.svg",
  },
  {
    id: "chinese-marinated-momos",
    name: "Marinated Momos",
    description: "Momos in special marinated sauce.",
    price: 120,
    category: "Chinese",
    image: "/menu/chinese-placeholder.svg",
  },
  {
    id: "chinese-creamy-momos",
    name: "Creamy Momos",
    description: "Momos tossed in creamy sauce.",
    price: 120,
    category: "Chinese",
    image: "/menu/chinese-placeholder.svg",
  },
  {
    id: "chinese-cheese-corn-momos",
    name: "Cheese Corn Momos",
    description: "Momos stuffed with cheese and corn.",
    price: 120,
    category: "Chinese",
    image: "/menu/chinese-placeholder.svg",
  },
  {
    id: "egg-boiled-1pc",
    name: "Boiled Egg (1 Pc)",
    description: "Single boiled egg with salt & pepper.",
    price: 10,
    category: "Egg Corner",
    image: "/menu/egg-placeholder.svg",
  },
  {
    id: "egg-fried-1pc",
    name: "Fried Egg (1 Pc)",
    description: "Sunny side up fried egg.",
    price: 15,
    category: "Egg Corner",
    image: "/menu/egg-placeholder.svg",
  },
  {
    id: "egg-plain-omelette",
    name: "Plain Omelette",
    description: "Classic masala omelette.",
    price: 50,
    category: "Egg Corner",
    image: "/menu/egg-placeholder.svg",
  },
  {
    id: "egg-cheese-omelette",
    name: "Cheese Omelette",
    description: "Omelette stuffed with melted cheese.",
    price: 70,
    category: "Egg Corner",
    image: "/menu/egg-placeholder.svg",
  },
  {
    id: "egg-burger",
    name: "Egg Burger",
    description: "Soft bun with fried egg patty.",
    price: 60,
    category: "Egg Corner",
    image: "/menu/egg-placeholder.svg",
  },
  {
    id: "egg-roll-2egg",
    name: "Egg Roll (2 Egg)",
    description: "Double egg roll with onions & sauces.",
    price: 70,
    category: "Egg Corner",
    image: "/menu/egg-placeholder.svg",
  },
  {
    id: "egg-bhurji-1egg",
    name: "Egg Bhurji (1 Egg)",
    description: "Scrambled masala egg.",
    price: 30,
    category: "Egg Corner",
    image: "/menu/egg-placeholder.svg",
  },
  {
    id: "egg-curry",
    name: "Egg Curry",
    description: "Boiled eggs in spicy curry gravy.",
    price: 50,
    category: "Egg Corner",
    image: "/menu/egg-placeholder.svg",
  },
  {
    id: "egg-corna",
    name: "Egg Korma",
    description: "Egg and corn style preparation.",
    price: 70,
    category: "Egg Corner",
    image: "/menu/egg-placeholder.svg",
  },
  {
    id: "egg-paratha",
    name: "Egg Paratha",
    description: "Stuffed egg paratha served hot.",
    price: 60,
    category: "Egg Corner",
    image: "/menu/egg-placeholder.svg",
  },
  {
    id: "egg-fried-rice",
    name: "Egg Fried Rice",
    description: "Fried rice tossed with egg and veggies.",
    price: 120,
    category: "Egg Corner",
    image: "/menu/egg-placeholder.svg",
  },
  {
    id: "egg-rumali-roti",
    name: "Rumali Roti",
    description: "Thin soft rumali roti.",
    price: 10,
    category: "Egg Corner",
    image: "/menu/egg-placeholder.svg",
  },
  {
    id: "main-veg-biryani",
    name: "Veg Biryani",
    description: "Aromatic vegetable biryani served with raita.",
    price: 50,
    category: "Main Course",
    tags: ["Veg"],
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-veg-biryani-full",
    name: "Veg Biryani Full",
    description: "Full plate veg biryani for a hearty meal.",
    price: 80,
    category: "Main Course",
    tags: ["Veg"],
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-aloo-paratha-1",
    name: "Aloo Paratha (1 Pc.)",
    description: "Single stuffed aloo paratha with curd & pickle.",
    price: 40,
    category: "Main Course",
    tags: ["Veg"],
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-aloo-paratha-2",
    name: "Aloo Paratha (2 Pcs.)",
    description: "Two stuffed aloo parathas with sides.",
    price: 60,
    category: "Main Course",
    tags: ["Veg"],
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-aloo-pyaz-paratha-1",
    name: "Aloo Piyaj Paratha (1 Pc.)",
    description: "Single aloo-onion stuffed paratha.",
    price: 60,
    category: "Main Course",
    tags: ["Veg"],
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-aloo-pyaz-paratha-2",
    name: "Aloo Piyaj Paratha (2 Pcs.)",
    description: "Two aloo-onion stuffed parathas.",
    price: 70,
    category: "Main Course",
    tags: ["Veg"],
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-gobhi-paratha-1",
    name: "Gobhi Paratha (1 Pc.)",
    description: "Single gobhi stuffed paratha.",
    price: 40,
    category: "Main Course",
    tags: ["Veg"],
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-gobhi-paratha-2",
    name: "Gobhi Paratha (2 Pcs.)",
    description: "Two gobhi stuffed parathas.",
    price: 80,
    category: "Main Course",
    tags: ["Veg"],
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-mooli-paratha-1",
    name: "Mooli Paratha (1 Pc.)",
    description: "Single mooli stuffed paratha.",
    price: 40,
    category: "Main Course",
    tags: ["Veg"],
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-mooli-paratha-2",
    name: "Mooli Paratha (2 Pcs.)",
    description: "Two mooli stuffed parathas.",
    price: 80,
    category: "Main Course",
    tags: ["Veg"],
     image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-mix-paratha-1",
    name: "Mix Paratha (1 Pc.)",
    description: "Single mixed veg stuffed paratha.",
    price: 50,
    category: "Main Course",
    tags: ["Veg"],
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-mix-paratha-2",
    name: "Mix Paratha (2 Pcs.)",
    description: "Two mixed veg stuffed parathas.",
    price: 100,
    category: "Main Course",
    tags: ["Veg"],
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-paneer-paratha-1",
    name: "Paneer Paratha (1 Pc.)",
    description: "Single paneer stuffed paratha.",
    price: 50,
    category: "Main Course",
    tags: ["Veg"],
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-paneer-paratha-2",
    name: "Paneer Paratha (2 Pcs.)",
    description: "Two paneer stuffed parathas.",
    price: 100,
    category: "Main Course",
    tags: ["Veg"],
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-pyaj-paratha-1",
    name: "Piyaj Paratha (1 Pc.)",
    description: "Single onion stuffed paratha.",
    price: 50,
    category: "Main Course",
    tags: ["Veg"],
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-pyaj-paratha-2",
    name: "Piyaj Paratha (2 Pcs.)",
    description: "Two onion stuffed parathas.",
    price: 80,
    category: "Main Course",
    tags: ["Veg"],
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-chole-bhature",
    name: "Chole Bhature",
    description: "Classic chole served with two fluffy bhature.",
    price: 70,
    category: "Main Course",
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-puri-sabji",
    name: "Puri Sabji",
    description: "Puris served with aloo ki sabji.",
    price: 70,
    category: "Main Course",
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-rajma-chawal",
    name: "Rajma Chawal",
    description: "Homestyle rajma served with steamed rice.",
    price: 70,
    category: "Main Course",
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-paneer-chawal",
    name: "Paneer Chawal",
    description: "Paneer gravy served with rice.",
    price: 100,
    category: "Main Course",
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-chole-chawal",
    name: "Chole Chawal",
    description: "Chole served with rice.",
    price: 80,
    category: "Main Course",
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-pav-bhaji",
    name: "Pav Bhaji",
    description: "Butter toasted pav with spicy bhaji.",
    price: 80,
    category: "Main Course",
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-dal-tadka",
    name: "Dal Tadka",
    description: "Yellow dal tempered with ghee tadka.",
    price: 60,
    category: "Main Course",
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-dal-makhani",
    name: "Dal Makhani",
    description: "Slow cooked creamy black dal.",
    price: 70,
    category: "Main Course",
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-aloo-gobhi",
    name: "Aloo Gobhi",
    description: "Dry aloo gobhi sabji.",
    price: 60,
    category: "Main Course",
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-aloo-matar",
    name: "Aloo Matar",
    description: "Potato and peas curry.",
    price: 70,
    category: "Main Course",
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-matar-paneer",
    name: "Matar Paneer",
    description: "Peas and paneer curry.",
    price: 80,
    category: "Main Course",
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-aloo-tamatar-masala",
    name: "Aloo Tamatar Masala Sabji",
    description: "Tangy tomato based aloo sabji.",
    price: 70,
    category: "Main Course",
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-shahi-paneer",
    name: "Shahi Paneer",
    description: "Rich and creamy shahi paneer gravy.",
    price: 100,
    category: "Main Course",
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-shahi-paneer-chawal",
    name: "Shahi Paneer Chawal",
    description: "Shahi paneer served with rice.",
    price: 120,
    category: "Main Course",
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-kadhai-paneer",
    name: "Kadhai Paneer",
    description: "Spicy kadhai style paneer.",
    price: 120,
    category: "Main Course",
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-kadhai-paneer-chawal",
    name: "Kadhai Paneer Chawal",
    description: "Kadhai paneer served with rice.",
    price: 120,
    category: "Main Course",
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-matar-paneer-chawal",
    name: "Matar Paneer Chawal",
    description: "Matar paneer served with rice.",
    price: 100,
    category: "Main Course",
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-paneer-matar-masala",
    name: "Paneer Matar Masala",
    description: "Paneer and peas in masala gravy.",
    price: 120,
    category: "Main Course",
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-paneer-lababdar",
    name: "Paneer Lababdar",
    description: "Restaurant style paneer lababdar.",
    price: 120,
    category: "Main Course",
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-paneer-bhurji",
    name: "Paneer Bhurji",
    description: "Scrambled paneer with spices.",
    price: 150,
    category: "Main Course",
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "main-kadhai-chaap",
    name: "Kadhai Chaap",
    description: "Soya chaap cooked in kadhai masala.",
    price: 150,
    category: "Main Course",
    image: "/menu/maincourse-placeholder.svg",
  },
  {
    id: "tea-choti",
    name: "Choti Tea",
    description: "Small cutting chai.",
    price: 10,
    category: "Tea & Coffee",
    image: "/menu/tea-coffee-placeholder.svg",
  },
  {
    id: "tea-badi",
    name: "Badi Tea",
    description: "Regular cup of hot tea.",
    price: 20,
    category: "Tea & Coffee",
    image: "/menu/tea-coffee-placeholder.svg",
  },
  {
    id: "tea-kullad",
    name: "Kullad Tea",
    description: "Tea served in clay kullad.",
    price: 30,
    category: "Tea & Coffee",
    image: "/menu/tea-coffee-placeholder.svg",
  },
  {
    id: "tea-gud-shakkar",
    name: "Gud Shakkar Tea",
    description: "Tea sweetened with jaggery and sugar.",
    price: 15,
    category: "Tea & Coffee",
    image: "/menu/tea-coffee-placeholder.svg",
  },
  {
    id: "tea-gud-shakkar-special",
    name: "Gud Shakkar Tea Special",
    description: "Stronger gud shakkar tea.",
    price: 25,
    category: "Tea & Coffee",
    image: "/menu/tea-coffee-placeholder.svg",
  },
  {
    id: "tea-kullad-gud-shakkar",
    name: "Kullad Gud Shakkar Tea",
    description: "Gud shakkar tea served in kullad.",
    price: 35,
    category: "Tea & Coffee",
    image: "/menu/tea-coffee-placeholder.svg",
  },
  {
    id: "coffee-hot",
    name: "Hot Coffee",
    description: "Regular hot coffee.",
    price: 20,
    category: "Tea & Coffee",
    image: "/menu/tea-coffee-placeholder.svg",
  },
  {
    id: "coffee-cold",
    name: "Cold Coffee",
    description: "Classic cold coffee.",
    price: 70,
    category: "Tea & Coffee",
    image: "/menu/tea-coffee-placeholder.svg",
  },
  {
    id: "coffee-cold-mocha",
    name: "Cold Mocha Coffee",
    description: "Cold coffee with chocolate.",
    price: 90,
    category: "Tea & Coffee",
    image: "/menu/tea-coffee-placeholder.svg",
  },
  {
    id: "coffee-cold-with-icecream",
    name: "Cold Coffee with Ice Cream",
    description: "Cold coffee topped with ice cream.",
    price: 90,
    category: "Tea & Coffee",
    image: "/menu/tea-coffee-placeholder.svg",
  },
  {
    id: "tea-lemon-hot",
    name: "Lemon Hot Tea",
    description: "Hot lemon tea.",
    price: 40,
    category: "Tea & Coffee",
    image: "/menu/tea-coffee-placeholder.svg",
  },
  {
    id: "tea-lemon-ice",
    name: "Lemon Ice Tea",
    description: "Chilled lemon iced tea.",
    price: 80,
    category: "Tea & Coffee",
    image: "/menu/tea-coffee-placeholder.svg",
  },
  {
    id: "tea-peach-ice",
    name: "Peach Ice Tea",
    description: "Chilled peach flavoured iced tea.",
    price: 80,
    category: "Tea & Coffee",
    image: "/menu/tea-coffee-placeholder.svg",
  },
  {
    id: "tea-green-ice",
    name: "Green Ice Tea",
    description: "Iced green tea.",
    price: 90,
    category: "Tea & Coffee",
    image: "/menu/tea-coffee-placeholder.svg",
  },
  {
    id: "tea-lemon-mint-ice",
    name: "Lemon Mint Ice Tea",
    description: "Lemon and mint flavoured iced tea.",
    price: 90,
    category: "Tea & Coffee",
    image: "/menu/tea-coffee-placeholder.svg",
  },
  {
    id: "coffee-hot-mocha",
    name: "Hot Mocha Coffee",
    description: "Hot chocolate flavoured coffee.",
    price: 50,
    category: "Tea & Coffee",
    image: "/menu/tea-coffee-placeholder.svg",
  },
  {
    id: "coffee- caramel-cold",
    name: "Caramel Cold Coffee",
    description: "Cold coffee with caramel flavour.",
    price: 100,
    category: "Tea & Coffee",
    image: "/menu/tea-coffee-placeholder.svg",
  },
  {
    id: "coffee-hazelnut-cold",
    name: "Hazelnut Cold Coffee",
    description: "Cold coffee with hazelnut flavour.",
    price: 100,
    category: "Tea & Coffee",
    image: "/menu/tea-coffee-placeholder.svg",
  },
  {
    id: "coffee-peach-cold",
    name: "Peach Cold Coffee",
    description: "Cold coffee with peach flavour.",
    price: 100,
    category: "Tea & Coffee",
    image: "/menu/tea-coffee-placeholder.svg",
  },
  {
    id: "coffee-vanilla-cold",
    name: "Vanilla Cold Coffee",
    description: "Cold coffee with vanilla flavour.",
    price: 100,
    category: "Tea & Coffee",
    image: "/menu/tea-coffee-placeholder.svg",
  },
  {
    id: "pizza-onion-capsicum",
    name: "Onion Capsicum Pizza",
    description: "Veg pizza topped with onion and capsicum.",
    price: 120,
    category: "Pizza",
    image: "/menu/pizza-margherita.svg",
    tags: ["Veg"],
  },
  {
    id: "pizza-onion-corn",
    name: "Onion & Corn Pizza",
    description: "Pizza with onion and sweet corn.",
    price: 120,
    category: "Pizza",
    image: "/menu/pizza-margherita.svg",
    tags: ["Veg"],
  },
  {
    id: "pizza-tomato",
    name: "Tomato Pizza",
    description: "Simple tomato and cheese pizza.",
    price: 120,
    category: "Pizza",
    image: "/menu/pizza-margherita.svg",
    tags: ["Veg"],
  },
  {
    id: "pizza-cheese-corn",
    name: "Cheese Corn Pizza",
    description: "Cheesy pizza loaded with sweet corn.",
    price: 150,
    category: "Pizza",
    image: "/menu/pizza-paneer.svg",
    tags: ["Veg"],
  },
  {
    id: "pizza-veg-mighty",
    name: "Veg. Mighty Pizza",
    description: "Loaded veg pizza with assorted toppings.",
    price: 200,
    category: "Pizza",
    image: "/menu/pizza-margherita.svg",
    tags: ["Veg"],
    recommended: true,
  },
  {
    id: "pizza-farm-house",
    name: "Farm House Pizza",
    description: "Veg farmhouse-style pizza.",
    price: 200,
    category: "Pizza",
    image: "/menu/pizza-margherita.svg",
    tags: ["Veg"],
  },
  {
    id: "pizza-tandoori-paneer",
    name: "Tandoori Paneer Pizza",
    description: "Pizza with tandoori paneer topping.",
    price: 200,
    category: "Pizza",
    image: "/menu/pizza-paneer.svg",
    tags: ["Veg"],
    recommended: true,
  },
  {
    id: "pizza-pepri-paneer",
    name: "Pepri Paneer Pizza",
    description: "Spiced paneer pizza.",
    price: 200,
    category: "Pizza",
    image: "/menu/pizza-paneer.svg",
    tags: ["Veg"],
  },
  {
    id: "pizza-paneer-veggies",
    name: "Paneer Veggies Pizza",
    description: "Paneer and mixed veggie pizza.",
    price: 180,
    category: "Pizza",
    image: "/menu/pizza-paneer.svg",
    tags: ["Veg"],
  },
  {
    id: "thali-medium",
    name: "Medium Thali",
    description: "1 sabji, chawal, 2 roti, dal, rajma/chole.",
    price: 70,
    category: "Thali",
    image: "/menu/maincourse-placeholder.svg",
    tags: ["Veg"],
  },
  {
    id: "thali-delux",
    name: "Delux Thali",
    description: "2 sabji, chawal, 2 roti, dal, rajma/chole.",
    price: 120,
    category: "Thali",
    image: "/menu/maincourse-placeholder.svg",
    tags: ["Veg"],
  },
  {
    id: "thali-maharaja",
    name: "Maharaja Thali",
    description:
      "Kadhai paneer, dal makhani, 2 roti, chawal, salad, raita.",
    price: 150,
    category: "Thali",
    image: "/menu/maincourse-placeholder.svg",
    tags: ["Veg"],
    recommended: true,
  },
  {
    id: "south-masala-dosa",
    name: "Masala Dosa",
    description: "Crispy dosa stuffed with spiced potato masala.",
    price: 100,
    category: "South Indian",
    image: "/menu/southindian-placeholder.svg",
    tags: ["Veg"],
  },
  {
    id: "south-plain-dosa",
    name: "Plain Dosa",
    description: "Crispy plain dosa served with chutney and sambar.",
    price: 80,
    category: "South Indian",
    image: "/menu/southindian-placeholder.svg",
    tags: ["Veg"],
  },
  {
    id: "south-paneer-masala-dosa",
    name: "Paneer Masala Dosa",
    description: "Masala dosa with paneer filling.",
    price: 120,
    category: "South Indian",
    image: "/menu/southindian-placeholder.svg",
    tags: ["Veg"],
  },
  {
    id: "south-sambhar-vada",
    name: "Sambhar Vada (1 Pc)",
    description: "Medu vada served in hot sambar.",
    price: 50,
    category: "South Indian",
    image: "/menu/southindian-placeholder.svg",
    tags: ["Veg"],
  },
  {
    id: "south-uttapam",
    name: "Uttapam",
    description: "Thick dosa topped with veggies.",
    price: 110,
    category: "South Indian",
    image: "/menu/southindian-placeholder.svg",
    tags: ["Veg"],
  },
  {
    id: "south-idli-sambhar",
    name: "Idli Sambhar (1 Pc)",
    description: "Soft idli served with sambar.",
    price: 40,
    category: "South Indian",
    image: "/menu/southindian-placeholder.svg",
    tags: ["Veg"],
  },
  {
    id: "south-idli-fried",
    name: "Idli Fried",
    description: "Fried idli tossed with spices.",
    price: 80,
    category: "South Indian",
    image: "/menu/southindian-placeholder.svg",
    tags: ["Veg"],
  },
  {
    id: "mocktail-virgin-mojito",
    name: "Virgin Mojito",
    description: "Classic mint and lemon mocktail.",
    price: 70,
    category: "Mocktails",
    image: "/menu/drink-lime.svg",
  },
  {
    id: "mocktail-blue-laguane",
    name: "Blue Laguane",
    description: "Blue citrus mocktail.",
    price: 80,
    category: "Mocktails",
    image: "/menu/drink-lime.svg",
  },
  {
    id: "mocktail-kiwi",
    name: "Kiwi",
    description: "Kiwi flavoured mocktail.",
    price: 70,
    category: "Mocktails",
    image: "/menu/drink-lime.svg",
  },
  {
    id: "mocktail-black-current",
    name: "Black Current",
    description: "Black currant flavoured mocktail.",
    price: 70,
    category: "Mocktails",
    image: "/menu/drink-lime.svg",
  },
  {
    id: "mocktail-peach",
    name: "Peach",
    description: "Peach flavoured mocktail.",
    price: 70,
    category: "Mocktails",
    image: "/menu/drink-lime.svg",
  },
  {
    id: "mocktail-green-apple",
    name: "Green Apple",
    description: "Green apple flavoured mocktail.",
    price: 80,
    category: "Mocktails",
    image: "/menu/drink-lime.svg",
  },
  {
    id: "mocktail-shikanji",
    name: "Shikanji",
    description: "Traditional lemon masala drink.",
    price: 50,
    category: "Mocktails",
    image: "/menu/drink-lime.svg",
  },
  {
    id: "mocktail-fresh-lime-soda",
    name: "Fresh Lime Soda",
    description: "Refreshing lime soda.",
    price: 60,
    category: "Mocktails",
    image: "/menu/drink-lime.svg",
  },
  {
    id: "mocktail-soda-shikanji",
    name: "Soda Shikanji",
    description: "Sparkling shikanji soda.",
    price: 50,
    category: "Mocktails",
    image: "/menu/drink-lime.svg",
  },
  {
    id: "mocktail-green-mint",
    name: "Green Mint",
    description: "Cool mint drink.",
    price: 70,
    category: "Mocktails",
    image: "/menu/drink-lime.svg",
  },
  {
    id: "mocktail-mint-blue-mojito",
    name: "Mint Blue Mojito",
    description: "Minty blue mojito mocktail.",
    price: 80,
    category: "Mocktails",
    image: "/menu/drink-lime.svg",
  },
  {
    id: "mocktail-orange-qummin-middle",
    name: "Orange Qummin Middle",
    description: "Orange and cumin flavoured mocktail.",
    price: 90,
    category: "Mocktails",
    image: "/menu/drink-lime.svg",
  },
  {
    id: "mocktail-lemon-ginger-honey",
    name: "Lemon Ginger Honey",
    description: "Warm lemon, ginger and honey drink.",
    price: 90,
    category: "Mocktails",
    image: "/menu/drink-lime.svg",
  },
  {
    id: "mocktail-litchi",
    name: "Litchi Mocktail",
    description: "Sweet litchi flavoured mocktail.",
    price: 80,
    category: "Mocktails",
    image: "/menu/drink-lime.svg",
  },
  {
    id: "continental-white-sauce-pasta",
    name: "White Sauce Pasta",
    description: "Creamy white sauce pasta.",
    price: 100,
    category: "Continental",
    image: "/menu/snack-placeholder.svg",
    tags: ["Veg"],
  },
  {
    id: "continental-red-sauce-pasta",
    name: "Red Sauce Pasta",
    description: "Tangy red sauce pasta.",
    price: 100,
    category: "Continental",
    image: "/menu/snack-placeholder.svg",
    tags: ["Veg"],
  },
  {
    id: "continental-mix-sauce-pasta",
    name: "Mix Sauce Pasta",
    description: "Combination of red and white sauces.",
    price: 120,
    category: "Continental",
    image: "/menu/snack-placeholder.svg",
    tags: ["Veg"],
  },
  {
    id: "continental-masala-pasta",
    name: "Masala Pasta",
    description: "Indian spiced pasta.",
    price: 100,
    category: "Continental",
    image: "/menu/snack-placeholder.svg",
    tags: ["Veg"],
  },
  {
    id: "continental-tandoori-sauce-pasta",
    name: "Tandoori Sauce Pasta",
    description: "Pasta tossed in tandoori sauce.",
    price: 120,
    category: "Continental",
    image: "/menu/snack-placeholder.svg",
    tags: ["Veg"],
  },
  {
    id: "juice-mosambi-small",
    name: "Mosambi Juice (Small)",
    description: "Fresh mosambi juice, small glass.",
    price: 40,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-mosambi-medium",
    name: "Mosambi Juice (Medium)",
    description: "Fresh mosambi juice, medium glass.",
    price: 50,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-mosambi-large",
    name: "Mosambi Juice (Large)",
    description: "Fresh mosambi juice, large glass.",
    price: 60,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-mosambi-xl",
    name: "Mosambi Juice (Extra Large)",
    description: "Fresh mosambi juice, extra large glass.",
    price: 80,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-pineapple-small",
    name: "Pineapple Juice (Small)",
    description: "Pineapple juice, small glass.",
    price: 40,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-pineapple-medium",
    name: "Pineapple Juice (Medium)",
    description: "Pineapple juice, medium glass.",
    price: 50,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-pineapple-large",
    name: "Pineapple Juice (Large)",
    description: "Pineapple juice, large glass.",
    price: 60,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-pineapple-xl",
    name: "Pineapple Juice (Extra Large)",
    description: "Pineapple juice, extra large glass.",
    price: 80,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-orange-small",
    name: "Orange Juice (Small)",
    description: "Orange juice, small glass.",
    price: 30,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-orange-medium",
    name: "Orange Juice (Medium)",
    description: "Orange juice, medium glass.",
    price: 40,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-orange-large",
    name: "Orange Juice (Large)",
    description: "Orange juice, large glass.",
    price: 60,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-orange-xl",
    name: "Orange Juice (Extra Large)",
    description: "Orange juice, extra large glass.",
    price: 80,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-mixfruit-small",
    name: "Mix Fruit Juice (Small)",
    description: "Mixed fruit juice, small glass.",
    price: 40,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-mixfruit-medium",
    name: "Mix Fruit Juice (Medium)",
    description: "Mixed fruit juice, medium glass.",
    price: 50,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-mixfruit-large",
    name: "Mix Fruit Juice (Large)",
    description: "Mixed fruit juice, large glass.",
    price: 60,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-mixfruit-xl",
    name: "Mix Fruit Juice (Extra Large)",
    description: "Mixed fruit juice, extra large glass.",
    price: 80,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-mosambi-pineapple-small",
    name: "Mosambi & Pineapple Juice (Small)",
    description: "Blend of mosambi and pineapple, small.",
    price: 50,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-mosambi-pineapple-medium",
    name: "Mosambi & Pineapple Juice (Medium)",
    description: "Blend of mosambi and pineapple, medium.",
    price: 60,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-mosambi-pineapple-large",
    name: "Mosambi & Pineapple Juice (Large)",
    description: "Blend of mosambi and pineapple, large.",
    price: 70,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-mosambi-pineapple-xl",
    name: "Mosambi & Pineapple Juice (Extra Large)",
    description: "Blend of mosambi and pineapple, extra large.",
    price: 90,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-orange-pineapple-small",
    name: "Orange & Pineapple Juice (Small)",
    description: "Orange and pineapple mix, small.",
    price: 50,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-orange-pineapple-medium",
    name: "Orange & Pineapple Juice (Medium)",
    description: "Orange and pineapple mix, medium.",
    price: 60,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-orange-pineapple-large",
    name: "Orange & Pineapple Juice (Large)",
    description: "Orange and pineapple mix, large.",
    price: 70,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-orange-pineapple-xl",
    name: "Orange & Pineapple Juice (Extra Large)",
    description: "Orange and pineapple mix, extra large.",
    price: 90,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-mosambi-anar-small",
    name: "Mosambi & Anar Juice (Small)",
    description: "Mosambi and pomegranate mix, small.",
    price: 60,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-mosambi-anar-medium",
    name: "Mosambi & Anar Juice (Medium)",
    description: "Mosambi and pomegranate mix, medium.",
    price: 70,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-mosambi-anar-large",
    name: "Mosambi & Anar Juice (Large)",
    description: "Mosambi and pomegranate mix, large.",
    price: 80,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-mosambi-anar-xl",
    name: "Mosambi & Anar Juice (Extra Large)",
    description: "Mosambi and pomegranate mix, extra large.",
    price: 100,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-anar-small",
    name: "Anar Juice (Small)",
    description: "Pomegranate juice, small glass.",
    price: 60,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-anar-medium",
    name: "Anar Juice (Medium)",
    description: "Pomegranate juice, medium glass.",
    price: 80,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-anar-large",
    name: "Anar Juice (Large)",
    description: "Pomegranate juice, large glass.",
    price: 100,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-anar-xl",
    name: "Anar Juice (Extra Large)",
    description: "Pomegranate juice, extra large glass.",
    price: 120,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-vegetable-small",
    name: "Vegetable Juice (Small)",
    description: "Mixed vegetable juice, small glass.",
    price: 30,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-vegetable-medium",
    name: "Vegetable Juice (Medium)",
    description: "Mixed vegetable juice, medium glass.",
    price: 40,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-vegetable-large",
    name: "Vegetable Juice (Large)",
    description: "Mixed vegetable juice, large glass.",
    price: 50,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
  {
    id: "juice-vegetable-xl",
    name: "Vegetable Juice (Extra Large)",
    description: "Mixed vegetable juice, extra large glass.",
    price: 75,
    category: "Fruit Juice",
    image: "/menu/drink-coldbrew.svg",
  },
];

const FOOD_IMAGE_BASE = "/food-image";

const FOOD_IMAGE_EXTENSION_MAP: Record<string, string> = {
  "juice-pineapple-medium": ".jpeg",
  "tea-choti": ".jpeg",
  "mocktail-green-mint": ".png",
  "egg-corna": ".jpeg",
};

const FOOD_IMAGE_ID_OVERRIDE: Record<string, string> = {
  "mocktail-orange-qummin-middle": "orange-qummin-middle",
};

function getMenuImageSrc(item: MenuItem): string {
  const overriddenId = FOOD_IMAGE_ID_OVERRIDE[item.id] ?? item.id;
  const ext = FOOD_IMAGE_EXTENSION_MAP[overriddenId] ?? ".jpg";
  return `${FOOD_IMAGE_BASE}/${overriddenId}${ext}`;
}

function formatCurrency(amount: number) {
  return `₹${amount.toFixed(0)}`;
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<MenuCategory | "All">(
    "All",
  );
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [step, setStep] = useState<
    "menu" | "checkout" | "payment" | "success"
  >("menu");
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [showPaymentConfirm, setShowPaymentConfirm] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const categories: (MenuCategory | "All")[] = [
    "All",
    "Soups",
    "Snacks",
    "Egg Corner",
    "Chinese",
    "Main Course",
    "Thali",
    "South Indian",
    "Pizza",
    "Tea & Coffee",
    "Continental",
    "Mocktails",
    "Fruit Juice",
  ];

  const filteredMenu = useMemo(() => {
    const lower = search.trim().toLowerCase();
    return MENU.filter((item) => {
      const matchesText = lower
        ? item.name.toLowerCase().includes(lower) ||
          item.description.toLowerCase().includes(lower) ||
          item.tags?.some((t) => t.toLowerCase().includes(lower))
        : true;
      const matchesCategory = lower
        ? true
        : activeCategory === "All" || item.category === activeCategory;
      return matchesText && matchesCategory;
    });
  }, [search, activeCategory]);

  const cartWithDetails = useMemo(() => {
    return cart
      .map((entry) => {
        const item = MENU.find((m) => m.id === entry.id);
        if (!item) return null;
        return { ...item, quantity: entry.quantity };
      })
      .filter(Boolean) as (MenuItem & { quantity: number })[];
  }, [cart]);

  const cartCount = cartWithDetails.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const cartSubtotal = cartWithDetails.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );
  const extraCharge = cartSubtotal > 0 && cartSubtotal < 100 ? 10 : 0;
  const cartTotal = cartSubtotal + extraCharge;

  function addToCart(id: string) {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (!existing) return [...prev, { id, quantity: 1 }];
      return prev.map((c) =>
        c.id === id ? { ...c, quantity: c.quantity + 1 } : c,
      );
    });
  }

  function decreaseFromCart(id: string) {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (!existing) return prev;
      if (existing.quantity === 1)
        return prev.filter((c) => c.id !== id);
      return prev.map((c) =>
        c.id === id ? { ...c, quantity: c.quantity - 1 } : c,
      );
    });
  }

  function handleCheckoutSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert("Please fill in your name, phone and address.");
      return;
    }
    setStep("payment");
  }

  async function placeOrder() {
    if (!cartWithDetails.length || isSubmittingOrder) return;

    try {
      setIsSubmittingOrder(true);
      setOrderError(null);

      const orderPayload = {
        customerName: name || "Guest",
        phone,
        address,
        note,
        items: cartWithDetails.map((item) => ({
          itemId: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: cartTotal,
        paymentStatus: "paid",
        deliveryStatus: "new",
        deliveryArea: "IIMT Ganganagar",
        createdAt: new Date().toISOString(),
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (!res.ok) {
        throw new Error("Failed to save order");
      }

      setShowPaymentConfirm(false);
      setStep("success");
    } catch (err) {
      console.error(err);
      setOrderError(
        "We could not save your order right now. Please try again or contact the restaurant.",
      );
    } finally {
      setIsSubmittingOrder(false);
    }
  }

  const showCartBar = cartCount > 0 && step === "menu";

  // Persist basic customer details so they auto-fill next time
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const savedName = window.localStorage.getItem("df_name");
      const savedPhone = window.localStorage.getItem("df_phone");
      const savedAddress = window.localStorage.getItem("df_address");
      if (savedName) setName(savedName);
      if (savedPhone) setPhone(savedPhone);
      if (savedAddress) setAddress(savedAddress);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem("df_name", name);
      window.localStorage.setItem("df_phone", phone);
      window.localStorage.setItem("df_address", address);
    } catch {
      // ignore
    }
  }, [name, phone, address]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white pb-24">
      <header className="sticky top-0 z-20 border-b border-orange-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-2xl bg-orange-500 shadow-sm">
              <Image
                src="/logo.jpg"
                alt="Delhi Fresto logo"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-zinc-900">
                Delhi Fresto
              </span>
              <span className="text-[11px] text-zinc-500">
                Indian meals • Burgers • Pizza
              </span>
            </div>
          </div>
          <div className="text-right text-[11px] text-zinc-500">
            <div className="font-medium text-zinc-700">
              Open • 9 AM – 8 PM
            </div>
            <div>Mon–Sun • IIMT Ganganagar</div>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-md flex-col gap-4 px-4 pt-3">
        {step === "menu" && (
          <>
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold text-zinc-900">
                  Order your favourites
                </h1>
                <div className="rounded-full bg-orange-100 px-3 py-1 text-[11px] font-medium text-orange-700">
                  25–35 min delivery
                </div>
              </div>
              <div className="relative">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search burgers, bowls, drinks..."
                  className="h-11 w-full rounded-2xl border border-orange-100 bg-orange-50/60 px-10 text-sm text-zinc-900 outline-none ring-0 transition focus:border-orange-300 focus:bg-white focus:shadow-[0_0_0_1px_rgba(249,115,22,0.25)]"
                />
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
                  🔍
                </span>
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute inset-y-0 right-3 flex items-center text-xs text-zinc-400 hover:text-zinc-600"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`whitespace-nowrap rounded-full border px-3 py-1.5 transition active:scale-95 ${activeCategory === cat ? "border-orange-500 bg-orange-500 text-white shadow-sm" : "border-zinc-200 bg-white text-zinc-700"}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </section>

            <section className="flex items-start gap-2 rounded-2xl border border-dashed border-red-300 bg-red-50 px-3 py-2 text-[11px] text-red-700">
              <span className="mt-0.5">⚠️</span>
              <p>
                Delivery is currently available <span className="font-semibold">only inside IIMT Ganganagar campus</span>.
                Please share a detailed location inside IIMT in the address
                field.
              </p>
            </section>

            <section className="space-y-2 pb-4">
              <h2 className="text-sm font-semibold text-zinc-900">
                Full menu
              </h2>
              <div className="space-y-3">
                {filteredMenu.map((item) => (
                  <article
                    key={item.id}
                    className="flex gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-zinc-100 transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex flex-1 flex-col justify-between gap-1">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-zinc-900">
                            {item.name}
                          </h3>
                          {item.spicy && (
                            <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-medium text-red-500">
                              Spicy
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 line-clamp-2 text-[11px] text-zinc-500">
                          {item.description}
                        </p>
                        {item.tags && item.tags.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-orange-50 px-2 py-0.5 text-[10px] text-orange-700"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="mt-1 flex items-center justify-between text-xs">
                        <span className="font-semibold text-zinc-900">
                          {formatCurrency(item.price)}
                        </span>
                        <div className="flex items-center gap-1">
                          {cart.find((c) => c.id === item.id) ? (
                            <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-2 py-1 text-[11px] text-white shadow-sm">
                              <button
                                onClick={() => decreaseFromCart(item.id)}
                                className="h-6 w-6 rounded-full bg-zinc-800 text-center text-xs leading-6 active:scale-95"
                              >
                                −
                              </button>
                              <span className="min-w-[1.5rem] text-center">
                                {cart.find((c) => c.id === item.id)?.quantity ?? 0}
                              </span>
                              <button
                                onClick={() => addToCart(item.id)}
                                className="h-6 w-6 rounded-full bg-orange-500 text-center text-xs leading-6 active:scale-95"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => addToCart(item.id)}
                              className="rounded-full border border-zinc-900 px-3 py-1.5 text-[11px] font-medium text-zinc-900 transition active:scale-95"
                            >
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="relative h-20 w-24 overflow-hidden rounded-2xl bg-zinc-100">
                      <Image
                        src={getMenuImageSrc(item)}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </article>
                ))}

                {filteredMenu.length === 0 && (
                  <div className="py-8 text-center text-sm text-zinc-500">
                    No items match your search.
                  </div>
                )}
              </div>
            </section>
          </>
        )}

        {step === "checkout" && (
          <section className="space-y-4 pb-6 animate-slide-up">
            <h2 className="text-lg font-semibold text-zinc-900">
              Delivery details
            </h2>
            <div className="rounded-2xl bg-orange-50 p-3 text-xs text-zinc-700">
              <div className="mb-1 font-semibold text-zinc-900">
                Order summary
              </div>
              <div className="space-y-1">
                {cartWithDetails.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <span>
                      {item.quantity} × {item.name}
                    </span>
                    <span>{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="mt-2 flex items-center justify-between pt-1 text-[11px] text-zinc-600">
                  <span>Items total</span>
                  <span>{formatCurrency(cartSubtotal)}</span>
                </div>
                {extraCharge > 0 && (
                  <div className="flex items-center justify-between text-[11px] text-zinc-600">
                    <span>Small order charge</span>
                    <span>{formatCurrency(extraCharge)}</span>
                  </div>
                )}
                <div className="mt-2 flex items-center justify-between border-t border-orange-200 pt-2 font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>
              </div>
            </div>

            <form className="space-y-3" onSubmit={handleCheckoutSubmit}>
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-700">
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-orange-400 focus:shadow-[0_0_0_1px_rgba(249,115,22,0.25)]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-700">
                  Phone number
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="India mobile number"
                  inputMode="tel"
                  className="h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-orange-400 focus:shadow-[0_0_0_1px_rgba(249,115,22,0.25)]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-700">
                  Delivery address
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  placeholder="Flat, street, landmark"
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-orange-400 focus:shadow-[0_0_0_1px_rgba(249,115,22,0.25)]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-700">
                  Notes (optional)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={2}
                  placeholder="No onions, call on arrival, etc."
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-orange-400 focus:shadow-[0_0_0_1px_rgba(249,115,22,0.25)]"
                />
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setStep("menu")}
                  className="h-11 flex-1 rounded-full border border-zinc-300 text-sm font-medium text-zinc-700 active:scale-95"
                >
                  Back to menu
                </button>
                <button
                  type="submit"
                  className="h-11 flex-1 rounded-full bg-zinc-900 text-sm font-semibold text-white shadow-md transition active:scale-95"
                >
                  Confirm &amp; show payment
                </button>
              </div>
            </form>
          </section>
        )}

        {step === "payment" && (
          <section className="space-y-4 pb-6 animate-slide-up">
            <h2 className="text-lg font-semibold text-zinc-900">
              Scan to pay
            </h2>
            <p className="text-xs text-zinc-500">
              payments will be verified manually, Please confirm only if you have paid.
            </p>

            <div className="space-y-3 rounded-2xl bg-zinc-50 p-3 text-xs text-zinc-700">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-zinc-900">
                  Amount to pay
                </span>
                <span className="text-sm font-semibold text-zinc-900">
                  {formatCurrency(cartTotal)}
                </span>
              </div>
              {extraCharge > 0 && (
                <div className="flex items-center justify-between text-[11px] text-zinc-500">
                  <span>Includes small order charge</span>
                  <span>{formatCurrency(extraCharge)}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-[11px] text-zinc-500">
                <span>Delhi Fresto • IIMT Ganganagar</span>
                <span>UPI demo only</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-100">
              <div className="relative h-52 w-52 overflow-hidden rounded-2xl bg-zinc-100">
                <Image
                  src="/payment/pymnt-qr-code.png"
                  alt="Scan this QR to pay"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-center text-[11px] text-zinc-500">
                <p className="font-medium text-zinc-700">
                  Scan using any UPI app
                </p>
                <p>After you complete the payment, tap “I have paid”.</p>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setStep("checkout")}
                className="h-11 flex-1 rounded-full border border-zinc-300 text-sm font-medium text-zinc-700 active:scale-95"
              >
                Edit details
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!cartWithDetails.length) return;
                  setShowPaymentConfirm(true);
                }}
                disabled={isSubmittingOrder}
                className="h-11 flex-1 rounded-full bg-emerald-600 text-sm font-semibold text-white shadow-md transition disabled:cursor-not-allowed disabled:bg-emerald-400 active:scale-95"
              >
                {isSubmittingOrder ? "Placing..." : "I have paid"}
              </button>
            </div>
          </section>
        )}

        {step === "success" && (
          <section className="flex flex-1 flex-col items-center justify-center gap-4 py-16 text-center animate-fade-in">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-green-400 to-emerald-500 text-3xl text-white shadow-lg">
              ✓
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-zinc-900">
                Order placed!
              </h2>
              <p className="text-sm text-zinc-600">
                Thanks {name || "there"}. We&apos;ll call {phone || "your number"} if
                we need anything.
              </p>
              <p className="text-xs text-zinc-500">
                You can close this tab now. This is a demo-only flow
                without real payment.
              </p>
            </div>
            <button
              onClick={() => {
                setCart([]);
                setStep("menu");
                setName("");
                setPhone("");
                setAddress("");
                setNote("");
              }}
              className="mt-2 h-10 rounded-full border border-zinc-300 px-5 text-sm font-medium text-zinc-700 active:scale-95"
            >
              Start a new order
            </button>
          </section>
        )}
      </main>

      {showCartBar && (
        <div className="fixed inset-x-0 bottom-0 z-30 flex justify-center pb-3">
          <div className="mx-4 flex w-full max-w-md items-center justify-between rounded-2xl bg-zinc-900 px-3 py-2.5 text-xs text-white shadow-2xl animate-slide-up">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-[11px] font-semibold">
                {cartCount}
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wide text-zinc-400">
                  Cart total
                </span>
                <span className="text-sm font-semibold">
                  {formatCurrency(cartTotal)}
                </span>
              </div>
            </div>
            <button
              onClick={() => setCartOpen(true)}
              className="h-9 rounded-full bg-orange-500 px-4 text-[11px] font-semibold text-white shadow-md active:scale-95"
            >
              View cart &amp; checkout
            </button>
          </div>
        </div>
      )}

      {cartOpen && step === "menu" && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md animate-slide-up rounded-t-3xl bg-white p-4 pb-6 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-zinc-900">
                  Your cart
                </h2>
                <p className="text-[11px] text-zinc-500">
                  {cartCount} items • {formatCurrency(cartTotal)}
                </p>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="h-8 w-8 rounded-full bg-zinc-100 text-sm text-zinc-600 active:scale-95"
              >
                ✕
              </button>
            </div>

            <div className="max-h-64 space-y-3 overflow-y-auto pb-2">
              {cartWithDetails.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-zinc-50 p-2.5"
                >
                  <div className="flex flex-1 flex-col gap-0.5">
                    <span className="text-xs font-semibold text-zinc-900">
                      {item.name}
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      {formatCurrency(item.price)} each
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <button
                      onClick={() => decreaseFromCart(item.id)}
                      className="h-7 w-7 rounded-full bg-zinc-200 text-sm text-zinc-700 active:scale-95"
                    >
                      −
                    </button>
                    <span className="min-w-[1.5rem] text-center text-xs font-semibold text-zinc-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => addToCart(item.id)}
                      className="h-7 w-7 rounded-full bg-zinc-900 text-sm text-white active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}

              {cartWithDetails.length === 0 && (
                <div className="py-8 text-center text-xs text-zinc-500">
                  Your cart is empty.
                </div>
              )}
            </div>

            <button
              disabled={cartWithDetails.length === 0}
              onClick={() => {
                setCartOpen(false);
                setStep("checkout");
              }}
              className="mt-3 h-11 w-full rounded-full bg-zinc-900 text-sm font-semibold text-white shadow-md transition disabled:cursor-not-allowed disabled:bg-zinc-400 active:scale-95"
            >
              Continue to delivery • {formatCurrency(cartTotal)}
            </button>
          </div>
        </div>
      )}

      {showPaymentConfirm && step === "payment" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-sm animate-slide-up rounded-2xl bg-white p-4 shadow-2xl">
            <h3 className="text-sm font-semibold text-zinc-900">
              Confirm payment
            </h3>
            <p className="mt-1 text-[11px] text-zinc-600">
              Please confirm that you have completed the UPI payment for this
              order. Once you confirm, the order will be placed in our system
              for Delhi Fresto (IIMT Ganganagar).
            </p>
            {orderError && (
              <p className="mt-2 rounded-md bg-red-50 px-2 py-1 text-[11px] text-red-600">
                {orderError}
              </p>
            )}
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  if (isSubmittingOrder) return;
                  setShowPaymentConfirm(false);
                  setOrderError(null);
                }}
                className="h-10 flex-1 rounded-full border border-zinc-300 text-sm font-medium text-zinc-700 active:scale-95"
              >
                Not yet
              </button>
              <button
                type="button"
                onClick={placeOrder}
                disabled={isSubmittingOrder}
                className="h-10 flex-1 rounded-full bg-emerald-600 text-sm font-semibold text-white shadow-md transition disabled:cursor-not-allowed disabled:bg-emerald-400 active:scale-95"
              >
                {isSubmittingOrder ? "Placing..." : "Yes, place order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
