import { Repository } from 'typeorm';
import { SourceSchool } from './entities/source-school.entity';
import { SchoolServiceRecord } from './entities/school-service-record.entity';
export declare class SourceSchoolsService {
    private schoolRepository;
    private serviceRecordRepository;
    constructor(schoolRepository: Repository<SourceSchool>, serviceRecordRepository: Repository<SchoolServiceRecord>);
    create(dto: any, userId: string): Promise<SourceSchool>;
    findAll(filters: {
        province?: string;
        city?: string;
        schoolType?: string;
        serviceStatus?: string;
        isActive?: string;
    }): Promise<SourceSchool[]>;
    findOne(id: string): Promise<SourceSchool>;
    update(id: string, dto: any): Promise<SourceSchool>;
    remove(id: string): Promise<SourceSchool>;
    createServiceRecord(schoolId: string, dto: any, userId: string): Promise<SchoolServiceRecord>;
    findServiceRecords(schoolId: string): Promise<SchoolServiceRecord[]>;
    findOneServiceRecord(recordId: string): Promise<SchoolServiceRecord>;
    updateServiceRecord(recordId: string, dto: any): Promise<SchoolServiceRecord>;
    removeServiceRecord(recordId: string): Promise<SchoolServiceRecord>;
}
