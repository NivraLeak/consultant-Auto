import { Module } from '@nestjs/common';
import { StateObservationService } from './services/state-observation.service';
import { StateObservationController } from './controllers/state-observation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateObservation } from './entities/state-observation.entity';

@Module({
  imports: [
  TypeOrmModule.forFeature([StateObservation])
  ],
  providers: [StateObservationService],
  controllers: [StateObservationController]
})
export class StateObservationModule {}
