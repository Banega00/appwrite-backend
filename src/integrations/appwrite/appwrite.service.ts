import { Injectable, OnModuleInit } from '@nestjs/common';
import { Account, Client, Users } from 'node-appwrite';
import { ConfigService } from 'src/shared/config/config.service';

@Injectable()
export class AppwriteService implements OnModuleInit{
    
    private client: Client;
    private account: Account;

    constructor(private readonly configService: ConfigService) {
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

        this.client = new Client();
        this.account = new Account(this.client);
    }

    onModuleInit() {
        const { APPWRITE_ENDPOINT, APPWRITE_API_KEY, APPWRITE_PROJECT_ID } = this.configService.appwriteConfig;

        this.client
            .setEndpoint(APPWRITE_ENDPOINT)
            .setProject(APPWRITE_PROJECT_ID)
            .setKey(APPWRITE_API_KEY)

    }

    public async createAnonymousSession() {
        const account = new Account(this.client);

        const anonymousSession = await account.createAnonymousSession();
        
        return anonymousSession;
    }

    async createUser(userId: string, data: { email: string; password: string; name: string; }) {
        const user = new Users(this.client);
        await user.updateName(userId, data.name);
        await user.updateEmail(userId, data.email);
        await user.updatePassword(userId, data.password);
        return user.get(userId);
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
