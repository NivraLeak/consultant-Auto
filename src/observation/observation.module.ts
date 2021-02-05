import { Module } from '@nestjs/common';
import { ObservationService } from './services/observation.service';
import { ObservationController } from './controllers/observation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Observation } from './entities/observation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Observation])
  ],
  providers: [ObservationService],
  controllers: [ObservationController]
})
export class ObservationModule {}
