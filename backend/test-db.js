require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connection Successful!');
    console.log('Connection URI:', process.env.MONGODB_URI);
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

testConnection(); 