export type IncidentType = 'late' | 'id_issue' | 'cheating' | 'equipment_failure' | 'paper_issue' | 'illness' | 'order' | 'natural' | 'network' | 'other';
export type IncidentLevel = 'normal' | 'important' | 'major';
export type IncidentStatus = 'pending' | 'processing' | 'pending_review' | 'closed';
export declare class Incident {
    id: string;
    examId: string;
    siteId: string;
    roomId: string;
    type: IncidentType;
    level: IncidentLevel;
    title: string;
    description: string;
    status: IncidentStatus;
    ownerId: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
}
