export type SiteStatus = string;
export declare class ExamSite {
    id: string;
    examId: string;
    name: string;
    address: string;
    leaderId: string;
    roomCount: number;
    candidateCount: number;
    status: SiteStatus;
    notes: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
