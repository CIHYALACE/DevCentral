import React from 'react';
import { Card } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

const BookCard = ({ book }) => {
  return (
    <Card 
      className="book-card h-100" 
      style={{ width: '190px', cursor: 'pointer' }}
    >
      <Card.Img 
        variant="top" 
        src={book.coverUrl} 
        alt={book.title}
        style={{ height: '260px', objectFit: 'cover' }}
      />
      <Card.Body className="p-2">
        <div className="d-flex flex-column h-100">
          <h6 className="text-truncate mb-1">{book.title}</h6>
          <div className="d-flex align-items-center justify-content-between mt-1">
            <div className="d-flex align-items-center gap-1">
              <FaStar className="text-warning" />
              <small className="text-muted">{book.rating}</small>
              <small className="text-muted">({book.ratingCount})</small>
            </div>
            <strong>{book.price === 0 ? 'Free' : `$${book.price.toFixed(2)}`}</strong>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BookCard;