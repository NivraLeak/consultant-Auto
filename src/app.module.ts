import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeOrm';
import { CarModule } from './car/car.module';
import { ObservationModule } from './observation/observation.module';
import { StateObservationModule } from './state-observation/state-observation.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port:5432,
      username: 'user',
      password: 'password',
      database: 'dbConsultant',
      entities: [
        'dist/**/*.entity{.ts,.js}'
      ],
      synchronize: false,
      retryDelay:3000,
      retryAttempts:10,
    }),
    UserModule,
    CarModule,
    ObservationModule,
    StateObservationModule,
    AuthModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
