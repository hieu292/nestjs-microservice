import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {OrdersRepository} from "./order.repository";
import {ApiModule} from "../api/api.module";
import {OrdersSchedule} from "./order.schedule";

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdersRepository]),
    ApiModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersSchedule],
})
export class OrdersModule {}
