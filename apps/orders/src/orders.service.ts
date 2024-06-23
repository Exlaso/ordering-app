import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto/createOrderRequest.dto';
import { OrdersRepository } from './orders.repository';
import { BILLING_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository,
              @Inject(BILLING_SERVICE) private readonly billingClient: ClientProxy,
  ) {
  }

  async createOrder(request: CreateOrderRequest, Authentication: string) {
    const session = await this.ordersRepository.startTransaction();
    try {
      const order = await this.ordersRepository.create(request, { session });
      await lastValueFrom(this.billingClient.emit('order_created', {
        request,
        Authentication
      }));
      await session.commitTransaction();
      return order;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
    // return this.ordersRepository.create(request);

  }


  getOrders() {
    return this.ordersRepository.find({});
  }
}
