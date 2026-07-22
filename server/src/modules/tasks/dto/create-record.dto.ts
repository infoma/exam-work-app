import { IsNotEmpty, IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class CreateRecordDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  riskNote: string;

  @IsOptional()
  @IsString()
  progressText: string;

  @IsOptional()
  @IsNumber()
  progressPercent: number;

  @IsOptional()
  @IsDateString()
  recordTime: string;
}