import React from 'react';
import './NutritionChart.css';

const NutritionChart = ({ nutrition }) => {
  // Calculate total macros for percentages
  const totalMacros = nutrition.protein + nutrition.carbs + nutrition.fat;
  
  const proteinPercent = Math.round((nutrition.protein * 4 / nutrition.calories) * 100);
  const carbsPercent = Math.round((nutrition.carbs * 4 / nutrition.calories) * 100);
  const fatPercent = Math.round((nutrition.fat * 9 / nutrition.calories) * 100);
  
  return (
    <div className="nutrition-chart">
      <div className="macros-pie-chart">
        <div className="pie-container">
          <div className="pie" style={{
            background: `conic-gradient(
              var(--protein-color) 0% ${proteinPercent}%, 
              var(--carb-color) ${proteinPercent}% ${proteinPercent + carbsPercent}%, 
              var(--fat-color) ${proteinPercent + carbsPercent}% 100%
            )`
          }}></div>
          <div className="pie-center">
            <span className="calories-value">{nutrition.calories}</span>
            <span className="calories-label">calories</span>
          </div>
        </div>
        
        <div className="macro-legend">
          <div className="legend-item">
            <div className="legend-color protein"></div>
            <div className="legend-text">
              <span className="macro-name">Protein</span>
              <span className="macro-value">{nutrition.protein}g ({proteinPercent}%)</span>
            </div>
          </div>
          
          <div className="legend-item">
            <div className="legend-color carbs"></div>
            <div className="legend-text">
              <span className="macro-name">Carbs</span>
              <span className="macro-value">{nutrition.carbs}g ({carbsPercent}%)</span>
            </div>
          </div>
          
          <div className="legend-item">
            <div className="legend-color fat"></div>
            <div className="legend-text">
              <span className="macro-name">Fat</span>
              <span className="macro-value">{nutrition.fat}g ({fatPercent}%)</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="nutrition-details">
        <div className="nutrient-row">
          <span className="nutrient-name">Fiber</span>
          <span className="nutrient-value">{nutrition.fiber}g</span>
        </div>
        <div className="nutrient-row">
          <span className="nutrient-name">Sugar</span>
          <span className="nutrient-value">{nutrition.sugar}g</span>
        </div>
        <div className="nutrient-row">
          <span className="nutrient-name">Sodium</span>
          <span className="nutrient-value">{nutrition.sodium}mg</span>
        </div>
        <div className="nutrient-row">
          <span className="nutrient-name">Cholesterol</span>
          <span className="nutrient-value">{nutrition.cholesterol}mg</span>
        </div>
      </div>
    </div>
  );
};

export default NutritionChart; 