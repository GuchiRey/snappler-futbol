import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001", //PROXY
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
