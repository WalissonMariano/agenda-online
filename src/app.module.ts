import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { AddressModule } from './address/address.module';
import { EstablishmentModule } from './establishment/establishment.module';
import { StatusModule } from './status/status.module';
import { CategoryModule } from './category/category.module';
import { ScheduleModule } from './schedule/schedule.module';
import { ProductServiceModule } from './product-service/product-service.module';
import { ScheduleServiceModule } from './schedule-service/schedule-service.module';
import { ProfessionalModule } from './professional/professional.module';
import { TypeUserController } from './type_user/type_user.controller';
import { TypeUserModule } from './type_user/type_user.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env'],
  }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    entities: [`${__dirname}/**/*.entity{.js,.ts}`],
    migrations: [`${__dirname}/migration/{.ts,*.js}`],
    migrationsRun: true,
  }),
  JwtModule,
  UserModule,
  AuthModule,
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
  TypeUserModule
  ],
  controllers: [AppController, TypeUserController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
