// src/components/RecommendedAppsSection.jsx
import React from 'react';
import "../style/RecommendedAppsSection.css";

const RecommendedAppsSection = () => {
  // داتا عشوائية جوا الكومبوننت
  const recommendedAppsData = [
    {
      id: 1,
      image: "https://via.placeholder.com/300x200?text=Fitness+App",
      name: "Fitness Pro",
      description: "Track your workouts and reach your goals faster."
    },
    {
      id: 2,
      image: "https://via.placeholder.com/300x200?text=Meditation+App",
      name: "Meditation Master",
      description: "Calm your mind with guided meditations."
    },
    {
      id: 3,
      image: "https://via.placeholder.com/300x200?text=Nutrition+App",
      name: "Healthy Bites",
      description: "Plan your meals and monitor your calorie intake."
    },
    {
      id: 4,
      image: "https://via.placeholder.com/300x200?text=Running+App",
      name: "Run Tracker",
      description: "Monitor your runs and analyze your performance."
    }
  ];

  return (
    <section className="recommended-apps">
      <h2 className="section-title">Recommended Apps</h2>
      <div className="apps-grid">
        {recommendedAppsData.map((app) => (
          <div key={app.id} className="app-card">
            <img src={app.image} alt={app.name} className="app-image" />
            <div className="app-info">
              <h3 className="app-name">{app.name}</h3>
              <p className="app-description">{app.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedAppsSection;
