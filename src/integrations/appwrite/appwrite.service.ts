import { Injectable, OnModuleInit } from '@nestjs/common';
import { Account, Client, Users } from 'node-appwrite';
import { ConfigService } from 'src/shared/config/config.service';
import { ContextService } from 'src/shared/context/context.service';

@Injectable()
export class AppwriteService implements OnModuleInit{
  
    
    private adminClient: Client;
    private account: Account;

    constructor(private readonly configService: ConfigService, private readonly contextService: ContextService) {
        const appwriteConfig = this.configService.appwriteConfig;
        if(!appwriteConfig) {
            throw new Error('Appwrite configuration is missing');
        }else if(!appwriteConfig.APPWRITE_ENDPOINT) {
            throw new Error('Appwrite endpoint is missing');
        }else if(!appwriteConfig.APPWRITE_PROJECT_ID) {
            throw new Error('Appwrite project ID is missing');
        }else if(!appwriteConfig.APPWRITE_API_KEY) {
            throw new Error('Appwrite API key is missing');
        }

        this.adminClient = new Client();
        this.account = new Account(this.adminClient);
    }

    onModuleInit() {
        const { APPWRITE_ENDPOINT, APPWRITE_API_KEY, APPWRITE_PROJECT_ID } = this.configService.appwriteConfig;

        this.adminClient = this.adminClient
            .setEndpoint(APPWRITE_ENDPOINT)
            .setProject(APPWRITE_PROJECT_ID)
            .setKey(APPWRITE_API_KEY)

    }

    public async createAnonymousSession() {
        const account = new Account(this.adminClient);
        
        const anonymousSession = await account.createAnonymousSession();
        return anonymousSession.secret;
    }

    async getUserFromSessionSecret(secret: string) {
        const sessionClient = new Client()
            .setEndpoint(this.configService.appwriteConfig.APPWRITE_ENDPOINT)
            .setProject(this.configService.appwriteConfig.APPWRITE_PROJECT_ID);

        sessionClient.setSession(secret);
        const account = new Account(sessionClient);
        const currentUser = await account.get();
        return currentUser;
    }

    async updateUser(userId: string, data: { email: string; password: string; name: string; }) {
        const user = new Users(this.adminClient);

        const currentUser = await user.get(userId);

        currentUser.name != data.name && await user.updateName(userId, data.name);
        currentUser.email != data.email && await user.updateEmail(userId, data.email);
        currentUser.password != data.password && await user.updatePassword(userId, data.password);
        return await user.get(userId);
    }
    

    // async createAccount(email: string, password: string, name: string): Promise<any> {
    //     return this.account.create(email, password, name);
    // }

    // async getAccount(userId: string): Promise<any> {
    //     return this.account.get(userId);
    // }

    // async updateAccount(userId: string, email: string, name: string): Promise<any> {
    //     return this.account.update(userId, email, name);
    // }

    // async deleteAccount(userId: string): Promise<any> {
    //     return this.account.delete(userId);
    // }
}
