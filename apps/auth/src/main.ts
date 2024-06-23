import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { RmqOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqService } from '@app/common/rmq/rmq.service';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(rmqService.getOptions('AUTH', true));
  app.useGlobalPipes(new ValidationPipe());
  const PORT = app.get(ConfigService).get<string>('PORT');
  await app.startAllMicroservices();
  await app.listen(PORT);
  return  `Auth is Running on ${PORT} ` as const
}
bootstrap().then(console.log);
