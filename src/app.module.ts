import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from './address/address.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { CityModule } from './city/city.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { EstablishmentModule } from './establishment/establishment.module';
import { ProductServiceModule } from './product-service/product-service.module';
import { ProfessionalModule } from './professional/professional.module';
import { ScheduleServiceModule } from './schedule-service/schedule-service.module';
import { ScheduleModule } from './schedule/schedule.module';
import { StateModule } from './state/state.module';
import { StatusModule } from './status/status.module';
import { TypeUserModule } from './type-user/type-user.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 20,
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      migrations: [`${__dirname}/migration/*{.ts,.js}`],
      migrationsRun: false,
    }),
    AuthModule,
    UserModule,
    StateModule,
    CityModule,
    AddressModule,
    EstablishmentModule,
    StatusModule,
    CategoryModule,
    ScheduleModule,
    ProductServiceModule,
    ScheduleServiceModule,
    ProfessionalModule,
    TypeUserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
