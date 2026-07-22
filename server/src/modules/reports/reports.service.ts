import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Report } from './entities/report.entity';
import { GenerateReportDto } from './dto/generate-report.dto';
import { ExamsService } from '../exams/exams.service';
import { SitesService } from '../sites/sites.service';
import { TasksService } from '../tasks/tasks.service';
import { IncidentsService } from '../incidents/incidents.service';
import { AiService } from '../ai/ai.service';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
    private examsService: ExamsService,
    private sitesService: SitesService,
    private tasksService: TasksService,
    private incidentsService: IncidentsService,
    private aiService: AiService,
  ) {}

  async generate(dto: GenerateReportDto, userId: string) {
    await this.examsService.findOne(dto.examId);

    const structuredData = await this.buildStructuredData(dto);

    const report = this.reportRepository.create({
      id: uuidv4(),
      examId: dto.examId,
      reportType: dto.reportType,
      periodStart: dto.periodStart ? new Date(dto.periodStart) : null,
      periodEnd: dto.periodEnd ? new Date(dto.periodEnd) : null,
      structuredData,
      status: 'generated',
      createdBy: userId,
    });

    return this.reportRepository.save(report);
  }

  async buildStructuredData(dto: GenerateReportDto) {
    const sites = await this.sitesService.findByExam(dto.examId);
    const tasks = await this.tasksService.findByExam(dto.examId);
    const incidents = await this.incidentsService.findByExam(dto.examId);

    const exam = await this.examsService.findOne(dto.examId);

    return {
      exam: {
        id: exam.id,
        name: exam.name,
        type: exam.type,
        startTime: exam.startTime,
        endTime: exam.endTime,
        status: exam.status,
      },
      sites: sites.map(s => ({
        id: s.id,
        name: s.name,
        roomCount: s.roomCount,
        candidateCount: s.candidateCount,
        status: s.status,
      })),
      tasks: {
        total: tasks.length,
        completed: tasks.filter(t => t.status === 'completed').length,
        pending: tasks.filter(t => t.status === 'pending').length,
        inProgress: tasks.filter(t => t.status === 'in_progress').length,
        overdue: tasks.filter(t => t.status === 'overdue').length,
        byStage: {
          pre_exam: tasks.filter(t => t.stage === 'pre_exam').length,
          exam: tasks.filter(t => t.stage === 'exam').length,
          post_exam: tasks.filter(t => t.stage === 'post_exam').length,
        },
      },
      incidents: {
        total: incidents.length,
        normal: incidents.filter(i => i.level === 'normal').length,
        important: incidents.filter(i => i.level === 'important').length,
        major: incidents.filter(i => i.level === 'major').length,
        closed: incidents.filter(i => i.status === 'closed').length,
        open: incidents.filter(i => i.status !== 'closed').length,
        list: incidents.map(i => ({
          id: i.id,
          title: i.title,
          type: i.type,
          level: i.level,
          status: i.status,
          createdAt: i.createdAt,
        })),
      },
    };
  }

  async generateAiSummary(reportId: string) {
    const report = await this.findOne(reportId);
    
    const prompt = `请根据以下考试工作数据，生成一份专业的总结报告，要求：
1. 条理清晰，重点突出
2. 包含整体评估、关键指标、问题分析和改进建议
3. 使用 Markdown 格式
4. 字数控制在 800-1200 字左右`;

    const context = JSON.stringify(report.structuredData, null, 2);
    const aiContent = await this.aiService.generateSummary(prompt, context);
    
    report.aiContent = aiContent;
    report.status = 'ai_generated';
    
    return this.reportRepository.save(report);
  }

  async findOne(id: string) {
    const report = await this.reportRepository.findOne({ where: { id } });
    if (!report) {
      throw new NotFoundException('报告不存在');
    }
    return report;
  }

  async findByExam(examId: string) {
    return this.reportRepository.find({
      where: { examId },
      order: { createdAt: 'DESC' },
    });
  }

  async updateContent(id: string, content: string) {
    const report = await this.findOne(id);
    report.editedContent = content;
    report.status = 'edited';
    return this.reportRepository.save(report);
  }
}