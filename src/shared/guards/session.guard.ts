import { applyDecorators, ExecutionContext, Injectable, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AppwriteService } from "src/integrations/appwrite/appwrite.service";
import { ContextService } from "../context/context.service";

export const SessionGuard = () => applyDecorators(UseGuards(AppwriteSessionGuard))

@Injectable()
export class AppwriteSessionGuard {
    constructor(private appwriteService: AppwriteService, private contextService: ContextService) {
        
    }

    async canActivate(context: ExecutionContext) {
        const request: Request = context.switchToHttp().getRequest();
        const token = request.cookies['auth_token'];

        if(!token) {
            throw new Error('Unauthorized');
        }

        try{
            const user = await this.appwriteService.getUserFromSessionSecret(token);
            if(!user) {
                throw new Error('Unauthorized');
            }

            request.user = user;

            this.contextService.set('sessionSecret', token);
            this.contextService.set('user', user);
            return true;
        }catch(error){
            console.log(error);
            throw new Error('Unauthorized');
        }
    }
}