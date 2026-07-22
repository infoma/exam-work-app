import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ExamTask } from './entities/exam-task.entity';
import { TaskRecord } from './entities/task-record.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateRecordDto } from './dto/create-record.dto';
import { ExamsService } from '../exams/exams.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(ExamTask)
    private taskRepository: Repository<ExamTask>,
    @InjectRepository(TaskRecord)
    private recordRepository: Repository<TaskRecord>,
    private examsService: ExamsService,
  ) {}

  async create(examId: string, dto: CreateTaskDto, userId: string) {
    await this.examsService.findOne(examId);
    const task = this.taskRepository.create({
      id: uuidv4(),
      examId,
      ...dto,
      createdBy: userId,
    });
    return this.taskRepository.save(task);
  }

  async findByExam(examId: string, filters?: { siteId?: string; status?: string; stage?: string }) {
    await this.examsService.findOne(examId);
    const where: any = { examId, deletedAt: null };
    if (filters?.siteId) where.siteId = filters.siteId;
    if (filters?.status) where.status = filters.status;
    if (filters?.stage) where.stage = filters.stage;
    return this.taskRepository.find({ where, order: { dueTime: 'ASC' } });
  }

  async findByUser(userId: string) {
    return this.taskRepository.find({
      where: { ownerId: userId, deletedAt: null },
      order: { dueTime: 'ASC' },
    });
  }

  async findOne(id: string) {
    const task = await this.taskRepository.findOne({ where: { id, deletedAt: null } });
    if (!task) {
      throw new NotFoundException('任务不存在');
    }
    return task;
  }

  async update(id: string, dto: Partial<CreateTaskDto>) {
    const task = await this.findOne(id);
    Object.assign(task, dto);
    return this.taskRepository.save(task);
  }

  async updateStatus(id: string, status: string) {
    const task = await this.findOne(id);
    task.status = status as any;
    return this.taskRepository.save(task);
  }

  async delete(id: string) {
    const task = await this.findOne(id);
    return this.taskRepository.softRemove(task);
  }

  async addRecord(taskId: string, dto: CreateRecordDto, userId: string) {
    await this.findOne(taskId);
    const record = this.recordRepository.create({
      id: uuidv4(),
      taskId,
      ...dto,
      recordTime: dto.recordTime ? new Date(dto.recordTime) : new Date(),
      createdBy: userId,
    });
    return this.recordRepository.save(record);
  }

  async getRecords(taskId: string) {
    await this.findOne(taskId);
    return this.recordRepository.find({
      where: { taskId },
      order: { recordTime: 'DESC' },
    });
  }
}