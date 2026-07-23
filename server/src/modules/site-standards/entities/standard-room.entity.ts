import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('standard_rooms')
export class StandardRoom {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  siteStandardId: string;

  @Column({ type: 'varchar', length: 20 })
  roomNumber: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  roomName: string;

  @Column({ type: 'integer', nullable: true })
  floor: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  building: string;

  @Column({ type: 'integer', default: 30 })
  totalSeats: number;

  @Column({ type: 'integer', default: 30 })
  availableSeats: number;

  @Column({ type: 'integer', default: 2 })
  spareSeats: number;

  @Column({ type: 'varchar', length: 20, default: '标准考场' })
  roomType: string;

  @Column({ type: 'boolean', default: false })
  hasProjector: boolean;

  @Column({ type: 'boolean', default: false })
  hasComputer: boolean;

  @Column({ type: 'boolean', default: false })
  hasAirConditioner: boolean;

  @Column({ type: 'boolean', default: true })
  hasClock: boolean;

  @Column({ type: 'integer', default: 0 })
  cameraCount: number;

  @Column({ type: 'integer', default: 0 })
  signalDetectorCount: number;

  @Column({ type: 'varchar', length: 20, default: '正常' })
  status: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'text', nullable: true })
  remarks: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
