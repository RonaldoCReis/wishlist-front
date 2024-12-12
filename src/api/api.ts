// import axios from 'axios';

// import { withInterceptors } from './interceptors';

// export const axiosInstance = axios.create({
//   baseURL: process.env.API_URL,
//   timeout: 30000,
// });

// export const api = withInterceptors(axiosInstance);

// type CreateApiProps = {
//   token: string;
//   baseURL: string;
// };

// export const createApi = ({ baseURL, token }: CreateApiProps) => {
//   const headers = {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${token}`,
//   };

//   return {
//     get: async <T>(path: string) => {
//       const response = await fetch(baseURL + path, {
//         method: 'GET',
//         headers,
//       });

//       return response.json() as Promise<T>;
//     },

//     post: async <T>(path: string, body: any) => {
//       const response = await fetch(baseURL + path, {
//         method: 'POST',
//         headers,
//         body: JSON.stringify(body),
//       });

//       return response.json() as Promise<T>;
//     },
//   };
// };

class Api {
  private baseURL: string;
  private token: string;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || '';
    this.token = '';
  }

  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    };
  }

  async get<T>(path: string) {
    const response = await fetch(this.baseURL + path, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return response.json() as Promise<T>;
  }

  async post<T>(path: string, body: any) {
    console.log(this.token);
    const response = await fetch(this.baseURL + path, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: this.getHeaders(),
    });

    return response.json() as Promise<T>;
  }

  async put<T>(path: string, body: any) {
    const response = await fetch(this.baseURL + path, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: this.getHeaders(),
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
      headers: this.getHeaders(),
    });

    return response.json() as Promise<T>;
  }

  setToken(token: string) {
    console.log('setting token', token);
    this.token = token;
  }
}
export const api = new Api(process.env.NEXT_PUBLIC_API_URL);
