import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

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
  UserModule,
  AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
