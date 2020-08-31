import {Inject, Injectable, Logger} from '@nestjs/common';
import Swagger from 'swagger-client';
import {MOCK_ACCESS_TOKEN} from "../mock/auth.mock";

export interface OrderPayment {
  orderId: number,
  productId: number,
  amount: number
}

@Injectable()
export class ApiPaymentService {
  private logger = new Logger('ApiPaymentService');

  constructor(@Inject('apiPayment') private readonly apiPayment: Swagger.Client) {}

  async processOrder(orderPayment: OrderPayment): Promise<boolean> {
    try {
      const res = await this.apiPayment.execute({
        operationId: 'purchase',
        requestBody: orderPayment,
        securities: {
          authorized: {
            bearer: MOCK_ACCESS_TOKEN,
          },
        },
      });
      return res.body.status === 'CONFIRMED';
    } catch (e) {
      this.logger.error(e)
      return false;
    }

  }
}
