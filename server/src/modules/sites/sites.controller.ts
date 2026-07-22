import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SitesService } from './sites.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { CreateRoomDto } from './dto/create-room.dto';

@Controller('api/sites')
@UseGuards(AuthGuard('jwt'))
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @Post('exam/:examId')
  async create(@Param('examId') examId: string, @Body() dto: CreateSiteDto, @Request() req: any) {
    return this.sitesService.create(examId, dto, req.user.userId);
  }

  @Get('exam/:examId')
  async findByExam(@Param('examId') examId: string) {
    return this.sitesService.findByExam(examId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.sitesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: Partial<CreateSiteDto>) {
    return this.sitesService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.sitesService.delete(id);
    return { success: true };
  }

  @Post(':siteId/rooms')
  async createRoom(@Param('siteId') siteId: string, @Body() dto: CreateRoomDto) {
    return this.sitesService.createRoom(siteId, dto);
  }

  @Get(':siteId/rooms')
  async findRooms(@Param('siteId') siteId: string) {
    return this.sitesService.findRooms(siteId);
  }

  @Put('rooms/:id')
  async updateRoom(@Param('id') id: string, @Body() dto: Partial<CreateRoomDto>) {
    return this.sitesService.updateRoom(id, dto);
  }

  @Delete('rooms/:id')
  async deleteRoom(@Param('id') id: string) {
    await this.sitesService.deleteRoom(id);
    return { success: true };
  }
}