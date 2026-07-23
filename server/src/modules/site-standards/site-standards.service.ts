import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { SiteStandard } from './entities/site-standard.entity';
import { StandardRoom } from './entities/standard-room.entity';
import { SiteInspection } from './entities/site-inspection.entity';
import { SiteFacility } from './entities/site-facility.entity';

@Injectable()
export class SiteStandardsService {
  constructor(
    @InjectRepository(SiteStandard)
    private siteRepository: Repository<SiteStandard>,
    @InjectRepository(StandardRoom)
    private roomRepository: Repository<StandardRoom>,
    @InjectRepository(SiteInspection)
    private inspectionRepository: Repository<SiteInspection>,
    @InjectRepository(SiteFacility)
    private facilityRepository: Repository<SiteFacility>,
  ) {}

  // ==================== 考点标准化 CRUD ====================

  async create(dto: any, userId: string) {
    const site = this.siteRepository.create({
      id: uuidv4(),
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

  async findAll(filters: { province?: string; city?: string; standardLevel?: string; status?: string; isActive?: string }) {
    const query = this.siteRepository.createQueryBuilder('s')
      .where('s.deletedAt IS NULL');

    if (filters.province) query.andWhere('s.province = :province', { province: filters.province });
    if (filters.city) query.andWhere('s.city = :city', { city: filters.city });
    if (filters.standardLevel) query.andWhere('s.standardLevel = :standardLevel', { standardLevel: filters.standardLevel });
    if (filters.status) query.andWhere('s.status = :status', { status: filters.status });
    if (filters.isActive !== undefined) query.andWhere('s.isActive = :isActive', { isActive: filters.isActive === 'true' });

    return query.orderBy('s.createdAt', 'DESC').getMany();
  }

  async findOne(id: string) {
    const site = await this.siteRepository.findOne({ where: { id, deletedAt: null as any } });
    if (!site) throw new NotFoundException('考点不存在');
    return site;
  }

  async update(id: string, dto: any) {
    const site = await this.findOne(id);
    Object.assign(site, dto);
    return this.siteRepository.save(site);
  }

  async remove(id: string) {
    const site = await this.findOne(id);
    return this.siteRepository.softRemove(site);
  }

  // ==================== 考场管理 ====================

  async createRoom(siteId: string, dto: any) {
    await this.findOne(siteId);
    const room = this.roomRepository.create({
      id: uuidv4(),
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

    // 更新考点统计
    await this.siteRepository.update(siteId, {
      totalRooms: () => 'totalRooms + 1',
      totalSeats: () => `totalSeats + ${dto.totalSeats ?? 30}`,
    });

    return saved;
  }

  async findRooms(siteId: string) {
    await this.findOne(siteId);
    return this.roomRepository.find({
      where: { siteStandardId: siteId },
      order: { roomNumber: 'ASC' },
    });
  }

  async findOneRoom(roomId: string) {
    const room = await this.roomRepository.findOne({ where: { id: roomId } });
    if (!room) throw new NotFoundException('考场不存在');
    return room;
  }

  async updateRoom(roomId: string, dto: any) {
    const room = await this.findOneRoom(roomId);
    Object.assign(room, dto);
    return this.roomRepository.save(room);
  }

  async removeRoom(roomId: string) {
    const room = await this.findOneRoom(roomId);
    return this.roomRepository.remove(room);
  }

  // ==================== 检查记录 ====================

  async createInspection(siteId: string, dto: any) {
    await this.findOne(siteId);
    const inspection = this.inspectionRepository.create({
      id: uuidv4(),
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

    // 更新考点评分
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

  async findInspections(siteId: string) {
    await this.findOne(siteId);
    return this.inspectionRepository.find({
      where: { siteStandardId: siteId },
      order: { inspectionDate: 'DESC' },
    });
  }

  async findOneInspection(inspectionId: string) {
    const inspection = await this.inspectionRepository.findOne({ where: { id: inspectionId } });
    if (!inspection) throw new NotFoundException('检查记录不存在');
    return inspection;
  }

  async updateInspection(inspectionId: string, dto: any) {
    const inspection = await this.findOneInspection(inspectionId);
    Object.assign(inspection, dto);
    return this.inspectionRepository.save(inspection);
  }

  async removeInspection(inspectionId: string) {
    const inspection = await this.findOneInspection(inspectionId);
    return this.inspectionRepository.remove(inspection);
  }

  // ==================== 设施设备 ====================

  async createFacility(siteId: string, dto: any) {
    await this.findOne(siteId);
    const facility = this.facilityRepository.create({
      id: uuidv4(),
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

  async findFacilities(siteId: string, filters: { facilityType?: string; status?: string }) {
    await this.findOne(siteId);
    const query = this.facilityRepository.createQueryBuilder('f')
      .where('f.siteStandardId = :siteId', { siteId });

    if (filters.facilityType) query.andWhere('f.facilityType = :facilityType', { facilityType: filters.facilityType });
    if (filters.status) query.andWhere('f.status = :status', { status: filters.status });

    return query.orderBy('f.createdAt', 'DESC').getMany();
  }

  async findOneFacility(facilityId: string) {
    const facility = await this.facilityRepository.findOne({ where: { id: facilityId } });
    if (!facility) throw new NotFoundException('设施设备不存在');
    return facility;
  }

  async updateFacility(facilityId: string, dto: any) {
    const facility = await this.findOneFacility(facilityId);
    Object.assign(facility, dto);
    return this.facilityRepository.save(facility);
  }

  async removeFacility(facilityId: string) {
    const facility = await this.findOneFacility(facilityId);
    return this.facilityRepository.remove(facility);
  }
}
