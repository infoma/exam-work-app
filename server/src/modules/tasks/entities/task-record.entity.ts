import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('task_records')
export class TaskRecord {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  taskId: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text', nullable: true })
  riskNote: string;

  @Column({ type: 'text', nullable: true })
  progressText: string;

  @Column({ type: 'integer', default: 0 })
  progressPercent: number;

  @Column({ type: 'datetime' })
  recordTime: Date;

  @Column({ type: 'uuid' })
  createdBy: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;
}