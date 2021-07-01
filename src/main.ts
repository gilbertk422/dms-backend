import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3001'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTION',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  await app.listen(8000);
}
bootstrap();
