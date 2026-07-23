import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsNumber, IsDateString } from 'class-validator';

export class CreateSiteStandardDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  province: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  district: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  totalRooms: number;

  @IsOptional()
  availableRooms: number;

  @IsOptional()
  totalSeats: number;

  @IsOptional()
  capacity: number;

  @IsOptional()
  @IsString()
  contactPerson: string;

  @IsOptional()
  @IsString()
  contactPhone: string;

  @IsOptional()
  @IsString()
  backupPhone: string;

  @IsOptional()
  @IsString()
  standardLevel: string;

  @IsOptional()
  facilityScore: number;

  @IsOptional()
  managementScore: number;

  @IsOptional()
  securityScore: number;

  @IsOptional()
  overallScore: number;

  @IsOptional()
  hasMonitoring: boolean;

  @IsOptional()
  hasSignalDetector: boolean;

  @IsOptional()
  hasIdentityChecker: boolean;

  @IsOptional()
  hasEmergencyPower: boolean;

  @IsOptional()
  hasMedicalRoom: boolean;

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  isActive: boolean;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  remarks: string;
}

export class CreateStandardRoomDto {
  @IsNotEmpty()
  @IsString()
  roomNumber: string;

  @IsOptional()
  @IsString()
  roomName: string;

  @IsOptional()
  floor: number;

  @IsOptional()
  @IsString()
  building: string;

  @IsOptional()
  totalSeats: number;

  @IsOptional()
  availableSeats: number;

  @IsOptional()
  spareSeats: number;

  @IsOptional()
  @IsString()
  roomType: string;

  @IsOptional()
  hasProjector: boolean;

  @IsOptional()
  hasComputer: boolean;

  @IsOptional()
  hasAirConditioner: boolean;

  @IsOptional()
  hasClock: boolean;

  @IsOptional()
  cameraCount: number;

  @IsOptional()
  signalDetectorCount: number;

  @IsOptional()
  @IsString()
  remarks: string;
}

export class CreateInspectionDto {
  @IsNotEmpty()
  @IsDateString()
  inspectionDate: string;

  @IsOptional()
  @IsString()
  inspectionType: string;

  @IsOptional()
  @IsString()
  inspector: string;

  @IsOptional()
  @IsString()
  facilityCheck: string;

  @IsOptional()
  @IsString()
  securityCheck: string;

  @IsOptional()
  @IsString()
  environmentCheck: string;

  @IsOptional()
  @IsString()
  managementCheck: string;

  @IsOptional()
  facilityScore: number;

  @IsOptional()
  securityScore: number;

  @IsOptional()
  environmentScore: number;

  @IsOptional()
  managementScore: number;

  @IsOptional()
  overallScore: number;

  @IsOptional()
  @IsString()
  issuesFound: string;

  @IsOptional()
  rectificationRequired: boolean;

  @IsOptional()
  @IsDateString()
  rectificationDeadline: string;

  @IsOptional()
  @IsString()
  remarks: string;
}

export class CreateFacilityDto {
  @IsNotEmpty()
  @IsString()
  facilityType: string;

  @IsOptional()
  @IsString()
  facilityName: string;

  @IsOptional()
  @IsString()
  facilityModel: string;

  @IsOptional()
  @IsString()
  facilityBrand: string;

  @IsOptional()
  quantity: number;

  @IsOptional()
  workingQuantity: number;

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsDateString()
  purchaseDate: string;

  @IsOptional()
  @IsDateString()
  warrantyExpireDate: string;

  @IsOptional()
  @IsString()
  supplier: string;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  remarks: string;
}
