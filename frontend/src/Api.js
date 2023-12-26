import axios from 'axios';


let baseURL = "";
if (import.meta.env.VITE_MODE === "Production") {
  baseURL = import.meta.env.VITE_API_BASE_URL_PROD;
} else if (import.meta.env.VITE_MODE === "Development") {
  baseURL = import.meta.env.VITE_API_BASE_URL_DEV;
}

const Api = axios.create({
  baseURL: baseURL,
});

export default Api;