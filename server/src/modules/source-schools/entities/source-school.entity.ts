import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('source_schools')
export class SourceSchool {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  schoolType: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  province: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  district: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  contactPerson: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  contactPhone: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ type: 'integer', default: 0 })
  studentCount: number;

  @Column({ type: 'integer', default: 0 })
  teacherCount: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'integer', default: 0 })
  capacity: number;

  @Column({ type: 'float', default: 0 })
  facilitiesScore: number;

  @Column({ type: 'varchar', length: 20, default: '标准' })
  serviceLevel: string;

  @Column({ type: 'varchar', length: 20, default: '正常' })
  serviceStatus: string;

  @Column({ type: 'datetime', nullable: true })
  lastServiceDate: Date;

  @Column({ type: 'integer', default: 0 })
  serviceCount: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'uuid' })
  createdBy: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt: Date;
}
