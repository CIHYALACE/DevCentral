import React from 'react';
import { Card } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function HorizontalBookCard({ book }) {
  return (
    <Link to={`/books/${book.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card 
        className="horizontal-book-card h-100" 
        style={{ width: '300px', height: '120px', cursor: 'pointer' }}
      >
        <div className="d-flex h-100">
          <div style={{ 
            width: '100px', 
            height: '150px', 
            minWidth: '100px', 
            overflow: 'hidden',
            position: 'relative'
          }}>
            <Card.Img 
              src={book.cover_image || '/BookCover.webp'}
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
            <div className="d-flex flex-column">
              <h6 className="mb-1" style={{ fontSize: '0.9rem', wordWrap: 'break-word' }}>
                {book.title}
              </h6>
              <small className="text-muted text-truncate mb-1">{book.author.name}</small>
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
    </Link>
  );
}

