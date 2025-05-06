import React, { useState, useEffect } from 'react';
import { Table, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { adminStore, fetchAdminReviews } from '../../store/adminStore';

export default function ReviewsManagement() {
  // State for reviews data from the store
  const [reviewsData, setReviewsData] = useState({
    data: [],
    loading: true,
    error: null
  });

  // Subscribe to admin store and fetch reviews data
  useEffect(() => {
    const unsubscribe = adminStore.subscribe(state => {
      // Make sure reviews exists in the state before updating local state
      if (state && state.reviews) {
        setReviewsData(state.reviews);
      }
    });
    
    // Fetch reviews data when component mounts
    const loadReviews = async () => {
      try {
        await fetchAdminReviews();
      } catch (error) {
        console.error('Error loading reviews:', error);
        // Update state with error even if the store update fails
        setReviewsData(prev => ({
          ...prev,
          loading: false,
          error: { detail: error.message || 'Failed to load reviews' }
        }));
      }
    };
    
    loadReviews();
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleApprove = (id) => {
    // Approve review logic
    console.log(`Approve review ${id}`);
  };

  const handleReject = (id) => {
    // Reject review logic
    console.log(`Reject review ${id}`);
  };

  const handleDelete = (id) => {
    // Delete review logic
    console.log(`Delete review ${id}`);
  };

  // Safely check loading state
  const isLoading = reviewsData?.loading === true;
  
  // Safely check error state
  const hasError = reviewsData?.error != null;
  
  // Safely get data
  const reviews = reviewsData?.data || [];

  // Loading state
  if (isLoading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading reviews...</span>
        </Spinner>
        <p className="mt-2">Loading reviews data...</p>
      </div>
    );
  }

  // Error state
  if (hasError) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Error Loading Reviews</Alert.Heading>
        <p>{reviewsData?.error?.detail || 'An error occurred while loading reviews data'}</p>
      </Alert>
    );
  }

  return (
    <div>
      {/* <h2 className="mb-4">Reviews Management</h2> */}
      
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Program</th>
            <th>User</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length > 0 ? (
            reviews.map(review => (
              <tr key={review.id}>
                <td>{review.id}</td>
                <td>{review.program?.name || 'Unknown Program'}</td>
                <td>{review.user?.name || 'Anonymous'}</td>
                <td>{review.score} / 5</td>
                <td>{review.comment}</td>
                <td>{review.created_at ? new Date(review.created_at).toLocaleDateString() : 'Unknown'}</td>
                <td>
                  <Button 
                    variant="success" 
                    size="sm" 
                    className="me-1"
                    onClick={() => handleApprove(review.id)}
                  >
                    Approve
                  </Button>
                  <Button 
                    variant="warning" 
                    size="sm" 
                    className="me-1"
                    onClick={() => handleReject(review.id)}
                  >
                    Reject
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => handleDelete(review.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No reviews found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}