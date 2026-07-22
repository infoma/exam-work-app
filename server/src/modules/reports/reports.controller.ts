import { Controller, Get, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReportsService } from './reports.service';
import { GenerateReportDto } from './dto/generate-report.dto';

@Controller('api/reports')
@UseGuards(AuthGuard('jwt'))
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('generate')
  async generate(@Body() dto: GenerateReportDto, @Request() req: any) {
    return this.reportsService.generate(dto, req.user.userId);
  }

  @Post(':id/ai-summary')
  async generateAiSummary(@Param('id') id: string) {
    return this.reportsService.generateAiSummary(id);
  }

  @Get('exam/:examId')
  async findByExam(@Param('examId') examId: string) {
    return this.reportsService.findByExam(examId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.reportsService.findOne(id);
  }

  @Put(':id/content')
  async updateContent(@Param('id') id: string, @Body() body: { content: string }) {
    return this.reportsService.updateContent(id, body.content);
  }
}