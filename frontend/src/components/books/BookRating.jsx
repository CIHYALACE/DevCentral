import React from 'react';
import { FaStar } from 'react-icons/fa';

export default function BookRating({ rating }) {
  const validRating = typeof rating === 'number' ? rating : 0; // Ensure rating is a number

  return (
    <div className="d-flex align-items-center">
      <FaStar className="text-warning" size={20} />
      <span className="ms-2">{validRating.toFixed(1)} / 5</span>
    </div>
  );
}