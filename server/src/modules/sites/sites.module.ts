import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SitesService } from './sites.service';
import { SitesController } from './sites.controller';
import { ExamSite } from './entities/exam-site.entity';
import { ExamRoom } from './entities/exam-room.entity';
import { ExamsModule } from '../exams/exams.module';

@Module({
  imports: [TypeOrmModule.forFeature([ExamSite, ExamRoom]), ExamsModule],
  providers: [SitesService],
  controllers: [SitesController],
  exports: [SitesService],
})
export class SitesModule {}