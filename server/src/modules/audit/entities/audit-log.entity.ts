import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

export type ActionType = 'create' | 'update' | 'delete' | 'close' | 'export' | 'login' | 'logout' | 'assign' | 'review';
export type ObjectType = 'user' | 'exam' | 'site' | 'room' | 'task' | 'record' | 'incident' | 'report' | 'role' | 'attachment';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'varchar', length: 30 })
  action: ActionType;

  @Column({ type: 'varchar', length: 30 })
  objectType: ObjectType;

  @Column({ type: 'uuid', nullable: true })
  objectId: string;

  @Column({ type: 'json', nullable: true })
  beforeData: any;

  @Column({ type: 'json', nullable: true })
  afterData: any;

  @Column({ type: 'varchar', length: 50, nullable: true })
  ip: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  description: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;
}