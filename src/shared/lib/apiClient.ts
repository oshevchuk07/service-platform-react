import axios from 'axios';
import { clearAuthTokens, getAccessToken } from './tokenStorage';
import { toast } from 'sonner';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      clearAuthTokens();
      window.location.href = '/login';
      return Promise.reject(error);
    }

    if (status === 403) {
      toast.error('This action not allower');
    } else if (status >= 500) {
      toast.error('Server error');
    } else if (status >= 400) {
      const message = error.response?.data?.message;
      toast.error(Array.isArray(message) ? message[0] : (message ?? 'Something went wrong'));
    } else {
      toast.error('Network error');
    }
    return Promise.reject(error);
  },
);
