import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('user_roles')
export class UserRole {
  @PrimaryColumn('uuid')
  userId: string;

  @PrimaryColumn('uuid')
  roleId: string;

  @Column({ type: 'uuid', nullable: true })
  examId: string;

  @Column({ type: 'uuid', nullable: true })
  siteId: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;
}