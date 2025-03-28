import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RelatedMeals.css';

// Sample meals for development
const sampleMeals = [
  {
    id: 2,
    name: "Lemon Herb Chicken with Quinoa",
    description: "Tender chicken breast with quinoa and vegetables in a light lemon herb sauce",
    imageUrl: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b",
    suitableFor: ["weight-loss", "muscle-gain"],
    price: 13.99,
    calories: 420,
    macros: {
      protein: 32,
      carbs: 40,
      fat: 14,
      total: 86
    },
    category: "protein-rich"
  },
  {
    id: 3,
    name: "Turkey Meatballs with Sweet Potato",
    description: "Lean turkey meatballs with mashed sweet potato and green beans",
    imageUrl: "https://images.unsplash.com/photo-1529042410759-befb1204b468",
    suitableFor: ["weight-loss", "performance"],
    price: 12.49,
    calories: 380,
    macros: {
      protein: 30,
      carbs: 35,
      fat: 12,
      total: 77
    },
    category: "protein-rich"
  },
  {
    id: 4,
    name: "Salmon Power Bowl",
    description: "Wild-caught salmon with brown rice, roasted vegetables, and avocado",
    imageUrl: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d",
    suitableFor: ["muscle-gain", "performance"],
    price: 15.99,
    calories: 520,
    macros: {
      protein: 35,
      carbs: 42,
      fat: 28,
      total: 105
    },
    category: "protein-rich"
  }
];

const RelatedMeals = ({ currentMealId, category, goals }) => {
  const [meals, setMeals] = useState([]);
  
  useEffect(() => {
    // In a real app, fetch from API based on category and goals
    // For now, filter sample data
    
    const filtered = sampleMeals
      .filter(meal => meal.id !== currentMealId) // Exclude current meal
      .filter(meal => meal.category === category || 
        meal.suitableFor.some(goal => goals.includes(goal))
      )
      .slice(0, 3); // Limit to 3 meals
    
    setMeals(filtered);
  }, [currentMealId, category, goals]);
  
  if (meals.length === 0) {
    return null; // Don't show section if no related meals
  }
  
  return (
    <div className="related-meals">
      <div className="related-meals-grid">
        {meals.map(meal => (
          <div key={meal.id} className="related-meal-card">
            <div className="related-meal-image">
              <img src={meal.imageUrl} alt={meal.name} />
              <div className="related-meal-price">${meal.price.toFixed(2)}</div>
            </div>
            
            <div className="related-meal-content">
              <h3>{meal.name}</h3>
              <p>{meal.description}</p>
              
              <div className="related-meal-macros">
                <div className="related-meal-calories">
                  <span className="macro-value">{meal.calories}</span>
                  <span className="macro-label">calories</span>
                </div>
                <div className="macro-values">
                  <span>P: {meal.macros.protein}g</span>
                  <span>C: {meal.macros.carbs}g</span>
                  <span>F: {meal.macros.fat}g</span>
                </div>
              </div>
              
              <div className="related-meal-tags">
                {meal.suitableFor.map(tag => (
                  <span key={tag} className={`meal-tag ${tag}`}>
                    {tag.replace('-', ' ')}
                  </span>
                ))}
              </div>
              
              <Link to={`/meal/${meal.id}`} className="btn-view-meal">
                View Meal
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedMeals; 