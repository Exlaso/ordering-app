import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  // app.useGlobalPipes(new ValidationPipe())
  const PORT = app.get(ConfigService).get('PORT');

  await app.listen(PORT );
  return `App is running on port ${PORT}`;
}
bootstrap().then(console.log);
