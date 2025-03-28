import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalMeals: 0,
    activeMealPlans: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
    
    // Set up polling to refresh stats every minute
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      console.log('Fetching dashboard stats...'); // Debug log
      
      const response = await fetch('http://localhost:5004/api/admin/dashboard-stats');
      console.log('Response status:', response.status); // Debug log
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error response:', errorData); // Debug log
        throw new Error(errorData.message || 'Failed to fetch dashboard stats');
      }
      
      const data = await response.json();
      console.log('Fetched stats:', data); // Debug log
      
      setStats(data);
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-value">{stats.totalOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Total Meals</h3>
          <p className="stat-value">{stats.totalMeals}</p>
        </div>
        <div className="stat-card">
          <h3>Active Meal Plans</h3>
          <p className="stat-value">{stats.activeMealPlans}</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-value">${stats.totalRevenue.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="dashboard-refresh">
        <button onClick={fetchStats} className="refresh-btn">
          Refresh Dashboard
        </button>
      </div>
    </div>
  );
}

export default Dashboard; 