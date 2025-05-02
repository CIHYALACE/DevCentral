import { Store } from "@tanstack/react-store";
import axios from "axios";
import { API_URL } from ".";

const programStore = new Store({
  programs: [],
  currentProgram: {},
  topCharts: [],
  productivityApps: [],
  loading: false,
  error: null,
  totalPrograms: 0,
  currentPage: 1
});

const fetchPrograms = async (page = 1, pageSize = 10, category = null, search = null, type = null, isTopChart = false, limit = null) => {
  programStore.setState((state) => ({ ...state, loading: true, error: null, currentPage: page }));
  try {
    // Build query parameters
    let url = `${API_URL}/programs/?page=${page}&page_size=${pageSize}`;
    if (category) url += `&category=${category}`;
    if (search) url += `&search=${search}`;
    if (type) url += `&type=${type}`;
    if (isTopChart) url += `&top_chart=true`;
    if (limit) url += `&limit=${limit}`;
    
    // First get the total count
    const countResponse = await axios.get(`${API_URL}/programs/?count_only=true${type ? `&type=${type}` : ''}${category ? `&category=${category}` : ''}${search ? `&search=${search}` : ''}`);
    const totalPrograms = countResponse.data.count || 0;
    
    // Then get the paginated data
    const response = await axios.get(url);
    
    // Handle both paginated and non-paginated responses
    const programs = response.data.results ? response.data.results : response.data;
    
    programStore.setState((state) => ({
      ...state,
      programs,
      totalPrograms,
      loading: false
    }));
    return programs;
  } catch (error) {
    programStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  }
};

const fetchProgramDetails = async (slug) => {
  programStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    const response = await axios.get(`${API_URL}/programs/${slug}/`);
    programStore.setState((state) => ({
      ...state,
      currentProgram: response.data,
      loading: false
    }));
    return response.data;
  } catch (error) {
    programStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  }
};

const fetchTopCharts = async () => {
  programStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    const response = await axios.get(`${API_URL}/programs/?top_chart=true&limit=10`);
    
    // Handle both paginated and non-paginated responses
    const topCharts = response.data.results ? response.data.results : response.data;
    
    programStore.setState((state) => ({
      ...state,
      topCharts,
      loading: false
    }));
    return topCharts;
  } catch (error) {
    programStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  }
};

const fetchProductivityApps = async () => {
  programStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    const response = await axios.get(`${API_URL}/programs/?category=Productivity`);
    
    // Handle both paginated and non-paginated responses
    const productivityApps = response.data.results ? response.data.results : response.data;
    
    programStore.setState((state) => ({
      ...state,
      productivityApps,
      loading: false
    }));
    return productivityApps;
  } catch (error) {
    programStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  }
};

const getProgramsByCategory = async (categoryId, page = 1, pageSize = 10) => {
  return await fetchPrograms(page, pageSize, categoryId);
};

const getProgramsByType = async (type, page = 1, pageSize = 10) => {
  return await fetchPrograms(page, pageSize, null, null, type);
};

const searchPrograms = async (searchTerm, page = 1, pageSize = 10) => {
  return await fetchPrograms(page, pageSize, null, searchTerm);
};

export { 
  programStore, 
  fetchPrograms, 
  fetchProgramDetails, 
  fetchTopCharts, 
  fetchProductivityApps,
  getProgramsByCategory,
  getProgramsByType,
  searchPrograms
};
