import React from 'react';
import { Link } from 'react-router-dom';
import "../style/AppCard.css";
import { formatPrice, formatRating } from '../utils';

const AppCard = ({ app }) => {
  if (!app || !app.id) {
    return null; // Don't render anything if no valid app data is provided
  }

  // Get the icon or first screenshot from media if available
  const appImage = app.icon || 
    (app.media && app.media.length > 0 ? app.media[0].file : null) || 
    "http://127.0.0.1:8000/media/media/placeholder_screenshot_1.png";

  // Use title as name if name is not available
  const appName = app.name || app.title || "Unknown App";
  
  // Format the price
  const priceDisplay = app.price ? formatPrice(app.price) : "Free";
  const isPaid = app.price && parseFloat(app.price) > 0;
  
  return (
    <Link
      to={`/details/apps/${app.slug}`}
      className="app-card"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className="image-container">
        <img 
          src={appImage} 
          alt={appName} 
          className="image" 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "http://127.0.0.1:8000/media/media/placeholder_screenshot_1.png";
          }}
        />
      </div>

      <div className="app-info">
        <h3 className="app-name">{appName}</h3>

        <div className="app-meta">
          <div className="ratingOf-app">
            {formatRating(app.rating)}
            {app.rating_count !== undefined && (
              <span className="rating-count"> ({app.rating_count})</span>
            )}
            <span className="star-icon">★</span>
          </div>
          <div className={`price-badge ${isPaid ? 'paid' : 'free'}`}>
            {priceDisplay}
          </div>
        </div>

        {app.download_count && (
          <div className="app-downloads">
            {app.download_count > 1000000 
              ? `${Math.floor(app.download_count / 1000000)}M+` 
              : app.download_count > 1000 
                ? `${Math.floor(app.download_count / 1000)}K+` 
                : `${app.download_count}`} downloads
          </div>
        )}
      </div>
    </Link>
  );
};

export default AppCard;
