import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MealCard from '../components/MealCard/MealCard';
import GoalSelector from '../components/GoalSelector/GoalSelector';
import FitnessIntegration from '../components/FitnessIntegration/FitnessIntegration';
import ExpertAdvice from '../components/ExpertAdvice/ExpertAdvice';
import './Home.css';

// Sample data for development
const sampleMeals = [
  {
    id: 1,
    name: "Grilled Chicken Power Bowl",
    description: "High-protein meal with lean grilled chicken, quinoa, and roasted vegetables",
    imageUrl: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
    suitableFor: ["weight-loss", "muscle-gain"],
    price: 12.99,
    calories: 450,
    macros: {
      protein: 35,
      carbs: 45,
      fat: 15,
      total: 95
    }
  },
  {
    id: 2,
    name: "Keto Avocado Burger",
    description: "Low-carb burger with grass-fed beef, avocado, and lettuce wrap",
    imageUrl: "https://images.unsplash.com/photo-1551782450-17144efb9c50",
    suitableFor: ["keto", "paleo"],
    price: 14.99,
    calories: 520,
    macros: {
      protein: 28,
      carbs: 8,
      fat: 42,
      total: 78
    }
  },
  {
    id: 3,
    name: "Vegan Buddha Bowl",
    description: "Plant-based bowl with tofu, sweet potato, kale, and tahini dressing",
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999",
    suitableFor: ["vegan", "weight-loss"],
    price: 11.99,
    calories: 380,
    macros: {
      protein: 20,
      carbs: 55,
      fat: 12,
      total: 87
    }
  }
];

// Sample user fitness stats
const sampleUserStats = {
  dailySteps: 8456,
  caloriesBurned: 1845,
  activeMinutes: 68,
  workouts: 3,
  currentCalories: 1650,
  recommendedCalories: 2200,
  currentProtein: 120,
  recommendedProtein: 150,
  currentCarbs: 180,
  recommendedCarbs: 220,
  currentFat: 55,
  recommendedFat: 70
};

function Home() {
  const [selectedGoal, setSelectedGoal] = useState('weight-loss');
  const [recommendedMeals, setRecommendedMeals] = useState(sampleMeals);
  const [userStats, setUserStats] = useState(sampleUserStats);
  
  useEffect(() => {
    // Filter meals based on selected goal
    const filteredMeals = sampleMeals.filter(meal => 
      meal.suitableFor.includes(selectedGoal)
    );
    
    setRecommendedMeals(filteredMeals.length > 0 ? filteredMeals : sampleMeals);
  }, [selectedGoal]);

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Fuel Your Fitness Journey</h1>
          <p>Healthy, goal-oriented meals delivered to your doorstep</p>
          <Link to="/meal-plans" className="btn-primary">Get Started</Link>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1547592180-85f173990554" alt="Healthy Meal Prep" />
        </div>
      </section>

      <section className="goals-section">
        <h2>Select Your Fitness Goal</h2>
        <GoalSelector 
          selectedGoal={selectedGoal} 
          setSelectedGoal={setSelectedGoal} 
        />
      </section>

      <section className="recommended-meals">
        <div className="section-header">
          <h2>Recommended for {selectedGoal.replace('-', ' ')}</h2>
          <Link to="/meals">View All</Link>
        </div>
        <div className="meals-grid">
          {recommendedMeals.map(meal => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>
      </section>

      {userStats && (
        <section className="fitness-stats">
          <h2>Your Fitness Progress</h2>
          <FitnessIntegration stats={userStats} />
        </section>
      )}

      <section className="subscription-banner">
        <div className="banner-content">
          <h2>Stay on Track with Meal Subscriptions</h2>
          <p>Never miss a meal. Get weekly or monthly plans delivered consistently.</p>
          <Link to="/subscriptions" className="btn-primary">View Plans</Link>
        </div>
      </section>

      <section className="expert-advice">
        <h2>Tips from Our Nutrition Experts</h2>
        <ExpertAdvice limit={3} />
      </section>
    </div>
  );
}

export default Home; 