import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {PaymentStatus} from "../payment_status.enum";

export class PurchaseDto {
  @IsString()
  @ApiProperty({enum: PaymentStatus})
  status: PaymentStatus;
}
