const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.meal');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new order
router.post('/', async (req, res) => {
  try {
    console.log('Received order payload:', req.body);
    
    const {
      userId,
      items,
      totalAmount,
      deliveryAddress,
      customerName,
      customerPhone,
      paymentMethod
    } = req.body;

    // Add more detailed logging for debugging
    console.log('Order validation check:');
    console.log('userId:', userId, typeof userId);
    console.log('items:', items ? `Array with ${items.length} items` : 'missing');
    console.log('totalAmount:', totalAmount, typeof totalAmount);
    console.log('deliveryAddress:', deliveryAddress);
    console.log('customerName:', customerName);
    console.log('customerPhone:', customerPhone);
    console.log('paymentMethod:', paymentMethod);
    
    // Check which fields are missing
    const missingFields = {};
    if (!userId) missingFields.userId = true;
    if (!items || !Array.isArray(items) || items.length === 0) missingFields.items = true;
    if (totalAmount === undefined) missingFields.totalAmount = true;
    if (!deliveryAddress) missingFields.deliveryAddress = true;
    if (!customerName) missingFields.customerName = true;
    if (!customerPhone) missingFields.customerPhone = true;
    if (!paymentMethod) missingFields.paymentMethod = true;

    // If any required fields are missing, return an error
    if (Object.keys(missingFields).length > 0) {
      console.log('Missing fields:', missingFields);
      return res.status(400).json({ 
        message: 'Missing required fields', 
        missingFields 
      });
    }

    // Validate items array - the most common source of errors
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (!item.productId || !item.name || item.price === undefined || !item.quantity) {
          console.log(`Invalid item at index ${i}:`, item);
          return res.status(400).json({
            message: 'Invalid item data', 
            invalidItemIndex: i,
            item
          });
        }
      }
    }

    // Create new order - IMPORTANT: Match the field names exactly with your Order model
    const order = new Order({
      userId,
      items,
      totalAmount,
      deliveryAddress,
      customerName,
      customerPhone,
      paymentMethod,
      status: 'Pending'
    });

    await order.save();
    console.log('Order created successfully:', order._id);
    
    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      message: 'Failed to create order',
      error: error.message
    });
  }
});

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items.meal');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's orders
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Get all orders (admin only)
router.get('/all', auth, async (req, res) => {
  try {
    console.log('User requesting orders:', req.user); // Debug log

    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .lean(); // Use lean() for better performance

    console.log(`Found ${orders.length} orders`); // Debug log

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ 
      message: 'Error fetching orders',
      error: error.message 
    });
  }
});

// Update order status (admin only)
router.patch('/:orderId/status', auth, async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'processing', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status' });
  }
});

// Get dashboard stats
router.get('/stats', auth, async (req, res) => {
  try {
    console.log('User requesting stats:', req.user); // Debug log

    const [totalOrders, pendingOrders, completedOrders, revenue] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ status: 'pending' }),
      Order.countDocuments({ status: 'delivered' }),
      Order.aggregate([
        { $match: { status: 'delivered' } },
        { $group: { _id: null, total: { $sum: '$total' } } }
      ])
    ]);

    console.log('Stats:', { totalOrders, pendingOrders, completedOrders }); // Debug log

    res.json({
      totalOrders,
      pendingOrders,
      completedOrders,
      totalRevenue: revenue[0]?.total || 0
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ 
      message: 'Error fetching dashboard stats',
      error: error.message 
    });
  }
});

module.exports = router; 