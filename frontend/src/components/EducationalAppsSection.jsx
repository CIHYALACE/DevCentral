// src/components/EducationalAppsSection.jsx
import React, { useState, useEffect } from 'react';
import "../style/EducationalAppsSection.css";
import { Link } from "react-router-dom";
import { useStore } from '@tanstack/react-store';
import { programStore, fetchPrograms, getProgramsByType } from '../store';

const EducationalAppsSection = () => {
  const programs = useStore(programStore, (state) => state.programs);
  const [educationalApps, setEducationalApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPrograms = async () => {
      setLoading(true);
      try {
        await fetchPrograms();
      } catch (error) {
        console.error('Error fetching programs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPrograms();
  }, []);

  useEffect(() => {
    // Only run this effect once when loading is complete
    if (!loading) {
      const fetchEducationalApps = async () => {
        try {
          // First try to fetch educational apps by category
          const educationalCategoryApps = await fetchPrograms(1, 4, 'Education', null, 'app');
          
          // If we found educational apps, use them
          if (Array.isArray(educationalCategoryApps) && educationalCategoryApps.length > 0) {
            setEducationalApps(educationalCategoryApps);
            return;
          }
          
          // If no educational apps found, try learning category
          const learningCategoryApps = await fetchPrograms(1, 4, 'Learning', null, 'app');
          if (Array.isArray(learningCategoryApps) && learningCategoryApps.length > 0) {
            setEducationalApps(learningCategoryApps);
            return;
          }
          
          // If still no apps found, fetch regular apps as fallback
          const regularApps = await fetchPrograms(1, 4, null, null, 'app');
          setEducationalApps(Array.isArray(regularApps) ? regularApps : []);
        } catch (error) {
          console.error('Error fetching educational apps:', error);
          setEducationalApps([]);
        }
      };
      
      // Execute the fetch function directly
      fetchEducationalApps();
    }
  }, [loading]); // Only depend on loading state

  if (loading) {
    return (
      <section className="educational-apps">
        <h2 className="section-title">Educational Apps</h2>
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </section>
    );
  }

  // If no apps are found, show placeholder message
  if (educationalApps.length === 0) {
    return (
      <section className="educational-apps">
        <h2 className="section-title">Educational Apps</h2>
        <p>No educational apps available at the moment. Check back later!</p>
      </section>
    );
  }

  return (
    <section className="educational-apps">
      <h2 className="section-title">Educational Apps</h2>
      <div className="apps-grid">
        {educationalApps.map((app) => {
          // Get the first screenshot from media if available
          const appImage = app.media && app.media.length > 0 
            ? app.media.find(m => m.media_type === 'screenshot')?.file || app.media[0].file
            : app.icon || 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg';
            
          return (
            <Link 
              to={`/details/apps/${app.slug}`} 
              key={app.id} 
              className="app-card"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <img 
                src={appImage} 
                alt={app.title} 
                className="app-image" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg';
                }}
              />
              <div className="app-info">
                <h3 className="app-name">{app.title}</h3>
                <p className="app-description">
                  {app.description ? 
                    (app.description.length > 100 ? 
                      `${app.description.substring(0, 100)}...` : 
                      app.description) : 
                    'No description available.'}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default EducationalAppsSection;
