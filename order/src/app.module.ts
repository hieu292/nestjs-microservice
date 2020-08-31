import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { ScheduleModule } from '@nestjs/schedule';
import {OrdersModule} from './orders/orders.module';
import {AuthMiddleware} from "./auth/auth.middleware";
import {typeOrmConfig} from "./config/typeorm.config";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    OrdersModule,
    ScheduleModule.forRoot()
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({path: '*', method: RequestMethod.ALL});
  }
}
