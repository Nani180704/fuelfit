import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Account.css';

function Account() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    fitnessGoals: '',
    dietaryPreferences: []
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(userData);
    setFormData({
      name: userData.name,
      email: userData.email,
      fitnessGoals: userData.fitnessGoals || '',
      dietaryPreferences: userData.dietaryPreferences || []
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5004/api/users/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const updatedUser = await response.json();
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="account-container">
      <div className="account-box">
        <h2>My Account</h2>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="account-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className="form-group">
              <label>Fitness Goals</label>
              <select
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
            <div className="form-actions">
              <button type="submit" className="save-btn">Save Changes</button>
              <button 
                type="button" 
                onClick={() => setIsEditing(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="account-info">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Fitness Goals:</strong> {user.fitnessGoals}</p>
            <div className="account-actions">
              <button onClick={handleEdit} className="edit-btn">Edit Profile</button>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Account; 