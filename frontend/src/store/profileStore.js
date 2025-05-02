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
    // Set the proper content type for the request
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };
    
    // Filter out any invalid fields that don't exist in the UserProfile model
    // Only allow these known fields
    const validProfileFields = ['bio', 'location', 'date_of_birth', 'country', 'phone_number'];
    const validUserFields = ['name', 'phone_number'];
    
    const cleanedData = {};
    
    // Process user fields
    if (profileData.user) {
      const userFields = {};
      Object.keys(profileData.user).forEach(key => {
        if (validUserFields.includes(key)) {
          userFields[key] = profileData.user[key];
        }
      });
      if (Object.keys(userFields).length > 0) {
        cleanedData.user = userFields;
      }
    }
    
    // Process profile fields
    Object.keys(profileData).forEach(key => {
      if (validProfileFields.includes(key) && key !== 'user') {
        cleanedData[key] = profileData[key];
      }
    });
    
    console.log('Updating profile with cleaned data:', cleanedData);
    
    const response = await axios.patch(`${API_URL}/users/profiles/me/`, cleanedData, config);
    
    console.log('Profile update response:', response.data);
    
    profileStore.setState((state) => ({
      ...state,
      currentProfile: response.data,
      loading: false
    }));
    return response.data;
  } catch (error) {
    console.error('Profile update error:', error.response?.data || error.message);
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
    console.log('Fetching user apps...');
    // Use the correct endpoint path with the router prefix
    const response = await axios.get(`${API_URL}/profiles/me/apps_library/`);
    console.log('User apps response:', response.data);
    
    profileStore.setState((state) => ({
      ...state,
      userApps: response.data,
      loading: false
    }));
    return response.data;
  } catch (error) {
    console.error('Error fetching user apps:', error.response?.data || error.message);
    // Return empty array instead of throwing error for better UX
    profileStore.setState((state) => ({
      ...state,
      userApps: [],
      error,
      loading: false
    }));
    return [];
  }
};

export { 
  profileStore, 
  fetchUserProfile, 
  fetchCurrentUserProfile, 
  updateUserProfile,
  fetchUserApps
};
