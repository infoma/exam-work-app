import axios from './axios';

export interface Task {
  id: string;
  examId: string;
  siteId: string;
  title: string;
  stage: string;
  ownerId: string;
  dueTime: string;
  status: string;
  priority: string;
  requirement: string;
  createdAt: string;
}

export const getTasks = async (examId?: string) => {
  if (examId) {
    const response = await axios.get<{ data: Task[] }>(`/tasks/exam/${examId}`);
    return response.data.data;
  }
  const response = await axios.get<{ data: Task[] }>('/tasks/mine');
  return response.data.data;
};

export const createTask = async (examId: string, data: Omit<Task, 'id' | 'examId' | 'createdAt'>) => {
  const response = await axios.post<{ data: Task }>(`/tasks/exam/${examId}`, data);
  return response.data.data;
};

export const updateTaskStatus = async (id: string, status: string) => {
  const response = await axios.patch<{ data: Task }>(`/tasks/${id}/status`, { status });
  return response.data.data;
};