import {Injectable} from '@nestjs/common';
import * as _ from 'lodash';
import {PaymentStatus} from "./payment_status.enum";
import { getEnumValues } from './payment.utils';
import {CreatePurchaseDto} from "./dto/create_purchase.dto";

@Injectable()
export class PaymentService {
  async purchase(dto: CreatePurchaseDto, userId: number): Promise<{ status: PaymentStatus }> {
    return {status: _.sample(getEnumValues(PaymentStatus))};
  }
}
