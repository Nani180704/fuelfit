const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const Admin = require('../models/Admin');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

async function addAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@fitfuel.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      mongoose.disconnect();
      return;
    }
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const admin = new Admin({
      name: 'Admin User',
      email: 'admin@fitfuel.com',
      password: hashedPassword,
      isAdmin: true
    });
    
    await admin.save();
    console.log('Admin user created successfully');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error creating admin user:', error);
    mongoose.disconnect();
  }
}

addAdmin(); 