import { Store } from "@tanstack/react-store";
import axios from "axios";
import { API_URL } from ".";

const downloadStore = new Store({
  downloads: [],
  userDownloads: [],
  loading: false,
  error: null,
  totalDownloads: 0,
  totalUserDownloads: 0,
  currentPage: 1
});

const fetchDownloads = async (page = 1, pageSize = 10, programId = null) => {
  downloadStore.setState((state) => ({ ...state, loading: true, error: null, currentPage: page }));
  try {
    // Build query parameters
    let url = `${API_URL}/downloads/?page=${page}&page_size=${pageSize}`;
    if (programId) url += `&program=${programId}`;
    
    // First get the total count
    const countResponse = await axios.get(`${API_URL}/downloads/?count_only=true${programId ? `&program=${programId}` : ''}`);
    const totalDownloads = countResponse.data.count || 0;
    
    // Then get the paginated data
    const response = await axios.get(url);
    
    // Handle both paginated and non-paginated responses
    const downloads = response.data.results ? response.data.results : response.data;
    
    downloadStore.setState((state) => ({
      ...state,
      downloads,
      totalDownloads,
      loading: false
    }));
    return downloads;
  } catch (error) {
    downloadStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  }
};

const fetchUserDownloads = async (page = 1, pageSize = 10) => {
  downloadStore.setState((state) => ({ ...state, loading: true, error: null, currentPage: page }));
  try {
    // First get the total count
    const countResponse = await axios.get(`${API_URL}/downloads/?user=me&count_only=true`);
    const totalUserDownloads = countResponse.data.count || 0;
    
    // Then get the paginated data
    const response = await axios.get(`${API_URL}/downloads/?user=me&page=${page}&page_size=${pageSize}`);
    
    // Handle both paginated and non-paginated responses
    const userDownloads = response.data.results ? response.data.results : response.data;
    
    downloadStore.setState((state) => ({
      ...state,
      userDownloads,
      totalUserDownloads,
      loading: false
    }));
    return userDownloads;
  } catch (error) {
    downloadStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  }
};

const recordDownload = async (programId) => {
  downloadStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    const response = await axios.post(`${API_URL}/downloads/`, {
      program: programId
    });
    
    // Update the downloads list with the new download
    downloadStore.setState((state) => ({
      ...state,
      downloads: [...state.downloads, response.data],
      userDownloads: [...state.userDownloads, response.data],
      totalDownloads: state.totalDownloads + 1,
      totalUserDownloads: state.totalUserDownloads + 1,
      loading: false
    }));
    
    return response.data;
  } catch (error) {
    downloadStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  }
};

export { 
  downloadStore, 
  fetchDownloads, 
  fetchUserDownloads, 
  recordDownload 
};
