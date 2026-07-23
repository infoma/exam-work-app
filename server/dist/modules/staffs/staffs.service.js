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
exports.StaffsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const staff_entity_1 = require("./entities/staff.entity");
const staff_training_entity_1 = require("./entities/staff-training.entity");
const staff_assignment_entity_1 = require("./entities/staff-assignment.entity");
let StaffsService = class StaffsService {
    constructor(staffRepository, trainingRepository, assignmentRepository) {
        this.staffRepository = staffRepository;
        this.trainingRepository = trainingRepository;
        this.assignmentRepository = assignmentRepository;
    }
    async create(dto, userId) {
        const staff = this.staffRepository.create({
            id: (0, uuid_1.v4)(),
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
    async findAll(filters) {
        const query = this.staffRepository.createQueryBuilder('s')
            .where('s.deletedAt IS NULL');
        if (filters.department)
            query.andWhere('s.department = :department', { department: filters.department });
        if (filters.status)
            query.andWhere('s.status = :status', { status: filters.status });
        if (filters.role)
            query.andWhere('s.role = :role', { role: filters.role });
        if (filters.isQualified !== undefined)
            query.andWhere('s.isQualified = :isQualified', { isQualified: filters.isQualified === 'true' });
        return query.orderBy('s.createdAt', 'DESC').getMany();
    }
    async findOne(id) {
        const staff = await this.staffRepository.findOne({ where: { id, deletedAt: null } });
        if (!staff)
            throw new common_1.NotFoundException('工作人员不存在');
        return staff;
    }
    async update(id, dto) {
        const staff = await this.findOne(id);
        Object.assign(staff, dto);
        return this.staffRepository.save(staff);
    }
    async remove(id) {
        const staff = await this.findOne(id);
        return this.staffRepository.softRemove(staff);
    }
    async createTraining(staffId, dto) {
        await this.findOne(staffId);
        const training = this.trainingRepository.create({
            id: (0, uuid_1.v4)(),
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
        if (dto.isPassed) {
            await this.staffRepository.update(staffId, {
                trainingStatus: '已培训',
                trainingDate: dto.trainingDate,
            });
        }
        return saved;
    }
    async findTrainings(staffId) {
        await this.findOne(staffId);
        return this.trainingRepository.find({
            where: { staffId },
            order: { trainingDate: 'DESC' },
        });
    }
    async findOneTraining(trainingId) {
        const training = await this.trainingRepository.findOne({ where: { id: trainingId } });
        if (!training)
            throw new common_1.NotFoundException('培训记录不存在');
        return training;
    }
    async updateTraining(trainingId, dto) {
        const training = await this.findOneTraining(trainingId);
        Object.assign(training, dto);
        return this.trainingRepository.save(training);
    }
    async removeTraining(trainingId) {
        const training = await this.findOneTraining(trainingId);
        return this.trainingRepository.remove(training);
    }
    async createAssignment(staffId, dto) {
        await this.findOne(staffId);
        const assignment = this.assignmentRepository.create({
            id: (0, uuid_1.v4)(),
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
        await this.staffRepository.update(staffId, {
            examExperience: () => 'examExperience + 1',
            lastExamDate: dto.examDate,
        });
        return saved;
    }
    async findAssignments(staffId) {
        await this.findOne(staffId);
        return this.assignmentRepository.find({
            where: { staffId },
            order: { assignmentDate: 'DESC' },
        });
    }
    async findOneAssignment(assignmentId) {
        const assignment = await this.assignmentRepository.findOne({ where: { id: assignmentId } });
        if (!assignment)
            throw new common_1.NotFoundException('分配记录不存在');
        return assignment;
    }
    async updateAssignment(assignmentId, dto) {
        const assignment = await this.findOneAssignment(assignmentId);
        Object.assign(assignment, dto);
        return this.assignmentRepository.save(assignment);
    }
    async removeAssignment(assignmentId) {
        const assignment = await this.findOneAssignment(assignmentId);
        return this.assignmentRepository.remove(assignment);
    }
};
exports.StaffsService = StaffsService;
exports.StaffsService = StaffsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(staff_entity_1.Staff)),
    __param(1, (0, typeorm_1.InjectRepository)(staff_training_entity_1.StaffTraining)),
    __param(2, (0, typeorm_1.InjectRepository)(staff_assignment_entity_1.StaffAssignment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], StaffsService);
//# sourceMappingURL=staffs.service.js.map