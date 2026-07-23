import axios from './axios';

export interface SiteStandard {
  id: string;
  name: string;
  code: string;
  province?: string;
  city?: string;
  district?: string;
  address?: string;
  totalRooms: number;
  availableRooms: number;
  totalSeats: number;
  capacity: number;
  contactPerson?: string;
  contactPhone?: string;
  backupPhone?: string;
  standardLevel: string;
  facilityScore: number;
  managementScore: number;
  securityScore: number;
  overallScore: number;
  hasMonitoring: boolean;
  hasSignalDetector: boolean;
  hasIdentityChecker: boolean;
  hasEmergencyPower: boolean;
  hasMedicalRoom: boolean;
  status: string;
  isActive: boolean;
  examCount: number;
  lastExamDate?: string;
  description?: string;
  remarks?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StandardRoom {
  id: string;
  siteStandardId: string;
  roomNumber: string;
  roomName?: string;
  floor?: number;
  building?: string;
  totalSeats: number;
  availableSeats: number;
  spareSeats: number;
  roomType: string;
  hasProjector: boolean;
  hasComputer: boolean;
  hasAirConditioner: boolean;
  hasClock: boolean;
  cameraCount: number;
  signalDetectorCount: number;
  status: string;
  remarks?: string;
  createdAt: string;
}

export interface SiteInspection {
  id: string;
  siteStandardId: string;
  inspectionDate: string;
  inspectionType?: string;
  inspector?: string;
  facilityCheck?: string;
  securityCheck?: string;
  environmentCheck?: string;
  managementCheck?: string;
  facilityScore: number;
  securityScore: number;
  environmentScore: number;
  managementScore: number;
  overallScore: number;
  issuesFound?: string;
  rectificationRequired: boolean;
  rectificationDeadline?: string;
  rectificationStatus?: string;
  remarks?: string;
  createdAt: string;
}

export interface SiteFacility {
  id: string;
  siteStandardId: string;
  facilityType: string;
  facilityName?: string;
  facilityModel?: string;
  facilityBrand?: string;
  quantity: number;
  workingQuantity: number;
  status: string;
  purchaseDate?: string;
  warrantyExpireDate?: string;
  supplier?: string;
  location?: string;
  remarks?: string;
  createdAt: string;
}

export interface SiteStandardFilters {
  province?: string;
  city?: string;
  standardLevel?: string;
  status?: string;
  isActive?: boolean;
}

export const getSiteStandards = async (filters?: SiteStandardFilters) => {
  const response = await axios.get<{ data: SiteStandard[] }>('/site-standards', { params: filters });
  return response.data.data;
};

export const getSiteStandard = async (id: string) => {
  const response = await axios.get<{ data: SiteStandard }>(`/site-standards/${id}`);
  return response.data.data;
};

export const createSiteStandard = async (data: Omit<SiteStandard, 'id' | 'createdAt' | 'updatedAt' | 'examCount'>) => {
  const response = await axios.post<{ data: SiteStandard }>('/site-standards', data);
  return response.data.data;
};

export const updateSiteStandard = async (id: string, data: Partial<SiteStandard>) => {
  const response = await axios.put<{ data: SiteStandard }>(`/site-standards/${id}`, data);
  return response.data.data;
};

export const deleteSiteStandard = async (id: string) => {
  await axios.delete(`/site-standards/${id}`);
};

export const getStandardRooms = async (siteId: string) => {
  const response = await axios.get<{ data: StandardRoom[] }>(`/site-standards/${siteId}/rooms`);
  return response.data.data;
};

export const createStandardRoom = async (siteId: string, data: Omit<StandardRoom, 'id' | 'siteStandardId' | 'createdAt'>) => {
  const response = await axios.post<{ data: StandardRoom }>(`/site-standards/${siteId}/rooms`, data);
  return response.data.data;
};

export const getSiteInspections = async (siteId: string) => {
  const response = await axios.get<{ data: SiteInspection[] }>(`/site-standards/${siteId}/inspections`);
  return response.data.data;
};

export const createSiteInspection = async (siteId: string, data: Omit<SiteInspection, 'id' | 'siteStandardId' | 'createdAt'>) => {
  const response = await axios.post<{ data: SiteInspection }>(`/site-standards/${siteId}/inspections`, data);
  return response.data.data;
};

export const getSiteFacilities = async (siteId: string) => {
  const response = await axios.get<{ data: SiteFacility[] }>(`/site-standards/${siteId}/facilities`);
  return response.data.data;
};

export const createSiteFacility = async (siteId: string, data: Omit<SiteFacility, 'id' | 'siteStandardId' | 'createdAt'>) => {
  const response = await axios.post<{ data: SiteFacility }>(`/site-standards/${siteId}/facilities`, data);
  return response.data.data;
};
