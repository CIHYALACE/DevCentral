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
    let url = `${API_URL}/categories/?page=1&page_size=100`;
    if (type) {
      url += `&related_type=${type}`;
    }
    
    const response = await axios.get(url);
    categoryStore.setState((state) => ({
      ...state,
      categories: response.data.results,
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

const addCategory = async (category) => {
  categoryStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    const response = await axios.post(`${API_URL}/categories/`, category);
    categoryStore.setState((state) => ({
      ...state,
      categories: [...state.categories, response.data],
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

const editCategory = async (id, category) => {
  categoryStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    const response = await axios.put(`${API_URL}/categories/${id}/`, category);
    categoryStore.setState((state) => ({
      ...state,
      categories: state.categories.map(category => category.id === id ? response.data : category),
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

const deleteCategory = async (id) => {
  categoryStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    await axios.delete(`${API_URL}/categories/${id}/`);
    categoryStore.setState((state) => ({
      ...state,
      categories: state.categories.filter(category => category.id !== id),
      loading: false
    }));
    return true;
  } catch (error) {
    categoryStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  }
};

export { categoryStore, fetchCategories, getCategoryByType, addCategory, editCategory, deleteCategory };
