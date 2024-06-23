import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { RmqService } from '@app/common/rmq/rmq.service';

@Module({
  imports: [ConfigModule.forRoot({
isGlobal: true,
    envFilePath: "./apps/billing/.env",

    validationSchema: Joi.object({
    RABBIT_MQ_URI: Joi.string().required(),
    RABBIT_MQ_BILLING_QUEUE: Joi.string().required(),
    // RABBIT_MQ_PAYMENT_QUEUE: Joi.string().required(),
    // RABBIT_MQ_ORDER_QUEUE: Joi.string().required(),
    // RABBIT_MQ_PRODUCT_QUEUE: Joi.string().required(),
    // RABBIT_MQ_USER_QUEUE: Joi.string().required(),
    // RABBIT_MQ_SHIPPING_QUEUE: Joi.string().required(),
    // RABBIT_MQ_NO_ACK: Joi.boolean().required(),
   })
  }),RmqModule],
  controllers: [BillingController],
  providers: [BillingService,RmqService],
})
export class BillingModule {}
