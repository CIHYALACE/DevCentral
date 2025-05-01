import { Store } from "@tanstack/react-store";
import axios from "axios";
import { API_URL } from ".";

const bookStore = new Store({
  books: [],
  currentBook: {},
  similarBooks: [],
  authorBooks: [],
  loading: false,
  error: null,
  totalBooks: 0,
  currentPage: 1
});

const fetchBooks = async (page = 1, pageSize = 10, category = null) => {
  bookStore.setState((state) => ({ ...state, loading: true, error: null, currentPage: page }));
  try {
    // Build query parameters
    let countUrl = `${API_URL}/books/?count_only=true`;
    let url = `${API_URL}/books/?page=${page}&page_size=${pageSize}`;
    
    if (category) {
      countUrl += `&category=${category}`;
      url += `&category=${category}`;
    }
    
    // First get the total count
    const countResponse = await axios.get(countUrl);
    const totalBooks = countResponse.data.count || 0;
    
    // Then get the paginated data
    const response = await axios.get(url);
    
    // Handle both paginated and non-paginated responses
    const books = response.data.results ? response.data.results : response.data;
    
    bookStore.setState((state) => ({
      ...state,
      books,
      totalBooks,
      loading: false
    }));
    return books;
  } catch (error) {
    bookStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  }
};

const fetchBookDetails = async (slug) => {
  bookStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    const response = await axios.get(`${API_URL}/books/${slug}/`);
    bookStore.setState((state) => ({
      ...state,
      currentBook: response.data,
      loading: false
    }));
    return response.data;
  } catch (error) {
    bookStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  }
};

const fetchSimilarBooks = async (slug) => {
  bookStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    const response = await axios.get(`${API_URL}/books/${slug}/similar_books/`);
    bookStore.setState((state) => ({
      ...state,
      similarBooks: response.data,
      loading: false
    }));
    return response.data;
  } catch (error) {
    bookStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  }
};

const fetchAuthorBooks = async (slug) => {
  bookStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    const response = await axios.get(`${API_URL}/books/${slug}/author_books/`);
    bookStore.setState((state) => ({
      ...state,
      authorBooks: response.data,
      loading: false
    }));
    return response.data;
  } catch (error) {
    bookStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  }
};

export { 
  bookStore, 
  fetchBooks, 
  fetchBookDetails, 
  fetchSimilarBooks,
  fetchAuthorBooks 
};