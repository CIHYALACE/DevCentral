// pages/PublishedPrograms.jsx
import React, { useEffect, useState } from 'react';
import { useStore } from '@tanstack/react-store';
import { programStore, fetchPublishedPrograms, authStore, fetchUserData } from '../store';
import ProgramCard from '../components/ProgramCard';
import { Link } from 'react-router-dom';
import { Spinner, Alert, Button, Card } from 'react-bootstrap';
import '../style/MyPrograms.css'; // Reuse the same styles as MyPrograms

const PublishedPrograms = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const programs = useStore(programStore, (state) => state.programs);
  const storeLoading = useStore(programStore, (state) => state.loading);
  const storeError = useStore(programStore, (state) => state.error);
  const user = useStore(authStore, (state) => state.user);
  const isAuthenticated = useStore(authStore, (state) => state.isAuthenticated);

  useEffect(() => {
    // Fetch user data if authenticated but no role information
    if (isAuthenticated && !user.role) {
      fetchUserData().catch(error => {
        console.error('Error fetching user data:', error);
      });
    }
    
    // Only fetch published programs if user is admin or developer
    if (user && (user.role === 'admin' || user.role === 'developer')) {
      setLoading(true);
      setError(null);
      fetchPublishedPrograms()
        .catch(err => {
          console.error('Error fetching published programs:', err);
          setError('Failed to load your published programs. Please try again.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user, isAuthenticated]);

  if (loading || storeLoading) {
    return (
      <div className="text-center p-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error || storeError) {
    const errorMessage = error || (storeError ? 'Failed to load your published programs. Please try again.' : null);
    return (
      <Alert variant="danger" className="m-3">
        {errorMessage}
        <div className="mt-3">
          <Button onClick={() => {
            setLoading(true);
            fetchPublishedPrograms()
              .finally(() => setLoading(false));
          }} variant="outline-danger">
            Try Again
          </Button>
        </div>
      </Alert>
    );
  }

  return (
    <div className="my-programs-container">
      <div className="my-programs-header d-flex justify-content-between align-items-center mb-4">
        <h2>Published Programs</h2>
        <Link 
          to="/profile/add-program" 
          className="btn btn-primary"
        >
          + Add New Program
        </Link>
      </div>

      {programs.length === 0 ? (
        <Card className="text-center p-5 bg-light">
          <Card.Body>
            <Card.Title>No Published Programs Found</Card.Title>
            <Card.Text>
              You haven't published any programs yet.
            </Card.Text>
            <Link to="/profile/add-program" className="btn btn-outline-primary mt-3">
              Create New Program
            </Link>
          </Card.Body>
        </Card>
      ) : (
        <div className="programs-grid row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {programs.map((program) => (
            <div className="col" key={program.id}>
              <ProgramCard program={program} showEditButton={true} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublishedPrograms;
