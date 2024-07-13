import { Injectable } from '@nestjs/common';
import { AppwriteService } from 'src/integrations/appwrite/appwrite.service';

@Injectable()
export class AuthService {
  
  constructor(private readonly appwriteService: AppwriteService){

  }

  async login() {
    const anonymousSession = await this.appwriteService.createAnonymousSession();
    return anonymousSession;
  }

  async register(userId: string, data: {email: string, password: string, name: string}){
    const user = await this.appwriteService.createUser(userId, { email: data.email, password: data.password, name: data.name});
    return user;
  }
}
