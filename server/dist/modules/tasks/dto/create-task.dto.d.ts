import { TaskStage, TaskPriority } from '../entities/exam-task.entity';
export declare class CreateTaskDto {
    title: string;
    stage: TaskStage;
    siteId: string;
    ownerId: string;
    dueTime: string;
    priority: TaskPriority;
    requirement: string;
    note: string;
}
