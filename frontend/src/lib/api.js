import axios from 'axios';

// Create an Axios instance configured to point to our Node.js Backend API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Automatically inject the JWT token if the user is authenticated
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('hostellite_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
