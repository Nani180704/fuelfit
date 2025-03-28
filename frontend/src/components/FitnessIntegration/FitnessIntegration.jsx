import React, { useState } from 'react';
import './FitnessIntegration.css';

const supportedApps = [
  { id: 'googlefit', name: 'Google Fit', icon: 'googlefit' },
  { id: 'applehealth', name: 'Apple Health', icon: 'applehealth' },
  { id: 'fitbit', name: 'Fitbit', icon: 'fitbit' },
  { id: 'garmin', name: 'Garmin Connect', icon: 'garmin' }
];

const FitnessIntegration = ({ stats }) => {
  const [connectedApps, setConnectedApps] = useState(['googlefit']);
  const [connectingApp, setConnectingApp] = useState(null);
  
  const connectApp = async (appId) => {
    setConnectingApp(appId);
    
    // Simulate API connection
    setTimeout(() => {
      setConnectedApps([...connectedApps, appId]);
      setConnectingApp(null);
    }, 1500);
  };
  
  const disconnectApp = async (appId) => {
    setConnectedApps(connectedApps.filter(app => app !== appId));
  };
  
  return (
    <div className="fitness-integration">
      <div className="integration-header">
        <h3>Fitness App Integration</h3>
        <p>Connect your fitness apps to personalize your meal recommendations</p>
      </div>
      
      <div className="connected-apps">
        {supportedApps.map(app => {
          const isConnected = connectedApps.includes(app.id);
          
          return (
            <div key={app.id} className={`app-card ${isConnected ? 'connected' : ''}`}>
              <div className={`app-icon icon-${app.icon}`}></div>
              <span>{app.name}</span>
              
              <button 
                className={`btn-${isConnected ? 'disconnect' : 'connect'}`}
                onClick={() => isConnected ? disconnectApp(app.id) : connectApp(app.id)}
                disabled={connectingApp === app.id}
              >
                {connectingApp === app.id 
                  ? 'Connecting...' 
                  : isConnected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          );
        })}
      </div>
      
      {stats && (
        <div className="fitness-stats">
          <h3>Your Fitness Stats</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-value">{stats.dailySteps}</span>
              <span className="stat-label">Daily Steps</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{stats.caloriesBurned}</span>
              <span className="stat-label">Calories Burned</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{stats.activeMinutes}</span>
              <span className="stat-label">Active Minutes</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{stats.workouts}</span>
              <span className="stat-label">Workouts This Week</span>
            </div>
          </div>
          
          <div className="recommended-intake">
            <h4>Recommended Daily Intake</h4>
            <div className="intake-bars">
              <div className="intake-bar">
                <span className="intake-label">Calories</span>
                <div className="bar-container">
                  <div 
                    className="bar-fill" 
                    style={{width: `${Math.min((stats.currentCalories / stats.recommendedCalories) * 100, 100)}%`}}
                  ></div>
                </div>
                <span className="intake-values">
                  {stats.currentCalories} / {stats.recommendedCalories}
                </span>
              </div>
              
              <div className="intake-bar">
                <span className="intake-label">Protein</span>
                <div className="bar-container">
                  <div 
                    className="bar-fill protein" 
                    style={{width: `${Math.min((stats.currentProtein / stats.recommendedProtein) * 100, 100)}%`}}
                  ></div>
                </div>
                <span className="intake-values">
                  {stats.currentProtein}g / {stats.recommendedProtein}g
                </span>
              </div>
              
              <div className="intake-bar">
                <span className="intake-label">Carbs</span>
                <div className="bar-container">
                  <div 
                    className="bar-fill carbs" 
                    style={{width: `${Math.min((stats.currentCarbs / stats.recommendedCarbs) * 100, 100)}%`}}
                  ></div>
                </div>
                <span className="intake-values">
                  {stats.currentCarbs}g / {stats.recommendedCarbs}g
                </span>
              </div>
              
              <div className="intake-bar">
                <span className="intake-label">Fat</span>
                <div className="bar-container">
                  <div 
                    className="bar-fill fat" 
                    style={{width: `${Math.min((stats.currentFat / stats.recommendedFat) * 100, 100)}%`}}
                  ></div>
                </div>
                <span className="intake-values">
                  {stats.currentFat}g / {stats.recommendedFat}g
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FitnessIntegration; 