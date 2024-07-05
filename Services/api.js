import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('User_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const login = async (username, password) => {
  const response = await API.post('/auth/login/', { username, password });
  return response.data;
};

export const getBanners = async () => {
  const response = await API.get('/admin_panel/banners');
  return response.data;
};

export default API;
