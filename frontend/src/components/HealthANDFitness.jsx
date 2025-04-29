// src/layout/HealthFitness.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/healthFitness.css';
import { useStore } from '@tanstack/react-store';
import { programStore, fetchPrograms, getProgramsByType } from '../store';

const HealthFitness = () => {
  const programs = useStore(programStore, (state) => state.programs);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPrograms = async () => {
      setLoading(true);
      try {
        // Fetch health apps directly with type=app parameter
        const healthApps = await fetchPrograms(1, 6, null, null, 'app');
        
        if (Array.isArray(healthApps)) {
          // Filter health & fitness apps by category name (case insensitive)
          const filteredApps = healthApps.filter(app => 
            app.category && 
            app.category.name && 
            (app.category.name.toLowerCase().includes('health') || 
             app.category.name.toLowerCase().includes('fitness'))
          );
          
          // If no health apps found, take the first 3 apps as fallback
          const appsToShow = filteredApps.length > 0 ? filteredApps.slice(0, 3) : healthApps.slice(0, 3);
          setItems(appsToShow);
        }
      } catch (error) {
        console.error('Error fetching programs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPrograms();
  }, []);

  // The second useEffect has been removed to prevent infinite loops
  // All data fetching is now handled in the first useEffect

  if (loading) {
    return (
      <section className="health-fitness-section">
        <div className="container">
          <h2 className="section-title">Health & Fitness</h2>
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // If no items are found, show placeholder message
  if (items.length === 0) {
    return (
      <section className="health-fitness-section">
        <div className="container">
          <h2 className="section-title">Health & Fitness</h2>
          <p>No health & fitness apps available at the moment. Check back later!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="health-fitness-section">
      <div className="container">
        <h2 className="section-title">Health & Fitness</h2>
        <div className="cards-grid">
          {items.map(item => {
            // Get the first screenshot from media if available
            const appImage = item.media && item.media.length > 0 
              ? item.media.find(m => m.media_type === 'screenshot')?.file || item.media[0].file
              : item.icon || 'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg';
              
            return (
              <Link
                to={`/details/apps/${item.slug}`}
                key={item.id}
                className="card-link"
              >
                <div className="card">
                  <img 
                    src={appImage} 
                    alt={item.title} 
                    className="card-image" 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg';
                    }}
                  />
                  <div className="card-body">
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-description">
                      {item.description ? 
                        (item.description.length > 100 ? 
                          `${item.description.substring(0, 100)}...` : 
                          item.description) : 
                        'No description available.'}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HealthFitness;
