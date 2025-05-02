// pages/MyPrograms.jsx
import React, { useEffect, useState } from 'react';
import { profileStore, fetchUserApps } from '../store';
import ProgramCard from '../components/ProgramCard';
import { Link } from 'react-router-dom';
import { Spinner, Alert, Button, Card } from 'react-bootstrap';
import '../style/MyPrograms.css';

const MyPrograms = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const loadUserApps = async () => {
      try {
        setLoading(true);
        setError(null);
        await fetchUserApps();
        setPrograms(profileStore.state.userApps);
      } catch (err) {
        console.error('Error fetching user programs:', err);
        setError('Failed to load your programs. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadUserApps();

    // Subscribe to store changes
    const unsubscribe = profileStore.subscribe(
      (state) => state.userApps,
      (userApps) => setPrograms(userApps)
    );

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="text-center p-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="m-3">
        {error}
        <div className="mt-3">
          <Button onClick={() => fetchUserApps()} variant="outline-danger">
            Try Again
          </Button>
        </div>
      </Alert>
    );
  }

  return (
    <div className="my-programs-container">
      <div className="my-programs-header d-flex justify-content-between align-items-center mb-4">
        <h2>My Programs</h2>
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
            <Card.Title>No Programs Found</Card.Title>
            <Card.Text>
              You haven't added any programs to your library yet.
            </Card.Text>
            <Link to="/programs" className="btn btn-outline-primary mt-3">
              Browse Programs
            </Link>
          </Card.Body>
        </Card>
      ) : (
        <div className="programs-grid row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {programs.map((program) => (
            <div className="col" key={program.id}>
              <ProgramCard program={program} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPrograms;
