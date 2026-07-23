import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffsService } from './staffs.service';
import { StaffsController } from './staffs.controller';
import { Staff } from './entities/staff.entity';
import { StaffTraining } from './entities/staff-training.entity';
import { StaffAssignment } from './entities/staff-assignment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Staff, StaffTraining, StaffAssignment])],
  providers: [StaffsService],
  controllers: [StaffsController],
  exports: [StaffsService],
})
export class StaffsModule {}
