import React from 'react';
import { Link } from 'react-router-dom';
import './ExpertAdvice.css';

// Sample data for development
const sampleArticles = [
  {
    id: 1,
    title: "Optimizing Protein Intake for Muscle Growth",
    excerpt: "Learn the optimal timing and sources of protein to maximize muscle development and recovery.",
    imageUrl: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd",
    category: "Muscle Building",
    date: "May 15, 2023",
    expert: {
      name: "Dr. Michael Chen",
      title: "Sports Nutritionist",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  },
  {
    id: 2,
    title: "The Science of Fat Loss: Beyond Calories",
    excerpt: "Why calorie counting alone isn't enough and how hormones play a crucial role in weight management.",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    category: "Weight Loss",
    date: "June 3, 2023",
    expert: {
      name: "Sarah Johnson, PhD",
      title: "Metabolic Specialist",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    }
  },
  {
    id: 3,
    title: "Plant-Based Nutrition for Athletes",
    excerpt: "How to thrive as an athlete on a plant-based diet with proper nutrient timing and food choices.",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    category: "Vegan Nutrition",
    date: "June 20, 2023",
    expert: {
      name: "James Wilson, RD",
      title: "Plant-Based Performance Coach",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg"
    }
  }
];

const ExpertAdvice = ({ limit = 3 }) => {
  const articles = sampleArticles.slice(0, limit);
  
  return (
    <div className="expert-advice-container">
      <div className="expert-articles">
        {articles.map(article => (
          <div key={article.id} className="article-card">
            <div className="article-image">
              <img src={article.imageUrl} alt={article.title} />
              <div className="expert-badge">
                <img src={article.expert.avatar} alt={article.expert.name} />
              </div>
            </div>
            
            <div className="article-content">
              <div className="article-meta">
                <span className="article-category">{article.category}</span>
                <span className="article-date">{article.date}</span>
              </div>
              
              <h3 className="article-title">{article.title}</h3>
              <p className="article-excerpt">{article.excerpt}</p>
              
              <div className="article-footer">
                <span className="expert-name">By {article.expert.name}</span>
                <span className="expert-title">{article.expert.title}</span>
              </div>
              
              <Link to={`/expert-advice/${article.id}`} className="read-more">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <div className="view-all-articles">
        <Link to="/expert-advice" className="btn-secondary">View All Articles</Link>
      </div>
    </div>
  );
};

export default ExpertAdvice; 