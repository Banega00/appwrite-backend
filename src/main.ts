import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './shared/config/config.service';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClsService } from 'nestjs-cls';
import { RequestLoggingInterceptor } from './shared/interceptors/request-logging.interceptor';
import { CustomLoggingService } from './shared/logger/logger.service';
import { GlobalExceptionFilter } from './shared/exceptions/global-exception-filter';
import { ContextService } from './shared/context/context.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.getPort();
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: '*',
  });

  const config = new DocumentBuilder().setTitle('Appwrite backend').setDescription('Appwrite backend description').setVersion('1.0').build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const logger = await app.resolve<CustomLoggingService>(CustomLoggingService);
  const contextService = await app.resolve<ContextService>(ContextService);
  const clsService = await app.resolve<ClsService>(ClsService);
  app.useGlobalInterceptors(new RequestLoggingInterceptor(logger, clsService));
  app.useGlobalFilters(new GlobalExceptionFilter(logger, contextService, configService));
  await app.listen(port);
}
bootstrap();
