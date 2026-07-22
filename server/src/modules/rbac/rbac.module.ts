import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from './rbac.guard';
import { PermissionsGuard } from './permissions.guard';
import { RbacService } from './rbac.service';
import { RbacController } from './rbac.controller';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { UserRole } from './entities/user-role.entity';
import { RolePermission } from './entities/role-permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission, UserRole, RolePermission])],
  providers: [RolesGuard, PermissionsGuard, RbacService],
  controllers: [RbacController],
  exports: [RolesGuard, PermissionsGuard, RbacService],
})
export class RbacModule implements OnModuleInit {
  constructor(private rbacService: RbacService) {}

  async onModuleInit() {
    await this.rbacService.initDefaultRolesAndPermissions();
  }
}