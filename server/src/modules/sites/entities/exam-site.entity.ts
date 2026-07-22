import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export type SiteStatus = string;

@Entity('exam_sites')
export class ExamSite {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  examId: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  address: string;

  @Column({ type: 'uuid', nullable: true })
  leaderId: string;

  @Column({ type: 'integer', default: 0 })
  roomCount: number;

  @Column({ type: 'integer', default: 0 })
  candidateCount: number;

  @Column({ type: 'varchar', length: 30, default: 'preparing' })
  status: SiteStatus;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'uuid' })
  createdBy: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt: Date;
}