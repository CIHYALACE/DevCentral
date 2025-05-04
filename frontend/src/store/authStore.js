import { Store } from "@tanstack/react-store";
import axios from "axios";
import { API_URL } from ".";
import {jwtDecode} from "jwt-decode";

// Check if token is expired
const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

// Set up axios with a default Authorization header and interceptors
const setupAxios = () => {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  
  // Add request interceptor to handle token expiration
  axios.interceptors.request.use(
    async (config) => {
      // Don't check token for auth endpoints
      if (config.url.includes('/auth/jwt/create/') || config.url.includes('/auth/jwt/refresh/')) {
        return config;
      }
      
      const token = localStorage.getItem('token');
      
      // If token exists but is expired, try to refresh it
      if (token && isTokenExpired(token)) {
        try {
          const refreshToken = localStorage.getItem('refresh');
          if (!refreshToken) {
            // No refresh token, clear auth state
            logout();
            return config;
          }
          
          // Try to refresh the token
          const response = await axios.post(`${API_URL}/auth/jwt/refresh/`, { refresh: refreshToken });
          const newToken = response.data.access;
          
          // Update token in localStorage and headers
          localStorage.setItem('token', newToken);
          axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
          
          // Update auth store
          authStore.setState((state) => ({
            ...state,
            user: { ...state.user, token: { ...state.user.token, access: newToken } },
            isAuthenticated: true,
          }));
          
          // Update the current request with the new token
          config.headers['Authorization'] = `Bearer ${newToken}`;
        } catch (error) {
          // Refresh failed, clear auth state
          console.error('Token refresh failed:', error);
          logout();
        }
      }
      
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  // Add response interceptor to handle 401/403 errors
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      
      // If error is 401/403 and not from auth endpoints and not already retried
      if (
        error.response && 
        (error.response.status === 401 || error.response.status === 403) && 
        !originalRequest._retry && 
        !originalRequest.url.includes('/auth/jwt/create/') && 
        !originalRequest.url.includes('/auth/jwt/refresh/')
      ) {
        originalRequest._retry = true;
        
        try {
          // Try to refresh the token
          await refresh();
          
          // Retry the original request with the new token
          const token = localStorage.getItem('token');
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return axios(originalRequest);
        } catch (refreshError) {
          // If refresh fails, log the user out
          console.error('Token refresh failed in response interceptor:', refreshError);
          logout();
          return Promise.reject(error);
        }
      }
      
      return Promise.reject(error);
    }
  );
};

// Call this immediately to set up axios with any existing token
setupAxios();

// Initialize auth state from localStorage if available
const getInitialState = () => {
  const token = localStorage.getItem('token');
  const refresh = localStorage.getItem('refresh');
  return {
    user: {
      email: "",
      name: "",
      username: "",
      is_active: false,
      is_superuser: false,
      last_login: null,
      id: 0,
      first_name: "",
      last_name: "",
      profile: null,
      token: token ? { access: token, refresh } : null,
      refresh: refresh,
    },
    error: {},
    isAuthenticated: !!token,
  };
};

const authStore = new Store(getInitialState());

const login = async (email, password) => {
  try {
    // Clear any existing headers to avoid conflicts
    delete axios.defaults.headers.common['Authorization'];
    
    const response = await axios.post(`${API_URL}/auth/jwt/create/`, { email, password });
    console.log('Login response:', response.data);
    
    // Store tokens in localStorage
    localStorage.setItem('token', response.data.access);
    localStorage.setItem('refresh', response.data.refresh);
    
    // Set Authorization header for future requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
    
    // Update auth store state
    authStore.setState((state) => ({
      ...state,
      user: { ...state.user, token: response.data },
      isAuthenticated: true,
    }));
    
    // Test the authentication immediately
    try {
      const testResponse = await axios.get(`${API_URL}/users/auth-test/`);
      console.log('Auth test response:', testResponse.data);
      
      // If auth test passes, fetch user data
      const userResponse = await axios.get(`${API_URL}/auth/users/me/`);
      authStore.setState((state) => ({
        ...state,
        user: { ...state.user, ...userResponse.data },
      }));
    } catch (testError) {
      console.error('Auth test error:', testError.response?.data || testError.message);
    }
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    authStore.setState((state) => ({ ...state, error }));
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh');
  delete axios.defaults.headers.common['Authorization'];
  
  authStore.setState((state) => ({
    ...state,
    user: { ...state.user, token: null },
    isAuthenticated: false,
  }));
};

const refresh = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    const response = await axios.post(`${API_URL}/auth/jwt/refresh/`, { refresh: refreshToken });
    localStorage.setItem('token', response.data.access);
    
    // Update the Authorization header
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
    
    authStore.setState((state) => ({
      ...state,
      user: { ...state.user, token: { ...state.user.token, access: response.data.access } },
      isAuthenticated: true,
    }));
    return response.data;
  } catch (error) {
    // If refresh fails, log the user out
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      logout();
    }
    
    authStore.setState((state) => ({
      ...state,
      error: error,
    }));
    throw error;
  }
};

export { authStore, login, logout, refresh };



