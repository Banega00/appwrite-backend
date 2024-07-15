import { applyDecorators, ExecutionContext, Injectable, SetMetadata, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AppwriteService } from '../../../src/integrations/appwrite/appwrite.service';
import { ContextService } from '../context/context.service';
import { Reflector } from '@nestjs/core';
import { CustomLoggingService } from '../logger/logger.service';
import { CustomError, CustomErrorType } from '../exceptions/custom-error';

export const SessionGuard = (options?: { onlyRegisteredUser: boolean }) => {
  if (options?.onlyRegisteredUser) {
    return applyDecorators(SetMetadata('onlyRegisteredUser', true), UseGuards(AppwriteSessionGuard));
  }
  return applyDecorators(UseGuards(AppwriteSessionGuard));
};

@Injectable()
export class AppwriteSessionGuard {
  constructor(
    private reflector: Reflector,
    private appwriteService: AppwriteService,
    private contextService: ContextService,
    private logger: CustomLoggingService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.cookies?.['auth_token'];
    const onlyRegisteredUser = this.reflector.getAllAndOverride<boolean>('onlyRegisteredUser', [context.getHandler(), context.getClass()]);

    if (!token) {
      throw new CustomError({ errorType: CustomErrorType.UNAUTHORIZED, message: 'Session cookie is missing' });
    }

    try {
      const user = await this.appwriteService.getUserFromSessionSecret(token);
      if (!user) {
        throw new CustomError({ errorType: CustomErrorType.UNAUTHORIZED, message: 'User not found' });
      }

      if (onlyRegisteredUser && !user.email) {
        throw new CustomError({ errorType: CustomErrorType.UNAUTHORIZED, message: 'You must be a registered user' });
      }

      request.user = user;

      this.contextService.set('sessionSecret', token);
      this.contextService.set('user', user);
      return true;
    } catch (error) {
      this.logger.error(error);
      if (error.message.startsWith('Unauthorized')) throw error;
      throw new CustomError({ errorType: CustomErrorType.UNAUTHORIZED, message: 'Unauthorized' });
    }
  }
}
