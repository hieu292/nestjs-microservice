import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  Query,
  ValidationPipe, Patch
} from '@nestjs/common';

import {OrdersService} from './orders.service';
import {AuthGuard} from "../auth/auth.guard";
import {CreateOrderDto} from "./dto/create_order.dto";
import {GetOrdersFilterDto} from "./dto/filter_order.dto";
import {GetUser} from "../auth/user.decorator";
import {Order} from "./orders.entity";
import {ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse} from "@nestjs/swagger";
import {OrderDto} from "./dto/order.dto";
import {OrderStatus} from "./order_status.enum";

@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('')
  @ApiBearerAuth()
  @ApiOperation({operationId: 'getOrders'})
  @ApiQuery({ name: 'status' , enum: OrderStatus })
  @ApiResponse({status: HttpStatus.OK, type: OrderDto, isArray: true,})
  getOrders(
    @Query(ValidationPipe) filterDto: GetOrdersFilterDto,
    @GetUser('id') userId: number,
  ): Promise<Order[]> {
    return this.ordersService.getOrders(filterDto, userId);
  }

  @Post('')
  @ApiBearerAuth()
  @ApiOperation({operationId: 'createOrder'})
  @ApiBody({type: CreateOrderDto, required: true})
  @ApiResponse({status: HttpStatus.CREATED, type: OrderDto})
  createOrder(
    @Body() dto: CreateOrderDto,
    @GetUser('id') userId: number,
  ): Promise<Order>  {
    return this.ordersService.createOrder(dto, userId);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({operationId: 'getOrder'})
  @ApiResponse({status: HttpStatus.OK, type: OrderDto})
  async getOrder(
    @Param('id') orderId: number,
    @GetUser('id') userId: number,
  ) {
    return this.ordersService.findOrderById(orderId, userId);
  }

  @Patch(':id/cancel')
  @ApiBearerAuth()
  @ApiOperation({operationId: 'cancelOrder'})
  @ApiQuery({name: 'id', type: Number, required: true})
  @ApiResponse({status: HttpStatus.OK, type: OrderDto})
  cancelOrder(
    @Param('id') orderId: number,
    @GetUser('id') userId: number,
  ): Promise<Order> {
    return this.ordersService.cancelOrder(orderId, userId);
  }
}
