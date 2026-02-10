import axios from 'axios';

const api = axios.create({
  // In production (Render single-service), the frontend is served by the backend
  // so calling `/api` hits the same origin.
  // In development, Vite proxies `/api` to the backend (see vite.config.js).
  baseURL: '/api',
});
export default api;