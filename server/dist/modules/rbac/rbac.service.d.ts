import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { UserRole } from './entities/user-role.entity';
import { RolePermission } from './entities/role-permission.entity';
export declare class RbacService {
    private roleRepository;
    private permissionRepository;
    private userRoleRepository;
    private rolePermissionRepository;
    constructor(roleRepository: Repository<Role>, permissionRepository: Repository<Permission>, userRoleRepository: Repository<UserRole>, rolePermissionRepository: Repository<RolePermission>);
    getUserRoles(userId: string): Promise<Role[]>;
    getUserPermissions(userId: string): Promise<Permission[]>;
    hasPermission(userId: string, resource: string, action: string): Promise<boolean>;
    hasRole(userId: string, roleCode: string): Promise<boolean>;
    assignRole(userId: string, roleId: string, examId?: string, siteId?: string): Promise<UserRole>;
    removeRole(userId: string, roleId: string): Promise<import("typeorm").DeleteResult>;
    createRole(data: Partial<Role>): Promise<Role>;
    getAllRoles(): Promise<Role[]>;
    getAllPermissions(): Promise<Permission[]>;
    assignPermissionToRole(roleId: string, permissionId: string): Promise<RolePermission>;
    getRolePermissions(roleId: string): Promise<Permission[]>;
    initDefaultRolesAndPermissions(): Promise<void>;
}
