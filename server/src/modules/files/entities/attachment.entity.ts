import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

export type BizType = 'task_record' | 'incident' | 'incident_action' | 'site' | 'report' | 'other';

@Entity('attachments')
export class Attachment {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 40 })
  bizType: BizType;

  @Column({ type: 'uuid' })
  bizId: string;

  @Column({ type: 'varchar', length: 255 })
  fileName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  fileType: string;

  @Column({ type: 'bigint', default: 0 })
  fileSize: number;

  @Column({ type: 'varchar', length: 500 })
  storageKey: string;

  @Column({ type: 'uuid' })
  uploaderId: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;
}