import { Repository } from 'typeorm';
import { ExamSite } from './entities/exam-site.entity';
import { ExamRoom } from './entities/exam-room.entity';
import { CreateSiteDto } from './dto/create-site.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { ExamsService } from '../exams/exams.service';
export declare class SitesService {
    private siteRepository;
    private roomRepository;
    private examsService;
    constructor(siteRepository: Repository<ExamSite>, roomRepository: Repository<ExamRoom>, examsService: ExamsService);
    create(examId: string, dto: CreateSiteDto, userId: string): Promise<ExamSite>;
    findByExam(examId: string): Promise<ExamSite[]>;
    findOne(id: string): Promise<ExamSite>;
    update(id: string, dto: Partial<CreateSiteDto>): Promise<ExamSite>;
    delete(id: string): Promise<ExamSite>;
    createRoom(siteId: string, dto: CreateRoomDto): Promise<ExamRoom>;
    findRooms(siteId: string): Promise<ExamRoom[]>;
    updateRoom(id: string, dto: Partial<CreateRoomDto>): Promise<ExamRoom>;
    deleteRoom(id: string): Promise<ExamRoom>;
}
