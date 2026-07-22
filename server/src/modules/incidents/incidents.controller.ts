import { Controller, Get, Post, Put, Patch, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IncidentsService } from './incidents.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { CreateActionDto } from './dto/create-action.dto';

@Controller('api/incidents')
@UseGuards(AuthGuard('jwt'))
export class IncidentsController {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Post()
  async create(@Body() dto: CreateIncidentDto, @Request() req: any) {
    return this.incidentsService.create(dto, req.user.userId);
  }

  @Get('exam/:examId')
  async findByExam(
    @Param('examId') examId: string,
    @Query('siteId') siteId?: string,
    @Query('status') status?: string,
    @Query('level') level?: string,
  ) {
    return this.incidentsService.findByExam(examId, { siteId, status, level });
  }

  @Get('mine')
  async findByUser(@Request() req: any) {
    return this.incidentsService.findByUser(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.incidentsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: Partial<CreateIncidentDto>) {
    return this.incidentsService.update(id, dto);
  }

  @Post(':id/actions')
  async addAction(@Param('id') id: string, @Body() dto: CreateActionDto, @Request() req: any) {
    return this.incidentsService.addAction(id, dto, req.user.userId);
  }

  @Get(':id/actions')
  async getActions(@Param('id') id: string) {
    return this.incidentsService.getActions(id);
  }

  @Patch(':id/close')
  async close(@Param('id') id: string, @Request() req: any) {
    return this.incidentsService.close(id, req.user.userId);
  }
}