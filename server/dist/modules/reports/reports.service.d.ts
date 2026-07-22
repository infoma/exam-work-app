import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { GenerateReportDto } from './dto/generate-report.dto';
import { ExamsService } from '../exams/exams.service';
import { SitesService } from '../sites/sites.service';
import { TasksService } from '../tasks/tasks.service';
import { IncidentsService } from '../incidents/incidents.service';
import { AiService } from '../ai/ai.service';
export declare class ReportsService {
    private reportRepository;
    private examsService;
    private sitesService;
    private tasksService;
    private incidentsService;
    private aiService;
    constructor(reportRepository: Repository<Report>, examsService: ExamsService, sitesService: SitesService, tasksService: TasksService, incidentsService: IncidentsService, aiService: AiService);
    generate(dto: GenerateReportDto, userId: string): Promise<Report>;
    buildStructuredData(dto: GenerateReportDto): Promise<{
        exam: {
            id: string;
            name: string;
            type: string;
            startTime: Date;
            endTime: Date;
            status: string;
        };
        sites: {
            id: string;
            name: string;
            roomCount: number;
            candidateCount: number;
            status: string;
        }[];
        tasks: {
            total: number;
            completed: number;
            pending: number;
            inProgress: number;
            overdue: number;
            byStage: {
                pre_exam: number;
                exam: number;
                post_exam: number;
            };
        };
        incidents: {
            total: number;
            normal: number;
            important: number;
            major: number;
            closed: number;
            open: number;
            list: {
                id: string;
                title: string;
                type: import("../incidents/entities/incident.entity").IncidentType;
                level: import("../incidents/entities/incident.entity").IncidentLevel;
                status: import("../incidents/entities/incident.entity").IncidentStatus;
                createdAt: Date;
            }[];
        };
    }>;
    generateAiSummary(reportId: string): Promise<Report>;
    findOne(id: string): Promise<Report>;
    findByExam(examId: string): Promise<Report[]>;
    updateContent(id: string, content: string): Promise<Report>;
}
