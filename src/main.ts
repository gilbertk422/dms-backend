import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import config from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('DMS API docs')
    .setDescription('The DMS API description')
    .setVersion('1.0')
    .addTag('dms')
    .addBearerAuth()
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
  await app.listen(config.port);
}
bootstrap();
