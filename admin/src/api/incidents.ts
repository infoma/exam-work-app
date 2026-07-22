import axios from './axios';

export interface Incident {
  id: string;
  examId: string;
  siteId: string;
  type: string;
  level: string;
  title: string;
  description: string;
  status: string;
  ownerId: string;
  createdAt: string;
}

export const getIncidents = async (examId?: string) => {
  if (examId) {
    const response = await axios.get<{ data: Incident[] }>(`/incidents/exam/${examId}`);
    return response.data.data;
  }
  const response = await axios.get<{ data: Incident[] }>('/incidents/mine');
  return response.data.data;
};

export const createIncident = async (data: Omit<Incident, 'id' | 'createdAt'>) => {
  const response = await axios.post<{ data: Incident }>('/incidents', data);
  return response.data.data;
};

export const closeIncident = async (id: string) => {
  const response = await axios.patch<{ data: any }>(`/incidents/${id}/close`);
  return response.data.data;
};