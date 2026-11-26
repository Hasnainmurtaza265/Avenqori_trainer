import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
});

// When authentication is implemented, save the access token under this key.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('avenqori_access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(new Error(
    error.response?.data?.message || error.message || 'Unable to complete request'
  ))
);

export default api;
