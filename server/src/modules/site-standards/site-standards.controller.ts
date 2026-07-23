import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SiteStandardsService } from './site-standards.service';

@Controller('api/site-standards')
@UseGuards(AuthGuard('jwt'))
export class SiteStandardsController {
  constructor(private readonly siteStandardsService: SiteStandardsService) {}

  // ==================== 考点标准化 CRUD ====================

  @Post()
  async create(@Body() dto: any, @Request() req: any) {
    return this.siteStandardsService.create(dto, req.user.userId);
  }

  @Get()
  async findAll(
    @Query('province') province?: string,
    @Query('city') city?: string,
    @Query('standardLevel') standardLevel?: string,
    @Query('status') status?: string,
    @Query('isActive') isActive?: string,
  ) {
    return this.siteStandardsService.findAll({ province, city, standardLevel, status, isActive });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.siteStandardsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: any) {
    return this.siteStandardsService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.siteStandardsService.remove(id);
    return { success: true };
  }

  // ==================== 考场管理 ====================

  @Post(':siteId/rooms')
  async createRoom(@Param('siteId') siteId: string, @Body() dto: any) {
    return this.siteStandardsService.createRoom(siteId, dto);
  }

  @Get(':siteId/rooms')
  async findRooms(@Param('siteId') siteId: string) {
    return this.siteStandardsService.findRooms(siteId);
  }

  @Get('rooms/:roomId')
  async findOneRoom(@Param('roomId') roomId: string) {
    return this.siteStandardsService.findOneRoom(roomId);
  }

  @Put('rooms/:roomId')
  async updateRoom(@Param('roomId') roomId: string, @Body() dto: any) {
    return this.siteStandardsService.updateRoom(roomId, dto);
  }

  @Delete('rooms/:roomId')
  async removeRoom(@Param('roomId') roomId: string) {
    await this.siteStandardsService.removeRoom(roomId);
    return { success: true };
  }

  // ==================== 检查记录 ====================

  @Post(':siteId/inspections')
  async createInspection(@Param('siteId') siteId: string, @Body() dto: any) {
    return this.siteStandardsService.createInspection(siteId, dto);
  }

  @Get(':siteId/inspections')
  async findInspections(@Param('siteId') siteId: string) {
    return this.siteStandardsService.findInspections(siteId);
  }

  @Get('inspections/:inspectionId')
  async findOneInspection(@Param('inspectionId') inspectionId: string) {
    return this.siteStandardsService.findOneInspection(inspectionId);
  }

  @Put('inspections/:inspectionId')
  async updateInspection(@Param('inspectionId') inspectionId: string, @Body() dto: any) {
    return this.siteStandardsService.updateInspection(inspectionId, dto);
  }

  @Delete('inspections/:inspectionId')
  async removeInspection(@Param('inspectionId') inspectionId: string) {
    await this.siteStandardsService.removeInspection(inspectionId);
    return { success: true };
  }

  // ==================== 设施设备 ====================

  @Post(':siteId/facilities')
  async createFacility(@Param('siteId') siteId: string, @Body() dto: any) {
    return this.siteStandardsService.createFacility(siteId, dto);
  }

  @Get(':siteId/facilities')
  async findFacilities(
    @Param('siteId') siteId: string,
    @Query('facilityType') facilityType?: string,
    @Query('status') facilityStatus?: string,
  ) {
    return this.siteStandardsService.findFacilities(siteId, { facilityType, status: facilityStatus });
  }

  @Get('facilities/:facilityId')
  async findOneFacility(@Param('facilityId') facilityId: string) {
    return this.siteStandardsService.findOneFacility(facilityId);
  }

  @Put('facilities/:facilityId')
  async updateFacility(@Param('facilityId') facilityId: string, @Body() dto: any) {
    return this.siteStandardsService.updateFacility(facilityId, dto);
  }

  @Delete('facilities/:facilityId')
  async removeFacility(@Param('facilityId') facilityId: string) {
    await this.siteStandardsService.removeFacility(facilityId);
    return { success: true };
  }
}
