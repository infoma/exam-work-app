import { IsNotEmpty, IsString, IsOptional, IsNumber, IsDateString, IsBoolean } from 'class-validator';

export class CreateTrainingDto {
  @IsNotEmpty()
  @IsString()
  trainingName: string;

  @IsOptional()
  @IsString()
  trainingType: string;

  @IsNotEmpty()
  @IsDateString()
  trainingDate: string;

  @IsOptional()
  trainingHours: number;

  @IsOptional()
  @IsString()
  trainingLocation: string;

  @IsOptional()
  @IsString()
  trainingContent: string;

  @IsOptional()
  isPassed: boolean;

  @IsOptional()
  @IsNumber()
  score: number;

  @IsOptional()
  @IsString()
  certificateNo: string;

  @IsOptional()
  @IsString()
  trainer: string;

  @IsOptional()
  @IsString()
  remarks: string;
}

export class CreateAssignmentDto {
  @IsNotEmpty()
  @IsString()
  examSiteId: string;

  @IsOptional()
  @IsString()
  assignmentType: string;

  @IsNotEmpty()
  @IsDateString()
  assignmentDate: string;

  @IsOptional()
  @IsString()
  examName: string;

  @IsOptional()
  @IsDateString()
  examDate: string;

  @IsOptional()
  @IsString()
  roomNumber: string;

  @IsOptional()
  @IsString()
  workPeriod: string;

  @IsOptional()
  @IsString()
  workRole: string;

  @IsOptional()
  @IsString()
  remarks: string;
}
