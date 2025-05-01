import BookCard from "../components/books/BookCard";
import BooksSlider from "../components/books/BooksSlider";

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
      {/* Books Slider Section */}
      <section className="mb-5 mt-5">
        <h3 className="ms-5 mb-3">New release ebooks</h3>
        <BooksSlider books={books} />
      </section>

      {/* Books Grid Section */}
      <section>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-6 g-4">
          {books.map((book, index) => (
            <div key={index} className="col">
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
