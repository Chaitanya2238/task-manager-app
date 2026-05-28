import axios from 'axios';

// This will use your Render URL in production and localhost in development
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const API = axios.create({ baseURL });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
