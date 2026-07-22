import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateExamDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsDateString()
  startTime: string;

  @IsOptional()
  @IsDateString()
  endTime: string;

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  globalRequirement: string;

  @IsOptional()
  @IsString()
  description: string;
}