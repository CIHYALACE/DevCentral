import { Store } from "@tanstack/react-store";
import axios from "axios";
import { API_URL } from ".";

const categoryStore = new Store({
  categories: [],
  loading: false,
  error: null
});

const fetchCategories = async (type = null) => {
  categoryStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    let url = `${API_URL}/categories/`;
    if (type) {
      url += `?related_type=${type}`;
    }
    
    const response = await axios.get(url);
    categoryStore.setState((state) => ({
      ...state,
      categories: response.data,
      loading: false
    }));
    return response.data;
  } catch (error) {
    categoryStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  }
};

const getCategoryByType = (type) => {
  const { categories } = categoryStore.state;
  return categories.filter(category => category.related_type === type);
};

export { categoryStore, fetchCategories, getCategoryByType };
