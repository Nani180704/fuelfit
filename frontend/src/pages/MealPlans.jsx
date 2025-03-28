import React, { useState } from 'react';
import './MealPlans.css';

const mealPlans = [
  {
    id: 'weight-loss',
    name: 'Weight Loss Plan',
    description: 'Calorie-controlled meals designed for sustainable weight loss',
    meals: [
      { day: 'Monday', breakfast: 'Protein Smoothie Bowl', lunch: 'Grilled Chicken Salad', dinner: 'Baked Salmon with Vegetables' },
      // Add more days...
    ],
    calories: '1500-1800',
    protein: '120g-140g',
    price: 149.99
  },
  // Add more meal plans...
];

function MealPlans() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [userGoal, setUserGoal] = useState('');
  const [calorieTarget, setCalorieTarget] = useState('');

  return (
    <div className="meal-plans-page">
      <div className="meal-plans-header">
        <h1>Personalized Meal Plans</h1>
        <p>Get a customized meal plan designed for your fitness goals</p>
      </div>

      <div className="goal-questionnaire">
        <h2>Customize Your Plan</h2>
        <div className="form-group">
          <label>What's your primary goal?</label>
          <select value={userGoal} onChange={(e) => setUserGoal(e.target.value)}>
            <option value="">Select a goal</option>
            <option value="weight-loss">Weight Loss</option>
            <option value="muscle-gain">Muscle Gain</option>
            <option value="maintenance">Maintenance</option>
            <option value="performance">Athletic Performance</option>
          </select>
        </div>

        <div className="form-group">
          <label>Daily Calorie Target</label>
          <select value={calorieTarget} onChange={(e) => setCalorieTarget(e.target.value)}>
            <option value="">Select calorie range</option>
            <option value="1500">1500-1800 calories</option>
            <option value="1800">1800-2100 calories</option>
            <option value="2100">2100-2400 calories</option>
            <option value="2400">2400+ calories</option>
          </select>
        </div>
      </div>

      <div className="meal-plans-grid">
        {mealPlans.map(plan => (
          <div 
            key={plan.id} 
            className={`plan-card ${selectedPlan === plan.id ? 'selected' : ''}`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            <h3>{plan.name}</h3>
            <p>{plan.description}</p>
            <div className="plan-details">
              <div className="detail">
                <span className="label">Daily Calories:</span>
                <span className="value">{plan.calories}</span>
              </div>
              <div className="detail">
                <span className="label">Protein Target:</span>
                <span className="value">{plan.protein}</span>
              </div>
            </div>
            <div className="plan-price">
              <span className="price">${plan.price}</span>
              <span className="period">/month</span>
            </div>
            <button className="btn-primary">Select Plan</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MealPlans; 