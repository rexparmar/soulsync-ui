import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080', // your backend base URL
});

// Attach token to each request (if exists)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
