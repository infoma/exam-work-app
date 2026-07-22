import { IncidentType, IncidentLevel } from '../entities/incident.entity';
export declare class CreateIncidentDto {
    examId: string;
    siteId: string;
    roomId: string;
    type: IncidentType;
    level: IncidentLevel;
    title: string;
    description: string;
}
