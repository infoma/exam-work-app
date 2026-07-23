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
exports.SiteStandardsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const site_standard_entity_1 = require("./entities/site-standard.entity");
const standard_room_entity_1 = require("./entities/standard-room.entity");
const site_inspection_entity_1 = require("./entities/site-inspection.entity");
const site_facility_entity_1 = require("./entities/site-facility.entity");
let SiteStandardsService = class SiteStandardsService {
    constructor(siteRepository, roomRepository, inspectionRepository, facilityRepository) {
        this.siteRepository = siteRepository;
        this.roomRepository = roomRepository;
        this.inspectionRepository = inspectionRepository;
        this.facilityRepository = facilityRepository;
    }
    async create(dto, userId) {
        const site = this.siteRepository.create({
            id: (0, uuid_1.v4)(),
            name: dto.name,
            code: dto.code,
            province: dto.province,
            city: dto.city,
            district: dto.district,
            address: dto.address,
            longitude: dto.longitude,
            latitude: dto.latitude,
            totalRooms: dto.totalRooms ?? 0,
            availableRooms: dto.availableRooms ?? 0,
            totalSeats: dto.totalSeats ?? 0,
            capacity: dto.capacity ?? 0,
            contactPerson: dto.contactPerson,
            contactPhone: dto.contactPhone,
            backupPhone: dto.backupPhone,
            standardLevel: dto.standardLevel ?? '未评级',
            facilityScore: dto.facilityScore ?? 0,
            managementScore: dto.managementScore ?? 0,
            securityScore: dto.securityScore ?? 0,
            overallScore: dto.overallScore ?? 0,
            hasMonitoring: dto.hasMonitoring ?? false,
            hasSignalDetector: dto.hasSignalDetector ?? false,
            hasIdentityChecker: dto.hasIdentityChecker ?? false,
            hasEmergencyPower: dto.hasEmergencyPower ?? false,
            hasMedicalRoom: dto.hasMedicalRoom ?? false,
            status: dto.status ?? '正常',
            isActive: dto.isActive ?? true,
            description: dto.description,
            remarks: dto.remarks,
            createdBy: userId,
        });
        return this.siteRepository.save(site);
    }
    async findAll(filters) {
        const query = this.siteRepository.createQueryBuilder('s')
            .where('s.deletedAt IS NULL');
        if (filters.province)
            query.andWhere('s.province = :province', { province: filters.province });
        if (filters.city)
            query.andWhere('s.city = :city', { city: filters.city });
        if (filters.standardLevel)
            query.andWhere('s.standardLevel = :standardLevel', { standardLevel: filters.standardLevel });
        if (filters.status)
            query.andWhere('s.status = :status', { status: filters.status });
        if (filters.isActive !== undefined)
            query.andWhere('s.isActive = :isActive', { isActive: filters.isActive === 'true' });
        return query.orderBy('s.createdAt', 'DESC').getMany();
    }
    async findOne(id) {
        const site = await this.siteRepository.findOne({ where: { id, deletedAt: null } });
        if (!site)
            throw new common_1.NotFoundException('考点不存在');
        return site;
    }
    async update(id, dto) {
        const site = await this.findOne(id);
        Object.assign(site, dto);
        return this.siteRepository.save(site);
    }
    async remove(id) {
        const site = await this.findOne(id);
        return this.siteRepository.softRemove(site);
    }
    async createRoom(siteId, dto) {
        await this.findOne(siteId);
        const room = this.roomRepository.create({
            id: (0, uuid_1.v4)(),
            siteStandardId: siteId,
            roomNumber: dto.roomNumber,
            roomName: dto.roomName,
            floor: dto.floor,
            building: dto.building,
            totalSeats: dto.totalSeats ?? 30,
            availableSeats: dto.availableSeats ?? 30,
            spareSeats: dto.spareSeats ?? 2,
            roomType: dto.roomType ?? '标准考场',
            hasProjector: dto.hasProjector ?? false,
            hasComputer: dto.hasComputer ?? false,
            hasAirConditioner: dto.hasAirConditioner ?? false,
            hasClock: dto.hasClock ?? true,
            cameraCount: dto.cameraCount ?? 0,
            signalDetectorCount: dto.signalDetectorCount ?? 0,
            remarks: dto.remarks,
        });
        const saved = await this.roomRepository.save(room);
        await this.siteRepository.update(siteId, {
            totalRooms: () => 'totalRooms + 1',
            totalSeats: () => `totalSeats + ${dto.totalSeats ?? 30}`,
        });
        return saved;
    }
    async findRooms(siteId) {
        await this.findOne(siteId);
        return this.roomRepository.find({
            where: { siteStandardId: siteId },
            order: { roomNumber: 'ASC' },
        });
    }
    async findOneRoom(roomId) {
        const room = await this.roomRepository.findOne({ where: { id: roomId } });
        if (!room)
            throw new common_1.NotFoundException('考场不存在');
        return room;
    }
    async updateRoom(roomId, dto) {
        const room = await this.findOneRoom(roomId);
        Object.assign(room, dto);
        return this.roomRepository.save(room);
    }
    async removeRoom(roomId) {
        const room = await this.findOneRoom(roomId);
        return this.roomRepository.remove(room);
    }
    async createInspection(siteId, dto) {
        await this.findOne(siteId);
        const inspection = this.inspectionRepository.create({
            id: (0, uuid_1.v4)(),
            siteStandardId: siteId,
            inspectionDate: dto.inspectionDate,
            inspectionType: dto.inspectionType,
            inspector: dto.inspector,
            facilityCheck: dto.facilityCheck,
            securityCheck: dto.securityCheck,
            environmentCheck: dto.environmentCheck,
            managementCheck: dto.managementCheck,
            facilityScore: dto.facilityScore ?? 0,
            securityScore: dto.securityScore ?? 0,
            environmentScore: dto.environmentScore ?? 0,
            managementScore: dto.managementScore ?? 0,
            overallScore: dto.overallScore ?? 0,
            issuesFound: dto.issuesFound,
            rectificationRequired: dto.rectificationRequired ?? false,
            rectificationDeadline: dto.rectificationDeadline,
            remarks: dto.remarks,
        });
        const saved = await this.inspectionRepository.save(inspection);
        if (dto.overallScore) {
            await this.siteRepository.update(siteId, {
                facilityScore: dto.facilityScore,
                managementScore: dto.managementScore,
                securityScore: dto.securityScore,
                overallScore: dto.overallScore,
            });
        }
        return saved;
    }
    async findInspections(siteId) {
        await this.findOne(siteId);
        return this.inspectionRepository.find({
            where: { siteStandardId: siteId },
            order: { inspectionDate: 'DESC' },
        });
    }
    async findOneInspection(inspectionId) {
        const inspection = await this.inspectionRepository.findOne({ where: { id: inspectionId } });
        if (!inspection)
            throw new common_1.NotFoundException('检查记录不存在');
        return inspection;
    }
    async updateInspection(inspectionId, dto) {
        const inspection = await this.findOneInspection(inspectionId);
        Object.assign(inspection, dto);
        return this.inspectionRepository.save(inspection);
    }
    async removeInspection(inspectionId) {
        const inspection = await this.findOneInspection(inspectionId);
        return this.inspectionRepository.remove(inspection);
    }
    async createFacility(siteId, dto) {
        await this.findOne(siteId);
        const facility = this.facilityRepository.create({
            id: (0, uuid_1.v4)(),
            siteStandardId: siteId,
            facilityType: dto.facilityType,
            facilityName: dto.facilityName,
            facilityModel: dto.facilityModel,
            facilityBrand: dto.facilityBrand,
            quantity: dto.quantity ?? 1,
            workingQuantity: dto.workingQuantity ?? 1,
            status: dto.status ?? '正常',
            purchaseDate: dto.purchaseDate,
            warrantyExpireDate: dto.warrantyExpireDate,
            supplier: dto.supplier,
            location: dto.location,
            remarks: dto.remarks,
        });
        return this.facilityRepository.save(facility);
    }
    async findFacilities(siteId, filters) {
        await this.findOne(siteId);
        const query = this.facilityRepository.createQueryBuilder('f')
            .where('f.siteStandardId = :siteId', { siteId });
        if (filters.facilityType)
            query.andWhere('f.facilityType = :facilityType', { facilityType: filters.facilityType });
        if (filters.status)
            query.andWhere('f.status = :status', { status: filters.status });
        return query.orderBy('f.createdAt', 'DESC').getMany();
    }
    async findOneFacility(facilityId) {
        const facility = await this.facilityRepository.findOne({ where: { id: facilityId } });
        if (!facility)
            throw new common_1.NotFoundException('设施设备不存在');
        return facility;
    }
    async updateFacility(facilityId, dto) {
        const facility = await this.findOneFacility(facilityId);
        Object.assign(facility, dto);
        return this.facilityRepository.save(facility);
    }
    async removeFacility(facilityId) {
        const facility = await this.findOneFacility(facilityId);
        return this.facilityRepository.remove(facility);
    }
};
exports.SiteStandardsService = SiteStandardsService;
exports.SiteStandardsService = SiteStandardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(site_standard_entity_1.SiteStandard)),
    __param(1, (0, typeorm_1.InjectRepository)(standard_room_entity_1.StandardRoom)),
    __param(2, (0, typeorm_1.InjectRepository)(site_inspection_entity_1.SiteInspection)),
    __param(3, (0, typeorm_1.InjectRepository)(site_facility_entity_1.SiteFacility)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SiteStandardsService);
//# sourceMappingURL=site-standards.service.js.map