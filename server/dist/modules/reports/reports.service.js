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
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const report_entity_1 = require("./entities/report.entity");
const exams_service_1 = require("../exams/exams.service");
const sites_service_1 = require("../sites/sites.service");
const tasks_service_1 = require("../tasks/tasks.service");
const incidents_service_1 = require("../incidents/incidents.service");
const ai_service_1 = require("../ai/ai.service");
let ReportsService = class ReportsService {
    constructor(reportRepository, examsService, sitesService, tasksService, incidentsService, aiService) {
        this.reportRepository = reportRepository;
        this.examsService = examsService;
        this.sitesService = sitesService;
        this.tasksService = tasksService;
        this.incidentsService = incidentsService;
        this.aiService = aiService;
    }
    async generate(dto, userId) {
        await this.examsService.findOne(dto.examId);
        const structuredData = await this.buildStructuredData(dto);
        const report = this.reportRepository.create({
            id: (0, uuid_1.v4)(),
            examId: dto.examId,
            reportType: dto.reportType,
            periodStart: dto.periodStart ? new Date(dto.periodStart) : null,
            periodEnd: dto.periodEnd ? new Date(dto.periodEnd) : null,
            structuredData,
            status: 'generated',
            createdBy: userId,
        });
        return this.reportRepository.save(report);
    }
    async buildStructuredData(dto) {
        const sites = await this.sitesService.findByExam(dto.examId);
        const tasks = await this.tasksService.findByExam(dto.examId);
        const incidents = await this.incidentsService.findByExam(dto.examId);
        const exam = await this.examsService.findOne(dto.examId);
        return {
            exam: {
                id: exam.id,
                name: exam.name,
                type: exam.type,
                startTime: exam.startTime,
                endTime: exam.endTime,
                status: exam.status,
            },
            sites: sites.map(s => ({
                id: s.id,
                name: s.name,
                roomCount: s.roomCount,
                candidateCount: s.candidateCount,
                status: s.status,
            })),
            tasks: {
                total: tasks.length,
                completed: tasks.filter(t => t.status === 'completed').length,
                pending: tasks.filter(t => t.status === 'pending').length,
                inProgress: tasks.filter(t => t.status === 'in_progress').length,
                overdue: tasks.filter(t => t.status === 'overdue').length,
                byStage: {
                    pre_exam: tasks.filter(t => t.stage === 'pre_exam').length,
                    exam: tasks.filter(t => t.stage === 'exam').length,
                    post_exam: tasks.filter(t => t.stage === 'post_exam').length,
                },
            },
            incidents: {
                total: incidents.length,
                normal: incidents.filter(i => i.level === 'normal').length,
                important: incidents.filter(i => i.level === 'important').length,
                major: incidents.filter(i => i.level === 'major').length,
                closed: incidents.filter(i => i.status === 'closed').length,
                open: incidents.filter(i => i.status !== 'closed').length,
                list: incidents.map(i => ({
                    id: i.id,
                    title: i.title,
                    type: i.type,
                    level: i.level,
                    status: i.status,
                    createdAt: i.createdAt,
                })),
            },
        };
    }
    async generateAiSummary(reportId) {
        const report = await this.findOne(reportId);
        const prompt = `请根据以下考试工作数据，生成一份专业的总结报告，要求：
1. 条理清晰，重点突出
2. 包含整体评估、关键指标、问题分析和改进建议
3. 使用 Markdown 格式
4. 字数控制在 800-1200 字左右`;
        const context = JSON.stringify(report.structuredData, null, 2);
        const aiContent = await this.aiService.generateSummary(prompt, context);
        report.aiContent = aiContent;
        report.status = 'ai_generated';
        return this.reportRepository.save(report);
    }
    async findOne(id) {
        const report = await this.reportRepository.findOne({ where: { id } });
        if (!report) {
            throw new common_1.NotFoundException('报告不存在');
        }
        return report;
    }
    async findByExam(examId) {
        return this.reportRepository.find({
            where: { examId },
            order: { createdAt: 'DESC' },
        });
    }
    async updateContent(id, content) {
        const report = await this.findOne(id);
        report.editedContent = content;
        report.status = 'edited';
        return this.reportRepository.save(report);
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(report_entity_1.Report)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        exams_service_1.ExamsService,
        sites_service_1.SitesService,
        tasks_service_1.TasksService,
        incidents_service_1.IncidentsService,
        ai_service_1.AiService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map