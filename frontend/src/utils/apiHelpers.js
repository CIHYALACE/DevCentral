import axios from 'axios';
import { 
  login, 
  logout, 
  refresh,
  fetchCategories,
  fetchPrograms,
  fetchProgramDetails,
  fetchTopCharts,
  fetchProductivityApps,
  fetchReviews,
  fetchProgramReviews,
  submitReview,
  fetchUserProfile,
  fetchCurrentUserProfile,
  updateUserProfile,
  fetchUserApps,
  fetchDownloads,
  fetchUserDownloads,
  recordDownload,
  fetchFlags,
  fetchUserFlags,
  submitFlag
} from '../store';

// Setup axios interceptor for authentication
const setupAxiosInterceptors = () => {
  // Request interceptor to add token to requests
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle token refresh
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      
      // If error is 401 and we haven't tried to refresh token yet
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          // Try to refresh the token
          const refreshToken = localStorage.getItem('refresh');
          if (refreshToken) {
            await refresh();
            // Retry the original request with new token
            return axios(originalRequest);
          }
        } catch (refreshError) {
          // If refresh fails, logout user
          logout();
          return Promise.reject(refreshError);
        }
      }
      
      return Promise.reject(error);
    }
  );
};

// Authentication helpers
const loginUser = async (email, password) => {
  try {
    const data = await login(email, password);
    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || { detail: 'Login failed. Please try again.' } 
    };
  }
};

const logoutUser = () => {
  logout();
  return { success: true };
};

const registerUser = async (userData) => {
  try {
    const response = await axios.post('/auth/users/', userData);
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || { detail: 'Registration failed. Please try again.' } 
    };
  }
};

// Program helpers
const getPrograms = async () => {
  try {
    const data = await fetchPrograms();
    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || { detail: 'Failed to fetch programs.' } 
    };
  }
};

const getProgramDetails = async (slug) => {
  try {
    const data = await fetchProgramDetails(slug);
    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || { detail: 'Failed to fetch program details.' } 
    };
  }
};

const getTopChartApps = async () => {
  try {
    const data = await fetchTopCharts();
    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || { detail: 'Failed to fetch top chart apps.' } 
    };
  }
};

const getProductivityApps = async () => {
  try {
    const data = await fetchProductivityApps();
    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || { detail: 'Failed to fetch productivity apps.' } 
    };
  }
};

// Category helpers
const getCategories = async () => {
  try {
    const data = await fetchCategories();
    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || { detail: 'Failed to fetch categories.' } 
    };
  }
};

// Review helpers
const getReviews = async () => {
  try {
    const data = await fetchReviews();
    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || { detail: 'Failed to fetch reviews.' } 
    };
  }
};

const getProgramReviews = async (programId) => {
  try {
    const data = await fetchProgramReviews(programId);
    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || { detail: 'Failed to fetch program reviews.' } 
    };
  }
};

const addReview = async (programId, score, comment) => {
  try {
    const data = await submitReview(programId, score, comment);
    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || { detail: 'Failed to submit review.' } 
    };
  }
};

// Profile helpers
const getUserProfile = async (userId) => {
  try {
    const data = await fetchUserProfile(userId);
    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || { detail: 'Failed to fetch user profile.' } 
    };
  }
};

const getCurrentUserProfile = async () => {
  try {
    const data = await fetchCurrentUserProfile();
    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || { detail: 'Failed to fetch current user profile.' } 
    };
  }
};

const updateProfile = async (profileData) => {
  try {
    const data = await updateUserProfile(profileData);
    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || { detail: 'Failed to update profile.' } 
    };
  }
};

const getUserApps = async () => {
  try {
    const data = await fetchUserApps();
    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || { detail: 'Failed to fetch user apps.' } 
    };
  }
};

// Download helpers
const getDownloads = async () => {
  try {
    const data = await fetchDownloads();
    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || { detail: 'Failed to fetch downloads.' } 
    };
  }
};

const getUserDownloads = async () => {
  try {
    const data = await fetchUserDownloads();
    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || { detail: 'Failed to fetch user downloads.' } 
    };
  }
};

const downloadProgram = async (programId) => {
  try {
    const data = await recordDownload(programId);
    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || { detail: 'Failed to record download.' } 
    };
  }
};

// Flag helpers
const getFlags = async () => {
  try {
    const data = await fetchFlags();
    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || { detail: 'Failed to fetch flags.' } 
    };
  }
};

const getUserFlags = async () => {
  try {
    const data = await fetchUserFlags();
    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || { detail: 'Failed to fetch user flags.' } 
    };
  }
};

const flagProgram = async (programId, reason, description = "") => {
  try {
    const data = await submitFlag(programId, reason, description);
    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || { detail: 'Failed to submit flag.' } 
    };
  }
};

export {
  setupAxiosInterceptors,
  loginUser,
  logoutUser,
  registerUser,
  getPrograms,
  getProgramDetails,
  getTopChartApps,
  getProductivityApps,
  getCategories,
  getReviews,
  getProgramReviews,
  addReview,
  getUserProfile,
  getCurrentUserProfile,
  updateProfile,
  getUserApps,
  getDownloads,
  getUserDownloads,
  downloadProgram,
  getFlags,
  getUserFlags,
  flagProgram
};
