const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const Meal = require('../models/Meal');
const MealPlan = require('../models/MealPlan');

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Verify password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add this route to test admin authentication
router.get('/test-auth', auth, async (req, res) => {
  try {
    res.json({ 
      message: 'Admin authentication successful',
      user: req.user 
    });
  } catch (error) {
    res.status(500).json({ message: 'Test failed' });
  }
});

// Get all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Get dashboard stats
router.get('/dashboard-stats', async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const activeMealPlans = await MealPlan.countDocuments({ status: 'active' });
    const totalMeals = await Meal.countDocuments();
    
    // Calculate total revenue
    const revenue = await Order.aggregate([
      {
        $match: { status: { $in: ['delivered', 'completed'] } }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$total' }
        }
      }
    ]);
    
    const totalRevenue = revenue.length > 0 ? revenue[0].total : 0;
    
    res.json({
      totalOrders,
      activeMealPlans,
      totalMeals,
      totalRevenue
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Error fetching stats' });
  }
});

// Get all meals
router.get('/meals', async (req, res) => {
  try {
    const meals = await Meal.find().sort({ createdAt: -1 });
    console.log('Fetched meals:', meals.length); // Debug log
    res.json(meals);
  } catch (error) {
    console.error('Error fetching meals:', error);
    res.status(500).json({ 
      message: 'Error fetching meals',
      error: error.message 
    });
  }
});

// Delete meal
router.delete('/meals/:id', async (req, res) => {
  try {
    console.log('Deleting meal:', req.params.id); // Debug log
    
    if (!req.params.id) {
      return res.status(400).json({ message: 'Meal ID is required' });
    }

    const meal = await Meal.findByIdAndDelete(req.params.id);
    
    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }

    console.log('Meal deleted:', meal); // Debug log
    res.json({ message: 'Meal deleted successfully', mealId: req.params.id });
  } catch (error) {
    console.error('Error deleting meal:', error);
    res.status(500).json({ 
      message: 'Error deleting meal',
      error: error.message 
    });
  }
});

// Update meal
router.put('/meals/:id', async (req, res) => {
  try {
    console.log('Updating meal:', req.params.id, req.body); // Debug log
    
    if (!req.params.id) {
      return res.status(400).json({ message: 'Meal ID is required' });
    }

    const { name, description, price, image, category } = req.body;

    if (!name || !description || !price || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const updateData = {
      name,
      description,
      price: parseFloat(price),
      image,
      category: category || 'main' // Provide default category if not specified
    };

    const meal = await Meal.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }
    
    console.log('Meal updated:', meal); // Debug log
    res.json(meal);
  } catch (error) {
    console.error('Error updating meal:', error);
    res.status(500).json({ 
      message: 'Error updating meal',
      error: error.message 
    });
  }
});

// Confirm order
router.put('/orders/:id/confirm', async (req, res) => {
  try {
    console.log('Confirming order:', req.params.id); // Debug log
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: 'accepted' },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    console.log('Order confirmed:', order._id); // Debug log
    res.json(order);
  } catch (error) {
    console.error('Error confirming order:', error);
    res.status(500).json({ message: 'Error confirming order' });
  }
});

// Update order status
router.put('/orders/:id/status', async (req, res) => {
  try {
    console.log('Updating order status:', req.params.id, req.body.status); // Debug log
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    console.log('Order status updated:', order._id, status); // Debug log
    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Error updating order status' });
  }
});

// Assign courier to order
router.put('/orders/:id/assign-courier', async (req, res) => {
  try {
    console.log('Assigning courier:', req.params.id, req.body.courierId); // Debug log
    const { courierId } = req.body;
    
    if (!courierId) {
      return res.status(400).json({ message: 'Courier ID is required' });
    }
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { 
        courierId,
        status: 'out-for-delivery'
      },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    console.log('Courier assigned:', order._id, courierId); // Debug log
    res.json(order);
  } catch (error) {
    console.error('Error assigning courier:', error);
    res.status(500).json({ message: 'Error assigning courier' });
  }
});

// Helper function to send notifications
async function sendStatusNotification(order) {
  // Implement your notification logic here
  // This could be email, SMS, or push notifications
  console.log(`Status notification sent for order ${order._id}`);
}

async function sendCourierNotification(order, courierId) {
  // Implement your courier notification logic here
  console.log(`Courier ${courierId} notified for order ${order._id}`);
}

module.exports = router; 