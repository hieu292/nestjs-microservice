import {Body, Controller, HttpStatus, ParseIntPipe, Post, UseGuards} from '@nestjs/common';
import {PaymentService} from './payment.service';
import {CreatePurchaseDto} from "./dto/create_purchase.dto";
import {AuthGuard} from "../auth/auth.guard";
import {GetUser} from "../auth/user.decorator";
import {ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {PurchaseDto} from "./dto/purchase.dto";

const KEY: string = 'payments'

@Controller(KEY)
@ApiTags(KEY)
@UseGuards(AuthGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({operationId: 'purchase'})
  @ApiBody({type: CreatePurchaseDto, required: true})
  @ApiResponse({status: HttpStatus.OK, type: PurchaseDto})
  async purchase(
    @Body('orderId', ParseIntPipe) orderId: number,
    @Body('productId', ParseIntPipe) productId: number,
    @Body('amount', ParseIntPipe) amount: number,
    @GetUser('id', ParseIntPipe) userId: number
    ) {
    const dto: CreatePurchaseDto = {orderId, productId, amount}
    return this.paymentService.purchase(dto, userId);
  }
}
