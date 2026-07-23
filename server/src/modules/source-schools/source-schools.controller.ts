import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SourceSchoolsService } from './source-schools.service';

@Controller('api/source-schools')
@UseGuards(AuthGuard('jwt'))
export class SourceSchoolsController {
  constructor(private readonly schoolsService: SourceSchoolsService) {}

  // ==================== 生源学校 CRUD ====================

  @Post()
  async create(@Body() dto: any, @Request() req: any) {
    return this.schoolsService.create(dto, req.user.userId);
  }

  @Get()
  async findAll(
    @Query('province') province?: string,
    @Query('city') city?: string,
    @Query('schoolType') schoolType?: string,
    @Query('serviceStatus') serviceStatus?: string,
    @Query('isActive') isActive?: string,
  ) {
    return this.schoolsService.findAll({ province, city, schoolType, serviceStatus, isActive });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.schoolsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: any) {
    return this.schoolsService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.schoolsService.remove(id);
    return { success: true };
  }

  // ==================== 服务记录 ====================

  @Post(':schoolId/service-records')
  async createServiceRecord(@Param('schoolId') schoolId: string, @Body() dto: any, @Request() req: any) {
    return this.schoolsService.createServiceRecord(schoolId, dto, req.user.userId);
  }

  @Get(':schoolId/service-records')
  async findServiceRecords(@Param('schoolId') schoolId: string) {
    return this.schoolsService.findServiceRecords(schoolId);
  }

  @Get('service-records/:recordId')
  async findOneServiceRecord(@Param('recordId') recordId: string) {
    return this.schoolsService.findOneServiceRecord(recordId);
  }

  @Put('service-records/:recordId')
  async updateServiceRecord(@Param('recordId') recordId: string, @Body() dto: any) {
    return this.schoolsService.updateServiceRecord(recordId, dto);
  }

  @Delete('service-records/:recordId')
  async removeServiceRecord(@Param('recordId') recordId: string) {
    await this.schoolsService.removeServiceRecord(recordId);
    return { success: true };
  }
}
