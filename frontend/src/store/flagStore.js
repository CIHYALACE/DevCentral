import { Store } from "@tanstack/react-store";
import axios from "axios";
import { API_URL } from ".";

const flagStore = new Store({
  flags: [],
  userFlags: [],
  loading: false,
  error: null,
  totalFlags: 0,
  totalUserFlags: 0,
  currentPage: 1
});

const fetchFlags = async (page = 1, pageSize = 10, programId = null) => {
  flagStore.setState((state) => ({ ...state, loading: true, error: null, currentPage: page }));
  try {
    // Build query parameters
    let url = `${API_URL}/flags/?page=${page}&page_size=${pageSize}`;
    if (programId) url += `&program=${programId}`;
    
    // First get the total count
    const countResponse = await axios.get(`${API_URL}/flags/?count_only=true${programId ? `&program=${programId}` : ''}`);
    const totalFlags = countResponse.data.count || 0;
    
    // Then get the paginated data
    const response = await axios.get(url);
    
    // Handle both paginated and non-paginated responses
    const flags = response.data.results ? response.data.results : response.data;
    
    flagStore.setState((state) => ({
      ...state,
      flags,
      totalFlags,
      loading: false
    }));
    return flags;
  } catch (error) {
    flagStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  }
};

const fetchUserFlags = async (page = 1, pageSize = 10) => {
  flagStore.setState((state) => ({ ...state, loading: true, error: null, currentPage: page }));
  try {
    // First get the total count
    const countResponse = await axios.get(`${API_URL}/flags/?user=me&count_only=true`);
    const totalUserFlags = countResponse.data.count || 0;
    
    // Then get the paginated data
    const response = await axios.get(`${API_URL}/flags/?user=me&page=${page}&page_size=${pageSize}`);
    
    // Handle both paginated and non-paginated responses
    const userFlags = response.data.results ? response.data.results : response.data;
    
    flagStore.setState((state) => ({
      ...state,
      userFlags,
      totalUserFlags,
      loading: false
    }));
    return userFlags;
  } catch (error) {
    flagStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  }
};

const submitFlag = async (programId, reason, description = "") => {
  flagStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    const response = await axios.post(`${API_URL}/flags/`, {
      program: programId,
      reason,
      description
    });
    
    // Update the flags list with the new flag
    flagStore.setState((state) => ({
      ...state,
      flags: [...state.flags, response.data],
      userFlags: [...state.userFlags, response.data],
      totalFlags: state.totalFlags + 1,
      totalUserFlags: state.totalUserFlags + 1,
      loading: false
    }));
    
    return response.data;
  } catch (error) {
    flagStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  }
};

export { 
  flagStore, 
  fetchFlags, 
  fetchUserFlags, 
  submitFlag 
};
