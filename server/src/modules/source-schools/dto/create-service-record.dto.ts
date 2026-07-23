import { IsNotEmpty, IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class CreateServiceRecordDto {
  @IsOptional()
  @IsString()
  serviceType: string;

  @IsNotEmpty()
  @IsDateString()
  serviceDate: string;

  @IsOptional()
  @IsString()
  serviceContent: string;

  @IsOptional()
  @IsNumber()
  serviceCount: number;

  @IsOptional()
  @IsString()
  satisfactionLevel: string;

  @IsOptional()
  @IsString()
  feedback: string;

  @IsOptional()
  @IsString()
  operatorName: string;

  @IsOptional()
  @IsString()
  remarks: string;
}
