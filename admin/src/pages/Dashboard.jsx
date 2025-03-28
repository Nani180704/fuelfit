import React from 'react';

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-value">0</p>
        </div>
        <div className="stat-card">
          <h3>Active Meal Plans</h3>
          <p className="stat-value">0</p>
        </div>
        <div className="stat-card">
          <h3>Total Meals</h3>
          <p className="stat-value">0</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 