import { Module } from '@nestjs/common';
import { StateObservationService } from './services/state-observation.service';
import { StateObservationController } from './controllers/state-observation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateObservation } from './entities/state-observation.entity';
import { UserModule } from './../user/user.module';
import { AuthModule } from './../auth/auth.module';
import { User } from './../user/entities/user.entity';

@Module({
  imports: [
    UserModule,
    AuthModule,
  TypeOrmModule.forFeature([StateObservation, User])
  ],
  providers: [StateObservationService],
  controllers: [StateObservationController]
})
export class StateObservationModule {}
