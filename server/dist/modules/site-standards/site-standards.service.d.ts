import { Repository } from 'typeorm';
import { SiteStandard } from './entities/site-standard.entity';
import { StandardRoom } from './entities/standard-room.entity';
import { SiteInspection } from './entities/site-inspection.entity';
import { SiteFacility } from './entities/site-facility.entity';
export declare class SiteStandardsService {
    private siteRepository;
    private roomRepository;
    private inspectionRepository;
    private facilityRepository;
    constructor(siteRepository: Repository<SiteStandard>, roomRepository: Repository<StandardRoom>, inspectionRepository: Repository<SiteInspection>, facilityRepository: Repository<SiteFacility>);
    create(dto: any, userId: string): Promise<SiteStandard>;
    findAll(filters: {
        province?: string;
        city?: string;
        standardLevel?: string;
        status?: string;
        isActive?: string;
    }): Promise<SiteStandard[]>;
    findOne(id: string): Promise<SiteStandard>;
    update(id: string, dto: any): Promise<SiteStandard>;
    remove(id: string): Promise<SiteStandard>;
    createRoom(siteId: string, dto: any): Promise<StandardRoom>;
    findRooms(siteId: string): Promise<StandardRoom[]>;
    findOneRoom(roomId: string): Promise<StandardRoom>;
    updateRoom(roomId: string, dto: any): Promise<StandardRoom>;
    removeRoom(roomId: string): Promise<StandardRoom>;
    createInspection(siteId: string, dto: any): Promise<SiteInspection>;
    findInspections(siteId: string): Promise<SiteInspection[]>;
    findOneInspection(inspectionId: string): Promise<SiteInspection>;
    updateInspection(inspectionId: string, dto: any): Promise<SiteInspection>;
    removeInspection(inspectionId: string): Promise<SiteInspection>;
    createFacility(siteId: string, dto: any): Promise<SiteFacility>;
    findFacilities(siteId: string, filters: {
        facilityType?: string;
        status?: string;
    }): Promise<SiteFacility[]>;
    findOneFacility(facilityId: string): Promise<SiteFacility>;
    updateFacility(facilityId: string, dto: any): Promise<SiteFacility>;
    removeFacility(facilityId: string): Promise<SiteFacility>;
}
