import { Store } from "@tanstack/react-store";
import axios from "axios";
import { API_URL } from ".";

// Initialize admin state
const initialState = {
  stats: {
    totalPrograms: 0,
    activeUsers: 0,
    totalReviews: 0,
    categories: 0
  },
  programs: {
    data: [],
    loading: false,
    error: null
  },
  reviews: {
    data: [],
    loading: false,
    error: null
  },
  media: {
    data: [],
    loading: false,
    error: null
  },
  users: {
    data: [],
    loading: false,
    error: null
  },
  categories: {
    data: [],
    loading: false,
    error: null
  },
  tokens: {
    data: [],
    loading: false,
    error: null
  },
  loading: false,
  error: null
};

const adminStore = new Store(initialState);

// Fetch dashboard statistics
const fetchDashboardStats = async () => {
  adminStore.setState(state => ({ ...state, loading: true, error: null }));
  
  try {
    // Add a small delay to ensure the API has time to respond
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const response = await axios.get(`${API_URL}/admin/dashboard/stats/`);
    
    // Make sure we have valid data before updating the store
    const stats = response.data || initialState.stats;
    
    adminStore.setState(state => ({
      ...state,
      stats: {
        totalPrograms: stats.totalPrograms || 0,
        activeUsers: stats.activeUsers || 0,
        totalReviews: stats.totalReviews || 0,
        categories: stats.categories || 0
      },
      loading: false
    }));
    
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    
    // Ensure we set the error and reset loading state
    adminStore.setState(state => ({
      ...state,
      loading: false,
      error: error.response?.data || { detail: 'Failed to fetch dashboard statistics' }
    }));
    
    throw error;
  }
};

// Fetch all programs for admin
const fetchAdminPrograms = async () => {
  adminStore.setState(state => ({ 
    ...state, 
    programs: { ...state.programs, loading: true, error: null } 
  }));
  
  try {
    const response = await axios.get(`${API_URL}/programs/`);
    
    adminStore.setState(state => ({
      ...state,
      programs: {
        data: response.data.results || [],
        loading: false,
        error: null
      }
    }));
    
    return response.data;
  } catch (error) {
    console.error('Error fetching programs:', error);
    
    adminStore.setState(state => ({
      ...state,
      programs: {
        ...state.programs,
        loading: false,
        error: error.response?.data || { detail: 'Failed to fetch programs' }
      }
    }));
    
    throw error;
  }
};

// Fetch all reviews for admin
const fetchAdminReviews = async () => {
  adminStore.setState(state => ({ 
    ...state, 
    reviews: { ...state.reviews, loading: true, error: null } 
  }));
  
  try {
    const response = await axios.get(`${API_URL}/reviews/`);
    
    adminStore.setState(state => ({
      ...state,
      reviews: {
        data: response.data.results || [],
        loading: false,
        error: null
      }
    }));
    
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    
    adminStore.setState(state => ({
      ...state,
      reviews: {
        ...state.reviews,
        loading: false,
        error: error.response?.data || { detail: 'Failed to fetch reviews' }
      }
    }));
    
    throw error;
  }
};

// Fetch all media for admin
const fetchAdminMedia = async () => {
  adminStore.setState(state => ({ 
    ...state, 
    media: { ...state.media, loading: true, error: null } 
  }));
  
  try {
    const response = await axios.get(`${API_URL}/media/`);
    
    adminStore.setState(state => ({
      ...state,
      media: {
        data: response.data.results || [],
        loading: false,
        error: null
      }
    }));
    
    return response.data;
  } catch (error) {
    console.error('Error fetching media:', error);
    
    adminStore.setState(state => ({
      ...state,
      media: {
        ...state.media,
        loading: false,
        error: error.response?.data || { detail: 'Failed to fetch media' }
      }
    }));
    
    throw error;
  }
};

// Fetch all users for admin
const fetchAdminUsers = async () => {
  adminStore.setState(state => ({ 
    ...state, 
    users: { ...state.users, loading: true, error: null } 
  }));
  
  try {
    const response = await axios.get(`${API_URL}/auth/users/`);
    
    adminStore.setState(state => ({
      ...state,
      users: {
        data: response.data.results || [],
        loading: false,
        error: null
      }
    }));
    
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    
    adminStore.setState(state => ({
      ...state,
      users: {
        ...state.users,
        loading: false,
        error: error.response?.data || { detail: 'Failed to fetch users' }
      }
    }));
    
    throw error;
  }
};

