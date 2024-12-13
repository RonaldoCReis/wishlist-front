// import axios from 'axios';

// import { withInterceptors } from './interceptors';

// export const axiosInstance = axios.create({
//   baseURL: process.env.API_URL,
//   timeout: 30000,
// });

// export const api = withInterceptors(axiosInstance);

class Api {
  private baseURL: string;
  private token: string;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || '';
    this.token = '';
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.token}`,
      'ngrok-skip-browser-warning': 'true',
    };
  }
  private getHeadersJson() {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
      'ngrok-skip-browser-warning': 'true',
    };
  }

  async get<T>(path: string) {
    const response = await fetch(this.baseURL + path, {
      method: 'GET',
      headers: this.getHeadersJson(),
    });

    return response.json() as Promise<T>;
  }

  async post<T>(path: string, body: any) {
    const response = await fetch(this.baseURL + path, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: this.getHeadersJson(),
    });

    return response.json() as Promise<T>;
  }

  async put<T>(path: string, body: any) {
    const response = await fetch(this.baseURL + path, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: this.getHeadersJson(),
    });

    return response.json() as Promise<T>;
  }

  async delete<T>(path: string) {
    const response = await fetch(this.baseURL + path, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    return response.json() as Promise<T>;
  }

  async patch<T>(path: string, body: any) {
    const response = await fetch(this.baseURL + path, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: this.getHeadersJson(),
    });

    return response.json() as Promise<T>;
  }

  setToken(token: string) {
    this.token = token;
  }
}
export const api = new Api(process.env.NEXT_PUBLIC_API_URL);
