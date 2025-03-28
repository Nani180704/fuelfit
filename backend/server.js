require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ordersRoute = require('./routes/orders');
const usersRoute = require('./routes/users');
const adminRoute = require('./routes/admin');

const app = express();

// Set strictQuery to false to prepare for Mongoose 7
mongoose.set('strictQuery', false);

// Enable CORS
app.use(cors());

// Body parser middleware
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

// Routes
app.use('/api/meals', require('./routes/meals'));
app.use('/api/meal-plans', require('./routes/mealPlans'));
app.use('/api/users', usersRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/admin', adminRoute);

// Debug route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'API is running', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5004;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process with failure
  });

// Add this after your mongoose.connect call
mongoose.connection.on('connected', () => {
  console.log('MongoDB connection established successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connection disconnected');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});