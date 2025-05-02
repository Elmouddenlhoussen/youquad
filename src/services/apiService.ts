
import axios from 'axios';

// Base API URL - this should be configured based on your environment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - adds auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - handle common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response || {};
    
    // Handle authentication errors
    if (status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// API service methods
const apiService = {
  // Auth endpoints
  auth: {
    login: (credentials: { email: string; password: string }) => 
      apiClient.post('/auth/login', credentials),
    
    register: (userData: { name: string; email: string; password: string }) => 
      apiClient.post('/auth/register', userData),
    
    logout: () => apiClient.post('/auth/logout'),
    
    getCurrentUser: () => apiClient.get('/auth/me'),
  },
  
  // Quads endpoints
  quads: {
    getAll: () => apiClient.get('/quads'),
    getById: (id: string) => apiClient.get(`/quads/${id}`),
    create: (data: any) => apiClient.post('/quads', data),
    update: (id: string, data: any) => apiClient.put(`/quads/${id}`, data),
    delete: (id: string) => apiClient.delete(`/quads/${id}`),
  },
  
  // Tours endpoints
  tours: {
    getAll: () => apiClient.get('/tours'),
    getById: (id: string) => apiClient.get(`/tours/${id}`),
    create: (data: any) => apiClient.post('/tours', data),
    update: (id: string, data: any) => apiClient.put(`/tours/${id}`, data),
    delete: (id: string) => apiClient.delete(`/tours/${id}`),
  },
  
  // Bookings endpoints
  bookings: {
    getAll: () => apiClient.get('/bookings'),
    getById: (id: string) => apiClient.get(`/bookings/${id}`),
    create: (data: any) => apiClient.post('/bookings', data),
    update: (id: string, data: any) => apiClient.put(`/bookings/${id}`, data),
    delete: (id: string) => apiClient.delete(`/bookings/${id}`),
  },
};

export default apiService;
