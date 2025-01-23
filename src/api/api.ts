import { filterObjectUndefinedValues } from '@/utils/filterObjectUndefinedValues';

type Options = {
  isFormData?: boolean;
};
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

  async get<T>(path: string, params?: {}) {
    const filteredParams = filterObjectUndefinedValues(params);

    const response = await fetch(
      filteredParams
        ? `
      ${this.baseURL}${path}?${new URLSearchParams(filteredParams).toString()}`
        : `${this.baseURL}${path}`,
      {
        method: 'GET',
        headers: this.getHeadersJson(),
      }
    );

    return response.json() as Promise<T>;
  }

  async post<T>(path: string, body: any, options?: Options) {
    const response = await fetch(this.baseURL + path, {
      method: 'POST',
      body: options?.isFormData ? body : JSON.stringify(body),
      headers: options?.isFormData ? this.getHeaders() : this.getHeadersJson(),
    });

    return response.json() as Promise<T>;
  }

  async put<T>(path: string, body: any, options?: Options) {
    const response = await fetch(this.baseURL + path, {
      method: 'PUT',
      body: options?.isFormData ? body : JSON.stringify(body),
      headers: options?.isFormData ? this.getHeaders() : this.getHeadersJson(),
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

  async patch<T>(path: string, body: any, options?: Options) {
    const response = await fetch(this.baseURL + path, {
      method: 'PATCH',
      body: options?.isFormData ? body : JSON.stringify(body),
      headers: options?.isFormData ? this.getHeaders() : this.getHeadersJson(),
    });

    return response.json() as Promise<T>;
  }

  setToken(token: string) {
    this.token = token;
  }
}
export const api = new Api(process.env.NEXT_PUBLIC_API_URL);
