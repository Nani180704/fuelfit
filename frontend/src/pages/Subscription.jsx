import React, { useState } from 'react';
import './Subscription.css';

const subscriptionPlans = [
  {
    id: 'weekly-5',
    name: 'Weekly Essentials',
    meals: 5,
    frequency: 'weekly',
    price: 49.99,
    description: 'Perfect for weekday lunches or dinners',
    features: [
      '5 fitness-focused meals per week',
      'Personalized to your goals',
      'Free delivery',
      'Weekly menu rotation'
    ]
  },
  {
    id: 'weekly-10',
    name: 'Weekly Complete',
    meals: 10,
    frequency: 'weekly',
    price: 89.99,
    description: 'Full coverage for a healthy week',
    features: [
      '10 fitness-focused meals per week',
      'Personalized to your goals',
      'Free delivery',
      'Weekly menu rotation',
      'Priority delivery scheduling'
    ]
  },
  {
    id: 'monthly-20',
    name: 'Monthly Fitness Pro',
    meals: 20,
    frequency: 'monthly',
    price: 169.99,
    description: 'Serious fitness enthusiasts choice',
    features: [
      '20 fitness-focused meals per month',
      'Personalized to your goals',
      'Free delivery',
      'Monthly menu rotation',
      'Priority delivery scheduling',
      'Access to exclusive recipes',
      '1 free consultation with nutritionist'
    ]
  }
];

function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedGoal, setSelectedGoal] = useState('weight-loss');
  
  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };
  
  const handleSubscribe = () => {
    if (!selectedPlan) return;
    
    // Handle subscription process
    // ... existing code ...
  };
  
  return (
    <div className="subscription-container">
      <div className="subscription-header">
        <h1>Meal Subscription Plans</h1>
        <p>Stay consistent with your nutrition goals by subscribing to regular deliveries</p>
      </div>
      
      <div className="goal-selection">
        <h2>I want meals for:</h2>
        <div className="goal-buttons">
          <button 
            className={selectedGoal === 'weight-loss' ? 'active' : ''}
            onClick={() => setSelectedGoal('weight-loss')}
          >
            Weight Loss
          </button>
          <button 
            className={selectedGoal === 'muscle-gain' ? 'active' : ''}
            onClick={() => setSelectedGoal('muscle-gain')}
          >
            Muscle Gain
          </button>
          <button 
            className={selectedGoal === 'maintenance' ? 'active' : ''}
            onClick={() => setSelectedGoal('maintenance')}
          >
            Maintenance
          </button>
          <button 
            className={selectedGoal === 'performance' ? 'active' : ''}
            onClick={() => setSelectedGoal('performance')}
          >
            Performance
          </button>
        </div>
      </div>
      
      <div className="subscription-plans">
        {subscriptionPlans.map(plan => (
          <div 
            key={plan.id}
            className={`plan-card ${selectedPlan === plan.id ? 'selected' : ''}`}
            onClick={() => handlePlanSelect(plan.id)}
          >
            <div className="plan-header">
              <h3>{plan.name}</h3>
              <p>{plan.description}</p>
            </div>
            
            <div className="plan-price">
              <span className="price-amount">${plan.price}</span>
              <span className="price-period">per {plan.frequency} plan</span>
            </div>
            
            <div className="plan-meals">
              <span className="meals-count">{plan.meals}</span>
              <span className="meals-label">meals per {plan.frequency}</span>
            </div>
            
            <ul className="plan-features">
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            
            <button 
              className={`plan-select-btn ${selectedPlan === plan.id ? 'selected' : ''}`}
            >
              {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>
      
      {selectedPlan && (
        <div className="subscription-summary">
          <h2>Subscription Summary</h2>
          <div className="summary-details">
            {/* Summary details of selected plan */}
            <div className="summary-goal">
              Selected Goal: <strong>{selectedGoal.replace('-', ' ')}</strong>
            </div>
            <div className="summary-plan">
              Plan: <strong>{subscriptionPlans.find(p => p.id === selectedPlan).name}</strong>
            </div>
            <div className="summary-price">
              Price: <strong>${subscriptionPlans.find(p => p.id === selectedPlan).price}/
              {subscriptionPlans.find(p => p.id === selectedPlan).frequency}</strong>
            </div>
          </div>
          
          <button 
            className="btn-subscribe" 
            onClick={handleSubscribe}
          >
            Subscribe Now
          </button>
        </div>
      )}
      
      <div className="subscription-faq">
        <h2>Frequently Asked Questions</h2>
        {/* FAQ accordions */}
      </div>
    </div>
  );
}

export default Subscription; 