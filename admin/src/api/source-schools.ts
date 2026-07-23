import axios from './axios';

export interface SourceSchool {
  id: string;
  name: string;
  code: string;
  schoolType?: string;
  province?: string;
  city?: string;
  district?: string;
  address?: string;
  contactPerson?: string;
  contactPhone?: string;
  email?: string;
  studentCount: number;
  teacherCount: number;
  isActive: boolean;
  capacity: number;
  facilitiesScore: number;
  serviceLevel: string;
  serviceStatus: string;
  serviceCount: number;
  lastServiceDate?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SchoolServiceRecord {
  id: string;
  schoolId: string;
  serviceType?: string;
  serviceDate: string;
  serviceContent?: string;
  serviceCount: number;
  satisfactionLevel?: string;
  feedback?: string;
  operatorName?: string;
  remarks?: string;
  createdAt: string;
}

export interface SourceSchoolFilters {
  province?: string;
  city?: string;
  schoolType?: string;
  serviceStatus?: string;
  isActive?: boolean;
}

export const getSourceSchools = async (filters?: SourceSchoolFilters) => {
  const response = await axios.get<{ data: SourceSchool[] }>('/source-schools', { params: filters });
  return response.data.data;
};

export const getSourceSchool = async (id: string) => {
  const response = await axios.get<{ data: SourceSchool }>(`/source-schools/${id}`);
  return response.data.data;
};

export const createSourceSchool = async (data: Omit<SourceSchool, 'id' | 'createdAt' | 'updatedAt' | 'serviceCount'>) => {
  const response = await axios.post<{ data: SourceSchool }>('/source-schools', data);
  return response.data.data;
};

export const updateSourceSchool = async (id: string, data: Partial<SourceSchool>) => {
  const response = await axios.put<{ data: SourceSchool }>(`/source-schools/${id}`, data);
  return response.data.data;
};

export const deleteSourceSchool = async (id: string) => {
  await axios.delete(`/source-schools/${id}`);
};

export const getServiceRecords = async (schoolId: string) => {
  const response = await axios.get<{ data: SchoolServiceRecord[] }>(`/source-schools/${schoolId}/service-records`);
  return response.data.data;
};

export const createServiceRecord = async (schoolId: string, data: Omit<SchoolServiceRecord, 'id' | 'schoolId' | 'createdAt'>) => {
  const response = await axios.post<{ data: SchoolServiceRecord }>(`/source-schools/${schoolId}/service-records`, data);
  return response.data.data;
};

export const deleteServiceRecord = async (recordId: string) => {
  await axios.delete(`/source-schools/service-records/${recordId}`);
};
