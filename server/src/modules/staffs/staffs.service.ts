import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Staff } from './entities/staff.entity';
import { StaffTraining } from './entities/staff-training.entity';
import { StaffAssignment } from './entities/staff-assignment.entity';

@Injectable()
export class StaffsService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    @InjectRepository(StaffTraining)
    private trainingRepository: Repository<StaffTraining>,
    @InjectRepository(StaffAssignment)
    private assignmentRepository: Repository<StaffAssignment>,
  ) {}

  // ==================== 工作人员 CRUD ====================

  async create(dto: any, userId: string) {
    const staff = this.staffRepository.create({
      id: uuidv4(),
      employeeId: dto.employeeId,
      name: dto.name,
      gender: dto.gender,
      idCard: dto.idCard,
      birthday: dto.birthday,
      phone: dto.phone,
      email: dto.email,
      address: dto.address,
      department: dto.department,
      position: dto.position,
      role: dto.role,
      workYears: dto.workYears ?? 0,
      entryDate: dto.entryDate,
      status: dto.status ?? '在职',
      education: dto.education,
      major: dto.major,
      certifications: dto.certifications,
      skills: dto.skills,
      isQualified: dto.isQualified ?? false,
      remarks: dto.remarks,
      createdBy: userId,
    });
    return this.staffRepository.save(staff);
  }

  async findAll(filters: { department?: string; status?: string; role?: string; isQualified?: string }) {
    const query = this.staffRepository.createQueryBuilder('s')
      .where('s.deletedAt IS NULL');

    if (filters.department) query.andWhere('s.department = :department', { department: filters.department });
    if (filters.status) query.andWhere('s.status = :status', { status: filters.status });
    if (filters.role) query.andWhere('s.role = :role', { role: filters.role });
    if (filters.isQualified !== undefined) query.andWhere('s.isQualified = :isQualified', { isQualified: filters.isQualified === 'true' });

    return query.orderBy('s.createdAt', 'DESC').getMany();
  }

  async findOne(id: string) {
    const staff = await this.staffRepository.findOne({ where: { id, deletedAt: null as any } });
    if (!staff) throw new NotFoundException('工作人员不存在');
    return staff;
  }

  async update(id: string, dto: any) {
    const staff = await this.findOne(id);
    Object.assign(staff, dto);
    return this.staffRepository.save(staff);
  }

  async remove(id: string) {
    const staff = await this.findOne(id);
    return this.staffRepository.softRemove(staff);
  }

  // ==================== 培训记录 ====================

  async createTraining(staffId: string, dto: any) {
    await this.findOne(staffId);
    const training = this.trainingRepository.create({
      id: uuidv4(),
      staffId,
      trainingName: dto.trainingName,
      trainingType: dto.trainingType,
      trainingDate: dto.trainingDate,
      trainingHours: dto.trainingHours ?? 0,
      trainingLocation: dto.trainingLocation,
      trainingContent: dto.trainingContent,
      isPassed: dto.isPassed ?? false,
      score: dto.score,
      certificateNo: dto.certificateNo,
      trainer: dto.trainer,
      remarks: dto.remarks,
    });

    const saved = await this.trainingRepository.save(training);

    // 更新工作人员培训状态
    if (dto.isPassed) {
      await this.staffRepository.update(staffId, {
        trainingStatus: '已培训',
        trainingDate: dto.trainingDate,
      });
    }

    return saved;
  }

  async findTrainings(staffId: string) {
    await this.findOne(staffId);
    return this.trainingRepository.find({
      where: { staffId },
      order: { trainingDate: 'DESC' },
    });
  }

  async findOneTraining(trainingId: string) {
    const training = await this.trainingRepository.findOne({ where: { id: trainingId } });
    if (!training) throw new NotFoundException('培训记录不存在');
    return training;
  }

  async updateTraining(trainingId: string, dto: any) {
    const training = await this.findOneTraining(trainingId);
    Object.assign(training, dto);
    return this.trainingRepository.save(training);
  }

  async removeTraining(trainingId: string) {
    const training = await this.findOneTraining(trainingId);
    return this.trainingRepository.remove(training);
  }

  // ==================== 分配记录 ====================

  async createAssignment(staffId: string, dto: any) {
    await this.findOne(staffId);
    const assignment = this.assignmentRepository.create({
      id: uuidv4(),
      staffId,
      examSiteId: dto.examSiteId,
      assignmentType: dto.assignmentType,
      assignmentDate: dto.assignmentDate,
      examName: dto.examName,
      examDate: dto.examDate,
      roomNumber: dto.roomNumber,
      workPeriod: dto.workPeriod,
      workRole: dto.workRole,
      status: '已分配',
      remarks: dto.remarks,
    });

    const saved = await this.assignmentRepository.save(assignment);

    // 更新工作人员监考经验
    await this.staffRepository.update(staffId, {
      examExperience: () => 'examExperience + 1',
      lastExamDate: dto.examDate,
    });

    return saved;
  }

  async findAssignments(staffId: string) {
    await this.findOne(staffId);
    return this.assignmentRepository.find({
      where: { staffId },
      order: { assignmentDate: 'DESC' },
    });
  }

  async findOneAssignment(assignmentId: string) {
    const assignment = await this.assignmentRepository.findOne({ where: { id: assignmentId } });
    if (!assignment) throw new NotFoundException('分配记录不存在');
    return assignment;
  }

  async updateAssignment(assignmentId: string, dto: any) {
    const assignment = await this.findOneAssignment(assignmentId);
    Object.assign(assignment, dto);
    return this.assignmentRepository.save(assignment);
  }

  async removeAssignment(assignmentId: string) {
    const assignment = await this.findOneAssignment(assignmentId);
    return this.assignmentRepository.remove(assignment);
  }
}
