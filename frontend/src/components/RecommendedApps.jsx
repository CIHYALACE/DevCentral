// src/components/RecommendedAppsSection.jsx
import React, { useState, useEffect } from 'react';
import ProgramCard from './ProgramCard';
import { useStore } from '@tanstack/react-store';
import { programStore, fetchPrograms, getProgramsByType } from '../store';

const RecommendedAppsSection = () => {
  const programs = useStore(programStore, (state) => state.programs);
  const [recommendedAppsData, setRecommendedAppsData] = useState([]);
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
    const fetchRecommendedApps = async () => {
      try {
        // Fetch apps directly with type=app and limit=4 parameters
        // This replaces the previous approach of fetching all programs and filtering
        const apps = await fetchPrograms(1, 4, null, null, 'app', false, 4);
        
        // Set the recommended apps data directly from the API response
        // The API already sorts by newest/most popular
        setRecommendedAppsData(Array.isArray(apps) ? apps : []);
      } catch (error) {
        console.error('Error fetching recommended apps:', error);
        setRecommendedAppsData([]);
      }
    };
    
    // Only fetch recommended apps when loading is complete
    // This prevents the infinite loop by not depending on recommendedAppsData.length
    if (!loading) {
      fetchRecommendedApps();
    }
  }, [loading]); // Only depend on loading state

  if (loading) {
    return (
      <section className="recommended-apps">
        <h2 className="section-title">Recommended Apps</h2>
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </section>
    );
  }

  // If no apps are found, show placeholder message
  if (recommendedAppsData.length === 0) {
    return (
      <section className="recommended-apps">
        <h2 className="section-title">Recommended Apps</h2>
        <p>No recommended apps available at the moment. Check back later!</p>
      </section>
    );
  }

  return (
    <section className="recommended-apps">
      <h2 className="section-title">Recommended Apps</h2>
      <div className="row g-3">
        {recommendedAppsData.map((app) => (
          <div key={app.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <ProgramCard program={app} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedAppsSection;
