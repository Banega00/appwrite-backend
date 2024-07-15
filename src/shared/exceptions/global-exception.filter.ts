import { ArgumentsHost, BadRequestException, ExceptionFilter, NotFoundException } from '@nestjs/common';
import { CustomLoggingService } from '../logger/logger.service';
import { ContextService } from '../context/context.service';
import { ConfigService } from '../config/config.service';
import { Request, Response } from 'express';
import { CustomError, CustomErrors } from './custom-error';
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    private logger: CustomLoggingService,
    private contextService: ContextService,
    private configService: ConfigService,
  ) {
    process.on('uncaughtException', (error: Error) => {
      this.logger.error(error.message, error.stack, { context: 'Uncaught Exception' });
    });
  }

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    //logic for validation exceptions
    if (exception instanceof BadRequestException) {
      const message = exception.message || CustomErrors.VALIDATION_ERROR.message;

      //give validation details only in development environment
      const errorPayload = this.configService.env.isDevOrTest ? (exception as any).response.message : undefined;
      this.logger.log(
        `${Date.now() - this.contextService.get('startTimestamp')}msec |${request.method} ${request.url} | status: ${response.statusCode}`,
        {
          label: 'Request end',
        },
      );
      return response.status(400).json({
        statusCode: CustomErrors.VALIDATION_ERROR.code,
        message: message ?? CustomErrors.VALIDATION_ERROR.message,
        payload: errorPayload,
        status: 400,
      });
    }

    if (exception instanceof NotFoundException) {
      this.logger.error(`NOT FOUND: ${request.method} ${request.url}`);
      this.logger.log(
        `${Date.now() - this.contextService.get('startTimestamp')}msec |${request.method} ${request.url} | status: ${response.statusCode}`,
        {
          label: 'Request end',
        },
      );
      return response.status(404).json({
        statusCode: CustomErrors.NOT_FOUND.code,
        message: CustomErrors.NOT_FOUND.message,
        payload: undefined,
        status: 404,
      });
    }

    if (exception instanceof CustomError) {
      const errorPayload = this.configService.env.isDevOrTest ? exception.error?.stack : undefined;

      this.logger.error(exception.message, exception.stack, {
        context: `Custom Error - ${exception.errorType} - ${exception.code}`,
        data: exception.payload,
      });

      this.logger.log(
        `${Date.now() - this.contextService.get('startTimestamp')}msec |${request.method} ${request.url} | status: ${response.statusCode}`,
        {
          label: 'Request end',
        },
      );
      return response.status(exception.status).json({
        statusCode: exception.code,
        message: exception.message,
        payload: exception.payload ?? errorPayload,
        status: exception.status,
      });
    }

    //send info about error stack in response if environment is development
    const errorPayload = this.configService.env.isDevOrTest ? exception.stack : undefined;

    response.status(500).json({
      statusCode: CustomErrors.UNKNOWN_ERROR.code,
      message: exception.message || CustomErrors.UNKNOWN_ERROR.message,
      payload: errorPayload,
      status: 500,
    });

    this.logger.error(exception.message, exception.stack, { context: 'Unknown Error' });

    this.logger.log(
      `${Date.now() - this.contextService.get('startTimestamp')}msec |${request.method} ${request.url} | status: ${response.statusCode}`,
      {
        label: 'Request end',
      },
    );
  }
}
