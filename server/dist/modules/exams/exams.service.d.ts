import { Repository } from 'typeorm';
import { ExamProject } from './entities/exam-project.entity';
import { ExamSubject } from './entities/exam-subject.entity';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
export declare class ExamsService {
    private examRepository;
    private subjectRepository;
    constructor(examRepository: Repository<ExamProject>, subjectRepository: Repository<ExamSubject>);
    create(dto: CreateExamDto, userId: string): Promise<ExamProject>;
    findAll(): Promise<ExamProject[]>;
    findOne(id: string): Promise<ExamProject>;
    update(id: string, dto: UpdateExamDto): Promise<ExamProject>;
    delete(id: string): Promise<ExamProject>;
    addSubject(examId: string, data: {
        name: string;
        sessionName?: string;
        startTime?: string;
        endTime?: string;
    }): Promise<ExamSubject>;
    getSubjects(examId: string): Promise<ExamSubject[]>;
}
