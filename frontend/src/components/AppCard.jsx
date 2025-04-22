import React from 'react';
import { Link } from 'react-router-dom';
import "../style/AppCard.css"; // ✅ استدعاء ملف الستايل الخاص بالكارت

const AppCard = ({ app }) => {
  return (
    <Link
      to={`/details/apps/${app.id}`}
      className="app-card"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className="image-container">
        <img src={app.image} alt={app.name} className="image" />
      </div>

      <div className="app-info">
        <h3 className="app-name">{app.name}</h3>

        <div className="app-meta">
          <div className="ratingOf-app">
            {app.rating}<span className="star-icon">★</span>
          </div>
          <div className={`price-badge ${app.price === 0 ? 'free' : 'paid'}`}>
            {app.price === 0 ? "Free" : `$${app.price}`}
          </div>
        </div>

        {/* <div className="app-downloads">
          {app.downloads}
        </div> */}
      </div>
    </Link>
  );
};

export default AppCard;
