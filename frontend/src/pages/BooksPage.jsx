import { useEffect } from 'react';
import { useStore } from '@tanstack/react-store';
import { bookStore, fetchBooks, fetchBookDetails } from '../store';
import BooksSlider from "../components/books/BooksSlider";
import BooksSlider2 from "../components/books/BooksSlider2";

export default function BooksPage() {
  const { books, loading, error } = useStore(bookStore);

  useEffect(() => {
    fetchBooks(1, 18).catch(err => 
      console.error('Error fetching books:', err)
    );
  }, []);

  if (loading) {
    return <div className="container mt-5 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mt-5 text-center">
        Error: {error.message || 'Failed to fetch books'}
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div className="container mt-5 text-center">
        No books available at the moment.
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <a href="/booklibrary" className="btn text-primary ms-5">
        <i className="fa-solid fa-arrow-up-right-from-square"></i> Your Library
      </a>
      <a href="/booklibrary" className="btn text-primary ms-2">
        <i className="fa-solid fa-arrow-up-right-from-square"></i> Your WishList
      </a>

      <section className="mb-5 mt-5">
        <h3 className="ms-5 mb-3">New release ebooks</h3>
        <BooksSlider books={books.filter(book => 
          new Date(book.publish_date) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
        )} />
      </section>

      <section className="mb-5 mt-5">
        <h3 className="ms-5 mb-3">Top-selling ebooks</h3>
        <BooksSlider2 books={books.filter(book => book.rating >= 4)} />
      </section>

      <section className="mb-5 mt-5">
        <h3 className="ms-5 mb-3">Self-help ebooks</h3>
        <BooksSlider books={books.filter(book => 
          book.category?.toLowerCase() === 'self-help'
        )} />
      </section>

      <section className="mb-5 mt-5">
        <h3 className="ms-5 mb-3">Business books</h3>
        <BooksSlider books={books.filter(book => 
          book.category?.toLowerCase() === 'business'
        )} />
      </section>
    </div>
  );
}
