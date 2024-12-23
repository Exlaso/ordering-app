import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { RmqModule } from '@app/common';
import { AUTH_SERVICE } from '@app/common/auth/contants';

@Module({
  imports:[RmqModule.register({name:AUTH_SERVICE})],
  exports:[RmqModule]
})
export class AuthModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cookieParser())
      .forRoutes("*");
  }
}

