const mongoose = require('mongoose');
const Meal = require('../models/Meal');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const newMeals = [
  {
    name: "Mediterranean Chickpea Bowl",
    description: "A protein-rich bowl with chickpeas, quinoa, olives, feta, and fresh vegetables in a lemon-herb dressing.",
    price: 11.99,
    image: "https://lh3.googleusercontent.com/pw/ABLVV87f3OMXnDcHO7iW4GKQEAY5xERvZKDr1_cX6ORQIcKx4-ZwXTiXzTKhdwQF1ZCwZYI6Jeu-i_C4-lJ27K-mzKRLwR7l9mPRfvS04RNDLIrKvgnBKMEMxjyI9iBv0wk5w8dSjJWxSBPHOWBCBx43IbFw=w800-h600-s-no",
    category: "Vegetarian",
    prepTime: 15,
    calories: 450,
    fitnessGoals: ["Weight Loss", "Muscle Gain", "General Health"],
    nutrition: {
      protein: 22,
      carbs: 55,
      fats: 15,
      fiber: 12
    },
    rating: 4.7,
    reviews: 85,
    ingredients: ["Chickpeas", "Quinoa", "Cucumber", "Cherry Tomatoes", "Kalamata Olives", "Feta Cheese", "Red Onion", "Lemon Juice", "Olive Oil", "Fresh Herbs"]
  },
  {
    name: "Teriyaki Salmon Rice Bowl",
    description: "Wild-caught salmon glazed with homemade teriyaki sauce, served with brown rice and steamed vegetables.",
    price: 14.99,
    image: "https://lh3.googleusercontent.com/pw/ABLVV84KHZ_CkAG_1zS79GmWsUdG6ygc4y7rLXRFTTNHmhQ-k2kzKwmhQqIZiaQQQPQsB_DTF4jJr41N5sE8cEyJ7-YOvSG7bkYWqZXKZsLQQVswxDVKjcVxHhfQKTOuYEW0YSKIf6Rl2cJ9tXYkJjUd6Fme=w800-h533-s-no",
    category: "Seafood",
    prepTime: 20,
    calories: 520,
    fitnessGoals: ["Muscle Gain", "General Health"],
    nutrition: {
      protein: 32,
      carbs: 48,
      fats: 18,
      fiber: 6
    },
    rating: 4.8,
    reviews: 112,
    ingredients: ["Wild Salmon", "Brown Rice", "Broccoli", "Carrots", "Teriyaki Sauce", "Sesame Seeds", "Green Onions"]
  },
  {
    name: "High-Protein Breakfast Burrito",
    description: "Scrambled eggs with black beans, lean turkey sausage, avocado, and cheese wrapped in a whole wheat tortilla.",
    price: 9.99,
    image: "https://lh3.googleusercontent.com/pw/ABLVV85ueaHQYCe-AEfQnjKJbpkvDMChLgG4-OOqW4aTq6IjKXMtxDQ-iUYvQXYcx9P0ew3GP0OTD8Vc2MU5JlH5Iy9wV5f2Jxl7nQWQk3XbHf7Fo4fF4QFMHG0uARcKBL7tg-dCL3lfbOm2SHp1iHkJoq_t=w800-h533-s-no",
    category: "Breakfast",
    prepTime: 10,
    calories: 480,
    fitnessGoals: ["Muscle Gain", "Energy Boost"],
    nutrition: {
      protein: 28,
      carbs: 42,
      fats: 22,
      fiber: 8
    },
    rating: 4.6,
    reviews: 73,
    ingredients: ["Eggs", "Black Beans", "Turkey Sausage", "Avocado", "Cheddar Cheese", "Whole Wheat Tortilla", "Salsa"]
  },
  {
    name: "Keto Steak Salad",
    description: "Grilled grass-fed steak served over mixed greens with avocado, blue cheese, cherry tomatoes, and balsamic vinaigrette.",
    price: 15.99,
    image: "https://lh3.googleusercontent.com/pw/ABLVV87fXOh7CIZtHWi85nBFm8LnfL21-q5iJRDL7EDRYWlz9OsJSrGykFvRCGPpJSTkXpHsUEPZ-nRHi5vcXz-rqD-bqWnpGKk7qv2tHsOKYdm1t4rKLa2OyBU5yT5FWKaYRcNUw-X5BPRXw7PKH87vwDGP=w800-h533-s-no",
    category: "Keto",
    prepTime: 15,
    calories: 510,
    fitnessGoals: ["Weight Loss", "Muscle Gain"],
    nutrition: {
      protein: 35,
      carbs: 10,
      fats: 38,
      fiber: 5
    },
    rating: 4.9,
    reviews: 95,
    ingredients: ["Grass-fed Steak", "Mixed Greens", "Avocado", "Blue Cheese", "Cherry Tomatoes", "Red Onion", "Balsamic Vinaigrette"]
  },
  {
    name: "Vegan Buddha Bowl",
    description: "A nutrient-dense bowl featuring sweet potatoes, kale, chickpeas, quinoa, and tahini dressing.",
    price: 12.99,
    image: "https://lh3.googleusercontent.com/pw/ABLVV87FZLW3QgM2zKA8C3TyWo-xT3wdzB47DhM9AYW3ekXLZ1_eSl2W6zYfQN1gN6PkE7vpQ8Yrg37k86a1daqPdSl55_H8pzpL_FMhwnYhYe7dzIFg3aDQ0O7L1O-D5nIX25J0SWZ3oVAQ8nJOA_XSlOUY=w800-h533-s-no",
    category: "Vegan",
    prepTime: 20,
    calories: 420,
    fitnessGoals: ["Weight Loss", "General Health"],
    nutrition: {
      protein: 18,
      carbs: 65,
      fats: 12,
      fiber: 14
    },
    rating: 4.7,
    reviews: 88,
    ingredients: ["Sweet Potatoes", "Kale", "Chickpeas", "Quinoa", "Avocado", "Tahini", "Lemon Juice", "Hemp Seeds"]
  },
  {
    name: "Protein Pancakes with Berries",
    description: "Fluffy protein-packed pancakes topped with fresh berries, Greek yogurt, and a drizzle of honey.",
    price: 10.99,
    image: "https://lh3.googleusercontent.com/pw/ABLVV84aF_nPUk3CqkHfSK26ltXs3D6VqqgXYUByTpQnq4jLkBQdCzJn1vfkVcbDdMEofxgSvke7Js6Ib3zf_G-1UQPLt90rWx_1ZPh3O_YBUVsrH5UiDnFQAw2YaQHIE93qLtxtLDYX1z-UvITwdtKJE7JI=w800-h533-s-no",
    category: "Breakfast",
    prepTime: 15,
    calories: 380,
    fitnessGoals: ["Muscle Gain", "General Health"],
    nutrition: {
      protein: 24,
      carbs: 45,
      fats: 10,
      fiber: 7
    },
    rating: 4.6,
    reviews: 65,
    ingredients: ["Protein Powder", "Oats", "Egg Whites", "Greek Yogurt", "Mixed Berries", "Honey", "Cinnamon"]
  },
  {
    name: "Grilled Chicken Caesar Wrap",
    description: "Grilled antibiotic-free chicken with romaine lettuce, parmesan, and light caesar dressing in a spinach wrap.",
    price: 12.49,
    image: "https://lh3.googleusercontent.com/pw/ABLVV87_S6Sdy5iCb11BX5i-BsYLFj23iFhHSxULJrSP3oKSNV9V0bEDXNZ6S2MCQyK5RD36rIFRZl5fLZtYQRjsW-0-c9ybZTq3lGN1nLihhQK-YKTLjfDafLbV5L4zxtcRgNY9pKgjDgEpJdXPYxj96Bzv=w800-h533-s-no",
    category: "Lunch",
    prepTime: 12,
    calories: 420,
    fitnessGoals: ["Weight Loss", "Muscle Gain"],
    nutrition: {
      protein: 35,
      carbs: 30,
      fats: 17,
      fiber: 4
    },
    rating: 4.5,
    reviews: 82,
    ingredients: ["Grilled Chicken", "Romaine Lettuce", "Parmesan Cheese", "Light Caesar Dressing", "Spinach Wrap"]
  },
  {
    name: "Quinoa Stuffed Bell Peppers",
    description: "Bell peppers stuffed with quinoa, black beans, corn, and spices, topped with melted cheese.",
    price: 13.99,
    image: "https://lh3.googleusercontent.com/pw/ABLVV840hHYVxwzpq94TBr3X8bIINHRRU1F2dqyU-JdJN2EFAJ0rZf8uLbN03_w7aNk4QsgV_2NU2GUVzHAA16v1j7fmTD3vqhjXujxo7l4vT8PZ-a_gfijkWpVFLOxfFUOOdKCnEX0PwzPNLO-5zLRwNbQ1=w800-h533-s-no",
    category: "Vegetarian",
    prepTime: 25,
    calories: 340,
    fitnessGoals: ["Weight Loss", "General Health"],
    nutrition: {
      protein: 15,
      carbs: 42,
      fats: 12,
      fiber: 9
    },
    rating: 4.7,
    reviews: 69,
    ingredients: ["Bell Peppers", "Quinoa", "Black Beans", "Corn", "Onions", "Garlic", "Cheese", "Herbs", "Spices"]
  }
];

async function seedMeals() {
  try {
    // Add new meals to database
    await Meal.insertMany(newMeals);
    console.log(`Added ${newMeals.length} new meals to the database`);
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding meals:', error);
    mongoose.disconnect();
  }
}

seedMeals(); 