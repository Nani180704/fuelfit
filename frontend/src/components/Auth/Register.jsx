import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    fitnessGoals: 'weight-loss',
    dietaryPreferences: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const updatedPreferences = checked
        ? [...formData.dietaryPreferences, value]
        : formData.dietaryPreferences.filter(pref => pref !== value);
      
      setFormData(prev => ({
        ...prev,
        dietaryPreferences: updatedPreferences
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5004/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          fitnessGoals: formData.fitnessGoals,
          dietaryPreferences: formData.dietaryPreferences
        })
      });
      
      console.log('Response received:', response.status);
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      setError('Connection failed. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Account</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>
          <div className="form-group">
            <label htmlFor="fitnessGoals">Fitness Goals</label>
            <select
              id="fitnessGoals"
              name="fitnessGoals"
              value={formData.fitnessGoals}
              onChange={handleChange}
            >
              <option value="weight-loss">Weight Loss</option>
              <option value="muscle-gain">Muscle Gain</option>
              <option value="maintenance">Maintenance</option>
              <option value="general-health">General Health</option>
            </select>
          </div>
          <div className="form-group">
            <label>Dietary Preferences</label>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="dietaryPreferences"
                  value="vegetarian"
                  onChange={handleChange}
                /> Vegetarian
              </label>
              <label>
                <input
                  type="checkbox"
                  name="dietaryPreferences"
                  value="vegan"
                  onChange={handleChange}
                /> Vegan
              </label>
              <label>
                <input
                  type="checkbox"
                  name="dietaryPreferences"
                  value="gluten-free"
                  onChange={handleChange}
                /> Gluten-Free
              </label>
            </div>
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="auth-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register; 