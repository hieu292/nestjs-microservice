import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as config from 'config';
import { ACCESS_TOKEN_HEADER_NAME } from './mock/auth.mock';
import {writeFileSync} from "fs";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server');

  app.enableCors();
  initSwagger(app);

  const port = process.env.PORT || serverConfig.port;

  await app.listen(port);
}

function initSwagger(app){
  const appConfig = config.get('app');

  const options = new DocumentBuilder()
    .setTitle(appConfig.name)
    .setDescription(appConfig.description)
    .setVersion(appConfig.version)
    .addSecurity('bearer', {
      type: 'apiKey',
      name: ACCESS_TOKEN_HEADER_NAME,
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    ignoreGlobalPrefix: true,
  });

  writeFileSync(`./swagger.json`, JSON.stringify(document, null, 2), {encoding: 'utf8'});

  SwaggerModule.setup(appConfig.apiDocs, app, document, {
    swaggerOptions: {
      displayOperationId: true,
    },
    customSiteTitle: appConfig.name,
  });
}

bootstrap();
