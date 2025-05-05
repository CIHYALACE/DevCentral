// AppsPage.jsx
import React, { useState, useEffect } from 'react';
import ProgramCard from '../components/ProgramCard';
import {AppSliderSection} from '../components/AppSliderSection';
import { useStore } from '@tanstack/react-store';
import { programStore, fetchPrograms } from '../store';
import Paginator from '../components/common/Paginator';

const AppsPage = () => {
  const { programs, loading: storeLoading, totalPrograms, currentPage } = useStore(programStore);
  const [loading, setLoading] = useState(true);
  const [currentPageState, setCurrentPageState] = useState(1);
  const [itemsPerPage] = useState(12);

  // Load programs with pagination
  useEffect(() => {
    const loadPrograms = async () => {
      setLoading(true);
      try {
        // Fetch programs with type=app filter to exclude games
        await fetchPrograms(currentPageState, itemsPerPage, null, null, 'app');
      } catch (error) {
        console.error('Error fetching programs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPrograms();
  }, [currentPageState, itemsPerPage]);

  return (
    <>
      <AppSliderSection />
      <section className="apps-page">
        <h2 className="section-title">Popular Apps</h2>

        {loading || storeLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : programs.length === 0 ? (
          <p className="text-center py-3">No apps available at the moment. Check back later!</p>
        ) : (
          <>
            <div className="row g-3">
              {programs.map((app) => (
                <div key={app.id} className="col-12 mb-3 mb-md-0 col-md-6 col-lg-4">
                  <ProgramCard program={app} />
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <Paginator
              currentPage={currentPageState}
              totalItems={totalPrograms}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPageState}
            />
          </>
        )}
      </section>
    </>
  );
};

export default AppsPage;
