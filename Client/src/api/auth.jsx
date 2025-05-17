import axios from 'axios';

const API = axios.create({
  baseURL:'http://localhost:5000/api',
});

// Add auth token to requests if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle 401 errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear it
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export const register = async (userData) => {
  const response = await API.post('/auth/register', userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const login = async (credentials) => {
  const response = await API.post('/auth/login', credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const getCurrentUser = async () => {
  // Only try to get current user if we have a token
  if (!localStorage.getItem('token')) {
    return null;
  }
  try {
    const response = await API.get('/auth/current');
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    return null;
  }
};

export const logout = async () => {
  localStorage.removeItem('token');
  await API.post('/auth/logout');
};