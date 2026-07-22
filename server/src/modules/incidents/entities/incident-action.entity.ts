import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

export type ActionType = 'assign' | 'handle' | 'review' | 'close' | 'reopen';

@Entity('incident_actions')
export class IncidentAction {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  incidentId: string;

  @Column({ type: 'varchar', length: 30 })
  actionType: ActionType;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'uuid' })
  operatorId: string;

  @CreateDateColumn({ type: 'datetime' })
  actionTime: Date;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;
}