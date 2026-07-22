import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { UserRole } from './entities/user-role.entity';
import { RolePermission } from './entities/role-permission.entity';

@Injectable()
export class RbacService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
    @InjectRepository(RolePermission)
    private rolePermissionRepository: Repository<RolePermission>,
  ) {}

  async getUserRoles(userId: string): Promise<Role[]> {
    const userRoles = await this.userRoleRepository.find({ where: { userId } });
    const roleIds = userRoles.map(ur => ur.roleId);
    if (roleIds.length === 0) return [];
    return this.roleRepository.find({ where: { id: In(roleIds) } });
  }

  async getUserPermissions(userId: string): Promise<Permission[]> {
    const userRoles = await this.userRoleRepository.find({ where: { userId } });
    const roleIds = userRoles.map(ur => ur.roleId);
    if (roleIds.length === 0) return [];

    const rolePermissions = await this.rolePermissionRepository.find({ 
      where: { roleId: In(roleIds) } 
    });
    const permissionIds = [...new Set(rolePermissions.map(rp => rp.permissionId))];
    if (permissionIds.length === 0) return [];

    return this.permissionRepository.find({ where: { id: In(permissionIds) } });
  }

  async hasPermission(userId: string, resource: string, action: string): Promise<boolean> {
    const permissions = await this.getUserPermissions(userId);
    return permissions.some(p => 
      (p.resource === resource && p.action === action) ||
      (p.resource === resource && p.action === 'manage') ||
      (p.resource === 'dashboard' && p.action === 'manage')
    );
  }

  async hasRole(userId: string, roleCode: string): Promise<boolean> {
    const roles = await this.getUserRoles(userId);
    return roles.some(r => r.code === roleCode);
  }

  async assignRole(userId: string, roleId: string, examId?: string, siteId?: string) {
    const userRole = this.userRoleRepository.create({
      userId,
      roleId,
      examId,
      siteId,
    });
    return this.userRoleRepository.save(userRole);
  }

  async removeRole(userId: string, roleId: string) {
    return this.userRoleRepository.delete({ userId, roleId });
  }

  async createRole(data: Partial<Role>) {
    const role = this.roleRepository.create({
      id: uuidv4(),
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

  async assignPermissionToRole(roleId: string, permissionId: string) {
    const rp = this.rolePermissionRepository.create({
      roleId,
      permissionId,
    });
    return this.rolePermissionRepository.save(rp);
  }

  async getRolePermissions(roleId: string): Promise<Permission[]> {
    const rolePermissions = await this.rolePermissionRepository.find({ where: { roleId } });
    const permissionIds = rolePermissions.map(rp => rp.permissionId);
    if (permissionIds.length === 0) return [];
    return this.permissionRepository.find({ where: { id: In(permissionIds) } });
  }

  async initDefaultRolesAndPermissions() {
    const adminRole = await this.roleRepository.findOne({ where: { code: 'admin' } });
    if (adminRole) return;

    const resources = ['exam', 'site', 'task', 'incident', 'report', 'file', 'user', 'role', 'dashboard'];
    const actions = ['create', 'read', 'update', 'delete', 'manage'] as const;

    const permissions: Permission[] = [];
    for (const resource of resources) {
      for (const action of actions) {
        const perm = this.permissionRepository.create({
          id: uuidv4(),
          resource: resource as any,
          action,
          name: `${resource}_${action}`,
          description: `${resource} ${action} permission`,
        });
        permissions.push(await this.permissionRepository.save(perm));
      }
    }

    const admin = this.roleRepository.create({
      id: uuidv4(),
      code: 'admin',
      name: '系统管理员',
      scopeType: 'global',
      description: '拥有所有权限',
    });
    await this.roleRepository.save(admin);

    const examAdmin = this.roleRepository.create({
      id: uuidv4(),
      code: 'exam_admin',
      name: '考务管理员',
      scopeType: 'exam',
      description: '管理考试相关事务',
    });
    await this.roleRepository.save(examAdmin);

    const siteLeader = this.roleRepository.create({
      id: uuidv4(),
      code: 'site_leader',
      name: '考点负责人',
      scopeType: 'site',
      description: '负责考点日常管理',
    });
    await this.roleRepository.save(siteLeader);

    const staff = this.roleRepository.create({
      id: uuidv4(),
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

    const examPerms = allPerms.filter(p => 
      ['exam', 'site', 'task', 'incident', 'report', 'file', 'dashboard'].includes(p.resource)
    );
    for (const perm of examPerms) {
      await this.rolePermissionRepository.save({
        roleId: examAdmin.id,
        permissionId: perm.id,
      });
    }

    const sitePerms = allPerms.filter(p => 
      ['task', 'incident', 'file', 'dashboard'].includes(p.resource) && 
      ['read', 'create', 'update'].includes(p.action)
    );
    for (const perm of sitePerms) {
      await this.rolePermissionRepository.save({
        roleId: siteLeader.id,
        permissionId: perm.id,
      });
    }

    const staffPerms = allPerms.filter(p => 
      ['task', 'dashboard'].includes(p.resource) && 
      ['read', 'update'].includes(p.action)
    );
    for (const perm of staffPerms) {
      await this.rolePermissionRepository.save({
        roleId: staff.id,
        permissionId: perm.id,
      });
    }
  }
}