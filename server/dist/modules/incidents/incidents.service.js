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
exports.IncidentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const incident_entity_1 = require("./entities/incident.entity");
const incident_action_entity_1 = require("./entities/incident-action.entity");
const exams_service_1 = require("../exams/exams.service");
let IncidentsService = class IncidentsService {
    constructor(incidentRepository, actionRepository, examsService) {
        this.incidentRepository = incidentRepository;
        this.actionRepository = actionRepository;
        this.examsService = examsService;
    }
    async create(dto, userId) {
        await this.examsService.findOne(dto.examId);
        const incident = this.incidentRepository.create({
            id: (0, uuid_1.v4)(),
            ...dto,
            createdBy: userId,
        });
        return this.incidentRepository.save(incident);
    }
    async findByExam(examId, filters) {
        await this.examsService.findOne(examId);
        const where = { examId };
        if (filters?.siteId)
            where.siteId = filters.siteId;
        if (filters?.status)
            where.status = filters.status;
        if (filters?.level)
            where.level = filters.level;
        return this.incidentRepository.find({ where, order: { createdAt: 'DESC' } });
    }
    async findByUser(userId) {
        return this.incidentRepository.find({
            where: [{ ownerId: userId }, { createdBy: userId }],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const incident = await this.incidentRepository.findOne({ where: { id } });
        if (!incident) {
            throw new common_1.NotFoundException('异常事件不存在');
        }
        return incident;
    }
    async update(id, dto) {
        const incident = await this.findOne(id);
        Object.assign(incident, dto);
        return this.incidentRepository.save(incident);
    }
    async addAction(incidentId, dto, userId) {
        const incident = await this.findOne(incidentId);
        const action = this.actionRepository.create({
            id: (0, uuid_1.v4)(),
            incidentId,
            ...dto,
            operatorId: userId,
        });
        await this.actionRepository.save(action);
        if (dto.actionType === 'close') {
            incident.status = 'closed';
            await this.incidentRepository.save(incident);
        }
        else if (dto.actionType === 'assign') {
            incident.ownerId = userId;
            incident.status = 'processing';
            await this.incidentRepository.save(incident);
        }
        else if (dto.actionType === 'review') {
            incident.status = 'pending_review';
            await this.incidentRepository.save(incident);
        }
        return action;
    }
    async getActions(incidentId) {
        await this.findOne(incidentId);
        return this.actionRepository.find({
            where: { incidentId },
            order: { actionTime: 'DESC' },
        });
    }
    async close(incidentId, userId) {
        const incident = await this.findOne(incidentId);
        incident.status = 'closed';
        await this.incidentRepository.save(incident);
        const action = this.actionRepository.create({
            id: (0, uuid_1.v4)(),
            incidentId,
            actionType: 'close',
            content: '异常已闭环',
            operatorId: userId,
        });
        return this.actionRepository.save(action);
    }
};
exports.IncidentsService = IncidentsService;
exports.IncidentsService = IncidentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(incident_entity_1.Incident)),
    __param(1, (0, typeorm_1.InjectRepository)(incident_action_entity_1.IncidentAction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        exams_service_1.ExamsService])
], IncidentsService);
//# sourceMappingURL=incidents.service.js.map