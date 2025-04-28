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

const login = (email, password) => {
  axios.post(`${API_URL}/auth/jwt/create/`, { email, password }).then(
    (response) => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
      localStorage.setItem('token', response.data.access);
      authStore.setState((state) => ({
        ...state,
        user: { ...state.user, token: response.data },
      }));
    },
    (error) => {
      authStore.setState((state)=>({...state,error}));
    }
  );
};





export { authStore, login, fetchUser };
