export declare class StandardRoom {
    id: string;
    siteStandardId: string;
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
    status: string;
    isActive: boolean;
    remarks: string;
    createdAt: Date;
    updatedAt: Date;
}
