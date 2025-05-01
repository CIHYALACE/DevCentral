import BookCard from "../components/books/BookCard";
import BooksSlider from "../components/books/BooksSlider";
import HorizontalBooksSlider from "../components/books/BooksSlider2";

export default function BooksPage() {
  const books = Array.from({ length: 15 }, (_, i) => ({
    coverUrl: "https://example.com/book-cover.jpg",
    title: `Book Title ${i + 1}`,
    author: "Author Name",
    rating: 4.5,
    ratingCount: 128,
    price: 9.99,
  }));

  return (
    <div className="container mt-5 mb-5">
      <a href="/booklibrary" className="btn text-primary ms-5"> <i class="fa-solid fa-arrow-up-right-from-square"></i> Your Libraray </a>
      <a href="/booklibrary" className="btn text-primary ms-2"> <i class="fa-solid fa-arrow-up-right-from-square"></i> Your Libraray </a>      
      {/* New release ebooks section */}
      <section className="mb-5 mt-5">
        <h3 className="ms-5 mb-3">New release ebooks</h3>
        <BooksSlider books={books} />
      </section>

      {/* Top-selling ebooks section with horizontal cards */}
      <section className="mb-5 mt-5">
        <h3 className="ms-5 mb-3">Top-selling ebooks</h3>
        <HorizontalBooksSlider books={books} />
      </section>

      {/* Self-help ebooks section */}
      <section className="mb-5 mt-5">
        <h3 className="ms-5 mb-3">Self-help ebooks</h3>
        <BooksSlider books={books} />
      </section>

      {/* Business books section */}
      <section className="mb-5 mt-5">
        <h3 className="ms-5 mb-3">Business books</h3>
        <BooksSlider books={books} />
      </section>

    </div>
  );
}
