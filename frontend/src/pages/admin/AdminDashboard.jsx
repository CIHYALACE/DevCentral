import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Spinner } from 'react-bootstrap';
import DashboardOverview from '../../components/Admin/OverView';
import { 
  adminStore, 
  fetchAdminPrograms, 
  fetchAdminReviews, 
  fetchAdminMedia, 
  fetchAdminUsers, 
  fetchAdminCategories,
  fetchAdminTokens
} from '../../store/adminStore';

export default function AdminDashboard() {
  // Get the initial state from the store to ensure structure matches
  const initialState = adminStore.state;
  
  // Use React's useState to track the admin data
  const [adminData, setAdminData] = useState(initialState);

  useEffect(() => {
    // Subscribe to the adminStore changes
    const unsubscribe = adminStore.subscribe(state => {
      setAdminData(state);
    });

    // Fetch all admin data when the dashboard loads
    const loadAdminData = async () => {
      try {
        await Promise.all([
          fetchAdminPrograms(),
          fetchAdminReviews(),
          fetchAdminMedia(),
          fetchAdminUsers(),
          fetchAdminCategories(),
          fetchAdminTokens()
        ]);
      } catch (error) {
        console.error('Error loading admin data:', error);
      }
    };

    loadAdminData();

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Safely extract data with null checks
  const programs = adminData?.programs || { data: [], loading: false, error: null };
  const reviews = adminData?.reviews || { data: [], loading: false, error: null };
  const media = adminData?.media || { data: [], loading: false, error: null };
  const users = adminData?.users || { data: [], loading: false, error: null };
  const categories = adminData?.categories || { data: [], loading: false, error: null };

  // Helper function to render loading state
  const renderLoading = () => (
    <div className="text-center py-4">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );

  // Helper function to render error state
  const renderError = (error) => (
    <div className="alert alert-danger">
      {error?.detail || 'An error occurred while loading data'}
    </div>
  );

  return (
    <Container fluid className="admin-dashboard">
      <h2 className="mb-4">Dashboard</h2>
      
      {/* Overview Section */}
      <DashboardOverview />
    </Container>
  );
}
