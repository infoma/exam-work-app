export type TaskStage = 'pre_exam' | 'exam' | 'post_exam';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'overdue' | 'cancelled';
export type TaskPriority = 'low' | 'normal' | 'high' | 'urgent';
export declare class ExamTask {
    id: string;
    examId: string;
    siteId: string;
    title: string;
    stage: TaskStage;
    ownerId: string;
    dueTime: Date;
    status: TaskStatus;
    priority: TaskPriority;
    requirement: string;
    note: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
