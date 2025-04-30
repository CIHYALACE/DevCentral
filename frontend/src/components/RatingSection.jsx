import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useStore } from '@tanstack/react-store';
import { reviewStore, fetchProgramReviews } from '../store/reviewStore';
import { formatDate } from '../utils/uiHelpers';
import Paginator from './common/Paginator';

export function RatingSection({ programId }) {
  const { programReviews, loading, error, totalReviews } = useStore(reviewStore);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5);

  useEffect(() => {
    if (programId) {
      fetchProgramReviews(programId, currentPage, reviewsPerPage);
    }
  }, [programId, currentPage, reviewsPerPage]);

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
