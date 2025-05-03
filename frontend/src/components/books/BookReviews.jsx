import React, { useEffect, useState } from 'react';
import { fetchReviews } from '../../store/reviewStore'; // Assume this function exists

export default function BookReviews({ bookId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews(bookId).then(setReviews).catch(console.error);
  }, [bookId]);

  return (
    <div>
      <h3>Reviews</h3>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="mb-3">
            <strong>{review.user.name}</strong>
            <p>{review.comment}</p>
            <small className="text-muted">Rating: {review.score}</small>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
}