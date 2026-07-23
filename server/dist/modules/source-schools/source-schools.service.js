"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceSchoolsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const source_school_entity_1 = require("./entities/source-school.entity");
const school_service_record_entity_1 = require("./entities/school-service-record.entity");
let SourceSchoolsService = class SourceSchoolsService {
    constructor(schoolRepository, serviceRecordRepository) {
        this.schoolRepository = schoolRepository;
        this.serviceRecordRepository = serviceRecordRepository;
    }
    async create(dto, userId) {
        const school = this.schoolRepository.create({
            id: (0, uuid_1.v4)(),
            name: dto.name,
            code: dto.code,
            schoolType: dto.schoolType,
            province: dto.province,
            city: dto.city,
            district: dto.district,
            address: dto.address,
            contactPerson: dto.contactPerson,
            contactPhone: dto.contactPhone,
            email: dto.email,
            studentCount: dto.studentCount ?? 0,
            teacherCount: dto.teacherCount ?? 0,
            isActive: dto.isActive ?? true,
            capacity: dto.capacity ?? 0,
            facilitiesScore: dto.facilitiesScore ?? 0,
            serviceLevel: dto.serviceLevel ?? '标准',
            serviceStatus: dto.serviceStatus ?? '正常',
            description: dto.description,
            createdBy: userId,
        });
        return this.schoolRepository.save(school);
    }
    async findAll(filters) {
        const query = this.schoolRepository.createQueryBuilder('s')
            .where('s.deletedAt IS NULL');
        if (filters.province)
            query.andWhere('s.province = :province', { province: filters.province });
        if (filters.city)
            query.andWhere('s.city = :city', { city: filters.city });
        if (filters.schoolType)
            query.andWhere('s.schoolType = :schoolType', { schoolType: filters.schoolType });
        if (filters.serviceStatus)
            query.andWhere('s.serviceStatus = :serviceStatus', { serviceStatus: filters.serviceStatus });
        if (filters.isActive !== undefined)
            query.andWhere('s.isActive = :isActive', { isActive: filters.isActive === 'true' });
        return query.orderBy('s.createdAt', 'DESC').getMany();
    }
    async findOne(id) {
        const school = await this.schoolRepository.findOne({ where: { id, deletedAt: null } });
        if (!school)
            throw new common_1.NotFoundException('生源学校不存在');
        return school;
    }
    async update(id, dto) {
        const school = await this.findOne(id);
        Object.assign(school, dto);
        return this.schoolRepository.save(school);
    }
    async remove(id) {
        const school = await this.findOne(id);
        return this.schoolRepository.softRemove(school);
    }
    async createServiceRecord(schoolId, dto, userId) {
        await this.findOne(schoolId);
        const record = this.serviceRecordRepository.create({
            id: (0, uuid_1.v4)(),
            schoolId,
            serviceType: dto.serviceType,
            serviceDate: dto.serviceDate,
            serviceContent: dto.serviceContent,
            serviceCount: dto.serviceCount ?? 1,
            satisfactionLevel: dto.satisfactionLevel,
            feedback: dto.feedback,
            operatorId: userId,
            operatorName: dto.operatorName,
            remarks: dto.remarks,
        });
        const saved = await this.serviceRecordRepository.save(record);
        await this.schoolRepository.update(schoolId, {
            serviceCount: () => 'serviceCount + 1',
            lastServiceDate: dto.serviceDate,
        });
        return saved;
    }
    async findServiceRecords(schoolId) {
        await this.findOne(schoolId);
        return this.serviceRecordRepository.find({
            where: { schoolId },
            order: { serviceDate: 'DESC' },
        });
    }
    async findOneServiceRecord(recordId) {
        const record = await this.serviceRecordRepository.findOne({ where: { id: recordId } });
        if (!record)
            throw new common_1.NotFoundException('服务记录不存在');
        return record;
    }
    async updateServiceRecord(recordId, dto) {
        const record = await this.findOneServiceRecord(recordId);
        Object.assign(record, dto);
        return this.serviceRecordRepository.save(record);
    }
    async removeServiceRecord(recordId) {
        const record = await this.findOneServiceRecord(recordId);
        return this.serviceRecordRepository.remove(record);
    }
};
exports.SourceSchoolsService = SourceSchoolsService;
exports.SourceSchoolsService = SourceSchoolsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(source_school_entity_1.SourceSchool)),
    __param(1, (0, typeorm_1.InjectRepository)(school_service_record_entity_1.SchoolServiceRecord)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SourceSchoolsService);
//# sourceMappingURL=source-schools.service.js.map