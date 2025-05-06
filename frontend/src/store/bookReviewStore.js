import axios from 'axios';

export const fetchBookReviews = async (bookId, page, perPage) => {
  const response = await axios.get(`/api/book-reviews/`, {
    params: { book: bookId, page, per_page: perPage }
  });
  return response.data;
};

export const submitBookReview = async (bookId, score, comment) => {
  await axios.post(`/api/book-reviews/`, { book: bookId, score, comment });
};