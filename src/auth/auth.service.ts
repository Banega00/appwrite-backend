import { Injectable } from '@nestjs/common';
import { AppwriteService } from 'src/integrations/appwrite/appwrite.service';

@Injectable()
export class AuthService {
  constructor(private readonly appwriteService: AppwriteService) {}

  async login() {
    const session = await this.appwriteService.createAnonymousSession();
    return session;
  }

  async register(userId: string, data: { email: string; password: string; name: string }) {
    const user = await this.appwriteService.updateUser(userId, { email: data.email, password: data.password, name: data.name });
    return user;
  }
}
