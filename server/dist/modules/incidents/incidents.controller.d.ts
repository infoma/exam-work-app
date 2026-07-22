import { IncidentsService } from './incidents.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { CreateActionDto } from './dto/create-action.dto';
export declare class IncidentsController {
    private readonly incidentsService;
    constructor(incidentsService: IncidentsService);
    create(dto: CreateIncidentDto, req: any): Promise<import("./entities/incident.entity").Incident>;
    findByExam(examId: string, siteId?: string, status?: string, level?: string): Promise<import("./entities/incident.entity").Incident[]>;
    findByUser(req: any): Promise<import("./entities/incident.entity").Incident[]>;
    findOne(id: string): Promise<import("./entities/incident.entity").Incident>;
    update(id: string, dto: Partial<CreateIncidentDto>): Promise<import("./entities/incident.entity").Incident>;
    addAction(id: string, dto: CreateActionDto, req: any): Promise<import("./entities/incident-action.entity").IncidentAction>;
    getActions(id: string): Promise<import("./entities/incident-action.entity").IncidentAction[]>;
    close(id: string, req: any): Promise<import("./entities/incident-action.entity").IncidentAction>;
}
