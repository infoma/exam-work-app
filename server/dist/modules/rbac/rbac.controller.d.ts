import { RbacService } from './rbac.service';
import { Role } from './entities/role.entity';
export declare class RbacController {
    private readonly rbacService;
    constructor(rbacService: RbacService);
    getRoles(): Promise<Role[]>;
    createRole(data: Partial<Role>): Promise<Role>;
    getPermissions(): Promise<import("./entities/permission.entity").Permission[]>;
    getMyRoles(req: any): Promise<Role[]>;
    getMyPermissions(req: any): Promise<import("./entities/permission.entity").Permission[]>;
    getRolePermissions(roleId: string): Promise<import("./entities/permission.entity").Permission[]>;
    assignPermission(roleId: string, permissionId: string): Promise<import("./entities/role-permission.entity").RolePermission>;
    assignRole(userId: string, roleId: string, data?: {
        examId?: string;
        siteId?: string;
    }): Promise<import("./entities/user-role.entity").UserRole>;
    removeRole(userId: string, roleId: string): Promise<import("typeorm").DeleteResult>;
}
