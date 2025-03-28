import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';

function Search({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5004/api/meals/search?q=${encodeURIComponent(searchQuery)}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Search results:', data); // Debug log
      setSearchResults(data);
    } catch (error) {
      console.error('Search error:', error);
      setError('Failed to fetch search results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleMealClick = (mealId) => {
    navigate(`/meal/${mealId}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="search-overlay">
      <div className="search-modal">
        <button className="close-search" onClick={onClose}>×</button>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search meals..."
            autoFocus
          />
          <button type="submit">Search</button>
        </form>

        <div className="search-results">
          {loading && <div className="loading">Searching...</div>}
          {error && <div className="error-message">{error}</div>}
          {!loading && !error && searchResults.length === 0 && searchQuery && (
            <div className="no-results">No meals found</div>
          )}
          {!loading && !error && searchResults.map(meal => (
            <div 
              key={meal._id} 
              className="search-result-item"
              onClick={() => handleMealClick(meal._id)}
            >
              <img src={meal.image} alt={meal.name} />
              <div className="result-info">
                <h3>{meal.name}</h3>
                <p>{meal.description}</p>
                <span className="price">${meal.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search; 