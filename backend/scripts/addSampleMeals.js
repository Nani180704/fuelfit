require('dotenv').config();
const mongoose = require('mongoose');
const Meal = require('../models/Meal');

const sampleMeals = [
  {
    name: "Grilled Chicken Salad",
    description: "Fresh mixed greens with grilled chicken breast",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    category: "lunch",
    calories: 350,
    protein: 28,
    carbs: 12,
    fat: 18,
    preparationTime: 15,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true
  },
  {
    name: "Quinoa Buddha Bowl",
    description: "Nutritious bowl with quinoa, roasted vegetables",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    category: "dinner",
    calories: 450,
    protein: 15,
    carbs: 65,
    fat: 20,
    preparationTime: 20,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true
  },
  {
    name: "Protein Smoothie Bowl",
    description: "Blend of berries, banana, protein powder",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1577805947697-89e18249d767",
    category: "breakfast",
    calories: 380,
    protein: 24,
    carbs: 45,
    fat: 12,
    preparationTime: 10,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true
  }
];

const addSampleMeals = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing meals
    await Meal.deleteMany({});
    console.log('Cleared existing meals');

    // Add new sample meals
    const result = await Meal.insertMany(sampleMeals);
    console.log('Added sample meals:', result);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
};

// Run the script
addSampleMeals(); 