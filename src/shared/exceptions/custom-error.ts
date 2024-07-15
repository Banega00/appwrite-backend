import { ApiResponseProperty } from '@nestjs/swagger';

export enum CustomErrorType {
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
}

export const CustomErrors = {
  UNKNOWN_ERROR: {
    code: 10000,
    message: 'Unknown error',
    status: 500,
  },
  NOT_FOUND: {
    code: 10001,
    message: 'Not found',
    status: 404,
  },
  VALIDATION_ERROR: {
    code: 10002,
    message: 'Validation error',
    status: 400,
  },
  UNAUTHORIZED: {
    code: 10003,
    message: 'Unauthorized',
    status: 401,
  },
};

export class CustomError extends Error {
  errorType: CustomErrorType;
  error: Error;

  @ApiResponseProperty({ example: 401 })
  status: number;
  @ApiResponseProperty({ example: 10000 })
  code: number;
  @ApiResponseProperty({ example: 'Unknown error' })
  message: string;
  @ApiResponseProperty({})
  payload: any;

  constructor(obj: Partial<Omit<CustomError, 'error'> & { error: Error | unknown }>) {
    super(obj.message);
    this.errorType = obj.errorType ?? CustomErrorType.UNKNOWN_ERROR;
    this.payload = obj.payload;
    this.status = obj.status ?? CustomErrors[this.errorType]?.status ?? 400;
    this.code = obj.code ?? CustomErrors[this.errorType]?.code;
    this.message = obj.message ?? CustomErrors[this.errorType]?.message;

    if (obj.error && obj.error instanceof Error) {
      this.error = obj.error;

      if (!this.stack) {
        this.stack = obj.error.stack;
      }

      if (!this.message) {
        this.message = obj.error.message;
      }

      if (!this.payload) {
        this.payload = obj.error.name + ': ' + obj.error.message;
      }
    }
  }
}
