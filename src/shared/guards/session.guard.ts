import { applyDecorators, ExecutionContext, Injectable, SetMetadata, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AppwriteService } from 'src/integrations/appwrite/appwrite.service';
import { ContextService } from '../context/context.service';
import { Reflector } from '@nestjs/core';

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
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.cookies['auth_token'];
    const onlyRegisteredUser = this.reflector.getAllAndOverride<boolean>('onlyRegisteredUser', [context.getHandler(), context.getClass()]);

    if (!token) {
      throw new Error('Unauthorized');
    }

    try {
      const user = await this.appwriteService.getUserFromSessionSecret(token);
      if (!user) {
        throw new Error('Unauthorized');
      }

      if (onlyRegisteredUser && !user.email) {
        throw new Error('Unauthorized - this action is only available for registered users');
      }

      request.user = user;

      this.contextService.set('sessionSecret', token);
      this.contextService.set('user', user);
      return true;
    } catch (error) {
      console.log(error);
      if (error.message.startsWith('Unauthorized')) throw error;
      throw new Error('Unauthorized');
    }
  }
}
