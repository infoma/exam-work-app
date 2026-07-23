import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('staff_trainings')
export class StaffTraining {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  staffId: string;

  @Column({ type: 'varchar', length: 100 })
  trainingName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  trainingType: string;

  @Column({ type: 'datetime' })
  trainingDate: Date;

  @Column({ type: 'integer', default: 0 })
  trainingHours: number;

  @Column({ type: 'varchar', length: 200, nullable: true })
  trainingLocation: string;

  @Column({ type: 'text', nullable: true })
  trainingContent: string;

  @Column({ type: 'boolean', default: false })
  isPassed: boolean;

  @Column({ type: 'integer', nullable: true })
  score: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  certificateNo: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  trainer: string;

  @Column({ type: 'text', nullable: true })
  remarks: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
