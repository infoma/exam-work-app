import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ExamSite } from './entities/exam-site.entity';
import { ExamRoom } from './entities/exam-room.entity';
import { CreateSiteDto } from './dto/create-site.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { ExamsService } from '../exams/exams.service';

@Injectable()
export class SitesService {
  constructor(
    @InjectRepository(ExamSite)
    private siteRepository: Repository<ExamSite>,
    @InjectRepository(ExamRoom)
    private roomRepository: Repository<ExamRoom>,
    private examsService: ExamsService,
  ) {}

  async create(examId: string, dto: CreateSiteDto, userId: string) {
    await this.examsService.findOne(examId);
    const site = this.siteRepository.create({
      id: uuidv4(),
      examId,
      name: dto.name,
      address: dto.address,
      leaderId: dto.leaderId || null,
      roomCount: dto.roomCount !== undefined ? Number(dto.roomCount) : undefined,
      candidateCount: dto.candidateCount !== undefined ? Number(dto.candidateCount) : undefined,
      notes: dto.notes,
      status: dto.status,
      createdBy: userId,
    });
    return this.siteRepository.save(site);
  }

  async findByExam(examId: string) {
    await this.examsService.findOne(examId);
    return this.siteRepository.find({
      where: { examId, deletedAt: null },
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(id: string) {
    const site = await this.siteRepository.findOne({
      where: { id, deletedAt: null },
    });
    if (!site) {
      throw new NotFoundException('考点不存在');
    }
    return site;
  }

  async update(id: string, dto: Partial<CreateSiteDto>) {
    const site = await this.findOne(id);
    Object.assign(site, dto);
    return this.siteRepository.save(site);
  }

  async delete(id: string) {
    const site = await this.findOne(id);
    return this.siteRepository.softRemove(site);
  }

  async createRoom(siteId: string, dto: CreateRoomDto) {
    await this.findOne(siteId);
    const room = this.roomRepository.create({
      id: uuidv4(),
      siteId,
      ...dto,
    });
    return this.roomRepository.save(room);
  }

  async findRooms(siteId: string) {
    await this.findOne(siteId);
    return this.roomRepository.find({
      where: { siteId },
      order: { roomNo: 'ASC' },
    });
  }

  async updateRoom(id: string, dto: Partial<CreateRoomDto>) {
    const room = await this.roomRepository.findOne({ where: { id } });
    if (!room) {
      throw new NotFoundException('考场不存在');
    }
    Object.assign(room, dto);
    return this.roomRepository.save(room);
  }

  async deleteRoom(id: string) {
    const room = await this.roomRepository.findOne({ where: { id } });
    if (!room) {
      throw new NotFoundException('考场不存在');
    }
    return this.roomRepository.remove(room);
  }
}