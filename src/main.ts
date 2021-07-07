import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('DMS API docs')
    .setDescription('The DMS API description')
    .setVersion('1.0')
    .addTag('dms')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:3000', 'https://dms-dev.alethea.ai', 'https://dms.alethea.ai'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTION',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  await app.listen(8000);
}
bootstrap();
