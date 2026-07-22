import axios from './axios';

export interface Site {
  id: string;
  examId: string;
  name: string;
  address: string;
  leaderId: string;
  roomCount: number;
  candidateCount: number;
  status: string;
  createdAt: string;
}

export const getSites = async (examId: string) => {
  const response = await axios.get<{ data: Site[] }>(`/sites/exam/${examId}`);
  return response.data.data;
};

export const createSite = async (examId: string, data: Omit<Site, 'id' | 'examId' | 'createdAt'>) => {
  const response = await axios.post<{ data: Site }>(`/sites/exam/${examId}`, data);
  return response.data.data;
};

export const updateSite = async (id: string, data: Partial<Site>) => {
  const response = await axios.put<{ data: Site }>(`/sites/${id}`, data);
  return response.data.data;
};

export const deleteSite = async (id: string) => {
  const response = await axios.delete(`/sites/${id}`);
  return response.data;
};