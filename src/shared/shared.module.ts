//generate shared module in nestjs

import { Global, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { HelpersService } from './helpers/helpers.service';
import { ContextService } from './context/context.service';
import { ClsMiddleware, ClsModule } from 'nestjs-cls';
import { CustomLoggingService } from './logger/logger.service';
import { WinstonModule } from 'nest-winston';
import { LoggingMiddleware } from './middleware/request-logging.middleware';

@Global()
@Module({
  imports: [ClsModule],
  controllers: [],
  providers: [ConfigService, HelpersService, ContextService, CustomLoggingService],
  exports: [ConfigService, HelpersService, ContextService, CustomLoggingService],
})
export class SharedModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClsMiddleware).forRoutes('*');
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
