import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class CreateStaffDto {
  @IsNotEmpty()
  @IsString()
  employeeId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  gender: string;

  @IsOptional()
  @IsString()
  idCard: string;

  @IsOptional()
  @IsDateString()
  birthday: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  department: string;

  @IsOptional()
  @IsString()
  position: string;

  @IsOptional()
  @IsString()
  role: string;

  @IsOptional()
  workYears: number;

  @IsOptional()
  @IsDateString()
  entryDate: string;

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  education: string;

  @IsOptional()
  @IsString()
  major: string;

  @IsOptional()
  @IsString()
  certifications: string;

  @IsOptional()
  @IsString()
  skills: string;

  @IsOptional()
  isQualified: boolean;

  @IsOptional()
  @IsString()
  remarks: string;
}
