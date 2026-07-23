import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SourceSchoolsService } from './source-schools.service';
import { SourceSchoolsController } from './source-schools.controller';
import { SourceSchool } from './entities/source-school.entity';
import { SchoolServiceRecord } from './entities/school-service-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SourceSchool, SchoolServiceRecord])],
  providers: [SourceSchoolsService],
  controllers: [SourceSchoolsController],
  exports: [SourceSchoolsService],
})
export class SourceSchoolsModule {}
