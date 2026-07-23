import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('staffs')
export class Staff {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  employeeId: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  gender: string;

  @Column({ type: 'varchar', length: 18, nullable: true })
  idCard: string;

  @Column({ type: 'date', nullable: true })
  birthday: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  department: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  position: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  role: string;

  @Column({ type: 'integer', default: 0 })
  workYears: number;

  @Column({ type: 'date', nullable: true })
  entryDate: string;

  @Column({ type: 'varchar', length: 20, default: '在职' })
  status: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  education: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  major: string;

  @Column({ type: 'text', nullable: true })
  certifications: string;

  @Column({ type: 'text', nullable: true })
  skills: string;

  @Column({ type: 'varchar', length: 20, default: '未培训' })
  trainingStatus: string;

  @Column({ type: 'date', nullable: true })
  trainingDate: string;

  @Column({ type: 'integer', default: 0 })
  examExperience: number;

  @Column({ type: 'date', nullable: true })
  lastExamDate: string;

  @Column({ type: 'boolean', default: false })
  isQualified: boolean;

  @Column({ type: 'text', nullable: true })
  remarks: string;

  @Column({ type: 'uuid' })
  createdBy: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt: Date;
}
