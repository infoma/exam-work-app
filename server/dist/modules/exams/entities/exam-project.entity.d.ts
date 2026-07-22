export type ExamStatus = string;
export type ExamType = string;
export declare class ExamProject {
    id: string;
    name: string;
    type: ExamType;
    startTime: Date;
    endTime: Date;
    status: ExamStatus;
    globalRequirement: string;
    description: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
