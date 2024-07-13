import { Injectable, Scope, Inject } from '@nestjs/common';
import { INQUIRER } from '@nestjs/core';
import { ClsService } from 'nestjs-cls';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import winston, { Logger, format } from 'winston';

export enum LoggerColor {
  Black = '\x1b[30m',
  Red = '\x1b[31m',
  Green = '\x1b[32m',
  Yellow = '\x1b[33m',
  Blue = '\x1b[34m',
  Magenta = '\x1b[35m',
  Cyan = '\x1b[36m',
  White = '\x1b[37m',
}

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLoggingService {
  static loggingLevels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
    verbose: 4,
  };

  static colorMap = {
    error: LoggerColor.Red, //red
    warn: LoggerColor.Yellow, //yellow
    info: LoggerColor.Green, //green
    debug: LoggerColor.Blue, //blue
    verbose: LoggerColor.Magenta, //magenta
  };

  constructor(
    private readonly clsService: ClsService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: winston.Logger,
    @Inject(INQUIRER) private readonly source?: string | object,
  ) {}

  log(message: string, metadata?, context?: string) {
    const serviceName = metadata?.label || ((typeof this.source === 'string' ? this.source : this.source?.constructor?.name) ?? 'Unknown Module');
    return this.logger.log({
      level: 'info',
      message: `${message}`,
      label: serviceName,
      reqId: this.clsService.get('reqId'),
      data: metadata?.data,
    });
  }

  debug(message: string, metadata: any, context?: string) {
    const serviceName = (typeof this.source === 'string' ? this.source : this.source?.constructor?.name) ?? 'Unknown Module';
    this.logger.debug({
      message: `${message}`,
      label: serviceName,
      reqId: this.clsService.get('reqId'),
      data: metadata?.data,
    });
  }
  error(message: string, trace?: string, metadata?: { context?: string; data?: any }) {
    const serviceName = (typeof this.source === 'string' ? this.source : this.source?.constructor?.name) ?? 'Unknown Module';
    if (metadata?.context) {
      message = `${serviceName} [${metadata?.context}] - ${message}`;
    } else {
      message = `${serviceName} - ${message}`;
    }
    if (trace) {
      message = `${message} \n${trace}`;
    }

    this.logger.error({
      level: 'error',
      message,
      reqId: this.clsService.get('reqId'),
      data: metadata?.data,
    });
  }

  static getLoggingLevel = () => {
    const loggingLevel = process.env.logging_level || process.env.LOGGING_LEVEL;
    if (Object.keys(CustomLoggingService.loggingLevels).includes(loggingLevel!)) return loggingLevel;

    return 'debug';
  };

  static myFormat = format.printf(({ level, message, timestamp, data, ip, reqId, label, otherMetadata, ...metadata }) => {
    let msg = `${LoggerColor.White}`;

    msg += `${timestamp} `;

    msg += `| ${LoggerColor.Cyan}${reqId ?? ''}`;
    msg += `${(CustomLoggingService.colorMap as any)[level]} |${level.toUpperCase().padEnd(5)}`;
    msg += `| ${LoggerColor.Yellow}${label ?? ''}${LoggerColor.White}`;

    msg += (CustomLoggingService.colorMap as any)[level];

    if (otherMetadata) {
      for (const prop in otherMetadata) {
        if (prop.startsWith('primitive')) {
          msg += ` | ${otherMetadata[prop]}`;
        } else {
          msg += ` | ${prop}: ${otherMetadata[prop]}`;
        }
      }
    }

    msg += ` | ${message} `;

    if (data) {
      msg += `\n${JSON.stringify(data, null, 2)}`;
    }

    return msg;
  });

  randomString = (length: number) => {
    return Math.random()
      .toString(36)
      .substring(2, length + 2);
  };

  addMetadata = (obj: any) => {
    const contextMetadata = this.clsService.get('metadata') ?? {};

    if (typeof obj == 'object') {
      for (const prop in obj) {
        contextMetadata[prop] = obj[prop];
      }
    } else {
      contextMetadata[`primitive${obj}`] = obj;
    }

    this.clsService.set('metadata', contextMetadata);
  };

  setMetadata = (obj: any) => {
    if (typeof obj == 'object') {
      this.clsService.set('metadata', obj);
    } else {
      const context: any = {};
      context[`primitive${this.randomString(5)}`] = obj;

      this.clsService.set('metadata', context);
    }
  };

  /*
         This method:
      -    setup HTTP CONTEXT on request and response objects
      -    Logs start of request
      -    Logs end of request, response status, and request duration
     */
}
