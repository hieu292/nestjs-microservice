import { IsOptional, IsIn } from 'class-validator';
import {OrderStatus} from "../order_status.enum";
import {ApiProperty} from "@nestjs/swagger";

export class GetOrdersFilterDto {
  @IsOptional()
  @IsIn([
    OrderStatus.Created,
    OrderStatus.Confirmed,
    OrderStatus.Canceled,
    OrderStatus.Delivered
  ])
  @ApiProperty({enum: OrderStatus})
  status: OrderStatus;
}
