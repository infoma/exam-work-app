import axios from './axios';

export interface Staff {
  id: string;
  employeeId: string;
  name: string;
  gender?: string;
  idCard?: string;
  birthday?: string;
  phone?: string;
  email?: string;
  address?: string;
  department?: string;
  position?: string;
  role?: string;
  workYears: number;
  entryDate?: string;
  status: string;
  education?: string;
  major?: string;
  trainingStatus: string;
  trainingDate?: string;
  examExperience: number;
  lastExamDate?: string;
  isQualified: boolean;
  remarks?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StaffTraining {
  id: string;
  staffId: string;
  trainingName: string;
  trainingType?: string;
  trainingDate: string;
  trainingHours: number;
  trainingLocation?: string;
  trainingContent?: string;
  isPassed: boolean;
  score?: number;
  certificateNo?: string;
  trainer?: string;
  remarks?: string;
  createdAt: string;
}

export interface StaffAssignment {
  id: string;
  staffId: string;
  examSiteId: string;
  assignmentType?: string;
  assignmentDate: string;
  examName?: string;
  examDate?: string;
  roomNumber?: string;
  workPeriod?: string;
  workRole?: string;
  status: string;
  remarks?: string;
  createdAt: string;
}

export interface StaffFilters {
  department?: string;
  status?: string;
  role?: string;
  isQualified?: boolean;
}

export const getStaffs = async (filters?: StaffFilters) => {
  const response = await axios.get<{ data: Staff[] }>('/staffs', { params: filters });
  return response.data.data;
};

export const getStaff = async (id: string) => {
  const response = await axios.get<{ data: Staff }>(`/staffs/${id}`);
  return response.data.data;
};

export const createStaff = async (data: Omit<Staff, 'id' | 'createdAt' | 'updatedAt' | 'trainingStatus' | 'examExperience'>) => {
  const response = await axios.post<{ data: Staff }>('/staffs', data);
  return response.data.data;
};

export const updateStaff = async (id: string, data: Partial<Staff>) => {
  const response = await axios.put<{ data: Staff }>(`/staffs/${id}`, data);
  return response.data.data;
};

export const deleteStaff = async (id: string) => {
  await axios.delete(`/staffs/${id}`);
};

export const getStaffTrainings = async (staffId: string) => {
  const response = await axios.get<{ data: StaffTraining[] }>(`/staffs/${staffId}/trainings`);
  return response.data.data;
};

export const createStaffTraining = async (staffId: string, data: Omit<StaffTraining, 'id' | 'staffId' | 'createdAt'>) => {
  const response = await axios.post<{ data: StaffTraining }>(`/staffs/${staffId}/trainings`, data);
  return response.data.data;
};

export const getStaffAssignments = async (staffId: string) => {
  const response = await axios.get<{ data: StaffAssignment[] }>(`/staffs/${staffId}/assignments`);
  return response.data.data;
};

export const createStaffAssignment = async (staffId: string, data: Omit<StaffAssignment, 'id' | 'staffId' | 'status' | 'createdAt'>) => {
  const response = await axios.post<{ data: StaffAssignment }>(`/staffs/${staffId}/assignments`, data);
  return response.data.data;
};
