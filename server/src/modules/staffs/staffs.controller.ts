import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StaffsService } from './staffs.service';

@Controller('api/staffs')
@UseGuards(AuthGuard('jwt'))
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  // ==================== 工作人员 CRUD ====================

  @Post()
  async create(@Body() dto: any, @Request() req: any) {
    return this.staffsService.create(dto, req.user.userId);
  }

  @Get()
  async findAll(
    @Query('department') department?: string,
    @Query('status') status?: string,
    @Query('role') role?: string,
    @Query('isQualified') isQualified?: string,
  ) {
    return this.staffsService.findAll({ department, status, role, isQualified });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.staffsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: any) {
    return this.staffsService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.staffsService.remove(id);
    return { success: true };
  }

  // ==================== 培训记录 ====================

  @Post(':staffId/trainings')
  async createTraining(@Param('staffId') staffId: string, @Body() dto: any) {
    return this.staffsService.createTraining(staffId, dto);
  }

  @Get(':staffId/trainings')
  async findTrainings(@Param('staffId') staffId: string) {
    return this.staffsService.findTrainings(staffId);
  }

  @Get('trainings/:trainingId')
  async findOneTraining(@Param('trainingId') trainingId: string) {
    return this.staffsService.findOneTraining(trainingId);
  }

  @Put('trainings/:trainingId')
  async updateTraining(@Param('trainingId') trainingId: string, @Body() dto: any) {
    return this.staffsService.updateTraining(trainingId, dto);
  }

  @Delete('trainings/:trainingId')
  async removeTraining(@Param('trainingId') trainingId: string) {
    await this.staffsService.removeTraining(trainingId);
    return { success: true };
  }

  // ==================== 分配记录 ====================

  @Post(':staffId/assignments')
  async createAssignment(@Param('staffId') staffId: string, @Body() dto: any) {
    return this.staffsService.createAssignment(staffId, dto);
  }

  @Get(':staffId/assignments')
  async findAssignments(@Param('staffId') staffId: string) {
    return this.staffsService.findAssignments(staffId);
  }

  @Get('assignments/:assignmentId')
  async findOneAssignment(@Param('assignmentId') assignmentId: string) {
    return this.staffsService.findOneAssignment(assignmentId);
  }

  @Put('assignments/:assignmentId')
  async updateAssignment(@Param('assignmentId') assignmentId: string, @Body() dto: any) {
    return this.staffsService.updateAssignment(assignmentId, dto);
  }

  @Delete('assignments/:assignmentId')
  async removeAssignment(@Param('assignmentId') assignmentId: string) {
    await this.staffsService.removeAssignment(assignmentId);
    return { success: true };
  }
}
