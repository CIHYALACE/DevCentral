import axios from "axios";
import { API_URL } from ".";
import { Store } from "@tanstack/react-store";

const reviewStore = new Store({
  reviews: [],
  programReviews: [],
  loading: false,
  error: null,
  totalReviews: 0
});

const fetchReviews = async () => {
  reviewStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    const response = await axios.get(`${API_URL}/reviews/`);
    reviewStore.setState((state) => ({
      ...state,
      reviews: response.data,
      loading: false
    }));
    return response.data;
  } catch (error) {
    reviewStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  }
};

const fetchProgramReviews = async (programId, page = 1, pageSize = 5) => {
  reviewStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    // First, get the total count of reviews for this program
    const countResponse = await axios.get(`${API_URL}/reviews/?program=${programId}&count_only=true`);
    const totalReviews = countResponse.data.count || 0;
    
    // Then get the paginated reviews
    const response = await axios.get(`${API_URL}/reviews/?program=${programId}&page=${page}&page_size=${pageSize}`);
    
    // Handle both paginated and non-paginated responses
    const reviews = response.data.results ? response.data.results : response.data;
    const count = response.data.count !== undefined ? response.data.count : totalReviews;
    
    reviewStore.setState((state) => ({
      ...state,
      programReviews: reviews,
      totalReviews: count,
      loading: false
    }));
    return reviews;
  } catch (error) {
    reviewStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  }
};

const submitReview = async (programId, score, comment) => {
  reviewStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    const response = await axios.post(`${API_URL}/reviews/`, {
      program: programId,
      score,
      comment
    });
    
    // Update the reviews list with the new review
    reviewStore.setState((state) => ({
      ...state,
      reviews: [...state.reviews, response.data],
      programReviews: [...state.programReviews, response.data],
      totalReviews: state.totalReviews + 1,
      loading: false
    }));
    
    return response.data;
  } catch (error) {
    reviewStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  }
};

export { reviewStore, fetchReviews, fetchProgramReviews, submitReview };
