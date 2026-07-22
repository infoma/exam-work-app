export type BizType = 'task_record' | 'incident' | 'incident_action' | 'site' | 'report' | 'other';
export declare class Attachment {
    id: string;
    bizType: BizType;
    bizId: string;
    fileName: string;
    fileType: string;
    fileSize: number;
    storageKey: string;
    uploaderId: string;
    createdAt: Date;
}
