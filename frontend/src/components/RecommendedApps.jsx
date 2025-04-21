// src/components/RecommendedAppsSection.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // إضافة Link من React Router
import "../style/RecommendedAppsSection.css";

const RecommendedAppsSection = () => {
  const [recommendedAppsData, setRecommendedAppsData] = useState([]);

  useEffect(() => {
    const fetchRecommendedApps = async () => {
      // الداتا المحدثة مع التقييم وعدد التحميلات
      const updatedAppsData = [
        {
          id: 8, 
          image: "https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg", 
          name: "Instagram",
          description: "Share photos and videos, and connect with people.",
          rating: 4.5,
          downloads: "500M+"
        },
        {
          id: 9,
          image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
          name: "WhatsApp",
          description: "Stay connected with friends and family via messages and calls.",
          rating: 4.7,
          downloads: "2B+"
        },
        {
          id: 10,
          image: "https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png",
          name: "YouTube",
          description: "Watch and share videos, subscribe to your favorite channels.",
          rating: 4.8,
          downloads: "10B+"
        },
        {
          id: 11,
          image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
          name: "Facebook",
          description: "Connect with friends, family, and communities on Facebook.",
          rating: 4.3,
          downloads: "5B+"
        }
      ];

      setRecommendedAppsData(updatedAppsData);
    };

    fetchRecommendedApps();
  }, []);

  return (
    <section className="recommended-apps">
      <h2 className="section-title">Recommended Apps</h2>
      <div className="apps-grid">
        {recommendedAppsData.map((app) => (
          <Link 
            key={app.id} 
            to={`/details/apps/${app.id}`}  // رابط يوجه للصفحة الخاصة بكل تطبيق
            className="app-card"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <img src={app.image} alt={app.name} className="image" />
            <div className="app-info">
              <h3 className="app-name">{app.name}</h3>
              <p className="app-description">{app.description}</p>
              <div className="app-meta">
                <p className="app-rating"><strong>Rating:</strong> {app.rating} <span className="star-icon">★</span></p>
                <p className="app-downloads"><strong>Downloads:</strong> {app.downloads}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecommendedAppsSection;
