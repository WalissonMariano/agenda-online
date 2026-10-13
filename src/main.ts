import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Agenda Online API')
    .setDescription(
      'API para agendamento de serviços e compra de produtos em estabelecimentos.',
    )
    .setVersion('2.0')
    .addBearerAuth()
    .addTag('Auth')
    .addTag('User')
    .addTag('TypeUser')
    .addTag('Schedule')
    .addTag('ScheduleService')
    .addTag('Status')
    .addTag('ProductService')
    .addTag('Category')
    .addTag('Establishment')
    .addTag('Address')
    .addTag('Professional')
    .addTag('City')
    .addTag('State')
    .addTag('Health')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);
  console.log(`API listening on port ${port}`);
}
bootstrap();
