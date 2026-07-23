import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { SourceSchool } from './entities/source-school.entity';
import { SchoolServiceRecord } from './entities/school-service-record.entity';

@Injectable()
export class SourceSchoolsService {
  constructor(
    @InjectRepository(SourceSchool)
    private schoolRepository: Repository<SourceSchool>,
    @InjectRepository(SchoolServiceRecord)
    private serviceRecordRepository: Repository<SchoolServiceRecord>,
  ) {}

  // ==================== 生源学校 CRUD ====================

  async create(dto: any, userId: string) {
    const school = this.schoolRepository.create({
      id: uuidv4(),
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

  async findAll(filters: { province?: string; city?: string; schoolType?: string; serviceStatus?: string; isActive?: string }) {
    const query = this.schoolRepository.createQueryBuilder('s')
      .where('s.deletedAt IS NULL');

    if (filters.province) query.andWhere('s.province = :province', { province: filters.province });
    if (filters.city) query.andWhere('s.city = :city', { city: filters.city });
    if (filters.schoolType) query.andWhere('s.schoolType = :schoolType', { schoolType: filters.schoolType });
    if (filters.serviceStatus) query.andWhere('s.serviceStatus = :serviceStatus', { serviceStatus: filters.serviceStatus });
    if (filters.isActive !== undefined) query.andWhere('s.isActive = :isActive', { isActive: filters.isActive === 'true' });

    return query.orderBy('s.createdAt', 'DESC').getMany();
  }

  async findOne(id: string) {
    const school = await this.schoolRepository.findOne({ where: { id, deletedAt: null as any } });
    if (!school) throw new NotFoundException('生源学校不存在');
    return school;
  }

  async update(id: string, dto: any) {
    const school = await this.findOne(id);
    Object.assign(school, dto);
    return this.schoolRepository.save(school);
  }

  async remove(id: string) {
    const school = await this.findOne(id);
    return this.schoolRepository.softRemove(school);
  }

  // ==================== 服务记录 ====================

  async createServiceRecord(schoolId: string, dto: any, userId: string) {
    await this.findOne(schoolId);
    const record = this.serviceRecordRepository.create({
      id: uuidv4(),
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

    // 更新学校服务统计
    await this.schoolRepository.update(schoolId, {
      serviceCount: () => 'serviceCount + 1',
      lastServiceDate: dto.serviceDate,
    });

    return saved;
  }

  async findServiceRecords(schoolId: string) {
    await this.findOne(schoolId);
    return this.serviceRecordRepository.find({
      where: { schoolId },
      order: { serviceDate: 'DESC' },
    });
  }

  async findOneServiceRecord(recordId: string) {
    const record = await this.serviceRecordRepository.findOne({ where: { id: recordId } });
    if (!record) throw new NotFoundException('服务记录不存在');
    return record;
  }

  async updateServiceRecord(recordId: string, dto: any) {
    const record = await this.findOneServiceRecord(recordId);
    Object.assign(record, dto);
    return this.serviceRecordRepository.save(record);
  }

  async removeServiceRecord(recordId: string) {
    const record = await this.findOneServiceRecord(recordId);
    return this.serviceRecordRepository.remove(record);
  }
}
