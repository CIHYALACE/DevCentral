// src/components/RecommendedAppsSection.jsx
import React, { useState, useEffect } from 'react';
import AppCard from './AppCard'; 

const RecommendedAppsSection = () => {
  const [recommendedAppsData, setRecommendedAppsData] = useState([]);

  useEffect(() => {
    const fetchRecommendedApps = async () => {
      const updatedAppsData = [
        {
          id: 8,
          image: "https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg",
          name: "Instagram",
          rating: 4.5,
          downloads: "500M+",
          price: 0
        },
        {
          id: 9,
          image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
          name: "WhatsApp",
          rating: 4.7,
          downloads: "2B+",
          price: 0
        },
        {
          id: 10,
          image: "https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png",
          name: "YouTube",
          rating: 4.8,
          downloads: "10B+",
          price: 0
        },
        {
          id: 11,
          image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
          name: "Facebook",
          rating: 4.3,
          downloads: "5B+",
          price: 0
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
          <AppCard app={app} key={app.id} /> 
        ))}
      </div>
    </section>
  );
};

export default RecommendedAppsSection;
