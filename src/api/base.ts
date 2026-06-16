import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

API.interceptors.request.use(
  (config) => {
    config.headers = { Authorization: `Bearer ${window.localStorage.getItem('token')}` };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
