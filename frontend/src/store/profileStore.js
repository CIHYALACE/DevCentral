import { Store } from "@tanstack/react-store";
import axios from "axios";
import { API_URL } from ".";

const profileStore = new Store({
  profiles: [],
  currentProfile: null,
  userApps: [],
  loading: false,
  error: null
});

const fetchUserProfile = async (userId) => {
  profileStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    const response = await axios.get(`${API_URL}/users/profiles/${userId}/`);
    profileStore.setState((state) => ({
      ...state,
      currentProfile: response.data,
      loading: false
    }));
    return response.data;
  } catch (error) {
    profileStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  }
};

const fetchCurrentUserProfile = async () => {
  profileStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    const response = await axios.get(`${API_URL}/users/profiles/me/`);
    profileStore.setState((state) => ({
      ...state,
      currentProfile: response.data,
      loading: false
    }));
    return response.data;
  } catch (error) {
    profileStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  }
};

const updateUserProfile = async (profileData) => {
  profileStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    const response = await axios.patch(`${API_URL}/users/profiles/me/`, profileData);
    profileStore.setState((state) => ({
      ...state,
      currentProfile: response.data,
      loading: false
    }));
    return response.data;
  } catch (error) {
    profileStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  }
};

const fetchUserApps = async () => {
  profileStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    const response = await axios.get(`${API_URL}/users/profiles/me/apps_library/`);
    profileStore.setState((state) => ({
      ...state,
      userApps: response.data,
      loading: false
    }));
    return response.data;
  } catch (error) {
    profileStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  }
};

export { 
  profileStore, 
  fetchUserProfile, 
  fetchCurrentUserProfile, 
  updateUserProfile,
  fetchUserApps
};
