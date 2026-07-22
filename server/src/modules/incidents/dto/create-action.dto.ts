import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ActionType } from '../entities/incident-action.entity';

export class CreateActionDto {
  @IsNotEmpty()
  @IsEnum(['assign', 'handle', 'review', 'close', 'reopen'])
  actionType: ActionType;

  @IsNotEmpty()
  @IsString()
  content: string;
}