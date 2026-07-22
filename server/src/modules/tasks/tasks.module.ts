import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { ExamTask } from './entities/exam-task.entity';
import { TaskRecord } from './entities/task-record.entity';
import { ExamsModule } from '../exams/exams.module';

@Module({
  imports: [TypeOrmModule.forFeature([ExamTask, TaskRecord]), ExamsModule],
  providers: [TasksService],
  controllers: [TasksController],
  exports: [TasksService],
})
export class TasksModule {}