import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export type RoomStatus = 'ready' | 'occupied' | 'abnormal' | 'closed';

@Entity('exam_rooms')
export class ExamRoom {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  siteId: string;

  @Column({ type: 'varchar', length: 50 })
  roomNo: string;

  @Column({ type: 'integer', default: 0 })
  capacity: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  floor: string;

  @Column({ type: 'varchar', length: 30, default: 'ready' })
  status: RoomStatus;

  @Column({ type: 'text', nullable: true })
  checkResult: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}