const express = require('express');
const router = express.Router();
const Meal = require('../models/Meal');

// Search meals
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.json([]);
    }

    const meals = await Meal.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } }
      ]
    });

    res.json(meals);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Error searching meals' });
  }
});

// Get all meals
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all meals'); // Debug log
    const meals = await Meal.find().sort({ createdAt: -1 });
    console.log(`Found ${meals.length} meals`); // Debug log
    res.json(meals);
  } catch (error) {
    console.error('Error fetching meals:', error);
    res.status(500).json({ message: 'Error fetching meals' });
  }
});

// Get meal by ID
router.get('/:id', async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }
    res.json(meal);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching meal' });
  }
});

// Create new meal
router.post('/', async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
    
    // Validate required fields
    if (!name || !description || !price || !image || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const meal = new Meal({
      name,
      description,
      price,
      image,
      category
    });
    
    const savedMeal = await meal.save();
    res.status(201).json(savedMeal);
  } catch (error) {
    res.status(500).json({ message: 'Error creating meal' });
  }
});

// Update meal
router.put('/:id', async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
    
    // Validate required fields
    if (!name || !description || !price || !image || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const meal = await Meal.findByIdAndUpdate(
      req.params.id,
      { name, description, price, image, category },
      { new: true }
    );
    
    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }
    
    res.json(meal);
  } catch (error) {
    res.status(500).json({ message: 'Error updating meal' });
  }
});

// Delete meal
router.delete('/:id', async (req, res) => {
  try {
    const meal = await Meal.findByIdAndDelete(req.params.id);
    
    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }
    
    res.json({ message: 'Meal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting meal' });
  }
});

module.exports = router; 