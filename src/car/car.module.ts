import { Module } from '@nestjs/common';
import { CarService } from './services/car.service';
import { CarController } from './controllers/car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';

@Module({
  imports: [
  TypeOrmModule.forFeature([Car])
  ],
  providers: [CarService],
  controllers: [CarController]
})
export class CarModule {}
