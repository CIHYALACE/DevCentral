import { Store } from "@tanstack/react-store";
import axios from "axios";
import { API_URL } from ".";

const bookStore = new Store({
  books: [],
  newReleases: [],
  selfHelpBooks: [],
  businessBooks: [],
  currentBook: null,
  loading: false,
  error: null,
  totalBooks: 0,
  currentPage: 1
});

const fetchBooks = async (page = 1, pageSize = 10) => {
  bookStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    // Get paginated data
    const response = await axios.get(`${API_URL}/api/books/?page=${page}&page_size=${pageSize}`);
    
    bookStore.setState((state) => ({
      ...state,
      books: response.data.results || response.data,
      totalBooks: response.data.count || 0,
      currentPage: page,
      loading: false
    }));
    return response.data.results || response.data;
  } catch (error) {
    bookStore.setState((state) => ({
      ...state,
      error: error.response?.data || { message: 'Failed to fetch books' },
      loading: false
    }));
    throw error;
  }
};

const fetchBookDetails = async (slug) => {
  bookStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    const response = await axios.get(`${API_URL}/api/books/${slug}/`);
    bookStore.setState((state) => ({
      ...state,
      currentBook: response.data,
      loading: false
    }));
    return response.data;
  } catch (error) {
    bookStore.setState((state) => ({
      ...state,
      error: error.response?.data || { message: 'Failed to fetch book details' },
      loading: false
    }));
    throw error;
  }
};

const fetchNewReleases = async () => {
  bookStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    const response = await axios.get(`${API_URL}/api/books/new_releases/`);
    bookStore.setState((state) => ({
      ...state,
      newReleases: response.data,
      loading: false,
    }));
  } catch (error) {
    bookStore.setState((state) => ({
      ...state,
      error: error.response?.data || { message: "Failed to fetch new releases" },
      loading: false,
    }));
  }
};

const fetchSelfHelpBooks = async () => {
  bookStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    const response = await axios.get(`${API_URL}/api/books/self_help/`);
    bookStore.setState((state) => ({
      ...state,
      selfHelpBooks: response.data,
      loading: false,
    }));
  } catch (error) {
    bookStore.setState((state) => ({
      ...state,
      error: error.response?.data || { message: "Failed to fetch self-help books" },
      loading: false,
    }));
  }
};

const fetchBusinessBooks = async () => {
  bookStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    const response = await axios.get(`${API_URL}/api/books/business/`);
    bookStore.setState((state) => ({
      ...state,
      businessBooks: response.data,
      loading: false,
    }));
  } catch (error) {
    bookStore.setState((state) => ({
      ...state,
      error: error.response?.data || { message: "Failed to fetch business books" },
      loading: false,
    }));
  }
};

export { 
  bookStore, 
  fetchBooks,
  fetchBookDetails,
  fetchNewReleases, 
  fetchSelfHelpBooks, 
  fetchBusinessBooks 
};