import {Injectable, Logger} from '@nestjs/common';
import {Cron, CronExpression} from "@nestjs/schedule"
import {OrdersService} from "./orders.service";

@Injectable()
export class OrdersSchedule {
  private logger = new Logger('OrderSchedule');

  constructor(private readonly ordersService: OrdersService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async runEveryMinute() {
    try{
      await this.ordersService.updateDelivered()
    } catch (e) {
      this.logger.error(e)
    }
  }
}
