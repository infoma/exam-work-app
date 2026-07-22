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
exports.ExamsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const exam_project_entity_1 = require("./entities/exam-project.entity");
const exam_subject_entity_1 = require("./entities/exam-subject.entity");
let ExamsService = class ExamsService {
    constructor(examRepository, subjectRepository) {
        this.examRepository = examRepository;
        this.subjectRepository = subjectRepository;
    }
    async create(dto, userId) {
        const exam = this.examRepository.create({
            id: (0, uuid_1.v4)(),
            ...dto,
            createdBy: userId,
        });
        return this.examRepository.save(exam);
    }
    async findAll() {
        return this.examRepository.find({
            where: { deletedAt: null },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const exam = await this.examRepository.findOne({
            where: { id, deletedAt: null },
        });
        if (!exam) {
            throw new common_1.NotFoundException('考试项目不存在');
        }
        return exam;
    }
    async update(id, dto) {
        const exam = await this.findOne(id);
        Object.assign(exam, dto);
        return this.examRepository.save(exam);
    }
    async delete(id) {
        const exam = await this.findOne(id);
        return this.examRepository.softRemove(exam);
    }
    async addSubject(examId, data) {
        await this.findOne(examId);
        const subject = this.subjectRepository.create({
            id: (0, uuid_1.v4)(),
            examId,
            ...data,
        });
        return this.subjectRepository.save(subject);
    }
    async getSubjects(examId) {
        await this.findOne(examId);
        return this.subjectRepository.find({
            where: { examId },
            order: { orderNum: 'ASC' },
        });
    }
};
exports.ExamsService = ExamsService;
exports.ExamsService = ExamsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(exam_project_entity_1.ExamProject)),
    __param(1, (0, typeorm_1.InjectRepository)(exam_subject_entity_1.ExamSubject)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ExamsService);
//# sourceMappingURL=exams.service.js.map