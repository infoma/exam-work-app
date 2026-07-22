import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ExamProject } from './entities/exam-project.entity';
import { ExamSubject } from './entities/exam-subject.entity';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(ExamProject)
    private examRepository: Repository<ExamProject>,
    @InjectRepository(ExamSubject)
    private subjectRepository: Repository<ExamSubject>,
  ) {}

  async create(dto: CreateExamDto, userId: string) {
    const exam = this.examRepository.create({
      id: uuidv4(),
      ...dto,
      createdBy: userId,
    });
    return this.examRepository.save(exam);
  }

  async findAll() {
    return this.examRepository.find({
      where: { deletedAt: null },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const exam = await this.examRepository.findOne({
      where: { id, deletedAt: null },
    });
    if (!exam) {
      throw new NotFoundException('考试项目不存在');
    }
    return exam;
  }

  async update(id: string, dto: UpdateExamDto) {
    const exam = await this.findOne(id);
    Object.assign(exam, dto);
    return this.examRepository.save(exam);
  }

  async delete(id: string) {
    const exam = await this.findOne(id);
    return this.examRepository.softRemove(exam);
  }

  async addSubject(examId: string, data: { name: string; sessionName?: string; startTime?: string; endTime?: string }) {
    await this.findOne(examId);
    const subject = this.subjectRepository.create({
      id: uuidv4(),
      examId,
      ...data,
    });
    return this.subjectRepository.save(subject);
  }

  async getSubjects(examId: string) {
    await this.findOne(examId);
    return this.subjectRepository.find({
      where: { examId },
      order: { orderNum: 'ASC' },
    });
  }
}