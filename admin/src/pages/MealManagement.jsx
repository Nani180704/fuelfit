import React, { useState, useEffect } from 'react';
import MealForm from '../components/MealForm/MealForm';
import './MealManagement.css';

function MealManagement() {
  const [meals, setMeals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await fetch('http://localhost:5004/api/meals', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMeals(data);
      setLoading(false);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleAddMeal = async (mealData) => {
    try {
      const response = await fetch('http://localhost:5004/api/meals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mealData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add meal');
      }
      
      await fetchMeals();
      setShowForm(false);
    } catch (err) {
      console.error('Error adding meal:', err);
      throw err;
    }
  };

  if (loading) return <div className="loading">Loading meals...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="meal-management">
      <div className="header">
        <h1>Meal Management</h1>
        <button 
          className="add-meal-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add New Meal'}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <h2>Add New Meal</h2>
          <MealForm onSubmit={handleAddMeal} />
        </div>
      )}

      <div className="meals-list">
        <h2>Current Meals</h2>
        <div className="meals-grid">
          {meals.length === 0 ? (
            <p>No meals available</p>
          ) : (
            meals.map(meal => (
              <div key={meal._id} className="meal-card">
                <img src={meal.image} alt={meal.name} />
                <div className="meal-info">
                  <h3>{meal.name}</h3>
                  <p>${meal.price}</p>
                  <div className="meal-actions">
                    <button onClick={() => handleEditMeal(meal)}>Edit</button>
                    <button onClick={() => handleDeleteMeal(meal._id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MealManagement; 