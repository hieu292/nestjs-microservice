import {EntityRepository, Repository} from "typeorm";
import {Order} from "./orders.entity";
import {GetOrdersFilterDto} from "./dto/filter_order.dto";
import {AppError} from "../shared/errors/errors.interface";
import {AppErrors} from "../shared/errors/errors";
import {CreateOrderDto} from "./dto/create_order.dto";
import {OrderStatus} from "./order_status.enum";
import {DeliverTimeInSeconds} from "../config/delivery.config";

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  async getOrders(
    filterDto: GetOrdersFilterDto,
    userId: number
  ): Promise<Order[]> {
    const {status} = filterDto;
    const query = this.createQueryBuilder('order');

    query.where('order.userId = :userId', {userId});

    if (status) {
      query.andWhere('order.status = :status', {status});
    }

    try {
      return await query.getMany();
    } catch (error) {
      throw new AppError(AppErrors.INTERNAL_SERVER_ERROR);
    }
  }

  async createOrder(
    createOrderDto: CreateOrderDto,
    userId: number
  ): Promise<Order> {
    const {amount, productId} = createOrderDto;

    const order = new Order();
    order.amount = amount;
    order.productId = productId;
    order.userId = userId;
    order.status = OrderStatus.Created;

    try {
      await order.save();
    } catch (error) {
      throw new AppError(AppErrors.INTERNAL_SERVER_ERROR);
    }

    return order;
  }

  async getConfirmedToDeliveredOrders(): Promise<Order[]> {
    try {
      return this.createQueryBuilder('order')
        .where('order.status = :status', {status: OrderStatus.Confirmed})
        .andWhere(`"order"."updated_at" <= now() - interval '${DeliverTimeInSeconds} seconds'`)
        .getMany();
    } catch (error) {
      throw new AppError(AppErrors.INTERNAL_SERVER_ERROR);
    }
  }
}
