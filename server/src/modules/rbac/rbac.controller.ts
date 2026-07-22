import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RbacService } from './rbac.service';
import { Role } from './entities/role.entity';

@Controller('api/rbac')
@UseGuards(AuthGuard('jwt'))
export class RbacController {
  constructor(private readonly rbacService: RbacService) {}

  @Get('roles')
  async getRoles() {
    return this.rbacService.getAllRoles();
  }

  @Post('roles')
  async createRole(@Body() data: Partial<Role>) {
    return this.rbacService.createRole(data);
  }

  @Get('permissions')
  async getPermissions() {
    return this.rbacService.getAllPermissions();
  }

  @Get('my-roles')
  async getMyRoles(@Request() req: any) {
    return this.rbacService.getUserRoles(req.user.userId);
  }

  @Get('my-permissions')
  async getMyPermissions(@Request() req: any) {
    return this.rbacService.getUserPermissions(req.user.userId);
  }

  @Get('roles/:roleId/permissions')
  async getRolePermissions(@Param('roleId') roleId: string) {
    return this.rbacService.getRolePermissions(roleId);
  }

  @Post('roles/:roleId/permissions/:permissionId')
  async assignPermission(
    @Param('roleId') roleId: string,
    @Param('permissionId') permissionId: string,
  ) {
    return this.rbacService.assignPermissionToRole(roleId, permissionId);
  }

  @Post('users/:userId/roles/:roleId')
  async assignRole(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
    @Body() data?: { examId?: string; siteId?: string },
  ) {
    return this.rbacService.assignRole(userId, roleId, data?.examId, data?.siteId);
  }

  @Delete('users/:userId/roles/:roleId')
  async removeRole(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
  ) {
    return this.rbacService.removeRole(userId, roleId);
  }
}