import {IsNotEmpty, IsNumber} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({type: Number, example: 1})
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({type: Number, example: 1})
  amount: number;
}
