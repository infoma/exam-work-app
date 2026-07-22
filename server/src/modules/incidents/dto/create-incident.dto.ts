import { IsNotEmpty, IsString, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { IncidentType, IncidentLevel } from '../entities/incident.entity';

export class CreateIncidentDto {
  @IsNotEmpty()
  @IsUUID()
  examId: string;

  @IsOptional()
  @IsUUID()
  siteId: string;

  @IsOptional()
  @IsUUID()
  roomId: string;

  @IsNotEmpty()
  @IsEnum(['late', 'id_issue', 'cheating', 'equipment_failure', 'paper_issue', 'illness', 'order', 'natural', 'network', 'other'])
  type: IncidentType;

  @IsNotEmpty()
  @IsEnum(['normal', 'important', 'major'])
  level: IncidentLevel;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}