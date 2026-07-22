import { Repository } from 'typeorm';
import { Incident } from './entities/incident.entity';
import { IncidentAction } from './entities/incident-action.entity';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { CreateActionDto } from './dto/create-action.dto';
import { ExamsService } from '../exams/exams.service';
export declare class IncidentsService {
    private incidentRepository;
    private actionRepository;
    private examsService;
    constructor(incidentRepository: Repository<Incident>, actionRepository: Repository<IncidentAction>, examsService: ExamsService);
    create(dto: CreateIncidentDto, userId: string): Promise<Incident>;
    findByExam(examId: string, filters?: {
        siteId?: string;
        status?: string;
        level?: string;
    }): Promise<Incident[]>;
    findByUser(userId: string): Promise<Incident[]>;
    findOne(id: string): Promise<Incident>;
    update(id: string, dto: Partial<CreateIncidentDto>): Promise<Incident>;
    addAction(incidentId: string, dto: CreateActionDto, userId: string): Promise<IncidentAction>;
    getActions(incidentId: string): Promise<IncidentAction[]>;
    close(incidentId: string, userId: string): Promise<IncidentAction>;
}
