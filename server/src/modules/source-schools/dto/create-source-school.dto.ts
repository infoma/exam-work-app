import { IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateSourceSchoolDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  schoolType: string;

  @IsOptional()
  @IsString()
  province: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  district: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  contactPerson: string;

  @IsOptional()
  @IsString()
  contactPhone: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  studentCount: number;

  @IsOptional()
  teacherCount: number;

  @IsOptional()
  isActive: boolean;

  @IsOptional()
  capacity: number;

  @IsOptional()
  facilitiesScore: number;

  @IsOptional()
  @IsString()
  serviceLevel: string;

  @IsOptional()
  @IsString()
  serviceStatus: string;

  @IsOptional()
  @IsString()
  description: string;
}
