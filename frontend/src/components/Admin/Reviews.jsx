import React, { useState, useEffect } from 'react';
import { Table, Button, Badge, Spinner, Alert, Modal } from 'react-bootstrap';
import { adminStore, fetchAdminReviews } from '../../store/adminStore';
import { useStore } from '@tanstack/react-store';
import { Paginator } from '../common/Paginator';
import { Link } from 'react-router-dom';
import { deleteReview } from '../../store';

export default function ReviewsManagement() {
  // Use the store hook to access reviews data directly
  const reviewsData = useStore(adminStore, (state) => state.reviews);
  const isLoading = useStore(adminStore, (state) => state.loading);
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // State for delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  
  // Fetch reviews data when component mounts or page changes
  useEffect(() => {
    const loadReviews = async () => {
      try {
        await fetchAdminReviews(currentPage, itemsPerPage);
      } catch (error) {
        console.error('Error loading reviews:', error);
      }
    };
    
    loadReviews();
  }, [currentPage, itemsPerPage]);
  
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleApprove = async (id) => {
    // Approve review logic
    console.log(`Approve review ${id}`);
    // Refresh the reviews list after approval
    await fetchAdminReviews(currentPage, itemsPerPage);
  };

  const handleReject = async (id) => {
    // Reject review logic
    console.log(`Reject review ${id}`);
    // Refresh the reviews list after rejection
    await fetchAdminReviews(currentPage, itemsPerPage);
  };

  const handleDelete = async (id) => {
    // Set the review to delete and show the confirmation modal
    const reviewToDelete = reviews.find(review => review.id === id);
    setReviewToDelete(reviewToDelete);
    setShowDeleteModal(true);
  };
  
  const confirmDelete = async () => {
    // Delete review logic
    console.log(`Delete review ${reviewToDelete?.id}`);
    await deleteReview(reviewToDelete.id)
    // Close the modal
    setShowDeleteModal(false);
    // Refresh the reviews list after deletion
    await fetchAdminReviews(currentPage, itemsPerPage);
  };

  // Get data from store
  const reviews = reviewsData?.data || [];
  const totalItems = reviewsData?.totalItems || 0;
  const hasError = reviewsData?.error != null;

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

                <td>
                  <Link to={`/details/_/${review.program_slug}`}>
                  {review.program || 'Unknown Program'}
                  </Link>
                  </td>
                <td>{review.user_name || 'Anonymous'}</td>
                <td>{review.score} / 5</td>
                <td>{review.comment}</td>
                <td>{review.created_at ? new Date(review.created_at).toLocaleDateString() : 'Unknown'}</td>
                <td>
                  {/* <Button 
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
                  </Button> */}
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
      
      {/* Pagination */}
      <Paginator
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        maxPageButtons={5}
      />
      
      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this review? This action cannot be undone.
          <div className="mt-3 p-3 border rounded bg-light">
            <p><strong>Program:</strong> {reviewToDelete?.program}</p>
            <p><strong>User:</strong> {reviewToDelete?.user_name || 'Anonymous'}</p>
            <p><strong>Rating:</strong> {reviewToDelete?.score} / 5</p>
            <p><strong>Comment:</strong> {reviewToDelete?.comment}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={confirmDelete}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}