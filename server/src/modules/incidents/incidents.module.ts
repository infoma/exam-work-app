import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidentsService } from './incidents.service';
import { IncidentsController } from './incidents.controller';
import { Incident } from './entities/incident.entity';
import { IncidentAction } from './entities/incident-action.entity';
import { ExamsModule } from '../exams/exams.module';

@Module({
  imports: [TypeOrmModule.forFeature([Incident, IncidentAction]), ExamsModule],
  providers: [IncidentsService],
  controllers: [IncidentsController],
  exports: [IncidentsService],
})
export class IncidentsModule {}