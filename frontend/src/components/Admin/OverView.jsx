import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Spinner } from 'react-bootstrap';
import { adminStore, fetchDashboardStats } from '../../store/adminStore';

export default function DashboardOverview() {
  const [stats, setStats] = useState([
    { title: 'Total Programs', count: 0, icon: 'fa-solid fa-desktop' },
    { title: 'Active Users', count: 0, icon: 'fa-solid fa-users' },
    { title: 'Total Reviews', count: 0, icon: 'fa-solid fa-star' },
    { title: 'Categories', count: 0, icon: 'fa-solid fa-folder' }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Subscribe to admin store changes
    const unsubscribe = adminStore.subscribe(
      state => {
        if (!state.loading) {
          // Check if stats exists and has the required properties
          if (state.stats && typeof state.stats === 'object') {
            const { 
              totalPrograms = 0, 
              activeUsers = 0, 
              totalReviews = 0, 
              categories = 0 
            } = state.stats;
            
            setStats([
              { title: 'Total Programs', count: totalPrograms, icon: 'fa-solid fa-desktop' },
              { title: 'Active Users', count: activeUsers, icon: 'fa-solid fa-users' },
              { title: 'Total Reviews', count: totalReviews, icon: 'fa-solid fa-star' },
              { title: 'Categories', count: categories, icon: 'fa-solid fa-folder' }
            ]);
          }
          
          setLoading(state.loading);
          setError(state.error);
        }
      }
    );

    // Fetch dashboard stats when component mounts
    const loadDashboardStats = async () => {
      try {
        await fetchDashboardStats();
      } catch (err) {
        console.error('Failed to load dashboard stats:', err);
        setError({ detail: err.message || 'Failed to load dashboard data' });
        setLoading(false);
      }
    };
    
    loadDashboardStats();

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error Loading Dashboard</h4>
        <p>{error.detail || 'An unexpected error occurred'}</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Dashboard Overview</h2>
      <Row>
        {stats.map((stat, index) => (
          <Col key={index} md={6} lg={3} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex align-items-center">
                <i className={`${stat.icon} fa-2x me-3 text-primary`}></i>
                <div>
                  <h3 className="mb-0">{stat.count}</h3>
                  <p className="text-muted mb-0">{stat.title}</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}