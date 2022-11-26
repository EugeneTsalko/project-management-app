import axios from 'axios';

import { token } from './token';

const API = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: 'https://boiling-lake-31774.herokuapp.com',
});

API.interceptors.request.use(
  (config) => {
    // config.headers = { Authorization: `Bearer ${window.localStorage.getItem('token')}` };
    config.headers = { Authorization: `Bearer ${token}` };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
