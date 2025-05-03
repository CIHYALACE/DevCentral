import React from 'react';
import { Card } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function BookCard({ book }) {
  console.log(book.cover_image);
  return (
    <Link to={`/books/${book.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card 
        className="book-card h-100" 
        style={{ width: '190px', cursor: 'pointer' }}
      >
        <div style={{ 
          width: '100%',
          height: '260px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <Card.Img 
            variant="top" 
            src={book.cover_image ? book.cover_image : '/BookCover.webp'}  // Use a default cover if missing
            alt={book.title}
            style={{ 
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        </div>
        <Card.Body className="p-2">
          <div className="d-flex flex-column h-100">
            <h6 className="text-truncate mb-1">{book.title}</h6>
            <div className="d-flex align-items-center justify-content-between mt-1">
              <div className="d-flex align-items-center gap-1">
                <FaStar className="text-warning" />
                <small className="text-muted">{book.rating}</small>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};

