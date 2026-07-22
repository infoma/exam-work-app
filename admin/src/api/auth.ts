import axios from './axios';

export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    username: string;
    realName: string;
    phone: string;
  };
}

export const login = async (username: string, password: string) => {
  const response = await axios.post<{ data: LoginResponse }>('/auth/login', { username, password });
  return response.data.data;
};

export const getCurrentUser = async () => {
  const response = await axios.get<{ data: any }>('/auth/me');
  return response.data.data;
};