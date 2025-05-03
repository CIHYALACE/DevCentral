import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import BookDescription from '../components/books/BookDescription';
import BookReviews from '../components/books/BookReviews';
import BookRating from '../components/books/BookRating';
import { fetchBookDetails } from '../store/bookStore';
import { downloadBookPdf, addToWishlist } from '../store/bookActions'; // Import actions

export default function BookDetails() {
  const { slug } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBookDetails(slug).then(setBook).catch(console.error);
  }, [slug]);

  const handleDownloadPdf = () => {
    downloadBookPdf(book.id)
      .then(() => alert('PDF downloaded successfully!'))
      .catch((err) => alert('Failed to download PDF.'));
  };

  const handleAddToWishlist = () => {
    addToWishlist(book.id)
      .then(() => alert('Book added to wishlist!'))
      .catch((err) => alert('Failed to add book to wishlist.'));
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
          <Button variant="outline-secondary" className="w-100" onClick={handleAddToWishlist}>
            Add to Wishlist
          </Button>
        </Col>
        <Col md={8}>
          <h1>{book.title}</h1>
          <h5 className="text-muted">by {book.author_name}</h5>
          <p className="text-muted">{book.category_name}</p>
          <BookRating rating={book.rating} />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <BookDescription description={book.description} />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <BookReviews bookId={book.id} />
        </Col>
      </Row>
    </Container>
  );
}