import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { ConfigModule } from "@nestjs/config";
import * as joi from 'joi';
import { AuthModule, DatabaseModule, RmqModule } from '@app/common';
import { MongooseModule } from "@nestjs/mongoose";
import { Order, OrderSchema } from "./schema/order.schema";
import { OrdersRepository } from './orders.repository';
import { BILLING_SERVICE } from './constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        MONGODB_URI: joi.string().required(),
        PORT: joi.number().required(),
        RABBIT_MQ_URI: joi.string().required(),
        RABBIT_MQ_BILLING_QUEUE: joi.string().required(),
        RABBIT_MQ_AUTH_QUEUE: joi.string().required(),
      }),
      envFilePath: "./apps/orders/.env",
    }),
    DatabaseModule,
    MongooseModule.forFeature([{
      name: Order.name,
      schema: OrderSchema
    }]),
    RmqModule.register({ name: BILLING_SERVICE }),
    AuthModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService,OrdersRepository]
})
export class OrdersModule {
}
