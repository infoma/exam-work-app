import { Repository } from 'typeorm';
import { ExamTask } from './entities/exam-task.entity';
import { TaskRecord } from './entities/task-record.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateRecordDto } from './dto/create-record.dto';
import { ExamsService } from '../exams/exams.service';
export declare class TasksService {
    private taskRepository;
    private recordRepository;
    private examsService;
    constructor(taskRepository: Repository<ExamTask>, recordRepository: Repository<TaskRecord>, examsService: ExamsService);
    create(examId: string, dto: CreateTaskDto, userId: string): Promise<ExamTask>;
    findByExam(examId: string, filters?: {
        siteId?: string;
        status?: string;
        stage?: string;
    }): Promise<ExamTask[]>;
    findByUser(userId: string): Promise<ExamTask[]>;
    findOne(id: string): Promise<ExamTask>;
    update(id: string, dto: Partial<CreateTaskDto>): Promise<ExamTask>;
    updateStatus(id: string, status: string): Promise<ExamTask>;
    delete(id: string): Promise<ExamTask>;
    addRecord(taskId: string, dto: CreateRecordDto, userId: string): Promise<TaskRecord>;
    getRecords(taskId: string): Promise<TaskRecord[]>;
}
