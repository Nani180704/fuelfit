const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('../models/User');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

async function addTestUser() {
  try {
    // Check if test user already exists
    const existingUser = await User.findOne({ email: 'test@fitfuel.com' });
    
    if (existingUser) {
      console.log('Test user already exists');
      mongoose.disconnect();
      return;
    }
    
    // Create test user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    
    const user = new User({
      name: 'Test User',
      email: 'test@fitfuel.com',
      password: hashedPassword
    });
    
    await user.save();
    console.log('Test user created successfully');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error creating test user:', error);
    mongoose.disconnect();
  }
}

addTestUser(); 