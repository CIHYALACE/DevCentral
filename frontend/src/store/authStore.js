import { Store } from "@tanstack/react-store";
import axios from "axios";
import { API_URL } from ".";

const authStore = new Store({
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
    token: null,
    refresh: null,
  },
  error: {},
});

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/jwt/create/`, { email, password });
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
    localStorage.setItem('token', response.data.access);
    authStore.setState((state) => ({
      ...state,
      user: { ...state.user, token: response.data },
    }));
    return response.data;
  } catch (error) {
    authStore.setState((state) => ({ ...state, error }));
    throw error;
  }
};

const logout = () => {
  axios.defaults.headers.common['Authorization'] = null;
  localStorage.removeItem('token');
  authStore.setState((state) => ({
    ...state,
    user: { ...state.user, token: null },
  }));
};

const refresh = async () => {
  try {
    const response = await axios.post(`${API_URL}/auth/jwt/refresh/`, { refresh: localStorage.getItem('refresh') });
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
    localStorage.setItem('token', response.data.access);
    authStore.setState((state) => ({
      ...state,
      user: { ...state.user, token: response.data },
    }));
    return response.data;
  } catch (error) {
    authStore.setState((state) => ({
      ...state,
      error: error,
    }));
    throw error;
  }
};

export { authStore, login, logout, refresh };


