import axios from "axios";
import { getToken } from "./utils/utils";

const instance = axios.create({
  baseURL: import.meta.env.VITE_URL,
  // headers: config,
});

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
