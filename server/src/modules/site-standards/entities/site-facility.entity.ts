import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('site_facilities')
export class SiteFacility {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  siteStandardId: string;

  @Column({ type: 'varchar', length: 50 })
  facilityType: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  facilityName: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  facilityModel: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  facilityBrand: string;

  @Column({ type: 'integer', default: 1 })
  quantity: number;

  @Column({ type: 'integer', default: 1 })
  workingQuantity: number;

  @Column({ type: 'varchar', length: 20, default: '正常' })
  status: string;

  @Column({ type: 'date', nullable: true })
  purchaseDate: string;

  @Column({ type: 'date', nullable: true })
  warrantyExpireDate: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  supplier: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  location: string;

  @Column({ type: 'text', nullable: true })
  remarks: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
