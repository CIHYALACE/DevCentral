import { Store } from "@tanstack/react-store";
import axios from "axios";
import { API_URL } from ".";

const categoryStore = new Store({
  categories: [],
  loading: false,
  error: null
});

const fetchCategories = async () => {
  categoryStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    const response = await axios.get(`${API_URL}/categories/`);
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
