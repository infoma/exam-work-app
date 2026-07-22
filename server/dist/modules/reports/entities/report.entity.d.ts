export type ReportType = 'pre_exam_daily' | 'exam_daily' | 'incident_summary' | 'material_report' | 'post_exam';
export type ReportStatus = 'generating' | 'generated' | 'ai_generated' | 'edited' | 'exported';
export declare class Report {
    id: string;
    examId: string;
    reportType: ReportType;
    periodStart: Date;
    periodEnd: Date;
    structuredData: any;
    aiContent: string;
    editedContent: string;
    status: ReportStatus;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
}
