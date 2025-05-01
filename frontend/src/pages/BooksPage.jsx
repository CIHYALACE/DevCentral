import { useEffect } from "react";
import { useStore } from "@tanstack/react-store";
import {
  bookStore,
  fetchNewReleases,
  fetchSelfHelpBooks,
  fetchBusinessBooks,
  fetchBooks, // Import fetchBooks to get all books
} from "../store";
import BooksSlider from "../components/books/BooksSlider";
import BooksSlider2 from "../components/books/BooksSlider2"; // Import BooksSlider2 for Top Books

export default function BooksPage() {
  const { newReleases, selfHelpBooks, businessBooks, books, loading, error } =
    useStore(bookStore);

  useEffect(() => {
    fetchNewReleases().then(() => {
      console.log(bookStore.state.newReleases); // Log the data
    });
  }, []);

  useEffect(() => {
    fetchSelfHelpBooks();
    fetchBusinessBooks();
    fetchBooks(1, 18); // Fetch the top 18 books
  }, []);

  if (loading) {
    return <div className="container mt-5 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mt-5 text-center">
        Error: {error.message || "Failed to fetch books"}
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      
      <section className="mb-5 mt-5">
        <h3 className="ms-5 mb-3">New Release Ebooks</h3>
        <BooksSlider books={newReleases} />
      </section>

      <section className="mb-5 mt-5">
        <h3 className="ms-5 mb-3">Top Books</h3>
        <BooksSlider2 books={books} /> {/* Use BooksSlider2 for Top Books */}
      </section>

      <section className="mb-5 mt-5">
        <h3 className="ms-5 mb-3">Self-help Ebooks</h3>
        <BooksSlider books={selfHelpBooks} />
      </section>

      <section className="mb-5 mt-5">
        <h3 className="ms-5 mb-3">Business Books</h3>
        <BooksSlider books={businessBooks} />
      </section>
    </div>
  );
}
