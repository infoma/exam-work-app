export type ActionType = 'assign' | 'handle' | 'review' | 'close' | 'reopen';
export declare class IncidentAction {
    id: string;
    incidentId: string;
    actionType: ActionType;
    content: string;
    operatorId: string;
    actionTime: Date;
    createdAt: Date;
}
