import {Injectable} from '@nestjs/common';
import * as _ from 'lodash';
import {InjectRepository} from "@nestjs/typeorm";
import {OrdersRepository} from "./orders.repository";
import {Order} from "./orders.entity";
import {GetOrdersFilterDto} from "./dto/filter_order.dto";
import {CreateOrderDto} from "./dto/create_order.dto";
import {AppError} from "../shared/errors/errors.interface";
import {AppErrors} from "../shared/errors/errors";
import {OrderStatus} from "./order_status.enum";
import {ApiPaymentService, OrderPayment} from "../api/apiPayment.service";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersRepository) private orderRepository: OrdersRepository,
    private readonly apiPaymentService: ApiPaymentService,
  ) {
  }

  async getOrders(
    filterDto: GetOrdersFilterDto,
    userId: number
  ): Promise<Order[]> {
    return this.orderRepository.getOrders(filterDto, userId);
  }

  async createOrder(
    createOrderDto: CreateOrderDto,
    userId: number
  ): Promise<Order> {
    const order = await this.orderRepository.createOrder(createOrderDto, userId);
    return await this.processPayment(order)
  }

  async findOrderById(
    id: number,
    userId: number,
  ): Promise<Order> {
    const found = await this.orderRepository.findOne({ where: { id, userId } });

    if (!found) {
      throw new AppError(AppErrors.NOT_FOUND, 'Order not found');
    }

    return found;
  }

  async processPayment(order: Order): Promise<Order> {
    try {
      const orderPayment: OrderPayment = {
        orderId: order.id,
        amount: order.amount,
        productId: order.productId
      }
      const isSuccess = await this.apiPaymentService.processOrder(orderPayment);
      order.status = isSuccess ? OrderStatus.Confirmed : OrderStatus.Canceled;
    } catch (err) {
      order.status = OrderStatus.Canceled;
    }
    return order.save();
  }

  async cancelOrder(orderId: number, userId: number): Promise<Order> {
    const order = await this.getOrderById(orderId, userId);
    if (order.status === OrderStatus.Delivered) {
      throw new AppError(AppErrors.NOT_ACCEPTABLE, 'Can not cancel delivered order');
    }
    order.status = OrderStatus.Canceled;
    return await order.save();
  }

  async getOrderById(
    id: number,
    userId: number,
  ): Promise<Order> {
    const found = await this.orderRepository.findOne({where: {id, userId: userId}});

    if (!found) {
      throw new AppError(AppErrors.NOT_FOUND);
    }

    return found;
  }

  async updateDelivered() {
    const validOrders = await this.orderRepository.getConfirmedToDeliveredOrders()
    if (!_.isEmpty(validOrders)) {
      const promiseUpdateOrders = validOrders.map((order: Order) => {
        order.status = OrderStatus.Delivered;
        return order.save
      })
      await Promise.all(promiseUpdateOrders)
    }
  }
}
