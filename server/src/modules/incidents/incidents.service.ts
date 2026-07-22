import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Incident } from './entities/incident.entity';
import { IncidentAction } from './entities/incident-action.entity';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { CreateActionDto } from './dto/create-action.dto';
import { ExamsService } from '../exams/exams.service';

@Injectable()
export class IncidentsService {
  constructor(
    @InjectRepository(Incident)
    private incidentRepository: Repository<Incident>,
    @InjectRepository(IncidentAction)
    private actionRepository: Repository<IncidentAction>,
    private examsService: ExamsService,
  ) {}

  async create(dto: CreateIncidentDto, userId: string) {
    await this.examsService.findOne(dto.examId);
    const incident = this.incidentRepository.create({
      id: uuidv4(),
      ...dto,
      createdBy: userId,
    });
    return this.incidentRepository.save(incident);
  }

  async findByExam(examId: string, filters?: { siteId?: string; status?: string; level?: string }) {
    await this.examsService.findOne(examId);
    const where: any = { examId };
    if (filters?.siteId) where.siteId = filters.siteId;
    if (filters?.status) where.status = filters.status;
    if (filters?.level) where.level = filters.level;
    return this.incidentRepository.find({ where, order: { createdAt: 'DESC' } });
  }

  async findByUser(userId: string) {
    return this.incidentRepository.find({
      where: [{ ownerId: userId }, { createdBy: userId }],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const incident = await this.incidentRepository.findOne({ where: { id } });
    if (!incident) {
      throw new NotFoundException('异常事件不存在');
    }
    return incident;
  }

  async update(id: string, dto: Partial<CreateIncidentDto>) {
    const incident = await this.findOne(id);
    Object.assign(incident, dto);
    return this.incidentRepository.save(incident);
  }

  async addAction(incidentId: string, dto: CreateActionDto, userId: string) {
    const incident = await this.findOne(incidentId);
    const action = this.actionRepository.create({
      id: uuidv4(),
      incidentId,
      ...dto,
      operatorId: userId,
    });
    await this.actionRepository.save(action);

    if (dto.actionType === 'close') {
      incident.status = 'closed';
      await this.incidentRepository.save(incident);
    } else if (dto.actionType === 'assign') {
      incident.ownerId = userId;
      incident.status = 'processing';
      await this.incidentRepository.save(incident);
    } else if (dto.actionType === 'review') {
      incident.status = 'pending_review';
      await this.incidentRepository.save(incident);
    }

    return action;
  }

  async getActions(incidentId: string) {
    await this.findOne(incidentId);
    return this.actionRepository.find({
      where: { incidentId },
      order: { actionTime: 'DESC' },
    });
  }

  async close(incidentId: string, userId: string) {
    const incident = await this.findOne(incidentId);
    incident.status = 'closed';
    await this.incidentRepository.save(incident);

    const action = this.actionRepository.create({
      id: uuidv4(),
      incidentId,
      actionType: 'close',
      content: '异常已闭环',
      operatorId: userId,
    });
    return this.actionRepository.save(action);
  }
}