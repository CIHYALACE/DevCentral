import React, { useEffect, useState } from 'react';
import { fetchBooksByAuthor } from '../../store/bookStore';
import { Card, Row, Col } from 'react-bootstrap';

export default function BooksByAuthor({ authorId }) {
  const [booksByAuthor, setBooksByAuthor] = useState([]);

  useEffect(() => {
    fetchBooksByAuthor(authorId).then(setBooksByAuthor).catch(console.error);
  }, [authorId]);

  if (booksByAuthor.length === 0) {
    return <p>No books by this author found.</p>;
  }

  return (
    <div>
      <h4>Books by the Same Author</h4>
      <Row>
        {booksByAuthor.map((book) => (
          <Col md={3} key={book.id}>
            <Card className="mb-3">
              <Card.Img variant="top" src={book.cover_image || '/BookCover.webp'} />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}