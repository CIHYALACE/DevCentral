// src/pages/HomePage.jsx
import React from 'react';
import SpecialOffer from '../layout/SpecialOffer'; // تأكد إن المسار صحيح
import HeroSlider from './HeroSlider';
import "../style/home.css"; // تأكد إن المسار صحيح
import HealthFitness from './HealthANDFitness';
import RecommendedAppsSection from './RecommendedApps';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <HeroSlider />

      {/* Special Offer Section */}
      <div className="offer-section">
        <h2 className="section-title">Today's Special Offer</h2>
        <SpecialOffer />
      </div>

      <div>
        <HealthFitness />
      </div>

      <div>
        <RecommendedAppsSection />
      </div>
      
      
    </div>
  );
};

export default HomePage;
