import { Store } from "@tanstack/react-store";
import axios from "axios";
import { API_URL } from ".";

const gameStore = new Store({games:[],currentGame:{}});
const fetchGames = () => {
  axios.get(`${API_URL}/apps/games/`).then((response) => {
    gameStore.setState((state) => ({...state, games:response.data}));
  });
};

const fetchGameDetails = (slug) => {
  axios.get(`${API_URL}/apps/${slug}/`).then((response) => {
    gameStore.setState((state) => ({...state, currentGame:response.data}));
  });
};

export { gameStore, fetchGames, fetchGameDetails };
