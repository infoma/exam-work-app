import { SitesService } from './sites.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { CreateRoomDto } from './dto/create-room.dto';
export declare class SitesController {
    private readonly sitesService;
    constructor(sitesService: SitesService);
    create(examId: string, dto: CreateSiteDto, req: any): Promise<import("./entities/exam-site.entity").ExamSite>;
    findByExam(examId: string): Promise<import("./entities/exam-site.entity").ExamSite[]>;
    findOne(id: string): Promise<import("./entities/exam-site.entity").ExamSite>;
    update(id: string, dto: Partial<CreateSiteDto>): Promise<import("./entities/exam-site.entity").ExamSite>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
    createRoom(siteId: string, dto: CreateRoomDto): Promise<import("./entities/exam-room.entity").ExamRoom>;
    findRooms(siteId: string): Promise<import("./entities/exam-room.entity").ExamRoom[]>;
    updateRoom(id: string, dto: Partial<CreateRoomDto>): Promise<import("./entities/exam-room.entity").ExamRoom>;
    deleteRoom(id: string): Promise<{
        success: boolean;
    }>;
}