// Fetch all categories for admin
const fetchAdminCategories = async () => {
  adminStore.setState(state => ({ 
    ...state, 
    categories: { ...state.categories, loading: true, error: null } 
  }));
  
  try {
    const response = await axios.get(`${API_URL}/categories/`);
    
    adminStore.setState(state => ({
      ...state,
      categories: {
        data: response.data || [],
        loading: false,
        error: null
      }
    }));
    
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    
    adminStore.setState(state => ({
      ...state,
      categories: {
        ...state.categories,
        loading: false,
        error: error.response?.data || { detail: 'Failed to fetch categories' }
      }
    }));
    
    throw error;
  }
};

// Since we don't have a /auth/tokens/ endpoint, we'll use local storage to manage tokens
// Fetch all tokens for admin (from local storage)
const fetchAdminTokens = async () => {
  adminStore.setState(state => ({ 
    ...state, 
    tokens: { ...state.tokens, loading: true, error: null } 
  }));
  
  try {
    // Simulate API call with a small delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Get tokens from local storage
    const tokensString = localStorage.getItem('admin_tokens');
    const tokens = tokensString ? JSON.parse(tokensString) : [];
    
    adminStore.setState(state => ({
      ...state,
      tokens: {
        data: tokens,
        loading: false,
        error: null
      }
    }));
    
    return { results: tokens };
  } catch (error) {
    console.error('Error fetching tokens:', error);
    
    adminStore.setState(state => ({
      ...state,
      tokens: {
        ...state.tokens,
        loading: false,
        error: { detail: 'Failed to fetch tokens' }
      }
    }));
    
    throw error;
  }
};

// Create a new token
const createToken = async (tokenData) => {
  adminStore.setState(state => ({ 
    ...state, 
    tokens: { ...state.tokens, loading: true, error: null } 
  }));
  
  try {
    // Simulate API call with a small delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get existing tokens
    const tokensString = localStorage.getItem('admin_tokens');
    const existingTokens = tokensString ? JSON.parse(tokensString) : [];
    
    // Generate a new token
    const newToken = {
      id: Date.now(),
      name: tokenData.name,
      token: generateRandomToken(),
      status: 'active',
      expires_at: tokenData.expiresAt || null,
      created_at: new Date().toISOString()
    };
    
    // Add new token to the list
    const updatedTokens = [newToken, ...existingTokens];
    
    // Save to local storage
    localStorage.setItem('admin_tokens', JSON.stringify(updatedTokens));
    
    // Update store
    adminStore.setState(state => ({
      ...state,
      tokens: {
        data: updatedTokens,
        loading: false,
        error: null
      }
    }));
    
    return newToken;
  } catch (error) {
    console.error('Error creating token:', error);
    
    adminStore.setState(state => ({
      ...state,
      tokens: {
        ...state.tokens,
        loading: false,
        error: { detail: 'Failed to create token' }
      }
    }));
    
    throw error;
  }
};

// Revoke a token
const revokeToken = async (tokenId) => {
  adminStore.setState(state => ({ 
    ...state, 
    tokens: { ...state.tokens, loading: true, error: null } 
  }));
  
  try {
    // Simulate API call with a small delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Get existing tokens
    const tokensString = localStorage.getItem('admin_tokens');
    const existingTokens = tokensString ? JSON.parse(tokensString) : [];
    
    // Update the token status to 'revoked'
    const updatedTokens = existingTokens.map(token => 
      token.id === tokenId ? { ...token, status: 'revoked' } : token
    );
    
    // Save to local storage
    localStorage.setItem('admin_tokens', JSON.stringify(updatedTokens));
    
    // Update store
    adminStore.setState(state => ({
      ...state,
      tokens: {
        data: updatedTokens,
        loading: false,
        error: null
      }
    }));
    
    return true;
  } catch (error) {
    console.error('Error revoking token:', error);
    
    adminStore.setState(state => ({
      ...state,
      tokens: {
        ...state.tokens,
        loading: false,
        error: { detail: 'Failed to revoke token' }
      }
    }));
    
    throw error;
  }
};

// Helper function to generate a random token
const generateRandomToken = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = 40;
  let token = '';
  
  for (let i = 0; i < length; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return token;
};

export { 
  adminStore, 
  fetchDashboardStats,
  fetchAdminPrograms,
  fetchAdminReviews,
  fetchAdminMedia,
  fetchAdminUsers,
  fetchAdminCategories,
  fetchAdminTokens,
  createToken,
  revokeToken
};
