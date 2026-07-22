import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export type TaskStage = 'pre_exam' | 'exam' | 'post_exam';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'overdue' | 'cancelled';
export type TaskPriority = 'low' | 'normal' | 'high' | 'urgent';

@Entity('exam_tasks')
export class ExamTask {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  examId: string;

  @Column({ type: 'uuid', nullable: true })
  siteId: string;

  @Column({ type: 'varchar', length: 160 })
  title: string;

  @Column({ type: 'varchar', length: 40 })
  stage: TaskStage;

  @Column({ type: 'uuid', nullable: true })
  ownerId: string;

  @Column({ type: 'datetime', nullable: true })
  dueTime: Date;

  @Column({ type: 'varchar', length: 30, default: 'pending' })
  status: TaskStatus;

  @Column({ type: 'varchar', length: 20, default: 'normal' })
  priority: TaskPriority;

  @Column({ type: 'text', nullable: true })
  requirement: string;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ type: 'uuid' })
  createdBy: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt: Date;
}