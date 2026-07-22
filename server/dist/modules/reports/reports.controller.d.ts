import { ReportsService } from './reports.service';
import { GenerateReportDto } from './dto/generate-report.dto';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    generate(dto: GenerateReportDto, req: any): Promise<import("./entities/report.entity").Report>;
    generateAiSummary(id: string): Promise<import("./entities/report.entity").Report>;
    findByExam(examId: string): Promise<import("./entities/report.entity").Report[]>;
    findOne(id: string): Promise<import("./entities/report.entity").Report>;
    updateContent(id: string, body: {
        content: string;
    }): Promise<import("./entities/report.entity").Report>;
}
