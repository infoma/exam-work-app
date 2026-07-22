import { Controller, Get, Post, Put, Delete, Patch, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateRecordDto } from './dto/create-record.dto';

@Controller('api/tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('exam/:examId')
  async create(@Param('examId') examId: string, @Body() dto: CreateTaskDto, @Request() req: any) {
    return this.tasksService.create(examId, dto, req.user.userId);
  }

  @Get('exam/:examId')
  async findByExam(
    @Param('examId') examId: string,
    @Query('siteId') siteId?: string,
    @Query('status') status?: string,
    @Query('stage') stage?: string,
  ) {
    return this.tasksService.findByExam(examId, { siteId, status, stage });
  }

  @Get('mine')
  async findByUser(@Request() req: any) {
    return this.tasksService.findByUser(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: Partial<CreateTaskDto>) {
    return this.tasksService.update(id, dto);
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.tasksService.updateStatus(id, body.status);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.tasksService.delete(id);
    return { success: true };
  }

  @Post(':taskId/records')
  async addRecord(@Param('taskId') taskId: string, @Body() dto: CreateRecordDto, @Request() req: any) {
    return this.tasksService.addRecord(taskId, dto, req.user.userId);
  }

  @Get(':taskId/records')
  async getRecords(@Param('taskId') taskId: string) {
    return this.tasksService.getRecords(taskId);
  }
}