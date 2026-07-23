import { SourceSchoolsService } from './source-schools.service';
export declare class SourceSchoolsController {
    private readonly schoolsService;
    constructor(schoolsService: SourceSchoolsService);
    create(dto: any, req: any): Promise<import("./entities/source-school.entity").SourceSchool>;
    findAll(province?: string, city?: string, schoolType?: string, serviceStatus?: string, isActive?: string): Promise<import("./entities/source-school.entity").SourceSchool[]>;
    findOne(id: string): Promise<import("./entities/source-school.entity").SourceSchool>;
    update(id: string, dto: any): Promise<import("./entities/source-school.entity").SourceSchool>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
    createServiceRecord(schoolId: string, dto: any, req: any): Promise<import("./entities/school-service-record.entity").SchoolServiceRecord>;
    findServiceRecords(schoolId: string): Promise<import("./entities/school-service-record.entity").SchoolServiceRecord[]>;
    findOneServiceRecord(recordId: string): Promise<import("./entities/school-service-record.entity").SchoolServiceRecord>;
    updateServiceRecord(recordId: string, dto: any): Promise<import("./entities/school-service-record.entity").SchoolServiceRecord>;
    removeServiceRecord(recordId: string): Promise<{
        success: boolean;
    }>;
}
