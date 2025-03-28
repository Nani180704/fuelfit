import React from 'react';
import './ExpertTip.css';

const tips = {
  'protein-rich': {
    content: "Protein-rich meals help with muscle recovery and satiety. For optimal absorption, consume within 30 minutes after intense workout sessions.",
    expert: {
      name: "Dr. Lisa Chen",
      title: "Sports Nutritionist",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    }
  },
  'low-carb': {
    content: "This low-carb meal is ideal for those following a ketogenic diet. Consider pairing with healthy fats like avocado to maintain ketosis and energy levels.",
    expert: {
      name: "Mark Johnson, RD",
      title: "Keto Nutrition Specialist",
      avatar: "https://randomuser.me/api/portraits/men/43.jpg"
    }
  },
  'balanced': {
    content: "This balanced meal provides a good mix of macronutrients for sustainable energy. For optimal digestion, take your time eating and chew thoroughly.",
    expert: {
      name: "Sarah Williams, MS",
      title: "Clinical Dietitian",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    }
  },
  'plant-based': {
    content: "This plant-based meal is rich in phytonutrients and antioxidants. Consider adding a B12 supplement if you follow a strict vegan diet.",
    expert: {
      name: "Dr. Michael Green",
      title: "Plant-Based Nutrition Expert",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg"
    }
  },
  'performance': {
    content: "This meal is designed for high-performance athletes. Consume 2-3 hours before activity for optimal fuel, or within 1 hour after for recovery.",
    expert: {
      name: "Jennifer Lopez, CSCS",
      title: "Performance Nutritionist",
      avatar: "https://randomuser.me/api/portraits/women/49.jpg"
    }
  }
};

const ExpertTip = ({ mealType }) => {
  // Default to balanced if mealType doesn't match
  const type = tips[mealType] ? mealType : 'balanced';
  const tip = tips[type];
  
  return (
    <div className="expert-tip">
      <div className="tip-content">
        <div className="quote-mark">"</div>
        <p>{tip.content}</p>
      </div>
      
      <div className="expert-info">
        <img 
          src={tip.expert.avatar} 
          alt={tip.expert.name} 
          className="expert-avatar" 
        />
        <div className="expert-credentials">
          <span className="expert-name">{tip.expert.name}</span>
          <span className="expert-title">{tip.expert.title}</span>
        </div>
      </div>
    </div>
  );
};

export default ExpertTip; 