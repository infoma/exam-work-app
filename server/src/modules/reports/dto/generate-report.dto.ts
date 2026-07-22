import { IsNotEmpty, IsUUID, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { ReportType } from '../entities/report.entity';

export class GenerateReportDto {
  @IsNotEmpty()
  @IsUUID()
  examId: string;

  @IsNotEmpty()
  @IsEnum(['pre_exam_daily', 'exam_daily', 'incident_summary', 'material_report', 'post_exam'])
  reportType: ReportType;

  @IsOptional()
  @IsDateString()
  periodStart: string;

  @IsOptional()
  @IsDateString()
  periodEnd: string;
}