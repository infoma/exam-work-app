import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteStandardsService } from './site-standards.service';
import { SiteStandardsController } from './site-standards.controller';
import { SiteStandard } from './entities/site-standard.entity';
import { StandardRoom } from './entities/standard-room.entity';
import { SiteInspection } from './entities/site-inspection.entity';
import { SiteFacility } from './entities/site-facility.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SiteStandard, StandardRoom, SiteInspection, SiteFacility])],
  providers: [SiteStandardsService],
  controllers: [SiteStandardsController],
  exports: [SiteStandardsService],
})
export class SiteStandardsModule {}
