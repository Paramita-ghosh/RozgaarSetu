import axios from 'axios';
import { auth } from '../firebase'; // Import your firebase config

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

instance.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem('token');
    
    // Check if Firebase user is active and token might need refreshing
    if (auth.currentUser) {
      // Passing 'true' forces a refresh if the token is old
      token = await auth.currentUser.getIdToken(true);
      localStorage.setItem('token', token);
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;