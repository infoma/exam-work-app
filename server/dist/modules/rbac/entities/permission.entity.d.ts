export type PermissionResource = 'exam' | 'site' | 'task' | 'incident' | 'report' | 'file' | 'user' | 'role' | 'dashboard';
export type PermissionAction = 'create' | 'read' | 'update' | 'delete' | 'manage';
export declare class Permission {
    id: string;
    resource: PermissionResource;
    action: PermissionAction;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
