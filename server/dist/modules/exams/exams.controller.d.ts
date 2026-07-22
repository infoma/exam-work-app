import { ExamsService } from './exams.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
export declare class ExamsController {
    private readonly examsService;
    constructor(examsService: ExamsService);
    create(dto: CreateExamDto, req: any): Promise<import("./entities/exam-project.entity").ExamProject>;
    findAll(): Promise<import("./entities/exam-project.entity").ExamProject[]>;
    findOne(id: string): Promise<import("./entities/exam-project.entity").ExamProject>;
    update(id: string, dto: UpdateExamDto): Promise<import("./entities/exam-project.entity").ExamProject>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
    getSubjects(id: string): Promise<import("./entities/exam-subject.entity").ExamSubject[]>;
    addSubject(id: string, data: {
        name: string;
        sessionName?: string;
        startTime?: string;
        endTime?: string;
    }): Promise<import("./entities/exam-subject.entity").ExamSubject>;
}
