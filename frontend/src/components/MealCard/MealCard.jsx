import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MealCard.css';

const MealCard = ({ meal }) => {
  const [showNutrition, setShowNutrition] = useState(false);
  
  const toggleNutrition = () => {
    setShowNutrition(!showNutrition);
  };
  
  return (
    <div className="meal-card">
      <div className="meal-image">
        <img src={meal.imageUrl} alt={meal.name} />
        <div className="meal-goals">
          {meal.suitableFor.map(goal => (
            <span key={goal} className={`goal-tag ${goal}`}>
              {goal}
            </span>
          ))}
        </div>
      </div>
      
      <div className="meal-content">
        <h3>{meal.name}</h3>
        <p className="meal-description">{meal.description}</p>
        
        <button 
          className="nutrition-toggle" 
          onClick={toggleNutrition}
        >
          {showNutrition ? 'Hide Nutrition' : 'View Nutrition'}
        </button>
        
        {showNutrition && (
          <div className="nutrition-info">
            <div className="macro-bar">
              <div 
                className="protein" 
                style={{width: `${(meal.macros.protein / meal.macros.total) * 100}%`}}
              >
                P: {meal.macros.protein}g
              </div>
              <div 
                className="carbs"
                style={{width: `${(meal.macros.carbs / meal.macros.total) * 100}%`}}
              >
                C: {meal.macros.carbs}g
              </div>
              <div 
                className="fat"
                style={{width: `${(meal.macros.fat / meal.macros.total) * 100}%`}}
              >
                F: {meal.macros.fat}g
              </div>
            </div>
            <div className="calories">
              <strong>{meal.calories}</strong> calories
            </div>
          </div>
        )}
        
        <div className="meal-footer">
          <span className="meal-price">${meal.price.toFixed(2)}</span>
          <Link to={`/meal/${meal.id}`} className="btn-secondary">View Details</Link>
          <button className="btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default MealCard; 