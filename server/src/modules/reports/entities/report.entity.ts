import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export type ReportType = 'pre_exam_daily' | 'exam_daily' | 'incident_summary' | 'material_report' | 'post_exam';
export type ReportStatus = 'generating' | 'generated' | 'ai_generated' | 'edited' | 'exported';

@Entity('reports')
export class Report {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  examId: string;

  @Column({ type: 'varchar', length: 50 })
  reportType: ReportType;

  @Column({ type: 'datetime', nullable: true })
  periodStart: Date;

  @Column({ type: 'datetime', nullable: true })
  periodEnd: Date;

  @Column({ type: 'json', nullable: true })
  structuredData: any;

  @Column({ type: 'text', nullable: true })
  aiContent: string;

  @Column({ type: 'text', nullable: true })
  editedContent: string;

  @Column({ type: 'varchar', length: 30, default: 'generating' })
  status: ReportStatus;

  @Column({ type: 'uuid' })
  createdBy: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}