import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('staff_assignments')
export class StaffAssignment {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  staffId: string;

  @Column({ type: 'uuid' })
  examSiteId: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  assignmentType: string;

  @Column({ type: 'datetime' })
  assignmentDate: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  examName: string;

  @Column({ type: 'date', nullable: true })
  examDate: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  roomNumber: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  workPeriod: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  workRole: string;

  @Column({ type: 'varchar', length: 20, default: '已分配' })
  status: string;

  @Column({ type: 'datetime', nullable: true })
  checkInTime: Date;

  @Column({ type: 'datetime', nullable: true })
  checkOutTime: Date;

  @Column({ type: 'text', nullable: true })
  remarks: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
