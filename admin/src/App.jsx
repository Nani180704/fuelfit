import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import MealManagement from './pages/MealManagement';
import MealPlanManagement from './pages/MealPlanManagement';
import OrderManagement from './pages/OrderManagement';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="admin-layout">
        <Sidebar />
        <main className="admin-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/meals" element={<MealManagement />} />
            <Route path="/meal-plans" element={<MealPlanManagement />} />
            <Route path="/orders" element={<OrderManagement />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 