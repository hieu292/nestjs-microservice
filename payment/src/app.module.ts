import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {PaymentModule} from "./payment/payment.module";
import {AuthMiddleware} from "./auth/auth.middleware";

@Module({
  imports: [PaymentModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({path: '*', method: RequestMethod.ALL});
  }
}
