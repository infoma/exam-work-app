import axios from './axios';

export interface Exam {
  id: string;
  name: string;
  type: string;
  startTime: string;
  endTime: string;
  status: string;
  globalRequirement: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export const getExams = async () => {
  const response = await axios.get<{ data: Exam[] }>('/exams');
  return response.data.data;
};

export const getExam = async (id: string) => {
  const response = await axios.get<{ data: Exam }>(`/exams/${id}`);
  return response.data.data;
};

export const createExam = async (data: Omit<Exam, 'id' | 'createdAt' | 'updatedAt'>) => {
  const response = await axios.post<{ data: Exam }>('/exams', data);
  return response.data.data;
};

export const updateExam = async (id: string, data: Partial<Exam>) => {
  const response = await axios.put<{ data: Exam }>(`/exams/${id}`, data);
  return response.data.data;
};

export const deleteExam = async (id: string) => {
  const response = await axios.delete(`/exams/${id}`);
  return response.data;
};