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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const exam_task_entity_1 = require("./entities/exam-task.entity");
const task_record_entity_1 = require("./entities/task-record.entity");
const exams_service_1 = require("../exams/exams.service");
let TasksService = class TasksService {
    constructor(taskRepository, recordRepository, examsService) {
        this.taskRepository = taskRepository;
        this.recordRepository = recordRepository;
        this.examsService = examsService;
    }
    async create(examId, dto, userId) {
        await this.examsService.findOne(examId);
        const task = this.taskRepository.create({
            id: (0, uuid_1.v4)(),
            examId,
            ...dto,
            createdBy: userId,
        });
        return this.taskRepository.save(task);
    }
    async findByExam(examId, filters) {
        await this.examsService.findOne(examId);
        const where = { examId, deletedAt: null };
        if (filters?.siteId)
            where.siteId = filters.siteId;
        if (filters?.status)
            where.status = filters.status;
        if (filters?.stage)
            where.stage = filters.stage;
        return this.taskRepository.find({ where, order: { dueTime: 'ASC' } });
    }
    async findByUser(userId) {
        return this.taskRepository.find({
            where: { ownerId: userId, deletedAt: null },
            order: { dueTime: 'ASC' },
        });
    }
    async findOne(id) {
        const task = await this.taskRepository.findOne({ where: { id, deletedAt: null } });
        if (!task) {
            throw new common_1.NotFoundException('任务不存在');
        }
        return task;
    }
    async update(id, dto) {
        const task = await this.findOne(id);
        Object.assign(task, dto);
        return this.taskRepository.save(task);
    }
    async updateStatus(id, status) {
        const task = await this.findOne(id);
        task.status = status;
        return this.taskRepository.save(task);
    }
    async delete(id) {
        const task = await this.findOne(id);
        return this.taskRepository.softRemove(task);
    }
    async addRecord(taskId, dto, userId) {
        await this.findOne(taskId);
        const record = this.recordRepository.create({
            id: (0, uuid_1.v4)(),
            taskId,
            ...dto,
            recordTime: dto.recordTime ? new Date(dto.recordTime) : new Date(),
            createdBy: userId,
        });
        return this.recordRepository.save(record);
    }
    async getRecords(taskId) {
        await this.findOne(taskId);
        return this.recordRepository.find({
            where: { taskId },
            order: { recordTime: 'DESC' },
        });
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(exam_task_entity_1.ExamTask)),
    __param(1, (0, typeorm_1.InjectRepository)(task_record_entity_1.TaskRecord)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        exams_service_1.ExamsService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map