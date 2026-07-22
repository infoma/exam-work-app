import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export type IncidentType = 'late' | 'id_issue' | 'cheating' | 'equipment_failure' | 'paper_issue' | 'illness' | 'order' | 'natural' | 'network' | 'other';
export type IncidentLevel = 'normal' | 'important' | 'major';
export type IncidentStatus = 'pending' | 'processing' | 'pending_review' | 'closed';

@Entity('incidents')
export class Incident {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  examId: string;

  @Column({ type: 'uuid', nullable: true })
  siteId: string;

  @Column({ type: 'uuid', nullable: true })
  roomId: string;

  @Column({ type: 'varchar', length: 40 })
  type: IncidentType;

  @Column({ type: 'varchar', length: 20 })
  level: IncidentLevel;

  @Column({ type: 'varchar', length: 160 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 30, default: 'pending' })
  status: IncidentStatus;

  @Column({ type: 'uuid', nullable: true })
  ownerId: string;

  @Column({ type: 'uuid' })
  createdBy: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}