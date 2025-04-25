import { Store } from "@tanstack/react-store";
import axios from "axios";
import { API_URL } from ".";

const appStore = new Store({apps:[],currentApp:{}});
const fetchApps = () => {
  axios.get(`${API_URL}/top-chart-apps/`).then((response) => {
    appStore.setState((state) => ({...state, apps:response.data}));
  });
};
const fetchAppDetails = (slug)=>{
  axios.get(`${API_URL}/apps/${slug}/`).then((response) => {
    appStore.setState((state) => ({...state, currentApp:response.data}));
  });
};

export { appStore, fetchApps, fetchAppDetails };
