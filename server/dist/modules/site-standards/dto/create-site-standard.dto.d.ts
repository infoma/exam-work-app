export declare class CreateSiteStandardDto {
    name: string;
    code: string;
    province: string;
    city: string;
    district: string;
    address: string;
    totalRooms: number;
    availableRooms: number;
    totalSeats: number;
    capacity: number;
    contactPerson: string;
    contactPhone: string;
    backupPhone: string;
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
    description: string;
    remarks: string;
}
export declare class CreateStandardRoomDto {
    roomNumber: string;
    roomName: string;
    floor: number;
    building: string;
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
    remarks: string;
}
export declare class CreateInspectionDto {
    inspectionDate: string;
    inspectionType: string;
    inspector: string;
    facilityCheck: string;
    securityCheck: string;
    environmentCheck: string;
    managementCheck: string;
    facilityScore: number;
    securityScore: number;
    environmentScore: number;
    managementScore: number;
    overallScore: number;
    issuesFound: string;
    rectificationRequired: boolean;
    rectificationDeadline: string;
    remarks: string;
}
export declare class CreateFacilityDto {
    facilityType: string;
    facilityName: string;
    facilityModel: string;
    facilityBrand: string;
    quantity: number;
    workingQuantity: number;
    status: string;
    purchaseDate: string;
    warrantyExpireDate: string;
    supplier: string;
    location: string;
    remarks: string;
}
