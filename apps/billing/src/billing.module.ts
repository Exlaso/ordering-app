import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { AuthModule, RmqModule } from '@app/common';
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
    RABBIT_MQ_AUTH_QUEUE: Joi.string().required(),

   })
  }),RmqModule,
    AuthModule
  ],
  controllers: [BillingController],
  providers: [BillingService,RmqService],
})
export class BillingModule {}
