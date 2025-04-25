import axios from "axios";
import { API_URL } from ".";
import { Store } from "@tanstack/react-store";

const reviewStore = new Store([]);
const fetchReviews = () => {
  axios.get(`${API_URL}/reviews/`).then((response) => {
    reviewStore.setState((state) => response.data);
  });
};
