const mongoose = require('mongoose');
require('dotenv').config();
const Order = require('../models/Order');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const testOrders = [
  {
    userId: mongoose.Types.ObjectId(), // Random ObjectId
    items: [
      { _id: "1", name: "Healthy Salad Bowl", price: 12.99, quantity: 2 },
      { _id: "2", name: "Protein Smoothie", price: 5.99, quantity: 1 }
    ],
    total: 31.97,
    deliveryDetails: {
      fullName: "John Doe",
      address: "123 Main St",
      city: "New York",
      phone: "555-1234",
      instructions: "Leave at the door"
    },
    paymentMethod: "card",
    paymentDetails: {
      cardNumber: "****4242",
      cardName: "John Doe"
    },
    status: "pending",
    createdAt: new Date()
  },
  {
    userId: mongoose.Types.ObjectId(), // Random ObjectId
    items: [
      { _id: "3", name: "Grilled Chicken Meal", price: 14.99, quantity: 1 },
      { _id: "4", name: "Vegetable Soup", price: 6.99, quantity: 1 }
    ],
    total: 21.98,
    deliveryDetails: {
      fullName: "Jane Smith",
      address: "456 Oak Ave",
      city: "Boston",
      phone: "555-5678",
      instructions: ""
    },
    paymentMethod: "cod",
    status: "accepted",
    createdAt: new Date(Date.now() - 3600000) // 1 hour ago
  }
];

async function addTestOrders() {
  try {
    await Order.deleteMany({}); // Clear existing orders
    const result = await Order.insertMany(testOrders);
    console.log(`${result.length} test orders added successfully`);
    mongoose.disconnect();
  } catch (error) {
    console.error('Error adding test orders:', error);
    mongoose.disconnect();
  }
}

addTestOrders(); 