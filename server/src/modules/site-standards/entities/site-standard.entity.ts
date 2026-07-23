import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('site_standards')
export class SiteStandard {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  province: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  district: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  address: string;

  @Column({ type: 'float', nullable: true })
  longitude: number;

  @Column({ type: 'float', nullable: true })
  latitude: number;

  @Column({ type: 'integer', default: 0 })
  totalRooms: number;

  @Column({ type: 'integer', default: 0 })
  availableRooms: number;

  @Column({ type: 'integer', default: 0 })
  totalSeats: number;

  @Column({ type: 'integer', default: 0 })
  capacity: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  contactPerson: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  contactPhone: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  backupPhone: string;

  @Column({ type: 'varchar', length: 20, default: '未评级' })
  standardLevel: string;

  @Column({ type: 'float', default: 0 })
  facilityScore: number;

  @Column({ type: 'float', default: 0 })
  managementScore: number;

  @Column({ type: 'float', default: 0 })
  securityScore: number;

  @Column({ type: 'float', default: 0 })
  overallScore: number;

  @Column({ type: 'boolean', default: false })
  hasMonitoring: boolean;

  @Column({ type: 'boolean', default: false })
  hasSignalDetector: boolean;

  @Column({ type: 'boolean', default: false })
  hasIdentityChecker: boolean;

  @Column({ type: 'boolean', default: false })
  hasEmergencyPower: boolean;

  @Column({ type: 'boolean', default: false })
  hasMedicalRoom: boolean;

  @Column({ type: 'varchar', length: 20, default: '正常' })
  status: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'date', nullable: true })
  lastExamDate: string;

  @Column({ type: 'integer', default: 0 })
  examCount: number;

  @Column({ type: 'text', nullable: true })
  description: string;

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
