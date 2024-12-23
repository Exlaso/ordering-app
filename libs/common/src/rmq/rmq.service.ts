import { Injectable } from '@nestjs/common';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RmqService {

  constructor(private configService: ConfigService) {
  }

 getOptions(queue:string,noAck:boolean = false):RmqOptions{
    return {
      transport: Transport.RMQ,
      options:{
        urls: [this.configService.get<string>('RABBIT_MQ_URI')],
        queue: this.configService.get<string>(`RABBIT_MQ_${queue.toUpperCase()}_QUEUE`),
        noAck,
        persistent: true,
      }
    }

 }
 ack(context:RmqContext){
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage);
 }
}