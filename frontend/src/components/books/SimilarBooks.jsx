import React, { useEffect, useState } from "react";
import { fetchSimilarBooks } from "../../store/bookStore";
import { Alert, Row } from "react-bootstrap";
import BookCard from "./BookCard";
import Slider from "react-slick";
import BooksSlider from "./BooksSlider";

export default function SimilarBooks({ categoryName }) {
  const [similarBooks, setSimilarBooks] = useState([]);
  const [error, setError] = useState(null);
  console.log(categoryName);
  useEffect(() => {
    // if (!categoryName) {
    //   console.error('categoryName is undefined');
    //   setError('Category name is required to fetch similar books.');
    //   return;
    // }

    fetchSimilarBooks(categoryName)
      .then((data) => {
        console.log("Fetched similar books:", data); // Log the fetched data
        setSimilarBooks(data);
      })
      .catch((err) => {
        console.error("Error fetching similar books:", err); // Log the error
        setError(err.message);
      });
  }, [categoryName]);

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

  if (similarBooks.length === 0) {
    return <p>No similar books found.</p>;
  }

  return (
    <div>
      <h4>Similar Books</h4>
      <BooksSlider books={similarBooks}/>
    </div>
  );
}
