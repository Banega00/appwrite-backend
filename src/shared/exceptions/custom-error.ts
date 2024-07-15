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
    status: 422,
  },
};

export class CustomError extends Error {
  constructor(
    public readonly message: string,
    public readonly code: number,
    public readonly status: number,
    public readonly errorType: string,
    public readonly payload?: any,
    public readonly error?: Error,
  ) {
    super(message);
  }
}
