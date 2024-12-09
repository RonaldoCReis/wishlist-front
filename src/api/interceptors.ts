/* eslint-disable no-console */

import { auth } from '@clerk/nextjs/server';
import { AxiosInstance } from 'axios';

export function withInterceptors(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.request.use(
    async (request) => {
      const { getToken } = await auth();

      request.headers.Authorization = `Bearer ${getToken()}`;

      return request;
    },
    (error) => {
      console.log(error);

      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error);

      return Promise.reject(error);
    }
  );

  return axiosInstance;
}
