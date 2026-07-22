import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateRecordDto } from './dto/create-record.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(examId: string, dto: CreateTaskDto, req: any): Promise<import("./entities/exam-task.entity").ExamTask>;
    findByExam(examId: string, siteId?: string, status?: string, stage?: string): Promise<import("./entities/exam-task.entity").ExamTask[]>;
    findByUser(req: any): Promise<import("./entities/exam-task.entity").ExamTask[]>;
    findOne(id: string): Promise<import("./entities/exam-task.entity").ExamTask>;
    update(id: string, dto: Partial<CreateTaskDto>): Promise<import("./entities/exam-task.entity").ExamTask>;
    updateStatus(id: string, body: {
        status: string;
    }): Promise<import("./entities/exam-task.entity").ExamTask>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
    addRecord(taskId: string, dto: CreateRecordDto, req: any): Promise<import("./entities/task-record.entity").TaskRecord>;
    getRecords(taskId: string): Promise<import("./entities/task-record.entity").TaskRecord[]>;
}
