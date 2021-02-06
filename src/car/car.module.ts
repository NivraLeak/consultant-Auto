import { Module } from '@nestjs/common';
import { CarService } from './services/car.service';
import { CarController } from './controllers/car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { User } from './../user/entities/user.entity';
import { UserModule } from './../user/user.module';
import { AuthModule } from './../auth/auth.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
  TypeOrmModule.forFeature([Car, User])
  ],
  providers: [CarService],
  controllers: [CarController],
  exports: [CarService]
})
export class CarModule {}
