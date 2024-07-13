import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ClsModule } from 'nestjs-cls';
import { UserModule } from './resources/user/user.module';
import { ReservationModule } from './resources/reservation/reservation.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { CustomLoggingService } from './shared/logger/logger.service';
@Module({
  imports: [
    SharedModule,
    AuthModule,
    ConfigModule.forRoot(),
    AuthModule,
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: CustomLoggingService.getLoggingLevel(),
          format: winston.format.combine(
            winston.format.errors({ stack: true }),
            // winston.format.label({ label: context }),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
            winston.format.splat(),
            CustomLoggingService.myFormat,
          ),
        }),
      ],
    }),
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    UserModule,
    ReservationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
