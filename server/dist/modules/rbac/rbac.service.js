"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RbacService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const role_entity_1 = require("./entities/role.entity");
const permission_entity_1 = require("./entities/permission.entity");
const user_role_entity_1 = require("./entities/user-role.entity");
const role_permission_entity_1 = require("./entities/role-permission.entity");
let RbacService = class RbacService {
    constructor(roleRepository, permissionRepository, userRoleRepository, rolePermissionRepository) {
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
        this.userRoleRepository = userRoleRepository;
        this.rolePermissionRepository = rolePermissionRepository;
    }
    async getUserRoles(userId) {
        const userRoles = await this.userRoleRepository.find({ where: { userId } });
        const roleIds = userRoles.map(ur => ur.roleId);
        if (roleIds.length === 0)
            return [];
        return this.roleRepository.find({ where: { id: (0, typeorm_2.In)(roleIds) } });
    }
    async getUserPermissions(userId) {
        const userRoles = await this.userRoleRepository.find({ where: { userId } });
        const roleIds = userRoles.map(ur => ur.roleId);
        if (roleIds.length === 0)
            return [];
        const rolePermissions = await this.rolePermissionRepository.find({
            where: { roleId: (0, typeorm_2.In)(roleIds) }
        });
        const permissionIds = [...new Set(rolePermissions.map(rp => rp.permissionId))];
        if (permissionIds.length === 0)
            return [];
        return this.permissionRepository.find({ where: { id: (0, typeorm_2.In)(permissionIds) } });
    }
    async hasPermission(userId, resource, action) {
        const permissions = await this.getUserPermissions(userId);
        return permissions.some(p => (p.resource === resource && p.action === action) ||
            (p.resource === resource && p.action === 'manage') ||
            (p.resource === 'dashboard' && p.action === 'manage'));
    }
    async hasRole(userId, roleCode) {
        const roles = await this.getUserRoles(userId);
        return roles.some(r => r.code === roleCode);
    }
    async assignRole(userId, roleId, examId, siteId) {
        const userRole = this.userRoleRepository.create({
            userId,
            roleId,
            examId,
            siteId,
        });
        return this.userRoleRepository.save(userRole);
    }
    async removeRole(userId, roleId) {
        return this.userRoleRepository.delete({ userId, roleId });
    }
    async createRole(data) {
        const role = this.roleRepository.create({
            id: (0, uuid_1.v4)(),
            ...data,
        });
        return this.roleRepository.save(role);
    }
    async getAllRoles() {
        return this.roleRepository.find({ order: { createdAt: 'ASC' } });
    }
    async getAllPermissions() {
        return this.permissionRepository.find({ order: { resource: 'ASC', action: 'ASC' } });
    }
    async assignPermissionToRole(roleId, permissionId) {
        const rp = this.rolePermissionRepository.create({
            roleId,
            permissionId,
        });
        return this.rolePermissionRepository.save(rp);
    }
    async getRolePermissions(roleId) {
        const rolePermissions = await this.rolePermissionRepository.find({ where: { roleId } });
        const permissionIds = rolePermissions.map(rp => rp.permissionId);
        if (permissionIds.length === 0)
            return [];
        return this.permissionRepository.find({ where: { id: (0, typeorm_2.In)(permissionIds) } });
    }
    async initDefaultRolesAndPermissions() {
        const adminRole = await this.roleRepository.findOne({ where: { code: 'admin' } });
        if (adminRole)
            return;
        const resources = ['exam', 'site', 'task', 'incident', 'report', 'file', 'user', 'role', 'dashboard'];
        const actions = ['create', 'read', 'update', 'delete', 'manage'];
        const permissions = [];
        for (const resource of resources) {
            for (const action of actions) {
                const perm = this.permissionRepository.create({
                    id: (0, uuid_1.v4)(),
                    resource: resource,
                    action,
                    name: `${resource}_${action}`,
                    description: `${resource} ${action} permission`,
                });
                permissions.push(await this.permissionRepository.save(perm));
            }
        }
        const admin = this.roleRepository.create({
            id: (0, uuid_1.v4)(),
            code: 'admin',
            name: '系统管理员',
            scopeType: 'global',
            description: '拥有所有权限',
        });
        await this.roleRepository.save(admin);
        const examAdmin = this.roleRepository.create({
            id: (0, uuid_1.v4)(),
            code: 'exam_admin',
            name: '考务管理员',
            scopeType: 'exam',
            description: '管理考试相关事务',
        });
        await this.roleRepository.save(examAdmin);
        const siteLeader = this.roleRepository.create({
            id: (0, uuid_1.v4)(),
            code: 'site_leader',
            name: '考点负责人',
            scopeType: 'site',
            description: '负责考点日常管理',
        });
        await this.roleRepository.save(siteLeader);
        const staff = this.roleRepository.create({
            id: (0, uuid_1.v4)(),
            code: 'staff',
            name: '工作人员',
            scopeType: 'site',
            description: '执行具体考务工作',
        });
        await this.roleRepository.save(staff);
        const allPerms = await this.permissionRepository.find();
        for (const perm of allPerms) {
            await this.rolePermissionRepository.save({
                roleId: admin.id,
                permissionId: perm.id,
            });
        }
        const examPerms = allPerms.filter(p => ['exam', 'site', 'task', 'incident', 'report', 'file', 'dashboard'].includes(p.resource));
        for (const perm of examPerms) {
            await this.rolePermissionRepository.save({
                roleId: examAdmin.id,
                permissionId: perm.id,
            });
        }
        const sitePerms = allPerms.filter(p => ['task', 'incident', 'file', 'dashboard'].includes(p.resource) &&
            ['read', 'create', 'update'].includes(p.action));
        for (const perm of sitePerms) {
            await this.rolePermissionRepository.save({
                roleId: siteLeader.id,
                permissionId: perm.id,
            });
        }
        const staffPerms = allPerms.filter(p => ['task', 'dashboard'].includes(p.resource) &&
            ['read', 'update'].includes(p.action));
        for (const perm of staffPerms) {
            await this.rolePermissionRepository.save({
                roleId: staff.id,
                permissionId: perm.id,
            });
        }
    }
};
exports.RbacService = RbacService;
exports.RbacService = RbacService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __param(1, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __param(2, (0, typeorm_1.InjectRepository)(user_role_entity_1.UserRole)),
    __param(3, (0, typeorm_1.InjectRepository)(role_permission_entity_1.RolePermission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RbacService);
//# sourceMappingURL=rbac.service.js.map