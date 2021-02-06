import { Module } from '@nestjs/common';
import { ObservationService } from './services/observation.service';
import { ObservationController } from './controllers/observation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Observation } from './entities/observation.entity';
import { User } from './../user/entities/user.entity';
import { UserModule } from './../user/user.module';
import { AuthModule } from './../auth/auth.module';
import { CarService } from './../car/services/car.service';
import { Car } from './../car/entities/car.entity';
@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forFeature([Observation, User, Car])
  ],
  providers: [ObservationService, CarService],
  controllers: [ObservationController]
})
export class ObservationModule {}
