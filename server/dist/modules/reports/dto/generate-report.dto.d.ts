import { ReportType } from '../entities/report.entity';
export declare class GenerateReportDto {
    examId: string;
    reportType: ReportType;
    periodStart: string;
    periodEnd: string;
}
