import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import config from './config';
import { urlencoded, json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('DMS API docs')
    .setDescription('The DMS API description')
    .setVersion('1.0')
    .addTag('dms')
    .addBearerAuth()
    .addBasicAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: [
      'http://localhost:3001',
      'http://localhost:3000',
      'http://localhost:9090',
      'https://dms-dev.alethea.ai',
      'https://dms.alethea.ai',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTION',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  await app.listen(config.port);
}
bootstrap();
