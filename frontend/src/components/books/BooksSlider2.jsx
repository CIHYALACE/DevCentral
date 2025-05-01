import React from 'react';
import { Carousel } from 'react-bootstrap';
import HorizontalBookCard from './BookCard2';

export default function BooksSlider2({ books = [] }) {
  const chunkArray = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  // Split books into chunks of 9 for each slide
  const bookChunks = chunkArray(books, 9);

  return (
    <div className="position-relative mb-5 slider-container">
      <Carousel 
        interval={5000} 
        indicators={false}
        className="px-5"
      >
        {bookChunks.map((chunk, index) => (
          <Carousel.Item key={index} className="py-3">
            <div className="d-flex flex-wrap gap-3 justify-content-between">
              {chunk.map((book, idx) => (
                <div key={idx}>
                  <HorizontalBookCard book={book} />
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="position-absolute top-50 start-0 translate-middle-y w-100 carousel-controls">
        <div className="d-flex justify-content-between">
          <a className="carousel-control-prev w-auto opacity-0" href="#" role="button" data-bs-slide="prev">
            <span className="carousel-control-prev-icon bg-secondary rounded-circle p-2" aria-hidden="true"></span>
          </a>
          <a className="carousel-control-next w-auto opacity-0" href="#" role="button" data-bs-slide="next">
            <span className="carousel-control-next-icon bg-secondary rounded-circle p-2" aria-hidden="true"></span>
          </a>
        </div>
      </div>
    </div>
  );
};