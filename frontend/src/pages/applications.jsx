// AppsPage.jsx
import React, { useState, useEffect } from 'react';
import ProgramCard from '../components/ProgramCard';
import { AppSliderSection } from '../components/AppSliderSection';
import { useStore } from '@tanstack/react-store';
import { programStore, fetchPrograms } from '../store';
import Paginator from '../components/common/Paginator';

const AppsPage = () => {
  const { programs, loading: storeLoading, totalPrograms } = useStore(programStore);
  const [loading, setLoading] = useState(true);
  const [currentPageState, setCurrentPageState] = useState(1);
  const [itemsPerPage] = useState(12);

  // Load programs with pagination
  useEffect(() => {
    const loadPrograms = async () => {
      setLoading(true);
      try {
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

      <section className="apps-page py-5">
        <div className="container">
          <h2 className="section-title text-center mb-4">Popular Apps</h2>

          {loading || storeLoading ? (
            <div className="d-flex justify-content-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : programs.length === 0 ? (
            <p className="text-center py-3">No apps available at the moment. Check back later!</p>
          ) : (
            <>
              <div className="row g-4">
                {programs.map((app) => (
                  <div key={app.id} className="col-12 col-sm-6 col-lg-3">
                    <ProgramCard program={app} />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-5 d-flex justify-content-center">
                <Paginator
                  currentPage={currentPageState}
                  totalItems={totalPrograms}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPageState}
                />
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default AppsPage;
