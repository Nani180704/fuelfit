const express = require('express');
const router = express.Router();
const MealPlan = require('../models/MealPlan');

// Get all meal plans
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all meal plans'); // Debug log
    const mealPlans = await MealPlan.find().sort({ createdAt: -1 });
    console.log(`Found ${mealPlans.length} meal plans`); // Debug log
    res.json(mealPlans);
  } catch (error) {
    console.error('Error fetching meal plans:', error);
    res.status(500).json({ message: 'Error fetching meal plans' });
  }
});

// Get meal plan by ID
router.get('/:id', async (req, res) => {
  try {
    const mealPlan = await MealPlan.findById(req.params.id);
    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }
    res.json(mealPlan);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching meal plan' });
  }
});

// Create new meal plan
router.post('/', async (req, res) => {
  try {
    const { name, description, image, calorieRange, price, duration } = req.body;
    
    // Validate required fields
    if (!name || !description || !image || !calorieRange || !price || !duration) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const mealPlan = new MealPlan({
      name,
      description,
      image,
      calorieRange,
      price,
      duration,
      status: 'active'
    });
    
    const savedMealPlan = await mealPlan.save();
    res.status(201).json(savedMealPlan);
  } catch (error) {
    res.status(500).json({ message: 'Error creating meal plan' });
  }
});

// Update meal plan
router.put('/:id', async (req, res) => {
  try {
    const { name, description, image, calorieRange, price, duration, status } = req.body;
    
    // Validate required fields
    if (!name || !description || !image || !calorieRange || !price || !duration) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const mealPlan = await MealPlan.findByIdAndUpdate(
      req.params.id,
      { name, description, image, calorieRange, price, duration, status },
      { new: true }
    );
    
    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }
    
    res.json(mealPlan);
  } catch (error) {
    res.status(500).json({ message: 'Error updating meal plan' });
  }
});

// Delete meal plan
router.delete('/:id', async (req, res) => {
  try {
    const mealPlan = await MealPlan.findByIdAndDelete(req.params.id);
    
    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }
    
    res.json({ message: 'Meal plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting meal plan' });
  }
});

module.exports = router; 