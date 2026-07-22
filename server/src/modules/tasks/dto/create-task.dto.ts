import { IsNotEmpty, IsString, IsOptional, IsDateString, IsEnum, IsUUID } from 'class-validator';
import { TaskStage, TaskPriority } from '../entities/exam-task.entity';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsEnum(['pre_exam', 'exam', 'post_exam'])
  stage: TaskStage;

  @IsOptional()
  @IsUUID()
  siteId: string;

  @IsOptional()
  @IsUUID()
  ownerId: string;

  @IsOptional()
  @IsDateString()
  dueTime: string;

  @IsOptional()
  @IsEnum(['low', 'normal', 'high', 'urgent'])
  priority: TaskPriority;

  @IsOptional()
  @IsString()
  requirement: string;

  @IsOptional()
  @IsString()
  note: string;
}