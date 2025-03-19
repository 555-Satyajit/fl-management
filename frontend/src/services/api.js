import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Knowledge Base API
export const knowledgeBaseAPI = {
  getDailyTip: (latitude, longitude) => api.get('/knowledge-base/tip', { params: { latitude, longitude }}),
  getMyths: (page = 1, limit = 10) => api.get('/knowledge-base/myths', { params: { page, limit }}),
  getFacts: (page = 1, limit = 10) => api.get('/knowledge-base/facts', { params: { page, limit }}),
  getFarmerSpotlight: () => api.get('/knowledge-base/farmer-spotlight'),
  getSuccessStories: (page = 1, limit = 5) => api.get('/knowledge-base/success-stories', { params: { page, limit }}),
  
  // Admin functions
  createKnowledgeItem: (itemData) => api.post('/knowledge-base', itemData),
  updateKnowledgeItem: (id, itemData) => api.put(`/knowledge-base/${id}`, itemData),
  deleteKnowledgeItem: (id) => api.delete(`/knowledge-base/${id}`)
};

export default api;