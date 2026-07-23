import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('site_inspections')
export class SiteInspection {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  siteStandardId: string;

  @Column({ type: 'datetime' })
  inspectionDate: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  inspectionType: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  inspector: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  facilityCheck: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  securityCheck: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  environmentCheck: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  managementCheck: string;

  @Column({ type: 'float', default: 0 })
  facilityScore: number;

  @Column({ type: 'float', default: 0 })
  securityScore: number;

  @Column({ type: 'float', default: 0 })
  environmentScore: number;

  @Column({ type: 'float', default: 0 })
  managementScore: number;

  @Column({ type: 'float', default: 0 })
  overallScore: number;

  @Column({ type: 'text', nullable: true })
  issuesFound: string;

  @Column({ type: 'boolean', default: false })
  rectificationRequired: boolean;

  @Column({ type: 'date', nullable: true })
  rectificationDeadline: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  rectificationStatus: string;

  @Column({ type: 'text', nullable: true })
  remarks: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
