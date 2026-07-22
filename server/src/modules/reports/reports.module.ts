import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { Report } from './entities/report.entity';
import { ExamsModule } from '../exams/exams.module';
import { SitesModule } from '../sites/sites.module';
import { TasksModule } from '../tasks/tasks.module';
import { IncidentsModule } from '../incidents/incidents.module';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report]),
    ExamsModule,
    SitesModule,
    TasksModule,
    IncidentsModule,
    AiModule,
  ],
  providers: [ReportsService],
  controllers: [ReportsController],
})
export class ReportsModule {}