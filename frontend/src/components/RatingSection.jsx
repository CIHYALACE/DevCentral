import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Form, Button, Alert } from 'react-bootstrap';
import { useStore } from '@tanstack/react-store';
import { reviewStore, fetchProgramReviews } from '../store/reviewStore';
import { submitReview } from '../store/programStore';
import { authStore } from '../store/authStore';
import { formatDate } from '../utils/uiHelpers';
import Paginator from './common/Paginator';

export function RatingSection({ programId }) {
  const { programReviews, loading, error, totalReviews } = useStore(reviewStore);
  const { isAuthenticated } = useStore(authStore);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5);
  const [reviewForm, setReviewForm] = useState({
    score: 5,
    comment: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (programId) {
      fetchProgramReviews(programId, currentPage, reviewsPerPage);
    }
  }, [programId, currentPage, reviewsPerPage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({
      ...prev,
      [name]: name === 'score' ? parseInt(value, 10) : value
    }));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    
    try {
      await submitReview(programId, reviewForm.score, reviewForm.comment);
      setReviewForm({ score: 5, comment: '' });
      setSubmitSuccess(true);
      // Refresh reviews after submission
      fetchProgramReviews(programId, currentPage, reviewsPerPage);
    } catch (error) {
      setSubmitError(error.response?.data?.detail || 'Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Ensure programReviews is always an array
  const reviews = Array.isArray(programReviews) ? programReviews : [];
  
  // Calculate average rating
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.score, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={12} className="bg-white rounded-4 border shadow-sm p-4">
          <h3>Rating and Reviews</h3>
          <hr />
          
          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Loading reviews...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger">
              Failed to load reviews. Please try again later.
            </div>
          ) : (
            <>
              <div className="rating d-flex align-items-center">
                <h1>{averageRating}</h1>
                <div className="star-rating d-flex text-warning ms-4 align-items-center">
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>
              <p className="text-muted">{reviews.length} {reviews.length === 1 ? 'rating' : 'ratings'}</p>

              {/* Review Form */}
              {isAuthenticated ? (
                <div className="review-form mb-4 p-3 border rounded bg-light">
                  <h5 className="mb-3">Write a Review</h5>
                  {submitSuccess && (
                    <Alert variant="success" onClose={() => setSubmitSuccess(false)} dismissible>
                      Your review has been submitted successfully!
                    </Alert>
                  )}
                  {submitError && (
                    <Alert variant="danger" onClose={() => setSubmitError(null)} dismissible>
                      {submitError}
                    </Alert>
                  )}
                  <Form onSubmit={handleSubmitReview}>
                    <Form.Group className="mb-3">
                      <Form.Label>Rating</Form.Label>
                      <div className="star-rating d-flex align-items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <i 
                            key={star}
                            className={`fa-${star <= reviewForm.score ? 'solid' : 'regular'} fa-star text-warning fs-3 me-2`}
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setReviewForm(prev => ({ ...prev, score: star }))}
                            onClick={() => setReviewForm(prev => ({ ...prev, score: star }))}
                          />
                        ))}
                        <span className="ms-2 text-muted">
                          ({reviewForm.score} of 5)
                        </span>
                      </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Your Review</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="comment"
                        value={reviewForm.comment}
                        onChange={handleInputChange}
                        placeholder="Share your experience with this app..."
                        rows={3}
                        required
                      />
                    </Form.Group>
                    <Button 
                      variant="primary" 
                      type="submit" 
                      disabled={submitting || !reviewForm.comment.trim()}
                    >
                      {submitting ? (
                        <>
                          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                          <span className="ms-2">Submitting...</span>
                        </>
                      ) : 'Submit Review'}
                    </Button>
                  </Form>
                </div>
              ) : (
                <Alert variant="info" className="mb-4">
                  Please <a href="/login">log in</a> to write a review.
                </Alert>
              )}

              {reviews.length === 0 ? (
                <div className="alert alert-info">
                  No reviews yet. Be the first to review!
                </div>
              ) : (
                <>
                  {reviews.map((review, index) => (
                    <div key={review.id || index} className="mb-4 pb-3 border-bottom">
                      <div className="review d-flex align-items-center mt-4">
                        <h6 className="fw-bold">
                          {review.score.toFixed(1)} <i className="fa-solid fa-star text-warning"></i>
                        </h6>
                        <h6 className="ms-3 fw-bold">{review.comment.split('.')[0] || 'Review'}</h6>
                      </div>
                      <p className="text-muted">{review.comment}</p>
                      <p className="text-muted">
                        {review.user_name || 'Anonymous'}, {formatDate(review.created_at)}
                      </p>
                    </div>
                  ))}
                  
                  {/* Pagination Controls */}
                  <Paginator
                    currentPage={currentPage}
                    totalItems={totalReviews}
                    itemsPerPage={reviewsPerPage}
                    onPageChange={setCurrentPage}
                  />
                </>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}
