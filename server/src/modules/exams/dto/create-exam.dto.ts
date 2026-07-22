import { IsNotEmpty, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateExamDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
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
  globalRequirement: string;

  @IsOptional()
  @IsString()
  description: string;
}