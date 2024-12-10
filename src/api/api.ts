import axios from 'axios';

import { withInterceptors } from './interceptors';

export const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 30000,
});

export const api = withInterceptors(axiosInstance);
