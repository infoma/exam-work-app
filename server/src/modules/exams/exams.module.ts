import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';
import { ExamProject } from './entities/exam-project.entity';
import { ExamSubject } from './entities/exam-subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExamProject, ExamSubject])],
  providers: [ExamsService],
  controllers: [ExamsController],
  exports: [ExamsService],
})
export class ExamsModule {}