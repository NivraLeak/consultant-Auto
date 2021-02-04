import { Module } from '@nestjs/common';
import { ObservationService } from './services/observation.service';
import { ObservationController } from './controllers/observation.controller';

@Module({
  providers: [ObservationService],
  controllers: [ObservationController]
})
export class ObservationModule {}
