import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Documentação API Agendamento')
    .setDescription('API para gerenciar agendamentos.')
    .setVersion('2.0')
    .addTag('Auth')
    .addTag('User')
    .addTag('Schedule')
    .addTag('Status')
    .addTag('ProductService')
    .addTag('Category')
    .addTag('Establishment')
    .addTag('Address')
    .addTag('City')
    .addTag('State')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
