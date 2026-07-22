import { Controller, Post, Get, Delete, Param, Query, UseGuards, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { BizType } from './entities/attachment.entity';

@Controller('api/files')
@UseGuards(AuthGuard('jwt'))
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Query('bizType') bizType: BizType,
    @Query('bizId') bizId: string,
    @Request() req: any,
  ) {
    return this.filesService.upload(file, bizType, bizId, req.user.userId);
  }

  @Get('biz')
  async getByBiz(@Query('bizType') bizType: BizType, @Query('bizId') bizId: string) {
    return this.filesService.getByBiz(bizType, bizId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.filesService.delete(id);
    return { success: true };
  }

  @Get('download/:storageKey')
  async download(@Param('storageKey') storageKey: string) {
    const file = this.filesService.getFile(storageKey);
    if (!file) return null;
    return { file, storageKey };
  }
}