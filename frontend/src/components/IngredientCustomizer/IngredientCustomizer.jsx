import React, { useState } from 'react';
import './IngredientCustomizer.css';

const IngredientCustomizer = ({ ingredients, onChange }) => {
  const [customizations, setCustomizations] = useState({});
  
  const handleCustomization = (ingredientId, action) => {
    let newCustomizations = { ...customizations };
    
    // Initialize if not exists
    if (!newCustomizations[ingredientId]) {
      newCustomizations[ingredientId] = { quantity: 1, removed: false };
    }
    
    // Handle different actions
    switch (action) {
      case 'increase':
        newCustomizations[ingredientId].quantity = Math.min(
          (newCustomizations[ingredientId].quantity || 1) + 1, 
          3
        ); // Max 3x
        newCustomizations[ingredientId].removed = false;
        break;
      case 'decrease':
        newCustomizations[ingredientId].quantity = Math.max(
          (newCustomizations[ingredientId].quantity || 1) - 1,
          0.5
        ); // Min 0.5x
        newCustomizations[ingredientId].removed = false;
        break;
      case 'remove':
        newCustomizations[ingredientId].removed = true;
        break;
      case 'add':
        newCustomizations[ingredientId].removed = false;
        newCustomizations[ingredientId].quantity = 1;
        break;
      default:
        break;
    }
    
    setCustomizations(newCustomizations);
    onChange(newCustomizations);
  };
  
  return (
    <div className="ingredient-customizer">
      <div className="ingredients-list">
        {ingredients.map(ingredient => {
          const customization = customizations[ingredient.id] || { quantity: 1, removed: false };
          const isRemoved = customization.removed;
          
          return (
            <div 
              key={ingredient.id} 
              className={`ingredient-item ${isRemoved ? 'removed' : ''}`}
            >
              <div className="ingredient-info">
                <img 
                  src={ingredient.imageUrl} 
                  alt={ingredient.name} 
                  className="ingredient-image" 
                />
                <div className="ingredient-details">
                  <span className="ingredient-name">{ingredient.name}</span>
                  <span className="ingredient-calories">
                    {Math.round(ingredient.calories * (isRemoved ? 0 : customization.quantity))} cal
                  </span>
                </div>
              </div>
              
              {!isRemoved ? (
                <div className="ingredient-controls">
                  <button 
                    className="control-btn decrease"
                    onClick={() => handleCustomization(ingredient.id, 'decrease')}
                    disabled={customization.quantity <= 0.5}
                  >
                    -
                  </button>
                  <span className="quantity">
                    {customization.quantity}x
                  </span>
                  <button 
                    className="control-btn increase"
                    onClick={() => handleCustomization(ingredient.id, 'increase')}
                    disabled={customization.quantity >= 3}
                  >
                    +
                  </button>
                  <button 
                    className="control-btn remove"
                    onClick={() => handleCustomization(ingredient.id, 'remove')}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button 
                  className="control-btn add"
                  onClick={() => handleCustomization(ingredient.id, 'add')}
                >
                  Add
                </button>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="customization-note">
        <p>Note: Customizing ingredients will affect nutritional values.</p>
      </div>
    </div>
  );
};

export default IngredientCustomizer; 