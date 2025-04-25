import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// dummy data 
const reviews = [
  {
    rating: 5.0,
    title: "This is the best game I've ever played!!!",
    comment:
      "I love all the fights and upgrading it's really cool. Please make more games like this and add more people in the game — it's so great!",
    author: 'Mikeishia',
    date: '3/13/2025',
  },
  {
    rating: 3.0,
    title: "It's ok!",
    comment: "The campaign is fun. My kid peed on the floor again.",
    author: 'Ty',
    date: '12/4/2024',
  },
  {
    rating: 3.0,
    title: 'Fun game',
    comment: 'This game is addicting. I start to play and the next thing I know, two plus hours have disappeared.',
    author: 'Teri',
    date: '3/12/2025',
  },
];

export function RatingSection({reviews_}) {
  return (
    <Container className="mt-5">
      <Row>
        <Col lg={12} className="bg-white rounded-4 border shadow-sm p-4">
          <h3>Rating and Reviews</h3>
          <hr />
          <div className="rating d-flex align-items-center">
            <h1>4.6</h1>
            <div className="star-rating d-flex text-warning ms-4 align-items-center">
              <i className="fa-solid fa-star"></i>
            </div>
          </div>
          <p className="text-muted">7,717 ratings</p>

          {reviews.map((review, index) => (
            <div key={index}>
              <div className="review d-flex align-items-center mt-4">
                <h6 className="fw-bold">
                  {review.rating.toFixed(1)} <i className="fa-solid fa-star text-warning"></i>
                </h6>
                <h6 className="ms-3 fw-bold">{review.title}</h6>
              </div>
              <p className="text-muted">{review.comment}</p>
              <p className="text-muted">
                {review.author}, {review.date}
              </p>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
