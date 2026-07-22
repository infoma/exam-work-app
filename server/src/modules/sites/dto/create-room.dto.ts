import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsString()
  roomNo: string;

  @IsOptional()
  @IsNumber()
  capacity: number;

  @IsOptional()
  @IsString()
  floor: string;

  @IsOptional()
  @IsString()
  checkResult: string;
}