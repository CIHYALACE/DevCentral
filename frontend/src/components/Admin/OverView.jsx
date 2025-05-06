import React, { useEffect } from 'react';
import { Card, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useStore } from '@tanstack/react-store';
import { adminStore, fetchDashboardStats } from '../../store/adminStore';

export default function DashboardOverview() {
  // Use the store hook to access dashboard stats directly
  const dashboardStats = useStore(adminStore, (state) => state.stats);
  const isLoading = useStore(adminStore, (state) => state.loading);
  const error = useStore(adminStore, (state) => state.error);

  // Format stats for display
  const stats = [
    { title: 'Total Programs', count: dashboardStats.totalPrograms || 0, icon: 'fa-solid fa-desktop' },
    { title: 'Active Users', count: dashboardStats.activeUsers || 0, icon: 'fa-solid fa-users' },
    { title: 'Total Reviews', count: dashboardStats.totalReviews || 0, icon: 'fa-solid fa-star' },
    { title: 'Categories', count: dashboardStats.categories || 0, icon: 'fa-solid fa-folder' }
  ];

  // Fetch dashboard stats when component mounts
  useEffect(() => {
    const loadDashboardStats = async () => {
      try {
        await fetchDashboardStats();
      } catch (err) {
        console.error('Failed to load dashboard stats:', err);
      }
    };
    
    loadDashboardStats();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading dashboard data...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Error Loading Dashboard</Alert.Heading>
        <p>{error.detail || 'An unexpected error occurred'}</p>
      </Alert>
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