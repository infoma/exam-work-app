import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('school_service_records')
export class SchoolServiceRecord {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  schoolId: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  serviceType: string;

  @Column({ type: 'datetime' })
  serviceDate: Date;

  @Column({ type: 'text', nullable: true })
  serviceContent: string;

  @Column({ type: 'integer', default: 1 })
  serviceCount: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  satisfactionLevel: string;

  @Column({ type: 'text', nullable: true })
  feedback: string;

  @Column({ type: 'uuid', nullable: true })
  operatorId: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  operatorName: string;

  @Column({ type: 'text', nullable: true })
  remarks: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
