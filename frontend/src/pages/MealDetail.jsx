import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NutritionChart from '../components/NutritionChart/NutritionChart';
import IngredientCustomizer from '../components/IngredientCustomizer/IngredientCustomizer';
import RelatedMeals from '../components/RelatedMeals/RelatedMeals';
import ExpertTip from '../components/ExpertTip/ExpertTip';
import './MealDetail.css';

// Sample meal data for development
const sampleMeal = {
  id: 1,
  name: "Grilled Chicken Power Bowl",
  description: "High-protein meal with lean grilled chicken, quinoa, and roasted vegetables. Perfect for post-workout recovery and muscle building.",
  category: "protein-rich",
  imageUrl: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
  galleryImages: [
    "https://images.unsplash.com/photo-1604503468506-a8da13d82791",
    "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b",
    "https://images.unsplash.com/photo-1602030638412-bb8dcc0bc8b0"
  ],
  suitableFor: ["weight-loss", "muscle-gain", "performance"],
  price: 12.99,
  chef: {
    name: "Alex Torres",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  nutrition: {
    calories: 450,
    protein: 35,
    carbs: 45,
    fat: 15,
    fiber: 8,
    sugar: 5,
    sodium: 520,
    cholesterol: 85
  },
  ingredients: [
    {
      id: 1,
      name: "Grilled Chicken Breast",
      amount: "120g",
      calories: 200,
      imageUrl: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b"
    },
    {
      id: 2,
      name: "Quinoa",
      amount: "1/2 cup",
      calories: 120,
      imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e8d7"
    },
    {
      id: 3,
      name: "Roasted Sweet Potato",
      amount: "70g",
      calories: 60,
      imageUrl: "https://images.unsplash.com/photo-1596434300655-e48d3ff3dd5e"
    },
    {
      id: 4,
      name: "Broccoli",
      amount: "80g",
      calories: 30,
      imageUrl: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc"
    },
    {
      id: 5,
      name: "Olive Oil",
      amount: "1 tsp",
      calories: 40,
      imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5"
    }
  ],
  dietaryInfo: [
    { name: "Gluten-Free", value: "Yes" },
    { name: "Dairy-Free", value: "Yes" },
    { name: "Soy-Free", value: "Yes" },
    { name: "Nuts", value: "No" },
    { name: "Preparation Time", value: "25 minutes" },
    { name: "Storage", value: "3 days refrigerated" }
  ]
};

function MealDetail() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customizations, setCustomizations] = useState({});
  const [nutritionAdjusted, setNutritionAdjusted] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    // In a real app, fetch meal data from API
    // For now, use sample data
    setTimeout(() => {
      setMeal(sampleMeal);
      setNutritionAdjusted(sampleMeal.nutrition);
      setLoading(false);
    }, 500);
  }, [id]);
  
  const handleCustomizationChange = (changes) => {
    setCustomizations({...customizations, ...changes});
    
    // Simplified calculation - in a real app would be more complex
    // based on ingredients' nutritional values
    const newNutrition = {...meal.nutrition};
    
    // Adjust calories, protein, carbs, fat based on customizations
    Object.entries(changes).forEach(([ingredientId, customization]) => {
      const ingredient = meal.ingredients.find(i => i.id === parseInt(ingredientId));
      if (ingredient) {
        if (customization.removed) {
          newNutrition.calories -= ingredient.calories;
        } else {
          const multiplier = customization.quantity;
          const calorieDiff = ingredient.calories * (multiplier - 1);
          newNutrition.calories += calorieDiff;
        }
      }
    });
    
    setNutritionAdjusted(newNutrition);
  };
  
  const handleQuantityChange = (action) => {
    if (action === 'increase') {
      setQuantity(Math.min(quantity + 1, 10));
    } else if (action === 'decrease') {
      setQuantity(Math.max(quantity - 1, 1));
    }
  };
  
  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading meal details...</p>
    </div>
  );
  
  if (!meal) return (
    <div className="error-container">
      <h2>Meal not found</h2>
      <p>The meal you're looking for doesn't exist or has been removed.</p>
    </div>
  );
  
  return (
    <div className="meal-detail-container">
      <div className="meal-detail-header">
        <div className="meal-images">
          <img 
            src={meal.imageUrl} 
            alt={meal.name} 
            className="meal-main-image" 
          />
          <div className="meal-gallery">
            {meal.galleryImages.map((img, index) => (
              <img key={index} src={img} alt={`${meal.name} - view ${index + 1}`} />
            ))}
          </div>
        </div>
        
        <div className="meal-overview">
          <div className="meal-tags">
            {meal.suitableFor.map(tag => (
              <span key={tag} className={`meal-tag ${tag}`}>{tag.replace('-', ' ')}</span>
            ))}
          </div>
          <h1>{meal.name}</h1>
          <p className="meal-description">{meal.description}</p>
          
          <div className="meal-chef">
            <img src={meal.chef.avatar} alt={meal.chef.name} />
            <span>Prepared by <strong>{meal.chef.name}</strong></span>
          </div>
          
          <div className="meal-quick-stats">
            <div className="stat">
              <span className="stat-value">{nutritionAdjusted.calories}</span>
              <span className="stat-label">Calories</span>
            </div>
            <div className="stat">
              <span className="stat-value">{nutritionAdjusted.protein}g</span>
              <span className="stat-label">Protein</span>
            </div>
            <div className="stat">
              <span className="stat-value">{nutritionAdjusted.carbs}g</span>
              <span className="stat-label">Carbs</span>
            </div>
            <div className="stat">
              <span className="stat-value">{nutritionAdjusted.fat}g</span>
              <span className="stat-label">Fat</span>
            </div>
          </div>
          
          <div className="meal-price-actions">
            <div className="meal-price">
              <span className="price-value">${meal.price.toFixed(2)}</span>
              <span className="price-per">per serving</span>
            </div>
            
            <div className="meal-actions">
              <div className="quantity-selector">
                <button 
                  className="quantity-btn decrease" 
                  onClick={() => handleQuantityChange('decrease')}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="quantity-value">{quantity}</span>
                <button 
                  className="quantity-btn increase" 
                  onClick={() => handleQuantityChange('increase')}
                  disabled={quantity >= 10}
                >
                  +
                </button>
              </div>
              <button className="btn-primary add-to-cart">
                Add to Cart - ${(meal.price * quantity).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="meal-detail-content">
        <div className="meal-nutrition">
          <h2>Nutrition Information</h2>
          <NutritionChart nutrition={nutritionAdjusted} />
        </div>
        
        <div className="meal-customization">
          <h2>Customize Your Meal</h2>
          <p>Adjust ingredients based on your preferences</p>
          
          <IngredientCustomizer 
            ingredients={meal.ingredients}
            onChange={handleCustomizationChange}
          />
        </div>
        
        <div className="meal-expert-tip">
          <h2>Nutritionist's Note</h2>
          <ExpertTip mealType={meal.category} />
        </div>
        
        <div className="meal-dietary-info">
          <h2>Dietary Information</h2>
          <ul className="dietary-info-list">
            {meal.dietaryInfo.map(info => (
              <li key={info.name} className="dietary-info-item">
                <span className="info-name">{info.name}:</span> 
                <span className="info-value">{info.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="meal-related">
        <h2>Similar Meals You Might Like</h2>
        <RelatedMeals 
          currentMealId={meal.id} 
          category={meal.category} 
          goals={meal.suitableFor}
        />
      </div>
    </div>
  );
}

export default MealDetail; 