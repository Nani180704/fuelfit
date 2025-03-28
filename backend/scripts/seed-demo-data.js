const mongoose = require('mongoose');
require('dotenv').config();
const Meal = require('../models/Meal');
const MealPlan = require('../models/MealPlan');
const Order = require('../models/Order');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Demo Meals
const demoMeals = [
  {
    name: "Protein Power Bowl",
    description: "High-protein meal with grilled chicken, quinoa, and mixed vegetables",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "main"
  },
  {
    name: "Keto Avocado Salad",
    description: "Low-carb salad with avocado, eggs, and olive oil dressing",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "starter"
  },
  {
    name: "Muscle Builder Steak",
    description: "Lean steak with sweet potatoes and steamed broccoli",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "main"
  },
  {
    name: "Berry Protein Smoothie",
    description: "Mixed berries blended with whey protein and almond milk",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "beverage"
  },
  {
    name: "Detox Green Salad",
    description: "Fresh green salad with cucumber, avocado, and lemon dressing",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "starter"
  },
  {
    name: "Protein Pancakes",
    description: "Oat and protein pancakes with fresh berries and Greek yogurt",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "main"
  }
];

// Demo Meal Plans
const demoMealPlans = [
  {
    name: "Weight Loss Plan",
    description: "Low-calorie meal plan designed for effective weight loss",
    image: "https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    calorieRange: "1200-1500",
    price: 89.99,
    duration: 7,
    status: "active"
  },
  {
    name: "Muscle Building Plan",
    description: "High-protein meal plan to support muscle growth and recovery",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    calorieRange: "2500-3000",
    price: 99.99,
    duration: 7,
    status: "active"
  },
  {
    name: "Keto Diet Plan",
    description: "Low-carb, high-fat meal plan to help achieve ketosis",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    calorieRange: "1800-2200",
    price: 94.99,
    duration: 7,
    status: "active"
  }
];

// Demo Orders with random userId (since we're not using real users here)
const generateRandomUserId = () => new mongoose.Types.ObjectId();

// Function to create orders using the meals we just added
async function createOrdersFromMeals(meals) {
  return [
    {
      userId: generateRandomUserId(),
      items: [
        { _id: meals[0]._id.toString(), name: meals[0].name, price: meals[0].price, quantity: 2 },
        { _id: meals[3]._id.toString(), name: meals[3].name, price: meals[3].price, quantity: 1 }
      ],
      total: (meals[0].price * 2) + meals[3].price,
      deliveryDetails: {
        fullName: "Emily Johnson",
        address: "123 Fitness Ave",
        city: "Los Angeles",
        phone: "555-1234",
        instructions: "Leave at the front desk"
      },
      paymentMethod: "card",
      paymentDetails: {
        cardNumber: "****1234",
        cardName: "Emily Johnson"
      },
      status: "pending",
      createdAt: new Date()
    },
    {
      userId: generateRandomUserId(),
      items: [
        { _id: meals[2]._id.toString(), name: meals[2].name, price: meals[2].price, quantity: 1 },
        { _id: meals[4]._id.toString(), name: meals[4].name, price: meals[4].price, quantity: 1 }
      ],
      total: meals[2].price + meals[4].price,
      deliveryDetails: {
        fullName: "Mark Davis",
        address: "456 Health Street",
        city: "Chicago",
        phone: "555-5678",
        instructions: ""
      },
      paymentMethod: "cod",
      status: "accepted",
      createdAt: new Date(Date.now() - 2 * 3600000) // 2 hours ago
    },
    {
      userId: generateRandomUserId(),
      items: [
        { _id: meals[1]._id.toString(), name: meals[1].name, price: meals[1].price, quantity: 1 },
        { _id: meals[5]._id.toString(), name: meals[5].name, price: meals[5].price, quantity: 2 }
      ],
      total: meals[1].price + (meals[5].price * 2),
      deliveryDetails: {
        fullName: "Sarah Wilson",
        address: "789 Nutrition Road",
        city: "New York",
        phone: "555-9012",
        instructions: "Call when you arrive"
      },
      paymentMethod: "card",
      paymentDetails: {
        cardNumber: "****5678",
        cardName: "Sarah Wilson"
      },
      status: "preparing",
      createdAt: new Date(Date.now() - 5 * 3600000) // 5 hours ago
    },
    {
      userId: generateRandomUserId(),
      items: [
        { _id: meals[0]._id.toString(), name: meals[0].name, price: meals[0].price, quantity: 1 },
        { _id: meals[3]._id.toString(), name: meals[3].name, price: meals[3].price, quantity: 2 }
      ],
      total: meals[0].price + (meals[3].price * 2),
      deliveryDetails: {
        fullName: "Michael Brown",
        address: "321 Protein Lane",
        city: "Dallas",
        phone: "555-3456",
        instructions: ""
      },
      paymentMethod: "card",
      paymentDetails: {
        cardNumber: "****9012",
        cardName: "Michael Brown"
      },
      status: "out-for-delivery",
      createdAt: new Date(Date.now() - 8 * 3600000) // 8 hours ago
    },
    {
      userId: generateRandomUserId(),
      items: [
        { _id: meals[2]._id.toString(), name: meals[2].name, price: meals[2].price, quantity: 2 },
        { _id: meals[1]._id.toString(), name: meals[1].name, price: meals[1].price, quantity: 1 }
      ],
      total: (meals[2].price * 2) + meals[1].price,
      deliveryDetails: {
        fullName: "Jessica Miller",
        address: "654 Wellness Court",
        city: "Miami",
        phone: "555-7890",
        instructions: "Deliver to back door"
      },
      paymentMethod: "cod",
      status: "delivered",
      createdAt: new Date(Date.now() - 24 * 3600000) // 24 hours ago
    }
  ];
}

async function seedDatabase() {
  try {
    // Clear existing data
    await Meal.deleteMany({});
    await MealPlan.deleteMany({});
    await Order.deleteMany({});

    console.log('Existing data cleared');

    // Insert meals
    const insertedMeals = await Meal.insertMany(demoMeals);
    console.log(`${insertedMeals.length} meals added`);

    // Insert meal plans
    const insertedMealPlans = await MealPlan.insertMany(demoMealPlans);
    console.log(`${insertedMealPlans.length} meal plans added`);

    // Generate and insert orders
    const demoOrders = await createOrdersFromMeals(insertedMeals);
    const insertedOrders = await Order.insertMany(demoOrders);
    console.log(`${insertedOrders.length} orders added`);

    console.log('Database seeded successfully!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.disconnect();
  }
}

seedDatabase(); 