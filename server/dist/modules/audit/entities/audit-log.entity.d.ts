export type ActionType = 'create' | 'update' | 'delete' | 'close' | 'export' | 'login' | 'logout' | 'assign' | 'review';
export type ObjectType = 'user' | 'exam' | 'site' | 'room' | 'task' | 'record' | 'incident' | 'report' | 'role' | 'attachment';
export declare class AuditLog {
    id: string;
    userId: string;
    action: ActionType;
    objectType: ObjectType;
    objectId: string;
    beforeData: any;
    afterData: any;
    ip: string;
    description: string;
    createdAt: Date;
}
