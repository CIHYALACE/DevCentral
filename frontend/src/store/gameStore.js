import { Store } from "@tanstack/react-store";
import axios from "axios";
import { API_URL } from ".";

const gameStore = new Store({
  games: [],
  currentGame: {},
  loading: false,
  error: null,
  totalGames: 0,
  currentPage: 1
});
const fetchGames = async (page = 1, pageSize = 12, category = null) => {
  gameStore.setState((state) => ({ ...state, loading: true, error: null, currentPage: page }));
  
  try {
    // Build query parameters
    let countUrl = `${API_URL}/apps/?count_only=true&type=game`;
    let url = `${API_URL}/apps/?page=${page}&page_size=${pageSize}&type=game`;
    
    if (category) {
      countUrl += `&category=${category}`;
      url += `&category=${category}`;
    }
    
    // First get the total count
    const countResponse = await axios.get(countUrl);
    const totalGames = countResponse.data.count || 0;
    
    // Then get the paginated data
    const response = await axios.get(url);
    
    // Handle both paginated and non-paginated responses
    // Ensure games is always an array
    const games = response.data.results ? response.data.results : 
                 (Array.isArray(response.data) ? response.data : []);
    
    gameStore.setState((state) => ({
      ...state,
      games,
      totalGames,
      loading: false
    }));
    
    return games;
  } catch (error) {
    gameStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  }
};

const fetchGameDetails = async (slug) => {
  gameStore.setState((state) => ({ ...state, loading: true, error: null }));
  
  try {
    const response = await axios.get(`${API_URL}/apps/${slug}/`);
    
    gameStore.setState((state) => ({
      ...state,
      currentGame: response.data,
      loading: false
    }));
    
    return response.data;
  } catch (error) {
    gameStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  }
};

export { gameStore, fetchGames, fetchGameDetails };
