import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('role_permissions')
export class RolePermission {
  @PrimaryColumn('uuid')
  roleId: string;

  @PrimaryColumn('uuid')
  permissionId: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;
}