import { IsNotEmpty, IsString, IsOptional, IsPhoneNumber } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  realName: string;

  @IsOptional()
  @IsPhoneNumber('CN')
  phone: string;

  @IsOptional()
  @IsString()
  orgId: string;
}