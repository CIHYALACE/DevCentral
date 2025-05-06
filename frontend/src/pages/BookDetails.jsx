import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import BookDescription from '../components/books/BookDescription';
import BookRating from '../components/books/BookRatingSection';
import SimilarBooks from '../components/books/SimilarBooks'; // Import SimilarBooks component
import BooksByAuthor from '../components/books/BooksByAuthor'; // Import BooksByAuthor component
import BookRatingSection from '../components/books/BookRatingSection'; 
import { fetchBookDetails } from '../store/bookStore';
import { useStore } from '@tanstack/react-store';
import { bookStore } from '../store/bookStore';

export default function BookDetails() {
  const { slug } = useParams();
  const book = useStore(bookStore, (state) => state.currentBook);

  useEffect(() => {
    fetchBookDetails(slug);
  }, [slug]);

  const handleDownloadPdf = () => {
    if (book.pdf_link) {
      window.open(book.pdf_link, '_blank'); // Opens the PDF link in a new tab
    } else {
      alert('PDF link is not available.');
    }
  };

  if (!book) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={4}>
          <img
            src={book.cover_image || '/BookCover.webp'}
            alt={book.title}
            className="img-fluid rounded shadow mb-3"
          />
          <Button variant="primary" className="w-100 mb-2" onClick={handleDownloadPdf}>
            Download PDF
          </Button>
        </Col>
        <Col md={8}>
          <h1>{book.title}</h1>
          <h5 className="text-muted">by {book.author_name}</h5>
          <p className="text-muted">{book.category_name}</p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <BookDescription description={book.description} />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
        <BookRatingSection bookId={book.id} />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <SimilarBooks categoryName={book.category_name} />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <BooksByAuthor authorId={book.author_name} />
        </Col>
      </Row>
    </Container>
  );
}