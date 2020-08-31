import {Module} from '@nestjs/common';
import {resolve} from 'path';
import * as Swagger from 'swagger-client';
import * as config from 'config';
import {ApiPaymentService} from './apiPayment.service';

let providers = [];
const services = config.get('services')

for (const key in services) {
  const serviceConfig = services[key];
  const spec = require(resolve(serviceConfig.spec));
  const name = serviceConfig.name;
  if(key === "apiPayment"){
    spec.servers = [{ url: process.env.PAYMENT_HOST_API || serviceConfig.host } ]
  }
  providers.push({
    provide: name,
    useFactory: async () => {
      return Swagger({spec});
    },
  });
}

providers = [...providers, ApiPaymentService];

@Module({
  providers,
  exports: providers,
})
export class ApiModule {}
