import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderRequest } from './dto/createOrderRequest.dto';
import { JwtAuthGuard } from '@app/common';
import { Request } from 'express';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createOrder(@Body() request: CreateOrderRequest,@Req() req:Request) {
    const Authentication = req.cookies.Authentication as string;
    return this.ordersService.createOrder(request,Authentication);
  }

  @Get()
  getOrders() {
    return this.ordersService.getOrders();
  }
}
