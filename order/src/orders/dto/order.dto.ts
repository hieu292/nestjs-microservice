import {IsDate, IsNotEmpty, IsNumber, IsString} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";
import {OrderStatus} from "../order_status.enum";

export class OrderDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({type: Number, example: 1})
  id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({type: Number, example: 1})
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({type: Number, example: 1})
  amount: number;

  @IsString()
  @ApiProperty({enum: OrderStatus})
  status: OrderStatus;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({type: Number, example: 1})
  userId: number;

  @IsDate()
  @ApiProperty({type: Date})
  createdAt: Date;

  @IsDate()
  @ApiProperty({type: Date})
  updatedAt: Date;
}
