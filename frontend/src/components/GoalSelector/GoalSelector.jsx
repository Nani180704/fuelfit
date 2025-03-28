import React from 'react';
import './GoalSelector.css';

const goals = [
  { id: 'weight-loss', name: 'Weight Loss', icon: 'scale-down' },
  { id: 'muscle-gain', name: 'Muscle Gain', icon: 'muscle' },
  { id: 'maintenance', name: 'Maintenance', icon: 'balance' },
  { id: 'performance', name: 'Performance', icon: 'running' },
  { id: 'keto', name: 'Keto', icon: 'ketogenic' },
  { id: 'vegan', name: 'Vegan', icon: 'plant' },
  { id: 'paleo', name: 'Paleo', icon: 'caveman' }
];

const GoalSelector = ({ selectedGoal, setSelectedGoal }) => {
  return (
    <div className="goal-selector">
      {goals.map(goal => (
        <div 
          key={goal.id}
          className={`goal-option ${selectedGoal === goal.id ? 'selected' : ''}`}
          onClick={() => setSelectedGoal(goal.id)}
        >
          <div className="goal-icon">
            <i className={`icon-${goal.icon}`}></i>
          </div>
          <span>{goal.name}</span>
        </div>
      ))}
    </div>
  );
};

export default GoalSelector; 