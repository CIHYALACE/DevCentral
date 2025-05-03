import { Store } from "@tanstack/react-store";
import axios from "axios";
import { API_URL } from ".";

// Set up axios with a default Authorization header
const setupAxios = () => {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
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

axios.post('http://127.0.0.1:8000/auth/jwt/create/', {
  email: 'user@example.com',
  password: 'password123'
});

export { authStore, login, logout, refresh };



