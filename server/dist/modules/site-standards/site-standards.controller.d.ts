import { SiteStandardsService } from './site-standards.service';
export declare class SiteStandardsController {
    private readonly siteStandardsService;
    constructor(siteStandardsService: SiteStandardsService);
    create(dto: any, req: any): Promise<import("./entities/site-standard.entity").SiteStandard>;
    findAll(province?: string, city?: string, standardLevel?: string, status?: string, isActive?: string): Promise<import("./entities/site-standard.entity").SiteStandard[]>;
    findOne(id: string): Promise<import("./entities/site-standard.entity").SiteStandard>;
    update(id: string, dto: any): Promise<import("./entities/site-standard.entity").SiteStandard>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
    createRoom(siteId: string, dto: any): Promise<import("./entities/standard-room.entity").StandardRoom>;
    findRooms(siteId: string): Promise<import("./entities/standard-room.entity").StandardRoom[]>;
    findOneRoom(roomId: string): Promise<import("./entities/standard-room.entity").StandardRoom>;
    updateRoom(roomId: string, dto: any): Promise<import("./entities/standard-room.entity").StandardRoom>;
    removeRoom(roomId: string): Promise<{
        success: boolean;
    }>;
    createInspection(siteId: string, dto: any): Promise<import("./entities/site-inspection.entity").SiteInspection>;
    findInspections(siteId: string): Promise<import("./entities/site-inspection.entity").SiteInspection[]>;
    findOneInspection(inspectionId: string): Promise<import("./entities/site-inspection.entity").SiteInspection>;
    updateInspection(inspectionId: string, dto: any): Promise<import("./entities/site-inspection.entity").SiteInspection>;
    removeInspection(inspectionId: string): Promise<{
        success: boolean;
    }>;
    createFacility(siteId: string, dto: any): Promise<import("./entities/site-facility.entity").SiteFacility>;
    findFacilities(siteId: string, facilityType?: string, facilityStatus?: string): Promise<import("./entities/site-facility.entity").SiteFacility[]>;
    findOneFacility(facilityId: string): Promise<import("./entities/site-facility.entity").SiteFacility>;
    updateFacility(facilityId: string, dto: any): Promise<import("./entities/site-facility.entity").SiteFacility>;
    removeFacility(facilityId: string): Promise<{
        success: boolean;
    }>;
}
