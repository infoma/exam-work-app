import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExamsService } from './exams.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Controller('api/exams')
@UseGuards(AuthGuard('jwt'))
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Post()
  async create(@Body() dto: CreateExamDto, @Request() req: any) {
    return this.examsService.create(dto, req.user.userId);
  }

  @Get()
  async findAll() {
    return this.examsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.examsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateExamDto) {
    return this.examsService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.examsService.delete(id);
    return { success: true };
  }

  @Get(':id/subjects')
  async getSubjects(@Param('id') id: string) {
    return this.examsService.getSubjects(id);
  }

  @Post(':id/subjects')
  async addSubject(@Param('id') id: string, @Body() data: { name: string; sessionName?: string; startTime?: string; endTime?: string }) {
    return this.examsService.addSubject(id, data);
  }
}