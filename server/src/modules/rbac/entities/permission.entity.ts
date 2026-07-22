import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export type PermissionResource = 
  | 'exam' 
  | 'site' 
  | 'task' 
  | 'incident' 
  | 'report' 
  | 'file' 
  | 'user' 
  | 'role'
  | 'dashboard';

export type PermissionAction = 'create' | 'read' | 'update' | 'delete' | 'manage';

@Entity('permissions')
export class Permission {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  resource: PermissionResource;

  @Column({ type: 'varchar', length: 30 })
  action: PermissionAction;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  description: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}