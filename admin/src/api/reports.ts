import axios from './axios';

export interface Report {
  id: string;
  examId: string;
  reportType: string;
  periodStart: string;
  periodEnd: string;
  structuredData: any;
  aiContent: string;
  editedContent: string;
  status: string;
  createdAt: string;
}

export const generateReport = async (examId: string, reportType: string) => {
  const response = await axios.post<{ data: Report }>('/reports/generate', { examId, reportType });
  return response.data.data;
};

export const getReports = async (examId: string) => {
  const response = await axios.get<{ data: Report[] }>(`/reports/exam/${examId}`);
  return response.data.data;
};

export const getReport = async (id: string) => {
  const response = await axios.get<{ data: Report }>(`/reports/${id}`);
  return response.data.data;
};

export const generateAiSummary = async (id: string) => {
  const response = await axios.post<{ data: Report }>(`/reports/${id}/ai-summary`);
  return response.data.data;
};