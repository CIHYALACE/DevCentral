import React from 'react';
import { Card } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

export default function HorizontalBookCard({ book }) {
  return (
    <Card 
      className="horizontal-book-card h-100" 
      style={{ width: '300px', height: '120px', cursor: 'pointer' }}
    >
      <div className="d-flex h-100">
        <div style={{ 
          width: '100px', 
          height: '150px', 
          minWidth: '100px', // Ensure consistent width
          overflow: 'hidden',
          position: 'relative'
        }}>
          <Card.Img 
            src={book.cover_image ? book.cover_image : '/BookCover.webp'}  // Use a default cover if missing
            alt={book.title}
            style={{ 
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover', // Ensures the image covers the container
              objectPosition: 'center' // Centers the image
            }}
          />
        </div>
        <Card.Body className="p-2">
          <div className="d-flex flex-column">
            <h6 className="mb-1" style={{ fontSize: '0.9rem', wordWrap: 'break-word' }}>
              {book.title}
            </h6>
            <small className="text-muted text-truncate mb-1">{book.author}</small>
            <div className="d-flex align-items-center gap-1">
              <FaStar className="text-warning" size={12} />
              <small className="text-muted" style={{ fontSize: '0.8rem' }}>
                {book.rating}
              </small>
            </div>
          </div>
        </Card.Body>
      </div>
    </Card>
  );
};

