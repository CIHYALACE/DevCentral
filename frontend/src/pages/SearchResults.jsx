import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { searchPrograms, programStore } from '../store/programStore';
import { useStore } from '@tanstack/react-store';
import ProgramCard from '../components/ProgramCard';
import Paginator from '../components/common/Paginator';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  
  // Use TanStack Store properly with useStore hook
  const programs = useStore(programStore, (state) => state.programs);
  const loading = useStore(programStore, (state) => state.loading);
  const error = useStore(programStore, (state) => state.error);
  const totalPrograms = useStore(programStore, (state) => state.totalPrograms);
  
  useEffect(() => {
    // Reset to first page when search query changes
    setCurrentPage(1);
    
    if (query) {
      searchPrograms(query, 1, pageSize);
    }
  }, [query]);
  
  useEffect(() => {
    if (query && currentPage > 1) {
      searchPrograms(query, currentPage, pageSize);
    }
  }, [currentPage, query]);
  
  const totalPages = Math.ceil(totalPrograms / pageSize);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4 share-tech-mono-regular">Search Results for "{query}"</h1>
      
      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      
      {error && (
        <Alert variant="danger">
          An error occurred while searching. Please try again.
        </Alert>
      )}
      
      {!loading && !error && programs.length === 0 && (
        <Alert variant="info">
          No results found for "{query}". Try a different search term.
        </Alert>
      )}
      
      {!loading && !error && programs.length > 0 && (
        <>
          <p className="text-muted">Found {totalPrograms} result{totalPrograms !== 1 ? 's' : ''}</p>
          
          <div className="row g-3">
            {programs.map((program) => (
              <div key={program.id} className="col-12 mb-3 mb-md-0 col-md-6 col-lg-4">
                <ProgramCard program={program} />
              </div>
            ))}
          </div>
          
          {totalPages > 1 && (
            <Paginator
              currentPage={currentPage}
              totalItems={totalPrograms}
              itemsPerPage={pageSize}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </Container>
  );
}
