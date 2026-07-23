export declare class CreateTrainingDto {
    trainingName: string;
    trainingType: string;
    trainingDate: string;
    trainingHours: number;
    trainingLocation: string;
    trainingContent: string;
    isPassed: boolean;
    score: number;
    certificateNo: string;
    trainer: string;
    remarks: string;
}
export declare class CreateAssignmentDto {
    examSiteId: string;
    assignmentType: string;
    assignmentDate: string;
    examName: string;
    examDate: string;
    roomNumber: string;
    workPeriod: string;
    workRole: string;
    remarks: string;
}
