import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateSiteDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  leaderId: string;

  @IsOptional()
  roomCount: any;

  @IsOptional()
  candidateCount: any;

  @IsOptional()
  @IsString()
  notes: string;

  @IsOptional()
  @IsString()
  status: string;
}